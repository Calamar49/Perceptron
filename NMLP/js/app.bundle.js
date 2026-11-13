/**
 * FreeLing NMLP Studio - Self-Contained Browser Bundle
 * Generated automatically. Compatible with both file:/// and http://
 */
(function() {
  'use strict';

  // --- 1. SPANISH LEXICON ---
/**
 * Spanish Lexicon & Linguistic Knowledge Base for FreeLing NLP Replication
 * Includes:
 * - Comprehensive Stopwords list
 * - Irregular verb dictionary (conjugated forms -> lemma, EAGLES tag)
 * - Irregular plurals and feminine forms
 * - EAGLES PoS Tag Definitions & Colors
 * - Common word POS mappings
 */

const STOPWORDS_SPANISH = new Set([
  // Artículos
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'al', 'del', 'lo',
  // Preposiciones
  'a', 'ante', 'bajo', 'cabe', 'con', 'contra', 'de', 'desde', 'durante', 'en',
  'entre', 'hacia', 'hasta', 'mediante', 'para', 'por', 'según', 'sin', 'so',
  'sobre', 'tras', 'versus', 'vía',
  // Conjunciones
  'y', 'e', 'ni', 'o', 'u', 'pero', 'mas', 'sino', 'porque', 'pues', 'aunque',
  'siquiera', 'que', 'como', 'si', 'cuando', 'donde', 'mientras', 'ya',
  // Pronombres personales y clíticos
  'yo', 'tú', 'él', 'ella', 'ello', 'nosotros', 'nosotras', 'vosotros', 'vosotras',
  'ellos', 'ellas', 'usted', 'ustedes', 'me', 'te', 'se', 'nos', 'os', 'le',
  'les', 'lo', 'la', 'los', 'las', 'mí', 'ti', 'sí', 'conmigo', 'contigo', 'consigo',
  // Posesivos
  'mi', 'mis', 'tu', 'tus', 'su', 'sus', 'mío', 'mía', 'míos', 'mías',
  'tuyo', 'tuya', 'tuyos', 'tuyas', 'suyo', 'suya', 'suyos', 'suyas',
  'nuestro', 'nuestra', 'nuestros', 'nuestras', 'vuestro', 'vuestra', 'vuestros', 'vuestras',
  // Demostrativos
  'este', 'esta', 'estos', 'estas', 'ese', 'esa', 'esos', 'esas',
  'aquel', 'aquella', 'aquellos', 'aquellas', 'esto', 'eso', 'aquello',
  // Verbos auxiliares / copulativos comunes en formas simples
  'es', 'era', 'fue', 'será', 'sería', 'sea', 'fuera', 'fuese', 'sido', 'siendo',
  'soy', 'eres', 'somos', 'sois', 'son', 'eran', 'fueron', 'serán', 'serían', 'sean',
  'está', 'estaba', 'estuvo', 'estará', 'estaría', 'esté', 'estado', 'estando',
  'estoy', 'estás', 'estamos', 'estáis', 'están', 'estaban', 'estuvieron',
  'ha', 'había', 'hubo', 'habrá', 'habría', 'haya', 'hubiera', 'hubiese', 'habido',
  'he', 'has', 'hemos', 'habéis', 'han', 'habían', 'hubieron', 'hay',
  // Adverbios comunes / cuantificadores
  'más', 'menos', 'muy', 'mucho', 'mucha', 'muchos', 'muchas',
  'poco', 'poca', 'pocos', 'pocas', 'bastante', 'bastantes',
  'demasiado', 'demasiada', 'demasiados', 'demasiadas',
  'tanto', 'tanta', 'tantos', 'tantas', 'tan',
  'todo', 'toda', 'todos', 'todas',
  'otro', 'otra', 'otros', 'otras',
  'mismo', 'misma', 'mismos', 'mismas',
  'alguno', 'alguna', 'algunos', 'algunas', 'algo', 'alguien',
  'ninguno', 'ninguna', 'ningunos', 'ningunas', 'nada', 'nadie',
  'cualquiera', 'cualesquiera',
  'también', 'tampoco', 'además', 'así', 'aún', 'todavía',
  'no', 'jamás', 'nunca', 'siempre', 'sólo', 'solo',
  'bien', 'mal', 'casi', 'apenas',
  // Interrogativos / Exclamativos
  'qué', 'cuál', 'cuáles', 'quién', 'quiénes', 'cuánto', 'cuánta', 'cuántos', 'cuántas',
  'cómo', 'dónde', 'cuándo'
]);

const STOPWORDS_ENGLISH = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've",
  "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his',
  'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself',
  'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom',
  'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be',
  'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a',
  'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at',
  'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on',
  'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
  'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
  'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
  'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've",
  'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn'
]);

/**
 * Common Spanish abbreviations to prevent accidental sentence splitting
 */
const SPANISH_ABBREVIATIONS = new Set([
  'sr', 'sra', 'srta', 'dr', 'dra', 'prof', 'profa', 'cte', 'gral', 'tte',
  'col', 'dña', 'd', 'gob', 'art', 'cap', 'ed', 'vol', 'núm', 'num', 'pág',
  'pag', 'págs', 'pags', 'etc', 'ej', 'vs', 'apdo', 'avda', 'av', 'pl',
  'tel', 'eeuu', 'ee.uu', 'ue', 'onu', 'ci', 'dni', 'cfa', 'coord'
]);

/**
 * EAGLES Tag definitions mapping to Human readable Spanish terms and colors
 */
const EAGLES_TAXONOMY = {
  // Sustantivos (N)
  'NCMS000': { cat: 'Sustantivo', desc: 'Nombre común masculino singular', upos: 'NOUN', color: '#10b981' },
  'NCFS000': { cat: 'Sustantivo', desc: 'Nombre común femenino singular', upos: 'NOUN', color: '#10b981' },
  'NCMP000': { cat: 'Sustantivo', desc: 'Nombre común masculino plural', upos: 'NOUN', color: '#10b981' },
  'NCFP000': { cat: 'Sustantivo', desc: 'Nombre común femenino plural', upos: 'NOUN', color: '#10b981' },
  'NP00000': { cat: 'Nombre Propio', desc: 'Nombre propio', upos: 'PROPN', color: '#059669' },

  // Adjetivos (A)
  'AQ0MS0': { cat: 'Adjetivo', desc: 'Adjetivo calificativo masc. sing.', upos: 'ADJ', color: '#f59e0b' },
  'AQ0FS0': { cat: 'Adjetivo', desc: 'Adjetivo calificativo fem. sing.', upos: 'ADJ', color: '#f59e0b' },
  'AQ0CS0': { cat: 'Adjetivo', desc: 'Adjetivo calificativo común sing.', upos: 'ADJ', color: '#f59e0b' },
  'AQ0MP0': { cat: 'Adjetivo', desc: 'Adjetivo calificativo masc. plur.', upos: 'ADJ', color: '#f59e0b' },
  'AQ0FP0': { cat: 'Adjetivo', desc: 'Adjetivo calificativo fem. plur.', upos: 'ADJ', color: '#f59e0b' },
  'AQ0CP0': { cat: 'Adjetivo', desc: 'Adjetivo calificativo común plur.', upos: 'ADJ', color: '#f59e0b' },

  // Verbos (V)
  'VMIP3S0': { cat: 'Verbo', desc: 'Verbo principal presente indicativo 3ª sing.', upos: 'VERB', color: '#3b82f6' },
  'VMIP1S0': { cat: 'Verbo', desc: 'Verbo principal presente indicativo 1ª sing.', upos: 'VERB', color: '#3b82f6' },
  'VMIP2S0': { cat: 'Verbo', desc: 'Verbo principal presente indicativo 2ª sing.', upos: 'VERB', color: '#3b82f6' },
  'VMIP1P0': { cat: 'Verbo', desc: 'Verbo principal presente indicativo 1ª plur.', upos: 'VERB', color: '#3b82f6' },
  'VMIP3P0': { cat: 'Verbo', desc: 'Verbo principal presente indicativo 3ª plur.', upos: 'VERB', color: '#3b82f6' },
  'VMIS3S0': { cat: 'Verbo', desc: 'Verbo pretérito perf. simple 3ª sing.', upos: 'VERB', color: '#3b82f6' },
  'VMIS1S0': { cat: 'Verbo', desc: 'Verbo pretérito perf. simple 1ª sing.', upos: 'VERB', color: '#3b82f6' },
  'VMIS3P0': { cat: 'Verbo', desc: 'Verbo pretérito perf. simple 3ª plur.', upos: 'VERB', color: '#3b82f6' },
  'VMII3S0': { cat: 'Verbo', desc: 'Verbo pretérito imperfecto 3ª sing.', upos: 'VERB', color: '#3b82f6' },
  'VMII3P0': { cat: 'Verbo', desc: 'Verbo pretérito imperfecto 3ª plur.', upos: 'VERB', color: '#3b82f6' },
  'VMIF3S0': { cat: 'Verbo', desc: 'Verbo futuro indicativo 3ª sing.', upos: 'VERB', color: '#3b82f6' },
  'VMIF3P0': { cat: 'Verbo', desc: 'Verbo futuro indicativo 3ª plur.', upos: 'VERB', color: '#3b82f6' },
  'VMIC3S0': { cat: 'Verbo', desc: 'Verbo condicional 3ª sing.', upos: 'VERB', color: '#3b82f6' },
  'VMSP3S0': { cat: 'Verbo', desc: 'Verbo presente subjuntivo 3ª sing.', upos: 'VERB', color: '#3b82f6' },
  'VMN0000': { cat: 'Verbo', desc: 'Verbo infinitivo', upos: 'VERB', color: '#3b82f6' },
  'VMG0000': { cat: 'Verbo', desc: 'Verbo gerundio', upos: 'VERB', color: '#3b82f6' },
  'VMP00SM': { cat: 'Verbo', desc: 'Verbo participio masc. sing.', upos: 'VERB', color: '#3b82f6' },
  'VMP00SF': { cat: 'Verbo', desc: 'Verbo participio fem. sing.', upos: 'VERB', color: '#3b82f6' },
  'VSIP3S0': { cat: 'Verbo Semiauxiliar', desc: 'Verbo ser presente 3ª sing.', upos: 'AUX', color: '#6366f1' },
  'VAIP3S0': { cat: 'Verbo Auxiliar', desc: 'Verbo haber presente 3ª sing.', upos: 'AUX', color: '#6366f1' },

  // Determinantes (D)
  'DA0MS0': { cat: 'Determinante', desc: 'Artículo determinado masc. sing.', upos: 'DET', color: '#06b6d4' },
  'DA0FS0': { cat: 'Determinante', desc: 'Artículo determinado fem. sing.', upos: 'DET', color: '#06b6d4' },
  'DA0MP0': { cat: 'Determinante', desc: 'Artículo determinado masc. plur.', upos: 'DET', color: '#06b6d4' },
  'DA0FP0': { cat: 'Determinante', desc: 'Artículo determinado fem. plur.', upos: 'DET', color: '#06b6d4' },
  'DI0MS0': { cat: 'Determinante', desc: 'Determinante indefinido masc. sing.', upos: 'DET', color: '#06b6d4' },
  'DI0FS0': { cat: 'Determinante', desc: 'Determinante indefinido fem. sing.', upos: 'DET', color: '#06b6d4' },
  'DD0MS0': { cat: 'Determinante', desc: 'Determinante demostrativo masc. sing.', upos: 'DET', color: '#06b6d4' },
  'DP3CS0': { cat: 'Determinante', desc: 'Determinante posesivo 3ª sing.', upos: 'DET', color: '#06b6d4' },

  // Pronombres (P)
  'PP1CSN0': { cat: 'Pronombre', desc: 'Pronombre personal 1ª sing. nominativo', upos: 'PRON', color: '#ec4899' },
  'PP2CSN0': { cat: 'Pronombre', desc: 'Pronombre personal 2ª sing. nominativo', upos: 'PRON', color: '#ec4899' },
  'PP3MS00': { cat: 'Pronombre', desc: 'Pronombre personal 3ª masc. sing.', upos: 'PRON', color: '#ec4899' },
  'PP3FS00': { cat: 'Pronombre', desc: 'Pronombre personal 3ª fem. sing.', upos: 'PRON', color: '#ec4899' },
  'PP3CN00': { cat: 'Pronombre', desc: 'Pronombre personal clítico (se, etc.)', upos: 'PRON', color: '#ec4899' },
  'PR0CN000': { cat: 'Pronombre', desc: 'Pronombre relativo común (que, quien)', upos: 'PRON', color: '#ec4899' },
  'PI0MS000': { cat: 'Pronombre', desc: 'Pronombre indefinido', upos: 'PRON', color: '#ec4899' },

  // Preposiciones (S)
  'SPS00': { cat: 'Preposición', desc: 'Preposición simple', upos: 'ADP', color: '#64748b' },
  'SPCMS': { cat: 'Preposición', desc: 'Preposición contraída (al, del)', upos: 'ADP', color: '#64748b' },

  // Adverbios (R)
  'RG': { cat: 'Adverbio', desc: 'Adverbio general', upos: 'ADV', color: '#a855f7' },
  'RN': { cat: 'Adverbio', desc: 'Adverbio negativo', upos: 'ADV', color: '#a855f7' },

  // Conjunciones (C)
  'CC': { cat: 'Conjunción', desc: 'Conjunción coordinante (y, o, pero)', upos: 'CCONJ', color: '#eab308' },
  'CS': { cat: 'Conjunción', desc: 'Conjunción subordinante (que, si, porque)', upos: 'SCONJ', color: '#eab308' },

  // Numerales (Z)
  'Z': { cat: 'Número', desc: 'Cifra o numeral', upos: 'NUM', color: '#14b8a6' },

  // Interjección (I)
  'I': { cat: 'Interjección', desc: 'Interjección', upos: 'INTJ', color: '#f43f5e' }
};

/**
 * Rich Spanish Irregular Verbs and Form Dictionary
 * Word form -> [lemma, eaglesTag, upos, morphology]
 */
const SPANISH_IRREGULARS = {
  // SER
  'soy': ['ser', 'VSIP1S0', 'AUX', 'Presente 1ª sing.'],
  'eres': ['ser', 'VSIP2S0', 'AUX', 'Presente 2ª sing.'],
  'es': ['ser', 'VSIP3S0', 'AUX', 'Presente 3ª sing.'],
  'somos': ['ser', 'VSIP1P0', 'AUX', 'Presente 1ª plur.'],
  'sois': ['ser', 'VSIP2P0', 'AUX', 'Presente 2ª plur.'],
  'son': ['ser', 'VSIP3P0', 'AUX', 'Presente 3ª plur.'],
  'era': ['ser', 'VSII3S0', 'AUX', 'Pretérito imperfecto 1ª/3ª sing.'],
  'eras': ['ser', 'VSII2S0', 'AUX', 'Pretérito imperfecto 2ª sing.'],
  'éramos': ['ser', 'VSII1P0', 'AUX', 'Pretérito imperfecto 1ª plur.'],
  'erais': ['ser', 'VSII2P0', 'AUX', 'Pretérito imperfecto 2ª plur.'],
  'eran': ['ser', 'VSII3P0', 'AUX', 'Pretérito imperfecto 3ª plur.'],
  'fui': ['ser', 'VSIS1S0', 'AUX', 'Pretérito perf. simple 1ª sing.'],
  'fuiste': ['ser', 'VSIS2S0', 'AUX', 'Pretérito perf. simple 2ª sing.'],
  'fue': ['ser', 'VSIS3S0', 'AUX', 'Pretérito perf. simple 3ª sing.'],
  'fuimos': ['ser', 'VSIS1P0', 'AUX', 'Pretérito perf. simple 1ª plur.'],
  'fuisteis': ['ser', 'VSIS2P0', 'AUX', 'Pretérito perf. simple 2ª plur.'],
  'fueron': ['ser', 'VSIS3P0', 'AUX', 'Pretérito perf. simple 3ª plur.'],
  'seré': ['ser', 'VSIF1S0', 'AUX', 'Futuro 1ª sing.'],
  'serás': ['ser', 'VSIF2S0', 'AUX', 'Futuro 2ª sing.'],
  'será': ['ser', 'VSIF3S0', 'AUX', 'Futuro 3ª sing.'],
  'seremos': ['ser', 'VSIF1P0', 'AUX', 'Futuro 1ª plur.'],
  'serán': ['ser', 'VSIF3P0', 'AUX', 'Futuro 3ª plur.'],
  'sería': ['ser', 'VSIC3S0', 'AUX', 'Condicional 1ª/3ª sing.'],
  'serían': ['ser', 'VSIC3P0', 'AUX', 'Condicional 3ª plur.'],
  'sea': ['ser', 'VSSP3S0', 'AUX', 'Subjuntivo presente 3ª sing.'],
  'sean': ['ser', 'VSSP3P0', 'AUX', 'Subjuntivo presente 3ª plur.'],
  'sido': ['ser', 'VSP00SM', 'AUX', 'Participio'],
  'siendo': ['ser', 'VSG0000', 'AUX', 'Gerundio'],

  // ESTAR
  'estoy': ['estar', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'estás': ['estar', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  'está': ['estar', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'estamos': ['estar', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'estáis': ['estar', 'VMIP2P0', 'VERB', 'Presente 2ª plur.'],
  'están': ['estar', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'estaba': ['estar', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'estabas': ['estar', 'VMII2S0', 'VERB', 'Pretérito imperfecto 2ª sing.'],
  'estábamos': ['estar', 'VMII1P0', 'VERB', 'Pretérito imperfecto 1ª plur.'],
  'estaban': ['estar', 'VMII3P0', 'VERB', 'Pretérito imperfecto 3ª plur.'],
  'estuve': ['estar', 'VMIS1S0', 'VERB', 'Pretérito perf. simple 1ª sing.'],
  'estuviste': ['estar', 'VMIS2S0', 'VERB', 'Pretérito perf. simple 2ª sing.'],
  'estuvo': ['estar', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'estuvimos': ['estar', 'VMIS1P0', 'VERB', 'Pretérito perf. simple 1ª plur.'],
  'estuvieron': ['estar', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'estará': ['estar', 'VMIF3S0', 'VERB', 'Futuro 3ª sing.'],
  'estarán': ['estar', 'VMIF3P0', 'VERB', 'Futuro 3ª plur.'],
  'estaría': ['estar', 'VMIC3S0', 'VERB', 'Condicional 3ª sing.'],
  'esté': ['estar', 'VMSP3S0', 'VERB', 'Subjuntivo presente 3ª sing.'],
  'estén': ['estar', 'VMSP3P0', 'VERB', 'Subjuntivo presente 3ª plur.'],
  'estado': ['estar', 'VMP00SM', 'VERB', 'Participio'],
  'estando': ['estar', 'VMG0000', 'VERB', 'Gerundio'],

  // HABER
  'he': ['haber', 'VAIP1S0', 'AUX', 'Presente 1ª sing.'],
  'has': ['haber', 'VAIP2S0', 'AUX', 'Presente 2ª sing.'],
  'ha': ['haber', 'VAIP3S0', 'AUX', 'Presente 3ª sing.'],
  'hay': ['haber', 'VAIP3S0', 'AUX', 'Presente impersonal'],
  'hemos': ['haber', 'VAIP1P0', 'AUX', 'Presente 1ª plur.'],
  'habéis': ['haber', 'VAIP2P0', 'AUX', 'Presente 2ª plur.'],
  'han': ['haber', 'VAIP3P0', 'AUX', 'Presente 3ª plur.'],
  'había': ['haber', 'VAII3S0', 'AUX', 'Pretérito imperfecto 3ª sing.'],
  'habías': ['haber', 'VAII2S0', 'AUX', 'Pretérito imperfecto 2ª sing.'],
  'habíamos': ['haber', 'VAII1P0', 'AUX', 'Pretérito imperfecto 1ª plur.'],
  'habían': ['haber', 'VAII3P0', 'AUX', 'Pretérito imperfecto 3ª plur.'],
  'hubo': ['haber', 'VAIS3S0', 'AUX', 'Pretérito perf. simple 3ª sing.'],
  'hubieron': ['haber', 'VAIS3P0', 'AUX', 'Pretérito perf. simple 3ª plur.'],
  'habrá': ['haber', 'VAIF3S0', 'AUX', 'Futuro 3ª sing.'],
  'habrán': ['haber', 'VAIF3P0', 'AUX', 'Futuro 3ª plur.'],
  'habría': ['haber', 'VAIC3S0', 'AUX', 'Condicional 3ª sing.'],
  'haya': ['haber', 'VASP3S0', 'AUX', 'Subjuntivo presente 3ª sing.'],
  'hayan': ['haber', 'VASP3P0', 'AUX', 'Subjuntivo presente 3ª plur.'],
  'hubiera': ['haber', 'VASI3S0', 'AUX', 'Subjuntivo pretérito 3ª sing.'],
  'hubiese': ['haber', 'VASI3S0', 'AUX', 'Subjuntivo pretérito 3ª sing.'],
  'habido': ['haber', 'VAP00SM', 'AUX', 'Participio'],

  // TENER
  'tengo': ['tener', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'tienes': ['tener', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  'tiene': ['tener', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'tenemos': ['tener', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'tenéis': ['tener', 'VMIP2P0', 'VERB', 'Presente 2ª plur.'],
  'tienen': ['tener', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'tenía': ['tener', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'tenías': ['tener', 'VMII2S0', 'VERB', 'Pretérito imperfecto 2ª sing.'],
  'teníamos': ['tener', 'VMII1P0', 'VERB', 'Pretérito imperfecto 1ª plur.'],
  'tenían': ['tener', 'VMII3P0', 'VERB', 'Pretérito imperfecto 3ª plur.'],
  'tuve': ['tener', 'VMIS1S0', 'VERB', 'Pretérito perf. simple 1ª sing.'],
  'tuviste': ['tener', 'VMIS2S0', 'VERB', 'Pretérito perf. simple 2ª sing.'],
  'tuvo': ['tener', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'tuvimos': ['tener', 'VMIS1P0', 'VERB', 'Pretérito perf. simple 1ª plur.'],
  'tuvieron': ['tener', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'tendré': ['tener', 'VMIF1S0', 'VERB', 'Futuro 1ª sing.'],
  'tendrá': ['tener', 'VMIF3S0', 'VERB', 'Futuro 3ª sing.'],
  'tendrán': ['tener', 'VMIF3P0', 'VERB', 'Futuro 3ª plur.'],
  'tendría': ['tener', 'VMIC3S0', 'VERB', 'Condicional 3ª sing.'],
  'tenga': ['tener', 'VMSP3S0', 'VERB', 'Subjuntivo presente 3ª sing.'],
  'tengan': ['tener', 'VMSP3P0', 'VERB', 'Subjuntivo presente 3ª plur.'],
  'tuviera': ['tener', 'VMSI3S0', 'VERB', 'Subjuntivo pretérito 3ª sing.'],
  'tenido': ['tener', 'VMP00SM', 'VERB', 'Participio'],
  'teniendo': ['tener', 'VMG0000', 'VERB', 'Gerundio'],

  // HACER
  'hago': ['hacer', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'haces': ['hacer', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  'hace': ['hacer', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'hacemos': ['hacer', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'hacéis': ['hacer', 'VMIP2P0', 'VERB', 'Presente 2ª plur.'],
  'hacen': ['hacer', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'hacía': ['hacer', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'hacían': ['hacer', 'VMII3P0', 'VERB', 'Pretérito imperfecto 3ª plur.'],
  'hice': ['hacer', 'VMIS1S0', 'VERB', 'Pretérito perf. simple 1ª sing.'],
  'hiciste': ['hacer', 'VMIS2S0', 'VERB', 'Pretérito perf. simple 2ª sing.'],
  'hizo': ['hacer', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'hicimos': ['hacer', 'VMIS1P0', 'VERB', 'Pretérito perf. simple 1ª plur.'],
  'hicieron': ['hacer', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'haré': ['hacer', 'VMIF1S0', 'VERB', 'Futuro 1ª sing.'],
  'hará': ['hacer', 'VMIF3S0', 'VERB', 'Futuro 3ª sing.'],
  'harán': ['hacer', 'VMIF3P0', 'VERB', 'Futuro 3ª plur.'],
  'haría': ['hacer', 'VMIC3S0', 'VERB', 'Condicional 3ª sing.'],
  'haga': ['hacer', 'VMSP3S0', 'VERB', 'Subjuntivo presente 3ª sing.'],
  'hagan': ['hacer', 'VMSP3P0', 'VERB', 'Subjuntivo presente 3ª plur.'],
  'hecho': ['hacer', 'VMP00SM', 'VERB', 'Participio'],
  'haciendo': ['hacer', 'VMG0000', 'VERB', 'Gerundio'],

  // IR
  'voy': ['ir', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'vas': ['ir', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  'va': ['ir', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'vamos': ['ir', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'vais': ['ir', 'VMIP2P0', 'VERB', 'Presente 2ª plur.'],
  'van': ['ir', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'iba': ['ir', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'ibas': ['ir', 'VMII2S0', 'VERB', 'Pretérito imperfecto 2ª sing.'],
  'íbamos': ['ir', 'VMII1P0', 'VERB', 'Pretérito imperfecto 1ª plur.'],
  'iban': ['ir', 'VMII3P0', 'VERB', 'Pretérito imperfecto 3ª plur.'],
  'iré': ['ir', 'VMIF1S0', 'VERB', 'Futuro 1ª sing.'],
  'irá': ['ir', 'VMIF3S0', 'VERB', 'Futuro 3ª sing.'],
  'irán': ['ir', 'VMIF3P0', 'VERB', 'Futuro 3ª plur.'],
  'iría': ['ir', 'VMIC3S0', 'VERB', 'Condicional 3ª sing.'],
  'vaya': ['ir', 'VMSP3S0', 'VERB', 'Subjuntivo presente 3ª sing.'],
  'vayan': ['ir', 'VMSP3P0', 'VERB', 'Subjuntivo presente 3ª plur.'],
  'ido': ['ir', 'VMP00SM', 'VERB', 'Participio'],
  'yendo': ['ir', 'VMG0000', 'VERB', 'Gerundio'],

  // PODER
  'puedo': ['poder', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'puedes': ['poder', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  'puede': ['poder', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'podemos': ['poder', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'podéis': ['poder', 'VMIP2P0', 'VERB', 'Presente 2ª plur.'],
  'pueden': ['poder', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'podía': ['poder', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'podían': ['poder', 'VMII3P0', 'VERB', 'Pretérito imperfecto 3ª plur.'],
  'pude': ['poder', 'VMIS1S0', 'VERB', 'Pretérito perf. simple 1ª sing.'],
  'pudo': ['poder', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'pudimos': ['poder', 'VMIS1P0', 'VERB', 'Pretérito perf. simple 1ª plur.'],
  'pudieron': ['poder', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'podrá': ['poder', 'VMIF3S0', 'VERB', 'Futuro 3ª sing.'],
  'podrán': ['poder', 'VMIF3P0', 'VERB', 'Futuro 3ª plur.'],
  'podría': ['poder', 'VMIC3S0', 'VERB', 'Condicional 3ª sing.'],
  'podrían': ['poder', 'VMIC3P0', 'VERB', 'Condicional 3ª plur.'],
  'pueda': ['poder', 'VMSP3S0', 'VERB', 'Subjuntivo presente 3ª sing.'],
  'puedan': ['poder', 'VMSP3P0', 'VERB', 'Subjuntivo presente 3ª plur.'],
  'pudiera': ['poder', 'VMSI3S0', 'VERB', 'Subjuntivo pretérito 3ª sing.'],
  'podido': ['poder', 'VMP00SM', 'VERB', 'Participio'],
  'pudiendo': ['poder', 'VMG0000', 'VERB', 'Gerundio'],

  // DECIR
  'digo': ['decir', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'dices': ['decir', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  'dice': ['decir', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'decimos': ['decir', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'decís': ['decir', 'VMIP2P0', 'VERB', 'Presente 2ª plur.'],
  'dicen': ['decir', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'decía': ['decir', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'decían': ['decir', 'VMII3P0', 'VERB', 'Pretérito imperfecto 3ª plur.'],
  'dije': ['decir', 'VMIS1S0', 'VERB', 'Pretérito perf. simple 1ª sing.'],
  'dijiste': ['decir', 'VMIS2S0', 'VERB', 'Pretérito perf. simple 2ª sing.'],
  'dijo': ['decir', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'dijimos': ['decir', 'VMIS1P0', 'VERB', 'Pretérito perf. simple 1ª plur.'],
  'dijeron': ['decir', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'diré': ['decir', 'VMIF1S0', 'VERB', 'Futuro 1ª sing.'],
  'dirá': ['decir', 'VMIF3S0', 'VERB', 'Futuro 3ª sing.'],
  'dirán': ['decir', 'VMIF3P0', 'VERB', 'Futuro 3ª plur.'],
  'diría': ['decir', 'VMIC3S0', 'VERB', 'Condicional 3ª sing.'],
  'diga': ['decir', 'VMSP3S0', 'VERB', 'Subjuntivo presente 3ª sing.'],
  'digan': ['decir', 'VMSP3P0', 'VERB', 'Subjuntivo presente 3ª plur.'],
  'dicho': ['decir', 'VMP00SM', 'VERB', 'Participio'],
  'diciendo': ['decir', 'VMG0000', 'VERB', 'Gerundio'],

  // QUERER
  'quiero': ['querer', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'quieres': ['querer', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  'quiere': ['querer', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'queremos': ['querer', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'quieren': ['querer', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'quería': ['querer', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'quise': ['querer', 'VMIS1S0', 'VERB', 'Pretérito perf. simple 1ª sing.'],
  'quiso': ['querer', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'quisieron': ['querer', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'querrá': ['querer', 'VMIF3S0', 'VERB', 'Futuro 3ª sing.'],
  'querría': ['querer', 'VMIC3S0', 'VERB', 'Condicional 3ª sing.'],
  'quiera': ['querer', 'VMSP3S0', 'VERB', 'Subjuntivo presente 3ª sing.'],
  'querido': ['querer', 'VMP00SM', 'VERB', 'Participio'],

  // SABER
  'sé': ['saber', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'sabes': ['saber', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  'sabe': ['saber', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'sabemos': ['saber', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'saben': ['saber', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'sabía': ['saber', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'supe': ['saber', 'VMIS1S0', 'VERB', 'Pretérito perf. simple 1ª sing.'],
  'supo': ['saber', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'supieron': ['saber', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'sabrá': ['saber', 'VMIF3S0', 'VERB', 'Futuro 3ª sing.'],
  'sabido': ['saber', 'VMP00SM', 'VERB', 'Participio'],

  // DAR
  'doy': ['dar', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'das': ['dar', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  'da': ['dar', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'damos': ['dar', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'dan': ['dar', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'daba': ['dar', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'di': ['dar', 'VMIS1S0', 'VERB', 'Pretérito perf. simple 1ª sing.'],
  'dio': ['dar', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'dimos': ['dar', 'VMIS1P0', 'VERB', 'Pretérito perf. simple 1ª plur.'],
  'dieron': ['dar', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'dará': ['dar', 'VMIF3S0', 'VERB', 'Futuro 3ª sing.'],
  'dado': ['dar', 'VMP00SM', 'VERB', 'Participio'],

  // VER
  'veo': ['ver', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'ves': ['ver', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  've': ['ver', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'vemos': ['ver', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'ven': ['ver', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'veía': ['ver', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'vi': ['ver', 'VMIS1S0', 'VERB', 'Pretérito perf. simple 1ª sing.'],
  'vio': ['ver', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'vimos': ['ver', 'VMIS1P0', 'VERB', 'Pretérito perf. simple 1ª plur.'],
  'vieron': ['ver', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'verá': ['ver', 'VMIF3S0', 'VERB', 'Futuro 3ª sing.'],
  'visto': ['ver', 'VMP00SM', 'VERB', 'Participio'],
  'viendo': ['ver', 'VMG0000', 'VERB', 'Gerundio'],

  // DORMIR (vocal alternante)
  'duermo': ['dormir', 'VMIP1S0', 'VERB', 'Presente 1ª sing.'],
  'duermes': ['dormir', 'VMIP2S0', 'VERB', 'Presente 2ª sing.'],
  'duerme': ['dormir', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'dormimos': ['dormir', 'VMIP1P0', 'VERB', 'Presente 1ª plur.'],
  'duermen': ['dormir', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'dormía': ['dormir', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'durmió': ['dormir', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'durmieron': ['dormir', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'durmiendo': ['dormir', 'VMG0000', 'VERB', 'Gerundio'],
  'dormido': ['dormir', 'VMP00SM', 'VERB', 'Participio'],

  // SALTAR, CORRER, LEER, ESCRIBIR (Verbos frecuentes)
  'salta': ['saltar', 'VMIP3S0', 'VERB', 'Presente 3ª sing.'],
  'saltan': ['saltar', 'VMIP3P0', 'VERB', 'Presente 3ª plur.'],
  'saltó': ['saltar', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'saltaba': ['saltar', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'saltando': ['saltar', 'VMG0000', 'VERB', 'Gerundio'],
  'saltado': ['saltar', 'VMP00SM', 'VERB', 'Participio'],

  'leía': ['leer', 'VMII3S0', 'VERB', 'Pretérito imperfecto 3ª sing.'],
  'leían': ['leer', 'VMII3P0', 'VERB', 'Pretérito imperfecto 3ª plur.'],
  'leyó': ['leer', 'VMIS3S0', 'VERB', 'Pretérito perf. simple 3ª sing.'],
  'leyeron': ['leer', 'VMIS3P0', 'VERB', 'Pretérito perf. simple 3ª plur.'],
  'leyendo': ['leer', 'VMG0000', 'VERB', 'Gerundio'],
  'leído': ['leer', 'VMP00SM', 'VERB', 'Participio'],

  // Irregular Plurals & Forms
  'luces': ['luz', 'NCFP000', 'NOUN', 'Femenino plural'],
  'cruces': ['cruz', 'NCFP000', 'NOUN', 'Femenino plural'],
  'peces': ['pez', 'NCMP000', 'NOUN', 'Masculino plural'],
  'veces': ['vez', 'NCFP000', 'NOUN', 'Femenino plural'],
  'voces': ['voz', 'NCFP000', 'NOUN', 'Femenino plural'],
  'narices': ['nariz', 'NCFP000', 'NOUN', 'Femenino plural'],
  'leyes': ['ley', 'NCFP000', 'NOUN', 'Femenino plural'],
  'reyes': ['rey', 'NCMP000', 'NOUN', 'Masculino plural'],
  'bueyes': ['buey', 'NCMP000', 'NOUN', 'Masculino plural'],
  'ciudades': ['ciudad', 'NCFP000', 'NOUN', 'Femenino plural'],
  'actrices': ['actriz', 'NCFP000', 'NOUN', 'Femenino plural'],
  'hombres': ['hombre', 'NCMP000', 'NOUN', 'Masculino plural'],
  'mujeres': ['mujer', 'NCFP000', 'NOUN', 'Femenino plural'],
  'árboles': ['árbol', 'NCMP000', 'NOUN', 'Masculino plural'],
  'jóvenes': ['joven', 'NCCP000', 'NOUN', 'Común plural'],

  // Adjetivos irregulares
  'mejores': ['mejor', 'AQ0CP0', 'ADJ', 'Común plural'],
  'peores': ['peor', 'AQ0CP0', 'ADJ', 'Común plural'],
  'mayores': ['mayor', 'AQ0CP0', 'ADJ', 'Común plural'],
  'menores': ['menor', 'AQ0CP0', 'ADJ', 'Común plural'],
  'grandes': ['grande', 'AQ0CP0', 'ADJ', 'Común plural'],
  'difíciles': ['difícil', 'AQ0CP0', 'ADJ', 'Común plural'],
  'fáciles': ['fácil', 'AQ0CP0', 'ADJ', 'Común plural'],
  'útiles': ['útil', 'AQ0CP0', 'ADJ', 'Común plural'],
  'veloces': ['veloz', 'AQ0CP0', 'ADJ', 'Común plural'],
  'felices': ['feliz', 'AQ0CP0', 'ADJ', 'Común plural'],
  'capaces': ['capaz', 'AQ0CP0', 'ADJ', 'Común plural'],

  // Determinantes y contracciones
  'al': ['a + el', 'SPCMS', 'ADP', 'Contracción prep. + art.'],
  'del': ['de + el', 'SPCMS', 'ADP', 'Contracción prep. + art.']
};

/**
 * Common Spanish Word Lexicon (nouns, adjectives, adverbs)
 */
const SPANISH_LEXICON = {
  // Artículos y Determinantes
  'el': ['el', 'DA0MS0', 'DET', 'Artículo determinado masc. sing.'],
  'la': ['el', 'DA0FS0', 'DET', 'Artículo determinado fem. sing.'],
  'los': ['el', 'DA0MP0', 'DET', 'Artículo determinado masc. plur.'],
  'las': ['el', 'DA0FP0', 'DET', 'Artículo determinado fem. plur.'],
  'lo': ['el', 'DA0NS0', 'DET', 'Artículo determinado neutro sing.'],
  'un': ['uno', 'DI0MS0', 'DET', 'Artículo indefinido masc. sing.'],
  'una': ['uno', 'DI0FS0', 'DET', 'Artículo indefinido fem. sing.'],
  'unos': ['uno', 'DI0MP0', 'DET', 'Artículo indefinido masc. plur.'],
  'unas': ['uno', 'DI0FP0', 'DET', 'Artículo indefinido fem. plur.'],
  'este': ['este', 'DD0MS0', 'DET', 'Demostrativo masc. sing.'],
  'esta': ['este', 'DD0FS0', 'DET', 'Demostrativo fem. sing.'],
  'estos': ['este', 'DD0MP0', 'DET', 'Demostrativo masc. plur.'],
  'estas': ['este', 'DD0FP0', 'DET', 'Demostrativo fem. plur.'],
  'ese': ['ese', 'DD0MS0', 'DET', 'Demostrativo masc. sing.'],
  'esa': ['ese', 'DD0FS0', 'DET', 'Demostrativo fem. sing.'],
  'esos': ['ese', 'DD0MP0', 'DET', 'Demostrativo masc. plur.'],
  'esas': ['ese', 'DD0FP0', 'DET', 'Demostrativo fem. plur.'],
  'aquel': ['aquel', 'DD0MS0', 'DET', 'Demostrativo masc. sing.'],
  'aquella': ['aquel', 'DD0FS0', 'DET', 'Demostrativo fem. sing.'],
  'aquellos': ['aquel', 'DD0MP0', 'DET', 'Demostrativo masc. plur.'],
  'aquellas': ['aquel', 'DD0FP0', 'DET', 'Demostrativo fem. plur.'],
  'mi': ['mi', 'DP1CSS', 'DET', 'Posesivo 1ª persona sing.'],
  'mis': ['mi', 'DP1CPS', 'DET', 'Posesivo 1ª persona plur.'],
  'tu': ['tu', 'DP2CSS', 'DET', 'Posesivo 2ª persona sing.'],
  'tus': ['tu', 'DP2CPS', 'DET', 'Posesivo 2ª persona plur.'],
  'su': ['su', 'DP3CS0', 'DET', 'Posesivo 3ª persona sing.'],
  'sus': ['su', 'DP3CP0', 'DET', 'Posesivo 3ª persona plur.'],
  'nuestro': ['nuestro', 'DP1MSP', 'DET', 'Posesivo 1ª persona plur. masc.'],
  'nuestra': ['nuestro', 'DP1FSP', 'DET', 'Posesivo 1ª persona plur. fem.'],
  'nuestros': ['nuestro', 'DP1MPP', 'DET', 'Posesivo 1ª persona plur. masc. plur.'],
  'nuestras': ['nuestro', 'DP1FPP', 'DET', 'Posesivo 1ª persona plur. fem. plur.'],

  // Preposiciones
  'a': ['a', 'SPS00', 'ADP', 'Preposición simple'],
  'ante': ['ante', 'SPS00', 'ADP', 'Preposición simple'],
  'bajo': ['bajo', 'SPS00', 'ADP', 'Preposición simple'],
  'cabe': ['cabe', 'SPS00', 'ADP', 'Preposición simple'],
  'con': ['con', 'SPS00', 'ADP', 'Preposición simple'],
  'contra': ['contra', 'SPS00', 'ADP', 'Preposición simple'],
  'de': ['de', 'SPS00', 'ADP', 'Preposición simple'],
  'desde': ['desde', 'SPS00', 'ADP', 'Preposición simple'],
  'durante': ['durante', 'SPS00', 'ADP', 'Preposición simple'],
  'en': ['en', 'SPS00', 'ADP', 'Preposición simple'],
  'entre': ['entre', 'SPS00', 'ADP', 'Preposición simple'],
  'hacia': ['hacia', 'SPS00', 'ADP', 'Preposición simple'],
  'hasta': ['hasta', 'SPS00', 'ADP', 'Preposición simple'],
  'mediante': ['mediante', 'SPS00', 'ADP', 'Preposición simple'],
  'para': ['para', 'SPS00', 'ADP', 'Preposición simple'],
  'por': ['por', 'SPS00', 'ADP', 'Preposición simple'],
  'según': ['según', 'SPS00', 'ADP', 'Preposición simple'],
  'sin': ['sin', 'SPS00', 'ADP', 'Preposición simple'],
  'so': ['so', 'SPS00', 'ADP', 'Preposición simple'],
  'sobre': ['sobre', 'SPS00', 'ADP', 'Preposición simple'],
  'tras': ['tras', 'SPS00', 'ADP', 'Preposición simple'],
  'versus': ['versus', 'SPS00', 'ADP', 'Preposición simple'],
  'vía': ['vía', 'SPS00', 'ADP', 'Preposición simple'],
  'al': ['a + el', 'SPCMS', 'ADP', 'Preposición contracta a + el'],
  'del': ['de + el', 'SPCMS', 'ADP', 'Preposición contracta de + el'],

  // Conjunciones
  'y': ['y', 'CC', 'CCONJ', 'Conjunción coordinante copulativa'],
  'e': ['e', 'CC', 'CCONJ', 'Conjunción coordinante copulativa'],
  'ni': ['ni', 'CC', 'CCONJ', 'Conjunción coordinante copulativa'],
  'o': ['o', 'CC', 'CCONJ', 'Conjunción coordinante disyuntiva'],
  'u': ['u', 'CC', 'CCONJ', 'Conjunción coordinante disyuntiva'],
  'pero': ['pero', 'CC', 'CCONJ', 'Conjunción coordinante adversativa'],
  'mas': ['mas', 'CC', 'CCONJ', 'Conjunción coordinante adversativa'],
  'sino': ['sino', 'CC', 'CCONJ', 'Conjunción coordinante adversativa'],
  'que': ['que', 'CS', 'SCONJ', 'Conjunción subordinante completiva'],
  'si': ['si', 'CS', 'SCONJ', 'Conjunción subordinante condicional'],
  'porque': ['porque', 'CS', 'SCONJ', 'Conjunción subordinante causal'],
  'pues': ['pues', 'CS', 'SCONJ', 'Conjunción subordinante causal'],
  'mientras': ['mientras', 'CS', 'SCONJ', 'Conjunción subordinante temporal'],
  'cuando': ['cuando', 'CS', 'SCONJ', 'Conjunción subordinante temporal'],
  'donde': ['donde', 'CS', 'SCONJ', 'Conjunción subordinante locativa'],
  'como': ['como', 'CS', 'SCONJ', 'Conjunción subordinante modal'],
  'aunque': ['aunque', 'CS', 'SCONJ', 'Conjunción subordinante concesiva'],

  // Pronombres
  'yo': ['yo', 'PP1CSN0', 'PRON', 'Pronombre personal 1ª sing. nominativo'],
  'tú': ['tú', 'PP2CSN0', 'PRON', 'Pronombre personal 2ª sing. nominativo'],
  'él': ['él', 'PP3MS00', 'PRON', 'Pronombre personal 3ª masc. sing.'],
  'ella': ['él', 'PP3FS00', 'PRON', 'Pronombre personal 3ª fem. sing.'],
  'ello': ['él', 'PP3NS00', 'PRON', 'Pronombre personal 3ª neutro sing.'],
  'nosotros': ['yo', 'PP1MP00', 'PRON', 'Pronombre personal 1ª masc. plur.'],
  'nosotras': ['yo', 'PP1FP00', 'PRON', 'Pronombre personal 1ª fem. plur.'],
  'vosotros': ['tú', 'PP2MP00', 'PRON', 'Pronombre personal 2ª masc. plur.'],
  'vosotras': ['tú', 'PP2FP00', 'PRON', 'Pronombre personal 2ª fem. plur.'],
  'ellos': ['él', 'PP3MP00', 'PRON', 'Pronombre personal 3ª masc. plur.'],
  'ellas': ['él', 'PP3FP00', 'PRON', 'Pronombre personal 3ª fem. plur.'],
  'usted': ['usted', 'PP2CS00', 'PRON', 'Pronombre personal 2ª cortesía sing.'],
  'ustedes': ['usted', 'PP2CP00', 'PRON', 'Pronombre personal 2ª cortesía plur.'],
  'me': ['yo', 'PP1CS00', 'PRON', 'Pronombre personal clítico 1ª sing.'],
  'te': ['tú', 'PP2CS00', 'PRON', 'Pronombre personal clítico 2ª sing.'],
  'se': ['él', 'PP3CN00', 'PRON', 'Pronombre personal reflexivo/clítico 3ª'],
  'nos': ['yo', 'PP1CP00', 'PRON', 'Pronombre personal clítico 1ª plur.'],
  'os': ['tú', 'PP2CP00', 'PRON', 'Pronombre personal clítico 2ª plur.'],
  'le': ['él', 'PP3CSD0', 'PRON', 'Pronombre personal dativo 3ª sing.'],
  'les': ['él', 'PP3CPD0', 'PRON', 'Pronombre personal dativo 3ª plur.'],
  'mí': ['yo', 'PP1CSO0', 'PRON', 'Pronombre personal preposicional 1ª sing.'],
  'ti': ['tú', 'PP2CSO0', 'PRON', 'Pronombre personal preposicional 2ª sing.'],
  'sí': ['él', 'PP3CNO0', 'PRON', 'Pronombre personal preposicional 3ª'],
  'esto': ['este', 'PD0NS000', 'PRON', 'Pronombre demostrativo neutro'],
  'eso': ['ese', 'PD0NS000', 'PRON', 'Pronombre demostrativo neutro'],
  'aquello': ['aquel', 'PD0NS000', 'PRON', 'Pronombre demostrativo neutro'],
  'cuyo': ['cuyo', 'PR0MS000', 'PRON', 'Relativo posesivo masc. sing.'],
  'cuya': ['cuyo', 'PR0FS000', 'PRON', 'Relativo posesivo fem. sing.'],
  'cuyos': ['cuyo', 'PR0MP000', 'PRON', 'Relativo posesivo masc. plur.'],
  'cuyas': ['cuyo', 'PR0FP000', 'PRON', 'Relativo posesivo fem. plur.'],
  'quien': ['quien', 'PR0CS000', 'PRON', 'Pronombre relativo sing.'],
  'quienes': ['quien', 'PR0CP000', 'PRON', 'Pronombre relativo plur.'],
  'alguien': ['alguien', 'PI0CS000', 'PRON', 'Pronombre indefinido'],
  'nadie': ['nadie', 'PI0CS000', 'PRON', 'Pronombre indefinido'],
  'algo': ['algo', 'PI0CS000', 'PRON', 'Pronombre indefinido'],
  'nada': ['nada', 'PI0CS000', 'PRON', 'Pronombre indefinido'],

  // Adverbios esenciales
  'no': ['no', 'RN', 'ADV', 'Adverbio de negación'],
  'sí': ['sí', 'RG', 'ADV', 'Adverbio de afirmación'],
  'jamás': ['jamás', 'RN', 'ADV', 'Adverbio de negación'],
  'nunca': ['nunca', 'RN', 'ADV', 'Adverbio de negación'],
  'más': ['más', 'RG', 'ADV', 'Adverbio de cantidad'],
  'menos': ['menos', 'RG', 'ADV', 'Adverbio de cantidad'],
  'muy': ['muy', 'RG', 'ADV', 'Adverbio de grado / intensidad'],
  'mucho': ['mucho', 'RG', 'ADV', 'Adverbio de cantidad'],
  'poco': ['poco', 'RG', 'ADV', 'Adverbio de cantidad'],
  'ya': ['ya', 'RG', 'ADV', 'Adverbio de tiempo'],
  'bien': ['bien', 'RG', 'ADV', 'Adverbio de modo'],
  'mal': ['mal', 'RG', 'ADV', 'Adverbio de modo'],
  'tan': ['tanto', 'RG', 'ADV', 'Adverbio de grado'],
  'tanto': ['tanto', 'RG', 'ADV', 'Adverbio de cantidad'],
  'también': ['también', 'RG', 'ADV', 'Adverbio de afirmación / adición'],
  'tampoco': ['tampoco', 'RN', 'ADV', 'Adverbio de negación'],
  'además': ['además', 'RG', 'ADV', 'Adverbio de adición'],
  'siempre': ['siempre', 'RG', 'ADV', 'Adverbio de tiempo'],
  'casi': ['casi', 'RG', 'ADV', 'Adverbio de grado'],
  'apenas': ['apenas', 'RG', 'ADV', 'Adverbio de modo'],
  'ahora': ['ahora', 'RG', 'ADV', 'Adverbio de tiempo'],
  'entonces': ['entonces', 'RG', 'ADV', 'Adverbio de tiempo'],

  // Sustantivos
  'perro': ['perro', 'NCMS000', 'NOUN'],
  'perros': ['perro', 'NCMP000', 'NOUN'],
  'perra': ['perro', 'NCFS000', 'NOUN'],
  'perras': ['perro', 'NCFP000', 'NOUN'],
  'gato': ['gato', 'NCMS000', 'NOUN'],
  'gatos': ['gato', 'NCMP000', 'NOUN'],
  'gata': ['gato', 'NCFS000', 'NOUN'],
  'zorro': ['zorro', 'NCMS000', 'NOUN'],
  'zorros': ['zorro', 'NCMP000', 'NOUN'],
  'parque': ['parque', 'NCMS000', 'NOUN'],
  'parques': ['parque', 'NCMP000', 'NOUN'],
  'niño': ['niño', 'NCMS000', 'NOUN'],
  'niños': ['niño', 'NCMP000', 'NOUN'],
  'niña': ['niño', 'NCFS000', 'NOUN'],
  'niñas': ['niño', 'NCFP000', 'NOUN'],
  'cuento': ['cuento', 'NCMS000', 'NOUN'],
  'cuentos': ['cuento', 'NCMP000', 'NOUN'],
  'lenguaje': ['lenguaje', 'NCMS000', 'NOUN'],
  'procesamiento': ['procesamiento', 'NCMS000', 'NOUN'],
  'herramientas': ['herramienta', 'NCFP000', 'NOUN'],
  'herramienta': ['herramienta', 'NCFS000', 'NOUN'],
  'conjunto': ['conjunto', 'NCMS000', 'NOUN'],
  'lugar': ['lugar', 'NCMS000', 'NOUN'],
  'nombre': ['nombre', 'NCMS000', 'NOUN'],
  'mancha': ['mancha', 'NCFS000', 'NOUN'],
  'día': ['día', 'NCMS000', 'NOUN'],
  'tiempo': ['tiempo', 'NCMS000', 'NOUN'],
  'año': ['año', 'NCMS000', 'NOUN'],
  'vida': ['vida', 'NCFS000', 'NOUN'],
  'mundo': ['mundo', 'NCMS000', 'NOUN'],
  'casa': ['casa', 'NCFS000', 'NOUN'],
  'libro': ['libro', 'NCMS000', 'NOUN'],
  'palabra': ['palabra', 'NCFS000', 'NOUN'],
  'persona': ['persona', 'NCFS000', 'NOUN'],
  'agua': ['agua', 'NCFS000', 'NOUN'],
  'noche': ['noche', 'NCFS000', 'NOUN'],
  'sol': ['sol', 'NCMS000', 'NOUN'],
  'luna': ['luna', 'NCFS000', 'NOUN'],
  'cielo': ['cielo', 'NCMS000', 'NOUN'],
  'tierra': ['tierra', 'NCFS000', 'NOUN'],
  'mar': ['mar', 'NCMS000', 'NOUN'],
  'camino': ['camino', 'NCMS000', 'NOUN'],
  'amigo': ['amigo', 'NCMS000', 'NOUN'],
  'amigos': ['amigo', 'NCMP000', 'NOUN'],
  'puerta': ['puerta', 'NCFS000', 'NOUN'],
  'ventana': ['ventana', 'NCFS000', 'NOUN'],
  'trabajo': ['trabajo', 'NCMS000', 'NOUN'],
  'estudiante': ['estudiante', 'NCCS000', 'NOUN'],
  'profesor': ['profesor', 'NCMS000', 'NOUN'],
  'computadora': ['computadora', 'NCFS000', 'NOUN'],
  'ordenador': ['ordenador', 'NCMS000', 'NOUN'],
  'datos': ['dato', 'NCMP000', 'NOUN'],
  'texto': ['texto', 'NCMS000', 'NOUN'],
  'frase': ['frase', 'NCFS000', 'NOUN'],
  'frases': ['frase', 'NCFP000', 'NOUN'],
  'token': ['token', 'NCMS000', 'NOUN'],
  'tokens': ['token', 'NCMP000', 'NOUN'],

  // Adjetivos
  'veloz': ['veloz', 'AQ0CS0', 'ADJ'],
  'marrón': ['marrón', 'AQ0CS0', 'ADJ'],
  'perezoso': ['perezoso', 'AQ0MS0', 'ADJ'],
  'perezosa': ['perezoso', 'AQ0FS0', 'ADJ'],
  'perezosos': ['perezoso', 'AQ0MP0', 'ADJ'],
  'negro': ['negro', 'AQ0MS0', 'ADJ'],
  'negra': ['negro', 'AQ0FS0', 'ADJ'],
  'negros': ['negro', 'AQ0MP0', 'ADJ'],
  'blanco': ['blanco', 'AQ0MS0', 'ADJ'],
  'interesante': ['interesante', 'AQ0CS0', 'ADJ'],
  'interesantes': ['interesante', 'AQ0CP0', 'ADJ'],
  'natural': ['natural', 'AQ0CS0', 'ADJ'],
  'desarrollado': ['desarrollar', 'AQ0MSP', 'ADJ'],
  'desarrollada': ['desarrollar', 'AQ0FSP', 'ADJ'],
  'bueno': ['bueno', 'AQ0MS0', 'ADJ'],
  'buen': ['bueno', 'AQ0MS0', 'ADJ'],
  'buena': ['bueno', 'AQ0FS0', 'ADJ'],
  'buenos': ['bueno', 'AQ0MP0', 'ADJ'],
  'malo': ['malo', 'AQ0MS0', 'ADJ'],
  'mala': ['malo', 'AQ0FS0', 'ADJ'],
  'grande': ['grande', 'AQ0CS0', 'ADJ'],
  'gran': ['grande', 'AQ0CS0', 'ADJ'],
  'pequeño': ['pequeño', 'AQ0MS0', 'ADJ'],
  'pequeña': ['pequeño', 'AQ0FS0', 'ADJ'],
  'nuevo': ['nuevo', 'AQ0MS0', 'ADJ'],
  'nueva': ['nuevo', 'AQ0FS0', 'ADJ'],
  'viejo': ['viejo', 'AQ0MS0', 'ADJ'],
  'primero': ['primero', 'AO0MS0', 'ADJ'],
  'último': ['último', 'AO0MS0', 'ADJ'],
  'alto': ['alto', 'AQ0MS0', 'ADJ'],
  'alta': ['alto', 'AQ0FS0', 'ADJ'],
  'claro': ['claro', 'AQ0MS0', 'ADJ'],
  'clara': ['claro', 'AQ0FS0', 'ADJ'],
  'fuerte': ['fuerte', 'AQ0CS0', 'ADJ'],

  // Adverbios
  'plácidamente': ['plácido', 'RG', 'ADV'],
  'rápidamente': ['rápido', 'RG', 'ADV'],
  'lentamente': ['lento', 'RG', 'ADV'],
  'fácilmente': ['fácil', 'RG', 'ADV'],
  'difícilmente': ['difícil', 'RG', 'ADV'],
  'constantemente': ['constante', 'RG', 'ADV'],
  'claramente': ['claro', 'RG', 'ADV'],
  'básicamente': ['básico', 'RG', 'ADV'],
  'normalmente': ['normal', 'RG', 'ADV'],
  'actualmente': ['actual', 'RG', 'ADV'],
  'aquí': ['aquí', 'RG', 'ADV'],
  'allí': ['allí', 'RG', 'ADV'],
  'ayer': ['ayer', 'RG', 'ADV'],
  'hoy': ['hoy', 'RG', 'ADV'],
  'mañana': ['mañana', 'RG', 'ADV']
};

/**
 * Pre-set showcase text samples for user demonstration
 */
const PRESET_TEXTS = {
  zorro: "El veloz zorro marrón salta sobre el perro perezoso en el parque. El gato negro dormía plácidamente mientras los niños leían cuentos interesantes.",
  freeling: "FreeLing es un conjunto de herramientas de procesamiento de lenguaje natural desarrollado en la UPC. Permite tokenizar, lematizar y etiquetar textos en múltiples idiomas.",
  quijote: "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero.",
  tecnologia: "Los ingenieros diseñaron algoritmos avanzados de inteligencia artificial. Estas tecnologías procesan millones de palabras por segundo con gran precisión.",
  ingles: "The quick brown fox jumps over the lazy dog. Natural Language Processing is essential for modern artificial intelligence systems."
};


  // --- 2. NLP ENGINE ---
/**
 * NLP Pipeline Engine (FreeLing Replication)
 * Stages:
 *  1. Raw Data
 *  2. Segmentación de Frases
 *  3. Tokenización (1 token = 1 palabra)
 *  4. Lematización
 *  5. POS Tagging (EAGLES & UPOS)
 *  6. Quitar Stopwords
 */



class NLPEngine {
  constructor(options = {}) {
    this.language = options.language || 'es';
    this.customStopwords = new Set();
  }

  setLanguage(lang) {
    this.language = lang === 'en' ? 'en' : 'es';
  }

  /**
   * STAGE 1: Process Raw Data & Collect stats
   */
  processRawData(rawText) {
    if (!rawText || typeof rawText !== 'string') {
      return {
        text: '',
        length: 0,
        lineCount: 0,
        characterCount: 0,
        nonSpaceCount: 0
      };
    }

    return {
      text: rawText,
      length: rawText.length,
      lineCount: (rawText.match(/\n/g) || []).length + 1,
      characterCount: rawText.length,
      nonSpaceCount: rawText.replace(/\s+/g, '').length
    };
  }

  /**
   * STAGE 2: Segmentación de Frases (Sentence Segmentation)
   * Splits text into sentence boundaries, avoiding abbreviations and numbers.
   */
  segmentSentences(rawText) {
    if (!rawText || !rawText.trim()) return [];

    const text = rawText.trim();
    const sentences = [];
    let currentSentence = '';
    let startChar = 0;
    let i = 0;

    while (i < text.length) {
      const char = text[i];
      currentSentence += char;

      // Check if we hit a sentence terminator: . ! ? or newlines
      const isPunctuationTerminator = char === '.' || char === '!' || char === '?' || char === '…';
      const isNewline = char === '\n';

      if (isPunctuationTerminator || isNewline) {
        // Look ahead for trailing quotes/parentheses like ." or !)
        let endIdx = i;
        while (endIdx + 1 < text.length && /["'»\)\}]/.test(text[endIdx + 1])) {
          endIdx++;
          currentSentence += text[endIdx];
        }

        // Check if period is part of an abbreviation (e.g. "Dr.", "Sr.", "etc.")
        let isAbbrev = false;
        if (char === '.') {
          // Look at the last word in currentSentence before the dot
          const lastWordMatch = currentSentence.slice(0, -1).match(/([a-záéíóúñ]+)$/i);
          if (lastWordMatch) {
            const lastWord = lastWordMatch[1].toLowerCase();
            if (SPANISH_ABBREVIATIONS.has(lastWord)) {
              isAbbrev = true;
            }
          }
          // Number decimal (e.g. 3.14)
          if (i > 0 && i + 1 < text.length && /\d/.test(text[i - 1]) && /\d/.test(text[i + 1])) {
            isAbbrev = true;
          }
        }

        // Check ellipsis
        if (char === '.' && i + 1 < text.length && text[i + 1] === '.') {
          i = endIdx + 1;
          continue;
        }

        if (!isAbbrev) {
          // If followed by space or end of string, finish this sentence
          const isAtEnd = endIdx + 1 >= text.length;
          const followedBySpace = isAtEnd || /\s/.test(text[endIdx + 1]);

          if (isAtEnd || followedBySpace || isNewline) {
            const cleanSentence = currentSentence.trim();
            if (cleanSentence.length > 0) {
              sentences.push({
                id: `S${sentences.length + 1}`,
                index: sentences.length,
                text: cleanSentence,
                startOffset: startChar,
                endOffset: startChar + currentSentence.length,
                delimiter: char
              });
            }
            startChar += currentSentence.length;
            currentSentence = '';
            i = endIdx + 1;
            continue;
          }
        }
      }

      i++;
    }

    // Remainder text
    if (currentSentence.trim().length > 0) {
      sentences.push({
        id: `S${sentences.length + 1}`,
        index: sentences.length,
        text: currentSentence.trim(),
        startOffset: startChar,
        endOffset: text.length,
        delimiter: 'EOF'
      });
    }

    return sentences;
  }

  /**
   * STAGE 3: Tokenización (1 Token = 1 Palabra)
   * Converts sentences into clean word tokens.
   * Explicit requirement: "que un token equivalga a una palabra"
   */
  tokenizeWords(sentences) {
    const tokens = [];
    let globalIndex = 0;

    sentences.forEach((sentence) => {
      // Regex that matches unicode Spanish words with accents, tildes, hyphens inside words
      // Discards surrounding punctuation so tokens are strictly words!
      const wordRegex = /[a-záéíóúñüÁÉÍÓÚÑÜ0-9]+(?:-[a-záéíóúñüÁÉÍÓÚÑÜ0-9]+)*/gi;
      let match;
      let indexInSentence = 0;

      while ((match = wordRegex.exec(sentence.text)) !== null) {
        const rawWord = match[0];
        const tokenStart = sentence.startOffset + match.index;
        const tokenEnd = tokenStart + rawWord.length;

        tokens.push({
          id: `T${globalIndex + 1}`,
          globalIndex: globalIndex,
          sentenceId: sentence.id,
          indexInSentence: indexInSentence,
          word: rawWord,
          cleanWord: rawWord.trim(),
          lower: rawWord.toLowerCase(),
          isCapitalized: /^[A-ZÁÉÍÓÚÑ]/.test(rawWord),
          isAllUpper: rawWord.length > 1 && rawWord === rawWord.toUpperCase(),
          isNumeric: /^\d+$/.test(rawWord),
          startOffset: tokenStart,
          endOffset: tokenEnd
        });

        indexInSentence++;
        globalIndex++;
      }
    });

    return tokens;
  }

  /**
   * STAGE 4: Lematización (Lemmatization)
   * Finds the canonical base form (lemma) of each word token.
   */
  lemmatizeToken(token) {
    const word = token.lower;

    // 1. Check numbers
    if (token.isNumeric) {
      return {
        lemma: word,
        ruleApplied: 'Numeral invariante',
        tagHint: 'Z'
      };
    }

    // 2. Direct irregular lookup
    if (SPANISH_IRREGULARS[word]) {
      const [lemma, tag, upos, desc] = SPANISH_IRREGULARS[word];
      return {
        lemma,
        ruleApplied: `Diccionario irregular: ${desc}`,
        tagHint: tag,
        uposHint: upos
      };
    }

    // 3. Direct general lexicon lookup
    if (SPANISH_LEXICON[word]) {
      const [lemma, tag, upos] = SPANISH_LEXICON[word];
      return {
        lemma,
        ruleApplied: 'Léxico directo (lema base)',
        tagHint: tag,
        uposHint: upos
      };
    }

    // 4. Adverbs ending in -mente -> base adjective
    if (word.endsWith('mente') && word.length > 6) {
      const baseStem = word.slice(0, -5);
      return {
        lemma: baseStem,
        ruleApplied: 'Adverbio derivativo (-mente) -> Adjetivo base',
        tagHint: 'RG',
        uposHint: 'ADV'
      };
    }

    // 5. Morphological rule-based Lemmatizer for Spanish Verbs & Nouns
    // Regular verb suffixes for -ar, -er, -ir:
    // Imperfecto: -aba, -ábamos, -aban, -abas
    if (word.endsWith('ábamos')) {
      return { lemma: word.slice(0, -6) + 'ar', ruleApplied: 'Pret. imperfecto (-ábamos) -> -ar', tagHint: 'VMII1P0', uposHint: 'VERB' };
    }
    if (word.endsWith('aban') || word.endsWith('abas') || word.endsWith('aba')) {
      const stem = word.replace(/aba[ns]?$/, '');
      return { lemma: stem + 'ar', ruleApplied: 'Pret. imperfecto (-aba) -> -ar', tagHint: 'VMII3S0', uposHint: 'VERB' };
    }
    // Gerundio: -ando, -iendo
    if (word.endsWith('ando')) {
      return { lemma: word.slice(0, -4) + 'ar', ruleApplied: 'Gerundio (-ando) -> -ar', tagHint: 'VMG0000', uposHint: 'VERB' };
    }
    if (word.endsWith('iendo')) {
      return { lemma: word.slice(0, -5) + 'er', ruleApplied: 'Gerundio (-iendo) -> -er/-ir', tagHint: 'VMG0000', uposHint: 'VERB' };
    }
    // Participio: -ado, -ada, -ados, -adas
    if (/ad[ao]s?$/.test(word) && word.length > 4) {
      return { lemma: word.replace(/ad[ao]s?$/, 'ar'), ruleApplied: 'Participio regular (-ado) -> -ar', tagHint: 'VMP00SM', uposHint: 'VERB' };
    }
    // Participio: -ido, -ida, -idos, -idas
    if (/id[ao]s?$/.test(word) && word.length > 4) {
      return { lemma: word.replace(/id[ao]s?$/, 'ir'), ruleApplied: 'Participio regular (-ido) -> -ir/-er', tagHint: 'VMP00SM', uposHint: 'VERB' };
    }
    // Pretérito perfecto: -aron, -ieron, -aste, -iste, -ió, -ó
    if (word.endsWith('aron') && word.length > 5) {
      return { lemma: word.slice(0, -4) + 'ar', ruleApplied: 'Pret. perf. simple (-aron) -> -ar', tagHint: 'VMIS3P0', uposHint: 'VERB' };
    }
    if (word.endsWith('ieron') && word.length > 6) {
      return { lemma: word.slice(0, -5) + 'er', ruleApplied: 'Pret. perf. simple (-ieron) -> -er', tagHint: 'VMIS3P0', uposHint: 'VERB' };
    }
    if (word.endsWith('ó') && word.length > 3) {
      return { lemma: word.slice(0, -1) + 'ar', ruleApplied: 'Pret. perf. simple (-ó) -> -ar', tagHint: 'VMIS3S0', uposHint: 'VERB' };
    }
    if (word.endsWith('ió') && word.length > 4) {
      return { lemma: word.slice(0, -2) + 'er', ruleApplied: 'Pret. perf. simple (-ió) -> -er', tagHint: 'VMIS3S0', uposHint: 'VERB' };
    }
    // Verbos con pronombres clíticos enclíticos (acordarme, hacerlo, verte, etc.)
    const encliticMatch = word.match(/^([a-záéíóúñ]+(ar|er|ir))(me|te|se|nos|os|le|les|lo|la|los|las)$/i);
    if (encliticMatch && word.length > 5) {
      const infBase = encliticMatch[1];
      const clitic = encliticMatch[3];
      return {
        lemma: infBase,
        ruleApplied: `Verbo infinitivo (${infBase}) + clítico (-${clitic})`,
        tagHint: 'VMN0000',
        uposHint: 'VERB'
      };
    }

    // Futuro: -ará, -arán, -aremos, -erá, -irá
    if (/(ar|er|ir)(á|án|emos)$/.test(word)) {
      const match = word.match(/(ar|er|ir)/);
      const infEnding = match ? match[0] : 'ar';
      return { lemma: word.replace(/(ar|er|ir)(á|án|emos)$/, infEnding), ruleApplied: 'Futuro indicativo -> Infinitivo', tagHint: 'VMIF3S0', uposHint: 'VERB' };
    }

    // Noun / Adjective plural reduction
    // Words ending in -ces (luces -> luz, pez, cruz)
    if (word.endsWith('ces') && word.length > 4) {
      return { lemma: word.slice(0, -3) + 'z', ruleApplied: 'Plural regular (-ces) -> -z', tagHint: 'NCFP000', uposHint: 'NOUN' };
    }
    // Words ending in consonant + es (árboles -> árbol, mujeres -> mujer, canciones -> canción)
    if (word.endsWith('es') && word.length > 4 && !/[aeiouáéíóú]/.test(word.charAt(word.length - 3))) {
      const stem = word.slice(0, -2);
      // Restore accent if needed: canciones -> canción
      if (stem.endsWith('cion')) {
        return { lemma: stem.slice(0, -4) + 'ción', ruleApplied: 'Plural (-es) -> -ción', tagHint: 'NCFS000', uposHint: 'NOUN' };
      }
      return { lemma: stem, ruleApplied: 'Plural (-es) -> Singular consonante', tagHint: 'NCMP000', uposHint: 'NOUN' };
    }
    // Feminine plural -as -> -o (gatas -> gato)
    if (word.endsWith('as') && word.length > 3) {
      return { lemma: word.slice(0, -2) + 'o', ruleApplied: 'Femenino plural (-as) -> Masculino base (-o)', tagHint: 'NCFP000', uposHint: 'NOUN' };
    }
    // Masculine plural -os -> -o (perros -> perro)
    if (word.endsWith('os') && word.length > 3) {
      return { lemma: word.slice(0, -1), ruleApplied: 'Plural regular (-s) -> Singular (-o)', tagHint: 'NCMP000', uposHint: 'NOUN' };
    }
    // Feminine singular -a -> -o (gata -> gato, perra -> perro)
    if (word.endsWith('a') && word.length > 4 && !/^(día|mapa|planeta|problema|sistema|tema|idioma|clima)$/.test(word)) {
      // Possible feminine noun/adjective
      return { lemma: word.slice(0, -1) + 'o', ruleApplied: 'Femenino singular (-a) -> Lema masculino (-o)', tagHint: 'AQ0FS0', uposHint: 'ADJ' };
    }

    // Default: lemma is the lowercase word
    return {
      lemma: word,
      ruleApplied: 'Forma canónica por defecto',
      tagHint: null,
      uposHint: null
    };
  }

  /**
   * STAGE 5: POS Tagging (Part-of-Speech Tagging)
   * Assigns EAGLES and Universal PoS (UPOS) tags with morphological features.
   */
  tagTokenPOS(token, prevToken, nextToken) {
    const word = token.lower;

    const getColorForUPOS = (upos) => {
      switch (upos) {
        case 'NOUN': return '#10b981'; // Emerald
        case 'PROPN': return '#059669'; // Dark emerald
        case 'VERB': return '#3b82f6'; // Blue
        case 'AUX': return '#6366f1'; // Indigo
        case 'ADJ': return '#f59e0b'; // Amber
        case 'ADV': return '#a855f7'; // Purple
        case 'DET': return '#06b6d4'; // Cyan
        case 'PRON': return '#ec4899'; // Pink
        case 'ADP': return '#64748b'; // Slate
        case 'CCONJ':
        case 'SCONJ': return '#eab308'; // Yellow
        case 'NUM': return '#14b8a6'; // Teal
        default: return '#94a3b8';
      }
    };

    // 1. Direct Irregular mapping
    if (SPANISH_IRREGULARS[word]) {
      const [, tag, upos, morph] = SPANISH_IRREGULARS[word];
      const taxonomy = EAGLES_TAXONOMY[tag] || {};
      return {
        tag,
        upos,
        category: taxonomy.cat || upos,
        description: morph || taxonomy.desc || 'Forma irregular en diccionario',
        color: taxonomy.color || getColorForUPOS(upos),
        confidence: 0.98
      };
    }

    // 2. Direct Lexicon mapping (includes nouns, verbs, prepositions, conjunctions, determiners)
    if (SPANISH_LEXICON[word]) {
      const [, tag, upos, desc] = SPANISH_LEXICON[word];
      const taxonomy = EAGLES_TAXONOMY[tag] || {};
      return {
        tag,
        upos,
        category: taxonomy.cat || (upos === 'DET' ? 'Determinante' : (upos === 'ADP' ? 'Preposición' : (upos === 'CCONJ' || upos === 'SCONJ' ? 'Conjunción' : (upos === 'PRON' ? 'Pronombre' : upos)))),
        description: desc || taxonomy.desc || 'Léxico morfológico FreeLing',
        color: taxonomy.color || getColorForUPOS(upos),
        confidence: 0.95
      };
    }

    // 3. Numbers
    if (token.isNumeric) {
      return {
        tag: 'Z',
        upos: 'NUM',
        category: 'Número',
        description: 'Cifra o valor numérico',
        color: EAGLES_TAXONOMY['Z'].color,
        confidence: 1.0
      };
    }

    // 4. Proper Nouns (NP00000)
    // Capitalized and not at the start of sentence
    if (token.isCapitalized && token.indexInSentence > 0) {
      return {
        tag: 'NP00000',
        upos: 'PROPN',
        category: 'Nombre Propio',
        description: 'Entidad nombrada o nombre propio',
        color: EAGLES_TAXONOMY['NP00000'].color,
        confidence: 0.9
      };
    }

    // 5. Contextual Disambiguation
    // If preceded by a determiner (el, la, los, un, una, etc.) -> NOUN or ADJ
    if (prevToken) {
      const prevWord = prevToken.lower;
      const isPrevDet = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'este', 'esta', 'ese', 'su', 'mi', 'tu'].includes(prevWord);
      const isPrevPrep = ['de', 'en', 'con', 'por', 'para', 'sobre', 'sin', 'hacia', 'desde', 'hasta'].includes(prevWord);

      if (isPrevDet) {
        // If next is a known noun or followed by verb, this could be adjective
        if (word.endsWith('oso') || word.endsWith('osa') || word.endsWith('al') || word.endsWith('ble') || word.endsWith('nte')) {
          return {
            tag: word.endsWith('a') ? 'AQ0FS0' : 'AQ0MS0',
            upos: 'ADJ',
            category: 'Adjetivo',
            description: 'Adjetivo modificador de sintagma nominal',
            color: EAGLES_TAXONOMY['AQ0MS0'].color,
            confidence: 0.88
          };
        }
        // Likely noun
        return {
          tag: word.endsWith('s') ? (word.endsWith('as') ? 'NCFP000' : 'NCMP000') : (word.endsWith('a') ? 'NCFS000' : 'NCMS000'),
          upos: 'NOUN',
          category: 'Sustantivo',
          description: 'Sustantivo determinado en sintagma',
          color: EAGLES_TAXONOMY['NCMS000'].color,
          confidence: 0.85
        };
      }

      if (isPrevPrep) {
        // Preposition + verb infinitive or noun
        if (word.endsWith('ar') || word.endsWith('er') || word.endsWith('ir')) {
          return {
            tag: 'VMN0000',
            upos: 'VERB',
            category: 'Verbo',
            description: 'Verbo en infinitivo regido por preposición',
            color: EAGLES_TAXONOMY['VMN0000'].color,
            confidence: 0.92
          };
        }
      }
    }

    // 6. Suffix-based POS classification
    // Adverb (-mente)
    if (word.endsWith('mente') && word.length > 6) {
      return {
        tag: 'RG',
        upos: 'ADV',
        category: 'Adverbio',
        description: 'Adverbio de modo en -mente',
        color: EAGLES_TAXONOMY['RG'].color,
        confidence: 0.95
      };
    }

    // Verb suffixes
    if (/(aron|ieron|aban|iendo|ando|aron|ó|ió|ará|arán|aría|arían)$/.test(word)) {
      return {
        tag: 'VMIP3S0',
        upos: 'VERB',
        category: 'Verbo',
        description: 'Verbo conjugado según desinencia',
        color: EAGLES_TAXONOMY['VMIP3S0'].color,
        confidence: 0.85
      };
    }

    // Infinitives and Enclitics
    if (/^([a-záéíóúñ]+(ar|er|ir))(me|te|se|nos|os|le|les|lo|la|los|las)$/i.test(word)) {
      return {
        tag: 'VMN0000',
        upos: 'VERB',
        category: 'Verbo',
        description: 'Verbo en infinitivo con pronombre clítico enclítico',
        color: EAGLES_TAXONOMY['VMN0000'].color,
        confidence: 0.94
      };
    }

    if (/(ar|er|ir)$/.test(word) && word.length > 3) {
      return {
        tag: 'VMN0000',
        upos: 'VERB',
        category: 'Verbo',
        description: 'Verbo infinitivo',
        color: EAGLES_TAXONOMY['VMN0000'].color,
        confidence: 0.9
      };
    }

    // Common adjective suffixes (-able, -ible, -oso, -osa, -al, -ivo, -iva)
    if (/(able|ible|oso|osa|osos|osas|al|ales|ivo|iva|ivos|ivas)$/.test(word)) {
      return {
        tag: 'AQ0CS0',
        upos: 'ADJ',
        category: 'Adjetivo',
        description: 'Adjetivo calificativo derivativo',
        color: EAGLES_TAXONOMY['AQ0CS0'].color,
        confidence: 0.82
      };
    }

    // Substantive default
    return {
      tag: word.endsWith('a') ? 'NCFS000' : 'NCMS000',
      upos: 'NOUN',
      category: 'Sustantivo',
      description: 'Nombre común (regla general morfológica)',
      color: EAGLES_TAXONOMY['NCMS000'].color,
      confidence: 0.75
    };
  }

  /**
   * STAGE 6: Quitar Stopwords (Stopword Removal)
   * Detects whether the token is a stopword and marks it for removal/filtering.
   */
  filterStopword(token) {
    const word = token.lower;
    const stopwordSet = this.language === 'en' ? STOPWORDS_ENGLISH : STOPWORDS_SPANISH;

    const isBuiltinStopword = stopwordSet.has(word);
    const isCustomStopword = this.customStopwords.has(word);
    const isStopword = isBuiltinStopword || isCustomStopword;

    let stopwordReason = '';
    if (isStopword) {
      if (token.pos && token.pos.category) {
        stopwordReason = `Palabra vacía gramatical (${token.pos.category})`;
      } else {
        stopwordReason = 'Palabra vacía de alta frecuencia sin carga semántica léxica';
      }
    }

    return {
      isStopword,
      stopwordReason,
      isKept: !isStopword
    };
  }

  /**
   * FULL PIPELINE EXECUTION
   * Executes all 6 stages synchronously with detailed intermediate metrics and timeline
   */
  runPipeline(rawText) {
    const startTime = performance.now();

    // 1. Raw Data
    const rawData = this.processRawData(rawText);

    // 2. Sentence Segmentation
    const sentences = this.segmentSentences(rawData.text);

    // 3. Tokenization (1 Token = 1 Palabra)
    const rawTokens = this.tokenizeWords(sentences);

    // 4. Lemmatization & 5. POS Tagging & 6. Stopwords Removal
    const processedTokens = rawTokens.map((token, idx, arr) => {
      const prevToken = idx > 0 ? arr[idx - 1] : null;
      const nextToken = idx < arr.length - 1 ? arr[idx + 1] : null;

      // Lemmatization
      const lemmaResult = this.lemmatizeToken(token);

      // POS Tagging
      const posResult = this.tagTokenPOS(token, prevToken, nextToken);

      const tokenWithLinguistics = {
        ...token,
        lemma: lemmaResult.lemma,
        lemmaRule: lemmaResult.ruleApplied,
        pos: posResult
      };

      // Stopword Filtering
      const stopwordResult = this.filterStopword(tokenWithLinguistics);

      return {
        ...tokenWithLinguistics,
        ...stopwordResult
      };
    });

    // Semantic tokens (filtered tokens keeping only content words)
    const semanticTokens = processedTokens.filter(t => !t.isStopword);
    const stopwordsTokens = processedTokens.filter(t => t.isStopword);

    // Calculate Vocabulary & Lexical Metrics
    const uniqueTokens = new Set(processedTokens.map(t => t.lower)).size;
    const uniqueLemmas = new Set(processedTokens.map(t => t.lemma)).size;
    const ttr = processedTokens.length > 0 ? ((uniqueTokens / processedTokens.length) * 100).toFixed(1) : 0;
    const reductionRate = processedTokens.length > 0
      ? (((processedTokens.length - semanticTokens.length) / processedTokens.length) * 100).toFixed(1)
      : 0;

    const endTime = performance.now();
    const executionTimeMs = (endTime - startTime).toFixed(2);

    return {
      timestamp: new Date().toISOString(),
      executionTimeMs,
      stages: {
        stage1_rawData: rawData,
        stage2_sentences: sentences,
        stage3_tokens: processedTokens,
        stage4_lemmas: processedTokens.map(t => ({ token: t.word, lemma: t.lemma, rule: t.lemmaRule })),
        stage5_pos: processedTokens.map(t => ({ token: t.word, tag: t.pos.tag, upos: t.pos.upos, cat: t.pos.category, desc: t.pos.description, color: t.pos.color })),
        stage6_stopwords: {
          totalTokens: processedTokens.length,
          stopwordsCount: stopwordsTokens.length,
          semanticCount: semanticTokens.length,
          reductionPercent: reductionRate,
          semanticTokens: semanticTokens,
          removedTokens: stopwordsTokens
        }
      },
      metrics: {
        totalCharacters: rawData.characterCount,
        totalSentences: sentences.length,
        totalTokens: processedTokens.length,
        uniqueTokens,
        uniqueLemmas,
        ttrPercent: ttr,
        stopwordsCount: stopwordsTokens.length,
        semanticTokensCount: semanticTokens.length,
        reductionPercent: reductionRate
      }
    };
  }
}


  // --- 3. UI CONTROLLER ---
/**
 * UI Controller for FreeLing NLP Replication
 * Handles user interactions, live input listening, step navigation,
 * animations, visual highlighting, and export capabilities.
 */




class UIController {
  constructor() {
    this.engine = new NLPEngine({ language: 'es' });
    this.currentPipelineResult = null;
    this.activeFilterCategory = 'ALL';
    this.animationState = {
      isPlaying: false,
      currentStep: 1, // 1 to 6
      timer: null,
      speedMs: 1200
    };

    this.initDOMElements();
    this.attachEventListeners();
    this.loadInitialPreset();
  }

  initDOMElements() {
    // Inputs
    this.rawTextInput = document.getElementById('raw-text-input');
    this.presetSelect = document.getElementById('preset-select');
    this.languageSelect = document.getElementById('language-select');
    this.clearBtn = document.getElementById('clear-btn');
    this.pasteBtn = document.getElementById('paste-btn');

    // Controls
    this.liveProcessToggle = document.getElementById('live-process-toggle');
    this.animatePlayBtn = document.getElementById('animate-play-btn');
    this.animateStepBtn = document.getElementById('animate-step-btn');
    this.animateResetBtn = document.getElementById('animate-reset-btn');
    this.speedSelect = document.getElementById('speed-select');
    this.viewModeRadios = document.querySelectorAll('input[name="view-mode"]');

    // Top metrics
    this.metricSentences = document.getElementById('metric-sentences');
    this.metricTokens = document.getElementById('metric-tokens');
    this.metricLemmas = document.getElementById('metric-lemmas');
    this.metricStopwords = document.getElementById('metric-stopwords');
    this.metricReduction = document.getElementById('metric-reduction');
    this.metricTime = document.getElementById('metric-time');

    // Pipeline Stage Containers
    this.stageCards = {
      1: document.getElementById('stage-card-1'),
      2: document.getElementById('stage-card-2'),
      3: document.getElementById('stage-card-3'),
      4: document.getElementById('stage-card-4'),
      5: document.getElementById('stage-card-5'),
      6: document.getElementById('stage-card-6')
    };

    // Stage contents
    this.sentencesContainer = document.getElementById('sentences-container');
    this.tokensContainer = document.getElementById('tokens-container');
    this.lemmasContainer = document.getElementById('lemmas-container');
    this.posContainer = document.getElementById('pos-container');
    this.posFilterBar = document.getElementById('pos-filter-bar');
    this.stopwordsDiffContainer = document.getElementById('stopwords-diff-container');
    this.stopwordsCleanPreview = document.getElementById('stopwords-clean-preview');
    this.stopwordsProgressBar = document.getElementById('stopwords-progress-bar');
    this.stopwordsProgressLabel = document.getElementById('stopwords-progress-label');

    // Tabular View Elements
    this.freelingTableBody = document.getElementById('freeling-table-body');
    this.tableSearchInput = document.getElementById('table-search-input');
    this.exportJsonBtn = document.getElementById('export-json-btn');
    this.exportCsvBtn = document.getElementById('export-csv-btn');
    this.exportFreelingBtn = document.getElementById('export-freeling-btn');

    // Stepper nodes
    this.stepNodes = document.querySelectorAll('.pipeline-step-node');
  }

  attachEventListeners() {
    // Live input typing with debounce
    let debounceTimer;
    this.rawTextInput.addEventListener('input', () => {
      if (this.liveProcessToggle.checked) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.executePipeline();
        }, 150);
      }
    });

    // Preset selection
    this.presetSelect.addEventListener('change', (e) => {
      const key = e.target.value;
      if (PRESET_TEXTS[key]) {
        this.rawTextInput.value = PRESET_TEXTS[key];
        if (key === 'ingles') {
          this.languageSelect.value = 'en';
          this.engine.setLanguage('en');
        } else {
          this.languageSelect.value = 'es';
          this.engine.setLanguage('es');
        }
        this.executePipeline();
      }
    });

    // Language change
    this.languageSelect.addEventListener('change', (e) => {
      this.engine.setLanguage(e.target.value);
      this.executePipeline();
    });

    // Clear & Paste
    this.clearBtn.addEventListener('click', () => {
      this.rawTextInput.value = '';
      this.executePipeline();
      this.rawTextInput.focus();
    });

    this.pasteBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          this.rawTextInput.value = text;
          this.executePipeline();
        }
      } catch (err) {
        alert('Por favor pega el texto directamente en el área de texto.');
      }
    });

    // Animation Controls
    this.animatePlayBtn.addEventListener('click', () => this.toggleAnimation());
    this.animateStepBtn.addEventListener('click', () => this.stepAnimationForward());
    this.animateResetBtn.addEventListener('click', () => this.resetAnimation());
    this.speedSelect.addEventListener('change', (e) => {
      this.animationState.speedMs = parseInt(e.target.value, 10);
      if (this.animationState.isPlaying) {
        this.pauseAnimation();
        this.startAnimation();
      }
    });

    // View Mode Radios (Tabs: Full Pipeline, Simulator, FreeLing Table)
    this.viewModeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.switchViewMode(e.target.value);
      });
    });

    // Stepper node clicks
    this.stepNodes.forEach(node => {
      node.addEventListener('click', () => {
        const step = parseInt(node.getAttribute('data-step'), 10);
        this.jumpToStep(step);
      });
    });

    // Table Search
    if (this.tableSearchInput) {
      this.tableSearchInput.addEventListener('input', (e) => {
        this.filterTable(e.target.value.toLowerCase());
      });
    }

    // Export Buttons
    this.exportJsonBtn.addEventListener('click', () => this.exportJSON());
    this.exportCsvBtn.addEventListener('click', () => this.exportCSV());
    this.exportFreelingBtn.addEventListener('click', () => this.exportFreelingFormat());
  }

  loadInitialPreset() {
    this.rawTextInput.value = PRESET_TEXTS['zorro'];
    this.executePipeline();
  }

  /**
   * Main Pipeline Execution
   */
  executePipeline() {
    const rawText = this.rawTextInput.value;
    const result = this.engine.runPipeline(rawText);
    this.currentPipelineResult = result;

    this.updateMetrics(result);
    this.renderStage1Raw(result);
    this.renderStage2Sentences(result);
    this.renderStage3Tokens(result);
    this.renderStage4Lemmas(result);
    this.renderStage5POS(result);
    this.renderStage6Stopwords(result);
    this.renderFreelingTable(result);
  }

  /**
   * Update top KPI summary badges
   */
  updateMetrics(result) {
    const m = result.metrics;
    if (this.metricSentences) this.metricSentences.textContent = m.totalSentences;
    if (this.metricTokens) this.metricTokens.textContent = m.totalTokens;
    if (this.metricLemmas) this.metricLemmas.textContent = m.uniqueLemmas;
    if (this.metricStopwords) this.metricStopwords.textContent = m.stopwordsCount;
    if (this.metricReduction) this.metricReduction.textContent = `${m.reductionPercent}%`;
    if (this.metricTime) this.metricTime.textContent = `${result.executionTimeMs} ms`;
  }

  /**
   * STAGE 1: Render Raw Data details
   */
  renderStage1Raw(result) {
    const raw = result.stages.stage1_rawData;
    const badge = document.getElementById('stage1-stats-badge');
    if (badge) {
      badge.textContent = `${raw.characterCount} caracteres • ${raw.lineCount} línea(s)`;
    }
  }

  /**
   * STAGE 2: Render Sentences (Segmentación de Frases)
   */
  renderStage2Sentences(result) {
    const sentences = result.stages.stage2_sentences;
    this.sentencesContainer.innerHTML = '';

    if (sentences.length === 0) {
      this.sentencesContainer.innerHTML = '<div class="text-sm text-slate-400 italic">No se han detectado frases todavía. Escribe texto arriba.</div>';
      return;
    }

    sentences.forEach((sent, idx) => {
      const card = document.createElement('div');
      card.className = 'sentence-item group relative p-3 rounded-lg border border-slate-700/60 bg-slate-800/40 hover:bg-slate-800/80 transition-all duration-200';
      card.innerHTML = `
        <div class="flex items-center justify-between mb-1.5">
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              #${sent.id}
            </span>
            <span class="text-xs text-slate-400">Delimitador: <code class="px-1 py-0.5 bg-slate-900 rounded text-amber-300 font-mono">${sent.delimiter === '\n' ? '\\n' : sent.delimiter}</code></span>
          </div>
          <span class="text-xs text-slate-400">Longitud: ${sent.text.length} chars</span>
        </div>
        <p class="text-sm text-slate-200 leading-relaxed font-sans">${this.escapeHTML(sent.text)}</p>
      `;

      card.addEventListener('mouseenter', () => this.highlightSentenceTokens(sent.id, true));
      card.addEventListener('mouseleave', () => this.highlightSentenceTokens(sent.id, false));

      this.sentencesContainer.appendChild(card);
    });
  }

  /**
   * STAGE 3: Render Tokens (1 Token = 1 Palabra)
   */
  renderStage3Tokens(result) {
    const tokens = result.stages.stage3_tokens;
    this.tokensContainer.innerHTML = '';

    const countBadge = document.getElementById('stage3-count-badge');
    if (countBadge) {
      countBadge.textContent = `${tokens.length} palabras (1 palabra = 1 token)`;
    }

    if (tokens.length === 0) {
      this.tokensContainer.innerHTML = '<div class="text-sm text-slate-400 italic">Sin tokens generados.</div>';
      return;
    }

    tokens.forEach((t) => {
      const pill = document.createElement('div');
      pill.className = `token-chip inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all duration-200 cursor-pointer bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-400 hover:scale-105`;
      pill.setAttribute('data-token-id', t.id);
      pill.setAttribute('data-sentence-id', t.sentenceId);
      pill.title = `Token ID: ${t.id} | Frase: ${t.sentenceId} | Posición: ${t.indexInSentence}`;

      pill.innerHTML = `
        <span class="text-[10px] text-slate-500 font-mono">#${t.globalIndex}</span>
        <span class="font-semibold text-slate-100">${this.escapeHTML(t.word)}</span>
      `;

      pill.addEventListener('click', () => this.inspectToken(t));
      this.tokensContainer.appendChild(pill);
    });
  }

  /**
   * STAGE 4: Render Lemmatization (Lematización)
   */
  renderStage4Lemmas(result) {
    const tokens = result.stages.stage3_tokens;
    this.lemmasContainer.innerHTML = '';

    if (tokens.length === 0) {
      this.lemmasContainer.innerHTML = '<div class="text-sm text-slate-400 italic">Sin lemas disponibles.</div>';
      return;
    }

    tokens.forEach((t) => {
      const isChanged = t.lower !== t.lemma.toLowerCase();
      const card = document.createElement('div');
      card.className = `lemma-chip flex items-center justify-between p-2 rounded-md border text-xs transition-all ${
        isChanged
          ? 'bg-amber-950/20 border-amber-500/40 text-amber-200 shadow-sm shadow-amber-950/20'
          : 'bg-slate-800/50 border-slate-700/60 text-slate-300'
      }`;

      card.title = t.lemmaRule;

      card.innerHTML = `
        <div class="flex items-center space-x-2">
          <span class="font-medium text-slate-300">${this.escapeHTML(t.word)}</span>
          <span class="text-slate-500">➔</span>
          <span class="font-bold ${isChanged ? 'text-amber-400' : 'text-emerald-400'}">${this.escapeHTML(t.lemma)}</span>
        </div>
        <span class="text-[10px] px-1.5 py-0.5 rounded ${isChanged ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-700 text-slate-400'}">
          ${isChanged ? 'Transformado' : 'Base'}
        </span>
      `;

      this.lemmasContainer.appendChild(card);
    });
  }

  /**
   * STAGE 5: Render POS Tagging (Etiquetado Gramatical)
   */
  renderStage5POS(result) {
    const tokens = result.stages.stage3_tokens;
    this.posContainer.innerHTML = '';

    if (tokens.length === 0) {
      this.posContainer.innerHTML = '<div class="text-sm text-slate-400 italic">Sin etiquetas gramaticales.</div>';
      return;
    }

    // Populate category filter counts
    this.updatePOSFilterCounts(tokens);

    tokens.forEach((t) => {
      const p = t.pos;
      const isVisible = this.activeFilterCategory === 'ALL' || p.upos === this.activeFilterCategory;

      const pill = document.createElement('div');
      pill.className = `pos-chip inline-flex flex-col p-2 rounded-lg border text-xs transition-all cursor-pointer ${
        isVisible ? 'opacity-100' : 'opacity-20'
      }`;
      pill.style.backgroundColor = `${p.color}15`;
      pill.style.borderColor = `${p.color}50`;

      pill.innerHTML = `
        <div class="flex items-center justify-between space-x-2 mb-1">
          <span class="font-bold text-slate-100 text-xs">${this.escapeHTML(t.word)}</span>
          <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold" style="background-color: ${p.color}25; color: ${p.color};">
            ${p.tag}
          </span>
        </div>
        <div class="flex items-center justify-between text-[10px] text-slate-400">
          <span>${p.category}</span>
          <span class="font-mono text-slate-500">${p.upos}</span>
        </div>
      `;

      pill.title = `${t.word} | EAGLES: ${p.tag} | ${p.description}`;
      pill.addEventListener('click', () => this.inspectToken(t));

      this.posContainer.appendChild(pill);
    });
  }

  updatePOSFilterCounts(tokens) {
    const counts = { ALL: tokens.length };
    tokens.forEach(t => {
      const upos = t.pos.upos;
      counts[upos] = (counts[upos] || 0) + 1;
    });

    const buttons = this.posFilterBar.querySelectorAll('button[data-upos]');
    buttons.forEach(btn => {
      const upos = btn.getAttribute('data-upos');
      const count = counts[upos] || 0;
      const badge = btn.querySelector('.count-badge');
      if (badge) badge.textContent = count;

      btn.onclick = () => {
        this.activeFilterCategory = upos;
        buttons.forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
        btn.classList.add('bg-indigo-600', 'text-white');
        this.renderStage5POS(this.currentPipelineResult);
      };
    });
  }

  /**
   * STAGE 6: Render Stopwords Removal (Quitar Stopwords)
   */
  renderStage6Stopwords(result) {
    const tokens = result.stages.stage3_tokens;
    const swInfo = result.stages.stage6_stopwords;

    this.stopwordsDiffContainer.innerHTML = '';
    this.stopwordsCleanPreview.innerHTML = '';

    // Update progress bar
    const reduction = parseFloat(swInfo.reductionPercent);
    if (this.stopwordsProgressBar) {
      this.stopwordsProgressBar.style.width = `${reduction}%`;
    }
    if (this.stopwordsProgressLabel) {
      this.stopwordsProgressLabel.textContent = `${reduction}% de compresión (${swInfo.stopwordsCount} de ${swInfo.totalTokens} palabras eliminadas)`;
    }

    if (tokens.length === 0) {
      this.stopwordsDiffContainer.innerHTML = '<div class="text-sm text-slate-400 italic">Sin datos de stopwords.</div>';
      return;
    }

    // 1. Diff view: shows which tokens are kept vs removed
    tokens.forEach((t) => {
      const chip = document.createElement('span');
      if (t.isStopword) {
        chip.className = 'inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs line-through text-rose-300 bg-rose-950/40 border border-rose-800/40 mx-0.5 my-1';
        chip.title = `Stopword: ${t.stopwordReason || 'Palabra común sin valor semántico individual'}`;
        chip.innerHTML = `<span>${this.escapeHTML(t.word)}</span><span class="text-[10px] text-rose-400 ml-1">✗</span>`;
      } else {
        chip.className = 'inline-flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-700/50 mx-0.5 my-1 shadow-sm';
        chip.title = `Palabra con contenido semántico | Lema: ${t.lemma} | PoS: ${t.pos.category}`;
        chip.innerHTML = `<span>${this.escapeHTML(t.word)}</span><span class="text-[10px] text-emerald-400 ml-1">✓</span>`;
      }
      this.stopwordsDiffContainer.appendChild(chip);
    });

    // 2. Clean preview: reconstructed sentence with only content words
    if (swInfo.semanticTokens.length === 0) {
      this.stopwordsCleanPreview.textContent = '(Todas las palabras eran stopwords)';
    } else {
      this.stopwordsCleanPreview.textContent = swInfo.semanticTokens.map(t => t.word).join(' ');
    }
  }

  /**
   * FreeLing Official Tabular View
   */
  renderFreelingTable(result) {
    const tokens = result.stages.stage3_tokens;
    this.freelingTableBody.innerHTML = '';

    if (tokens.length === 0) {
      this.freelingTableBody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-6 text-slate-400 italic">No hay tokens analizados todavía.</td>
        </tr>
      `;
      return;
    }

    tokens.forEach((t) => {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-800/80 hover:bg-slate-800/40 transition-colors text-xs font-mono';
      tr.setAttribute('data-searchable', `${t.word} ${t.lemma} ${t.pos.tag} ${t.pos.category}`.toLowerCase());

      tr.innerHTML = `
        <td class="py-2.5 px-3 text-slate-500 font-bold">#${t.globalIndex}</td>
        <td class="py-2.5 px-3 font-semibold text-slate-100 font-sans text-sm">${this.escapeHTML(t.word)}</td>
        <td class="py-2.5 px-3 text-emerald-400 font-medium">${this.escapeHTML(t.lemma)}</td>
        <td class="py-2.5 px-3">
          <span class="px-1.5 py-0.5 rounded text-[11px] font-bold" style="background-color: ${t.pos.color}25; color: ${t.pos.color};">
            ${t.pos.tag}
          </span>
        </td>
        <td class="py-2.5 px-3 text-slate-300 font-sans">${t.pos.category}</td>
        <td class="py-2.5 px-3 text-slate-400 font-sans">${t.pos.description}</td>
        <td class="py-2.5 px-3">
          ${
            t.isStopword
              ? '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30">Sí (Vacía)</span>'
              : '<span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">No (Semántica)</span>'
          }
        </td>
        <td class="py-2.5 px-3 text-slate-400 font-sans">${t.sentenceId}</td>
      `;

      this.freelingTableBody.appendChild(tr);
    });
  }

  filterTable(query) {
    const rows = this.freelingTableBody.querySelectorAll('tr[data-searchable]');
    rows.forEach(r => {
      const text = r.getAttribute('data-searchable') || '';
      r.style.display = text.includes(query) ? '' : 'none';
    });
  }

  /**
   * Highlight all tokens belonging to a sentence
   */
  highlightSentenceTokens(sentenceId, isHighlight) {
    const tokenChips = this.tokensContainer.querySelectorAll(`[data-sentence-id="${sentenceId}"]`);
    tokenChips.forEach(chip => {
      if (isHighlight) {
        chip.classList.add('ring-2', 'ring-indigo-400', 'bg-indigo-900/60');
      } else {
        chip.classList.remove('ring-2', 'ring-indigo-400', 'bg-indigo-900/60');
      }
    });
  }

  /**
   * Token Inspector Modal or Alert
   */
  inspectToken(token) {
    const msg = `
Token #${token.globalIndex}: "${token.word}"
• Lema: ${token.lemma} (${token.lemmaRule})
• Etiqueta EAGLES: ${token.pos.tag} (${token.pos.category})
• UPOS: ${token.pos.upos}
• Descripción: ${token.pos.description}
• ¿Es Stopword?: ${token.isStopword ? 'SÍ (' + token.stopwordReason + ')' : 'NO (Palabra de contenido semántico)'}
• Frase de origen: #${token.sentenceId}
    `;
    alert(msg.trim());
  }

  /**
   * Animation & Step Simulator
   */
  toggleAnimation() {
    if (this.animationState.isPlaying) {
      this.pauseAnimation();
    } else {
      this.startAnimation();
    }
  }

  startAnimation() {
    this.animationState.isPlaying = true;
    this.animatePlayBtn.innerHTML = `
      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      Pausar
    `;
    this.animatePlayBtn.classList.replace('bg-indigo-600', 'bg-amber-600');
    this.animatePlayBtn.classList.replace('hover:bg-indigo-500', 'hover:bg-amber-500');

    this.runAnimationLoop();
  }

  pauseAnimation() {
    this.animationState.isPlaying = false;
    clearTimeout(this.animationState.timer);
    this.animatePlayBtn.innerHTML = `
      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      Reproducir en Vivo
    `;
    this.animatePlayBtn.classList.replace('bg-amber-600', 'bg-indigo-600');
    this.animatePlayBtn.classList.replace('hover:bg-amber-500', 'hover:bg-indigo-500');
  }

  runAnimationLoop() {
    if (!this.animationState.isPlaying) return;

    this.stepAnimationForward();

    if (this.animationState.currentStep >= 6) {
      this.animationState.timer = setTimeout(() => {
        this.jumpToStep(1);
        if (this.animationState.isPlaying) {
          this.runAnimationLoop();
        }
      }, this.animationState.speedMs * 1.5);
    } else {
      this.animationState.timer = setTimeout(() => {
        this.runAnimationLoop();
      }, this.animationState.speedMs);
    }
  }

  stepAnimationForward() {
    let nextStep = this.animationState.currentStep + 1;
    if (nextStep > 6) nextStep = 1;
    this.jumpToStep(nextStep);
  }

  resetAnimation() {
    this.pauseAnimation();
    this.jumpToStep(1);
  }

  jumpToStep(step) {
    this.animationState.currentStep = step;

    // Update Stepper Nodes UI
    this.stepNodes.forEach(node => {
      const nodeStep = parseInt(node.getAttribute('data-step'), 10);
      if (nodeStep === step) {
        node.classList.add('ring-2', 'ring-indigo-400', 'bg-indigo-600', 'text-white');
        node.classList.remove('bg-slate-800', 'text-slate-400');
      } else if (nodeStep < step) {
        node.classList.add('bg-emerald-600', 'text-white');
        node.classList.remove('ring-2', 'ring-indigo-400', 'bg-slate-800', 'text-slate-400');
      } else {
        node.classList.remove('ring-2', 'ring-indigo-400', 'bg-indigo-600', 'bg-emerald-600', 'text-white');
        node.classList.add('bg-slate-800', 'text-slate-400');
      }
    });

    // Highlight the active card with a glowing ring
    Object.keys(this.stageCards).forEach(cardKey => {
      const card = this.stageCards[cardKey];
      if (card) {
        if (parseInt(cardKey, 10) === step) {
          card.classList.add('ring-2', 'ring-indigo-500', 'shadow-lg', 'shadow-indigo-500/20');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.classList.remove('ring-2', 'ring-indigo-500', 'shadow-lg', 'shadow-indigo-500/20');
        }
      }
    });
  }

  /**
   * Switch between Full Pipeline, Focused Simulator, and FreeLing Table
   */
  switchViewMode(mode) {
    const pipelineSection = document.getElementById('pipeline-cards-section');
    const tableSection = document.getElementById('freeling-table-section');

    if (mode === 'table') {
      pipelineSection.classList.add('hidden');
      tableSection.classList.remove('hidden');
    } else {
      pipelineSection.classList.remove('hidden');
      tableSection.classList.add('hidden');
    }
  }

  /**
   * Exports
   */
  exportJSON() {
    if (!this.currentPipelineResult) return;
    const blob = new Blob([JSON.stringify(this.currentPipelineResult, null, 2)], { type: 'application/json' });
    this.downloadBlob(blob, 'freeling_nmlp_analysis.json');
  }

  exportCSV() {
    if (!this.currentPipelineResult) return;
    const tokens = this.currentPipelineResult.stages.stage3_tokens;
    const headers = ['Index', 'Word', 'Lemma', 'EAGLES_Tag', 'UPOS', 'Category', 'Description', 'IsStopword', 'SentenceId'];
    const rows = tokens.map(t => [
      t.globalIndex,
      `"${t.word}"`,
      `"${t.lemma}"`,
      t.pos.tag,
      t.pos.upos,
      `"${t.pos.category}"`,
      `"${t.pos.description}"`,
      t.isStopword ? 'YES' : 'NO',
      t.sentenceId
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    this.downloadBlob(blob, 'freeling_nmlp_tokens.csv');
  }

  exportFreelingFormat() {
    if (!this.currentPipelineResult) return;
    const tokens = this.currentPipelineResult.stages.stage3_tokens;
    // Format identical to FreeLing CLI: Form Lemma Tag [Probability]
    const lines = tokens.map(t => `${t.word} ${t.lemma} ${t.pos.tag} 1`);
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8;' });
    this.downloadBlob(blob, 'freeling_output.txt');
  }

  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}


  // --- 4. AUTO-INITIALIZATION ---
  window.addEventListener('DOMContentLoaded', () => {
    window.freeLingApp = new UIController();
    console.log('🚀 FreeLing NMLP Studio inicializado correctamente en el navegador.');
  });
})();
