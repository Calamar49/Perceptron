/**
 * Build Script: Generates a self-contained bundle (app.bundle.js)
 * ensuring that index.html works both:
 * 1. By double-clicking index.html directly (file:///) in Chrome/Edge/Firefox
 * 2. Served over HTTP (npm start / python -m http.server)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lexiconPath = path.join(__dirname, 'js', 'spanish-lexicon.js');
const enginePath = path.join(__dirname, 'js', 'nlp-engine.js');
const uiPath = path.join(__dirname, 'js', 'ui-controller.js');
const outputPath = path.join(__dirname, 'js', 'app.bundle.js');

let lexiconCode = fs.readFileSync(lexiconPath, 'utf8');
let engineCode = fs.readFileSync(enginePath, 'utf8');
let uiCode = fs.readFileSync(uiPath, 'utf8');

// Strip ES module import/export keywords for self-contained bundle
lexiconCode = lexiconCode.replace(/export\s+/g, '');

engineCode = engineCode
  .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/g, '')
  .replace(/export\s+class\s+NLPEngine/g, 'class NLPEngine');

uiCode = uiCode
  .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/g, '')
  .replace(/export\s+class\s+UIController/g, 'class UIController');

const bundle = `/**
 * FreeLing NMLP Studio - Self-Contained Browser Bundle
 * Generated automatically. Compatible with both file:/// and http://
 */
(function() {
  'use strict';

  // --- 1. SPANISH LEXICON ---
${lexiconCode}

  // --- 2. NLP ENGINE ---
${engineCode}

  // --- 3. UI CONTROLLER ---
${uiCode}

  // --- 4. AUTO-INITIALIZATION ---
  window.addEventListener('DOMContentLoaded', () => {
    window.freeLingApp = new UIController();
    console.log('🚀 FreeLing NMLP Studio inicializado correctamente en el navegador.');
  });
})();
`;

// --- BUILD PROJECTOR BUNDLE ---
const dataPath = path.join(__dirname, 'js', 'embeddings-data.js');
const projEnginePath = path.join(__dirname, 'js', 'projection-engine.js');
const vectorMathPath = path.join(__dirname, 'js', 'vector-math.js');
const proj3dPath = path.join(__dirname, 'js', 'projector-3d.js');
const projControllerPath = path.join(__dirname, 'js', 'projector-controller.js');
const projectorOutputPath = path.join(__dirname, 'js', 'projector.bundle.js');

let dataCode = fs.readFileSync(dataPath, 'utf8')
  .replace(/export\s+/g, '');

let projEngineCode = fs.readFileSync(projEnginePath, 'utf8')
  .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/g, '')
  .replace(/export\s+class\s+ProjectionEngine/g, 'class ProjectionEngine');

let vectorMathCode = fs.readFileSync(vectorMathPath, 'utf8')
  .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/g, '')
  .replace(/export\s+class\s+VectorMath/g, 'class VectorMath');

let proj3dCode = fs.readFileSync(proj3dPath, 'utf8')
  .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/g, '')
  .replace(/export\s+class\s+Projector3D/g, 'class Projector3D');

let projControllerCode = fs.readFileSync(projControllerPath, 'utf8')
  .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/g, '')
  .replace(/export\s+class\s+ProjectorController/g, 'class ProjectorController');

const projectorBundle = `/**
 * Embedding Projector 3D - Self-Contained Browser Bundle
 * Generated automatically. Compatible with both file:/// and http://
 */
(function() {
  'use strict';

  // --- 1. EMBEDDINGS DATA ---
${dataCode}

  // --- 2. PROJECTION ENGINE (PCA, t-SNE, CUSTOM AXES) ---
${projEngineCode}

  // --- 3. VECTOR MATH (K-NN, COSINE SIMILARITY, ANALOGIES) ---
${vectorMathCode}

  // --- 4. 3D WEBGL ENGINE ---
${proj3dCode}

  // --- 5. PROJECTOR CONTROLLER ---
${projControllerCode}

  // --- 6. AUTO-INITIALIZATION ---
  window.addEventListener('DOMContentLoaded', () => {
    window.projectorApp = new ProjectorController();
    console.log('🚀 Embedding Projector 3D inicializado correctamente en el navegador.');
  });
})();
`;

fs.writeFileSync(projectorOutputPath, projectorBundle, 'utf8');
console.log('✅ projector.bundle.js generado exitosamente en js/projector.bundle.js');
