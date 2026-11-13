#!/usr/bin/env node
/**
 * validate-dataset.js — Validador CLI de datasets NMLP
 *
 * Verifica normalización L2, dimensiones, categorías y estadísticas
 * de todos los datasets del Projector de Embeddings.
 *
 * Uso:
 *   node .agents/skills/dataset-management/scripts/validate-dataset.js
 *   node .agents/skills/dataset-management/scripts/validate-dataset.js bbc_news
 *   node .agents/skills/dataset-management/scripts/validate-dataset.js --verbose
 */

import { buildDataset, DATASET_METADATA } from '../../../../js/embeddings-data.js';

// ─── Helpers de validación ───────────────────────────────────────────────────

function l2Norm(v) {
  return Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
}

function allFinite(v) {
  return v.every(x => Number.isFinite(x));
}

function stats(arr) {
  if (!arr.length) return { min: 0, max: 0, mean: 0, std: 0 };
  const mean     = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((s, x) => s + (x - mean) ** 2, 0) / arr.length;
  return {
    min:  Math.min(...arr),
    max:  Math.max(...arr),
    mean,
    std:  Math.sqrt(variance),
  };
}

// ─── Validación de un dataset ────────────────────────────────────────────────

function validateDataset(datasetId, points, options = {}) {
  const { expectedDims = 50, l2Tolerance = 0.001 } = options;
  const errors     = [];
  const warnings   = [];
  const norms      = [];
  const categories = new Set();
  const ids        = new Set();

  for (let i = 0; i < points.length; i++) {
    const p      = points[i];
    const label  = p?.word || p?.headline || p?.id || `Item_${i}`;
    const prefix = `  [${i}] "${label}"`;

    if (p.id === undefined || p.id === null) errors.push(`${prefix}: falta 'id'`);
    if (!p.category) errors.push(`${prefix}: falta 'category'`);
    if (!p.vector)   { errors.push(`${prefix}: falta 'vector'`); continue; }

    if (ids.has(p.id)) errors.push(`${prefix}: ID duplicado '${p.id}'`);
    ids.add(p.id);

    const v = Array.from(p.vector);
    if (v.length !== expectedDims) {
      errors.push(`${prefix}: dimensiones incorrectas (esperado ${expectedDims}, obtenido ${v.length})`);
      continue;
    }

    if (!allFinite(v)) {
      errors.push(`${prefix}: vector contiene NaN o Infinity`);
      continue;
    }

    const norm = l2Norm(v);
    norms.push(norm);
    if (Math.abs(norm - 1.0) > l2Tolerance) {
      errors.push(`${prefix}: norma L2 = ${norm.toFixed(6)} (esperado 1.0 ± ${l2Tolerance})`);
    }

    categories.add(p.category);
  }

  if (points.length < 5) {
    warnings.push(`Dataset tiene solo ${points.length} puntos (mínimo recomendado: 10)`);
  }

  const normStats = stats(norms);
  return {
    ok: errors.length === 0,
    errors,
    warnings,
    stats: {
      count:      points.length,
      categories: [...categories].sort(),
      normMean:   normStats.mean,
      normStd:    normStats.std,
      normMin:    normStats.min,
      normMax:    normStats.max,
    },
  };
}

// ─── Presentación de resultados ──────────────────────────────────────────────

const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  green:  '\x1b[32m',
  red:    '\x1b[31m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
};

function printResult(datasetId, result, verbose) {
  const icon   = result.ok ? `${C.green}✅${C.reset}` : `${C.red}❌${C.reset}`;
  const status = result.ok ? `${C.green}OK${C.reset}` : `${C.red}FALLÓ${C.reset}`;
  const s      = result.stats;

  console.log(
    `${icon} ${C.bold}${datasetId.padEnd(16)}${C.reset}` +
    ` — ${String(s.count).padStart(2)} puntos` +
    `, L2 avg: ${C.cyan}${s.normMean.toFixed(4)}${C.reset}` +
    ` (±${s.normStd.toFixed(4)})` +
    `, categorías: ${C.cyan}${s.categories.length}${C.reset}` +
    ` [${s.categories.join(', ')}]` +
    `  ${status}`
  );

  if (verbose && result.ok) {
    console.log(`${C.gray}         L2 rango: [${s.normMin.toFixed(6)}, ${s.normMax.toFixed(6)}]${C.reset}`);
  }

  for (const err  of result.errors)   console.log(`  ${C.red}✗ ${err}${C.reset}`);
  for (const warn of result.warnings) console.log(`  ${C.yellow}⚠ ${warn}${C.reset}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const args    = process.argv.slice(2);
  const verbose = args.includes('--verbose') || args.includes('-v');
  const target  = args.find(a => !a.startsWith('-')) ?? null;

  console.log(`\n${C.bold}╔══════════════════════════════════════════════════╗`);
  console.log(`║   NMLP Dataset Validator & L2 Integrity Check    ║`);
  console.log(`╚══════════════════════════════════════════════════╝${C.reset}\n`);

  const availableKeys = Object.keys(DATASET_METADATA);

  if (target && !availableKeys.includes(target)) {
    console.error(`${C.red}Dataset '${target}' no encontrado.${C.reset}`);
    console.error(`  Disponibles: ${availableKeys.join(', ')}`);
    process.exit(1);
  }

  const datasetIds = target ? [target] : availableKeys;

  let allOk = true;
  const results = {};

  for (const id of datasetIds) {
    try {
      const points = buildDataset(id);
      if (!Array.isArray(points)) {
        console.log(`${C.yellow}⚠ ${id}: no devolvió un array, se omite${C.reset}`);
        continue;
      }
      const result = validateDataset(id, points, { verbose });
      results[id]  = result;
      printResult(id, result, verbose);
      if (!result.ok) allOk = false;
    } catch (err) {
      console.error(`${C.red}✗ Error procesando dataset '${id}': ${err.message}${C.reset}`);
      allOk = false;
    }
  }

  console.log('');
  if (allOk) {
    console.log(`${C.green}${C.bold}✅ Todos los datasets tienen vectores 50D unitarios válidos (Norma L2 = 1.0).${C.reset}`);
  } else {
    const failed = Object.entries(results).filter(([, r]) => !r.ok).map(([id]) => id);
    console.log(`${C.red}${C.bold}❌ Datasets con problemas de integridad: ${failed.join(', ')}${C.reset}`);
    process.exit(1);
  }

  console.log(`\n${C.gray}Siguiente paso al modificar datos: 'npm test' y 'node build.js'${C.reset}\n`);
}

main();
