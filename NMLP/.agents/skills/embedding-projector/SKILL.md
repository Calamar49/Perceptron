---
name: embedding-projector
description: >
  Usa este skill cuando el usuario quiera explorar el espacio vectorial semántico
  3D del Projector de Embeddings NMLP: cambiar datasets (BBC News, GloVe, IMDB),
  ejecutar proyecciones PCA / t-SNE / Custom Axes, realizar analogías vectoriales
  (A − B + C = D), buscar vecinos más cercanos (K-NN) o añadir embeddings personalizados.
  También se activa cuando el usuario pregunta por similitud coseno, clustering semántico
  o cómo interpretar los patrones del espacio vectorial.
---

# Skill: Embedding Projector 3D

Skill especializado en el Projector de Embeddings 3D del proyecto NMLP.
Permite explorar espacios vectoriales semánticos de alta dimensión reducidos a 3D
mediante PCA, t-SNE y ejes personalizados.

---

## Arquitectura del Projector

```
embedding.html
├── js/projector.bundle.js        ← Bundle auto-contenido (file:///)
│   ├── embeddings-data.js        ← 3 datasets reales con vectores 50D
│   ├── vector-math.js            ← Coseno, K-NN, analogías, síntesis
│   ├── projection-engine.js      ← PCA + t-SNE + Custom Axes
│   ├── projector-3d.js           ← Renderer Three.js WebGL
│   └── projector-controller.js   ← UI/estado del projector
└── styles-projector.css
```

### Script auxiliar CLI
`.agents/skills/embedding-projector/scripts/vector-ops.js`
Permite ejecutar operaciones vectoriales desde la terminal sin abrir el navegador.

---

## Datasets disponibles

| ID             | Nombre           | Documentos | Dimensiones | Categorías                             |
|----------------|------------------|------------|-------------|----------------------------------------|
| `bbc_news`     | BBC News Corpus  | 37 docs    | 50D (LSA)   | tech, sport, business, politics, culture |
| `glove_words`  | Stanford GloVe   | 54 palabras| 50D (GloVe) | royalty, geography, science, food, tech |
| `imdb_reviews` | IMDB Sentiment   | 16 reseñas | 50D (LSA)   | positive, negative                     |

### Cargar un dataset desde la UI
1. Abrir `embedding.html` en el navegador
2. Panel izquierdo → **Dataset** → seleccionar del dropdown
3. El projector recarga automáticamente con los puntos del dataset

### Cambiar dataset desde el CLI
```bash
node .agents/skills/embedding-projector/scripts/vector-ops.js info bbc_news
node .agents/skills/embedding-projector/scripts/vector-ops.js info glove_words
node .agents/skills/embedding-projector/scripts/vector-ops.js info imdb_reviews
```

---

## Métodos de Proyección

### PCA (Principal Component Analysis)
- Proyección lineal determinista
- Preserva varianza global
- Los 3 componentes principales explican la mayor parte de la varianza
- **Mejor para:** visualizar separación global de categorías

```bash
node .agents/skills/embedding-projector/scripts/vector-ops.js pca bbc_news
```

### t-SNE (t-Distributed Stochastic Neighbor Embedding)
- Proyección no-lineal estocástica (semilla fija para reproducibilidad)
- Preserva estructura local (clusters vecinos)
- Parámetros: `perplexity=15`, `iterations=500`, `learningRate=10`
- **Mejor para:** descubrir clusters ocultos y agrupaciones locales

> **Nota:** t-SNE puede mostrar patrones distintos cada ejecución si no se fija la semilla.
> En el projector NMLP la semilla está fija para reproducibilidad.

### Custom Axes (Ejes Semánticos)
- Permite definir ejes X, Y, Z como diferencias vectoriales entre palabras/documentos
- Ejemplo: `Eje X = "tecnología" − "deporte"` → separa artículos tech vs sport
- **Mejor para:** analizar dimensiones semánticas específicas

---

## Operaciones Vectoriales

### K-NN (K vecinos más cercanos)
Encuentra los *k* puntos más similares semánticamente a un punto dado.

```bash
# Sintaxis: knn <punto> <k> <dataset>
node .agents/skills/embedding-projector/scripts/vector-ops.js knn tecnología 5 bbc_news
node .agents/skills/embedding-projector/scripts/vector-ops.js knn king 5 glove_words
node .agents/skills/embedding-projector/scripts/vector-ops.js knn "great movie" 3 imdb_reviews
```

Desde la UI: clic en un punto 3D → panel derecho muestra los 5 vecinos más cercanos con similitud coseno.

### Analogías Vectoriales (A − B + C = D)
Resuelve razonamientos semánticos del tipo:
> *"rey es a hombre lo que ___ es a mujer"*  →  `rey − hombre + mujer = reina`

```bash
# Sintaxis: analogy <A> <B> <C> <dataset>
node .agents/skills/embedding-projector/scripts/vector-ops.js analogy rey hombre mujer glove_words
node .agents/skills/embedding-projector/scripts/vector-ops.js analogy madrid españa francia glove_words
node .agents/skills/embedding-projector/scripts/vector-ops.js analogy tecnología empresa deporte glove_words
```

**Analogías que funcionan bien con GloVe (dataset `glove_words`):**
| Consulta              | Resultado esperado |
|-----------------------|--------------------|
| rey − hombre + mujer  | reina              |
| madrid − españa + francia | paris          |
| perro − animal + planta | rosa             |

### Similitud Coseno
Mide el ángulo entre dos vectores (0 = ortogonal, 1 = idéntico).

```bash
# Sintaxis: similarity <A> <B> <dataset>
node .agents/skills/embedding-projector/scripts/vector-ops.js similarity rey reina glove_words
node .agents/skills/embedding-projector/scripts/vector-ops.js similarity tecnología ciencia bbc_news
```

---

## Embeddings Personalizados

### Añadir un punto custom desde la UI
1. Panel izquierdo → **Custom Point**
2. Escribir la etiqueta y los 50 valores del vector separados por comas
   (o usar el botón **Generar automático** para síntesis LSA)
3. Clic **Añadir** → el punto aparece en el espacio 3D

### Síntesis automática de vectores
El motor puede generar un vector de 50D para cualquier texto usando LSA sintético:
- Basado en hash determinista de las palabras
- El vector se normaliza a L2 = 1.0
- Reproduce patrones semánticos plausibles (no embeddings reales)

```js
// En projector-controller.js
const vec = synthesizeEmbedding(text, 50);  // → Float32Array(50), L2=1
```

---

## Interpretación de Patrones

### Clusters en PCA
- **Puntos agrupados** → semánticamente similares (misma categoría o tema)
- **Puntos alejados** → semánticamente distintos
- **Varianza del eje X** → es la dimensión más discriminante

### Clusters en t-SNE
- **Islas separadas** → grupos temáticos distintos
- **Puntos dispersos** → contenido ambiguo o mixto
- **Puentes entre clusters** → temas relacionados

### Similitud coseno — referencia rápida
| Rango   | Interpretación              |
|---------|-----------------------------|
| > 0.95  | Casi idénticos              |
| 0.80–0.95 | Muy relacionados          |
| 0.60–0.80 | Relacionados              |
| 0.40–0.60 | Débilmente relacionados   |
| < 0.40  | No relacionados             |

---

## Flujo de trabajo recomendado

```
1. Cargar dataset  →  2. Explorar PCA (vista global)
      ↓
3. Identificar clusters  →  4. t-SNE (ver clusters locales)
      ↓
5. Seleccionar punto  →  6. K-NN (encontrar vecinos)
      ↓
7. Analogía vectorial  →  8. Interpretar resultado semántico
```

---

## Archivos clave

| Archivo                        | Propósito                                        |
|--------------------------------|--------------------------------------------------|
| [`embedding.html`](../../../../embedding.html)         | UI principal del projector           |
| [`js/embeddings-data.js`](../../../../js/embeddings-data.js) | Datasets (BBC, GloVe, IMDB)     |
| [`js/vector-math.js`](../../../../js/vector-math.js)   | Operaciones vectoriales              |
| [`js/projection-engine.js`](../../../../js/projection-engine.js) | PCA, t-SNE, Custom Axes    |
| [`js/projector-3d.js`](../../../../js/projector-3d.js) | Renderer Three.js                    |
| [`scripts/vector-ops.js`](scripts/vector-ops.js)       | CLI para operaciones vectoriales     |

---

## Comandos rápidos de referencia

```bash
# Ver todos los puntos de un dataset
node .agents/skills/embedding-projector/scripts/vector-ops.js info glove_words

# K-NN: 5 vecinos más cercanos a "king" en GloVe
node .agents/skills/embedding-projector/scripts/vector-ops.js knn king 5 glove_words

# Analogía: rey - hombre + mujer = ?
node .agents/skills/embedding-projector/scripts/vector-ops.js analogy rey hombre mujer glove_words

# Similitud coseno entre dos puntos
node .agents/skills/embedding-projector/scripts/vector-ops.js similarity madrid paris glove_words

# PCA: mostrar los 3 componentes principales
node .agents/skills/embedding-projector/scripts/vector-ops.js pca glove_words

# Regenerar bundles tras cambios en JS
node build.js
```
