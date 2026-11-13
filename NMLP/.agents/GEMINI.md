# NMLP — Reglas del Proyecto
# Archivo de reglas a nivel de workspace (siempre cargado)

## Idioma y comunicación

- Responde **siempre en español** al usuario
- Los comentarios de código pueden estar en español o inglés
- Los nombres de variables, funciones y archivos van en inglés (convención de código)
- Las etiquetas y textos de la UI van en español

---

## Stack tecnológico

- **Frontend:** Vanilla JavaScript ES modules — sin frameworks, sin bundlers de terceros
- **3D:** Three.js cargado desde CDN (unpkg) — no instalar localmente
- **Servidor local:** Node.js puro (módulo `http` estándar) en `server.js`
- **Bundle:** Script propio `build.js` — concatenación simple con strip de import/export
- **Tests:** Node.js puro sin dependencias externas (`test/`)
- **NO usar:** React, Vue, Angular, Webpack, Rollup, Vite, npm packages adicionales

---

## Principio de tokenización

> **1 Token = 1 Palabra**

Los signos de puntuación, símbolos y espacios **no son tokens**.

```
"El gato corre rápido." → 4 tokens: ["El", "gato", "corre", "rápido"]
"¡Hola, mundo!"         → 2 tokens: ["Hola", "mundo"]
```

Este principio es fundamental para la consistencia del pipeline NLP.

---

## Estándar de etiquetado morfosintáctico

Usar el estándar **EAGLES (FreeLing UPC)**:

| Etiqueta | Categoría         |
|----------|-------------------|
| `NC`     | Nombre común      |
| `NP`     | Nombre propio     |
| `VMI`    | Verbo indicativo  |
| `VMN`    | Verbo infinitivo  |
| `VMP`    | Participio        |
| `AQ`     | Adjetivo calific. |
| `DA`     | Artículo          |
| `SP`     | Preposición       |
| `CC`     | Conjunción coord. |
| `CS`     | Conjunción subord.|
| `RG`     | Adverbio          |
| `PP`     | Pronombre pers.   |
| `Z`      | Número            |

Referencia completa: [FreeLing EAGLES](https://freeling-user-manual.readthedocs.io/en/latest/tagsets/)

---

## Reglas de desarrollo

### Después de cualquier cambio en archivos JS de `js/`

```bash
node build.js
```

Esto regenera `js/app.bundle.js` y `js/projector.bundle.js`.
Sin esto, `index.html` y `embedding.html` abiertos como `file:///` usarán código desactualizado.

### Después de cambios en `js/embeddings-data.js`

```bash
node .agents/skills/dataset-management/scripts/validate-dataset.js
npm test
node build.js
```

### Antes de cualquier cambio estructural

```bash
npm test   # Verificar que todo pasa antes de cambiar nada
```

---

## Organización de archivos

```
NMLP/
├── index.html              ← Pipeline NLP (FreeLing)
├── embedding.html          ← Projector de Embeddings 3D
├── styles.css              ← Estilos pipeline NLP
├── styles-projector.css    ← Estilos projector
├── server.js               ← Servidor HTTP Node.js (puerto 3000)
├── build.js                ← Generador de bundles
├── package.json
│
├── js/                     ← Código fuente (ES modules)
│   ├── nlp-engine.js       ← Motor NLP — 6 etapas
│   ├── spanish-lexicon.js  ← Léxico, EAGLES, stopwords, irregulares
│   ├── ui-controller.js    ← UI del pipeline NLP
│   ├── embeddings-data.js  ← Datasets (BBC, GloVe, IMDB)
│   ├── vector-math.js      ← Coseno, K-NN, analogías
│   ├── projection-engine.js← PCA, t-SNE, Custom Axes
│   ├── projector-3d.js     ← Renderer Three.js
│   ├── projector-controller.js ← UI del projector
│   ├── app.bundle.js       ← [GENERADO] Bundle NLP
│   └── projector.bundle.js ← [GENERADO] Bundle projector
│
├── test/
│   ├── nlp-test.js         ← Tests pipeline NLP
│   └── projector-test.js   ← Tests datasets y operaciones vectoriales
│
└── .agents/                ← Customizaciones Antigravity
    ├── GEMINI.md           ← Este archivo (reglas globales)
    ├── skills/
    │   ├── nlp-preprocessing-pipeline/   ← Skill pipeline NLP
    │   ├── embedding-projector/          ← Skill projector 3D
    │   └── dataset-management/           ← Skill gestión datasets
    └── agents/
        ├── nlp-analyst.md                ← Agente analista NLP
        └── embedding-explorer.md         ← Agente explorador embeddings
```

---

## Normalización de vectores

Todos los vectores en `embeddings-data.js` deben tener:
- **Dimensiones:** 50
- **Norma L2:** 1.0 (tolerancia ± 0.001)
- **Tipo:** `Float32Array`
- **Sin NaN o Infinity**

Validar con:
```bash
node .agents/skills/dataset-management/scripts/validate-dataset.js
```

---

## Compatibilidad

Los archivos HTML deben funcionar de **dos formas**:
1. **Doble clic** (`file:///`) — usando los bundles `js/*.bundle.js`
2. **Servidor** (`npm start`, puerto 3000) — usando ES modules directamente

No romper ninguna de las dos formas al hacer cambios.

---

## Tests y CI

```bash
npm test     # Ejecuta test/nlp-test.js y test/projector-test.js
npm start    # Inicia servidor en http://localhost:3000
npm run build# Regenera bundles (= node build.js)
```

Los tests deben pasar con código de salida 0 siempre.
Si un test falla, NO hacer bundle hasta corregir el error.
