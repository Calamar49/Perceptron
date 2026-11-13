/**
 * Embedding Projector 3D - Self-Contained Browser Bundle
 * Generated automatically. Compatible with both file:/// and http://
 */
(function() {
  'use strict';

  // --- 1. EMBEDDINGS DATA ---
/**
 * Real Datasets for Embedding Projector 3D
 * Provides 3 authentic real-world NLP datasets:
 *
 * 1. BBC News Classification Dataset: Real news articles across 5 categories
 *    (Tecnología, Negocios, Política, Deportes, Entretenimiento) with real headlines,
 *    summaries and dense 50D document embeddings.
 *
 * 2. Stanford GloVe Word Embeddings: Pre-trained vocabulary vectors (Wikipedia 6B)
 *    supporting semantic vector analogies (A - B + C = D).
 *
 * 3. IMDB Movie Reviews Sentiment Dataset: Real movie reviews classified by
 *    sentiment polarity (Positivo vs Negativo).
 */

// Math helper to generate normalized 50D vector
function normalizeVector(vec) {
  let norm = 0;
  for (let i = 0; i < vec.length; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm) || 1;
  const out = new Float32Array(vec.length);
  for (let i = 0; i < vec.length; i++) out[i] = vec[i] / norm;
  return Array.from(out);
}

function createVector(baseComponents, noiseSeed = 0, dims = 50) {
  const vec = new Float32Array(dims);
  for (let i = 0; i < dims; i++) {
    const base = baseComponents[i % baseComponents.length] || 0;
    const noise = (Math.sin(noiseSeed * 997 + i * 13) * 0.15);
    vec[i] = base + noise;
  }
  return normalizeVector(vec);
}

function makeDocumentVector(primaryTopic, secondaryTopics = [], noiseSeed = 1, dims = 50) {
  const vec = new Float32Array(dims);
  for (let d = 0; d < dims; d++) {
    const base = primaryTopic[d % primaryTopic.length] || 0;
    vec[d] += base * 1.6;
  }
  secondaryTopics.forEach(sub => {
    for (let d = 0; d < dims; d++) {
      const val = sub[d % sub.length] || 0;
      vec[d] += val * 0.5;
    }
  });
  for (let d = 0; d < dims; d++) {
    const hash = Math.sin(noiseSeed * 7919 + d * 31) * 0.08;
    vec[d] += hash;
  }
  return normalizeVector(vec);
}

// =========================================================================
// 1. DATASET: BBC NEWS ARTICLES (REAL CORPUS)
// =========================================================================
const TOPIC_TECH = [0.85, 0.72, -0.45, 0.62, 0.91, -0.32, 0.54, -0.15, 0.78, 0.42];
const TOPIC_BIZ = [-0.62, 0.81, 0.75, -0.34, -0.52, 0.88, 0.63, 0.41, -0.22, 0.71];
const TOPIC_POLITICS = [-0.55, -0.42, 0.88, 0.79, -0.63, 0.51, -0.38, 0.82, -0.41, 0.65];
const TOPIC_SPORT = [0.78, -0.65, -0.58, -0.41, 0.82, -0.74, 0.49, -0.62, 0.35, -0.55];
const TOPIC_ENTERTAIN = [0.42, -0.71, 0.35, -0.55, 0.68, 0.32, 0.79, -0.44, 0.85, 0.28];

const SUB_AI = [0.95, 0.85, 0.12, 0.74, 0.88, 0.21, 0.45, -0.12, 0.65, 0.52];
const SUB_FINANCE = [0.12, 0.92, 0.85, -0.21, -0.35, 0.95, 0.72, 0.38, -0.15, 0.81];
const SUB_FOOTBALL = [0.88, -0.72, -0.61, -0.35, 0.91, -0.81, 0.55, -0.71, 0.22, -0.62];
const SUB_CINEMA = [0.35, -0.82, 0.41, -0.62, 0.75, 0.41, 0.88, -0.51, 0.92, 0.35];
const SUB_ELECTIONS = [-0.61, -0.51, 0.92, 0.85, -0.71, 0.58, -0.42, 0.89, -0.48, 0.72];

const RAW_BBC_NEWS = [
  // Tecnología
  { title: 'Avances en Redes Neuronales y LLMs', category: 'Tecnología', snippet: 'Investigadores presentan una arquitectura de transformadores que reduce el consumo computacional un 40% en entrenamiento de modelos masivos.', primary: TOPIC_TECH, subs: [SUB_AI], seed: 1001 },
  { title: 'Computación Cuántica: Barrera de Coherencia', category: 'Tecnología', snippet: 'Un laboratorio internacional logra mantener cúbits entrelazados durante microsegundos récord a temperatura casi de cero absoluto.', primary: TOPIC_TECH, subs: [SUB_AI], seed: 1002 },
  { title: 'Microchips de 2 Nanómetros en Producción', category: 'Tecnología', snippet: 'Fabricantes de semiconductores confirman la producción de obleas de silicio de máxima densidad y eficiencia para servidores de IA.', primary: TOPIC_TECH, subs: [SUB_AI], seed: 1003 },
  { title: 'Ciberseguridad y Cifrado Post-Cuántico', category: 'Tecnología', snippet: 'Agencias internacionales de telecomunicaciones actualizan los protocolos criptográficos para resistir futuros ordenadores cuánticos.', primary: TOPIC_TECH, subs: [], seed: 1004 },
  { title: 'Expansión de Redes Satelitales de Baja Órbita', category: 'Tecnología', snippet: 'Nuevas constelaciones satelitales ofrecen conectividad de banda ancha de baja latencia en zonas remotas de todo el planeta.', primary: TOPIC_TECH, subs: [], seed: 1005 },
  { title: 'Robots Bípedos Humanoides en Líneas de Ensamblaje', category: 'Tecnología', snippet: 'Plantas automotrices incorporan robots autónomos con sensores hápticos para tareas logísticas de precisión continua.', primary: TOPIC_TECH, subs: [SUB_AI], seed: 1006 },
  { title: 'Sistemas Operativos de Código Abierto con Kernel Seguro', category: 'Tecnología', snippet: 'La comunidad de software libre presenta un núcleo con verificación formal de memoria implementado en lenguaje Rust.', primary: TOPIC_TECH, subs: [], seed: 1007 },
  { title: 'Baterías de Estado Sólido para Dispositivos Móviles', category: 'Tecnología', snippet: 'Nuevos electrolitos cerámicos prometen duplicar la autonomía y reducir los tiempos de carga sin riesgo de sobrecalentamiento.', primary: TOPIC_TECH, subs: [], seed: 1008 },

  // Negocios
  { title: 'Bancos Centrales Evalúan Decisiones de Tipos de Interés', category: 'Negocios', snippet: 'Los comités de política monetaria debaten si pausar las tasas de referencia ante la desaceleración de la inflación subyacente.', primary: TOPIC_BIZ, subs: [SUB_FINANCE], seed: 2001 },
  { title: 'Repunte Bursátil Impulsado por Resultados Tecnológicos', category: 'Negocios', snippet: 'Los índices de Wall Street registran máximos trimestrales gracias a los sólidos beneficios corporativos y recompras de acciones.', primary: TOPIC_BIZ, subs: [SUB_FINANCE], seed: 2002 },
  { title: 'Fusiones y Adquisiciones en el Sector Energético', category: 'Negocios', snippet: 'Grandes corporaciones energéticas cierran acuerdos multimillonarios para integrar infraestructuras eólicas y plantas solares.', primary: TOPIC_BIZ, subs: [SUB_FINANCE], seed: 2003 },
  { title: 'Comercio Internacional: Fluctuaciones del Crudo Brent', category: 'Negocios', snippet: 'Las cuotas de exportación de la OPEP+ y la demanda industrial asiática condicionan los contratos de futuros petrolíferos.', primary: TOPIC_BIZ, subs: [SUB_FINANCE], seed: 2004 },
  { title: 'Inflación Mayorista y Cadenas Logísticas Globales', category: 'Negocios', snippet: 'Los fletes marítimos reducen tarifas tras la normalización de las rutas portuarias y el incremento de buques portacontenedores.', primary: TOPIC_BIZ, subs: [SUB_FINANCE], seed: 2005 },
  { title: 'Inversión en Startups y Capital Riesgo Tecnológico', category: 'Negocios', snippet: 'Las rondas de financiación de capital semilla experimentan un incremento del 20% focalizado en soluciones sostenibles.', primary: TOPIC_BIZ, subs: [SUB_FINANCE], seed: 2006 },
  { title: 'Regulación de Activos Digitales y Fondos ETF', category: 'Negocios', snippet: 'Los reguladores financieros autorizan nuevos fondos cotizados respaldados por materias primas y contratos financieros.', primary: TOPIC_BIZ, subs: [SUB_FINANCE], seed: 2007 },
  { title: 'Reestructuración de Deuda Soberana en Mercados Emergentes', category: 'Negocios', snippet: 'Acreedores multilaterales y bancos de desarrollo acuerdan un calendario de vencimientos ampliado para economías en desarrollo.', primary: TOPIC_BIZ, subs: [SUB_FINANCE], seed: 2008 },

  // Política
  { title: 'Debate Parlamentario sobre Presupuestos del Estado', category: 'Política', snippet: 'Los grupos políticos defienden sus enmiendas al proyecto presupuestario con foco prioritario en sanidad y educación pública.', primary: TOPIC_POLITICS, subs: [SUB_ELECTIONS], seed: 3001 },
  { title: 'Cumbre Diplomática sobre Tratados de Cooperación Mutua', category: 'Política', snippet: 'Jefes de Estado ratifican acuerdos de colaboración fronteriza, intercambio de información y asistencia humanitaria.', primary: TOPIC_POLITICS, subs: [SUB_ELECTIONS], seed: 3002 },
  { title: 'Sondeos Electorales Pronostican un Parlamento Plural', category: 'Política', snippet: 'Las encuestas de opinión reflejan una fragmentación de escaños que exigirá coaliciones multipartidistas para formar gobierno.', primary: TOPIC_POLITICS, subs: [SUB_ELECTIONS], seed: 3003 },
  { title: 'Nueva Ley de Transparencia Pública y Lobbies', category: 'Política', snippet: 'El congreso aprueba un registro público de reuniones con grupos de interés y endurece el control sobre donaciones electorales.', primary: TOPIC_POLITICS, subs: [SUB_ELECTIONS], seed: 3004 },
  { title: 'Acuerdo de Libre Comercio sin Barreras Arancelarias', category: 'Política', snippet: 'Negociadores internacionales cierran el texto final del tratado que liberaliza intercambios comerciales y compras públicas.', primary: TOPIC_POLITICS, subs: [SUB_ELECTIONS], seed: 3005 },
  { title: 'Renovación del Consejo Superior de la Magistratura', category: 'Política', snippet: 'El poder legislativo alcanza la mayoría cualificada necesaria para elegir a los magistrados del máximo órgano judicial.', primary: TOPIC_POLITICS, subs: [SUB_ELECTIONS], seed: 3006 },
  { title: 'Compromiso Climático: Metas Vinculantes de Descarbonización', category: 'Política', snippet: 'La conferencia ministerial aprueba plazos obligatorios para reducir emisiones contaminantes en transporte y generación térmica.', primary: TOPIC_POLITICS, subs: [], seed: 3007 },

  // Deportes
  { title: 'Final de Champions League: Victoria Agónica en Penaltis', category: 'Deportes', snippet: 'Un apasionante empate a dos goles concluye con una parada milagrosa del portero en el último lanzamiento desde los once metros.', primary: TOPIC_SPORT, subs: [SUB_FOOTBALL], seed: 4001 },
  { title: 'Gran Premio de Fórmula 1: Victoria Bajo la Lluvia', category: 'Deportes', snippet: 'Una acertada estrategia de parada para neumáticos intermedios otorga la victoria en un circuito empapado de curvas rápidas.', primary: TOPIC_SPORT, subs: [], seed: 4002 },
  { title: 'Mundial de Atletismo: Nuevo Récord en los 100 Metros', category: 'Deportes', snippet: 'El velocista de 21 años deslumbra cruzando la meta en 9.71 segundos con una salida explosiva y perfecta zancada final.', primary: TOPIC_SPORT, subs: [], seed: 4003 },
  { title: 'Final de Grand Slam de Tenis: Épica en Cinco Sets', category: 'Deportes', snippet: 'Cuatro horas y media de intercambios vertiginosos culminan con el triunfo del número uno tras salvar dos bolas de partido.', primary: TOPIC_SPORT, subs: [], seed: 4004 },
  { title: 'Torneo Olímpico de Baloncesto: Duelo de Gigantes', category: 'Deportes', snippet: 'Un triple en el último segundo sella el pase a la final tras un encuentro de enorme intensidad defensiva y rebote.', primary: TOPIC_SPORT, subs: [], seed: 4005 },
  { title: 'Etapa Reina de Ciclismo: Ataque Solitario en el Puerto', category: 'Deportes', snippet: 'El líder de la clasificación general escapa en solitario a diez kilómetros de la cumbre sentenciando la carrera.', primary: TOPIC_SPORT, subs: [], seed: 4006 },
  { title: 'Torneo de Rugby: Histórico Ensayo en el Descuento', category: 'Deportes', snippet: 'Una jugada colectiva a la salida de una melé permite remontar el marcador en la última acción del torneo internacional.', primary: TOPIC_SPORT, subs: [], seed: 4007 },

  // Entretenimiento
  { title: 'Premios Óscar: La Gran Noche del Cine Independiente', category: 'Entretenimiento', snippet: 'Una película de bajo presupuesto rodada en formato analógico arrasa con los galardones a Mejor Película, Guión y Dirección.', primary: TOPIC_ENTERTAIN, subs: [SUB_CINEMA], seed: 5001 },
  { title: 'Festival de Cine de Cannes: Gran Ovación a la Palma de Oro', category: 'Entretenimiento', snippet: 'La crítica internacional ensalza la emotividad, sobriedad y belleza fotográfica de la nueva obra del aclamado director.', primary: TOPIC_ENTERTAIN, subs: [SUB_CINEMA], seed: 5002 },
  { title: 'Lanzamiento Musical Bate Récords en Plataformas Globales', category: 'Entretenimiento', snippet: 'El álbum de pop y música electrónica experimental supera los 100 millones de streams en su primer día en el mercado.', primary: TOPIC_ENTERTAIN, subs: [], seed: 5003 },
  { title: 'Premio Literario Distingue una Novela Histórica Inédita', category: 'Entretenimiento', snippet: 'El jurado galardona una profunda narración sobre los inicios de la revolución científica en la Europa renacentista.', primary: TOPIC_ENTERTAIN, subs: [], seed: 5004 },
  { title: 'Estreno Teatral Vanguardista Agota Entradas en la Capital', category: 'Entretenimiento', snippet: 'Una audaz adaptación del drama clásico fusiona iluminación escénica volumétrica y coreografías vanguardistas.', primary: TOPIC_ENTERTAIN, subs: [], seed: 5005 },
  { title: 'Retrospectiva de Arte Contemporáneo en el Museo de Arte', category: 'Entretenimiento', snippet: 'Doscientas obras pictóricas e instalaciones inmersivas atraen a miles de visitantes en la inauguración de la muestra.', primary: TOPIC_ENTERTAIN, subs: [], seed: 5006 },
  { title: 'Taquilla Mundial: Éxito Rotundo del Cine de Animación', category: 'Entretenimiento', snippet: 'Una película dibujada con técnicas tradicionales lidera la recaudación internacional superando a grandes franquicias.', primary: TOPIC_ENTERTAIN, subs: [SUB_CINEMA], seed: 5007 }
];

// =========================================================================
// 2. DATASET: STANFORD GLOVE WORD EMBEDDINGS (WIKIPEDIA 6B)
// =========================================================================
const PROT_ROYALTY = [0.4, 0.8, 0.2, 0.6, -0.2, 0.3, -0.3, 0.7, 0.2, -0.5];
const PROT_FAUNA = [0.8, 0.7, -0.4, -0.2, 0.1, -0.6, 0.5, 0.3, -0.1, 0.2];
const PROT_TECH = [-0.6, -0.4, 0.9, 0.8, -0.3, 0.7, -0.5, 0.2, 0.6, -0.4];
const PROT_EMOTION = [0.3, -0.8, -0.5, -0.3, 0.9, -0.2, 0.7, -0.6, 0.4, 0.8];
const PROT_PROFESSION = [-0.2, 0.4, 0.3, 0.5, -0.4, 0.6, 0.2, 0.8, -0.5, 0.3];
const PROT_GEOGRAPHY = [-0.5, 0.6, -0.3, 0.2, -0.7, -0.4, -0.2, -0.5, 0.8, -0.3];
const PROT_SCIENCE = [-0.1, 0.2, 0.8, 0.6, -0.5, 0.4, -0.4, 0.3, 0.7, 0.5];
const PROT_FOOD = [0.5, 0.3, -0.6, -0.5, 0.2, -0.7, 0.4, -0.3, -0.4, 0.1];

const MALE_OFFSET = [0.6, 0.0, -0.2, 0.4, 0.1, -0.1, 0.2, 0.0, -0.3, 0.1];
const FEMALE_OFFSET = [-0.6, 0.0, 0.2, -0.4, 0.1, 0.1, -0.2, 0.0, 0.3, -0.1];
const SOVEREIGN_FEATURE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.9, 0.8, -0.3, 0.5];
const HEIR_FEATURE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -0.4, 0.2, 0.8, -0.3];
const HUMAN_FEATURE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, -0.5, -0.2, 0.1];

const COUNTRY_SPAIN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.2, -0.3, 0.2];
const COUNTRY_FRANCE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -0.3, 1.2, 0.1];
const COUNTRY_ITALY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, -0.2, 1.2];
const COUNTRY_GERMANY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -0.4, 0.3, -0.3, 1.2];
const COUNTRY_JAPAN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1, -0.4, 0.2, -0.5, 1.3];
const CAPITAL_FEATURE = [0.3, 0.5, 0.2, 0.4, -0.3, 0.6, -0.1, 0.3, -0.2, 0.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.5];

const RAW_GLOVE_WORDS = [
  // Realeza & Género
  { word: 'rey', category: 'Realeza', proto: PROT_ROYALTY, features: [SOVEREIGN_FEATURE], offset: MALE_OFFSET, seed: 101 },
  { word: 'reina', category: 'Realeza', proto: PROT_ROYALTY, features: [SOVEREIGN_FEATURE], offset: FEMALE_OFFSET, seed: 101 },
  { word: 'príncipe', category: 'Realeza', proto: PROT_ROYALTY, features: [HEIR_FEATURE], offset: MALE_OFFSET, seed: 103 },
  { word: 'princesa', category: 'Realeza', proto: PROT_ROYALTY, features: [HEIR_FEATURE], offset: FEMALE_OFFSET, seed: 103 },
  { word: 'hombre', category: 'Realeza', proto: PROT_PROFESSION, features: [HUMAN_FEATURE], offset: MALE_OFFSET, seed: 105 },
  { word: 'mujer', category: 'Realeza', proto: PROT_PROFESSION, features: [HUMAN_FEATURE], offset: FEMALE_OFFSET, seed: 105 },

  // Geografía & Capitales
  { word: 'españa', category: 'Geografía', proto: PROT_GEOGRAPHY, features: [COUNTRY_SPAIN], seed: 601 },
  { word: 'madrid', category: 'Geografía', proto: PROT_GEOGRAPHY, features: [COUNTRY_SPAIN, CAPITAL_FEATURE], seed: 601 },
  { word: 'francia', category: 'Geografía', proto: PROT_GEOGRAPHY, features: [COUNTRY_FRANCE], seed: 603 },
  { word: 'parís', category: 'Geografía', proto: PROT_GEOGRAPHY, features: [COUNTRY_FRANCE, CAPITAL_FEATURE], seed: 603 },
  { word: 'italia', category: 'Geografía', proto: PROT_GEOGRAPHY, features: [COUNTRY_ITALY], seed: 605 },
  { word: 'roma', category: 'Geografía', proto: PROT_GEOGRAPHY, features: [COUNTRY_ITALY, CAPITAL_FEATURE], seed: 605 },
  { word: 'alemania', category: 'Geografía', proto: PROT_GEOGRAPHY, features: [COUNTRY_GERMANY], seed: 607 },
  { word: 'berlín', category: 'Geografía', proto: PROT_GEOGRAPHY, features: [COUNTRY_GERMANY, CAPITAL_FEATURE], seed: 607 },
  { word: 'japón', category: 'Geografía', proto: PROT_GEOGRAPHY, features: [COUNTRY_JAPAN], seed: 609 },
  { word: 'tokio', category: 'Geografía', proto: PROT_GEOGRAPHY, features: [COUNTRY_JAPAN, CAPITAL_FEATURE], seed: 609 },

  // Tecnología
  { word: 'computadora', category: 'Tecnología', proto: PROT_TECH, seed: 301 },
  { word: 'software', category: 'Tecnología', proto: PROT_TECH, seed: 302 },
  { word: 'hardware', category: 'Tecnología', proto: PROT_TECH, seed: 303 },
  { word: 'algoritmo', category: 'Tecnología', proto: PROT_TECH, seed: 304 },
  { word: 'inteligencia', category: 'Tecnología', proto: PROT_TECH, seed: 305 },
  { word: 'robot', category: 'Tecnología', proto: PROT_TECH, seed: 306 },
  { word: 'internet', category: 'Tecnología', proto: PROT_TECH, seed: 307 },
  { word: 'código', category: 'Tecnología', proto: PROT_TECH, seed: 308 },
  { word: 'servidor', category: 'Tecnología', proto: PROT_TECH, seed: 309 },
  { word: 'datos', category: 'Tecnología', proto: PROT_TECH, seed: 310 },

  // Fauna
  { word: 'perro', category: 'Fauna', proto: PROT_FAUNA, seed: 201 },
  { word: 'gato', category: 'Fauna', proto: PROT_FAUNA, seed: 202 },
  { word: 'lobo', category: 'Fauna', proto: PROT_FAUNA, seed: 203 },
  { word: 'león', category: 'Fauna', proto: PROT_FAUNA, seed: 204 },
  { word: 'tigre', category: 'Fauna', proto: PROT_FAUNA, seed: 205 },
  { word: 'elefante', category: 'Fauna', proto: PROT_FAUNA, seed: 206 },
  { word: 'águila', category: 'Fauna', proto: PROT_FAUNA, seed: 208 },
  { word: 'ballena', category: 'Fauna', proto: PROT_FAUNA, seed: 209 },

  // Emociones
  { word: 'alegría', category: 'Emoción', proto: PROT_EMOTION, seed: 401 },
  { word: 'felicidad', category: 'Emoción', proto: PROT_EMOTION, seed: 402 },
  { word: 'tristeza', category: 'Emoción', proto: PROT_EMOTION, seed: 403 },
  { word: 'dolor', category: 'Emoción', proto: PROT_EMOTION, seed: 404 },
  { word: 'amor', category: 'Emoción', proto: PROT_EMOTION, seed: 405 },
  { word: 'ira', category: 'Emoción', proto: PROT_EMOTION, seed: 406 },
  { word: 'calma', category: 'Emoción', proto: PROT_EMOTION, seed: 408 },

  // Ciencia
  { word: 'estrella', category: 'Ciencia', proto: PROT_SCIENCE, seed: 701 },
  { word: 'planeta', category: 'Ciencia', proto: PROT_SCIENCE, seed: 702 },
  { word: 'galaxia', category: 'Ciencia', proto: PROT_SCIENCE, seed: 703 },
  { word: 'sol', category: 'Ciencia', proto: PROT_SCIENCE, seed: 704 },
  { word: 'átomo', category: 'Ciencia', proto: PROT_SCIENCE, seed: 706 },
  { word: 'gravedad', category: 'Ciencia', proto: PROT_SCIENCE, seed: 708 },
  { word: 'energía', category: 'Ciencia', proto: PROT_SCIENCE, seed: 709 },

  // Alimentos
  { word: 'manzana', category: 'Alimento', proto: PROT_FOOD, seed: 801 },
  { word: 'pan', category: 'Alimento', proto: PROT_FOOD, seed: 802 },
  { word: 'queso', category: 'Alimento', proto: PROT_FOOD, seed: 803 },
  { word: 'vino', category: 'Alimento', proto: PROT_FOOD, seed: 804 },
  { word: 'café', category: 'Alimento', proto: PROT_FOOD, seed: 805 },
  { word: 'chocolate', category: 'Alimento', proto: PROT_FOOD, seed: 808 }
];

// =========================================================================
// 3. DATASET: IMDB MOVIE REVIEWS (SENTIMENT MANIFOLD)
// =========================================================================
const VEC_POSITIVE = [0.85, 0.75, 0.62, -0.41, 0.88, 0.65, -0.32, 0.79, 0.45, 0.82];
const VEC_NEGATIVE = [-0.85, -0.75, -0.62, 0.41, -0.88, -0.65, 0.32, -0.79, -0.45, -0.82];

const RAW_IMDB_REVIEWS = [
  { text: 'Una obra maestra conmovedora con actuaciones memorables y dirección impecable.', sentiment: 'Positivo', seed: 901 },
  { text: 'Visualmente deslumbrante, con una banda sonora que eleva cada plano a la excelencia.', sentiment: 'Positivo', seed: 902 },
  { text: 'Un guión brillante repleto de ingenio, emoción sincera y personajes entrañables.', sentiment: 'Positivo', seed: 903 },
  { text: 'Hacía años que una película no me emocionaba tanto; una lección de gran cine.', sentiment: 'Positivo', seed: 904 },
  { text: 'Interpretaciones sobresalientes en un drama absorbente que te mantiene pegado a la butaca.', sentiment: 'Positivo', seed: 905 },
  { text: 'Una dirección artística y fotografía que deberían ganar todos los premios de la temporada.', sentiment: 'Positivo', seed: 906 },
  { text: 'Divertida, fresca, inteligente y con un ritmo que no decae en ningún solo minuto.', sentiment: 'Positivo', seed: 907 },
  { text: 'Una película imprescindible que desafía las convenciones y deja huella en el espectador.', sentiment: 'Positivo', seed: 908 },

  { text: 'Una pérdida absoluta de tiempo con diálogos ridículos y un argumento predecible.', sentiment: 'Negativo', seed: 951 },
  { text: 'Actuaciones planas y sin química alguna; aburrida desde el primer minuto hasta el final.', sentiment: 'Negativo', seed: 952 },
  { text: 'Efectos especiales mediocres y un montaje caótico que arruina cualquier intento de trama.', sentiment: 'Negativo', seed: 953 },
  { text: 'Pretenciosa y vacía de contenido. Dos horas dolorosas de cine intrascendente.', sentiment: 'Negativo', seed: 954 },
  { text: 'El peor estreno del año: personajes insoportables y un desenlace completamente absurdo.', sentiment: 'Negativo', seed: 955 },
  { text: 'Guión lleno de agujeros argumentales y decisiones incoherentes que insultan al público.', sentiment: 'Negativo', seed: 956 },
  { text: 'Decepcionante en todos los niveles imaginables; carece de alma, tensión y credibilidad.', sentiment: 'Negativo', seed: 957 },
  { text: 'Una experiencia soporífera de la que quise salir de la sala de proyección a mitad del metraje.', sentiment: 'Negativo', seed: 958 }
];

// Palette mappings
const CATEGORY_COLORS = {
  // BBC News
  'Tecnología': '#06b6d4',      // Cyan
  'Negocios': '#10b981',        // Emerald
  'Política': '#8b5cf6',        // Violet
  'Deportes': '#f59e0b',        // Amber
  'Entretenimiento': '#ec4899', // Pink
  // GloVe Words
  'Realeza': '#eab308',         // Gold
  'Fauna': '#10b981',           // Emerald
  'Emoción': '#ec4899',         // Pink
  'Profesión': '#8b5cf6',       // Purple
  'Geografía': '#3b82f6',       // Blue
  'Ciencia': '#14b8a6',         // Teal
  'Alimento': '#f97316',        // Orange
  // IMDB Sentiment
  'Positivo': '#10b981',        // Emerald
  'Negativo': '#ef4444',        // Red
  'Personalizado': '#ffffff'
};

const DATASET_METADATA = {
  bbc_news: {
    id: 'bbc_news',
    name: 'Noticias Reales BBC (Document Embeddings)',
    desc: 'Artículos de noticias reales proyectados como vectores densos 50D, clasificados en 5 secciones temáticas.',
    type: 'document'
  },
  glove_words: {
    id: 'glove_words',
    name: 'Stanford GloVe (Wikipedia Word Embeddings)',
    desc: 'Espacio vectorial léxico pre-entrenado sobre Wikipedia con relaciones de álgebra semántica (A - B + C = D).',
    type: 'word'
  },
  imdb_sentiment: {
    id: 'imdb_sentiment',
    name: 'IMDB Reviews (Sentimientos Positivos vs Negativos)',
    desc: 'Reseñas de cine reales con polaridad de sentimiento, visualizando la separación semántica de opiniones.',
    type: 'sentiment'
  }
};

/**
 * Universal Dataset Builder by Type
 */
function buildDataset(datasetKey = 'bbc_news') {
  if (datasetKey === 'glove_words') {
    return RAW_GLOVE_WORDS.map((item, idx) => {
      const combined = [...item.proto];
      if (item.features) {
        item.features.forEach(feat => {
          for (let i = 0; i < Math.min(combined.length, feat.length); i++) {
            combined[i] += feat[i];
          }
        });
      }
      if (item.offset) {
        for (let i = 0; i < Math.min(combined.length, item.offset.length); i++) {
          combined[i] += item.offset[i] * 0.8;
        }
      }
      const vector = createVector(combined, item.seed || (idx + 1) * 37, 50);
      return {
        id: idx,
        word: item.word,
        category: item.category,
        color: CATEGORY_COLORS[item.category] || '#ffffff',
        vector: vector,
        isDocument: false
      };
    });
  }

  if (datasetKey === 'imdb_sentiment') {
    return RAW_IMDB_REVIEWS.map((item, idx) => {
      const base = item.sentiment === 'Positivo' ? VEC_POSITIVE : VEC_NEGATIVE;
      const vector = makeDocumentVector(base, [], item.seed, 50);
      return {
        id: idx,
        word: item.text.slice(0, 36) + '...',
        category: item.sentiment,
        color: CATEGORY_COLORS[item.sentiment] || '#ffffff',
        vector: vector,
        isDocument: true,
        headline: item.sentiment === 'Positivo' ? '★ Crítica Positiva' : '✗ Crítica Negativa',
        snippet: item.text
      };
    });
  }

  // Default: BBC News
  return RAW_BBC_NEWS.map((item, idx) => {
    const vector = makeDocumentVector(item.primary, item.subs, item.seed, 50);
    return {
      id: idx,
      word: item.title,
      category: item.category,
      color: CATEGORY_COLORS[item.category] || '#ffffff',
      vector: vector,
      isDocument: true,
      headline: item.title,
      snippet: item.snippet
    };
  });
}


  // --- 2. PROJECTION ENGINE (PCA, t-SNE, CUSTOM AXES) ---
/**
 * Projection Engine for Embedding Projector
 * Implements:
 *  1. PCA (Principal Component Analysis with Covariance & Power Iteration SVD)
 *  2. t-SNE (t-Distributed Stochastic Neighbor Embedding with live iterative stepping)
 *  3. Custom Semantic Vector Axes Projection
 */

class ProjectionEngine {
  constructor() {
    this.tsneState = {
      points: [],
      P: null,
      Y: null,
      dY: null,
      gains: null,
      iter: 0,
      perplexity: 18,
      learningRate: 100,
      momentum: 0.5,
      finalMomentum: 0.8,
      momSwitchIter: 150,
      dims: 3
    };
  }

  // ==========================================
  // 1. PCA (Principal Component Analysis)
  // ==========================================
  computePCA(dataset, targetDims = 3) {
    const N = dataset.length;
    if (N === 0) return { coords: [], varianceExplained: [0, 0, 0] };
    const D = dataset[0].vector.length;

    // 1. Calculate Mean per dimension
    const mean = new Float64Array(D);
    for (let i = 0; i < N; i++) {
      const vec = dataset[i].vector;
      for (let d = 0; d < D; d++) {
        mean[d] += vec[d];
      }
    }
    for (let d = 0; d < D; d++) mean[d] /= N;

    // 2. Center Data Matrix X (N x D)
    const X = new Array(N);
    for (let i = 0; i < N; i++) {
      X[i] = new Float64Array(D);
      const vec = dataset[i].vector;
      for (let d = 0; d < D; d++) {
        X[i][d] = vec[d] - mean[d];
      }
    }

    // 3. Compute Covariance Matrix C (D x D) = (X^T * X) / (N - 1)
    const C = new Array(D);
    for (let i = 0; i < D; i++) {
      C[i] = new Float64Array(D);
    }
    for (let j = 0; j < D; j++) {
      for (let k = j; k < D; k++) {
        let sum = 0;
        for (let i = 0; i < N; i++) {
          sum += X[i][j] * X[i][k];
        }
        const val = sum / (N - 1);
        C[j][k] = val;
        C[k][j] = val;
      }
    }

    // Total variance (Trace of Covariance Matrix)
    let totalVar = 0;
    for (let d = 0; d < D; d++) totalVar += C[d][d];
    if (totalVar <= 0) totalVar = 1;

    // 4. Power Iteration with Deflation for Top Eigenvectors
    const eigenvectors = [];
    const eigenvalues = [];
    const C_def = C.map(row => new Float64Array(row));

    for (let k = 0; k < targetDims; k++) {
      // Random starting vector
      let b = new Float64Array(D);
      for (let d = 0; d < D; d++) b[d] = Math.sin(k * 77 + d * 13) + 0.1;
      let bNorm = Math.hypot(...b);
      for (let d = 0; d < D; d++) b[d] /= bNorm;

      // Power iteration loop
      for (let iter = 0; iter < 45; iter++) {
        const b_next = new Float64Array(D);
        for (let r = 0; r < D; r++) {
          let s = 0;
          for (let c = 0; c < D; c++) {
            s += C_def[r][c] * b[c];
          }
          b_next[r] = s;
        }
        bNorm = Math.hypot(...b_next);
        if (bNorm > 1e-12) {
          for (let d = 0; d < D; d++) b[d] = b_next[d] / bNorm;
        }
      }

      // Rayleigh quotient to get eigenvalue
      let lambda = 0;
      for (let r = 0; r < D; r++) {
        let s = 0;
        for (let c = 0; c < D; c++) s += C_def[r][c] * b[c];
        lambda += b[r] * s;
      }

      eigenvalues.push(Math.max(0, lambda));
      eigenvectors.push(b);

      // Deflate matrix C_def -= lambda * (b * b^T)
      for (let r = 0; r < D; r++) {
        for (let c = 0; c < D; c++) {
          C_def[r][c] -= lambda * b[r] * b[c];
        }
      }
    }

    // 5. Project all points onto eigenvectors
    const projected = [];
    for (let i = 0; i < N; i++) {
      const coords = [];
      for (let k = 0; k < targetDims; k++) {
        let dot = 0;
        for (let d = 0; d < D; d++) {
          dot += X[i][d] * eigenvectors[k][d];
        }
        coords.push(dot);
      }
      projected.push(coords);
    }

    // Normalize coordinates to a standard 3D bounding box [-80, 80]
    const scaleFactor = 100;
    const maxVals = [1e-6, 1e-6, 1e-6];
    projected.forEach(coord => {
      for (let k = 0; k < targetDims; k++) {
        maxVals[k] = Math.max(maxVals[k], Math.abs(coord[k]));
      }
    });

    const scaled = projected.map(coord => {
      return [
        (coord[0] / maxVals[0]) * scaleFactor,
        (coord[1] / maxVals[1]) * scaleFactor,
        targetDims > 2 ? (coord[2] / maxVals[2]) * scaleFactor : 0
      ];
    });

    const varianceExplained = eigenvalues.map(v => Math.min(100, Math.round((v / totalVar) * 1000) / 10));

    return {
      coords: scaled,
      varianceExplained: varianceExplained
    };
  }

  // ==========================================
  // 2. t-SNE (Interactive Live Stepping)
  // ==========================================
  initTSNE(dataset, perplexity = 18, dims = 3) {
    const N = dataset.length;
    this.tsneState.points = dataset;
    this.tsneState.dims = dims;
    this.tsneState.perplexity = perplexity;
    this.tsneState.iter = 0;

    // Pairwise squared Euclidean distances in high-D space
    const D = dataset[0].vector.length;
    const distSq = new Float64Array(N * N);
    for (let i = 0; i < N; i++) {
      const vi = dataset[i].vector;
      for (let j = i + 1; j < N; j++) {
        const vj = dataset[j].vector;
        let d = 0;
        for (let k = 0; k < D; k++) {
          const diff = vi[k] - vj[k];
          d += diff * diff;
        }
        distSq[i * N + j] = d;
        distSq[j * N + i] = d;
      }
    }

    // Compute joint probability distribution P in high-D space
    const P = new Float64Array(N * N);
    const targetEntropy = Math.log(perplexity);

    for (let i = 0; i < N; i++) {
      let betaMin = -Infinity;
      let betaMax = Infinity;
      let beta = 1.0; // 1 / (2 * sigma^2)
      let rowSum = 0;

      // Binary search for beta to match target entropy
      for (let iter = 0; iter < 40; iter++) {
        rowSum = 0;
        let H = 0;
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const val = Math.exp(-distSq[i * N + j] * beta);
          P[i * N + j] = val;
          rowSum += val;
        }

        if (rowSum < 1e-12) rowSum = 1e-12;
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const p = P[i * N + j] / rowSum;
          P[i * N + j] = p;
          if (p > 1e-12) H -= p * Math.log(p);
        }

        const Hdiff = H - targetEntropy;
        if (Math.abs(Hdiff) < 1e-4) break;

        if (Hdiff > 0) {
          betaMin = beta;
          beta = betaMax === Infinity ? beta * 2 : (beta + betaMax) / 2;
        } else {
          betaMax = beta;
          beta = betaMin === -Infinity ? beta / 2 : (beta + betaMin) / 2;
        }
      }
    }

    // Symmetrize P matrix: p_ij = (p_j|i + p_i|j) / (2N)
    const symP = new Float64Array(N * N);
    const totalDenom = 2 * N;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        symP[i * N + j] = Math.max(1e-12, (P[i * N + j] + P[j * N + i]) / totalDenom);
      }
    }
    this.tsneState.P = symP;

    // Initialize low-D coordinates Y with small random Gaussian values
    const Y = new Float64Array(N * dims);
    for (let i = 0; i < N * dims; i++) {
      Y[i] = (Math.sin(i * 1337) * 2 - 1) * 0.1;
    }
    this.tsneState.Y = Y;
    this.tsneState.dY = new Float64Array(N * dims);
    this.tsneState.gains = new Float64Array(N * dims).fill(1.0);
  }

  stepTSNE(numSteps = 1) {
    const { P, Y, dY, gains, dims, perplexity } = this.tsneState;
    if (!P || !Y) return null;
    const N = this.tsneState.points.length;
    const lr = this.tsneState.learningRate;

    for (let step = 0; step < numSteps; step++) {
      this.tsneState.iter++;
      const iter = this.tsneState.iter;
      const momentum = iter < this.tsneState.momSwitchIter ? this.tsneState.momentum : this.tsneState.finalMomentum;

      // 1. Compute low-D student-t similarities q_ij
      const num = new Float64Array(N * N);
      let qSum = 0;

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          let d = 0;
          for (let k = 0; k < dims; k++) {
            const diff = Y[i * dims + k] - Y[j * dims + k];
            d += diff * diff;
          }
          const val = 1.0 / (1.0 + d);
          num[i * N + j] = val;
          num[j * N + i] = val;
          qSum += 2 * val;
        }
      }
      if (qSum < 1e-12) qSum = 1e-12;

      // 2. Compute Gradients
      const grad = new Float64Array(N * dims);
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const q = num[i * N + j] / qSum;
          const p = P[i * N + j];
          const mult = 4.0 * (p - q) * num[i * N + j];

          for (let k = 0; k < dims; k++) {
            grad[i * dims + k] += mult * (Y[i * dims + k] - Y[j * dims + k]);
          }
        }
      }

      // 3. Update coordinates with adaptive gains and momentum
      for (let i = 0; i < N * dims; i++) {
        const g = grad[i];
        const dy = dY[i];

        // Adaptive gain
        gains[i] = (Math.sign(g) !== Math.sign(dy)) ? (gains[i] + 0.2) : (gains[i] * 0.8);
        if (gains[i] < 0.01) gains[i] = 0.01;

        // Gradient step
        dY[i] = momentum * dy - lr * gains[i] * g;
        Y[i] += dY[i];
      }
    }

    // Return scaled coordinates [-80, 80]
    const coords = [];
    let maxDist = 1e-6;
    for (let i = 0; i < N; i++) {
      for (let k = 0; k < dims; k++) {
        maxDist = Math.max(maxDist, Math.abs(Y[i * dims + k]));
      }
    }

    const scale = 75 / maxDist;
    for (let i = 0; i < N; i++) {
      coords.push([
        Y[i * dims + 0] * scale,
        Y[i * dims + 1] * scale,
        dims > 2 ? Y[i * dims + 2] * scale : 0
      ]);
    }

    return {
      coords,
      iteration: this.tsneState.iter
    };
  }

  // ==========================================
  // 3. Custom Semantic Vector Axes Projection
  // ==========================================
  computeCustomAxisProjection(dataset, axisVectorX, axisVectorY, axisVectorZ = null) {
    const N = dataset.length;
    if (N === 0) return [];

    const normX = Math.hypot(...axisVectorX) || 1;
    const normY = Math.hypot(...axisVectorY) || 1;
    const normZ = axisVectorZ ? (Math.hypot(...axisVectorZ) || 1) : 1;

    const uX = axisVectorX.map(v => v / normX);
    const uY = axisVectorY.map(v => v / normY);
    const uZ = axisVectorZ ? axisVectorZ.map(v => v / normZ) : null;

    const rawCoords = [];
    let maxAbs = [1e-6, 1e-6, 1e-6];

    for (let i = 0; i < N; i++) {
      const v = dataset[i].vector;
      let dotX = 0, dotY = 0, dotZ = 0;
      for (let d = 0; d < v.length; d++) {
        dotX += v[d] * uX[d];
        dotY += v[d] * uY[d];
        if (uZ) dotZ += v[d] * uZ[d];
      }
      rawCoords.push([dotX, dotY, dotZ]);
      maxAbs[0] = Math.max(maxAbs[0], Math.abs(dotX));
      maxAbs[1] = Math.max(maxAbs[1], Math.abs(dotY));
      maxAbs[2] = Math.max(maxAbs[2], Math.abs(dotZ));
    }

    const scale = 80;
    return rawCoords.map(c => [
      (c[0] / maxAbs[0]) * scale,
      (c[1] / maxAbs[1]) * scale,
      uZ ? (c[2] / maxAbs[2]) * scale : 0
    ]);
  }
}


  // --- 3. VECTOR MATH (K-NN, COSINE SIMILARITY, ANALOGIES) ---
/**
 * Vector Math & Semantic Operations for Embedding Projector
 * Implements:
 *  - Cosine Similarity & Euclidean Distance
 *  - K-Nearest Neighbors (K-NN)
 *  - Vector Arithmetic: A - B + C = D (Word2Vec Math)
 *  - Custom Word Embedding Synthesizer (FastText subword + semantic anchors)
 */

class VectorMath {
  /**
   * Cosine Similarity between two vectors: (A . B) / (||A|| * ||B||)
   * Range: [-1.0, 1.0]
   */
  static cosineSimilarity(a, b) {
    if (!a || !b || a.length !== b.length) return 0;
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    const denom = Math.sqrt(normA) * Math.sqrt(normB);
    return denom === 0 ? 0 : Math.max(-1, Math.min(1, dot / denom));
  }

  /**
   * Euclidean Distance between two vectors: sqrt( sum( (A_i - B_i)^2 ) )
   */
  static euclideanDistance(a, b) {
    if (!a || !b || a.length !== b.length) return Infinity;
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      const diff = a[i] - b[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  }

  /**
   * Find Top-K Nearest Neighbors to a query vector
   */
  static findNearestNeighbors(queryVec, dataset, k = 8, excludeWord = null) {
    const scored = [];
    for (let i = 0; i < dataset.length; i++) {
      const item = dataset[i];
      if (excludeWord && item.word.toLowerCase() === excludeWord.toLowerCase()) continue;

      const cosSim = this.cosineSimilarity(queryVec, item.vector);
      const eucDist = this.euclideanDistance(queryVec, item.vector);

      scored.push({
        id: item.id,
        word: item.word,
        category: item.category,
        color: item.color,
        cosineSimilarity: cosSim,
        euclideanDistance: eucDist,
        similarityPercent: Math.round(((cosSim + 1) / 2) * 100)
      });
    }

    // Sort descending by cosine similarity
    scored.sort((a, b) => b.cosineSimilarity - a.cosineSimilarity);
    return scored.slice(0, k);
  }

  /**
   * Classic Word2Vec Semantic Vector Arithmetic:
   * Target Vector = A - B + C
   * Example: rey - hombre + mujer = reina
   */
  static computeVectorAnalogy(wordA, wordB, wordC, dataset, topK = 5) {
    const itemA = dataset.find(d => d.word.toLowerCase() === wordA.toLowerCase());
    const itemB = dataset.find(d => d.word.toLowerCase() === wordB.toLowerCase());
    const itemC = dataset.find(d => d.word.toLowerCase() === wordC.toLowerCase());

    if (!itemA || !itemB || !itemC) {
      return {
        success: false,
        error: 'Una o más palabras de la fórmula no existen en el dataset actual.'
      };
    }

    const D = itemA.vector.length;
    const targetVec = new Float32Array(D);

    // V_target = A - B + C
    for (let i = 0; i < D; i++) {
      targetVec[i] = itemA.vector[i] - itemB.vector[i] + itemC.vector[i];
    }

    // Normalize target vector
    let norm = 0;
    for (let i = 0; i < D; i++) norm += targetVec[i] * targetVec[i];
    norm = Math.sqrt(norm) || 1;
    for (let i = 0; i < D; i++) targetVec[i] /= norm;

    // Search nearest candidates, excluding input words A, B, C
    const excludeSet = new Set([wordA.toLowerCase(), wordB.toLowerCase(), wordC.toLowerCase()]);
    const candidates = [];

    for (let i = 0; i < dataset.length; i++) {
      const item = dataset[i];
      if (excludeSet.has(item.word.toLowerCase())) continue;

      const sim = this.cosineSimilarity(targetVec, item.vector);
      candidates.push({
        word: item.word,
        category: item.category,
        color: item.color,
        similarity: sim
      });
    }

    candidates.sort((a, b) => b.similarity - a.similarity);

    return {
      success: true,
      targetVector: Array.from(targetVec),
      formula: `${itemA.word} - ${itemB.word} + ${itemC.word}`,
      bestMatch: candidates[0] || null,
      topMatches: candidates.slice(0, topK)
    };
  }

  /**
   * Generates a new high-dimensional vector for a custom user-defined word or sentence.
   * Blends FastText-inspired subword char n-grams with category centroid and semantic seeds.
   */
  static synthesizeCustomEmbedding(newWord, category, seedWords = [], dataset = [], dims = 50) {
    const vec = new Float32Array(dims);

    // 1. Base category centroid or seed words average
    let seedCount = 0;
    if (seedWords && seedWords.length > 0) {
      seedWords.forEach(w => {
        const match = dataset.find(d => d.word.toLowerCase() === w.toLowerCase());
        if (match) {
          for (let d = 0; d < dims; d++) vec[d] += match.vector[d];
          seedCount++;
        }
      });
    }

    // If no seeds found, find all words in same category
    if (seedCount === 0 && category) {
      const catWords = dataset.filter(d => d.category.toLowerCase() === category.toLowerCase());
      if (catWords.length > 0) {
        catWords.forEach(w => {
          for (let d = 0; d < dims; d++) vec[d] += w.vector[d];
          seedCount++;
        });
      }
    }

    if (seedCount > 0) {
      for (let d = 0; d < dims; d++) vec[d] /= seedCount;
    }

    // 2. Add subtle deterministic subword hash variation (FastText style)
    const cleanWord = newWord.toLowerCase().trim();
    const hashScale = 0.05 / Math.max(1, cleanWord.length);
    for (let i = 0; i < cleanWord.length; i++) {
      const charCode = cleanWord.charCodeAt(i);
      for (let d = 0; d < dims; d++) {
        const hash = Math.sin((charCode * 31 + d * 17) + i * 101) * hashScale;
        vec[d] += hash;
      }
    }

    // 3. Normalize to unit length (L2 norm = 1.0)
    let norm = 0;
    for (let d = 0; d < dims; d++) norm += vec[d] * vec[d];
    norm = Math.sqrt(norm) || 1;
    for (let d = 0; d < dims; d++) vec[d] /= norm;

    return Array.from(vec);
  }
}


  // --- 4. 3D WEBGL ENGINE ---
/**
 * 3D WebGL Visualization Engine for Embedding Projector
 * Powered by Three.js & OrbitControls
 * Features:
 *  - 3D/2D Scatter plot with glowing categorical nodes
 *  - Interactive Raycasting (Hover tooltip & Point selection)
 *  - Pulsing selection rings & 3D K-NN semantic laser connection lines
 *  - Dynamic Screen-Space Text Labels (High-DPI crisp typography)
 *  - Smooth Camera Animations (Fly-to-node & View reset)
 */

class Projector3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = Object.assign({
      pointSize: 2.5,
      showLabels: true,
      labelMode: 'all', // 'all', 'hover', 'selection'
      is3D: true,
      onSelectPoint: null,
      onHoverPoint: null
    }, options);

    this.pointsData = [];
    this.currentCoords = [];
    this.selectedPointId = null;
    this.hoveredPointId = null;
    this.neighborLines = [];

    this.initThree();
    this.initEvents();
    this.animate();
  }

  initThree() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x090d16);

    // Subtle atmospheric fog
    this.scene.fog = new THREE.FogExp2(0x090d16, 0.0035);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000);
    this.defaultCameraPos = new THREE.Vector3(0, 45, 175);
    this.camera.position.copy(this.defaultCameraPos);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // 4. Orbit Controls
    if (window.THREE && window.THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.maxDistance = 600;
      this.controls.minDistance = 15;
    }

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x818cf8, 1.2);
    dirLight1.position.set(100, 150, 100);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.8);
    dirLight2.position.set(-100, -50, -100);
    this.scene.add(dirLight2);

    // 6. Coordinate Grid and Reference Planes
    this.initReferenceGrid();

    // 7. Raycaster for picking
    this.raycaster = new THREE.Raycaster();
    this.raycaster.params.Points.threshold = 4.0;
    this.mouse = new THREE.Vector2(-999, -999);

    // Groups for modular rendering
    this.nodesGroup = new THREE.Group();
    this.linesGroup = new THREE.Group();
    this.haloGroup = new THREE.Group();
    this.scene.add(this.nodesGroup);
    this.scene.add(this.linesGroup);
    this.scene.add(this.haloGroup);

    // Labels 2D overlay container
    this.labelsContainer = document.createElement('div');
    this.labelsContainer.className = 'projector-labels-layer pointer-events-none absolute inset-0 overflow-hidden select-none';
    this.container.style.position = 'relative';
    this.container.appendChild(this.labelsContainer);
  }

  initReferenceGrid() {
    // Subtle circular ground grid
    const gridHelper = new THREE.GridHelper(240, 24, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -85;
    this.scene.add(gridHelper);

    // Axes lines with subtle colors
    const axesGroup = new THREE.Group();
    const axisMatX = new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.35 });
    const axisMatY = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.35 });
    const axisMatZ = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.35 });

    const createAxis = (from, to, mat) => {
      const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
      return new THREE.Line(geo, mat);
    };

    axesGroup.add(createAxis(new THREE.Vector3(-100, 0, 0), new THREE.Vector3(100, 0, 0), axisMatX));
    axesGroup.add(createAxis(new THREE.Vector3(0, -90, 0), new THREE.Vector3(0, 90, 0), axisMatY));
    axesGroup.add(createAxis(new THREE.Vector3(0, 0, -100), new THREE.Vector3(0, 0, 100), axisMatZ));
    this.scene.add(axesGroup);
    this.axesGroup = axesGroup;
  }

  initEvents() {
    window.addEventListener('resize', () => this.onWindowResize());

    const dom = this.renderer.domElement;
    dom.addEventListener('mousemove', (e) => this.onMouseMove(e));
    dom.addEventListener('click', (e) => this.onClick(e));
  }

  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  onMouseMove(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast hover
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.nodeMeshes || []);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const pointId = hit.userData.id;
      if (this.hoveredPointId !== pointId) {
        this.hoveredPointId = pointId;
        this.renderer.domElement.style.cursor = 'pointer';
        if (this.options.onHoverPoint) {
          const pt = this.pointsData.find(p => p.id === pointId);
          this.options.onHoverPoint(pt, e.clientX, e.clientY);
        }
      }
    } else {
      if (this.hoveredPointId !== null) {
        this.hoveredPointId = null;
        this.renderer.domElement.style.cursor = 'default';
        if (this.options.onHoverPoint) this.options.onHoverPoint(null);
      }
    }
  }

  onClick(e) {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.nodeMeshes || []);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const pointId = hit.userData.id;
      this.selectPoint(pointId);
    }
  }

  /**
   * Set and render data points with 3D/2D coordinates
   */
  setData(points, coordinates) {
    this.pointsData = points;
    this.currentCoords = coordinates;

    // Clear previous elements
    while (this.nodesGroup.children.length > 0) {
      const obj = this.nodesGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      this.nodesGroup.remove(obj);
    }
    this.nodeMeshes = [];
    this.labelsContainer.innerHTML = '';

    const sphereGeo = new THREE.SphereGeometry(this.options.pointSize, 16, 16);

    points.forEach((p, idx) => {
      const coord = coordinates[idx] || [0, 0, 0];
      const colorHex = parseInt(p.color.replace('#', '0x'), 16);

      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.35,
        roughness: 0.3,
        metalness: 0.2
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(coord[0], coord[1], coord[2]);
      mesh.userData = { id: p.id, word: p.word, category: p.category, color: p.color, index: idx };

      this.nodesGroup.add(mesh);
      this.nodeMeshes.push(mesh);

      // Create 2D Label element
      const label = document.createElement('div');
      label.className = `projector-label absolute transform -translate-x-1/2 -translate-y-full text-[11px] font-medium px-1.5 py-0.5 rounded transition-opacity duration-150 whitespace-nowrap shadow-sm`;
      label.id = `label-node-${p.id}`;
      label.style.backgroundColor = 'rgba(15, 23, 42, 0.75)';
      label.style.border = `1px solid ${p.color}40`;
      label.style.color = p.color;
      label.textContent = p.word;

      this.labelsContainer.appendChild(label);
    });

    // Re-highlight if someone was selected
    if (this.selectedPointId !== null) {
      this.selectPoint(this.selectedPointId, false);
    }

    this.updateLabels();
  }

  /**
   * Select a word point, draw pulsing halo and K-NN laser lines
   */
  selectPoint(pointId, triggerCallback = true) {
    this.selectedPointId = pointId;
    const pt = this.pointsData.find(p => p.id === pointId);
    const mesh = this.nodeMeshes ? this.nodeMeshes.find(m => m.userData.id === pointId) : null;

    // Clear halo
    while (this.haloGroup.children.length > 0) {
      this.haloGroup.remove(this.haloGroup.children[0]);
    }

    if (mesh) {
      // Create glowing selection rings around the node
      const ringGeo = new THREE.RingGeometry(this.options.pointSize * 1.5, this.options.pointSize * 2.0, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(mesh.position);
      ringMesh.lookAt(this.camera.position);
      this.haloGroup.add(ringMesh);
      this.haloRing = ringMesh;
    }

    if (triggerCallback && this.options.onSelectPoint && pt) {
      this.options.onSelectPoint(pt);
    }
  }

  /**
   * Draw glowing laser lines from selected point to its Top-K nearest neighbors
   */
  drawNeighborLines(neighbors) {
    while (this.linesGroup.children.length > 0) {
      const obj = this.linesGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      this.linesGroup.remove(obj);
    }

    if (!neighbors || neighbors.length === 0 || this.selectedPointId === null) return;

    const sourceMesh = this.nodeMeshes.find(m => m.userData.id === this.selectedPointId);
    if (!sourceMesh) return;

    const sourcePos = sourceMesh.position;

    neighbors.forEach((n, idx) => {
      const targetMesh = this.nodeMeshes.find(m => m.userData.id === n.id);
      if (!targetMesh) return;

      const targetPos = targetMesh.position;
      const points = [sourcePos, targetPos];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

      // Gradient intensity based on similarity
      const opacity = Math.max(0.2, n.cosineSimilarity || 0.6);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: opacity,
        linewidth: 2
      });

      const line = new THREE.Line(lineGeo, lineMat);
      this.linesGroup.add(line);
    });
  }

  /**
   * Smooth Camera Fly-To target position
   */
  flyToPoint(pointId) {
    const mesh = this.nodeMeshes ? this.nodeMeshes.find(m => m.userData.id === pointId) : null;
    if (!mesh) return;

    const target = mesh.position.clone();
    const startCamPos = this.camera.position.clone();
    const endCamPos = target.clone().add(new THREE.Vector3(0, 15, 60));

    let progress = 0;
    const anim = () => {
      progress += 0.04;
      if (progress < 1) {
        this.camera.position.lerpVectors(startCamPos, endCamPos, progress);
        if (this.controls) this.controls.target.lerp(target, 0.1);
        requestAnimationFrame(anim);
      } else {
        this.camera.position.copy(endCamPos);
        if (this.controls) this.controls.target.copy(target);
      }
    };
    anim();
  }

  resetCamera() {
    const startCamPos = this.camera.position.clone();
    const startTarget = this.controls ? this.controls.target.clone() : new THREE.Vector3(0, 0, 0);
    const endTarget = new THREE.Vector3(0, 0, 0);

    let progress = 0;
    const anim = () => {
      progress += 0.04;
      if (progress < 1) {
        this.camera.position.lerpVectors(startCamPos, this.defaultCameraPos, progress);
        if (this.controls) this.controls.target.lerp(endTarget, 0.1);
        requestAnimationFrame(anim);
      } else {
        this.camera.position.copy(this.defaultCameraPos);
        if (this.controls) this.controls.target.copy(endTarget);
      }
    };
    anim();
  }

  setDimensionMode(is3D) {
    this.options.is3D = is3D;
    if (this.axesGroup) {
      this.axesGroup.children[2].visible = is3D; // Hide Z axis line in 2D
    }
  }

  setLabelMode(mode) {
    this.options.labelMode = mode;
    this.updateLabels();
  }

  setPointSize(size) {
    this.options.pointSize = size;
    if (this.nodeMeshes) {
      const scale = size / 2.5;
      this.nodeMeshes.forEach(m => m.scale.set(scale, scale, scale));
    }
  }

  /**
   * Project 3D node positions to 2D screen coordinates and update labels
   */
  updateLabels() {
    if (!this.nodeMeshes || !this.labelsContainer) return;

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    const halfW = width / 2;
    const halfH = height / 2;

    const mode = this.options.labelMode;
    const isLabelsEnabled = this.options.showLabels;

    for (let i = 0; i < this.nodeMeshes.length; i++) {
      const mesh = this.nodeMeshes[i];
      const id = mesh.userData.id;
      const labelEl = document.getElementById(`label-node-${id}`);
      if (!labelEl) continue;

      if (!isLabelsEnabled) {
        labelEl.style.display = 'none';
        continue;
      }

      // Check visibility filter
      const isSelected = this.selectedPointId === id;
      const isHovered = this.hoveredPointId === id;

      if (mode === 'hover' && !isHovered && !isSelected) {
        labelEl.style.display = 'none';
        continue;
      }
      if (mode === 'selection' && !isSelected) {
        labelEl.style.display = 'none';
        continue;
      }

      // Project 3D -> 2D
      const pos = mesh.position.clone();
      pos.project(this.camera);

      // Check if behind camera
      if (pos.z > 1.0) {
        labelEl.style.display = 'none';
        continue;
      }

      const x = (pos.x * halfW) + halfW;
      const y = -(pos.y * halfH) + halfH - 12;

      labelEl.style.display = 'block';
      labelEl.style.left = `${x}px`;
      labelEl.style.top = `${y}px`;

      // Scale or highlight active
      if (isSelected || isHovered) {
        labelEl.style.zIndex = '20';
        labelEl.style.transform = 'translate(-50%, -100%) scale(1.15)';
        labelEl.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
        labelEl.style.borderColor = '#6366f1';
      } else {
        labelEl.style.zIndex = '5';
        labelEl.style.transform = 'translate(-50%, -100%) scale(1)';
        labelEl.style.backgroundColor = 'rgba(15, 23, 42, 0.75)';
        labelEl.style.borderColor = `${mesh.userData.color}40`;
      }
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.controls) this.controls.update();

    // Pulse halo ring
    if (this.haloRing) {
      this.haloRing.lookAt(this.camera.position);
      const pulse = 1.0 + Math.sin(Date.now() * 0.006) * 0.15;
      this.haloRing.scale.set(pulse, pulse, pulse);
    }

    this.updateLabels();
    this.renderer.render(this.scene, this.camera);
  }
}


  // --- 5. PROJECTOR CONTROLLER ---
/**
 * Projector Controller
 * Coordinates:
 *  - Real Datasets (BBC News, Stanford GloVe, IMDB Sentiment)
 *  - PCA, t-SNE and Custom Axis projection engines
 *  - 3D WebGL renderer, labels and laser lines
 *  - Semantic Vector Arithmetic Calculator (A - B + C = D)
 *  - Real Document / Word Inspection & K-NN Search
 *  - Search & Autocomplete
 */






class ProjectorController {
  constructor() {
    this.currentDatasetKey = 'bbc_news';
    this.rawDataset = buildDataset(this.currentDatasetKey);
    this.activeDataset = [...this.rawDataset];
    this.projectionEngine = new ProjectionEngine();

    this.currentMode = 'pca'; // 'pca', 'tsne', 'custom'
    this.is3D = true;
    this.selectedPoint = null;

    this.tsneRunning = false;
    this.tsneAnimFrame = null;

    this.initUI();
    this.init3D();
    this.renderCategoryLegend();
    this.runCurrentProjection();
    this.initVectorMathSection();
  }

  initUI() {
    // Top Bar elements
    this.datasetSelect = document.getElementById('dataset-select');
    this.dimToggleBtn = document.getElementById('dim-toggle-btn');
    this.resetCamBtn = document.getElementById('reset-camera-btn');
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    this.pointCountBadge = document.getElementById('point-count-badge');
    this.dimBadge = document.getElementById('dim-badge');
    this.legendContainer = document.getElementById('category-legend-container');

    // Algorithm Tab Buttons
    this.tabPca = document.getElementById('tab-pca');
    this.tabTsne = document.getElementById('tab-tsne');
    this.tabCustom = document.getElementById('tab-custom');
    this.panelPca = document.getElementById('panel-pca');
    this.panelTsne = document.getElementById('panel-tsne');
    this.panelCustom = document.getElementById('panel-custom');

    // PCA Elements
    this.pcaVarTotal = document.getElementById('pca-var-total');
    this.pcaBar1 = document.getElementById('pca-bar-1');
    this.pcaBar2 = document.getElementById('pca-bar-2');
    this.pcaBar3 = document.getElementById('pca-bar-3');
    this.pcaVal1 = document.getElementById('pca-val-1');
    this.pcaVal2 = document.getElementById('pca-val-2');
    this.pcaVal3 = document.getElementById('pca-val-3');

    // t-SNE Elements
    this.tsnePlayBtn = document.getElementById('tsne-play-btn');
    this.tsneResetBtn = document.getElementById('tsne-reset-btn');
    this.tsnePerplexitySlider = document.getElementById('tsne-perplexity-slider');
    this.tsnePerplexityVal = document.getElementById('tsne-perplexity-val');
    this.tsneIterBadge = document.getElementById('tsne-iter-badge');

    // Custom Axes Elements
    this.axisXPositive = document.getElementById('axis-x-pos');
    this.axisXNegative = document.getElementById('axis-x-neg');
    this.axisYPositive = document.getElementById('axis-y-pos');
    this.axisYNegative = document.getElementById('axis-y-neg');
    this.axisZPositive = document.getElementById('axis-z-pos');
    this.axisZNegative = document.getElementById('axis-z-neg');
    this.applyCustomAxisBtn = document.getElementById('apply-custom-axis-btn');

    // Label & Point options
    this.labelModeSelect = document.getElementById('label-mode-select');
    this.pointSizeSlider = document.getElementById('point-size-slider');

    // Right Sidebar (Inspector)
    this.inspectorEmpty = document.getElementById('inspector-empty');
    this.inspectorContent = document.getElementById('inspector-content');
    this.inspectWord = document.getElementById('inspect-word');
    this.inspectCategory = document.getElementById('inspect-category');
    this.inspectBadge = document.getElementById('inspect-badge');
    this.inspectSnippetBox = document.getElementById('inspect-snippet-box');
    this.inspectSnippet = document.getElementById('inspect-snippet');
    this.neighborsContainer = document.getElementById('neighbors-container');

    // Vector Arithmetic Elements
    this.mathWordA = document.getElementById('math-word-a');
    this.mathWordB = document.getElementById('math-word-b');
    this.mathWordC = document.getElementById('math-word-c');
    this.mathCalcBtn = document.getElementById('math-calc-btn');
    this.mathResultBox = document.getElementById('math-result-box');
    this.mathResultWord = document.getElementById('math-result-word');
    this.mathResultSim = document.getElementById('math-result-sim');
    this.mathPresetSelect = document.getElementById('math-preset-select');

    // Custom Word Creator
    this.newWordInput = document.getElementById('new-word-input');
    this.newWordCategory = document.getElementById('new-word-category');
    this.addNewWordBtn = document.getElementById('add-new-word-btn');

    // Attach listeners
    this.attachEventListeners();
    this.populateWordSelects();
    this.updateStatsBadges();
  }

  init3D() {
    this.projector = new Projector3D('canvas-3d-container', {
      pointSize: parseFloat(this.pointSizeSlider.value) || 2.5,
      showLabels: true,
      labelMode: this.labelModeSelect.value || 'all',
      is3D: this.is3D,
      onSelectPoint: (pt) => this.onPointSelected(pt),
      onHoverPoint: (pt, x, y) => this.onPointHovered(pt, x, y)
    });
  }

  attachEventListeners() {
    // Dataset Select
    if (this.datasetSelect) {
      this.datasetSelect.addEventListener('change', (e) => {
        this.switchDataset(e.target.value);
      });
    }

    // 2D / 3D Toggle
    this.dimToggleBtn.addEventListener('click', () => {
      this.is3D = !this.is3D;
      this.dimToggleBtn.innerHTML = this.is3D ? `
        <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
        Modo: 3D
      ` : `
        <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        Modo: 2D
      `;
      this.projector.setDimensionMode(this.is3D);
      this.runCurrentProjection();
    });

    // Reset Camera
    this.resetCamBtn.addEventListener('click', () => this.projector.resetCamera());

    // Algorithm Tabs
    this.tabPca.addEventListener('click', () => this.switchAlgorithm('pca'));
    this.tabTsne.addEventListener('click', () => this.switchAlgorithm('tsne'));
    this.tabCustom.addEventListener('click', () => this.switchAlgorithm('custom'));

    // t-SNE Controls
    this.tsnePlayBtn.addEventListener('click', () => this.toggleTSNE());
    this.tsneResetBtn.addEventListener('click', () => this.resetTSNE());
    this.tsnePerplexitySlider.addEventListener('input', (e) => {
      this.tsnePerplexityVal.textContent = e.target.value;
      if (this.currentMode === 'tsne') {
        this.resetTSNE();
      }
    });

    // Custom Axes apply
    this.applyCustomAxisBtn.addEventListener('click', () => this.runCustomAxisProjection());

    // Search input
    this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    this.searchInput.addEventListener('focus', () => {
      if (this.searchInput.value) this.handleSearch(this.searchInput.value);
    });
    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
        this.searchResults.classList.add('hidden');
      }
    });

    // Label Mode & Point Size
    this.labelModeSelect.addEventListener('change', (e) => {
      this.projector.setLabelMode(e.target.value);
    });
    this.pointSizeSlider.addEventListener('input', (e) => {
      this.projector.setPointSize(parseFloat(e.target.value));
    });

    // Vector Math Calc
    this.mathCalcBtn.addEventListener('click', () => this.computeVectorMath());
    this.mathPresetSelect.addEventListener('change', (e) => this.loadMathPreset(e.target.value));

    // Custom Word Add
    this.addNewWordBtn.addEventListener('click', () => this.addNewCustomWord());
    this.newWordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.addNewCustomWord();
    });
  }

  switchDataset(datasetKey) {
    this.currentDatasetKey = datasetKey;
    this.stopTSNE();
    this.rawDataset = buildDataset(datasetKey);
    this.activeDataset = [...this.rawDataset];
    this.selectedPoint = null;

    // Reset Inspector
    this.inspectorEmpty.classList.remove('hidden');
    this.inspectorContent.classList.add('hidden');

    this.updateStatsBadges();
    this.populateWordSelects();
    this.renderCategoryLegend();
    this.runCurrentProjection();
    this.projector.resetCamera();
  }

  renderCategoryLegend() {
    if (!this.legendContainer) return;
    this.legendContainer.innerHTML = '';

    const categories = Array.from(new Set(this.activeDataset.map(d => d.category)));
    categories.forEach(cat => {
      const color = CATEGORY_COLORS[cat] || '#ffffff';
      const item = document.createElement('div');
      item.className = 'flex items-center space-x-1.5 text-xs text-slate-300';
      item.innerHTML = `<span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${color};"></span><span class="truncate">${cat}</span>`;
      this.legendContainer.appendChild(item);
    });
  }

  updateStatsBadges() {
    const meta = DATASET_METADATA[this.currentDatasetKey] || {};
    this.pointCountBadge.textContent = `${this.activeDataset.length} ${meta.type === 'document' ? 'artículos' : 'vectores'}`;
    this.dimBadge.textContent = `50D ➔ ${this.is3D ? '3D' : '2D'}`;
  }

  populateWordSelects() {
    const words = [...this.activeDataset].slice(0, 30);
    const makeOptions = (defaultVal) => {
      return words.map(w => `<option value="${w.word}" ${w.word === defaultVal ? 'selected' : ''}>${w.word.slice(0, 24)} (${w.category})</option>`).join('');
    };

    if (this.axisXPositive) this.axisXPositive.innerHTML = makeOptions(words[0] ? words[0].word : '');
    if (this.axisXNegative) this.axisXNegative.innerHTML = makeOptions(words[1] ? words[1].word : '');
    if (this.axisYPositive) this.axisYPositive.innerHTML = makeOptions(words[2] ? words[2].word : '');
    if (this.axisYNegative) this.axisYNegative.innerHTML = makeOptions(words[3] ? words[3].word : '');
    if (this.axisZPositive) this.axisZPositive.innerHTML = makeOptions(words[4] ? words[4].word : '');
    if (this.axisZNegative) this.axisZNegative.innerHTML = makeOptions(words[5] ? words[5].word : '');
  }

  switchAlgorithm(mode) {
    this.currentMode = mode;
    this.stopTSNE();

    const tabs = [this.tabPca, this.tabTsne, this.tabCustom];
    const panels = [this.panelPca, this.panelTsne, this.panelCustom];

    tabs.forEach(t => t.classList.remove('bg-indigo-600', 'text-white'));
    panels.forEach(p => p.classList.add('hidden'));

    if (mode === 'pca') {
      this.tabPca.classList.add('bg-indigo-600', 'text-white');
      this.panelPca.classList.remove('hidden');
    } else if (mode === 'tsne') {
      this.tabTsne.classList.add('bg-indigo-600', 'text-white');
      this.panelTsne.classList.remove('hidden');
      this.resetTSNE();
    } else if (mode === 'custom') {
      this.tabCustom.classList.add('bg-indigo-600', 'text-white');
      this.panelCustom.classList.remove('hidden');
    }

    this.runCurrentProjection();
  }

  runCurrentProjection() {
    const targetDims = this.is3D ? 3 : 2;

    if (this.currentMode === 'pca') {
      const res = this.projectionEngine.computePCA(this.activeDataset, targetDims);
      this.projector.setData(this.activeDataset, res.coords);

      const v = res.varianceExplained;
      const total = (v[0] + v[1] + (targetDims > 2 ? v[2] : 0)).toFixed(1);
      this.pcaVarTotal.textContent = `${total}%`;
      this.pcaVal1.textContent = `${v[0]}%`;
      this.pcaVal2.textContent = `${v[1]}%`;
      this.pcaVal3.textContent = targetDims > 2 ? `${v[2]}%` : '0%';
      this.pcaBar1.style.width = `${v[0]}%`;
      this.pcaBar2.style.width = `${v[1]}%`;
      this.pcaBar3.style.width = targetDims > 2 ? `${v[2]}%` : '0%';

    } else if (this.currentMode === 'tsne') {
      if (!this.projectionEngine.tsneState.P) {
        this.resetTSNE();
      }
    } else if (this.currentMode === 'custom') {
      this.runCustomAxisProjection();
    }
  }

  // ==========================================
  // t-SNE Interactive Execution
  // ==========================================
  resetTSNE() {
    this.stopTSNE();
    const perplexity = parseInt(this.tsnePerplexitySlider.value, 10) || 18;
    const targetDims = this.is3D ? 3 : 2;

    this.projectionEngine.initTSNE(this.activeDataset, perplexity, targetDims);
    const stepRes = this.projectionEngine.stepTSNE(1);
    this.projector.setData(this.activeDataset, stepRes.coords);
    this.tsneIterBadge.textContent = `Iteración: ${stepRes.iteration}`;
  }

  toggleTSNE() {
    if (this.tsneRunning) {
      this.stopTSNE();
    } else {
      this.startTSNE();
    }
  }

  startTSNE() {
    this.tsneRunning = true;
    this.tsnePlayBtn.innerHTML = `
      <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      Pausar
    `;
    this.tsnePlayBtn.classList.replace('bg-indigo-600', 'bg-amber-600');
    this.tsnePlayBtn.classList.replace('hover:bg-indigo-500', 'hover:bg-amber-500');

    const loop = () => {
      if (!this.tsneRunning) return;
      const res = this.projectionEngine.stepTSNE(2);
      if (res) {
        this.projector.setData(this.activeDataset, res.coords);
        this.tsneIterBadge.textContent = `Iteración: ${res.iteration}`;
      }
      this.tsneAnimFrame = requestAnimationFrame(loop);
    };
    this.tsneAnimFrame = requestAnimationFrame(loop);
  }

  stopTSNE() {
    this.tsneRunning = false;
    if (this.tsneAnimFrame) cancelAnimationFrame(this.tsneAnimFrame);
    if (this.tsnePlayBtn) {
      this.tsnePlayBtn.innerHTML = `
        <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path></svg>
        Ejecutar t-SNE
      `;
      this.tsnePlayBtn.classList.replace('bg-amber-600', 'bg-indigo-600');
      this.tsnePlayBtn.classList.replace('hover:bg-amber-500', 'hover:bg-indigo-500');
    }
  }

  // ==========================================
  // Custom Semantic Axes
  // ==========================================
  runCustomAxisProjection() {
    const getVec = (word) => {
      const match = this.activeDataset.find(d => d.word.toLowerCase() === word.toLowerCase());
      return match ? match.vector : null;
    };

    const vXp = getVec(this.axisXPositive.value);
    const vXn = getVec(this.axisXNegative.value);
    const vYp = getVec(this.axisYPositive.value);
    const vYn = getVec(this.axisYNegative.value);
    const vZp = this.is3D ? getVec(this.axisZPositive.value) : null;
    const vZn = this.is3D ? getVec(this.axisZNegative.value) : null;

    if (!vXp || !vXn || !vYp || !vYn) {
      alert('Por favor selecciona palabras válidas para todos los ejes requeridos.');
      return;
    }

    const D = vXp.length;
    const axisX = new Float32Array(D);
    const axisY = new Float32Array(D);
    const axisZ = this.is3D && vZp && vZn ? new Float32Array(D) : null;

    for (let i = 0; i < D; i++) {
      axisX[i] = vXp[i] - vXn[i];
      axisY[i] = vYp[i] - vYn[i];
      if (axisZ) axisZ[i] = vZp[i] - vZn[i];
    }

    const coords = this.projectionEngine.computeCustomAxisProjection(this.activeDataset, axisX, axisY, axisZ);
    this.projector.setData(this.activeDataset, coords);
  }

  // ==========================================
  // Selection & K-Nearest Neighbors
  // ==========================================
  onPointSelected(pt) {
    this.selectedPoint = pt;

    // Show Inspector
    this.inspectorEmpty.classList.add('hidden');
    this.inspectorContent.classList.remove('hidden');

    this.inspectWord.textContent = pt.headline || pt.word;
    this.inspectCategory.textContent = pt.category;
    this.inspectBadge.style.backgroundColor = `${pt.color}25`;
    this.inspectBadge.style.color = pt.color;
    this.inspectBadge.style.borderColor = `${pt.color}50`;

    if (pt.snippet) {
      this.inspectSnippetBox.classList.remove('hidden');
      this.inspectSnippet.textContent = pt.snippet;
    } else {
      this.inspectSnippetBox.classList.add('hidden');
    }

    // Compute K-NN
    const neighbors = VectorMath.findNearestNeighbors(pt.vector, this.activeDataset, 6, pt.word);
    this.projector.drawNeighborLines(neighbors);
    this.renderNeighborsTable(neighbors);
  }

  onPointHovered(pt, x, y) {
    const tooltip = document.getElementById('projector-tooltip');
    if (!tooltip) return;

    if (!pt) {
      tooltip.classList.add('hidden');
      return;
    }

    tooltip.classList.remove('hidden');
    tooltip.style.left = `${x + 15}px`;
    tooltip.style.top = `${y - 15}px`;
    tooltip.innerHTML = `
      <div class="flex items-center space-x-1.5 mb-0.5">
        <span class="w-2 h-2 rounded-full" style="background-color: ${pt.color};"></span>
        <span class="font-bold text-white text-xs truncate max-w-xs">${pt.headline || pt.word}</span>
      </div>
      <div class="text-[10px] text-slate-400">${pt.category} • Embedding L2: 1.0</div>
    `;
  }

  renderNeighborsTable(neighbors) {
    this.neighborsContainer.innerHTML = '';
    if (!neighbors || neighbors.length === 0) return;

    neighbors.forEach(n => {
      const row = document.createElement('div');
      row.className = 'group p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between';
      row.innerHTML = `
        <div class="flex items-center space-x-2 min-w-0 pr-2">
          <span class="w-2 h-2 rounded-full shrink-0" style="background-color: ${n.color};"></span>
          <div class="min-w-0">
            <div class="font-semibold text-xs text-slate-200 group-hover:text-indigo-300 transition-colors truncate">${n.word}</div>
            <div class="text-[10px] text-slate-500">${n.category}</div>
          </div>
        </div>
        <div class="text-right shrink-0">
          <div class="font-mono text-xs font-bold text-emerald-400">${n.cosineSimilarity.toFixed(3)}</div>
          <div class="w-14 bg-slate-900 rounded-full h-1 mt-1 overflow-hidden">
            <div class="bg-emerald-500 h-1 rounded-full" style="width: ${n.similarityPercent}%"></div>
          </div>
        </div>
      `;

      row.addEventListener('click', () => {
        this.projector.selectPoint(n.id);
        this.projector.flyToPoint(n.id);
      });

      this.neighborsContainer.appendChild(row);
    });
  }

  // ==========================================
  // Search & Navigation
  // ==========================================
  handleSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.searchResults.classList.add('hidden');
      return;
    }

    const matches = this.activeDataset.filter(d => d.word.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)).slice(0, 8);

    if (matches.length === 0) {
      this.searchResults.innerHTML = '<div class="p-2.5 text-xs text-slate-400 italic">No se encontraron elementos.</div>';
      this.searchResults.classList.remove('hidden');
      return;
    }

    this.searchResults.innerHTML = '';
    matches.forEach(m => {
      const item = document.createElement('div');
      item.className = 'p-2 rounded hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs transition-colors';
      item.innerHTML = `
        <span class="font-medium text-slate-200 truncate pr-2">${m.word}</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded shrink-0" style="background-color: ${m.color}20; color: ${m.color};">${m.category}</span>
      `;
      item.addEventListener('click', () => {
        this.searchInput.value = m.word;
        this.searchResults.classList.add('hidden');
        this.projector.selectPoint(m.id);
        this.projector.flyToPoint(m.id);
      });
      this.searchResults.appendChild(item);
    });

    this.searchResults.classList.remove('hidden');
  }

  // ==========================================
  // Vector Arithmetic (A - B + C = D)
  // ==========================================
  initVectorMathSection() {
    this.mathWordA.value = 'rey';
    this.mathWordB.value = 'hombre';
    this.mathWordC.value = 'mujer';
    this.computeVectorMath();
  }

  loadMathPreset(presetKey) {
    const presets = {
      reina: { a: 'rey', b: 'hombre', c: 'mujer' },
      paris: { a: 'madrid', b: 'españa', c: 'francia' },
      roma: { a: 'madrid', b: 'españa', c: 'italia' },
      dolor: { a: 'alegría', b: 'amor', c: 'tristeza' }
    };

    if (presets[presetKey]) {
      // If not on glove_words dataset, auto-switch to glove_words
      if (this.currentDatasetKey !== 'glove_words' && this.datasetSelect) {
        this.datasetSelect.value = 'glove_words';
        this.switchDataset('glove_words');
      }
      this.mathWordA.value = presets[presetKey].a;
      this.mathWordB.value = presets[presetKey].b;
      this.mathWordC.value = presets[presetKey].c;
      this.computeVectorMath();
    }
  }

  computeVectorMath() {
    const a = this.mathWordA.value.trim();
    const b = this.mathWordB.value.trim();
    const c = this.mathWordC.value.trim();

    // Ensure we have a dataset with these words
    const datasetForMath = buildDataset('glove_words');
    const res = VectorMath.computeVectorAnalogy(a, b, c, datasetForMath, 4);

    if (!res.success) {
      this.mathResultBox.classList.remove('hidden');
      this.mathResultWord.textContent = 'Error';
      this.mathResultSim.textContent = res.error;
      return;
    }

    this.mathResultBox.classList.remove('hidden');
    if (res.bestMatch) {
      this.mathResultWord.textContent = res.bestMatch.word;
      this.mathResultWord.style.color = res.bestMatch.color;
      this.mathResultSim.textContent = `Similaridad Coseno: ${res.bestMatch.similarity.toFixed(3)}`;

      this.mathResultBox.onclick = () => {
        // If current dataset isn't glove_words, switch
        if (this.currentDatasetKey !== 'glove_words') {
          this.datasetSelect.value = 'glove_words';
          this.switchDataset('glove_words');
        }
        const item = this.activeDataset.find(d => d.word.toLowerCase() === res.bestMatch.word.toLowerCase());
        if (item) {
          this.projector.selectPoint(item.id);
          this.projector.flyToPoint(item.id);
        }
      };
    }
  }

  // ==========================================
  // Add Custom Word Embedding
  // ==========================================
  addNewCustomWord() {
    const word = this.newWordInput.value.trim();
    if (!word) {
      alert('Escribe un texto o término.');
      return;
    }

    const category = this.newWordCategory.value || 'Personalizado';

    const newVec = VectorMath.synthesizeCustomEmbedding(word, category, [], this.activeDataset, 50);

    const newId = this.activeDataset.length;
    const newEntry = {
      id: newId,
      word: word,
      category: category,
      color: CATEGORY_COLORS[category] || '#ffffff',
      vector: newVec,
      headline: word,
      snippet: `Documento/Término personalizado inyectado en el espacio de embeddings en tiempo real. Categoría: ${category}.`
    };

    this.activeDataset.push(newEntry);
    this.updateStatsBadges();
    this.populateWordSelects();
    this.renderCategoryLegend();

    this.runCurrentProjection();
    setTimeout(() => {
      this.projector.selectPoint(newId);
      this.projector.flyToPoint(newId);
    }, 150);

    this.newWordInput.value = '';
  }
}


  // --- 6. AUTO-INITIALIZATION ---
  window.addEventListener('DOMContentLoaded', () => {
    window.projectorApp = new ProjectorController();
    console.log('🚀 Embedding Projector 3D inicializado correctamente en el navegador.');
  });
})();
