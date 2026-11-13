#!/usr/bin/env node
/**
 * CLI Helper: Execute full NMLP pipeline from terminal
 * Usage: node analyze-text.js "Texto a procesar..." [--lang es|en] [--format json|table]
 */

import { NLPEngine } from '../../../../js/nlp-engine.js';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Uso: node analyze-text.js "<texto>" [--lang es|en] [--format json|table]');
  process.exit(0);
}

let text = '';
let lang = 'es';
let format = 'table';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--lang' && args[i + 1]) {
    lang = args[++i];
  } else if (args[i] === '--format' && args[i + 1]) {
    format = args[++i];
  } else if (!text) {
    text = args[i];
  }
}

const engine = new NLPEngine({ language: lang });
const result = engine.runPipeline(text);

if (format === 'json') {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`\n======================================================`);
  console.log(`📊 REPORTE DE ANÁLISIS LINGÜÍSTICO NMLP`);
  console.log(`======================================================`);
  console.log(`• Frases detectadas: ${result.metrics.totalSentences}`);
  console.log(`• Tokens generados (1=1): ${result.metrics.totalTokens}`);
  console.log(`• Lemas únicos: ${result.metrics.uniqueLemmas}`);
  console.log(`• Stopwords filtradas: ${result.metrics.stopwordsCount} (${result.metrics.reductionPercent}% reducción)`);
  console.log(`• Tiempo de procesamiento: ${result.executionTimeMs} ms\n`);

  console.log(`--- TABLA DE TOKENS (FORMATO FREELING) ---`);
  console.log(`Idx | Forma       | Lema        | PoS EAGLES | Categoría      | Stopword`);
  console.log(`----+-------------+-------------+------------+----------------+---------`);
  result.stages.stage3_tokens.forEach(t => {
    const idx = String(t.globalIndex).padEnd(3);
    const form = t.word.padEnd(11);
    const lemma = t.lemma.padEnd(11);
    const tag = t.pos.tag.padEnd(10);
    const cat = t.pos.category.padEnd(14);
    const sw = t.isStopword ? 'SÍ' : 'NO';
    console.log(`${idx} | ${form} | ${lemma} | ${tag} | ${cat} | ${sw}`);
  });

  console.log(`\n--- ORACIÓN SEMÁNTICA RECONSTRUIDA ---`);
  console.log(`"${result.stages.stage6_stopwords.semanticTokens.map(t => t.word).join(' ')}"`);
  console.log(`======================================================\n`);
}
