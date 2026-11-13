---
name: nlp-preprocessing-pipeline
description: >-
  Executes and explains the 6-stage classical Natural Language Processing (PLN / NMLP) pipeline inspired by UPC FreeLing.
  Use this skill when the user asks to analyze text, segment sentences, tokenize words (where 1 token = 1 word),
  perform morphological lemmatization, assign EAGLES/UPOS grammatical tags, or filter stopwords.
---

# NLP Preprocessing Pipeline (FreeLing Style)

This skill provides step-by-step instructions and tools to execute the complete classical NLP pipeline:
`Raw Data ➔ Sentence Segmentation ➔ Word Tokenization ➔ Lemmatization ➔ POS Tagging ➔ Stopword Filtering`.

## Pipeline Architecture

```text
[1. Raw Data]
       │
       ▼
[2. Sentence Segmentation] ── Identifies sentence boundaries (. ! ? \n) protecting abbreviations (Dr., Sr.)
       │
       ▼
[3. Word Tokenization]     ── Guarantees strictly 1 Token = 1 Word, isolating punctuation
       │
       ▼
[4. Lemmatization]         ── Maps inflected forms (verbs, plurals, feminine) to dictionary canonical lemma
       │
       ▼
[5. POS Tagging]           ── Assigns official FreeLing/EAGLES (e.g. VMIP3S0, NCMS000) and Universal UPOS tags
       │
       ▼
[6. Stopwords Removal]     ── Identifies and purges non-informative functional words
```

## How to Execute

### 1. Using the Command-Line Helper Script
You can run the NLP pipeline directly from the command line using the packaged script:

```bash
node .agents/skills/nlp-preprocessing-pipeline/scripts/analyze-text.js "El veloz zorro marrón salta sobre el perro perezoso." --format table
```

Or output as structured JSON:
```bash
node .agents/skills/nlp-preprocessing-pipeline/scripts/analyze-text.js "Texto a analizar" --format json
```

### 2. Using the JavaScript API
Inside any module or Node.js environment:

```javascript
import { NLPEngine } from './js/nlp-engine.js';

const engine = new NLPEngine({ language: 'es' });
const result = engine.runPipeline("Tu texto en bruto aquí...");

console.log(result.metrics);
console.log(result.stages.stage3_tokens);
```

### 3. Verification & Rules Checklist
- **1 Token = 1 Word Rule**: Punctuation symbols (`.`, `,`, `;`, `!`, `?`, `"`, `(`, `)`) must never be treated as word tokens.
- **Irregular Verb Lemmatization**: Ensure irregular verbs (`es` ➔ `ser`, `fue` ➔ `ser` o `ir`, `tiene` ➔ `tener`, `durmiendo` ➔ `dormir`) correctly resolve to their infinitive.
- **EAGLES Standard Tags**: Verify the second letter matches morphology (`VM` = Verbo Principal, `NC` = Nombre Común, `AQ` = Adjetivo Calificativo, `DA` = Determinante Artículo, `SP` = Preposición).
