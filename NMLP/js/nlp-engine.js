/**
 * NLP Pipeline Engine (FreeLing Replication)
 * Stages:
 *  1. Raw Data
 *  2. Segmentación de Frases
 *  3. Tokenización (1 token = 1 palabra)
 *  4. Lematización
 *  5. POS Tagging (EAGLES & UPOS)
 *  6. Quitar Stopwords
 */

import {
  STOPWORDS_SPANISH,
  STOPWORDS_ENGLISH,
  SPANISH_ABBREVIATIONS,
  EAGLES_TAXONOMY,
  SPANISH_IRREGULARS,
  SPANISH_LEXICON
} from './spanish-lexicon.js';

export class NLPEngine {
  constructor(options = {}) {
    this.language = options.language || 'es';
    this.customStopwords = new Set();
  }

  setLanguage(lang) {
    this.language = lang === 'en' ? 'en' : 'es';
  }

  /**
   * STAGE 1: Process Raw Data & Collect stats
   */
  processRawData(rawText) {
    if (!rawText || typeof rawText !== 'string') {
      return {
        text: '',
        length: 0,
        lineCount: 0,
        characterCount: 0,
        nonSpaceCount: 0
      };
    }

    return {
      text: rawText,
      length: rawText.length,
      lineCount: (rawText.match(/\n/g) || []).length + 1,
      characterCount: rawText.length,
      nonSpaceCount: rawText.replace(/\s+/g, '').length
    };
  }

  /**
   * STAGE 2: Segmentación de Frases (Sentence Segmentation)
   * Splits text into sentence boundaries, avoiding abbreviations and numbers.
   */
  segmentSentences(rawText) {
    if (!rawText || !rawText.trim()) return [];

    const text = rawText.trim();
    const sentences = [];
    let currentSentence = '';
    let startChar = 0;
    let i = 0;

    while (i < text.length) {
      const char = text[i];
      currentSentence += char;

      // Check if we hit a sentence terminator: . ! ? or newlines
      const isPunctuationTerminator = char === '.' || char === '!' || char === '?' || char === '…';
      const isNewline = char === '\n';

      if (isPunctuationTerminator || isNewline) {
        // Look ahead for trailing quotes/parentheses like ." or !)
        let endIdx = i;
        while (endIdx + 1 < text.length && /["'»\)\}]/.test(text[endIdx + 1])) {
          endIdx++;
          currentSentence += text[endIdx];
        }

        // Check if period is part of an abbreviation (e.g. "Dr.", "Sr.", "etc.")
        let isAbbrev = false;
        if (char === '.') {
          // Look at the last word in currentSentence before the dot
          const lastWordMatch = currentSentence.slice(0, -1).match(/([a-záéíóúñ]+)$/i);
          if (lastWordMatch) {
            const lastWord = lastWordMatch[1].toLowerCase();
            if (SPANISH_ABBREVIATIONS.has(lastWord)) {
              isAbbrev = true;
            }
          }
          // Number decimal (e.g. 3.14)
          if (i > 0 && i + 1 < text.length && /\d/.test(text[i - 1]) && /\d/.test(text[i + 1])) {
            isAbbrev = true;
          }
        }

        // Check ellipsis
        if (char === '.' && i + 1 < text.length && text[i + 1] === '.') {
          i = endIdx + 1;
          continue;
        }

        if (!isAbbrev) {
          // If followed by space or end of string, finish this sentence
          const isAtEnd = endIdx + 1 >= text.length;
          const followedBySpace = isAtEnd || /\s/.test(text[endIdx + 1]);

          if (isAtEnd || followedBySpace || isNewline) {
            const cleanSentence = currentSentence.trim();
            if (cleanSentence.length > 0) {
              sentences.push({
                id: `S${sentences.length + 1}`,
                index: sentences.length,
                text: cleanSentence,
                startOffset: startChar,
                endOffset: startChar + currentSentence.length,
                delimiter: char
              });
            }
            startChar += currentSentence.length;
            currentSentence = '';
            i = endIdx + 1;
            continue;
          }
        }
      }

      i++;
    }

    // Remainder text
    if (currentSentence.trim().length > 0) {
      sentences.push({
        id: `S${sentences.length + 1}`,
        index: sentences.length,
        text: currentSentence.trim(),
        startOffset: startChar,
        endOffset: text.length,
        delimiter: 'EOF'
      });
    }

    return sentences;
  }

  /**
   * STAGE 3: Tokenización (1 Token = 1 Palabra)
   * Converts sentences into clean word tokens.
   * Explicit requirement: "que un token equivalga a una palabra"
   */
  tokenizeWords(sentences) {
    const tokens = [];
    let globalIndex = 0;

    sentences.forEach((sentence) => {
      // Regex that matches unicode Spanish words with accents, tildes, hyphens inside words
      // Discards surrounding punctuation so tokens are strictly words!
      const wordRegex = /[a-záéíóúñüÁÉÍÓÚÑÜ0-9]+(?:-[a-záéíóúñüÁÉÍÓÚÑÜ0-9]+)*/gi;
      let match;
      let indexInSentence = 0;

      while ((match = wordRegex.exec(sentence.text)) !== null) {
        const rawWord = match[0];
        const tokenStart = sentence.startOffset + match.index;
        const tokenEnd = tokenStart + rawWord.length;

        tokens.push({
          id: `T${globalIndex + 1}`,
          globalIndex: globalIndex,
          sentenceId: sentence.id,
          indexInSentence: indexInSentence,
          word: rawWord,
          cleanWord: rawWord.trim(),
          lower: rawWord.toLowerCase(),
          isCapitalized: /^[A-ZÁÉÍÓÚÑ]/.test(rawWord),
          isAllUpper: rawWord.length > 1 && rawWord === rawWord.toUpperCase(),
          isNumeric: /^\d+$/.test(rawWord),
          startOffset: tokenStart,
          endOffset: tokenEnd
        });

        indexInSentence++;
        globalIndex++;
      }
    });

    return tokens;
  }

  /**
   * STAGE 4: Lematización (Lemmatization)
   * Finds the canonical base form (lemma) of each word token.
   */
  lemmatizeToken(token) {
    const word = token.lower;

    // 1. Check numbers
    if (token.isNumeric) {
      return {
        lemma: word,
        ruleApplied: 'Numeral invariante',
        tagHint: 'Z'
      };
    }

    // 2. Direct irregular lookup
    if (SPANISH_IRREGULARS[word]) {
      const [lemma, tag, upos, desc] = SPANISH_IRREGULARS[word];
      return {
        lemma,
        ruleApplied: `Diccionario irregular: ${desc}`,
        tagHint: tag,
        uposHint: upos
      };
    }

    // 3. Direct general lexicon lookup
    if (SPANISH_LEXICON[word]) {
      const [lemma, tag, upos] = SPANISH_LEXICON[word];
      return {
        lemma,
        ruleApplied: 'Léxico directo (lema base)',
        tagHint: tag,
        uposHint: upos
      };
    }

    // 4. Adverbs ending in -mente -> base adjective
    if (word.endsWith('mente') && word.length > 6) {
      const baseStem = word.slice(0, -5);
      return {
        lemma: baseStem,
        ruleApplied: 'Adverbio derivativo (-mente) -> Adjetivo base',
        tagHint: 'RG',
        uposHint: 'ADV'
      };
    }

    // 5. Morphological rule-based Lemmatizer for Spanish Verbs & Nouns
    // Regular verb suffixes for -ar, -er, -ir:
    // Imperfecto: -aba, -ábamos, -aban, -abas
    if (word.endsWith('ábamos')) {
      return { lemma: word.slice(0, -6) + 'ar', ruleApplied: 'Pret. imperfecto (-ábamos) -> -ar', tagHint: 'VMII1P0', uposHint: 'VERB' };
    }
    if (word.endsWith('aban') || word.endsWith('abas') || word.endsWith('aba')) {
      const stem = word.replace(/aba[ns]?$/, '');
      return { lemma: stem + 'ar', ruleApplied: 'Pret. imperfecto (-aba) -> -ar', tagHint: 'VMII3S0', uposHint: 'VERB' };
    }
    // Gerundio: -ando, -iendo
    if (word.endsWith('ando')) {
      return { lemma: word.slice(0, -4) + 'ar', ruleApplied: 'Gerundio (-ando) -> -ar', tagHint: 'VMG0000', uposHint: 'VERB' };
    }
    if (word.endsWith('iendo')) {
      return { lemma: word.slice(0, -5) + 'er', ruleApplied: 'Gerundio (-iendo) -> -er/-ir', tagHint: 'VMG0000', uposHint: 'VERB' };
    }
    // Participio: -ado, -ada, -ados, -adas
    if (/ad[ao]s?$/.test(word) && word.length > 4) {
      return { lemma: word.replace(/ad[ao]s?$/, 'ar'), ruleApplied: 'Participio regular (-ado) -> -ar', tagHint: 'VMP00SM', uposHint: 'VERB' };
    }
    // Participio: -ido, -ida, -idos, -idas
    if (/id[ao]s?$/.test(word) && word.length > 4) {
      return { lemma: word.replace(/id[ao]s?$/, 'ir'), ruleApplied: 'Participio regular (-ido) -> -ir/-er', tagHint: 'VMP00SM', uposHint: 'VERB' };
    }
    // Pretérito perfecto: -aron, -ieron, -aste, -iste, -ió, -ó
    if (word.endsWith('aron') && word.length > 5) {
      return { lemma: word.slice(0, -4) + 'ar', ruleApplied: 'Pret. perf. simple (-aron) -> -ar', tagHint: 'VMIS3P0', uposHint: 'VERB' };
    }
    if (word.endsWith('ieron') && word.length > 6) {
      return { lemma: word.slice(0, -5) + 'er', ruleApplied: 'Pret. perf. simple (-ieron) -> -er', tagHint: 'VMIS3P0', uposHint: 'VERB' };
    }
    if (word.endsWith('ó') && word.length > 3) {
      return { lemma: word.slice(0, -1) + 'ar', ruleApplied: 'Pret. perf. simple (-ó) -> -ar', tagHint: 'VMIS3S0', uposHint: 'VERB' };
    }
    if (word.endsWith('ió') && word.length > 4) {
      return { lemma: word.slice(0, -2) + 'er', ruleApplied: 'Pret. perf. simple (-ió) -> -er', tagHint: 'VMIS3S0', uposHint: 'VERB' };
    }
    // Verbos con pronombres clíticos enclíticos (acordarme, hacerlo, verte, etc.)
    const encliticMatch = word.match(/^([a-záéíóúñ]+(ar|er|ir))(me|te|se|nos|os|le|les|lo|la|los|las)$/i);
    if (encliticMatch && word.length > 5) {
      const infBase = encliticMatch[1];
      const clitic = encliticMatch[3];
      return {
        lemma: infBase,
        ruleApplied: `Verbo infinitivo (${infBase}) + clítico (-${clitic})`,
        tagHint: 'VMN0000',
        uposHint: 'VERB'
      };
    }

    // Futuro: -ará, -arán, -aremos, -erá, -irá
    if (/(ar|er|ir)(á|án|emos)$/.test(word)) {
      const match = word.match(/(ar|er|ir)/);
      const infEnding = match ? match[0] : 'ar';
      return { lemma: word.replace(/(ar|er|ir)(á|án|emos)$/, infEnding), ruleApplied: 'Futuro indicativo -> Infinitivo', tagHint: 'VMIF3S0', uposHint: 'VERB' };
    }

    // Noun / Adjective plural reduction
    // Words ending in -ces (luces -> luz, pez, cruz)
    if (word.endsWith('ces') && word.length > 4) {
      return { lemma: word.slice(0, -3) + 'z', ruleApplied: 'Plural regular (-ces) -> -z', tagHint: 'NCFP000', uposHint: 'NOUN' };
    }
    // Words ending in consonant + es (árboles -> árbol, mujeres -> mujer, canciones -> canción)
    if (word.endsWith('es') && word.length > 4 && !/[aeiouáéíóú]/.test(word.charAt(word.length - 3))) {
      const stem = word.slice(0, -2);
      // Restore accent if needed: canciones -> canción
      if (stem.endsWith('cion')) {
        return { lemma: stem.slice(0, -4) + 'ción', ruleApplied: 'Plural (-es) -> -ción', tagHint: 'NCFS000', uposHint: 'NOUN' };
      }
      return { lemma: stem, ruleApplied: 'Plural (-es) -> Singular consonante', tagHint: 'NCMP000', uposHint: 'NOUN' };
    }
    // Feminine plural -as -> -o (gatas -> gato)
    if (word.endsWith('as') && word.length > 3) {
      return { lemma: word.slice(0, -2) + 'o', ruleApplied: 'Femenino plural (-as) -> Masculino base (-o)', tagHint: 'NCFP000', uposHint: 'NOUN' };
    }
    // Masculine plural -os -> -o (perros -> perro)
    if (word.endsWith('os') && word.length > 3) {
      return { lemma: word.slice(0, -1), ruleApplied: 'Plural regular (-s) -> Singular (-o)', tagHint: 'NCMP000', uposHint: 'NOUN' };
    }
    // Feminine singular -a -> -o (gata -> gato, perra -> perro)
    if (word.endsWith('a') && word.length > 4 && !/^(día|mapa|planeta|problema|sistema|tema|idioma|clima)$/.test(word)) {
      // Possible feminine noun/adjective
      return { lemma: word.slice(0, -1) + 'o', ruleApplied: 'Femenino singular (-a) -> Lema masculino (-o)', tagHint: 'AQ0FS0', uposHint: 'ADJ' };
    }

    // Default: lemma is the lowercase word
    return {
      lemma: word,
      ruleApplied: 'Forma canónica por defecto',
      tagHint: null,
      uposHint: null
    };
  }

  /**
   * STAGE 5: POS Tagging (Part-of-Speech Tagging)
   * Assigns EAGLES and Universal PoS (UPOS) tags with morphological features.
   */
  tagTokenPOS(token, prevToken, nextToken) {
    const word = token.lower;

    const getColorForUPOS = (upos) => {
      switch (upos) {
        case 'NOUN': return '#10b981'; // Emerald
        case 'PROPN': return '#059669'; // Dark emerald
        case 'VERB': return '#3b82f6'; // Blue
        case 'AUX': return '#6366f1'; // Indigo
        case 'ADJ': return '#f59e0b'; // Amber
        case 'ADV': return '#a855f7'; // Purple
        case 'DET': return '#06b6d4'; // Cyan
        case 'PRON': return '#ec4899'; // Pink
        case 'ADP': return '#64748b'; // Slate
        case 'CCONJ':
        case 'SCONJ': return '#eab308'; // Yellow
        case 'NUM': return '#14b8a6'; // Teal
        default: return '#94a3b8';
      }
    };

    // 1. Direct Irregular mapping
    if (SPANISH_IRREGULARS[word]) {
      const [, tag, upos, morph] = SPANISH_IRREGULARS[word];
      const taxonomy = EAGLES_TAXONOMY[tag] || {};
      return {
        tag,
        upos,
        category: taxonomy.cat || upos,
        description: morph || taxonomy.desc || 'Forma irregular en diccionario',
        color: taxonomy.color || getColorForUPOS(upos),
        confidence: 0.98
      };
    }

    // 2. Direct Lexicon mapping (includes nouns, verbs, prepositions, conjunctions, determiners)
    if (SPANISH_LEXICON[word]) {
      const [, tag, upos, desc] = SPANISH_LEXICON[word];
      const taxonomy = EAGLES_TAXONOMY[tag] || {};
      return {
        tag,
        upos,
        category: taxonomy.cat || (upos === 'DET' ? 'Determinante' : (upos === 'ADP' ? 'Preposición' : (upos === 'CCONJ' || upos === 'SCONJ' ? 'Conjunción' : (upos === 'PRON' ? 'Pronombre' : upos)))),
        description: desc || taxonomy.desc || 'Léxico morfológico FreeLing',
        color: taxonomy.color || getColorForUPOS(upos),
        confidence: 0.95
      };
    }

    // 3. Numbers
    if (token.isNumeric) {
      return {
        tag: 'Z',
        upos: 'NUM',
        category: 'Número',
        description: 'Cifra o valor numérico',
        color: EAGLES_TAXONOMY['Z'].color,
        confidence: 1.0
      };
    }

    // 4. Proper Nouns (NP00000)
    // Capitalized and not at the start of sentence
    if (token.isCapitalized && token.indexInSentence > 0) {
      return {
        tag: 'NP00000',
        upos: 'PROPN',
        category: 'Nombre Propio',
        description: 'Entidad nombrada o nombre propio',
        color: EAGLES_TAXONOMY['NP00000'].color,
        confidence: 0.9
      };
    }

    // 5. Contextual Disambiguation
    // If preceded by a determiner (el, la, los, un, una, etc.) -> NOUN or ADJ
    if (prevToken) {
      const prevWord = prevToken.lower;
      const isPrevDet = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'este', 'esta', 'ese', 'su', 'mi', 'tu'].includes(prevWord);
      const isPrevPrep = ['de', 'en', 'con', 'por', 'para', 'sobre', 'sin', 'hacia', 'desde', 'hasta'].includes(prevWord);

      if (isPrevDet) {
        // If next is a known noun or followed by verb, this could be adjective
        if (word.endsWith('oso') || word.endsWith('osa') || word.endsWith('al') || word.endsWith('ble') || word.endsWith('nte')) {
          return {
            tag: word.endsWith('a') ? 'AQ0FS0' : 'AQ0MS0',
            upos: 'ADJ',
            category: 'Adjetivo',
            description: 'Adjetivo modificador de sintagma nominal',
            color: EAGLES_TAXONOMY['AQ0MS0'].color,
            confidence: 0.88
          };
        }
        // Likely noun
        return {
          tag: word.endsWith('s') ? (word.endsWith('as') ? 'NCFP000' : 'NCMP000') : (word.endsWith('a') ? 'NCFS000' : 'NCMS000'),
          upos: 'NOUN',
          category: 'Sustantivo',
          description: 'Sustantivo determinado en sintagma',
          color: EAGLES_TAXONOMY['NCMS000'].color,
          confidence: 0.85
        };
      }

      if (isPrevPrep) {
        // Preposition + verb infinitive or noun
        if (word.endsWith('ar') || word.endsWith('er') || word.endsWith('ir')) {
          return {
            tag: 'VMN0000',
            upos: 'VERB',
            category: 'Verbo',
            description: 'Verbo en infinitivo regido por preposición',
            color: EAGLES_TAXONOMY['VMN0000'].color,
            confidence: 0.92
          };
        }
      }
    }

    // 6. Suffix-based POS classification
    // Adverb (-mente)
    if (word.endsWith('mente') && word.length > 6) {
      return {
        tag: 'RG',
        upos: 'ADV',
        category: 'Adverbio',
        description: 'Adverbio de modo en -mente',
        color: EAGLES_TAXONOMY['RG'].color,
        confidence: 0.95
      };
    }

    // Verb suffixes
    if (/(aron|ieron|aban|iendo|ando|aron|ó|ió|ará|arán|aría|arían)$/.test(word)) {
      return {
        tag: 'VMIP3S0',
        upos: 'VERB',
        category: 'Verbo',
        description: 'Verbo conjugado según desinencia',
        color: EAGLES_TAXONOMY['VMIP3S0'].color,
        confidence: 0.85
      };
    }

    // Infinitives and Enclitics
    if (/^([a-záéíóúñ]+(ar|er|ir))(me|te|se|nos|os|le|les|lo|la|los|las)$/i.test(word)) {
      return {
        tag: 'VMN0000',
        upos: 'VERB',
        category: 'Verbo',
        description: 'Verbo en infinitivo con pronombre clítico enclítico',
        color: EAGLES_TAXONOMY['VMN0000'].color,
        confidence: 0.94
      };
    }

    if (/(ar|er|ir)$/.test(word) && word.length > 3) {
      return {
        tag: 'VMN0000',
        upos: 'VERB',
        category: 'Verbo',
        description: 'Verbo infinitivo',
        color: EAGLES_TAXONOMY['VMN0000'].color,
        confidence: 0.9
      };
    }

    // Common adjective suffixes (-able, -ible, -oso, -osa, -al, -ivo, -iva)
    if (/(able|ible|oso|osa|osos|osas|al|ales|ivo|iva|ivos|ivas)$/.test(word)) {
      return {
        tag: 'AQ0CS0',
        upos: 'ADJ',
        category: 'Adjetivo',
        description: 'Adjetivo calificativo derivativo',
        color: EAGLES_TAXONOMY['AQ0CS0'].color,
        confidence: 0.82
      };
    }

    // Substantive default
    return {
      tag: word.endsWith('a') ? 'NCFS000' : 'NCMS000',
      upos: 'NOUN',
      category: 'Sustantivo',
      description: 'Nombre común (regla general morfológica)',
      color: EAGLES_TAXONOMY['NCMS000'].color,
      confidence: 0.75
    };
  }

  /**
   * STAGE 6: Quitar Stopwords (Stopword Removal)
   * Detects whether the token is a stopword and marks it for removal/filtering.
   */
  filterStopword(token) {
    const word = token.lower;
    const stopwordSet = this.language === 'en' ? STOPWORDS_ENGLISH : STOPWORDS_SPANISH;

    const isBuiltinStopword = stopwordSet.has(word);
    const isCustomStopword = this.customStopwords.has(word);
    const isStopword = isBuiltinStopword || isCustomStopword;

    let stopwordReason = '';
    if (isStopword) {
      if (token.pos && token.pos.category) {
        stopwordReason = `Palabra vacía gramatical (${token.pos.category})`;
      } else {
        stopwordReason = 'Palabra vacía de alta frecuencia sin carga semántica léxica';
      }
    }

    return {
      isStopword,
      stopwordReason,
      isKept: !isStopword
    };
  }

  /**
   * FULL PIPELINE EXECUTION
   * Executes all 6 stages synchronously with detailed intermediate metrics and timeline
   */
  runPipeline(rawText) {
    const startTime = performance.now();

    // 1. Raw Data
    const rawData = this.processRawData(rawText);

    // 2. Sentence Segmentation
    const sentences = this.segmentSentences(rawData.text);

    // 3. Tokenization (1 Token = 1 Palabra)
    const rawTokens = this.tokenizeWords(sentences);

    // 4. Lemmatization & 5. POS Tagging & 6. Stopwords Removal
    const processedTokens = rawTokens.map((token, idx, arr) => {
      const prevToken = idx > 0 ? arr[idx - 1] : null;
      const nextToken = idx < arr.length - 1 ? arr[idx + 1] : null;

      // Lemmatization
      const lemmaResult = this.lemmatizeToken(token);

      // POS Tagging
      const posResult = this.tagTokenPOS(token, prevToken, nextToken);

      const tokenWithLinguistics = {
        ...token,
        lemma: lemmaResult.lemma,
        lemmaRule: lemmaResult.ruleApplied,
        pos: posResult
      };

      // Stopword Filtering
      const stopwordResult = this.filterStopword(tokenWithLinguistics);

      return {
        ...tokenWithLinguistics,
        ...stopwordResult
      };
    });

    // Semantic tokens (filtered tokens keeping only content words)
    const semanticTokens = processedTokens.filter(t => !t.isStopword);
    const stopwordsTokens = processedTokens.filter(t => t.isStopword);

    // Calculate Vocabulary & Lexical Metrics
    const uniqueTokens = new Set(processedTokens.map(t => t.lower)).size;
    const uniqueLemmas = new Set(processedTokens.map(t => t.lemma)).size;
    const ttr = processedTokens.length > 0 ? ((uniqueTokens / processedTokens.length) * 100).toFixed(1) : 0;
    const reductionRate = processedTokens.length > 0
      ? (((processedTokens.length - semanticTokens.length) / processedTokens.length) * 100).toFixed(1)
      : 0;

    const endTime = performance.now();
    const executionTimeMs = (endTime - startTime).toFixed(2);

    return {
      timestamp: new Date().toISOString(),
      executionTimeMs,
      stages: {
        stage1_rawData: rawData,
        stage2_sentences: sentences,
        stage3_tokens: processedTokens,
        stage4_lemmas: processedTokens.map(t => ({ token: t.word, lemma: t.lemma, rule: t.lemmaRule })),
        stage5_pos: processedTokens.map(t => ({ token: t.word, tag: t.pos.tag, upos: t.pos.upos, cat: t.pos.category, desc: t.pos.description, color: t.pos.color })),
        stage6_stopwords: {
          totalTokens: processedTokens.length,
          stopwordsCount: stopwordsTokens.length,
          semanticCount: semanticTokens.length,
          reductionPercent: reductionRate,
          semanticTokens: semanticTokens,
          removedTokens: stopwordsTokens
        }
      },
      metrics: {
        totalCharacters: rawData.characterCount,
        totalSentences: sentences.length,
        totalTokens: processedTokens.length,
        uniqueTokens,
        uniqueLemmas,
        ttrPercent: ttr,
        stopwordsCount: stopwordsTokens.length,
        semanticTokensCount: semanticTokens.length,
        reductionPercent: reductionRate
      }
    };
  }
}
