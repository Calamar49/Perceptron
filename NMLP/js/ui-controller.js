/**
 * UI Controller for FreeLing NLP Replication
 * Handles user interactions, live input listening, step navigation,
 * animations, visual highlighting, and export capabilities.
 */

import { NLPEngine } from './nlp-engine.js';
import { PRESET_TEXTS, EAGLES_TAXONOMY } from './spanish-lexicon.js';

export class UIController {
  constructor() {
    this.engine = new NLPEngine({ language: 'es' });
    this.currentPipelineResult = null;
    this.activeFilterCategory = 'ALL';
    this.animationState = {
      isPlaying: false,
      currentStep: 1, // 1 to 6
      timer: null,
      speedMs: 1200
    };

    this.initDOMElements();
    this.attachEventListeners();
    this.loadInitialPreset();
  }

  initDOMElements() {
    // Inputs
    this.rawTextInput = document.getElementById('raw-text-input');
    this.presetSelect = document.getElementById('preset-select');
    this.languageSelect = document.getElementById('language-select');
    this.clearBtn = document.getElementById('clear-btn');
    this.pasteBtn = document.getElementById('paste-btn');

    // Controls
    this.liveProcessToggle = document.getElementById('live-process-toggle');
    this.animatePlayBtn = document.getElementById('animate-play-btn');
    this.animateStepBtn = document.getElementById('animate-step-btn');
    this.animateResetBtn = document.getElementById('animate-reset-btn');
    this.speedSelect = document.getElementById('speed-select');
    this.viewModeRadios = document.querySelectorAll('input[name="view-mode"]');

    // Top metrics
    this.metricSentences = document.getElementById('metric-sentences');
    this.metricTokens = document.getElementById('metric-tokens');
    this.metricLemmas = document.getElementById('metric-lemmas');
    this.metricStopwords = document.getElementById('metric-stopwords');
    this.metricReduction = document.getElementById('metric-reduction');
    this.metricTime = document.getElementById('metric-time');

    // Pipeline Stage Containers
    this.stageCards = {
      1: document.getElementById('stage-card-1'),
      2: document.getElementById('stage-card-2'),
      3: document.getElementById('stage-card-3'),
      4: document.getElementById('stage-card-4'),
      5: document.getElementById('stage-card-5'),
      6: document.getElementById('stage-card-6')
    };

    // Stage contents
    this.sentencesContainer = document.getElementById('sentences-container');
    this.tokensContainer = document.getElementById('tokens-container');
    this.lemmasContainer = document.getElementById('lemmas-container');
    this.posContainer = document.getElementById('pos-container');
    this.posFilterBar = document.getElementById('pos-filter-bar');
    this.stopwordsDiffContainer = document.getElementById('stopwords-diff-container');
    this.stopwordsCleanPreview = document.getElementById('stopwords-clean-preview');
    this.stopwordsProgressBar = document.getElementById('stopwords-progress-bar');
    this.stopwordsProgressLabel = document.getElementById('stopwords-progress-label');

    // Tabular View Elements
    this.freelingTableBody = document.getElementById('freeling-table-body');
    this.tableSearchInput = document.getElementById('table-search-input');
    this.exportJsonBtn = document.getElementById('export-json-btn');
    this.exportCsvBtn = document.getElementById('export-csv-btn');
    this.exportFreelingBtn = document.getElementById('export-freeling-btn');

    // Stepper nodes
    this.stepNodes = document.querySelectorAll('.pipeline-step-node');
  }

  attachEventListeners() {
    // Live input typing with debounce
    let debounceTimer;
    this.rawTextInput.addEventListener('input', () => {
      if (this.liveProcessToggle.checked) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.executePipeline();
        }, 150);
      }
    });

    // Preset selection
    this.presetSelect.addEventListener('change', (e) => {
      const key = e.target.value;
      if (PRESET_TEXTS[key]) {
        this.rawTextInput.value = PRESET_TEXTS[key];
        if (key === 'ingles') {
          this.languageSelect.value = 'en';
          this.engine.setLanguage('en');
        } else {
          this.languageSelect.value = 'es';
          this.engine.setLanguage('es');
        }
        this.executePipeline();
      }
    });

    // Language change
    this.languageSelect.addEventListener('change', (e) => {
      this.engine.setLanguage(e.target.value);
      this.executePipeline();
    });

    // Clear & Paste
    this.clearBtn.addEventListener('click', () => {
      this.rawTextInput.value = '';
      this.executePipeline();
      this.rawTextInput.focus();
    });

    this.pasteBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          this.rawTextInput.value = text;
          this.executePipeline();
        }
      } catch (err) {
        alert('Por favor pega el texto directamente en el área de texto.');
      }
    });

    // Animation Controls
    this.animatePlayBtn.addEventListener('click', () => this.toggleAnimation());
    this.animateStepBtn.addEventListener('click', () => this.stepAnimationForward());
    this.animateResetBtn.addEventListener('click', () => this.resetAnimation());
    this.speedSelect.addEventListener('change', (e) => {
      this.animationState.speedMs = parseInt(e.target.value, 10);
      if (this.animationState.isPlaying) {
        this.pauseAnimation();
        this.startAnimation();
      }
    });

    // View Mode Radios (Tabs: Full Pipeline, Simulator, FreeLing Table)
    this.viewModeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.switchViewMode(e.target.value);
      });
    });

    // Stepper node clicks
    this.stepNodes.forEach(node => {
      node.addEventListener('click', () => {
        const step = parseInt(node.getAttribute('data-step'), 10);
        this.jumpToStep(step);
      });
    });

    // Table Search
    if (this.tableSearchInput) {
      this.tableSearchInput.addEventListener('input', (e) => {
        this.filterTable(e.target.value.toLowerCase());
      });
    }

    // Export Buttons
    this.exportJsonBtn.addEventListener('click', () => this.exportJSON());
    this.exportCsvBtn.addEventListener('click', () => this.exportCSV());
    this.exportFreelingBtn.addEventListener('click', () => this.exportFreelingFormat());
  }

  loadInitialPreset() {
    this.rawTextInput.value = PRESET_TEXTS['zorro'];
    this.executePipeline();
  }

  /**
   * Main Pipeline Execution
   */
  executePipeline() {
    const rawText = this.rawTextInput.value;
    const result = this.engine.runPipeline(rawText);
    this.currentPipelineResult = result;

    this.updateMetrics(result);
    this.renderStage1Raw(result);
    this.renderStage2Sentences(result);
    this.renderStage3Tokens(result);
    this.renderStage4Lemmas(result);
    this.renderStage5POS(result);
    this.renderStage6Stopwords(result);
    this.renderFreelingTable(result);
  }

  /**
   * Update top KPI summary badges
   */
  updateMetrics(result) {
    const m = result.metrics;
    if (this.metricSentences) this.metricSentences.textContent = m.totalSentences;
    if (this.metricTokens) this.metricTokens.textContent = m.totalTokens;
    if (this.metricLemmas) this.metricLemmas.textContent = m.uniqueLemmas;
    if (this.metricStopwords) this.metricStopwords.textContent = m.stopwordsCount;
    if (this.metricReduction) this.metricReduction.textContent = `${m.reductionPercent}%`;
    if (this.metricTime) this.metricTime.textContent = `${result.executionTimeMs} ms`;
  }

  /**
   * STAGE 1: Render Raw Data details
   */
  renderStage1Raw(result) {
    const raw = result.stages.stage1_rawData;
    const badge = document.getElementById('stage1-stats-badge');
    if (badge) {
      badge.textContent = `${raw.characterCount} caracteres • ${raw.lineCount} línea(s)`;
    }
  }

  /**
   * STAGE 2: Render Sentences (Segmentación de Frases)
   */
  renderStage2Sentences(result) {
    const sentences = result.stages.stage2_sentences;
    this.sentencesContainer.innerHTML = '';

    if (sentences.length === 0) {
      this.sentencesContainer.innerHTML = '<div class="text-sm text-slate-400 italic">No se han detectado frases todavía. Escribe texto arriba.</div>';
      return;
    }

    sentences.forEach((sent, idx) => {
      const card = document.createElement('div');
      card.className = 'sentence-item group relative p-3 rounded-lg border border-slate-700/60 bg-slate-800/40 hover:bg-slate-800/80 transition-all duration-200';
      card.innerHTML = `
        <div class="flex items-center justify-between mb-1.5">
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              #${sent.id}
            </span>
            <span class="text-xs text-slate-400">Delimitador: <code class="px-1 py-0.5 bg-slate-900 rounded text-amber-300 font-mono">${sent.delimiter === '\n' ? '\\n' : sent.delimiter}</code></span>
          </div>
          <span class="text-xs text-slate-400">Longitud: ${sent.text.length} chars</span>
        </div>
        <p class="text-sm text-slate-200 leading-relaxed font-sans">${this.escapeHTML(sent.text)}</p>
      `;

      card.addEventListener('mouseenter', () => this.highlightSentenceTokens(sent.id, true));
      card.addEventListener('mouseleave', () => this.highlightSentenceTokens(sent.id, false));

      this.sentencesContainer.appendChild(card);
    });
  }

  /**
   * STAGE 3: Render Tokens (1 Token = 1 Palabra)
   */
  renderStage3Tokens(result) {
    const tokens = result.stages.stage3_tokens;
    this.tokensContainer.innerHTML = '';

    const countBadge = document.getElementById('stage3-count-badge');
    if (countBadge) {
      countBadge.textContent = `${tokens.length} palabras (1 palabra = 1 token)`;
    }

    if (tokens.length === 0) {
      this.tokensContainer.innerHTML = '<div class="text-sm text-slate-400 italic">Sin tokens generados.</div>';
      return;
    }

    tokens.forEach((t) => {
      const pill = document.createElement('div');
      pill.className = `token-chip inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all duration-200 cursor-pointer bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-400 hover:scale-105`;
      pill.setAttribute('data-token-id', t.id);
      pill.setAttribute('data-sentence-id', t.sentenceId);
      pill.title = `Token ID: ${t.id} | Frase: ${t.sentenceId} | Posición: ${t.indexInSentence}`;

      pill.innerHTML = `
        <span class="text-[10px] text-slate-500 font-mono">#${t.globalIndex}</span>
        <span class="font-semibold text-slate-100">${this.escapeHTML(t.word)}</span>
      `;

      pill.addEventListener('click', () => this.inspectToken(t));
      this.tokensContainer.appendChild(pill);
    });
  }

  /**
   * STAGE 4: Render Lemmatization (Lematización)
   */
  renderStage4Lemmas(result) {
    const tokens = result.stages.stage3_tokens;
    this.lemmasContainer.innerHTML = '';

    if (tokens.length === 0) {
      this.lemmasContainer.innerHTML = '<div class="text-sm text-slate-400 italic">Sin lemas disponibles.</div>';
      return;
    }

    tokens.forEach((t) => {
      const isChanged = t.lower !== t.lemma.toLowerCase();
      const card = document.createElement('div');
      card.className = `lemma-chip flex items-center justify-between p-2 rounded-md border text-xs transition-all ${
        isChanged
          ? 'bg-amber-950/20 border-amber-500/40 text-amber-200 shadow-sm shadow-amber-950/20'
          : 'bg-slate-800/50 border-slate-700/60 text-slate-300'
      }`;

      card.title = t.lemmaRule;

      card.innerHTML = `
        <div class="flex items-center space-x-2">
          <span class="font-medium text-slate-300">${this.escapeHTML(t.word)}</span>
          <span class="text-slate-500">➔</span>
          <span class="font-bold ${isChanged ? 'text-amber-400' : 'text-emerald-400'}">${this.escapeHTML(t.lemma)}</span>
        </div>
        <span class="text-[10px] px-1.5 py-0.5 rounded ${isChanged ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-700 text-slate-400'}">
          ${isChanged ? 'Transformado' : 'Base'}
        </span>
      `;

      this.lemmasContainer.appendChild(card);
    });
  }

  /**
   * STAGE 5: Render POS Tagging (Etiquetado Gramatical)
   */
  renderStage5POS(result) {
    const tokens = result.stages.stage3_tokens;
    this.posContainer.innerHTML = '';

    if (tokens.length === 0) {
      this.posContainer.innerHTML = '<div class="text-sm text-slate-400 italic">Sin etiquetas gramaticales.</div>';
      return;
    }

    // Populate category filter counts
    this.updatePOSFilterCounts(tokens);

    tokens.forEach((t) => {
      const p = t.pos;
      const isVisible = this.activeFilterCategory === 'ALL' || p.upos === this.activeFilterCategory;

      const pill = document.createElement('div');
      pill.className = `pos-chip inline-flex flex-col p-2 rounded-lg border text-xs transition-all cursor-pointer ${
        isVisible ? 'opacity-100' : 'opacity-20'
      }`;
      pill.style.backgroundColor = `${p.color}15`;
      pill.style.borderColor = `${p.color}50`;

      pill.innerHTML = `
        <div class="flex items-center justify-between space-x-2 mb-1">
          <span class="font-bold text-slate-100 text-xs">${this.escapeHTML(t.word)}</span>
          <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold" style="background-color: ${p.color}25; color: ${p.color};">
            ${p.tag}
          </span>
        </div>
        <div class="flex items-center justify-between text-[10px] text-slate-400">
          <span>${p.category}</span>
          <span class="font-mono text-slate-500">${p.upos}</span>
        </div>
      `;

      pill.title = `${t.word} | EAGLES: ${p.tag} | ${p.description}`;
      pill.addEventListener('click', () => this.inspectToken(t));

      this.posContainer.appendChild(pill);
    });
  }

  updatePOSFilterCounts(tokens) {
    const counts = { ALL: tokens.length };
    tokens.forEach(t => {
      const upos = t.pos.upos;
      counts[upos] = (counts[upos] || 0) + 1;
    });

    const buttons = this.posFilterBar.querySelectorAll('button[data-upos]');
    buttons.forEach(btn => {
      const upos = btn.getAttribute('data-upos');
      const count = counts[upos] || 0;
      const badge = btn.querySelector('.count-badge');
      if (badge) badge.textContent = count;

      btn.onclick = () => {
        this.activeFilterCategory = upos;
        buttons.forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
        btn.classList.add('bg-indigo-600', 'text-white');
        this.renderStage5POS(this.currentPipelineResult);
      };
    });
  }

  /**
   * STAGE 6: Render Stopwords Removal (Quitar Stopwords)
   */
  renderStage6Stopwords(result) {
    const tokens = result.stages.stage3_tokens;
    const swInfo = result.stages.stage6_stopwords;

    this.stopwordsDiffContainer.innerHTML = '';
    this.stopwordsCleanPreview.innerHTML = '';

    // Update progress bar
    const reduction = parseFloat(swInfo.reductionPercent);
    if (this.stopwordsProgressBar) {
      this.stopwordsProgressBar.style.width = `${reduction}%`;
    }
    if (this.stopwordsProgressLabel) {
      this.stopwordsProgressLabel.textContent = `${reduction}% de compresión (${swInfo.stopwordsCount} de ${swInfo.totalTokens} palabras eliminadas)`;
    }

    if (tokens.length === 0) {
      this.stopwordsDiffContainer.innerHTML = '<div class="text-sm text-slate-400 italic">Sin datos de stopwords.</div>';
      return;
    }

    // 1. Diff view: shows which tokens are kept vs removed
    tokens.forEach((t) => {
      const chip = document.createElement('span');
      if (t.isStopword) {
        chip.className = 'inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs line-through text-rose-300 bg-rose-950/40 border border-rose-800/40 mx-0.5 my-1';
        chip.title = `Stopword: ${t.stopwordReason || 'Palabra común sin valor semántico individual'}`;
        chip.innerHTML = `<span>${this.escapeHTML(t.word)}</span><span class="text-[10px] text-rose-400 ml-1">✗</span>`;
      } else {
        chip.className = 'inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-700/50 mx-0.5 my-1 shadow-sm';
        chip.title = `Palabra con contenido semántico | Lema: ${t.lemma} | PoS: ${t.pos.category}`;
        chip.innerHTML = `<span>${this.escapeHTML(t.word)}</span><span class="text-[10px] text-emerald-400 ml-1">✓</span>`;
      }
      this.stopwordsDiffContainer.appendChild(chip);
    });

    // 2. Clean preview: reconstructed sentence with only content words
    if (swInfo.semanticTokens.length === 0) {
      this.stopwordsCleanPreview.textContent = '(Todas las palabras eran stopwords)';
    } else {
      this.stopwordsCleanPreview.textContent = swInfo.semanticTokens.map(t => t.word).join(' ');
    }
  }

  /**
   * FreeLing Official Tabular View
   */
  renderFreelingTable(result) {
    const tokens = result.stages.stage3_tokens;
    this.freelingTableBody.innerHTML = '';

    if (tokens.length === 0) {
      this.freelingTableBody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-6 text-slate-400 italic">No hay tokens analizados todavía.</td>
        </tr>
      `;
      return;
    }

    tokens.forEach((t) => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-800/80 hover:bg-slate-800/40 transition-colors text-xs font-mono';
      tr.setAttribute('data-searchable', `${t.word} ${t.lemma} ${t.pos.tag} ${t.pos.category}`.toLowerCase());

      tr.innerHTML = `
        <td class="py-2.5 px-3 text-slate-500 font-bold">#${t.globalIndex}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-100 font-sans text-sm">${this.escapeHTML(t.word)}</td>
        <td class="py-2.5 px-3 text-emerald-400 font-medium">${this.escapeHTML(t.lemma)}</td>
        <td class="py-2.5 px-3">
          <span class="px-1.5 py-0.5 rounded text-[11px] font-bold" style="background-color: ${t.pos.color}25; color: ${t.pos.color};">
            ${t.pos.tag}
          </span>
        </td>
        <td class="py-2.5 px-3 text-slate-300 font-sans">${t.pos.category}</td>
        <td class="py-2.5 px-3 text-slate-400 font-sans">${t.pos.description}</td>
        <td class="py-2.5 px-3">
          ${
            t.isStopword
              ? '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30">Sí (Vacía)</span>'
              : '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">No (Semántica)</span>'
          }
        </td>
        <td class="py-2.5 px-3 text-slate-400 font-sans">${t.sentenceId}</td>
      `;

      this.freelingTableBody.appendChild(tr);
    });
  }

  filterTable(query) {
    const rows = this.freelingTableBody.querySelectorAll('tr[data-searchable]');
    rows.forEach(r => {
      const text = r.getAttribute('data-searchable') || '';
      r.style.display = text.includes(query) ? '' : 'none';
    });
  }

  /**
   * Highlight all tokens belonging to a sentence
   */
  highlightSentenceTokens(sentenceId, isHighlight) {
    const tokenChips = this.tokensContainer.querySelectorAll(`[data-sentence-id="${sentenceId}"]`);
    tokenChips.forEach(chip => {
      if (isHighlight) {
        chip.classList.add('ring-2', 'ring-indigo-400', 'bg-indigo-900/60');
      } else {
        chip.classList.remove('ring-2', 'ring-indigo-400', 'bg-indigo-900/60');
      }
    });
  }

  /**
   * Token Inspector Modal or Alert
   */
  inspectToken(token) {
    const msg = `
Token #${token.globalIndex}: "${token.word}"
• Lema: ${token.lemma} (${token.lemmaRule})
• Etiqueta EAGLES: ${token.pos.tag} (${token.pos.category})
• UPOS: ${token.pos.upos}
• Descripción: ${token.pos.description}
• ¿Es Stopword?: ${token.isStopword ? 'SÍ (' + token.stopwordReason + ')' : 'NO (Palabra de contenido semántico)'}
• Frase de origen: #${token.sentenceId}
    `;
    alert(msg.trim());
  }

  /**
   * Animation & Step Simulator
   */
  toggleAnimation() {
    if (this.animationState.isPlaying) {
      this.pauseAnimation();
    } else {
      this.startAnimation();
    }
  }

  startAnimation() {
    this.animationState.isPlaying = true;
    this.animatePlayBtn.innerHTML = `
      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      Pausar
    `;
    this.animatePlayBtn.classList.replace('bg-indigo-600', 'bg-amber-600');
    this.animatePlayBtn.classList.replace('hover:bg-indigo-500', 'hover:bg-amber-500');

    this.runAnimationLoop();
  }

  pauseAnimation() {
    this.animationState.isPlaying = false;
    clearTimeout(this.animationState.timer);
    this.animatePlayBtn.innerHTML = `
      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      Reproducir en Vivo
    `;
    this.animatePlayBtn.classList.replace('bg-amber-600', 'bg-indigo-600');
    this.animatePlayBtn.classList.replace('hover:bg-amber-500', 'hover:bg-indigo-500');
  }

  runAnimationLoop() {
    if (!this.animationState.isPlaying) return;

    this.stepAnimationForward();

    if (this.animationState.currentStep >= 6) {
      this.animationState.timer = setTimeout(() => {
        this.jumpToStep(1);
        if (this.animationState.isPlaying) {
          this.runAnimationLoop();
        }
      }, this.animationState.speedMs * 1.5);
    } else {
      this.animationState.timer = setTimeout(() => {
        this.runAnimationLoop();
      }, this.animationState.speedMs);
    }
  }

  stepAnimationForward() {
    let nextStep = this.animationState.currentStep + 1;
    if (nextStep > 6) nextStep = 1;
    this.jumpToStep(nextStep);
  }

  resetAnimation() {
    this.pauseAnimation();
    this.jumpToStep(1);
  }

  jumpToStep(step) {
    this.animationState.currentStep = step;

    // Update Stepper Nodes UI
    this.stepNodes.forEach(node => {
      const nodeStep = parseInt(node.getAttribute('data-step'), 10);
      if (nodeStep === step) {
        node.classList.add('ring-2', 'ring-indigo-400', 'bg-indigo-600', 'text-white');
        node.classList.remove('bg-slate-800', 'text-slate-400');
      } else if (nodeStep < step) {
        node.classList.add('bg-emerald-600', 'text-white');
        node.classList.remove('ring-2', 'ring-indigo-400', 'bg-slate-800', 'text-slate-400');
      } else {
        node.classList.remove('ring-2', 'ring-indigo-400', 'bg-indigo-600', 'bg-emerald-600', 'text-white');
        node.classList.add('bg-slate-800', 'text-slate-400');
      }
    });

    // Highlight the active card with a glowing ring
    Object.keys(this.stageCards).forEach(cardKey => {
      const card = this.stageCards[cardKey];
      if (card) {
        if (parseInt(cardKey, 10) === step) {
          card.classList.add('ring-2', 'ring-indigo-500', 'shadow-lg', 'shadow-indigo-500/20');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.classList.remove('ring-2', 'ring-indigo-500', 'shadow-lg', 'shadow-indigo-500/20');
        }
      }
    });
  }

  /**
   * Switch between Full Pipeline, Focused Simulator, and FreeLing Table
   */
  switchViewMode(mode) {
    const pipelineSection = document.getElementById('pipeline-cards-section');
    const tableSection = document.getElementById('freeling-table-section');

    if (mode === 'table') {
      pipelineSection.classList.add('hidden');
      tableSection.classList.remove('hidden');
    } else {
      pipelineSection.classList.remove('hidden');
      tableSection.classList.add('hidden');
    }
  }

  /**
   * Exports
   */
  exportJSON() {
    if (!this.currentPipelineResult) return;
    const blob = new Blob([JSON.stringify(this.currentPipelineResult, null, 2)], { type: 'application/json' });
    this.downloadBlob(blob, 'freeling_nmlp_analysis.json');
  }

  exportCSV() {
    if (!this.currentPipelineResult) return;
    const tokens = this.currentPipelineResult.stages.stage3_tokens;
    const headers = ['Index', 'Word', 'Lemma', 'EAGLES_Tag', 'UPOS', 'Category', 'Description', 'IsStopword', 'SentenceId'];
    const rows = tokens.map(t => [
      t.globalIndex,
      `"${t.word}"`,
      `"${t.lemma}"`,
      t.pos.tag,
      t.pos.upos,
      `"${t.pos.category}"`,
      `"${t.pos.description}"`,
      t.isStopword ? 'YES' : 'NO',
      t.sentenceId
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    this.downloadBlob(blob, 'freeling_nmlp_tokens.csv');
  }

  exportFreelingFormat() {
    if (!this.currentPipelineResult) return;
    const tokens = this.currentPipelineResult.stages.stage3_tokens;
    // Format identical to FreeLing CLI: Form Lemma Tag [Probability]
    const lines = tokens.map(t => `${t.word} ${t.lemma} ${t.pos.tag} 1`);
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8;' });
    this.downloadBlob(blob, 'freeling_output.txt');
  }

  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
