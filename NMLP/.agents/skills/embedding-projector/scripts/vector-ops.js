#!/usr/bin/env node
/**
 * CLI Helper: Vector Math & Semantic Operations for Embeddings
 * Usage:
 *  - node vector-ops.js analogy <wordA> <wordB> <wordC> [dataset]
 *  - node vector-ops.js knn <word> [k] [dataset]
 *  - node vector-ops.js pca [dataset]
 */

import { buildDataset } from '../../../../js/embeddings-data.js';
import { VectorMath } from '../../../../js/vector-math.js';
import { ProjectionEngine } from '../../../../js/projection-engine.js';

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log('Uso:');
  console.log('  node vector-ops.js analogy <wordA> <wordB> <wordC> [dataset]');
  console.log('  node vector-ops.js knn <word> [k] [dataset]');
  console.log('  node vector-ops.js pca [dataset]');
  process.exit(0);
}

if (command === 'analogy') {
  const [, a, b, c, dsKey = 'glove_words'] = args;
  if (!a || !b || !c) {
    console.error('Error: Debes proporcionar 3 palabras para la analogía (A - B + C)');
    process.exit(1);
  }
  const dataset = buildDataset(dsKey);
  const result = VectorMath.computeVectorAnalogy(a, b, c, dataset, 5);

  if (!result.success) {
    console.error('Error:', result.error);
    process.exit(1);
  }

  console.log(`\n======================================================`);
  console.log(`📐 ÁLGEBRA VECTORIAL SEMÁNTICA (A - B + C = ?)`);
  console.log(`======================================================`);
  console.log(`Fórmula: ${result.formula}`);
  console.log(`Mejor candidato: ${result.bestMatch.word.toUpperCase()} (Similaridad: ${result.bestMatch.similarity.toFixed(4)})\n`);
  console.log(`Top 5 candidatos más cercanos:`);
  result.topMatches.forEach((m, idx) => {
    console.log(`  ${idx + 1}. ${m.word.padEnd(16)} | Categoría: ${m.category.padEnd(12)} | Similaridad: ${m.similarity.toFixed(4)}`);
  });
  console.log(`======================================================\n`);
} else if (command === 'knn') {
  const [, word, kStr = '5', dsKey = 'bbc_news'] = args;
  const k = parseInt(kStr, 10);
  const dataset = buildDataset(dsKey);

  let targetVec = null;
  const match = dataset.find(d => d.word.toLowerCase() === word.toLowerCase());
  if (match) {
    targetVec = match.vector;
  } else {
    console.log(`ℹ️ La palabra "${word}" no existe en el dataset. Sintetizando nuevo embedding 50D...`);
    targetVec = VectorMath.synthesizeCustomEmbedding(word, 'Personalizado', [], dataset, 50);
  }

  const neighbors = VectorMath.findNearestNeighbors(targetVec, dataset, k, match ? word : null);
  console.log(`\n======================================================`);
  console.log(`🔍 BÚSQUEDA K-NN (VECINOS MÁS CERCANOS EN ESPACIO 50D)`);
  console.log(`======================================================`);
  console.log(`Consulta: "${word}" | Dataset: ${dsKey}`);
  console.log(`Top ${k} vecinos encontrados por Similaridad Coseno:\n`);
  neighbors.forEach((n, idx) => {
    console.log(`  ${idx + 1}. ${n.word.padEnd(35)} | ${n.category.padEnd(14)} | Sim: ${n.cosineSimilarity.toFixed(4)} (${n.similarityPercent}%)`);
  });
  console.log(`======================================================\n`);
} else if (command === 'pca') {
  const [, dsKey = 'bbc_news'] = args;
  const dataset = buildDataset(dsKey);
  const engine = new ProjectionEngine();
  const res = engine.computePCA(dataset, 3);

  console.log(`\n======================================================`);
  console.log(`📉 ANÁLISIS DE COMPONENTES PRINCIPALES (PCA)`);
  console.log(`======================================================`);
  console.log(`Dataset: ${dsKey} (${dataset.length} elementos en 50D)`);
  console.log(`• Varianza explicada PC1: ${res.varianceExplained[0]}%`);
  console.log(`• Varianza explicada PC2: ${res.varianceExplained[1]}%`);
  console.log(`• Varianza explicada PC3: ${res.varianceExplained[2]}%`);
  const total = (res.varianceExplained[0] + res.varianceExplained[1] + res.varianceExplained[2]).toFixed(1);
  console.log(`• Varianza acumulada 3D:  ${total}%\n`);
  console.log(`Muestra de coordenadas proyectadas (primeros 5 elementos):`);
  dataset.slice(0, 5).forEach((item, idx) => {
    const c = res.coords[idx];
    console.log(`  • "${item.word.slice(0, 25).padEnd(25)}" ➔ X: ${c[0].toFixed(1)}, Y: ${c[1].toFixed(1)}, Z: ${c[2].toFixed(1)}`);
  });
  console.log(`======================================================\n`);
}
