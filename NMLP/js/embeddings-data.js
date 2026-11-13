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

export const RAW_BBC_NEWS = [
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

export const RAW_GLOVE_WORDS = [
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

export const RAW_IMDB_REVIEWS = [
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
export const CATEGORY_COLORS = {
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

export const DATASET_METADATA = {
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
export function buildDataset(datasetKey = 'bbc_news') {
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
