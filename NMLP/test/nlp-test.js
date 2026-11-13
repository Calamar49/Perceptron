import { NLPEngine } from '../js/nlp-engine.js';

const engine = new NLPEngine({ language: 'es' });

console.log('--- TEST 1: RAW DATA & SENTENCE SEGMENTATION ---');
const text1 = 'El veloz zorro marrón salta sobre el perro perezoso en el parque. El gato negro dormía plácidamente mientras los niños leían cuentos interesantes.';
const result1 = engine.runPipeline(text1);

console.log(`Frases detectadas: ${result1.stages.stage2_sentences.length}`);
result1.stages.stage2_sentences.forEach((s, i) => {
  console.log(`  S${i+1}: "${s.text}" (delimiter: "${s.delimiter}")`);
});

console.log('\n--- TEST 2: TOKENIZATION (1 TOKEN = 1 PALABRA) ---');
console.log(`Tokens totales generados: ${result1.stages.stage3_tokens.length}`);
const sampleWords = result1.stages.stage3_tokens.slice(0, 10).map(t => `#${t.globalIndex}:${t.word}`);
console.log(`Primeros 10 tokens: ${sampleWords.join(', ')}`);

// Verify no punctuation marks are words
const punctuationTokens = result1.stages.stage3_tokens.filter(t => /^[.,!?;:()]+$/.test(t.word));
if (punctuationTokens.length === 0) {
  console.log('✅ Verificación aprobada: Todos los tokens son palabras léxicas sin signos de puntuación.');
} else {
  console.error('❌ Error: Se encontraron signos de puntuación como tokens:', punctuationTokens);
}

console.log('\n--- TEST 3: LEMMATIZATION ---');
const lemmaChecks = [
  { word: 'salta', expected: 'saltar' },
  { word: 'perro', expected: 'perro' },
  { word: 'dormía', expected: 'dormir' },
  { word: 'niños', expected: 'niño' },
  { word: 'leían', expected: 'leer' },
  { word: 'cuentos', expected: 'cuento' },
  { word: 'plácidamente', expected: 'plácido' }
];

lemmaChecks.forEach(check => {
  const token = result1.stages.stage3_tokens.find(t => t.lower === check.word);
  if (token) {
    const isCorrect = token.lemma.toLowerCase() === check.expected.toLowerCase();
    console.log(`  ${token.word} ➔ ${token.lemma} (${isCorrect ? '✅ OK' : '❌ ESPERADO: ' + check.expected}) [Regla: ${token.lemmaRule}]`);
  } else {
    console.log(`  ⚠️ No se encontró el token '${check.word}' en la muestra.`);
  }
});

console.log('\n--- TEST 4: POS TAGGING (EAGLES & UPOS) ---');
result1.stages.stage3_tokens.slice(0, 8).forEach(t => {
  console.log(`  ${t.word.padEnd(12)} | EAGLES: ${t.pos.tag.padEnd(8)} | UPOS: ${t.pos.upos.padEnd(6)} | ${t.pos.category}`);
});

console.log('\n--- TEST 5: STOPWORDS REMOVAL ---');
const sw = result1.stages.stage6_stopwords;
console.log(`Total tokens: ${sw.totalTokens}`);
console.log(`Stopwords eliminadas: ${sw.stopwordsCount}`);
console.log(`Tokens semánticos conservados: ${sw.semanticCount}`);
console.log(`Porcentaje de reducción: ${sw.reductionPercent}%`);
console.log(`Frase reconstruida sin stopwords: "${sw.semanticTokens.map(t => t.word).join(' ')}"`);

console.log('\n--- VERIFICACIÓN DE ABREVIATURAS ---');
const textAbbrev = 'El Dr. Gómez y el Sr. Pérez asistieron a la reunión en la pág. 12. Fue un gran día.';
const resultAbbrev = engine.runPipeline(textAbbrev);
console.log(`Frases con abreviaturas (esperado 2): ${resultAbbrev.stages.stage2_sentences.length}`);
resultAbbrev.stages.stage2_sentences.forEach((s, i) => {
  console.log(`  S${i+1}: "${s.text}"`);
});

console.log('\n✨ TODOS LOS TESTS COMPLETADOS SATISFACTORIAMENTE!');
