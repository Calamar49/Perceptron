---
name: dataset-management
description: >
  Usa este skill cuando el usuario quiera añadir, modificar o validar datasets en el
  Projector de Embeddings NMLP. Cubre la estructura de `js/embeddings-data.js`,
  los patrones RAW_BBC_NEWS / RAW_GLOVE_WORDS / RAW_IMDB_REVIEWS, las funciones
  makeDocumentVector() y createVector(), los colores por categoría y los metadatos
  de dataset. También se activa para validar normalización L2, revisar estadísticas
  de vectores o regenerar los bundles tras cambios.
---

# Skill: Dataset Management

Skill para gestionar los datasets del Projector de Embeddings NMLP.
Permite añadir nuevos conjuntos de datos reales, validar la normalización de vectores
y mantener los metadatos del projector actualizados.

---

## Arquitectura de Datos

```
js/embeddings-data.js
├── RAW_BBC_NEWS        → 37 documentos BBC (texto real → vector 50D LSA)
├── RAW_GLOVE_WORDS     → 54 palabras (vectores 50D GloVe sintético)
├── RAW_IMDB_REVIEWS    → 16 reseñas IMDB (texto real → vector 50D LSA)
├── CATEGORY_COLORS     → colores hex por categoría
├── DATASET_METADATA    → nombre, descripción, URL fuente por dataset
├── makeDocumentVector()→ convierte texto → vector 50D normalizado
├── createVector()      → construye un punto del dataset
└── buildDatasets()     → genera todos los datasets en formato unificado
```

---

## Formato unificado de un punto

Cada punto del projector tiene esta estructura:

```js
{
  id: "bbc_001",           // ID único dentro del dataset
  label: "Tech article 1", // Etiqueta visible en el projector
  vector: Float32Array(50),// Vector 50D normalizado (L2 = 1.0)
  category: "tech",        // Categoría para colorear el punto
  metadata: {              // Info adicional visible en el panel
    source: "BBC News",
    year: 2023,
    summary: "Texto de resumen…"
  }
}
```

---

## Patrón RAW_BBC_NEWS

```js
const RAW_BBC_NEWS = [
  {
    id: "bbc_001",
    label: "AI en la educación",
    text: "La inteligencia artificial transforma la educación…", // texto real
    category: "tech",
    year: 2023
  },
  // …más documentos
];
```

La función `makeDocumentVector(text, category)` convierte el texto a vector LSA 50D:
1. Tokeniza el texto en palabras
2. Aplica hash semántico determinista a cada palabra
3. Pondera por categoría semántica (tech, sport, etc.)
4. Normaliza a L2 = 1.0

---

## Patrón RAW_GLOVE_WORDS

Para palabras individuales con vectores estilo GloVe:

```js
const RAW_GLOVE_WORDS = [
  {
    id: "glove_rey",
    label: "rey",
    word: "rey",
    category: "royalty",
    // Sin campo 'text'; el vector se genera con createVector(word, category)
  },
  // …más palabras
];
```

La función `createVector(word, category)` usa features semánticas predefinidas:
- `SOVEREIGN_FEATURE`, `GENDER_MALE/FEMALE`, `CAPITAL_FEATURE`
- `COUNTRY_SPAIN/FRANCE`, `ROYALTY_FEATURE`
- etc.

---

## Patrón RAW_IMDB_REVIEWS

```js
const RAW_IMDB_REVIEWS = [
  {
    id: "imdb_001",
    label: "Reseña positiva 1",
    text: "Una actuación extraordinaria que…",
    category: "positive",
    rating: 9
  },
  // …más reseñas
];
```

---

## Añadir un nuevo dataset

### Paso 1: Elegir el tipo de datos

| Tipo de datos      | Patrón a usar        | Función de vector       |
|--------------------|----------------------|-------------------------|
| Documentos/textos  | `RAW_*` con `text`   | `makeDocumentVector()`  |
| Palabras           | `RAW_*` con `word`   | `createVector()`        |
| Mixto              | `RAW_*` con ambos    | Combinar ambas          |

### Paso 2: Definir colores de categoría

Añadir en `CATEGORY_COLORS`:

```js
const CATEGORY_COLORS = {
  // …colores existentes…
  mi_categoria: '#FF6B6B',   // Rojo coral
  otra_cat:     '#4ECDC4',   // Turquesa
};
```

### Paso 3: Añadir metadatos del dataset

```js
const DATASET_METADATA = {
  // …datasets existentes…
  mi_dataset: {
    name: 'Mi Dataset',
    description: 'Descripción breve del dataset',
    source: 'https://fuente-original.com',
    docsCount: 20,
    dimensions: 50,
    categories: ['cat1', 'cat2']
  }
};
```

### Paso 4: Definir los datos raw

```js
const RAW_MI_DATASET = [
  { id: 'md_001', label: 'Punto 1', text: 'Texto del documento…', category: 'cat1' },
  { id: 'md_002', label: 'Punto 2', text: 'Otro texto…',         category: 'cat2' },
  // …mínimo 10 puntos recomendado
];
```

### Paso 5: Integrar en `buildDatasets()`

```js
function buildDatasets() {
  return {
    bbc_news:     buildBBCNews(),
    glove_words:  buildGloVeWords(),
    imdb_reviews: buildIMDBReviews(),
    mi_dataset:   buildMiDataset(),  // ← añadir aquí
  };
}

function buildMiDataset() {
  return RAW_MI_DATASET.map(item => ({
    id:       item.id,
    label:    item.label,
    vector:   makeDocumentVector(item.text, item.category),
    category: item.category,
    metadata: { source: 'Mi Fuente', summary: item.text.slice(0, 100) }
  }));
}
```

### Paso 6: Exponer en el dropdown de la UI

En `js/projector-controller.js`, añadir la opción al selector:

```js
const DATASET_OPTIONS = {
  bbc_news:     'BBC News Corpus',
  glove_words:  'Stanford GloVe',
  imdb_reviews: 'IMDB Sentiment',
  mi_dataset:   'Mi Dataset',  // ← añadir aquí
};
```

### Paso 7: Validar y regenerar bundles

```bash
# Validar normalización y estadísticas
node .agents/skills/dataset-management/scripts/validate-dataset.js

# Ejecutar tests de regresión
npm test

# Regenerar bundles
node build.js
```

---

## Reglas de normalización

Todos los vectores deben cumplir:

| Propiedad          | Valor requerido       |
|--------------------|-----------------------|
| Dimensiones        | 50 exactamente        |
| Norma L2           | 1.0 (± 0.001)         |
| Tipo               | `Float32Array`        |
| Valores NaN/Inf    | No permitidos         |

La función `makeDocumentVector()` garantiza esto automáticamente.
Si se proporcionan vectores externos, usar `normalizeVector(v)` de `vector-math.js`.

---

## Script de validación

```bash
# Validar todos los datasets
node .agents/skills/dataset-management/scripts/validate-dataset.js

# Salida esperada:
# ✅ bbc_news    — 37 puntos, L2 avg: 1.0000, categorías: 5
# ✅ glove_words — 54 puntos, L2 avg: 1.0000, categorías: 5
# ✅ imdb_reviews— 16 puntos, L2 avg: 1.0000, categorías: 2
```

---

## Archivos clave

| Archivo                                                   | Propósito                             |
|-----------------------------------------------------------|---------------------------------------|
| [`js/embeddings-data.js`](../../../../js/embeddings-data.js) | Fuente de verdad — todos los datasets |
| [`js/vector-math.js`](../../../../js/vector-math.js)         | normalizeVector(), cosineSimilarity() |
| [`js/projector-controller.js`](../../../../js/projector-controller.js) | Dropdown de dataset UI      |
| [`build.js`](../../../../build.js)                           | Regenera los bundles                  |
| [`test/projector-test.js`](../../../../test/projector-test.js) | Tests de regresión datasets         |
| [`scripts/validate-dataset.js`](scripts/validate-dataset.js) | Validación CLI de normalización      |

---

## Checklist al añadir un dataset

- [ ] Mínimo 10 puntos con IDs únicos
- [ ] Todas las categorías definidas en `CATEGORY_COLORS`
- [ ] Metadatos añadidos en `DATASET_METADATA`
- [ ] `buildMiDataset()` integrado en `buildDatasets()`
- [ ] Opción añadida en el dropdown de la UI
- [ ] `validate-dataset.js` pasa sin errores
- [ ] `npm test` pasa sin errores
- [ ] `node build.js` regenera los bundles correctamente
