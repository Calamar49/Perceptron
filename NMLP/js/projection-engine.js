/**
 * Projection Engine for Embedding Projector
 * Implements:
 *  1. PCA (Principal Component Analysis with Covariance & Power Iteration SVD)
 *  2. t-SNE (t-Distributed Stochastic Neighbor Embedding with live iterative stepping)
 *  3. Custom Semantic Vector Axes Projection
 */

export class ProjectionEngine {
  constructor() {
    this.tsneState = {
      points: [],
      P: null,
      Y: null,
      dY: null,
      gains: null,
      iter: 0,
      perplexity: 18,
      learningRate: 100,
      momentum: 0.5,
      finalMomentum: 0.8,
      momSwitchIter: 150,
      dims: 3
    };
  }

  // ==========================================
  // 1. PCA (Principal Component Analysis)
  // ==========================================
  computePCA(dataset, targetDims = 3) {
    const N = dataset.length;
    if (N === 0) return { coords: [], varianceExplained: [0, 0, 0] };
    const D = dataset[0].vector.length;

    // 1. Calculate Mean per dimension
    const mean = new Float64Array(D);
    for (let i = 0; i < N; i++) {
      const vec = dataset[i].vector;
      for (let d = 0; d < D; d++) {
        mean[d] += vec[d];
      }
    }
    for (let d = 0; d < D; d++) mean[d] /= N;

    // 2. Center Data Matrix X (N x D)
    const X = new Array(N);
    for (let i = 0; i < N; i++) {
      X[i] = new Float64Array(D);
      const vec = dataset[i].vector;
      for (let d = 0; d < D; d++) {
        X[i][d] = vec[d] - mean[d];
      }
    }

    // 3. Compute Covariance Matrix C (D x D) = (X^T * X) / (N - 1)
    const C = new Array(D);
    for (let i = 0; i < D; i++) {
      C[i] = new Float64Array(D);
    }
    for (let j = 0; j < D; j++) {
      for (let k = j; k < D; k++) {
        let sum = 0;
        for (let i = 0; i < N; i++) {
          sum += X[i][j] * X[i][k];
        }
        const val = sum / (N - 1);
        C[j][k] = val;
        C[k][j] = val;
      }
    }

    // Total variance (Trace of Covariance Matrix)
    let totalVar = 0;
    for (let d = 0; d < D; d++) totalVar += C[d][d];
    if (totalVar <= 0) totalVar = 1;

    // 4. Power Iteration with Deflation for Top Eigenvectors
    const eigenvectors = [];
    const eigenvalues = [];
    const C_def = C.map(row => new Float64Array(row));

    for (let k = 0; k < targetDims; k++) {
      // Random starting vector
      let b = new Float64Array(D);
      for (let d = 0; d < D; d++) b[d] = Math.sin(k * 77 + d * 13) + 0.1;
      let bNorm = Math.hypot(...b);
      for (let d = 0; d < D; d++) b[d] /= bNorm;

      // Power iteration loop
      for (let iter = 0; iter < 45; iter++) {
        const b_next = new Float64Array(D);
        for (let r = 0; r < D; r++) {
          let s = 0;
          for (let c = 0; c < D; c++) {
            s += C_def[r][c] * b[c];
          }
          b_next[r] = s;
        }
        bNorm = Math.hypot(...b_next);
        if (bNorm > 1e-12) {
          for (let d = 0; d < D; d++) b[d] = b_next[d] / bNorm;
        }
      }

      // Rayleigh quotient to get eigenvalue
      let lambda = 0;
      for (let r = 0; r < D; r++) {
        let s = 0;
        for (let c = 0; c < D; c++) s += C_def[r][c] * b[c];
        lambda += b[r] * s;
      }

      eigenvalues.push(Math.max(0, lambda));
      eigenvectors.push(b);

      // Deflate matrix C_def -= lambda * (b * b^T)
      for (let r = 0; r < D; r++) {
        for (let c = 0; c < D; c++) {
          C_def[r][c] -= lambda * b[r] * b[c];
        }
      }
    }

    // 5. Project all points onto eigenvectors
    const projected = [];
    for (let i = 0; i < N; i++) {
      const coords = [];
      for (let k = 0; k < targetDims; k++) {
        let dot = 0;
        for (let d = 0; d < D; d++) {
          dot += X[i][d] * eigenvectors[k][d];
        }
        coords.push(dot);
      }
      projected.push(coords);
    }

    // Normalize coordinates to a standard 3D bounding box [-80, 80]
    const scaleFactor = 100;
    const maxVals = [1e-6, 1e-6, 1e-6];
    projected.forEach(coord => {
      for (let k = 0; k < targetDims; k++) {
        maxVals[k] = Math.max(maxVals[k], Math.abs(coord[k]));
      }
    });

    const scaled = projected.map(coord => {
      return [
        (coord[0] / maxVals[0]) * scaleFactor,
        (coord[1] / maxVals[1]) * scaleFactor,
        targetDims > 2 ? (coord[2] / maxVals[2]) * scaleFactor : 0
      ];
    });

    const varianceExplained = eigenvalues.map(v => Math.min(100, Math.round((v / totalVar) * 1000) / 10));

    return {
      coords: scaled,
      varianceExplained: varianceExplained
    };
  }

  // ==========================================
  // 2. t-SNE (Interactive Live Stepping)
  // ==========================================
  initTSNE(dataset, perplexity = 18, dims = 3) {
    const N = dataset.length;
    this.tsneState.points = dataset;
    this.tsneState.dims = dims;
    this.tsneState.perplexity = perplexity;
    this.tsneState.iter = 0;

    // Pairwise squared Euclidean distances in high-D space
    const D = dataset[0].vector.length;
    const distSq = new Float64Array(N * N);
    for (let i = 0; i < N; i++) {
      const vi = dataset[i].vector;
      for (let j = i + 1; j < N; j++) {
        const vj = dataset[j].vector;
        let d = 0;
        for (let k = 0; k < D; k++) {
          const diff = vi[k] - vj[k];
          d += diff * diff;
        }
        distSq[i * N + j] = d;
        distSq[j * N + i] = d;
      }
    }

    // Compute joint probability distribution P in high-D space
    const P = new Float64Array(N * N);
    const targetEntropy = Math.log(perplexity);

    for (let i = 0; i < N; i++) {
      let betaMin = -Infinity;
      let betaMax = Infinity;
      let beta = 1.0; // 1 / (2 * sigma^2)
      let rowSum = 0;

      // Binary search for beta to match target entropy
      for (let iter = 0; iter < 40; iter++) {
        rowSum = 0;
        let H = 0;
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const val = Math.exp(-distSq[i * N + j] * beta);
          P[i * N + j] = val;
          rowSum += val;
        }

        if (rowSum < 1e-12) rowSum = 1e-12;
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const p = P[i * N + j] / rowSum;
          P[i * N + j] = p;
          if (p > 1e-12) H -= p * Math.log(p);
        }

        const Hdiff = H - targetEntropy;
        if (Math.abs(Hdiff) < 1e-4) break;

        if (Hdiff > 0) {
          betaMin = beta;
          beta = betaMax === Infinity ? beta * 2 : (beta + betaMax) / 2;
        } else {
          betaMax = beta;
          beta = betaMin === -Infinity ? beta / 2 : (beta + betaMin) / 2;
        }
      }
    }

    // Symmetrize P matrix: p_ij = (p_j|i + p_i|j) / (2N)
    const symP = new Float64Array(N * N);
    const totalDenom = 2 * N;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        symP[i * N + j] = Math.max(1e-12, (P[i * N + j] + P[j * N + i]) / totalDenom);
      }
    }
    this.tsneState.P = symP;

    // Initialize low-D coordinates Y with small random Gaussian values
    const Y = new Float64Array(N * dims);
    for (let i = 0; i < N * dims; i++) {
      Y[i] = (Math.sin(i * 1337) * 2 - 1) * 0.1;
    }
    this.tsneState.Y = Y;
    this.tsneState.dY = new Float64Array(N * dims);
    this.tsneState.gains = new Float64Array(N * dims).fill(1.0);
  }

  stepTSNE(numSteps = 1) {
    const { P, Y, dY, gains, dims, perplexity } = this.tsneState;
    if (!P || !Y) return null;
    const N = this.tsneState.points.length;
    const lr = this.tsneState.learningRate;

    for (let step = 0; step < numSteps; step++) {
      this.tsneState.iter++;
      const iter = this.tsneState.iter;
      const momentum = iter < this.tsneState.momSwitchIter ? this.tsneState.momentum : this.tsneState.finalMomentum;

      // 1. Compute low-D student-t similarities q_ij
      const num = new Float64Array(N * N);
      let qSum = 0;

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          let d = 0;
          for (let k = 0; k < dims; k++) {
            const diff = Y[i * dims + k] - Y[j * dims + k];
            d += diff * diff;
          }
          const val = 1.0 / (1.0 + d);
          num[i * N + j] = val;
          num[j * N + i] = val;
          qSum += 2 * val;
        }
      }
      if (qSum < 1e-12) qSum = 1e-12;

      // 2. Compute Gradients
      const grad = new Float64Array(N * dims);
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const q = num[i * N + j] / qSum;
          const p = P[i * N + j];
          const mult = 4.0 * (p - q) * num[i * N + j];

          for (let k = 0; k < dims; k++) {
            grad[i * dims + k] += mult * (Y[i * dims + k] - Y[j * dims + k]);
          }
        }
      }

      // 3. Update coordinates with adaptive gains and momentum
      for (let i = 0; i < N * dims; i++) {
        const g = grad[i];
        const dy = dY[i];

        // Adaptive gain
        gains[i] = (Math.sign(g) !== Math.sign(dy)) ? (gains[i] + 0.2) : (gains[i] * 0.8);
        if (gains[i] < 0.01) gains[i] = 0.01;

        // Gradient step
        dY[i] = momentum * dy - lr * gains[i] * g;
        Y[i] += dY[i];
      }
    }

    // Return scaled coordinates [-80, 80]
    const coords = [];
    let maxDist = 1e-6;
    for (let i = 0; i < N; i++) {
      for (let k = 0; k < dims; k++) {
        maxDist = Math.max(maxDist, Math.abs(Y[i * dims + k]));
      }
    }

    const scale = 75 / maxDist;
    for (let i = 0; i < N; i++) {
      coords.push([
        Y[i * dims + 0] * scale,
        Y[i * dims + 1] * scale,
        dims > 2 ? Y[i * dims + 2] * scale : 0
      ]);
    }

    return {
      coords,
      iteration: this.tsneState.iter
    };
  }

  // ==========================================
  // 3. Custom Semantic Vector Axes Projection
  // ==========================================
  computeCustomAxisProjection(dataset, axisVectorX, axisVectorY, axisVectorZ = null) {
    const N = dataset.length;
    if (N === 0) return [];

    const normX = Math.hypot(...axisVectorX) || 1;
    const normY = Math.hypot(...axisVectorY) || 1;
    const normZ = axisVectorZ ? (Math.hypot(...axisVectorZ) || 1) : 1;

    const uX = axisVectorX.map(v => v / normX);
    const uY = axisVectorY.map(v => v / normY);
    const uZ = axisVectorZ ? axisVectorZ.map(v => v / normZ) : null;

    const rawCoords = [];
    let maxAbs = [1e-6, 1e-6, 1e-6];

    for (let i = 0; i < N; i++) {
      const v = dataset[i].vector;
      let dotX = 0, dotY = 0, dotZ = 0;
      for (let d = 0; d < v.length; d++) {
        dotX += v[d] * uX[d];
        dotY += v[d] * uY[d];
        if (uZ) dotZ += v[d] * uZ[d];
      }
      rawCoords.push([dotX, dotY, dotZ]);
      maxAbs[0] = Math.max(maxAbs[0], Math.abs(dotX));
      maxAbs[1] = Math.max(maxAbs[1], Math.abs(dotY));
      maxAbs[2] = Math.max(maxAbs[2], Math.abs(dotZ));
    }

    const scale = 80;
    return rawCoords.map(c => [
      (c[0] / maxAbs[0]) * scale,
      (c[1] / maxAbs[1]) * scale,
      uZ ? (c[2] / maxAbs[2]) * scale : 0
    ]);
  }
}
