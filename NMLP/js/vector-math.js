/**
 * Vector Math & Semantic Operations for Embedding Projector
 * Implements:
 *  - Cosine Similarity & Euclidean Distance
 *  - K-Nearest Neighbors (K-NN)
 *  - Vector Arithmetic: A - B + C = D (Word2Vec Math)
 *  - Custom Word Embedding Synthesizer (FastText subword + semantic anchors)
 */

export class VectorMath {
  /**
   * Cosine Similarity between two vectors: (A . B) / (||A|| * ||B||)
   * Range: [-1.0, 1.0]
   */
  static cosineSimilarity(a, b) {
    if (!a || !b || a.length !== b.length) return 0;
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    const denom = Math.sqrt(normA) * Math.sqrt(normB);
    return denom === 0 ? 0 : Math.max(-1, Math.min(1, dot / denom));
  }

  /**
   * Euclidean Distance between two vectors: sqrt( sum( (A_i - B_i)^2 ) )
   */
  static euclideanDistance(a, b) {
    if (!a || !b || a.length !== b.length) return Infinity;
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      const diff = a[i] - b[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  }

  /**
   * Find Top-K Nearest Neighbors to a query vector
   */
  static findNearestNeighbors(queryVec, dataset, k = 8, excludeWord = null) {
    const scored = [];
    for (let i = 0; i < dataset.length; i++) {
      const item = dataset[i];
      if (excludeWord && item.word.toLowerCase() === excludeWord.toLowerCase()) continue;

      const cosSim = this.cosineSimilarity(queryVec, item.vector);
      const eucDist = this.euclideanDistance(queryVec, item.vector);

      scored.push({
        id: item.id,
        word: item.word,
        category: item.category,
        color: item.color,
        cosineSimilarity: cosSim,
        euclideanDistance: eucDist,
        similarityPercent: Math.round(((cosSim + 1) / 2) * 100)
      });
    }

    // Sort descending by cosine similarity
    scored.sort((a, b) => b.cosineSimilarity - a.cosineSimilarity);
    return scored.slice(0, k);
  }

  /**
   * Classic Word2Vec Semantic Vector Arithmetic:
   * Target Vector = A - B + C
   * Example: rey - hombre + mujer = reina
   */
  static computeVectorAnalogy(wordA, wordB, wordC, dataset, topK = 5) {
    const itemA = dataset.find(d => d.word.toLowerCase() === wordA.toLowerCase());
    const itemB = dataset.find(d => d.word.toLowerCase() === wordB.toLowerCase());
    const itemC = dataset.find(d => d.word.toLowerCase() === wordC.toLowerCase());

    if (!itemA || !itemB || !itemC) {
      return {
        success: false,
        error: 'Una o más palabras de la fórmula no existen en el dataset actual.'
      };
    }

    const D = itemA.vector.length;
    const targetVec = new Float32Array(D);

    // V_target = A - B + C
    for (let i = 0; i < D; i++) {
      targetVec[i] = itemA.vector[i] - itemB.vector[i] + itemC.vector[i];
    }

    // Normalize target vector
    let norm = 0;
    for (let i = 0; i < D; i++) norm += targetVec[i] * targetVec[i];
    norm = Math.sqrt(norm) || 1;
    for (let i = 0; i < D; i++) targetVec[i] /= norm;

    // Search nearest candidates, excluding input words A, B, C
    const excludeSet = new Set([wordA.toLowerCase(), wordB.toLowerCase(), wordC.toLowerCase()]);
    const candidates = [];

    for (let i = 0; i < dataset.length; i++) {
      const item = dataset[i];
      if (excludeSet.has(item.word.toLowerCase())) continue;

      const sim = this.cosineSimilarity(targetVec, item.vector);
      candidates.push({
        word: item.word,
        category: item.category,
        color: item.color,
        similarity: sim
      });
    }

    candidates.sort((a, b) => b.similarity - a.similarity);

    return {
      success: true,
      targetVector: Array.from(targetVec),
      formula: `${itemA.word} - ${itemB.word} + ${itemC.word}`,
      bestMatch: candidates[0] || null,
      topMatches: candidates.slice(0, topK)
    };
  }

  /**
   * Generates a new high-dimensional vector for a custom user-defined word or sentence.
   * Blends FastText-inspired subword char n-grams with category centroid and semantic seeds.
   */
  static synthesizeCustomEmbedding(newWord, category, seedWords = [], dataset = [], dims = 50) {
    const vec = new Float32Array(dims);

    // 1. Base category centroid or seed words average
    let seedCount = 0;
    if (seedWords && seedWords.length > 0) {
      seedWords.forEach(w => {
        const match = dataset.find(d => d.word.toLowerCase() === w.toLowerCase());
        if (match) {
          for (let d = 0; d < dims; d++) vec[d] += match.vector[d];
          seedCount++;
        }
      });
    }

    // If no seeds found, find all words in same category
    if (seedCount === 0 && category) {
      const catWords = dataset.filter(d => d.category.toLowerCase() === category.toLowerCase());
      if (catWords.length > 0) {
        catWords.forEach(w => {
          for (let d = 0; d < dims; d++) vec[d] += w.vector[d];
          seedCount++;
        });
      }
    }

    if (seedCount > 0) {
      for (let d = 0; d < dims; d++) vec[d] /= seedCount;
    }

    // 2. Add subtle deterministic subword hash variation (FastText style)
    const cleanWord = newWord.toLowerCase().trim();
    const hashScale = 0.05 / Math.max(1, cleanWord.length);
    for (let i = 0; i < cleanWord.length; i++) {
      const charCode = cleanWord.charCodeAt(i);
      for (let d = 0; d < dims; d++) {
        const hash = Math.sin((charCode * 31 + d * 17) + i * 101) * hashScale;
        vec[d] += hash;
      }
    }

    // 3. Normalize to unit length (L2 norm = 1.0)
    let norm = 0;
    for (let d = 0; d < dims; d++) norm += vec[d] * vec[d];
    norm = Math.sqrt(norm) || 1;
    for (let d = 0; d < dims; d++) vec[d] /= norm;

    return Array.from(vec);
  }
}
