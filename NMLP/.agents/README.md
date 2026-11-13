# NMLP — Sistema de Agentes y Skills Antigravity

Este directorio contiene las customizaciones nativas de Antigravity (Skills, Subagentes y Reglas de Workspace) para el proyecto **NMLP**.

---

## 📂 Estructura

```text
.agents/
├── GEMINI.md                                  # Reglas de desarrollo a nivel de workspace (siempre activas)
├── README.md                                  # Este documento
├── agents/                                    # Subagentes especializados
│   ├── nlp-analyst.md                         # Agente analista de pipeline FreeLing y morfología
│   └── embedding-explorer.md                  # Agente explorador 3D de embeddings y álgebra vectorial
└── skills/                                    # Skills funcionales con herramientas CLI
    ├── nlp-preprocessing-pipeline/            # Pipeline clásico FreeLing (6 etapas)
    │   ├── SKILL.md
    │   └── scripts/analyze-text.js            # CLI para análisis textual morfosintáctico
    ├── embedding-projector/                   # Exploración y proyecciones semánticas 3D
    │   ├── SKILL.md
    │   └── scripts/vector-ops.js              # CLI para K-NN, analogías (A-B+C=D) y PCA
    └── dataset-management/                    # Gestión y validación de datasets semánticos 50D
        ├── SKILL.md
        └── scripts/validate-dataset.js        # Validador de norma L2 y formato de datasets
```

---

## 🤖 Agentes Disponibles

### 1. `nlp-analyst`
Especialista en lingüística computacional y análisis morfosintáctico en español según la taxonomía **EAGLES** (FreeLing / UPC).
- Aplica el principio fundamental: **1 Token = 1 Palabra** (sin signos ni puntuación).
- Desglosa segmentación de oraciones, tokenización, lematización, POS tagging y eliminación de stopwords.

### 2. `embedding-explorer`
Especialista en semántica distribucional, espacios vectoriales y proyecciones 3D.
- Resuelve álgebra vectorial semántica (ej. $rey - hombre + mujer = reina$, $madrid - españa + francia = paris$).
- Interpreta agrupamientos y varianza en proyecciones PCA y t-SNE.
- Realiza búsquedas K-NN de documentos y palabras por similitud coseno.

---

## 🛠️ Herramientas CLI de Skills

Todos los scripts se ejecutan en Node.js puro usando ES Modules:

```bash
# 1. Analizar texto con el pipeline FreeLing
node .agents/skills/nlp-preprocessing-pipeline/scripts/analyze-text.js "El veloz zorro salta sobre el perro perezoso."

# 2. Operaciones vectoriales: Analogías semánticas (GloVe)
node .agents/skills/embedding-projector/scripts/vector-ops.js analogy rey hombre mujer glove_words

# 3. Operaciones vectoriales: Búsqueda K-NN (BBC News)
node .agents/skills/embedding-projector/scripts/vector-ops.js knn tecnología 5 bbc_news

# 4. Operaciones vectoriales: Reducción PCA en 3D
node .agents/skills/embedding-projector/scripts/vector-ops.js pca bbc_news

# 5. Validación de integridad de datasets (Norma L2 = 1.0)
node .agents/skills/dataset-management/scripts/validate-dataset.js
```

---

## 📋 Reglas y Ciclo de Desarrollo

1. **Antes de editar código:** Ejecutar `npm test` para verificar el estado de los tests.
2. **Tras editar código en `js/`:** Ejecutar `node build.js` para regenerar los bundles compatibles con `file:///`.
3. **Tras editar `js/embeddings-data.js`:** Ejecutar `node .agents/skills/dataset-management/scripts/validate-dataset.js` y `npm test`.
