/**
 * Projector Controller
 * Coordinates:
 *  - Real Datasets (BBC News, Stanford GloVe, IMDB Sentiment)
 *  - PCA, t-SNE and Custom Axis projection engines
 *  - 3D WebGL renderer, labels and laser lines
 *  - Semantic Vector Arithmetic Calculator (A - B + C = D)
 *  - Real Document / Word Inspection & K-NN Search
 *  - Search & Autocomplete
 */

import { buildDataset, DATASET_METADATA, CATEGORY_COLORS } from './embeddings-data.js';
import { ProjectionEngine } from './projection-engine.js';
import { Projector3D } from './projector-3d.js';
import { VectorMath } from './vector-math.js';

export class ProjectorController {
  constructor() {
    this.currentDatasetKey = 'bbc_news';
    this.rawDataset = buildDataset(this.currentDatasetKey);
    this.activeDataset = [...this.rawDataset];
    this.projectionEngine = new ProjectionEngine();

    this.currentMode = 'pca'; // 'pca', 'tsne', 'custom'
    this.is3D = true;
    this.selectedPoint = null;

    this.tsneRunning = false;
    this.tsneAnimFrame = null;

    this.initUI();
    this.init3D();
    this.renderCategoryLegend();
    this.runCurrentProjection();
    this.initVectorMathSection();
  }

  initUI() {
    // Top Bar elements
    this.datasetSelect = document.getElementById('dataset-select');
    this.dimToggleBtn = document.getElementById('dim-toggle-btn');
    this.resetCamBtn = document.getElementById('reset-camera-btn');
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    this.pointCountBadge = document.getElementById('point-count-badge');
    this.dimBadge = document.getElementById('dim-badge');
    this.legendContainer = document.getElementById('category-legend-container');

    // Algorithm Tab Buttons
    this.tabPca = document.getElementById('tab-pca');
    this.tabTsne = document.getElementById('tab-tsne');
    this.tabCustom = document.getElementById('tab-custom');
    this.panelPca = document.getElementById('panel-pca');
    this.panelTsne = document.getElementById('panel-tsne');
    this.panelCustom = document.getElementById('panel-custom');

    // PCA Elements
    this.pcaVarTotal = document.getElementById('pca-var-total');
    this.pcaBar1 = document.getElementById('pca-bar-1');
    this.pcaBar2 = document.getElementById('pca-bar-2');
    this.pcaBar3 = document.getElementById('pca-bar-3');
    this.pcaVal1 = document.getElementById('pca-val-1');
    this.pcaVal2 = document.getElementById('pca-val-2');
    this.pcaVal3 = document.getElementById('pca-val-3');

    // t-SNE Elements
    this.tsnePlayBtn = document.getElementById('tsne-play-btn');
    this.tsneResetBtn = document.getElementById('tsne-reset-btn');
    this.tsnePerplexitySlider = document.getElementById('tsne-perplexity-slider');
    this.tsnePerplexityVal = document.getElementById('tsne-perplexity-val');
    this.tsneIterBadge = document.getElementById('tsne-iter-badge');

    // Custom Axes Elements
    this.axisXPositive = document.getElementById('axis-x-pos');
    this.axisXNegative = document.getElementById('axis-x-neg');
    this.axisYPositive = document.getElementById('axis-y-pos');
    this.axisYNegative = document.getElementById('axis-y-neg');
    this.axisZPositive = document.getElementById('axis-z-pos');
    this.axisZNegative = document.getElementById('axis-z-neg');
    this.applyCustomAxisBtn = document.getElementById('apply-custom-axis-btn');

    // Label & Point options
    this.labelModeSelect = document.getElementById('label-mode-select');
    this.pointSizeSlider = document.getElementById('point-size-slider');

    // Right Sidebar (Inspector)
    this.inspectorEmpty = document.getElementById('inspector-empty');
    this.inspectorContent = document.getElementById('inspector-content');
    this.inspectWord = document.getElementById('inspect-word');
    this.inspectCategory = document.getElementById('inspect-category');
    this.inspectBadge = document.getElementById('inspect-badge');
    this.inspectSnippetBox = document.getElementById('inspect-snippet-box');
    this.inspectSnippet = document.getElementById('inspect-snippet');
    this.inspectImageBox = document.getElementById('inspect-image-box');
    this.inspectImage = document.getElementById('inspect-image');
    this.neighborsContainer = document.getElementById('neighbors-container');

    // Vector Arithmetic Elements
    this.mathWordA = document.getElementById('math-word-a');
    this.mathWordB = document.getElementById('math-word-b');
    this.mathWordC = document.getElementById('math-word-c');
    this.mathCalcBtn = document.getElementById('math-calc-btn');
    this.mathResultBox = document.getElementById('math-result-box');
    this.mathResultWord = document.getElementById('math-result-word');
    this.mathResultSim = document.getElementById('math-result-sim');
    this.mathPresetSelect = document.getElementById('math-preset-select');

    // Custom Word Creator
    this.newWordInput = document.getElementById('new-word-input');
    this.newWordCategory = document.getElementById('new-word-category');
    this.addNewWordBtn = document.getElementById('add-new-word-btn');

    // Attach listeners
    this.attachEventListeners();
    this.populateWordSelects();
    this.updateStatsBadges();
  }

  init3D() {
    this.projector = new Projector3D('canvas-3d-container', {
      pointSize: parseFloat(this.pointSizeSlider.value) || 2.5,
      showLabels: true,
      labelMode: this.labelModeSelect.value || 'all',
      is3D: this.is3D,
      onSelectPoint: (pt) => this.onPointSelected(pt),
      onHoverPoint: (pt, x, y) => this.onPointHovered(pt, x, y)
    });
  }

  attachEventListeners() {
    // Dataset Select
    if (this.datasetSelect) {
      this.datasetSelect.addEventListener('change', (e) => {
        this.switchDataset(e.target.value);
      });
    }

    // 2D / 3D Toggle
    this.dimToggleBtn.addEventListener('click', () => {
      this.is3D = !this.is3D;
      this.dimToggleBtn.innerHTML = this.is3D ? `
        <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
        Modo: 3D
      ` : `
        <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        Modo: 2D
      `;
      this.projector.setDimensionMode(this.is3D);
      this.runCurrentProjection();
    });

    // Reset Camera
    this.resetCamBtn.addEventListener('click', () => this.projector.resetCamera());

    // Algorithm Tabs
    this.tabPca.addEventListener('click', () => this.switchAlgorithm('pca'));
    this.tabTsne.addEventListener('click', () => this.switchAlgorithm('tsne'));
    this.tabCustom.addEventListener('click', () => this.switchAlgorithm('custom'));

    // t-SNE Controls
    this.tsnePlayBtn.addEventListener('click', () => this.toggleTSNE());
    this.tsneResetBtn.addEventListener('click', () => this.resetTSNE());
    this.tsnePerplexitySlider.addEventListener('input', (e) => {
      this.tsnePerplexityVal.textContent = e.target.value;
      if (this.currentMode === 'tsne') {
        this.resetTSNE();
      }
    });

    // Custom Axes apply
    this.applyCustomAxisBtn.addEventListener('click', () => this.runCustomAxisProjection());

    // Search input
    this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    this.searchInput.addEventListener('focus', () => {
      if (this.searchInput.value) this.handleSearch(this.searchInput.value);
    });
    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
        this.searchResults.classList.add('hidden');
      }
    });

    // Label Mode & Point Size
    this.labelModeSelect.addEventListener('change', (e) => {
      this.projector.setLabelMode(e.target.value);
    });
    this.pointSizeSlider.addEventListener('input', (e) => {
      this.projector.setPointSize(parseFloat(e.target.value));
    });

    // Vector Math Calc
    this.mathCalcBtn.addEventListener('click', () => this.computeVectorMath());
    this.mathPresetSelect.addEventListener('change', (e) => this.loadMathPreset(e.target.value));

    // Custom Word Add
    this.addNewWordBtn.addEventListener('click', () => this.addNewCustomWord());
    this.newWordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.addNewCustomWord();
    });
  }

  switchDataset(datasetKey) {
    this.currentDatasetKey = datasetKey;
    this.stopTSNE();
    this.rawDataset = buildDataset(datasetKey);
    this.activeDataset = [...this.rawDataset];
    this.selectedPoint = null;

    // Reset Inspector
    this.inspectorEmpty.classList.remove('hidden');
    this.inspectorContent.classList.add('hidden');

    this.updateStatsBadges();
    this.populateWordSelects();
    this.renderCategoryLegend();
    this.runCurrentProjection();
    this.projector.resetCamera();
  }

  renderCategoryLegend() {
    if (!this.legendContainer) return;
    this.legendContainer.innerHTML = '';

    const categories = Array.from(new Set(this.activeDataset.map(d => d.category)));
    categories.forEach(cat => {
      const color = CATEGORY_COLORS[cat] || '#ffffff';
      const item = document.createElement('div');
      item.className = 'flex items-center space-x-1.5 text-xs text-slate-300';
      item.innerHTML = `<span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${color};"></span><span class="truncate">${cat}</span>`;
      this.legendContainer.appendChild(item);
    });
  }

  updateStatsBadges() {
    const meta = DATASET_METADATA[this.currentDatasetKey] || {};
    const unit = meta.type === 'document' ? 'artículos' : meta.type === 'image' ? 'imágenes' : 'vectores';
    this.pointCountBadge.textContent = `${this.activeDataset.length} ${unit}`;
    this.dimBadge.textContent = `50D ➔ ${this.is3D ? '3D' : '2D'}`;
  }

  populateWordSelects() {
    const words = [...this.activeDataset].slice(0, 30);
    const makeOptions = (defaultVal) => {
      return words.map(w => `<option value="${w.word}" ${w.word === defaultVal ? 'selected' : ''}>${w.word.slice(0, 24)} (${w.category})</option>`).join('');
    };

    if (this.axisXPositive) this.axisXPositive.innerHTML = makeOptions(words[0] ? words[0].word : '');
    if (this.axisXNegative) this.axisXNegative.innerHTML = makeOptions(words[1] ? words[1].word : '');
    if (this.axisYPositive) this.axisYPositive.innerHTML = makeOptions(words[2] ? words[2].word : '');
    if (this.axisYNegative) this.axisYNegative.innerHTML = makeOptions(words[3] ? words[3].word : '');
    if (this.axisZPositive) this.axisZPositive.innerHTML = makeOptions(words[4] ? words[4].word : '');
    if (this.axisZNegative) this.axisZNegative.innerHTML = makeOptions(words[5] ? words[5].word : '');
  }

  switchAlgorithm(mode) {
    this.currentMode = mode;
    this.stopTSNE();

    const tabs = [this.tabPca, this.tabTsne, this.tabCustom];
    const panels = [this.panelPca, this.panelTsne, this.panelCustom];

    tabs.forEach(t => t.classList.remove('bg-indigo-600', 'text-white'));
    panels.forEach(p => p.classList.add('hidden'));

    if (mode === 'pca') {
      this.tabPca.classList.add('bg-indigo-600', 'text-white');
      this.panelPca.classList.remove('hidden');
    } else if (mode === 'tsne') {
      this.tabTsne.classList.add('bg-indigo-600', 'text-white');
      this.panelTsne.classList.remove('hidden');
      this.resetTSNE();
    } else if (mode === 'custom') {
      this.tabCustom.classList.add('bg-indigo-600', 'text-white');
      this.panelCustom.classList.remove('hidden');
    }

    this.runCurrentProjection();
  }

  runCurrentProjection() {
    const targetDims = this.is3D ? 3 : 2;

    if (this.currentMode === 'pca') {
      const res = this.projectionEngine.computePCA(this.activeDataset, targetDims);
      this.projector.setData(this.activeDataset, res.coords);

      const v = res.varianceExplained;
      const total = (v[0] + v[1] + (targetDims > 2 ? v[2] : 0)).toFixed(1);
      this.pcaVarTotal.textContent = `${total}%`;
      this.pcaVal1.textContent = `${v[0]}%`;
      this.pcaVal2.textContent = `${v[1]}%`;
      this.pcaVal3.textContent = targetDims > 2 ? `${v[2]}%` : '0%';
      this.pcaBar1.style.width = `${v[0]}%`;
      this.pcaBar2.style.width = `${v[1]}%`;
      this.pcaBar3.style.width = targetDims > 2 ? `${v[2]}%` : '0%';

    } else if (this.currentMode === 'tsne') {
      if (!this.projectionEngine.tsneState.P) {
        this.resetTSNE();
      }
    } else if (this.currentMode === 'custom') {
      this.runCustomAxisProjection();
    }
  }

  // ==========================================
  // t-SNE Interactive Execution
  // ==========================================
  resetTSNE() {
    this.stopTSNE();
    const perplexity = parseInt(this.tsnePerplexitySlider.value, 10) || 18;
    const targetDims = this.is3D ? 3 : 2;

    this.projectionEngine.initTSNE(this.activeDataset, perplexity, targetDims);
    const stepRes = this.projectionEngine.stepTSNE(1);
    this.projector.setData(this.activeDataset, stepRes.coords);
    this.tsneIterBadge.textContent = `Iteración: ${stepRes.iteration}`;
  }

  toggleTSNE() {
    if (this.tsneRunning) {
      this.stopTSNE();
    } else {
      this.startTSNE();
    }
  }

  startTSNE() {
    this.tsneRunning = true;
    this.tsnePlayBtn.innerHTML = `
      <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      Pausar
    `;
    this.tsnePlayBtn.classList.replace('bg-indigo-600', 'bg-amber-600');
    this.tsnePlayBtn.classList.replace('hover:bg-indigo-500', 'hover:bg-amber-500');

    const loop = () => {
      if (!this.tsneRunning) return;
      const res = this.projectionEngine.stepTSNE(2);
      if (res) {
        this.projector.setData(this.activeDataset, res.coords);
        this.tsneIterBadge.textContent = `Iteración: ${res.iteration}`;
      }
      this.tsneAnimFrame = requestAnimationFrame(loop);
    };
    this.tsneAnimFrame = requestAnimationFrame(loop);
  }

  stopTSNE() {
    this.tsneRunning = false;
    if (this.tsneAnimFrame) cancelAnimationFrame(this.tsneAnimFrame);
    if (this.tsnePlayBtn) {
      this.tsnePlayBtn.innerHTML = `
        <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg>
        Ejecutar t-SNE
      `;
      this.tsnePlayBtn.classList.replace('bg-amber-600', 'bg-indigo-600');
      this.tsnePlayBtn.classList.replace('hover:bg-amber-500', 'hover:bg-indigo-500');
    }
  }

  // ==========================================
  // Custom Semantic Axes
  // ==========================================
  runCustomAxisProjection() {
    const getVec = (word) => {
      const match = this.activeDataset.find(d => d.word.toLowerCase() === word.toLowerCase());
      return match ? match.vector : null;
    };

    const vXp = getVec(this.axisXPositive.value);
    const vXn = getVec(this.axisXNegative.value);
    const vYp = getVec(this.axisYPositive.value);
    const vYn = getVec(this.axisYNegative.value);
    const vZp = this.is3D ? getVec(this.axisZPositive.value) : null;
    const vZn = this.is3D ? getVec(this.axisZNegative.value) : null;

    if (!vXp || !vXn || !vYp || !vYn) {
      alert('Por favor selecciona palabras válidas para todos los ejes requeridos.');
      return;
    }

    const D = vXp.length;
    const axisX = new Float32Array(D);
    const axisY = new Float32Array(D);
    const axisZ = this.is3D && vZp && vZn ? new Float32Array(D) : null;

    for (let i = 0; i < D; i++) {
      axisX[i] = vXp[i] - vXn[i];
      axisY[i] = vYp[i] - vYn[i];
      if (axisZ) axisZ[i] = vZp[i] - vZn[i];
    }

    const coords = this.projectionEngine.computeCustomAxisProjection(this.activeDataset, axisX, axisY, axisZ);
    this.projector.setData(this.activeDataset, coords);
  }

  // ==========================================
  // Selection & K-Nearest Neighbors
  // ==========================================
  onPointSelected(pt) {
    this.selectedPoint = pt;

    // Show Inspector
    this.inspectorEmpty.classList.add('hidden');
    this.inspectorContent.classList.remove('hidden');

    this.inspectWord.textContent = pt.headline || pt.word;
    this.inspectCategory.textContent = pt.category;
    this.inspectBadge.style.backgroundColor = `${pt.color}25`;
    this.inspectBadge.style.color = pt.color;
    this.inspectBadge.style.borderColor = `${pt.color}50`;

    if (pt.snippet) {
      this.inspectSnippetBox.classList.remove('hidden');
      this.inspectSnippet.textContent = pt.snippet;
    } else {
      this.inspectSnippetBox.classList.add('hidden');
    }

    if (pt.isImage && pt.image && this.inspectImageBox) {
      this.inspectImage.src = pt.image;
      this.inspectImageBox.classList.remove('hidden');
    } else if (this.inspectImageBox) {
      this.inspectImageBox.classList.add('hidden');
    }

    // Compute K-NN
    const neighbors = VectorMath.findNearestNeighbors(pt.vector, this.activeDataset, 6, pt.word);
    this.projector.drawNeighborLines(neighbors);
    this.renderNeighborsTable(neighbors);
  }

  onPointHovered(pt, x, y) {
    const tooltip = document.getElementById('projector-tooltip');
    if (!tooltip) return;

    if (!pt) {
      tooltip.classList.add('hidden');
      return;
    }

    tooltip.classList.remove('hidden');
    tooltip.style.left = `${x + 15}px`;
    tooltip.style.top = `${y - 15}px`;
    tooltip.innerHTML = `
      <div class="flex items-center space-x-1.5 mb-0.5">
        <span class="w-2 h-2 rounded-full" style="background-color: ${pt.color};"></span>
        <span class="font-bold text-white text-xs truncate max-w-xs">${pt.headline || pt.word}</span>
      </div>
      <div class="text-[10px] text-slate-400">${pt.category} • Embedding L2: 1.0</div>
    `;
  }

  renderNeighborsTable(neighbors) {
    this.neighborsContainer.innerHTML = '';
    if (!neighbors || neighbors.length === 0) return;

    neighbors.forEach(n => {
      const row = document.createElement('div');
      row.className = 'group p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between';
      row.innerHTML = `
        <div class="flex items-center space-x-2 min-w-0 pr-2">
          <span class="w-2 h-2 rounded-full shrink-0" style="background-color: ${n.color};"></span>
          <div class="min-w-0">
            <div class="font-semibold text-xs text-slate-200 group-hover:text-indigo-300 transition-colors truncate">${n.word}</div>
            <div class="text-[10px] text-slate-500">${n.category}</div>
          </div>
        </div>
        <div class="text-right shrink-0">
          <div class="font-mono text-xs font-bold text-emerald-400">${n.cosineSimilarity.toFixed(3)}</div>
          <div class="w-14 bg-slate-900 rounded-full h-1 mt-1 overflow-hidden">
            <div class="bg-emerald-500 h-1 rounded-full" style="width: ${n.similarityPercent}%"></div>
          </div>
        </div>
      `;

      row.addEventListener('click', () => {
        this.projector.selectPoint(n.id);
        this.projector.flyToPoint(n.id);
      });

      this.neighborsContainer.appendChild(row);
    });
  }

  // ==========================================
  // Search & Navigation
  // ==========================================
  handleSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.searchResults.classList.add('hidden');
      return;
    }

    const matches = this.activeDataset.filter(d => d.word.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)).slice(0, 8);

    if (matches.length === 0) {
      this.searchResults.innerHTML = '<div class="p-2.5 text-xs text-slate-400 italic">No se encontraron elementos.</div>';
      this.searchResults.classList.remove('hidden');
      return;
    }

    this.searchResults.innerHTML = '';
    matches.forEach(m => {
      const item = document.createElement('div');
      item.className = 'p-2 rounded hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs transition-colors';
      item.innerHTML = `
        <span class="font-medium text-slate-200 truncate pr-2">${m.word}</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded shrink-0" style="background-color: ${m.color}20; color: ${m.color};">${m.category}</span>
      `;
      item.addEventListener('click', () => {
        this.searchInput.value = m.word;
        this.searchResults.classList.add('hidden');
        this.projector.selectPoint(m.id);
        this.projector.flyToPoint(m.id);
      });
      this.searchResults.appendChild(item);
    });

    this.searchResults.classList.remove('hidden');
  }

  // ==========================================
  // Vector Arithmetic (A - B + C = D)
  // ==========================================
  initVectorMathSection() {
    this.mathWordA.value = 'rey';
    this.mathWordB.value = 'hombre';
    this.mathWordC.value = 'mujer';
    this.computeVectorMath();
  }

  loadMathPreset(presetKey) {
    const presets = {
      reina: { a: 'rey', b: 'hombre', c: 'mujer' },
      paris: { a: 'madrid', b: 'españa', c: 'francia' },
      roma: { a: 'madrid', b: 'españa', c: 'italia' },
      dolor: { a: 'alegría', b: 'amor', c: 'tristeza' }
    };

    if (presets[presetKey]) {
      // If not on glove_words dataset, auto-switch to glove_words
      if (this.currentDatasetKey !== 'glove_words' && this.datasetSelect) {
        this.datasetSelect.value = 'glove_words';
        this.switchDataset('glove_words');
      }
      this.mathWordA.value = presets[presetKey].a;
      this.mathWordB.value = presets[presetKey].b;
      this.mathWordC.value = presets[presetKey].c;
      this.computeVectorMath();
    }
  }

  computeVectorMath() {
    const a = this.mathWordA.value.trim();
    const b = this.mathWordB.value.trim();
    const c = this.mathWordC.value.trim();

    // Ensure we have a dataset with these words
    const datasetForMath = buildDataset('glove_words');
    const res = VectorMath.computeVectorAnalogy(a, b, c, datasetForMath, 4);

    if (!res.success) {
      this.mathResultBox.classList.remove('hidden');
      this.mathResultWord.textContent = 'Error';
      this.mathResultSim.textContent = res.error;
      return;
    }

    this.mathResultBox.classList.remove('hidden');
    if (res.bestMatch) {
      this.mathResultWord.textContent = res.bestMatch.word;
      this.mathResultWord.style.color = res.bestMatch.color;
      this.mathResultSim.textContent = `Similaridad Coseno: ${res.bestMatch.similarity.toFixed(3)}`;

      this.mathResultBox.onclick = () => {
        // If current dataset isn't glove_words, switch
        if (this.currentDatasetKey !== 'glove_words') {
          this.datasetSelect.value = 'glove_words';
          this.switchDataset('glove_words');
        }
        const item = this.activeDataset.find(d => d.word.toLowerCase() === res.bestMatch.word.toLowerCase());
        if (item) {
          this.projector.selectPoint(item.id);
          this.projector.flyToPoint(item.id);
        }
      };
    }
  }

  // ==========================================
  // Add Custom Word Embedding
  // ==========================================
  addNewCustomWord() {
    const word = this.newWordInput.value.trim();
    if (!word) {
      alert('Escribe un texto o término.');
      return;
    }

    const category = this.newWordCategory.value || 'Personalizado';

    const newVec = VectorMath.synthesizeCustomEmbedding(word, category, [], this.activeDataset, 50);

    const newId = this.activeDataset.length;
    const newEntry = {
      id: newId,
      word: word,
      category: category,
      color: CATEGORY_COLORS[category] || '#ffffff',
      vector: newVec,
      headline: word,
      snippet: `Documento/Término personalizado inyectado en el espacio de embeddings en tiempo real. Categoría: ${category}.`
    };

    this.activeDataset.push(newEntry);
    this.updateStatsBadges();
    this.populateWordSelects();
    this.renderCategoryLegend();

    this.runCurrentProjection();
    setTimeout(() => {
      this.projector.selectPoint(newId);
      this.projector.flyToPoint(newId);
    }, 150);

    this.newWordInput.value = '';
  }
}
