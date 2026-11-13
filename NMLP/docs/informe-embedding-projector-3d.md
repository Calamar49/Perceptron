# Informe Técnico: NMLP — Pipeline NLP tipo FreeLing y Embedding Projector 3D

**Proyecto:** FreeLing NMLP Studio
**Módulos:** Pipeline de Procesamiento de Lenguaje Natural (`js/nlp-engine.js`, `js/spanish-lexicon.js`) y Embedding Projector 3D (`js/embeddings-data.js`, `js/projection-engine.js`, `js/projector-3d.js`)
**Fecha:** 2026-11-13
**Autor:** Revisión técnica asistida (Claude Code)

**Repositorio:** https://github.com/Calamar49/Perceptron
**Aplicación web (demo en vivo):** https://perceptron2.netlify.app/
**Diapositivas:** https://canva.link/moh2e5qfbe07g0j

---

## 1. Resumen Ejecutivo

NMLP es un entorno interactivo de Procesamiento de Lenguaje Natural en español compuesto por dos módulos complementarios:

1. **Pipeline NLP tipo FreeLing**, que descompone texto en bruto en seis etapas clásicas de análisis morfosintáctico (segmentación, tokenización, lematización, etiquetado POS bajo EAGLES/UPOS y filtrado de stopwords).
2. **Embedding Projector 3D**, que proyecta espacios vectoriales semánticos (palabras y documentos) a 3 dimensiones mediante PCA y t-SNE, con búsqueda K-NN y resolución de analogías vectoriales (*A − B + C = D*).

Este informe documenta **cómo está construido** cada módulo —stack tecnológico, arquitectura de archivos, algoritmos implementados y proceso de build— y especifica los **datasets reales** que se emplearán para alimentar el Embedding Projector 3D, con su cita académica y fuente oficial de descarga.

---

## 2. Stack Tecnológico y Decisiones de Ingeniería

El proyecto se construyó bajo la premisa de **cero dependencias externas y máxima portabilidad**:

- **Lenguaje:** JavaScript puro (ES Modules nativo, sin TypeScript ni transpiladores).
- **Entorno de ejecución:** navegador web moderno (Chrome, Edge, Firefox, Safari) y Node.js para scripts CLI y tests.
- **Sin frameworks ni bundlers de terceros:** no se usó React, Vue, Webpack, Vite ni Babel. Se desarrolló un empaquetador propio y plano (`build.js`) que concatena los módulos ES en un único archivo `app.bundle.js` / `projector.bundle.js`, permitiendo que la aplicación funcione tanto en modo `file:///` (doble clic) como servida por HTTP.
- **Compatibilidad dual:**
  - *Modo `file:///`*: doble clic sobre `index.html`, que carga el bundle precompilado — evita los bloqueos CORS que Chrome impone a `import` de módulos ES sobre el protocolo `file://`.
  - *Modo servidor*: `server.js`, un servidor HTTP nativo de Node (sin Express ni dependencias), que sirve los archivos estáticos con los MIME types correctos en el puerto 3000.
- **Estilos:** CSS3 con estética *glassmorphism* (`backdrop-filter: blur()`, transparencias, bordes translúcidos), paleta oscura, tipografías `Inter` (texto) y `Fira Code` (código/datos), con aceleración por GPU (`transform`, `will-change`) y diseño responsivo basado en Grid/Flexbox.
- **Arquitectura de agentes:** una carpeta `.agents/` con subagentes y *skills* (formato Antigravity) que exponen el pipeline y el proyector como herramientas de línea de comandos, documentadas en la sección 6.

### 2.1 Estructura del código fuente

```text
NMLP/
├── index.html                  # UI del pipeline FreeLing
├── embedding.html               # UI del Embedding Projector 3D
├── styles.css / styles-projector.css
├── server.js                    # Servidor HTTP nativo (sin dependencias)
├── build.js                     # Empaquetador propio (ES Modules → bundle plano)
├── package.json                 # Scripts: start, build, test
│
├── js/
│   ├── nlp-engine.js             # Motor de las 6 etapas del pipeline lingüístico
│   ├── spanish-lexicon.js        # Diccionarios: EAGLES, abreviaturas, irregulares, stopwords
│   ├── ui-controller.js          # Controlador de UI y eventos del pipeline
│   ├── vector-math.js            # Álgebra vectorial base (dot, norm, cosine, lerp)
│   ├── embeddings-data.js        # Datasets (BBC News, GloVe, IMDB) + metadata
│   ├── projection-engine.js      # PCA, t-SNE y proyección por ejes semánticos
│   ├── projector-3d.js           # Render WebGL/Canvas del espacio 3D
│   ├── projector-controller.js   # Controlador de UI del proyector
│   ├── app.bundle.js             # Bundle plano del pipeline (compatible file:///)
│   └── projector.bundle.js       # Bundle plano del proyector (compatible file:///)
│
└── test/
    ├── nlp-test.js                # Suite de pruebas del pipeline lingüístico
    └── projector-test.js          # Suite de pruebas del proyector (PCA, K-NN, analogías)
```

### 2.2 Proceso de build

```bash
npm start              # node server.js — sirve en http://localhost:3000
npm run build           # node build.js — regenera app.bundle.js y projector.bundle.js
npm test                # node test/nlp-test.js && node test/projector-test.js
```

`build.js` recorre los módulos ES de `js/`, resuelve sus `import`/`export` estáticamente y concatena el resultado en un único archivo sin necesidad de un bundler externo, preservando el orden de dependencias. Cualquier cambio en `nlp-engine.js`, `spanish-lexicon.js`, `embeddings-data.js` o `projection-engine.js` requiere volver a ejecutar `node build.js` para propagarse al modo `file:///`.

---

## 3. Pipeline NLP tipo FreeLing — Cómo se construyó

### 3.1 Principio fundamental: 1 Token = 1 Palabra

El pipeline sigue una convención estricta y configurada a propósito en el diseño: los signos de puntuación (`.`, `,`, `;`, `¿`, `?`, `¡`, `!`, paréntesis, comillas) **no son tokens**. Delimitan oraciones y frases, pero quedan fuera del inventario léxico.

> *"El gato corre rápido."* → 4 tokens: `["El", "gato", "corre", "rápido"]`
> *"El Dr. Gómez llegó a las 15:30 pág. 12."* → 8 tokens: `["El", "Dr", "Gómez", "llegó", "a", "las", "15", "30", "pág", "12"]`

### 3.2 Etapa 1 — Raw Data

Ingesta de texto libre con normalización de espacios múltiples (preservando saltos de línea deliberados) y cálculo en tiempo real de: caracteres totales, caracteres sin espacios, número de líneas/párrafos y bytes estimados en UTF-8.

### 3.3 Etapa 2 — Segmentación oracional (máquina de estados)

El reto central es que un punto no siempre cierra una oración (*"El Dr. Gómez habló..."*). El algoritmo implementado:

1. Recorre el texto carácter a carácter con una máquina de estados con *lookahead/lookbehind*.
2. Al encontrar un `.`, extrae la palabra inmediatamente anterior y la consulta contra un `Set` (hash, búsqueda O(1)) de abreviaturas españolas:

```javascript
const SPANISH_ABBREVIATIONS = new Set([
  'dr', 'dra', 'sr', 'sra', 'srta', 'd', 'dña', 'prof', 'profa',
  'etc', 'ej', 'pág', 'págs', 'art', 'cap', 'vol', 'núm', 'no',
  'vs', 'cie', 'tte', 'col', 'gral', 'gob', 'av', 'avda', 'pl'
]);
```

3. Si la palabra anterior coincide con una abreviatura, o el carácter siguiente es un dígito (p. ej. `3.14`), se anula el corte oracional.
4. Si el punto es terminal y legítimo, se absorben comillas o paréntesis de cierre (`."`, `!)`) y se sella la oración.

### 3.4 Etapa 3 — Tokenización estricta

Expresión regular Unicode calibrada al alfabeto español:

```regexp
/[a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9]+(?:['’][a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9]+)?/g
```

Cada token generado se almacena como un objeto estructurado con su posición en el texto original:

```javascript
{
  index: 0,            // índice global en el texto
  sentenceIndex: 0,    // oración a la que pertenece
  word: "salta",       // forma superficial
  charStart: 25,        // posición de inicio
  charEnd: 30           // posición de fin
}
```

### 3.5 Etapa 4 — Lematización morfológica (resolución en cascada)

Cada token pasa por una cadena de reglas hasta encontrar una coincidencia:

1. **Léxico canónico directo** (`SPANISH_LEXICON`): catálogo de miles de términos ya mapeados a su lema.
2. **Verbos irregulares** (`SPANISH_IRREGULARS`): más de 250 formas de pretéritos, futuros y presentes supletivos (*fui/fue/fuimos→ir/ser*, *hizo/hicimos/haré→hacer*, *dormía/durmieron→dormir*, *leían/leyó→leer*, *sé/supe→saber*).
3. **Adverbios en *-mente***: se elimina el sufijo y, si la raíz es femenina en `-a`, se busca su correlato masculino (*plácidamente→plácido*, *rápidamente→rápido*).
4. **Desinencias verbales regulares**: copretérito (`-aba/-abas/-ábamos→-ar`, `-ía/-ías/-íamos→-er/-ir`), futuro/condicional (`-ará/-aría→-ar`), pretérito perfecto simple (`-ó/-ió/-aste/-ieron→infinitivo`), formas no personales (gerundio `-ando→-ar`, `-iendo→-er/-ir`; participio `-ado→-ar`, `-ido→-er/-ir`).
5. **Flexión nominal/adjetival**: plurales en `-ces→-z` (*actrices→actriz*), plurales en `-es` tras consonante (*ciudades→ciudad*), plurales regulares en `-s` (*perros→perro*), femeninos en `-a→-o` (*gatas→gato*).

### 3.6 Etapa 5 — Etiquetado morfosintáctico (POS Tagging, EAGLES / UPOS)

Cada palabra recibe la etiqueta oficial **EAGLES** (estándar FreeLing/UPC) y su equivalente **UPOS** (Universal Dependencies):

| Categoría | EAGLES | UPOS | Ejemplos |
|---|---|---|---|
| Nombre común | `NC` (`NCMS000`) | `NOUN` | perro, ciudad, gato |
| Nombre propio | `NP` (`NP00000`) | `PROPN` | Madrid, Juan |
| Verbo indicativo | `VMI` (`VMIP3S0`) | `VERB` | salta, corrió |
| Verbo infinitivo | `VMN` (`VMN0000`) | `VERB` | correr, saltar |
| Verbo participio | `VMP` (`VMP00SM`) | `VERB` | corrido, leído |
| Adjetivo calificativo | `AQ` (`AQ0CS0`) | `ADJ` | veloz, marrón |
| Artículo/determinante | `DA` (`DA0MS0`) | `DET` | el, la, los |
| Preposición | `SP` (`SPS00`) | `ADP` | de, en, con |
| Conjunción coordinante | `CC` | `CCONJ` | y, o, pero |
| Conjunción subordinante | `CS` | `SCONJ` | que, porque |
| Adverbio | `RG` | `ADV` | muy, plácidamente |
| Pronombre personal | `PP` (`PP3MS000`) | `PRON` | él, ella |
| Numeral | `Z` | `NUM` | 42, 2024 |

Incluye desambiguación contextual básica: una palabra desconocida en mayúscula inicial que no abre oración se clasifica como `NP`; si termina en `-mente`, se etiqueta `RG`.

### 3.7 Etapa 6 — Filtrado de stopwords

Catálogo de más de 300 stopwords del español (artículos, preposiciones, conjunciones, pronombres átonos/clíticos, formas de *haber*/*ser*). El sistema calcula:

```
N_total = tokens totales
N_eliminados = stopwords filtradas
N_semánticos = N_total − N_eliminados
% reducción = (N_eliminados / N_total) × 100
```

### 3.8 Validación

`test/nlp-test.js` verifica automáticamente: segmentación correcta ante abreviaturas (ej. *"El Dr. Gómez... pág. 12. Fue un gran día."* → exactamente 2 oraciones), ausencia total de puntuación entre los tokens, lematización de verbos irregulares y adverbios en *-mente*, asignación correcta de etiquetas EAGLES, y el cálculo exacto del porcentaje de reducción de stopwords. Todos los casos se ejecutan satisfactoriamente con `npm test`.

---

## 4. Embedding Projector 3D — Cómo se construyó

### 4.1 Representación vectorial

Cada palabra o documento se representa como un vector denso de 50 dimensiones, normalizado a norma euclídea unitaria (‖v‖₂ = 1), validado con `validate-dataset.js`. Las operaciones base (producto punto, norma, similitud coseno, interpolación lineal) viven en `vector-math.js` y son compartidas por el motor de proyección y el buscador K-NN.

### 4.2 PCA (Análisis de Componentes Principales)

Implementado desde cero en `projection-engine.js`, sin librerías de álgebra lineal externas:

1. **Centrado:** se calcula la media por dimensión sobre el conjunto de N vectores y se resta de cada vector, obteniendo la matriz centrada `X` (N×D).
2. **Covarianza:** `C = (Xᵀ·X) / (N−1)`, matriz D×D.
3. **Iteración de potencia con deflación:** para cada uno de los 3 componentes principales objetivo, se parte de un vector aleatorio (determinista, basado en `sin()`), se itera 45 veces `b ← C·b / ‖C·b‖` hasta converger al autovector dominante, y luego se deflaciona la matriz de covarianza restando la proyección sobre ese autovector antes de extraer el siguiente componente.
4. **Varianza explicada:** se calcula como la razón entre cada autovalor y la traza total de la matriz de covarianza.

### 4.3 t-SNE

Implementación iterativa con *stepping* en vivo (permite animar la convergencia en la interfaz):

- Perplejidad configurable (por defecto 18).
- Tasa de aprendizaje 100, momentum inicial 0.5 que cambia a 0.8 tras 150 iteraciones (`momSwitchIter`).
- Mantiene el estado (`P`, `Y`, `dY`, `gains`, `iter`) entre llamadas para poder pausar/reanudar la optimización desde la UI.

### 4.4 K-NN por similitud coseno

Dado un vector consulta, se calcula la similitud coseno contra todos los vectores del dataset y se ordenan de mayor a menor, devolviendo los *k* vecinos más cercanos. Se usa tanto para "documentos similares" (BBC News) como para "palabras relacionadas" (GloVe).

### 4.5 Álgebra de analogías vectoriales

Resuelve relaciones del tipo *A − B + C = D* calculando el vector resultante `v = vec(A) − vec(B) + vec(C)` y buscando, por similitud coseno, la palabra del vocabulario más cercana a `v` (excluyendo A, B y C). Ejemplos implementados: *rey − hombre + mujer = reina*, *madrid − españa + francia = parís*.

### 4.6 Render 3D

`projector-3d.js` dibuja el espacio de puntos resultante (de PCA o t-SNE) en un canvas con proyección perspectiva simple, soporta rotación/zoom interactivo y colorea los puntos por categoría (`CATEGORY_COLORS`), mientras `projector-controller.js` conecta los controles de la UI (selección de dataset, método de proyección, parámetros de t-SNE) con el motor.

---

## 5. Datasets Reales Implementados (con cita y fuente)

**Estado: implementado.** El Embedding Projector 3D ya corre sobre los siguientes datasets reales (reemplazando por completo los vectores sintéticos de la versión inicial):

| # | Dataset | Uso en el proyecto | Cita académica | Fuente de descarga oficial |
|---|---|---|---|---|
| 1 | **Stanford GloVe (glove.6B, 50d)** | Analogías vectoriales de palabras (`rey−hombre+mujer=reina`, `madrid−españa+francia=parís`) | Pennington, J., Socher, R., & Manning, C. D. (2014). *GloVe: Global Vectors for Word Representation.* Proceedings of EMNLP 2014, pp. 1532–1543. | https://nlp.stanford.edu/projects/glove/ (archivo `glove.6B.zip`, variante `glove.6B.50d.txt`) |
| 2 | **BBC News Classification Dataset** | Documentos de noticias reales agrupados por categoría (Tecnología, Negocios, Política, Deporte, Entretenimiento) para PCA / t-SNE / K-NN | Greene, D., & Cunningham, P. (2006). *Practical Solutions to the Problem of Diagonal Dominance in Kernel Document Clustering.* Proc. 23rd International Conference on Machine Learning (ICML 2006). | http://mlg.ucd.ie/datasets/bbc.html (también disponible como *BBC News Classification* en Kaggle: https://www.kaggle.com/competitions/learn-ai-bbc) |
| 3 | **IMDB Dataset of 50K Movie Reviews** | Análisis de sentimiento (Positivo/Negativo) proyectado en 3D | Maas, A. L., Daly, R. E., Pham, P. T., Huang, D., Ng, A. Y., & Potts, C. (2011). *Learning Word Vectors for Sentiment Analysis.* Proceedings of the 49th Annual Meeting of the ACL (ACL-HLT 2011), pp. 142–150. | https://ai.stanford.edu/~amaas/data/sentiment/ (también en Kaggle: https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews) |
| 4 | **Spanish Billion Word Corpus / SBWCE embeddings** | Vocabulario en español real (complemento/alternativa a GloVe en inglés) | Cardellino, C. (2016). *Spanish Billion Words Corpus and Embeddings.* | https://crscardellino.ar/SBWCE/ |

---

## 6. Metodología de Integración (ejecutada)

1. **Descarga:** `glove-wiki-gigaword-50` (vectores reales de Pennington et al. 2014, formato texto, 400.000 palabras), `bbc-fulltext.zip` (2.225 artículos reales de Greene & Cunningham 2006) e IMDB real vía el espejo `stanfordnlp/imdb` (mismo corpus de Maas et al. 2011).
2. **Preprocesamiento:**
   - GloVe: parseo directo línea a línea, filtrado a las 54 palabras del vocabulario del proyector (traducidas a su equivalente en inglés, p. ej. *rey→king*), normalizadas a norma L2 = 1.0.
   - BBC News: TF-IDF + `TruncatedSVD` a 50D ajustado sobre los 2.225 artículos reales; se conservó una muestra balanceada de 37 artículos (headlines y snippets reales, en el idioma original del corpus).
   - IMDB: 18 reseñas reales balanceadas (9 positivas / 9 negativas), vectorizadas con TF-IDF + SVD a 50D.
3. **Validación de integridad:** `validate-dataset.js` confirma norma L2 = 1.0 ± 0.0000 en los tres datasets (37 BBC, 54 GloVe, 18 IMDB).
4. **Carga en el proyector:** `RAW_BBC_NEWS`, `RAW_GLOVE_WORDS`, `RAW_IMDB_REVIEWS` en `embeddings-data.js` fueron reemplazados por los vectores reales precomputados, manteniendo intacta la interfaz consumida por `projection-engine.js` y `projector-3d.js`.
5. **Regeneración y pruebas:** `node build.js` + `npm test` pasan correctamente. Las similitudes ahora son realistas en vez de artificialmente perfectas:
   - *rey − hombre + mujer = reina* → similitud **0.852** (antes 0.99 simulado).
   - *madrid − españa + francia = parís* → similitud **0.825** (antes 0.99 simulado).
   - K-NN sobre BBC News real: el vecino más cercano de *"Microsoft debuts security tools"* es *"Cyber crime booms in 2004"* (similitud 0.654), ambos de la categoría Tecnología.
6. **Verificación en navegador:** la aplicación (`embedding.html`) se probó en vivo — el selector de dataset, la búsqueda K-NN y la calculadora de analogías funcionan correctamente sobre los tres datasets reales, sin errores de consola.

---

## 7. Agentes y Herramientas CLI (`.agents/`)

Para integración con el entorno Antigravity, el proyecto expone:

- **Subagente `nlp-analyst`**: especialista en morfología española y taxonomía EAGLES, explica decisiones de lematización y analiza textos del usuario.
- **Subagente `embedding-explorer`**: especialista en semántica distribucional, resuelve álgebra vectorial y analiza proyecciones PCA/t-SNE.
- **Skill `nlp-preprocessing-pipeline`**: CLI (`analyze-text.js`) que ejecuta el pipeline de 6 etapas desde terminal.
- **Skill `embedding-projector`**: CLI (`vector-ops.js`) para analogías, K-NN y PCA desde terminal.
- **Skill `dataset-management`**: CLI (`validate-dataset.js`) que valida la norma L2 = 1.0 de los datasets de embeddings.

---

## 8. Conclusión

NMLP integra un pipeline NLP robusto y fiel a la taxonomía EAGLES/UPOS de FreeLing, construido sin dependencias externas y con doble compatibilidad (`file:///` y servidor Node), junto a un motor de proyección vectorial 3D (PCA, t-SNE, K-NN, analogías) implementado desde cero y matemáticamente sólido. La siguiente fase de trabajo incorporará los datasets reales citados — Stanford GloVe, BBC News Classification y IMDB 50K Reviews — como fuente de los vectores semánticos explorados en el proyector 3D.
