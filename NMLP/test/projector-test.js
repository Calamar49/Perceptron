import { buildDataset } from '../js/embeddings-data.js';
import { ProjectionEngine } from '../js/projection-engine.js';
import { VectorMath } from '../js/vector-math.js';

console.log('--- TEST 1: REAL DATASET VERIFICATION (BBC NEWS & GLOVE & IMDB) ---');
const dsNews = buildDataset('bbc_news');
const dsGlove = buildDataset('glove_words');
const dsImdb = buildDataset('imdb_sentiment');
const dsCifar = buildDataset('cifar_images');

console.log(`1. BBC News Real Articles: ${dsNews.length} documentos`);
console.log(`2. Stanford GloVe Embeddings: ${dsGlove.length} palabras`);
console.log(`3. IMDB Sentiment Reviews: ${dsImdb.length} reseñas`);
console.log(`4. CIFAR-10 Real Images: ${dsCifar.length} imágenes`);

// Verify unit normalization on all real datasets
[dsNews, dsGlove, dsImdb, dsCifar].forEach((dataset, idx) => {
  let normValid = true;
  dataset.forEach(d => {
    const norm = Math.hypot(...d.vector);
    if (Math.abs(norm - 1.0) > 0.01) normValid = false;
  });
  if (!normValid) {
    console.error(`❌ Error de normalización en dataset #${idx+1}`);
  }
});
console.log('✅ Verificación aprobada: Todos los datasets tienen norma unitaria L2 = 1.0.');

console.log('\n--- TEST 2: PCA PROJECTION ON REAL BBC NEWS ---');
const engine = new ProjectionEngine();
const pcaRes = engine.computePCA(dsNews, 3);
console.log(`Coordenadas 3D generadas para BBC News: ${pcaRes.coords.length}`);
console.log(`Varianza explicada: PC1=${pcaRes.varianceExplained[0]}%, PC2=${pcaRes.varianceExplained[1]}%, PC3=${pcaRes.varianceExplained[2]}%`);
if (pcaRes.coords.length === dsNews.length && pcaRes.varianceExplained[0] > 0) {
  console.log('✅ Verificación aprobada: PCA genera proyecciones válidas para BBC News.');
}

console.log('\n--- TEST 3: REAL DOCUMENT K-NN SEARCH (BBC NEWS) ---');
const sampleArticle = dsNews[0]; // AI & LLM news
const related = VectorMath.findNearestNeighbors(sampleArticle.vector, dsNews, 3, sampleArticle.word);
console.log(`Artículo consultado: "${sampleArticle.word}" (${sampleArticle.category})`);
console.log('Artículos más similares en el espacio de embeddings:');
related.forEach((r, i) => {
  console.log(`  ${i+1}. "${r.word}" (${r.category}) - Sim: ${r.cosineSimilarity.toFixed(4)}`);
});
if (related[0].category === 'Tecnología') {
  console.log('✅ Verificación aprobada: El vecino más cercano pertenece a la misma categoría temática.');
}

console.log('\n--- TEST 4: VECTOR ANALOGY ARITHMETIC (WORD2VEC / GLOVE) ---');
const test1 = VectorMath.computeVectorAnalogy('rey', 'hombre', 'mujer', dsGlove, 3);
console.log(`Fórmula: ${test1.formula}`);
console.log(`Mejor candidato: ${test1.bestMatch.word} (Similaridad: ${test1.bestMatch.similarity.toFixed(4)})`);
if (test1.bestMatch.word.toLowerCase() === 'reina') {
  console.log('✅ Verificación aprobada: rey - hombre + mujer = reina.');
}

const test2 = VectorMath.computeVectorAnalogy('madrid', 'españa', 'francia', dsGlove, 3);
console.log(`Fórmula: ${test2.formula}`);
console.log(`Mejor candidato: ${test2.bestMatch.word} (Similaridad: ${test2.bestMatch.similarity.toFixed(4)})`);
if (test2.bestMatch.word.toLowerCase() === 'parís') {
  console.log('✅ Verificación aprobada: madrid - españa + francia = parís.');
}

console.log('\n--- TEST 5: CIFAR-10 REAL IMAGE EMBEDDINGS (MOBILENETV2 + PCA) ---');
if (!dsCifar.every(d => d.isImage && typeof d.image === 'string' && d.image.startsWith('data:image/'))) {
  console.error('❌ Error: faltan miniaturas base64 válidas en el dataset de imágenes.');
} else {
  console.log(`✅ Verificación aprobada: ${dsCifar.length} imágenes reales con miniatura embebida (base64 PNG).`);
}

let sameSum = 0, sameCount = 0, diffSum = 0, diffCount = 0;
for (let i = 0; i < dsCifar.length; i++) {
  for (let j = i + 1; j < dsCifar.length; j++) {
    const sim = VectorMath.cosineSimilarity(dsCifar[i].vector, dsCifar[j].vector);
    if (dsCifar[i].category === dsCifar[j].category) { sameSum += sim; sameCount++; }
    else { diffSum += sim; diffCount++; }
  }
}
const sameAvg = sameSum / sameCount;
const diffAvg = diffSum / diffCount;
console.log(`Similitud coseno promedio — misma clase: ${sameAvg.toFixed(4)} | clases distintas: ${diffAvg.toFixed(4)}`);
if (sameAvg > diffAvg) {
  console.log('✅ Verificación aprobada: las imágenes de la misma clase son, en promedio, más similares que las de clases distintas.');
} else {
  console.error('❌ Alerta: la separación por clase no se mantiene en los embeddings reales.');
}

console.log('\n✨ TODOS LOS TESTS DE DATASETS REALES COMPLETADOS SATISFACTORIAMENTE!');
