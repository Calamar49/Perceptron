/**
 * Embedding Projector 3D - Self-Contained Browser Bundle
 * Generated automatically. Compatible with both file:/// and http://
 */
(function() {
  'use strict';

  // --- 1. EMBEDDINGS DATA ---
/**
 * Real Datasets for Embedding Projector 3D
 *
 * Fuentes reales utilizadas (no simuladas):
 *
 * 1. BBC News Classification Dataset — artículos reales de noticias en inglés,
 *    clasificados en 5 categorías temáticas. Vectorizados con TF-IDF + SVD (TruncatedSVD)
 *    a 50 dimensiones, normalizados a norma L2 = 1.0.
 *    Cita: Greene, D., & Cunningham, P. (2006). Practical Solutions to the Problem of
 *    Diagonal Dominance in Kernel Document Clustering. ICML 2006.
 *    Fuente: http://mlg.ucd.ie/datasets/bbc.html
 *
 * 2. Stanford GloVe Word Embeddings (glove-wiki-gigaword-50, Wikipedia + Gigaword 6B) —
 *    vectores pre-entrenados reales de 50 dimensiones, normalizados a norma L2 = 1.0.
 *    Las palabras se presentan en español (wordSource guarda el término en inglés
 *    realmente consultado en GloVe, ya que el corpus original es en inglés).
 *    Cita: Pennington, J., Socher, R., & Manning, C. D. (2014). GloVe: Global Vectors
 *    for Word Representation. EMNLP 2014.
 *    Fuente: https://nlp.stanford.edu/projects/glove/
 *
 * 3. IMDB Movie Reviews Sentiment Dataset — reseñas reales de películas en inglés,
 *    etiquetadas Positivo/Negativo, obtenidas del mismo corpus de Maas et al. (2011)
 *    (servido vía el espejo stanfordnlp/imdb de Hugging Face). Vectorizadas con
 *    TF-IDF + SVD a 50 dimensiones, normalizadas a norma L2 = 1.0.
 *    Cita: Maas, A. L., et al. (2011). Learning Word Vectors for Sentiment Analysis.
 *    ACL-HLT 2011.
 *    Fuente: https://ai.stanford.edu/~amaas/data/sentiment/
 *
 * 4. CIFAR-10 (imágenes reales) — 50 imágenes reales (5 por clase, de las 10 clases
 *    oficiales), con embeddings reales de 1280D extraídos por MobileNetV2 preentrenada
 *    en ImageNet, reducidos a 50 dimensiones con PCA real y normalizados a norma L2 = 1.0.
 *    Las miniaturas se incluyen como PNG en base64 (campo `image`).
 *    Cita: Krizhevsky, A. (2009). Learning Multiple Layers of Features from Tiny Images.
 *    Fuente: https://www.cs.toronto.edu/~kriz/cifar.html
 *
 * Generado por docs/notebooks/ (01_glove_embeddings_exploracion.ipynb,
 * 02_bbc_imdb_datasets_exploracion.ipynb) y data/process_cifar.py. Ningún vector en
 * este archivo es sintético.
 */

const RAW_BBC_NEWS = [
  { title: "Microsoft debuts security tools", category: "Tecnología", snippet: "Microsoft is releasing tools that clean up PCs harbouring viruses and spyware. The virus-fighting program will be updated monthly and is a precursor to Microsoft releasing dedicated anti-virus software. Also being released is a software utility that will help ...", vector: [0.165882,-0.089363,-0.216755,0.002091,-0.245119,0.148512,-0.383968,0.231542,0.080485,0.447409,0.153395,0.155190,-0.081485,-0.011848,-0.030162,0.087615,-0.278425,-0.100863,-0.085800,-0.121287,-0.024909,0.135683,-0.106454,0.031681,0.068778,-0.224334,-0.078859,0.048694,0.054276,-0.043558,-0.302193,0.129301,0.053445,-0.059812,-0.024100,0.012216,-0.072735,0.033405,0.018297,-0.093429,0.079507,-0.003737,0.079759,0.015798,0.021377,0.052565,-0.027465,0.004063,-0.000010,0.086389] },
  { title: "Fast moving phone viruses appear", category: "Tecnología", snippet: "Security firms are warning about several mobile phone viruses that can spread much faster than similar bugs. The new strains of the Cabir mobile phone virus use short-range radio technology to leap to any vulnerable phone as soon as it is in range. The Cabir v...", vector: [0.244798,-0.153897,-0.298987,0.005126,-0.348100,-0.008940,-0.122267,0.115672,-0.038894,0.190738,-0.172866,0.019499,0.238792,-0.082412,-0.087396,0.311615,-0.402724,-0.184729,-0.022640,-0.208273,-0.220743,0.069000,-0.035966,-0.014649,0.025632,-0.171817,-0.101575,-0.015652,0.034862,-0.036609,-0.104526,0.097601,-0.054982,-0.010934,-0.013303,0.092004,-0.142474,0.058841,-0.021335,0.012649,-0.006623,-0.048082,0.044345,0.076028,-0.088239,0.071985,-0.055764,0.095970,0.005876,0.100716] },
  { title: "Consumers 'snub portable video'", category: "Tecnología", snippet: "Consumers want music rather than movies while on the move, says a report. Produced by Jupiter Research the analysis of the portable media player market found only 13% of Europeans want to watch video while out and about. By contrast, almost a third are interes...", vector: [0.335776,-0.214974,-0.232729,0.024293,-0.237949,-0.179578,0.292899,-0.130124,-0.019585,-0.123043,0.224580,0.069249,-0.097739,-0.007538,-0.113383,-0.082770,-0.070776,0.073031,0.052570,0.156561,0.481513,0.014297,-0.063195,0.100563,0.043660,-0.051356,-0.029367,0.023847,0.061906,-0.017682,0.128313,-0.006883,0.217631,-0.111007,0.028772,0.073021,-0.035703,0.068443,-0.102891,-0.018391,0.161990,-0.035565,-0.009631,-0.046168,0.208803,0.007956,-0.066544,0.124177,0.084520,0.033140] },
  { title: "BBC leads interactive Bafta wins", category: "Tecnología", snippet: "The BBC and the National Theatre have led the field at this year's Interactive Bafta awards. The National Theatre's Stagework website picked up the prize for best learning as well as top factual site. The BBC collected three awards, including best online enter...", vector: [0.371661,-0.379520,0.134235,0.589048,0.040493,-0.089164,0.076409,0.040778,-0.020794,0.010975,-0.061418,0.039223,-0.054846,-0.052747,-0.098928,-0.113989,-0.108210,0.048800,-0.203502,0.297059,0.045609,-0.134132,0.007069,-0.021844,0.105995,-0.014483,-0.043544,-0.111501,0.048166,0.001942,-0.022270,0.063978,-0.040044,0.077817,0.108177,0.081395,-0.049557,0.065523,0.048394,-0.051045,0.123682,0.075249,-0.059921,0.069426,0.007736,-0.076838,-0.013999,-0.159105,0.060037,0.046336] },
  { title: "Cyber crime booms in 2004", category: "Tecnología", snippet: "The last 12 months have seen a dramatic growth in almost every security threat that plague Windows PCs. The count of known viruses broke the 100,000 barrier and the number of new viruses grew by more than 50%. Similarly phishing attempts, in which conmen try t...", vector: [0.382826,-0.100461,-0.276450,-0.021949,-0.178691,0.058311,-0.302411,0.173464,0.035005,0.320668,0.040169,0.074340,0.091242,-0.075762,-0.064304,0.302619,-0.244926,-0.090879,-0.025571,-0.125492,-0.184610,0.026248,-0.010171,-0.134993,-0.026233,-0.233715,-0.129152,-0.151684,-0.046803,0.069999,0.153072,0.014250,-0.069911,0.032110,0.011898,0.183025,-0.064100,0.116981,-0.045415,0.086908,0.048907,-0.038278,0.039174,0.130398,-0.025108,0.065392,-0.062506,0.014247,0.029931,0.160798] },
  { title: "Casual gaming to 'take off'", category: "Tecnología", snippet: "Games aimed at \"casual players\" are set to be even bigger in 2005, according to industry experts. Easy-to-play titles that do not require too much time and that are playable online or downloadable to mobile devices will see real growth in the coming year. The ...", vector: [0.421199,-0.270656,-0.183402,-0.023778,-0.305804,-0.192020,0.217650,-0.140949,0.019206,0.032165,-0.143923,0.178299,-0.365628,0.282824,0.021900,-0.120976,0.047770,0.005137,-0.130872,0.119562,-0.195683,-0.033441,0.078733,-0.140803,-0.046997,0.011943,0.045855,-0.048357,0.038386,-0.025706,-0.022905,0.048864,-0.056941,0.016103,0.162059,0.071828,0.023566,0.042725,0.036899,-0.124927,0.094100,-0.068859,-0.035590,0.032437,0.197306,-0.059908,-0.023414,-0.058650,-0.059886,-0.059397] },
  { title: "Mobile picture power in your pocket", category: "Tecnología", snippet: "How many times have you wanted to have a camera to hand to catch an unexpected event that would make headlines? With a modern mobile phone that has a camera built in, you no longer need to curse, you can capture the action as it happens. Already on-the-spot sn...", vector: [0.380482,-0.151457,-0.250611,0.106847,-0.321571,-0.146740,0.194703,-0.046023,-0.098304,-0.120939,-0.373052,-0.097239,0.282172,-0.036409,-0.078397,0.290136,-0.259350,-0.141876,0.102406,-0.165294,-0.118483,-0.024192,0.193975,-0.046475,-0.026656,0.055608,0.074349,0.009353,0.033530,-0.021758,-0.088115,-0.010598,0.003190,0.066011,0.014489,0.020244,0.003469,-0.041999,-0.019337,-0.016632,-0.094250,0.049731,0.094658,0.008441,-0.009529,-0.024380,0.034504,-0.121924,0.028546,0.071134] },
  { title: "Boothroyd calls for Lords speaker", category: "Política", snippet: "Betty Boothroyd has said the House of Lords needs its own Speaker and that peers should lead the way on reforming the upper chamber. Baroness Boothroyd, who was the first woman to be Commons Speaker, said she believed Tony Blair initiated reforms without a cle...", vector: [0.263657,0.207273,0.085572,0.045093,-0.047943,0.058563,-0.097896,0.002216,0.001187,-0.177372,0.014353,-0.026109,0.017762,0.136153,-0.252425,0.213284,0.107356,0.020783,-0.325910,0.017209,0.033666,0.104769,0.121415,0.048747,0.120683,0.137586,-0.129166,0.340707,0.131906,-0.019252,0.044318,0.085766,-0.178987,0.084538,-0.168160,0.005037,0.046785,-0.018208,-0.072355,-0.128916,0.164242,-0.186689,-0.164761,-0.072693,-0.045263,-0.152385,0.089848,0.065318,0.365997,-0.060902] },
  { title: "Straw praises Kashmir moves", category: "Política", snippet: "The UK has welcomed the decision by India and Pakistan to open a bus link across the ceasefire line dividing the disputed region of Kashmir. Foreign Secretary Jack Straw, touring South East Asian countries, praised the \"spirit of cooperation\" in achieving the ...", vector: [0.443864,0.072732,-0.081214,-0.042926,0.038941,0.200855,-0.077515,0.045495,0.053277,-0.245838,-0.009858,-0.062490,0.250390,0.275211,-0.011251,-0.210134,0.000106,-0.085810,0.166993,0.032071,-0.120517,-0.108866,0.055595,0.045550,0.140098,-0.167888,0.005386,-0.176440,0.066698,0.020775,0.021111,0.169516,0.109015,0.073780,-0.182987,0.028072,0.050565,-0.018701,-0.075027,0.061820,0.223057,-0.124635,0.111272,-0.053305,0.050024,0.054436,-0.067809,0.233608,-0.195426,-0.247327] },
  { title: "Police chief backs drinking move", category: "Política", snippet: "A chief constable has backed the introduction of 24-drinking, saying police had a responsibility to ensure people could benefit from a law change. However, Norfolk police chief Andy Hayman also warned that a great deal of preparatory work was still needed. \"I ...", vector: [0.542717,0.156643,0.054140,-0.032337,-0.122900,0.182025,-0.156158,-0.001337,0.017576,-0.267337,0.021937,-0.217761,-0.134538,0.025526,-0.001126,0.052138,0.115209,-0.059085,-0.093097,-0.008548,0.038784,-0.132183,0.076707,-0.044770,-0.046578,-0.030189,-0.050171,0.020246,-0.096920,-0.001510,0.046499,0.103981,0.030070,-0.102131,0.151252,-0.026937,-0.068549,-0.054047,0.162383,0.094819,-0.147212,0.132889,0.083864,-0.005029,0.370549,0.185593,0.066484,0.188728,-0.213813,-0.024697] },
  { title: "'Hitler' row over Welsh arts cash", category: "Política", snippet: "An artist critical of Welsh arts funding being brought under assembly government control has denied comparing the idea with dictatorships in Russia and Germany. Shani Rhys James is worried that the Arts Council of Wales may be taken over by the Welsh Assembly ...", vector: [0.516545,-0.023283,0.122034,-0.067723,-0.004063,0.127951,-0.049925,0.156098,-0.151944,-0.204807,0.062112,-0.155135,-0.037975,0.046107,-0.030216,-0.143493,0.064697,-0.197813,-0.003162,0.028648,0.051439,-0.086759,0.068108,-0.210438,0.055393,0.112336,-0.209803,-0.005145,0.082335,0.058021,-0.186179,-0.021443,-0.166432,-0.315260,0.098392,0.257970,-0.080900,-0.166495,-0.093526,0.076296,0.033925,-0.131666,0.119474,-0.042675,-0.084246,-0.120788,-0.029551,0.000519,0.172205,0.068511] },
  { title: "Housing plans criticised by MPs", category: "Política", snippet: "\"Irreversible environmental damage\" will be caused by government plans to build more than one million homes in south-east England, MPs have warned. \"Sustainable communities\" were being promoted without a real understanding of what \"sustainable\" means, the Envi...", vector: [0.629687,0.180478,-0.044611,-0.121078,0.094789,0.010743,-0.112684,0.151228,-0.093357,-0.248427,-0.011521,-0.069058,-0.014691,0.006619,-0.131427,-0.154608,0.192963,-0.169756,-0.118794,-0.028359,0.000872,-0.083563,0.065509,-0.243079,0.182512,-0.037026,-0.156733,0.081928,-0.096765,0.072830,-0.128074,0.040303,0.203801,-0.013479,0.037779,0.037786,0.192533,0.048854,-0.098184,0.099586,0.006932,0.051667,0.090263,-0.060359,0.069980,-0.041052,-0.033508,0.071731,0.109109,0.001202] },
  { title: "Tories pledge free sports lessons", category: "Política", snippet: "Children would be offered two hours' free sports training a week by a future Tory government, the party has said. The Club2School policy would provide up to Â£250m yearly for local sports clubs in the UK to deliver after-school sport. The extra coaching would ...", vector: [0.633273,0.231616,0.069168,-0.026355,-0.036758,0.029797,-0.108848,-0.023861,-0.071380,-0.199484,-0.002223,-0.179000,-0.191560,-0.082354,0.024825,-0.146939,0.165644,-0.174893,-0.118027,-0.068189,-0.037794,-0.055114,0.129476,-0.116478,0.110053,-0.105861,-0.072542,-0.030947,-0.143317,0.018977,-0.146784,0.037832,0.209960,0.083368,0.213420,0.121486,0.117148,0.048774,0.117328,-0.036693,0.025395,0.026733,-0.022196,0.014992,-0.114253,-0.142640,-0.023957,-0.090921,-0.061569,0.084169] },
  { title: "Blair 'said he would stand down'", category: "Política", snippet: "Tony Blair promised Gordon Brown he would stand down before the next election, a new book about the chancellor claims. But the prime minister changed his mind following intervention from allies in the Cabinet, according to the book. The book by Sunday Telegrap...", vector: [0.516724,0.498593,0.166472,0.060681,-0.039939,-0.091372,0.097386,-0.034124,0.063973,0.113909,0.080056,0.345065,0.351003,0.128679,-0.159860,0.049957,0.144895,0.109730,-0.017545,0.018964,-0.022166,0.044085,0.074444,-0.066844,0.146951,0.033837,-0.063366,-0.032851,-0.022738,0.010871,-0.038876,0.085385,0.057203,-0.007839,-0.027298,-0.060207,0.019710,-0.013384,0.048611,-0.035714,-0.064798,0.085541,0.001187,0.016909,0.015389,-0.003652,0.004343,-0.014089,0.071552,0.096623] },
  { title: "Stars gear up for Bafta ceremony", category: "Entretenimiento", snippet: "Film stars from across the globe are preparing to walk the red carpet at this year's Bafta award ceremony. The 2005 Orange British Academy Film Awards are being held at The Odeon in London's Leicester Square. A host of Hollywood stars, including Cate Blanchett...", vector: [0.213898,-0.256722,0.221796,0.703282,0.246733,-0.010242,-0.049799,0.167783,0.017875,0.020514,-0.198347,-0.000798,0.026816,-0.063949,-0.044644,-0.043492,-0.136112,0.013388,-0.170368,0.221752,-0.018084,-0.061862,-0.091195,-0.035982,0.175327,0.009558,0.029646,0.007174,-0.022737,0.040229,0.050110,0.024872,0.065033,-0.002948,-0.008257,-0.016594,0.018639,-0.058900,-0.061591,0.051998,-0.002753,-0.012006,0.041934,-0.097789,0.078880,0.042258,0.009270,0.035524,0.013971,-0.143309] },
  { title: "Rapper Jay-Z becomes label boss", category: "Entretenimiento", snippet: "Rap star Jay-Z is to become a record company executive after being put in charge of one of hip-hop's most influential labels, Def Jam. Jay-Z, who said he would make no more music after 2003's The Black Album, will become the company's president and chief execu...", vector: [0.402563,-0.199131,-0.018115,0.133019,-0.009926,0.111144,0.169153,-0.157529,0.004716,-0.091564,0.615147,-0.053075,0.078100,-0.240913,-0.051657,0.000782,-0.043887,-0.076262,0.075489,0.027732,-0.018232,-0.102985,0.055044,-0.013256,-0.096312,0.018415,-0.068032,-0.039584,0.055312,-0.192466,-0.017824,0.025556,-0.137647,0.066154,0.068829,-0.027843,-0.030056,-0.083388,0.034874,0.140043,0.135862,-0.083472,-0.006231,-0.033416,-0.135840,-0.042272,-0.147338,0.156939,-0.066089,0.132911] },
  { title: "Bangkok film festival battles on", category: "Entretenimiento", snippet: "Organisers of the third Bangkok International Film Festival have been determined to carry on with this year's event despite the ravages of the Asian tsunami disaster. The festivities have been scaled down, red carpets have been mothballed and profits from tick...", vector: [0.352312,-0.190444,0.091118,0.410302,0.196407,-0.004459,-0.027275,0.097209,0.065790,-0.026877,-0.120194,0.083974,0.030997,0.074667,0.068545,0.051350,0.118283,-0.075462,0.243645,-0.282236,0.178683,0.047887,0.137663,-0.123328,-0.053522,-0.083572,0.069616,-0.169528,0.173798,-0.211031,0.131564,0.170208,-0.051604,-0.191993,-0.008265,-0.133528,0.008790,-0.067990,0.073025,-0.051942,0.028876,0.179075,0.039896,0.113991,0.176331,0.105862,0.008552,-0.037019,0.059425,-0.131498] },
  { title: "Vibe awards back despite violence", category: "Entretenimiento", snippet: "The US Vibe awards will be held again next year despite a stabbing which happened during the ceremony. Vibe magazine president Kenard Gibbs said the attack earlier this month in Santa Monica was \"sickening\". He said not holding the awards would be counter to t...", vector: [0.594614,-0.130632,0.113467,0.313292,0.085127,0.130152,0.057256,-0.102966,-0.017018,0.005587,0.330752,0.131098,0.175591,-0.148686,-0.160877,0.106643,-0.060234,0.031197,-0.110046,0.121653,-0.060988,-0.121793,-0.041259,-0.138584,-0.048047,0.020880,-0.055477,-0.034450,0.076764,-0.142179,0.047414,0.025219,0.019996,-0.023438,0.170306,-0.008504,-0.070370,0.009332,0.086171,0.157741,-0.099607,-0.013848,-0.062268,0.125783,-0.166361,-0.101322,-0.133672,0.019740,-0.026223,0.046188] },
  { title: "Singer's film to show at festival", category: "Entretenimiento", snippet: "A documentary which takes a candid look at the life of chart-topping singer George Michael will be shown at this year's Berlin Film Festival. A Different Story will screen in the Panorama section of the festival, which runs from 10-20 February. It features the...", vector: [0.198241,-0.148760,0.105745,0.365157,0.095194,0.017800,0.003563,0.057752,0.017309,-0.027544,-0.043806,0.067240,-0.030030,0.073831,0.067114,0.072167,0.120669,-0.056794,0.259701,-0.370301,0.194621,0.160253,0.120116,-0.072045,-0.171486,-0.062621,0.062208,-0.086938,0.262729,-0.357320,0.059577,0.061982,-0.103409,-0.185488,0.012407,-0.118923,0.034104,0.006610,0.113524,0.105948,0.020610,0.152063,0.045722,0.163729,0.142839,0.057649,-0.052221,-0.081700,0.144117,-0.110985] },
  { title: "Celebrities get to stay in jungle", category: "Entretenimiento", snippet: "All four contestants still remain in I'm A Celebrity ... Get Me Out Of Here as no evictions were made on the television show on Saturday. Contestants Paul Burrell, Joe Pasquale, Janet Street-Porter and Fran Cosgrave were told by hosts Ant and Dec. Natalie Appl...", vector: [0.432406,-0.179785,0.212674,0.077260,0.023432,0.130244,-0.062448,-0.104847,0.012424,-0.108514,0.122723,-0.008608,0.084419,-0.062821,-0.070502,0.213592,0.131683,0.086959,-0.004594,0.129814,-0.043831,-0.036882,0.012949,-0.061498,-0.119529,-0.048818,-0.043476,0.029802,0.057911,-0.024875,-0.041460,0.081633,-0.191079,0.059992,-0.032815,-0.139612,-0.325496,0.405948,0.105774,0.061759,-0.066507,-0.031802,0.156381,-0.048158,-0.256273,0.139276,-0.071011,0.053553,-0.219784,-0.087394] },
  { title: "School tribute for TV host Carson", category: "Entretenimiento", snippet: "More than 1,000 people turned out on Sunday to pay tribute to late US TV presenter Johnny Carson in the Nebraska town where he grew up. Carson, who hosted the Tonight Show for 30 years, died on 23 January from respiratory disease emphysema. He lived in Norfolk...", vector: [0.435872,-0.168791,0.030750,0.262709,-0.012140,-0.022661,0.016102,-0.021146,-0.025662,-0.081813,0.088746,-0.110395,0.025855,-0.108137,0.014442,-0.174094,0.217537,-0.017910,0.002837,-0.002967,0.010941,-0.123907,0.122480,-0.151783,-0.082574,-0.069789,-0.199483,0.072394,-0.078005,0.073318,-0.217943,-0.101976,0.006570,0.026881,0.026388,-0.010555,-0.175444,0.467477,0.096867,0.030180,-0.140168,0.038507,0.113011,0.066560,-0.199928,0.025622,-0.013418,-0.129329,-0.225033,0.070423] },
  { title: "Pearce keen on succeeding Keegan", category: "Deportes", snippet: "Joint assistant boss Stuart Pearce has admitted he would like to succeed Kevin Keegan as manager at Manchester City. Keegan has decided to step down as City manager when his contract comes to an end in 18 months. \"You don't have to be Einstein to realise there...", vector: [0.431762,-0.243739,0.263166,-0.238616,-0.100266,0.016037,0.055822,-0.036891,0.509840,-0.083814,-0.046368,0.062939,-0.020964,-0.187073,-0.090583,-0.026198,0.000711,0.028431,0.012597,-0.042735,0.136853,-0.031979,0.053437,-0.159879,0.024790,-0.069826,0.048657,0.058685,0.065192,-0.036352,-0.159293,-0.060251,-0.116447,0.064347,0.193000,0.019018,-0.078724,0.039610,0.018857,-0.014865,-0.099389,-0.117324,-0.049245,-0.051196,-0.105776,0.070433,-0.073383,0.265137,0.080395,0.091169] },
  { title: "Clyde 0-5 Celtic", category: "Deportes", snippet: "Celtic brushed aside Clyde to secure their place in the Scottish Cup semi-final, but only after a nervy and testing first half. The home side's Craig Bryson had a goal chopped off before Stan Varga headed Celtic into the lead. Alan Thompson scored from the pen...", vector: [0.303379,-0.254294,0.264012,-0.236188,-0.076908,-0.028998,0.003840,0.108640,0.178522,0.026600,-0.046359,-0.047198,0.000587,-0.115469,-0.052348,-0.008465,0.047166,-0.018997,0.035179,-0.049029,-0.115423,-0.027266,-0.084516,0.189386,-0.249465,0.202433,-0.247949,-0.182752,0.234019,0.150083,-0.017415,-0.022410,0.187544,0.068522,-0.135655,-0.147277,0.023689,0.065908,0.162732,0.161825,-0.126509,0.200868,0.104367,-0.002021,-0.124139,0.087930,0.029863,0.216737,0.160151,-0.072165] },
  { title: "Wolves appoint Hoddle as manager", category: "Deportes", snippet: "Glenn Hoddle will be unveiled as the new Wolves manager on Tuesday. The club have confirmed that the former England coach will be unveiled as the successor to Dave Jones at a news conference at Molineux at 1100 GMT. Hoddle has been linked with a return to form...", vector: [0.377379,-0.274340,0.362171,-0.281346,-0.042818,0.016998,0.066498,0.017754,0.423252,-0.085777,-0.071337,0.110974,0.003621,-0.213056,-0.008131,-0.013760,-0.034836,0.014340,-0.008522,-0.101437,0.038129,0.046700,-0.014332,-0.062574,0.052130,-0.192469,0.092542,0.233888,0.111396,-0.008356,-0.029006,-0.107686,-0.113299,0.079855,0.169141,0.051295,-0.133190,-0.065491,-0.038429,-0.022812,0.090697,-0.154377,0.047325,-0.049281,-0.123932,-0.141581,-0.063193,0.072779,-0.044126,0.101210] },
  { title: "Roddick to face Saulnier in final", category: "Deportes", snippet: "Andy Roddick will play Cyril Saulnier in the final of the SAP Open in San Jose on Sunday. The American top seed and defending champion overcame Germany's Tommy Haas, the third seed, 7-6 (7-3) 6-3. \"I was feeling horrible earlier in the week,\" Roddick said. \"I ...", vector: [0.234430,-0.200965,0.236612,-0.150445,-0.005342,0.012178,-0.021978,-0.257809,-0.027878,0.308072,-0.020906,-0.266680,0.058799,0.268571,-0.003357,0.201425,0.139626,-0.152468,0.142624,0.200028,0.059940,0.073453,-0.059332,0.006028,0.008591,-0.002634,-0.010292,0.061480,-0.086704,0.055949,-0.024874,-0.021659,0.123767,0.107904,-0.006838,-0.119266,0.157640,0.103443,0.103587,0.053219,0.022575,0.041643,0.013872,0.033432,-0.111630,0.308701,-0.016943,0.052024,0.333671,-0.167841] },
  { title: "Double injury blow strikes Wales", category: "Deportes", snippet: "Wales centre Sonny Parker and number eight Ryan Jones will miss Saturday's game with Italy because of injury. Parker has not recovered from a trapped nerve in his neck that kept him out of the win over England, and Tom Shanklin is expected to continue at centr...", vector: [0.274503,-0.262679,0.392684,-0.312994,-0.054563,-0.126253,0.036699,0.412859,-0.246145,-0.114662,0.024819,0.102089,-0.057433,-0.028357,0.044430,0.022161,-0.003911,-0.039126,0.012939,0.033837,-0.026040,0.024623,0.012544,0.025532,-0.004771,0.113793,-0.143003,-0.019369,0.091457,0.055625,-0.071329,-0.010388,-0.133968,-0.202521,0.072454,0.159674,-0.102184,-0.134779,-0.039045,0.055914,0.022377,-0.145008,0.258920,-0.061585,-0.064062,0.001311,0.074877,-0.125985,0.141954,-0.070435] },
  { title: "GB select Holmes for double bid", category: "Deportes", snippet: "Kelly Holmes has been chosen for both the 800m and 1500m at next month's European Indoor Championships - despite not yet confirming her availability. The double-Olympic champion is still undecided about whether to compete in her first European Indoors in Madri...", vector: [0.253804,-0.195716,0.225496,-0.122861,0.025760,0.077527,-0.133679,-0.382749,-0.161702,0.071768,-0.097674,0.026063,0.085066,-0.031653,0.131712,-0.265623,-0.162708,0.266440,-0.287042,-0.439216,0.102630,-0.053082,-0.050024,-0.025171,-0.100639,0.087583,-0.013632,0.048931,0.102619,0.048998,0.026526,-0.006141,-0.059863,-0.072340,0.102310,0.031029,-0.085481,-0.007101,0.040074,0.012218,0.076885,-0.077423,0.058310,-0.037009,0.057918,0.090455,-0.111435,0.052878,0.152677,-0.056860] },
  { title: "Jones files Conte lawsuit", category: "Deportes", snippet: "Marion Jones has filed a lawsuit for defamation against Balco boss Victor Conte following his allegations that he gave her performance-enhancing drugs. The Sydney Olympic gold medallist says Conte damaged her reputation and she is seeking $25m (Â£13m) in the s...", vector: [0.241999,-0.052870,0.066710,-0.029044,-0.018950,0.246715,-0.184999,-0.202705,-0.207742,-0.041418,-0.091700,0.325052,-0.039798,-0.172781,-0.026601,0.096949,0.007741,-0.053754,0.141232,0.083245,0.047266,-0.049601,-0.059849,-0.007717,-0.042658,0.030415,-0.134031,-0.018858,0.017899,0.003125,0.081564,-0.062430,-0.115228,-0.036531,0.095387,0.010358,-0.187115,0.054475,-0.135233,0.048775,0.115118,-0.035237,0.324763,0.309063,-0.274554,0.131744,0.197187,0.060840,0.237552,-0.191090] },
  { title: "US data sparks inflation worries", category: "Negocios", snippet: "Wholesale prices in the US rose at the fastest rate in more than six years in January, according to government data. New figures show the Labor Department producer price index (PPI) rose by 0.3% - in line with forecasts. But core producer prices, which exclude...", vector: [0.456539,-0.056985,-0.344371,-0.211497,0.469415,-0.273896,-0.098925,0.002128,0.012168,0.066741,-0.050782,0.006845,-0.123502,-0.133503,-0.125795,0.158255,0.056694,0.058010,-0.117757,0.040383,0.131059,0.063080,-0.025039,-0.218675,-0.131993,0.007000,-0.000339,-0.049718,0.003021,0.015447,-0.032612,0.015063,-0.065748,-0.011424,0.098023,-0.107347,0.099387,-0.017369,-0.158239,0.099551,-0.059322,0.000860,0.113206,-0.034426,-0.023621,0.007685,-0.059115,0.083181,-0.024403,-0.160150] },
  { title: "Further rise in UK jobless total", category: "Negocios", snippet: "The UK's jobless total rose for the second month in a row in December, official figures show. The number of people out of work rose 32,000 to 1.41 million in the last three months of 2004, even as 90,000 more people were in employment. Average earnings rose by...", vector: [0.471635,-0.173162,-0.339142,-0.130539,0.372804,-0.290364,-0.107993,0.002941,-0.066474,-0.005006,0.066267,-0.084706,-0.090262,-0.146127,0.013174,0.166757,0.184199,0.080037,-0.068528,-0.118517,-0.099994,0.104008,-0.015011,-0.204613,0.124950,0.020434,0.059591,-0.061094,-0.076740,0.038721,-0.152417,-0.163134,0.152569,-0.059231,0.016594,0.047068,0.044238,0.075438,-0.048186,-0.046104,-0.072840,0.046976,0.065736,-0.078776,-0.010406,-0.035548,0.079262,-0.099985,-0.070846,0.149824] },
  { title: "Ericsson sees earnings improve", category: "Negocios", snippet: "Telecoms equipment supplier Ericsson has posted a rise in fourth quarter profits thanks to clients like Deutsche Telekom upgrade their networks. Operating profit in the three months to 31 December was 9.5bn kronor (Â£722m; $1.3bn) against 6.3bn kronor last yea...", vector: [0.377522,-0.162144,-0.372014,-0.132723,0.267888,-0.083987,0.102894,-0.086878,0.026605,0.023258,0.042631,0.061269,0.094498,-0.084144,0.288439,0.316908,0.024275,0.010174,-0.037101,-0.116997,0.008992,-0.095960,-0.124023,0.159039,0.335458,0.160368,0.021525,-0.076602,0.024920,0.009958,0.080233,0.109456,-0.007551,0.007339,0.068486,0.012022,-0.109248,-0.022638,0.056902,-0.119996,0.093619,0.084680,-0.184296,0.185266,-0.101910,-0.048877,-0.025694,-0.004919,0.074097,0.064203] },
  { title: "'Standoff' on Deutsche's LSE bid", category: "Negocios", snippet: "Deutsche Boerse investors unhappy with its London Stock Exchange bid will have no chance to throw out the exchange's management until May, Reuters says. The Sunday Times reported that hedge funds TCI and Atticus were planning to demand the removal of the group...", vector: [0.169748,-0.018695,-0.060270,-0.059570,0.096468,0.184409,0.094902,-0.026131,0.160497,-0.101938,0.012928,0.072396,0.162136,-0.005885,0.523547,0.033064,-0.114693,-0.140739,-0.317527,0.219851,0.155801,0.446239,0.251409,-0.006818,-0.146096,0.115792,-0.081786,-0.082962,-0.092908,-0.025788,0.003435,0.034572,0.082178,0.031345,0.040845,0.008023,-0.089252,0.007228,-0.040679,0.041985,0.039138,0.047000,-0.043216,0.066649,0.012574,0.011846,0.090130,0.004332,0.001698,0.023976] },
  { title: "Rank 'set to sell off film unit'", category: "Negocios", snippet: "Leisure group Rank could unveil plans to demerge its film services unit and sell its media business, reports claim. Rank, formerly famous for the Carry On series, will expose the shake-up at the announcement of its results on Friday, the Sunday Telegraph repor...", vector: [0.576674,-0.241157,-0.179338,0.313578,0.119041,0.095182,0.146561,0.127835,0.040100,-0.032146,-0.030846,0.052290,-0.072243,0.027337,0.286243,-0.045467,0.233852,-0.142496,0.126807,-0.226267,0.068051,0.049001,-0.048553,-0.020905,0.044576,0.041337,0.007962,-0.032845,-0.005617,-0.080056,0.007262,0.056615,-0.081014,0.089461,-0.049878,-0.067825,0.106975,-0.087623,0.047860,0.146599,0.083127,-0.034454,-0.004951,0.032891,0.022529,0.015595,-0.275439,-0.013333,0.029246,0.058359] },
  { title: "Ethiopia's crop production up 24%", category: "Negocios", snippet: "Ethiopia produced 14.27 million tonnes of crops in 2004, 24% higher than in 2003 and 21% more than the average of the past five years, a report says. In 2003, crop production totalled 11.49 million tonnes, the joint report from the Food and Agriculture Organis...", vector: [0.529173,-0.143275,-0.314590,-0.068966,0.244019,0.031607,-0.032893,-0.010809,-0.043690,-0.014195,-0.029086,-0.087887,0.046142,-0.001121,0.031496,-0.220617,0.181369,-0.020487,0.055169,-0.151267,-0.109815,-0.187937,0.170279,-0.060667,0.165205,-0.110849,-0.120808,-0.001806,-0.057740,0.026450,-0.007339,0.039061,0.130843,0.024251,0.042613,-0.043890,0.009399,0.230787,-0.117282,-0.062303,0.002301,0.009223,-0.040402,0.053026,-0.042044,-0.064669,0.265533,-0.007522,-0.039817,0.312007] },
  { title: "GM pays $2bn to evade Fiat buyout", category: "Negocios", snippet: "General Motors of the US is to pay Fiat 1.55bn euros ($2bn; Â£1.1bn) to get out of a deal which could have forced it to buy the Italian car maker outright. Fiat had sold GM a stake in 2000, as part of a partnership agreement. But Fiat's heavy losses have convi...", vector: [0.128638,-0.040133,-0.084773,-0.056933,0.077103,0.061420,0.042654,-0.013919,0.071001,-0.033931,0.051891,0.051541,0.039063,0.013412,0.229691,0.021372,0.003568,-0.059023,-0.006779,-0.040205,0.051154,-0.206535,-0.111425,0.109754,0.302634,0.173864,-0.025318,0.020741,0.011938,0.129248,-0.089233,0.034108,-0.066328,-0.005399,0.027833,-0.008057,-0.024084,-0.146764,0.465525,0.294055,-0.019461,-0.216417,0.129548,-0.128010,0.011956,0.384747,0.312864,-0.098768,-0.016055,0.049419] },
  { title: "Intel unveils laser breakthrough", category: "Tecnología", snippet: "Intel has unveiled research that could mean data is soon being moved around chips at the speed of light. Scientists at Intel have overcome a fundamental problem that before now has prevented silicon being used to generate and amplify laser light. The breakthro...", vector: [0.379649,-0.134229,-0.201982,-0.024797,-0.229503,0.024370,-0.102305,0.055291,0.002818,0.008945,-0.129176,0.003021,-0.020669,0.034364,-0.061754,0.013545,-0.054691,-0.036044,0.009386,-0.007053,0.050839,-0.044966,0.115132,-0.090782,-0.076426,0.014015,-0.111959,-0.096093,-0.100776,0.058352,-0.008025,-0.048158,-0.265205,0.174046,0.230610,-0.234099,0.207695,-0.216295,-0.112233,0.186748,-0.198630,-0.117289,-0.038047,0.085981,-0.443336,0.031840,0.108185,-0.006745,0.041048,-0.118030] },
  { title: "Brewers' profits lose their fizz", category: "Negocios", snippet: "Heineken and Carlsberg, two of the world's largest brewers, have reported falling profits after beer sales in western Europe fell flat. Dutch firm Heineken saw its annual profits drop 33% and warned that earnings in 2005 may also slide. Danish brewer Carlsberg...", vector: [0.361280,-0.123125,-0.337590,-0.156159,0.405009,-0.112924,0.002641,-0.042803,0.033155,-0.002661,0.067489,0.019811,-0.019999,-0.003753,0.216253,0.063254,-0.035875,0.035302,0.031511,-0.088932,-0.010115,-0.144323,-0.116084,0.301779,0.301531,0.114819,-0.016426,0.022573,0.008898,0.061406,0.201449,0.097364,-0.017094,-0.073356,0.096905,0.012191,-0.167545,0.001191,0.139043,-0.098624,-0.005806,0.134916,-0.170504,0.097248,-0.101154,0.062849,-0.084215,-0.095442,0.115479,0.107571] }
];

const RAW_GLOVE_WORDS = [
  { word: "rey", wordSource: "king", category: "Realeza", vector: [0.093871,0.127653,-0.110740,-0.004242,0.111724,-0.025115,-0.016398,0.088152,-0.114984,-0.057702,-0.014265,0.277794,-0.006361,-0.182665,0.126950,0.152056,-0.096519,-0.058616,-0.103841,0.123586,0.036487,-0.025109,-0.021353,-0.056459,0.076616,-0.413621,-0.200131,-0.200633,-0.063921,0.062341,0.370771,-0.007878,-0.119675,0.132338,0.091467,0.031173,0.063902,-0.047750,-0.158583,0.030905,0.074616,0.217416,-0.188614,-0.040162,-0.028198,0.145728,-0.169767,-0.299675,-0.119874,-0.094971] },
  { word: "reina", wordSource: "queen", category: "Realeza", vector: [0.072898,0.351124,-0.243570,-0.020086,0.068998,0.115601,-0.033774,0.161315,-0.010938,-0.145963,0.043678,0.189855,0.116676,-0.060505,0.055610,0.107868,-0.149162,0.013754,-0.110558,0.041100,0.111066,0.074488,-0.024214,0.053944,0.054181,-0.347657,-0.200683,-0.037080,-0.106639,-0.010500,0.299918,0.075675,-0.047663,0.065959,0.087362,0.031269,0.101033,-0.013533,-0.161271,-0.198854,0.088481,0.048726,-0.034350,-0.141347,-0.038563,0.045198,-0.108025,-0.439824,0.001786,-0.116092] },
  { word: "príncipe", wordSource: "prince", category: "Realeza", vector: [0.194469,0.285961,-0.104431,0.020675,0.165375,0.027579,0.013095,0.262470,-0.149154,-0.069298,0.032635,0.197054,0.003861,-0.130619,0.018262,0.049445,-0.032017,-0.023518,-0.098511,0.132551,0.131591,-0.007610,0.039787,-0.029926,0.023941,-0.360506,-0.168535,-0.122872,-0.062752,0.118479,0.277600,0.098679,-0.022454,0.101927,0.166638,0.034662,-0.006938,0.110971,-0.075792,0.118575,0.067543,0.232861,-0.073181,-0.217771,0.000025,-0.035811,-0.269455,-0.294519,0.079912,-0.083506] },
  { word: "princesa", wordSource: "princess", category: "Realeza", vector: [0.262467,0.281042,-0.204816,0.121844,0.111154,0.189129,-0.026735,0.192123,-0.022483,-0.130617,0.104293,0.133917,0.032675,-0.082663,0.126615,0.084678,-0.250947,-0.005715,-0.028922,0.066870,0.124877,0.156731,-0.045678,0.077161,0.091638,-0.217473,-0.322061,-0.017913,-0.014253,-0.015391,0.159845,0.121473,0.045942,0.191195,0.115573,-0.033601,-0.004932,-0.024359,-0.095647,-0.132455,0.079426,0.011633,0.087140,-0.222375,0.019109,-0.081520,-0.114990,-0.362012,0.126498,-0.062161] },
  { word: "hombre", wordSource: "man", category: "Realeza", vector: [-0.017997,0.082004,-0.032842,-0.086813,0.313605,0.076909,-0.071052,0.047804,-0.020189,0.020551,-0.020685,0.028947,-0.124695,0.104975,0.113626,-0.088241,0.022589,0.122887,-0.135281,0.045661,-0.158080,0.242540,0.006296,0.055964,0.074574,-0.535686,-0.134894,0.078292,0.074249,-0.055544,0.498123,-0.065928,-0.032095,0.047963,0.059522,0.060328,0.023909,-0.002411,0.042515,-0.107894,-0.016449,0.119266,-0.010983,0.056011,0.125856,-0.101278,-0.091969,-0.186720,0.101316,-0.022357] },
  { word: "mujer", wordSource: "woman", category: "Realeza", vector: [-0.032561,0.116280,-0.104411,-0.088700,0.276499,0.241253,-0.077676,0.104141,0.063777,-0.045173,0.036330,-0.128506,0.054905,0.100675,0.150542,-0.068313,-0.163003,0.077714,-0.002589,0.042556,-0.096499,0.318795,-0.011916,0.125191,0.124287,-0.479618,-0.137765,0.060859,0.035327,-0.063219,0.411116,-0.049167,-0.054114,0.000153,0.030355,0.016400,-0.004235,0.006500,0.061861,-0.150576,-0.045155,0.075556,0.087203,0.004004,0.100017,-0.152865,-0.041386,-0.235657,0.087468,-0.018775] },
  { word: "españa", wordSource: "spain", category: "Geografía", vector: [0.211272,0.038891,-0.066138,0.184432,-0.033659,-0.055025,-0.063873,0.155461,-0.130493,0.063788,0.207737,-0.106128,-0.061654,-0.065858,0.201086,-0.155494,-0.069145,-0.220018,-0.080626,0.018252,-0.185161,-0.139607,-0.109544,0.139219,-0.038244,-0.192905,0.088754,-0.116107,-0.064923,0.055419,0.481542,0.096476,-0.116787,0.020253,-0.080513,-0.099133,-0.123164,0.127082,-0.067683,-0.035079,0.098670,0.054431,0.256751,-0.235232,-0.105359,0.095421,-0.081251,-0.112955,0.102330,-0.172095] },
  { word: "madrid", wordSource: "madrid", category: "Geografía", vector: [0.238415,0.129246,-0.010759,0.078692,0.032981,-0.270073,-0.086171,0.082433,-0.252256,0.227421,0.121815,-0.106059,-0.292312,-0.054391,0.157007,-0.135244,-0.067295,-0.096029,-0.191037,0.081537,-0.119421,0.076997,-0.124490,0.120896,-0.167926,-0.121639,0.198826,0.067283,-0.066062,-0.014895,0.364311,0.172407,-0.101399,-0.139432,-0.019168,-0.025251,0.013222,0.111621,0.036467,0.001374,0.127288,0.002688,0.095234,-0.147286,-0.062826,0.055286,-0.011697,0.042476,0.263071,-0.167363] },
  { word: "francia", wordSource: "france", category: "Geografía", vector: [0.111546,0.050008,-0.175384,-0.112151,-0.130834,-0.000022,-0.030045,0.062181,-0.031203,-0.067920,0.165287,-0.101449,-0.158462,-0.115963,0.094974,-0.064695,0.004630,-0.208846,-0.123258,-0.087503,-0.010349,0.028101,-0.062771,0.070794,-0.105722,-0.274127,-0.042047,0.007532,-0.066618,0.164374,0.440564,0.139878,-0.129587,0.066022,-0.097144,-0.172418,-0.044753,0.165404,-0.085504,-0.071174,0.233846,-0.004917,0.373573,-0.286174,0.004283,0.115716,-0.097017,-0.029866,0.071910,-0.090381] },
  { word: "parís", wordSource: "paris", category: "Geografía", vector: [0.138772,0.212874,-0.203664,-0.134691,-0.107591,-0.189586,-0.083910,0.048684,-0.178885,-0.008767,0.051627,-0.135657,-0.190451,-0.034617,0.103103,-0.043965,-0.064987,-0.127754,-0.165741,-0.048711,0.272735,0.185891,-0.100422,0.095446,-0.128867,-0.197355,-0.109168,0.056470,-0.080189,0.100786,0.386256,0.078208,-0.099660,-0.043730,-0.078731,-0.173065,0.046555,0.143091,0.066930,0.089445,0.152057,-0.046640,0.281477,-0.201861,0.016525,0.013821,-0.081264,-0.155202,0.175922,-0.064196] },
  { word: "italia", wordSource: "italy", category: "Geografía", vector: [0.311735,-0.136918,-0.167809,0.057931,0.007112,-0.015205,-0.016961,-0.025576,-0.150400,-0.016079,0.126471,-0.147521,-0.126293,-0.052962,0.221652,-0.128061,-0.046512,-0.030760,-0.101608,0.058987,-0.090740,-0.076108,-0.141172,0.166651,0.001732,-0.233555,0.104952,-0.022614,-0.179374,0.045086,0.459327,0.154908,-0.053606,0.055820,-0.116453,-0.028117,-0.050565,0.255072,-0.105948,-0.114090,0.066777,0.032827,0.224134,-0.214943,-0.036842,0.210382,-0.031695,-0.062201,0.078335,-0.147336] },
  { word: "roma", wordSource: "rome", category: "Geografía", vector: [0.353641,0.152026,-0.185608,-0.126362,0.023501,-0.276088,-0.009169,0.030668,-0.251700,-0.017461,-0.018014,-0.059436,-0.134324,-0.108625,0.224597,-0.104929,-0.160157,-0.061403,-0.114080,0.189998,0.009386,-0.015825,-0.135832,0.076594,0.000508,-0.257986,0.015922,-0.024596,-0.210046,-0.009678,0.361458,0.058256,-0.098457,-0.103345,-0.144146,-0.013716,0.101439,0.194827,-0.061391,0.127036,0.091800,0.000927,0.107121,-0.047252,-0.066977,0.163500,-0.098286,-0.119299,-0.023252,-0.169265] },
  { word: "alemania", wordSource: "germany", category: "Geografía", vector: [0.052950,0.009489,0.046471,-0.135113,0.026052,0.116713,-0.007265,0.039507,-0.154902,-0.121191,0.198344,-0.191277,-0.215506,-0.055422,0.164627,0.044131,0.098194,-0.094062,-0.125933,0.098048,0.114848,-0.193065,-0.126767,0.127547,-0.034694,-0.354546,0.013824,-0.050860,-0.110295,0.029994,0.414003,0.135272,0.068990,-0.002035,-0.201476,-0.155731,-0.002359,0.242647,-0.055721,-0.035620,0.130104,-0.094108,0.266586,-0.239991,0.088060,0.068944,-0.011963,0.050978,-0.058309,-0.049299] },
  { word: "berlín", wordSource: "berlin", category: "Geografía", vector: [0.086318,0.154804,-0.038742,-0.263580,-0.015450,-0.074605,-0.037559,0.061697,-0.195747,-0.098734,0.031100,-0.196709,-0.210805,0.093178,0.101195,0.013659,0.092934,-0.018553,-0.182098,0.184286,0.329480,-0.076607,-0.136246,0.101877,-0.056183,-0.311587,-0.086683,0.075976,-0.191299,-0.068186,0.300886,0.075584,0.030956,-0.130724,-0.274577,-0.088074,0.159327,0.187200,0.043649,0.073783,0.093876,-0.089097,0.096030,-0.247007,0.006209,0.070476,-0.014613,-0.019373,-0.054705,-0.016650] },
  { word: "japón", wordSource: "japan", category: "Geografía", vector: [-0.052700,-0.023301,0.053619,0.177998,0.054807,0.065431,-0.002770,0.012769,-0.123853,-0.052338,0.166591,-0.021019,0.010503,0.106277,0.117427,0.139979,-0.114291,0.078395,-0.109592,0.122809,0.184573,-0.148489,-0.150043,-0.078507,0.146996,-0.335307,0.050847,-0.052572,-0.073761,-0.086573,0.502894,0.116753,0.153282,0.086779,-0.104066,-0.097957,-0.026361,-0.013006,-0.179226,-0.118807,-0.211937,-0.142056,0.212983,-0.201476,0.168118,0.066963,-0.027025,0.164577,0.005150,-0.058831] },
  { word: "tokio", wordSource: "tokyo", category: "Geografía", vector: [-0.054131,0.033816,0.033129,0.118817,0.050649,-0.156100,0.039308,0.030970,-0.256588,-0.015958,0.015594,-0.164076,-0.033667,0.100867,0.035096,0.172356,-0.179077,0.073755,-0.198337,0.125001,0.374462,-0.024657,-0.161489,-0.048805,-0.001918,-0.291549,0.077197,0.095006,-0.123930,-0.117653,0.406279,0.049631,0.244223,-0.001358,-0.026543,-0.193596,0.041943,-0.114466,-0.007806,0.008135,-0.197921,-0.077869,0.159446,-0.128603,0.182498,0.009153,0.023326,0.108132,0.106609,-0.016896] },
  { word: "computadora", wordSource: "computer", category: "Tecnología", vector: [0.013284,-0.136910,0.300699,0.153958,0.018137,-0.093443,-0.141820,-0.251145,0.022539,0.106880,0.059038,0.043360,-0.092437,0.085763,0.062839,0.020312,-0.271555,0.140519,0.023856,-0.087934,0.123386,0.020505,-0.082442,0.054649,0.076105,-0.266247,-0.107251,-0.168869,0.017561,-0.072204,0.534341,-0.104461,0.028252,-0.170314,0.010760,0.097166,-0.076531,0.123940,0.062493,-0.096961,0.111607,0.009261,0.006365,0.222992,0.052058,0.085160,0.207572,0.021401,-0.019207,0.034787] },
  { word: "software", wordSource: "software", category: "Tecnología", vector: [0.066128,-0.192695,0.207588,0.218424,-0.099974,-0.060884,-0.208941,-0.294773,0.111833,0.194476,0.119798,0.122580,-0.053350,-0.051422,-0.004162,0.011938,-0.139795,0.116448,0.146503,-0.111591,0.089067,-0.019355,-0.148530,0.069718,0.035849,-0.095118,-0.066131,-0.187120,0.010605,-0.073774,0.544915,-0.176745,-0.062143,-0.079699,-0.018196,0.046073,-0.084663,0.037007,0.057414,-0.111563,0.209468,-0.062575,-0.028930,0.155149,-0.019807,0.066134,0.154665,0.095033,0.050502,0.049789] },
  { word: "hardware", wordSource: "hardware", category: "Tecnología", vector: [0.063249,-0.150924,0.208104,0.203417,0.023165,-0.072584,-0.091747,-0.248479,0.051475,0.051942,0.105770,0.111238,-0.020579,-0.074113,-0.062442,0.094674,-0.196492,0.162852,0.171792,-0.229439,0.134333,-0.125020,-0.237596,-0.003301,0.015225,-0.017510,-0.078468,-0.106827,0.209191,-0.060765,0.521019,-0.113668,0.054041,-0.041613,0.160876,0.219725,0.002562,0.117724,-0.091290,0.016314,0.195978,-0.005828,-0.018735,0.063725,0.041418,0.120628,0.109155,0.025854,-0.053334,0.041154] },
  { word: "algoritmo", wordSource: "algorithm", category: "Tecnología", vector: [0.191903,-0.144112,0.083782,0.105046,0.028858,0.041123,0.172616,-0.191052,0.108887,0.038928,-0.014186,0.082697,-0.127028,-0.140500,0.017419,-0.017761,0.119837,0.024579,0.132392,-0.115401,-0.057331,-0.304412,0.012901,0.190826,0.165789,0.065267,-0.047503,-0.064487,0.059406,0.029734,0.230749,-0.285345,-0.145220,-0.011155,0.164469,0.024824,0.049718,0.194161,0.001292,0.088575,0.106675,-0.003499,-0.282775,0.174295,-0.144743,-0.122236,0.382226,0.021823,0.182891,0.092159] },
  { word: "inteligencia", wordSource: "intelligence", category: "Tecnología", vector: [0.151997,-0.078181,0.167430,0.006983,0.131946,-0.110467,0.032788,-0.046096,0.101898,-0.162015,-0.011285,0.088668,-0.119616,0.091397,-0.123223,-0.049050,-0.059869,0.002484,0.020359,0.102820,0.035832,0.119574,0.187876,-0.143928,-0.062251,-0.414331,-0.152958,-0.072173,-0.063549,0.101938,0.417672,-0.128564,-0.062637,-0.345013,0.016119,0.149872,-0.130129,0.033011,-0.093954,-0.001468,0.099613,0.077452,0.083969,0.009496,0.062035,-0.089478,-0.004502,0.344546,-0.019693,0.052143] },
  { word: "robot", wordSource: "robot", category: "Tecnología", vector: [0.226118,-0.169062,0.110250,0.083737,0.092504,0.046200,0.020011,-0.188247,0.071597,-0.075626,0.152098,0.177263,-0.040597,0.370910,-0.024272,-0.027749,-0.039825,0.381014,-0.185541,-0.074962,-0.014995,0.032622,-0.133943,-0.001893,0.187356,-0.155638,-0.146538,-0.119183,0.018245,-0.104029,0.287427,-0.055693,-0.164695,0.032575,-0.056370,0.244746,0.015771,-0.002942,-0.062074,-0.179275,0.009651,-0.085692,-0.021321,0.015902,0.154266,-0.030097,0.233787,-0.183481,-0.024603,0.037563] },
  { word: "internet", wordSource: "internet", category: "Tecnología", vector: [0.096897,-0.039734,0.255589,0.140012,-0.077633,-0.104492,-0.211230,-0.230144,0.157069,0.187769,-0.033340,0.011628,-0.029713,0.048090,0.074170,-0.006195,-0.159823,-0.024360,0.085581,-0.025250,0.160290,0.018870,-0.044387,0.237455,0.062957,-0.267667,-0.034363,-0.137043,0.063218,-0.029506,0.544376,0.012120,0.026987,-0.147479,-0.202341,-0.054994,-0.138687,-0.052963,-0.106604,-0.043384,0.175691,0.006858,-0.011691,0.252349,0.016317,-0.031181,0.004771,-0.012176,0.072994,0.032129] },
  { word: "código", wordSource: "code", category: "Tecnología", vector: [-0.084127,-0.128558,-0.017909,0.064811,0.002633,0.030367,0.089128,-0.330450,0.073167,-0.105299,0.035547,0.185001,0.008636,0.004957,0.033613,-0.100505,-0.189443,0.006441,0.071619,-0.039853,-0.035172,-0.177888,-0.019890,0.131904,-0.014216,-0.270441,-0.089230,-0.054266,0.046077,-0.164036,0.514381,-0.160510,-0.168637,-0.081242,0.001400,0.039412,0.178517,-0.157279,-0.116988,0.101478,0.096578,-0.053037,0.098993,0.206624,-0.260382,0.105860,0.125120,0.094775,0.089840,0.007744] },
  { word: "servidor", wordSource: "server", category: "Tecnología", vector: [0.140473,-0.068385,0.204012,0.322285,0.015327,-0.162845,-0.043629,-0.164759,0.116992,0.015685,0.109654,0.124304,0.004291,-0.083272,0.042966,-0.040746,-0.302181,0.098503,0.206545,-0.047958,-0.095581,-0.171605,-0.090231,0.175899,0.020576,0.013182,0.182814,-0.071582,0.033668,-0.042412,0.447630,-0.152745,-0.015872,0.000286,-0.054966,0.145783,-0.000230,-0.007533,-0.060930,-0.156048,0.295145,-0.102398,-0.121180,0.159210,-0.034973,-0.001858,0.192857,-0.038303,0.040458,0.034809] },
  { word: "datos", wordSource: "data", category: "Tecnología", vector: [0.089242,-0.093894,0.297032,0.075332,0.037547,-0.058080,-0.130549,-0.161536,0.196111,0.012483,0.136920,-0.009988,0.010857,0.000255,0.016668,0.061514,-0.165917,-0.141026,0.026750,-0.130421,0.123482,-0.109007,0.077601,0.001482,0.086952,-0.110880,-0.124383,-0.023408,0.013629,0.034717,0.599174,-0.138254,0.096400,-0.290209,0.001048,0.011373,-0.039345,0.005910,0.044548,-0.050361,0.124909,-0.075673,0.032614,0.081697,-0.072393,-0.042368,0.214682,0.265790,0.110649,-0.035256] },
  { word: "perro", wordSource: "dog", category: "Fauna", vector: [0.022659,-0.079828,-0.118597,-0.057048,0.145163,0.111143,-0.222023,-0.082638,0.236803,-0.116878,0.000802,0.108846,0.132895,0.097286,0.099935,-0.037890,0.037073,0.188135,-0.246581,-0.118937,-0.078190,0.069176,0.158912,0.155526,0.093671,-0.363747,-0.216198,0.087620,0.086234,-0.140647,0.322619,0.056988,-0.127022,0.133054,-0.015849,0.076405,0.026924,-0.092912,0.052280,-0.153132,-0.017744,0.049543,-0.133426,0.171981,0.257346,-0.105761,0.008695,-0.181386,0.147343,0.079289] },
  { word: "gato", wordSource: "cat", category: "Fauna", vector: [0.102728,-0.113679,-0.121860,-0.003561,0.050344,0.123874,-0.152684,-0.156334,0.144045,-0.044752,0.076420,0.175482,0.204394,0.087317,0.087042,0.060279,-0.018279,0.138591,-0.292523,-0.050621,-0.139700,0.049223,0.080797,0.100954,0.138128,-0.263915,-0.262690,0.081940,0.023744,-0.177694,0.325600,0.042263,-0.059240,0.188924,-0.052459,0.073689,0.032862,-0.101074,0.075994,-0.217670,-0.022115,0.109209,-0.098352,0.157571,0.206547,-0.063915,0.094461,-0.286057,0.161706,0.053954] },
  { word: "lobo", wordSource: "wolf", category: "Fauna", vector: [0.090258,0.031519,-0.019430,-0.044383,0.129127,0.196321,-0.298356,-0.083954,0.020425,-0.218941,0.028493,0.120149,0.100997,0.098612,0.117950,-0.064112,0.242034,0.041434,-0.379421,-0.022704,-0.126571,-0.137488,0.091415,0.000097,0.085976,-0.289052,-0.204237,0.023547,-0.077274,-0.120796,0.219369,-0.122210,-0.090770,0.015278,-0.183145,-0.093062,-0.061915,-0.212904,0.119821,-0.020427,-0.010606,0.088706,-0.147442,-0.064331,0.197907,-0.127972,0.058350,-0.127224,-0.123831,0.178501] },
  { word: "león", wordSource: "lion", category: "Fauna", vector: [0.131425,0.002829,-0.133479,-0.030336,0.273532,0.022150,-0.043900,-0.246763,0.133096,-0.036449,0.049031,0.135117,0.109575,-0.048777,-0.002607,0.052990,0.179772,0.125710,-0.430910,0.009752,0.048458,-0.058335,-0.001128,-0.079413,-0.092912,-0.173294,-0.340521,0.048386,-0.070298,-0.102237,0.231913,0.184229,0.009915,0.188249,-0.018700,0.001286,-0.035511,-0.225898,-0.056344,-0.144025,-0.029846,0.079892,-0.134249,-0.118108,0.052600,-0.050317,-0.068137,-0.294921,0.094633,-0.075479] },
  { word: "tigre", wordSource: "tiger", category: "Fauna", vector: [0.067320,-0.122244,-0.009339,0.182467,0.053770,-0.005467,-0.181325,-0.044624,0.057134,-0.161772,-0.031484,-0.031212,-0.090137,-0.012294,0.035846,0.100750,0.221620,0.132396,-0.294452,0.102371,-0.301411,0.122887,0.105381,-0.080229,0.053823,-0.212876,-0.161070,-0.001742,-0.060599,-0.084935,0.406114,-0.015882,-0.146908,0.280535,0.101823,0.071456,-0.076956,-0.165657,-0.120019,-0.213059,-0.112660,-0.094404,-0.061633,0.022440,0.268119,-0.070466,0.008024,0.009418,-0.017647,-0.092478] },
  { word: "elefante", wordSource: "elephant", category: "Fauna", vector: [0.115546,-0.058572,-0.156904,-0.098372,0.221116,0.067309,-0.146773,-0.293194,0.322386,-0.112494,0.057675,0.022318,0.205032,-0.026585,0.118213,0.083257,0.223699,0.129770,-0.253650,0.097684,-0.161829,-0.043993,-0.078639,-0.018342,0.089137,-0.192852,-0.038201,0.096918,-0.063915,-0.157197,0.239521,0.036176,-0.034376,0.138371,-0.021932,0.188843,0.052592,-0.154265,-0.089708,-0.096132,-0.148913,0.025341,-0.068293,0.026956,0.255256,-0.097859,0.037250,-0.202530,0.068996,-0.186093] },
  { word: "águila", wordSource: "eagle", category: "Fauna", vector: [0.040303,0.071935,-0.050608,-0.011739,0.112154,0.031459,-0.250903,-0.120176,0.139058,-0.199879,-0.014175,0.021579,0.043468,0.139261,-0.246343,-0.080866,0.018076,0.024107,-0.435492,0.020897,-0.165245,-0.074621,-0.133192,-0.215833,-0.057958,-0.213248,-0.210948,0.079779,-0.079272,-0.245448,0.308687,-0.058884,-0.019680,0.322996,0.079085,-0.117607,0.026226,-0.106050,0.007260,-0.100314,0.003880,-0.142730,0.002840,0.040681,0.001184,-0.105838,0.098558,-0.067302,-0.055519,-0.021691] },
  { word: "ballena", wordSource: "whale", category: "Fauna", vector: [0.122257,-0.065330,-0.131438,-0.077986,0.093005,0.116825,-0.282076,-0.119934,0.387521,-0.028133,0.116018,0.127318,0.299047,0.294077,0.086179,0.052258,0.184827,-0.006526,-0.353054,0.090462,-0.041835,-0.103958,0.082370,-0.048653,0.158345,-0.210666,-0.042124,0.101579,0.014410,-0.141465,0.148921,-0.069069,0.030105,0.091405,-0.076087,-0.050471,-0.003435,-0.110190,-0.002834,-0.051586,-0.196808,-0.055575,0.139684,0.043579,0.206690,-0.118546,0.055181,-0.008762,0.020007,-0.032703] },
  { word: "alegría", wordSource: "joy", category: "Emoción", vector: [-0.040736,0.188482,-0.137082,-0.040024,0.204960,0.062468,-0.006015,0.121498,0.050575,0.162125,0.029140,0.034184,-0.088320,-0.259074,0.102333,-0.060737,0.002019,0.070064,-0.081232,-0.162451,-0.023056,0.340067,0.020603,-0.059116,0.328715,-0.100535,-0.228633,0.049407,0.128701,-0.037856,0.311177,0.252888,0.028841,0.006674,-0.153292,-0.087693,0.010854,-0.134765,0.147308,0.022151,0.137228,0.033537,-0.273707,-0.148815,0.042407,0.119582,-0.053560,-0.180669,-0.103477,-0.015815] },
  { word: "felicidad", wordSource: "happiness", category: "Emoción", vector: [0.008442,0.327363,-0.085478,-0.042942,0.294618,0.049724,0.087229,0.020143,0.172045,0.254136,0.079276,0.062476,0.010999,-0.195509,0.170805,0.006757,0.050070,-0.016687,0.118123,-0.020099,-0.014487,0.201966,0.028205,-0.050271,0.344932,-0.068296,-0.278673,-0.071376,0.218954,0.026068,0.338947,0.231372,-0.033427,-0.081792,-0.163183,-0.106771,-0.112298,-0.070760,0.063542,-0.037278,-0.016253,-0.177602,-0.102289,-0.006251,-0.056275,-0.065938,0.032674,-0.065291,0.033982,-0.065556] },
  { word: "tristeza", wordSource: "sadness", category: "Emoción", vector: [0.071168,0.244980,-0.126148,-0.043507,0.171287,0.073879,0.203821,0.250730,-0.062665,0.132730,0.010285,0.048049,-0.026588,-0.134890,0.112146,0.008966,-0.102463,-0.001054,-0.002813,-0.126342,-0.097964,0.271142,0.083717,-0.131665,0.290456,-0.077085,-0.219526,0.183397,0.186908,0.149749,0.208064,0.258805,0.130385,-0.091519,-0.180377,-0.060973,-0.063446,-0.259736,0.125564,0.025890,0.034149,0.046644,-0.172993,-0.053196,0.050317,0.158050,-0.083064,0.093619,-0.070429,-0.122105] },
  { word: "dolor", wordSource: "pain", category: "Emoción", vector: [0.114331,0.017105,-0.131493,-0.163824,-0.048857,0.186865,0.227038,0.176603,0.107545,0.142088,0.085573,0.011424,-0.092515,-0.175558,0.086432,0.050037,-0.127528,-0.079915,0.007092,-0.052367,-0.181241,0.150631,0.041142,-0.045829,0.082445,-0.226431,-0.101883,0.027662,0.178670,0.007204,0.508229,0.248392,0.175071,-0.030272,-0.096059,0.078226,0.121220,-0.051526,0.262497,0.027983,-0.000466,0.092267,-0.087157,0.130609,0.159771,0.068792,0.081417,-0.035152,-0.116604,0.095441] },
  { word: "amor", wordSource: "love", category: "Emoción", vector: [-0.026227,0.215336,-0.160944,-0.055174,0.142665,0.156316,-0.060081,0.001364,-0.065657,0.202681,-0.046586,0.184653,-0.105458,-0.017059,0.157110,-0.062927,0.042776,0.058387,0.005086,-0.016383,-0.027770,0.255793,0.101416,0.082604,0.240796,-0.271640,-0.242043,-0.028701,0.198432,-0.176870,0.520557,0.111374,-0.055667,0.052080,-0.062193,-0.037964,-0.053918,-0.086858,-0.027581,-0.131026,0.013365,-0.036502,-0.035036,-0.030399,0.045836,0.039256,0.005841,-0.258966,-0.054029,0.054736] },
  { word: "ira", wordSource: "anger", category: "Emoción", vector: [-0.008667,0.048199,0.017181,-0.154403,0.029076,0.131249,0.161514,0.167178,-0.137926,0.145652,-0.061098,-0.057335,-0.024282,-0.142872,0.029693,0.034933,-0.015508,0.000567,-0.027397,-0.110231,0.075225,0.122041,0.007423,-0.063404,0.139597,-0.381056,0.015744,0.107724,0.141584,0.161054,0.393881,0.219012,0.061837,-0.219109,-0.267198,-0.059417,-0.149983,-0.298651,0.005066,-0.013006,0.003640,0.092205,-0.155597,0.025797,0.203189,0.054830,-0.104507,0.076176,-0.058380,-0.176453] },
  { word: "calma", wordSource: "calm", category: "Emoción", vector: [0.104300,-0.081840,-0.138007,-0.111414,0.153956,-0.232258,0.106032,0.277177,-0.104400,0.071106,-0.025250,-0.077924,0.006106,0.003852,-0.042218,0.212974,0.009962,-0.114951,0.043140,-0.118293,-0.039473,0.350083,-0.032216,-0.035533,0.161942,-0.155500,0.066236,0.177977,0.179384,0.245801,0.525055,0.117883,-0.019319,-0.122667,-0.038414,-0.074173,-0.095347,-0.148842,-0.066661,-0.078877,-0.118408,0.052415,-0.056903,-0.026330,0.053836,0.037717,-0.031837,-0.001131,0.023561,-0.016261] },
  { word: "estrella", wordSource: "star", category: "Ciencia", vector: [-0.041549,0.317789,0.007386,0.205740,0.120667,0.012795,-0.185116,-0.005934,-0.036259,0.145990,0.128501,0.149193,-0.144885,0.189642,0.176220,-0.020740,0.022718,0.060171,-0.295280,-0.007173,-0.189612,0.081146,-0.047223,0.079812,-0.065002,-0.303205,-0.090167,0.021540,-0.081960,-0.112828,0.434700,0.093056,0.112112,-0.033425,0.085926,0.079954,-0.001517,-0.043620,-0.065785,-0.217221,0.066463,0.265045,-0.067350,-0.099171,-0.049681,-0.020155,0.038124,-0.096702,-0.082590,0.035739] },
  { word: "planeta", wordSource: "planet", category: "Ciencia", vector: [0.308706,0.171935,0.208940,0.152033,0.156016,-0.069622,-0.049616,-0.079254,0.113440,0.050899,0.169162,0.135459,0.066055,0.325745,0.086920,0.168252,0.118640,0.100654,-0.287728,0.077313,-0.093624,-0.064296,0.117361,0.036590,0.159385,-0.090916,-0.232182,0.039576,0.170519,0.066006,0.327663,-0.110071,-0.082147,-0.194045,-0.135712,-0.016514,-0.089628,-0.072181,-0.014220,-0.066900,-0.109078,-0.037190,0.059413,-0.009846,-0.153788,0.022069,0.066165,-0.226326,0.019088,-0.024741] },
  { word: "galaxia", wordSource: "galaxy", category: "Ciencia", vector: [0.295205,0.102670,0.125293,0.195349,0.100015,-0.089133,-0.175086,-0.109015,-0.170122,0.078817,0.238988,0.063066,-0.075931,0.155581,0.050206,-0.002027,-0.010698,0.022532,-0.440283,0.036959,-0.291158,-0.218619,-0.109449,0.075108,-0.077943,-0.030467,0.032524,0.138247,-0.039750,-0.185850,0.181493,0.102537,0.051202,-0.206893,-0.195145,-0.027796,-0.085535,-0.067870,0.050035,-0.107746,0.116730,-0.067035,-0.046222,0.040324,-0.145960,0.063785,0.197798,0.035922,-0.057963,-0.071469] },
  { word: "sol", wordSource: "sun", category: "Ciencia", vector: [-0.070068,0.313899,0.123482,0.241691,-0.013351,-0.303981,-0.053924,-0.126683,-0.093882,0.019818,0.034047,0.076207,0.098588,0.053709,-0.047190,0.141422,-0.228706,0.010056,-0.200402,0.006987,-0.042969,0.057206,0.238774,-0.160890,0.092833,-0.174005,-0.027570,0.100367,0.038882,-0.010269,0.492923,-0.021499,-0.056530,-0.000346,-0.146110,-0.109580,-0.078695,-0.007597,0.078819,-0.045035,0.039990,-0.032585,-0.058999,0.067823,0.150515,-0.032263,0.036311,-0.304790,0.064238,-0.033358] },
  { word: "átomo", wordSource: "atom", category: "Ciencia", vector: [0.097364,0.005821,0.249716,0.073785,0.308757,0.149441,0.274452,-0.060777,-0.022434,0.307929,0.226596,0.024290,0.009237,0.310566,-0.061734,0.117065,0.141764,0.330163,-0.155999,0.054473,0.140934,-0.189961,0.182197,0.004265,0.032924,-0.112309,0.042410,0.100052,0.050390,-0.026294,0.184278,-0.200050,-0.019747,-0.089079,0.082118,-0.007134,0.061955,-0.052571,0.041219,0.037090,-0.011363,-0.161836,-0.086638,-0.162098,0.089772,0.097253,0.079198,0.068787,-0.019226,-0.051179] },
  { word: "gravedad", wordSource: "gravity", category: "Ciencia", vector: [0.099693,0.068416,0.115455,-0.051920,-0.017949,0.075212,0.293064,-0.147623,0.103565,0.125429,0.172465,0.120560,-0.124702,0.085968,-0.128195,0.183681,0.154006,0.057160,-0.236984,-0.251537,-0.006399,0.002545,-0.025776,-0.181786,0.236406,-0.141770,-0.131223,0.094814,0.136489,0.086730,0.394869,-0.054680,-0.093620,-0.229230,-0.028795,-0.066763,0.029304,-0.092658,0.051443,0.151360,-0.056462,-0.022288,-0.000848,0.106518,-0.131628,-0.090152,0.312261,-0.020529,-0.003329,-0.066258] },
  { word: "energía", wordSource: "energy", category: "Ciencia", vector: [0.012064,0.064764,0.178734,0.127330,0.058151,-0.020468,0.009100,-0.109811,0.122705,0.193462,0.155015,0.108114,0.011078,0.092144,-0.106558,0.103243,0.151126,0.128614,-0.047512,-0.200282,0.215834,-0.067649,0.028849,-0.211311,0.014372,-0.201615,0.059918,0.028379,0.081822,0.227038,0.564028,0.045572,-0.034910,-0.152457,-0.076473,-0.124907,-0.187010,0.066041,0.214256,0.086481,-0.019804,0.055267,-0.012832,-0.099480,-0.036874,0.132723,-0.093775,0.152536,0.004061,0.086297] },
  { word: "manzana", wordSource: "apple", category: "Alimento", vector: [0.098334,-0.157094,0.094402,0.243615,0.021748,0.010869,-0.259865,-0.183874,0.034665,0.090077,-0.028554,0.067138,0.048961,-0.147112,0.098597,0.090120,-0.269275,0.162120,0.113033,-0.206014,0.063439,-0.115054,0.078872,0.040755,-0.014015,-0.110008,-0.085066,0.032600,0.031079,-0.072582,0.439936,-0.125997,-0.109934,0.140559,0.017953,-0.090442,-0.159836,0.073132,0.044768,-0.293309,0.122444,-0.031217,-0.278118,-0.030655,0.150891,0.184022,0.075632,-0.041403,-0.058458,0.050225] },
  { word: "pan", wordSource: "bread", category: "Alimento", vector: [-0.064574,-0.020628,-0.151119,-0.193485,0.220584,0.083354,-0.092979,0.009256,-0.041276,-0.021413,-0.073453,-0.047451,0.196469,-0.002471,0.082219,-0.014375,0.026264,0.044300,0.116704,-0.143580,0.152610,-0.144192,0.176702,0.136388,-0.047893,-0.018610,-0.120096,0.114646,0.309952,0.021862,0.396630,0.019816,-0.080049,0.403357,-0.086531,0.066172,-0.155363,0.198160,0.191433,0.057419,0.175856,0.041495,-0.133304,-0.031137,0.158935,0.168770,-0.039842,-0.017487,-0.088204,-0.032141] },
  { word: "queso", wordSource: "cheese", category: "Alimento", vector: [-0.009009,-0.051596,-0.222036,-0.072439,0.053113,0.254443,-0.116408,-0.006198,-0.140031,0.012386,-0.051029,-0.029800,0.206192,0.014285,0.029018,-0.031757,0.061684,0.082654,-0.004063,-0.176074,0.087527,-0.192019,0.158932,0.192838,-0.087387,-0.024955,-0.163145,0.232515,0.133497,-0.120560,0.257568,-0.026621,-0.050929,0.288555,0.021935,-0.009029,-0.124033,0.279947,0.325942,-0.089038,0.189846,0.033472,0.003752,-0.065815,0.177311,0.264905,0.029898,0.072796,0.113919,0.011065] },
  { word: "vino", wordSource: "wine", category: "Alimento", vector: [-0.020537,0.135249,-0.294733,-0.109481,0.108251,-0.101155,-0.180603,-0.079106,0.109872,0.211866,0.032515,0.053867,0.211956,-0.112189,0.218037,-0.055133,0.097028,0.096423,-0.004679,-0.311863,0.083464,-0.112704,0.091362,0.200746,-0.134070,-0.103185,-0.165070,0.176876,0.052208,0.107992,0.353404,-0.049256,-0.062636,0.079174,0.115515,-0.058030,-0.260815,0.205768,0.155824,-0.013365,0.153594,0.106437,0.083495,-0.006941,0.047465,0.168874,-0.049030,-0.015318,0.022767,-0.042798] },
  { word: "café", wordSource: "coffee", category: "Alimento", vector: [-0.104669,-0.058000,-0.130976,0.030586,0.174867,-0.173561,-0.218329,-0.133732,0.137892,0.138030,0.021376,-0.072217,0.181853,-0.083129,0.209416,0.084846,-0.075157,0.126979,0.066855,-0.267278,0.215868,-0.039195,0.103888,0.130595,-0.102154,-0.059496,-0.028743,0.152269,0.163479,0.109422,0.425419,-0.018902,-0.080891,0.199513,0.016088,-0.030074,-0.218135,0.144202,0.223503,0.047311,0.011067,0.123681,-0.069739,-0.006135,0.172127,0.152563,-0.091130,-0.135135,0.023310,-0.080391] },
  { word: "chocolate", wordSource: "chocolate", category: "Alimento", vector: [0.015943,0.100972,-0.162029,0.060438,0.137734,0.244046,-0.118537,-0.057130,-0.010916,0.145063,0.031457,-0.043306,0.209573,0.116857,0.137205,0.071658,-0.055629,0.062412,-0.017874,-0.300183,0.125446,-0.025893,0.165473,0.071963,-0.087823,0.029775,-0.269631,0.181806,0.227457,-0.059655,0.215623,-0.011679,-0.218338,0.249085,-0.029765,-0.072651,-0.164025,0.175900,0.269578,-0.096978,0.165027,0.031826,-0.030315,-0.075819,0.133847,0.257921,-0.017421,-0.105439,-0.035423,-0.087988] }
];

const RAW_IMDB_REVIEWS = [
  { text: "I love sci-fi and am willing to put up with a lot. Sci-fi movies/TV are usually underfunded, under-appreciated and misunderstood. I tried to like this, I really did, but it is to good TV sci-fi as Babylon 5 is to Star Trek (the original). Silly prosthetics, cheap cardboard sets, stilted dialogues, C...", sentiment: "Negativo", vector: [0.161071,0.038237,-0.138371,0.273879,0.650244,-0.131721,0.618588,0.022322,0.213648,0.022662,-0.028044,-0.014470,-0.042108,0.071679,-0.001093,-0.017236,-0.027504,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "Worth the entertainment value of a rental, especially if you like action movies. This one features the usual car chases, fights with the great Van Damme kick style, shooting battles with the 40 shell load shotgun, and even terrorist style bombs. All of this is entertaining and competently handled bu...", sentiment: "Negativo", vector: [0.400253,0.143628,0.203453,0.220262,0.172962,-0.049979,-0.247391,0.242353,-0.103507,-0.032706,-0.384161,0.592439,-0.032128,-0.186870,0.029758,-0.148148,-0.088179,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "its a totally average film with a few semi-alright action sequences that make the plot seem a little better and remind the viewer of the classic van dam films. parts of the plot don't make sense and seem to be added in to use up time. the end plot is that of a very basic type that doesn't leave the ...", sentiment: "Negativo", vector: [0.299673,0.130553,-0.081505,-0.593265,0.401324,0.279378,-0.124868,0.232039,-0.070405,0.076059,0.227063,-0.103485,-0.046869,-0.151434,0.094403,-0.331921,0.093691,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "STAR RATING: ***** Saturday Night **** Friday Night *** Friday Morning ** Sunday Night * Monday Morning   Former New Orleans homicide cop Jack Robideaux (Jean Claude Van Damme) is re-assigned to Columbus, a small but violent town in Mexico to help the police there with their efforts to stop a major ...", sentiment: "Negativo", vector: [0.489922,0.104570,0.226229,-0.341453,-0.086637,-0.146981,0.080944,-0.036967,0.143165,0.147558,-0.222667,-0.116113,-0.174595,0.128922,-0.583941,-0.054143,-0.218838,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "First off let me say, If you haven't enjoyed a Van Damme movie since bloodsport, you probably will not like this movie. Most of these movies may not have the best plots or best actors but I enjoy these kinds of movies for what they are. This movie is much better than any of the movies the other acti...", sentiment: "Negativo", vector: [0.342081,0.498743,-0.198146,0.238554,0.131237,0.245652,-0.152809,0.101447,-0.232217,0.075628,0.083080,-0.016165,0.112744,0.157343,-0.302585,0.301788,0.374095,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "I had high hopes for this one until they changed the name to 'The Shepherd : Border Patrol, the lamest movie name ever, what was wrong with just 'The Shepherd'. This is a by the numbers action flick that tips its hat at many classic Van Damme films. There is a nice bit of action in a bar which remin...", sentiment: "Negativo", vector: [0.457307,0.418417,0.026120,-0.217120,-0.046821,-0.060514,0.041459,0.113109,-0.071628,0.082146,-0.156327,-0.148725,-0.047706,0.111728,0.427180,0.467560,-0.270773,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "Isaac Florentine has made some of the best western Martial Arts action movies ever produced. In particular US Seals 2, Cold Harvest, Special Forces and Undisputed 2 are all action classics. You can tell Isaac has a real passion for the genre and his films are always eventful, creative and sharp affa...", sentiment: "Negativo", vector: [0.498085,0.251975,0.124957,-0.102527,-0.272058,-0.231356,0.176345,-0.178247,0.306884,-0.015617,-0.139097,-0.000530,0.019208,-0.120714,0.254198,-0.151643,0.505530,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "It actually pains me to say it, but this movie was horrible on every level. The blame does not lie entirely with Van Damme as you can see he tried his best, but let's face it, he's almost fifty, how much more can you ask of him? I find it so hard to believe that the same people who put together Undi...", sentiment: "Negativo", vector: [0.297713,0.386489,-0.276973,0.270018,-0.134699,0.330537,-0.108694,-0.295191,0.351572,0.112665,0.046132,-0.092546,0.241001,-0.248895,-0.037120,-0.171518,-0.296990,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "Technically I'am a Van Damme Fan, or I was. this movie is so bad that I hated myself for wasting those 90 minutes. Do not let the name Isaac Florentine (Undisputed II) fool you, I had big hopes for this one, depending on what I saw in (Undisputed II), man.. was I wrong ??! all action fans wanted a b...", sentiment: "Negativo", vector: [0.246720,0.402509,-0.122767,0.060930,-0.300179,-0.265586,0.280978,0.095388,-0.322150,-0.337615,0.444000,0.142289,-0.104747,-0.005060,-0.075083,-0.196361,-0.138933,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "Previous reviewer Claudio Carvalho gave a much better recap of the film's plot details than I could. What I recall mostly is that it was just so beautiful, in every sense - emotionally, visually, editorially - just gorgeous.  If you like movies that are wonderful to look at, and also have emotional ...", sentiment: "Positivo", vector: [0.354188,-0.130072,0.316330,0.047552,0.205628,-0.231133,-0.347033,-0.041099,0.394465,-0.078162,0.552540,0.139688,0.015830,0.039634,0.017076,0.212845,-0.059489,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "CONTAINS \"SPOILER\" INFORMATION. Watch this director's other film, \"Earth\", at some point. It's a better film, but this one isn't bad just different.  A rare feminist point of view from an Indian filmmaker. Tradition, rituals, duty, secrets, and the portrayal of strict sex roles make this an engaging...", sentiment: "Positivo", vector: [0.434869,-0.321593,0.288536,0.039466,0.011079,0.192315,0.207168,0.153498,-0.174488,-0.373321,-0.047901,-0.256896,0.369795,-0.351582,0.003167,0.097212,-0.105569,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "This is my first Deepa Mehta film. I saw the film on TV in its Hindi version with its \"Sita\" character presented as Nita. I also note that it is Radha who underwent the allegorical trial by fire in the film and not Nita/Sita. Yet what I loved about the film was its screenplay by Ms Mehta, not her di...", sentiment: "Positivo", vector: [0.329824,-0.295205,-0.275587,-0.190241,0.027554,-0.299344,0.054682,-0.245381,-0.285153,0.404231,0.068677,0.235318,0.474889,0.059063,0.033229,-0.015922,-0.056479,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "This was a great film in every sense of the word. It tackles the subject of tribadism in a society that is quite intolerant of any deviations from the norm. It criticises a great many Indian customs that many find oppressive -- such as the arranging of marriages by others, the importance of status a...", sentiment: "Positivo", vector: [0.349643,-0.261470,-0.337211,-0.195907,-0.030009,0.410970,0.068992,-0.282862,0.084809,-0.360989,-0.057373,0.337316,-0.210936,0.293648,0.105531,0.052255,-0.059627,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "A stunningly well-made film, with exceptional acting, directing, writing, and photography.  A newlywed finds married life not what she expected, and starts to question her duty to herself versus her duty to society. Together with her sister -in-law, she makes some radical departures from conventiona...", sentiment: "Positivo", vector: [0.241722,-0.255463,0.248232,0.159710,-0.311166,0.392121,0.323680,0.274873,0.036660,0.493813,0.235376,0.171292,-0.154211,0.021808,0.061272,0.012234,0.013288,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "Overall, a well done movie. There were the parts that made me wince, and there were the parts that I threw my hands up at, but I came away with something more than I gone in with.  I think the movie suffers from some serious excess ambition. Without spoiling it, let me say that the obvious reference...", sentiment: "Positivo", vector: [0.464746,-0.126890,0.133435,0.369285,0.060029,-0.041037,-0.240258,-0.075180,-0.218606,0.059303,-0.034646,-0.363213,-0.112190,0.402330,0.216858,-0.367508,-0.063988,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "Now I do understand that this film was not meant as an indictment against all Indians but it is an amazing film because it dares to investigate the hypocrisy that some Indians have concerning their women and sexuality. I have known for some time that sexism is very common in this society (with women...", sentiment: "Positivo", vector: [0.724261,-0.481074,0.073665,0.037106,-0.074936,0.079371,-0.005161,-0.088760,-0.031106,-0.243696,-0.064119,-0.069868,0.137144,0.114718,-0.228649,0.089845,0.236052,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "There are questions that sometimes hover over us and have no answer. Two women progressively find themselves ensnared in each other's arms (as corny as the expression sounds, that is exactly what happens) and fins that they cannot answer their own question as to what defines their relationship when ...", sentiment: "Positivo", vector: [0.146822,-0.224810,-0.524351,0.028438,-0.196552,-0.181496,-0.111990,0.637331,0.329315,-0.062025,-0.077453,-0.077862,0.132193,0.131364,-0.009554,-0.049842,-0.013492,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] },
  { text: "I finally watched the third film in Mehta's trilogy: \"Fire\". To begin, I'd say that \"Water\" was the unquestionable masterpiece, on all levels. Fire comes next with Earth close behind in order of quality. Fire: there is so much going on in this film that I'll need a few more viewings to drink it all ...", sentiment: "Positivo", vector: [0.371313,-0.313855,-0.375675,0.132194,0.018348,-0.172592,-0.119254,-0.113979,-0.144286,0.126456,0.016191,-0.141235,-0.492776,-0.471302,-0.026330,0.154793,0.032414,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000,0.000000] }
];


const RAW_CIFAR_IMAGES = [
  { label: "avión #1", category: "Avión", categoryEn: "airplane", image: "data:image/png;base64,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", vector: [0.453699,-0.237959,0.003590,-0.093737,0.048332,-0.138399,-0.037412,0.215079,0.141149,-0.006633,-0.023518,-0.170231,0.225952,-0.294584,-0.217155,0.199358,-0.161060,-0.042709,-0.079552,-0.019707,0.089897,-0.129629,0.041426,0.089057,-0.016273,-0.060673,0.077025,-0.087585,0.136694,-0.082042,0.105477,0.065005,0.103815,0.160989,-0.010050,0.125025,0.031392,-0.004885,0.053950,0.305878,-0.201922,0.116783,0.022420,0.129742,-0.053059,-0.129961,-0.102633,-0.012424,-0.077286,0.000000] },
  { label: "avión #2", category: "Avión", categoryEn: "airplane", image: "data:image/png;base64,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", vector: [0.070845,0.399050,-0.075426,-0.195529,0.033671,0.250998,-0.355079,0.262000,-0.115219,-0.150768,-0.199426,-0.034122,-0.040876,-0.077651,0.068070,0.043375,0.261692,-0.207947,-0.103667,-0.188494,0.014888,0.069768,-0.078864,0.118224,0.123986,-0.229619,-0.002484,-0.156093,0.140544,0.129586,0.024788,0.028823,0.000826,-0.158393,0.248829,-0.043791,-0.123916,-0.019337,-0.024472,-0.013151,0.044764,0.083006,0.066804,0.058814,-0.050253,0.052837,-0.014789,-0.001724,0.016754,0.000000] },
  { label: "avión #3", category: "Avión", categoryEn: "airplane", image: "data:image/png;base64,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", vector: [0.186733,-0.025497,0.195975,0.357783,0.053324,0.090586,0.178296,0.294851,0.076692,-0.022755,-0.162265,-0.355922,0.067389,-0.178590,-0.007934,0.128571,-0.216228,0.242317,-0.029809,0.194095,0.028434,-0.106698,-0.039864,0.021922,-0.091089,0.019617,-0.035802,0.131059,-0.154159,0.185279,0.062526,-0.031273,-0.215842,0.007951,0.308164,0.071427,0.005110,-0.016058,-0.038833,0.006173,0.088400,0.042159,-0.088684,-0.124005,0.004765,0.069393,0.036767,0.077032,0.118013,0.000000] },
  { label: "avión #4", category: "Avión", categoryEn: "airplane", image: "data:image/png;base64,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", vector: [0.087642,0.301523,0.035148,0.334860,0.025277,0.054142,-0.110058,0.480290,0.198906,-0.417687,-0.054769,0.137010,-0.015996,0.125665,0.135645,-0.092521,-0.013613,0.046504,-0.096446,-0.109619,-0.059446,-0.000543,-0.181030,0.048663,0.034625,0.125520,-0.100166,0.082233,-0.138588,-0.165280,0.183104,-0.085448,-0.063341,-0.017317,-0.122843,-0.132761,0.134974,0.045617,0.076784,0.014776,-0.078304,-0.029698,-0.007766,0.073465,0.031669,-0.024064,0.028029,-0.019380,-0.027805,0.000000] },
  { label: "avión #5", category: "Avión", categoryEn: "airplane", image: "data:image/png;base64,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", vector: [-0.013998,0.271619,-0.329592,0.123917,-0.050116,0.220546,-0.189923,0.137892,0.172404,-0.065618,-0.147364,-0.389499,-0.227749,0.174761,0.005617,-0.087488,-0.072438,0.028347,0.298226,0.107441,0.110176,-0.064081,0.293933,-0.028754,0.115387,0.201490,0.243795,-0.147513,0.074413,0.045308,-0.068511,-0.012475,-0.022138,0.020453,-0.134685,0.031425,-0.006145,-0.035755,-0.005790,0.030077,0.016636,-0.038766,0.075921,0.024650,0.068977,0.070675,-0.007782,-0.009999,-0.018648,0.000000] },
  { label: "automóvil #6", category: "Automóvil", categoryEn: "automobile", image: "data:image/png;base64,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", vector: [0.095565,0.095689,-0.302132,0.472596,-0.227327,-0.077875,0.025688,0.117117,-0.205803,0.336319,0.054798,0.176538,-0.119071,0.186041,-0.081816,-0.064440,0.122544,-0.077506,-0.011895,-0.010013,0.184733,0.023794,0.005381,-0.025251,-0.011876,-0.094995,-0.174145,0.055294,-0.070465,0.064378,-0.075212,0.060699,-0.046923,0.058416,0.029592,0.014601,-0.020026,-0.139902,-0.023921,0.028503,-0.046362,-0.058235,-0.083856,0.181294,0.213995,-0.058101,-0.233806,0.223118,0.030812,0.000000] },
  { label: "automóvil #7", category: "Automóvil", categoryEn: "automobile", image: "data:image/png;base64,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", vector: [0.158953,-0.053775,-0.260897,0.278344,-0.303715,-0.143268,-0.008307,0.017170,-0.161562,0.333259,-0.173351,0.226801,-0.240753,0.028787,-0.234554,-0.004975,-0.133908,-0.050078,0.014518,-0.020220,-0.016862,-0.081204,-0.150179,-0.089706,0.153453,0.000308,0.015085,0.000958,-0.135325,0.012472,0.217345,0.044283,0.056001,-0.154948,-0.004010,0.134781,-0.219051,-0.065043,0.100200,0.138120,0.056107,-0.094450,-0.035631,-0.064436,0.003549,0.012852,0.151816,-0.251466,-0.009576,0.000000] },
  { label: "automóvil #8", category: "Automóvil", categoryEn: "automobile", image: "data:image/png;base64,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", vector: [0.176655,-0.081443,-0.288554,0.525186,0.007651,0.003123,-0.022368,-0.051753,-0.062754,0.171929,0.160232,0.063557,-0.047762,0.123054,-0.007551,0.091454,0.008592,-0.104600,-0.178518,0.055250,0.071785,-0.183089,0.127213,0.040083,-0.063308,0.053122,-0.159162,-0.003520,0.163367,0.209523,-0.110413,0.233396,-0.067114,-0.058409,-0.039550,-0.218061,0.207717,0.212233,-0.144072,-0.021881,-0.094398,0.055738,0.014329,-0.015067,-0.194653,0.048901,0.067439,-0.123251,-0.004439,0.000000] },
  { label: "automóvil #9", category: "Automóvil", categoryEn: "automobile", image: "data:image/png;base64,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", vector: [0.375155,0.043648,0.022801,-0.235584,0.126200,-0.246497,0.201517,0.445237,-0.046668,0.093194,0.191916,0.172800,0.125297,-0.089095,-0.076035,0.044251,-0.098487,-0.150190,0.269206,-0.020243,0.129569,0.007211,0.164913,0.058594,-0.177592,0.166708,-0.116945,0.056676,0.142595,0.029132,0.028902,-0.170973,0.072245,-0.057225,0.016546,-0.157785,-0.155049,-0.077082,0.040174,-0.153604,0.010857,-0.049992,0.038422,-0.044298,-0.011511,0.031296,0.022354,-0.003442,-0.016176,0.000000] },
  { label: "automóvil #10", category: "Automóvil", categoryEn: "automobile", image: "data:image/png;base64,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", vector: [0.392615,0.006974,-0.157133,0.138602,-0.102276,-0.079567,0.005845,0.144389,0.079344,0.213382,-0.089166,0.249743,0.052260,0.133196,-0.012318,-0.184018,0.126092,-0.012794,0.039955,0.179059,0.025026,0.164906,0.014310,-0.150275,0.062619,-0.111803,0.152216,-0.159130,-0.048988,-0.118359,-0.067805,-0.216504,0.190679,0.121390,0.241829,0.221363,0.236040,0.205547,0.051966,-0.189512,-0.105961,0.140821,0.009065,-0.114279,0.007689,0.022206,0.095343,0.037970,-0.063491,0.000000] },
  { label: "pájaro #11", category: "Pájaro", categoryEn: "bird", image: "data:image/png;base64,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", vector: [0.231767,0.313851,0.177717,-0.152009,-0.334428,0.268490,0.067932,0.041819,0.411038,0.012493,0.322328,-0.088027,0.070590,0.262695,-0.249153,0.015041,-0.064687,-0.102117,-0.166592,-0.062861,-0.161081,0.198721,0.033366,-0.145274,-0.084469,-0.061275,-0.047841,-0.010069,-0.002879,0.029155,0.017700,0.056745,0.002136,0.059271,-0.056601,0.050831,-0.070642,0.010237,-0.075077,0.014908,0.079304,-0.004605,-0.016116,-0.065603,-0.020641,-0.006048,-0.033897,-0.016953,0.032800,0.000000] },
  { label: "pájaro #12", category: "Pájaro", categoryEn: "bird", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAALkUlEQVR42u1dyW4c2RGsvXqp3riJGlGCAR0MwYalr/D8kwFf/HcenSxbY8DjkezhkOLS+1J7VftQGdFUNgQfuo+vTw9UsZZmRmVkZOST/ac//8WyLMuy2u12s1gul81iW1XNoh/1mkVRFM2irutmMV/MmsXz7543i14vahZlVcoxs0WzaAWtZpEkabMIw1AOLuXgOF43i6qWnwyHw707fMT9ZHJw5TaLPJUbOzm9aBadblceZ7ttFq4rB9uOIxdNE/VcfFI5wny+9TFf0P/5eLZtS7ztLSrEG4MzACLyVGK70+li0Vandh0XoBOELucrdQlG+2YtyHJcB/HvqoNbLUHoein30w39ZpFlcqvtLu9QThi2QnVm13MAzArIqvSTBr6JIAOxo0CMYZZlmQozx9GhyH+yJOp3OYsfnmcTbxTW0jRVYOGZC2QxyyauZeF5niALMEw2knSqXBb392NJuL2BXKtEzsJrodPpCPpyOfNmE8t5cC3f99XLxESQgdiBEGNQ8cOfrGMJYNd2FFVj9snzAuG6UeepSsAHlG+5XCBHBGCMmqF5SDGWY6t/enh4kBOC1739w++F6WV/axZ3d3dyLcCwMxCeGUWvQEpzPKmLMMErw9ricZYmggzEjgKxEnnERc6yQMyYxTwAikmHpZMfeKp4Ifq4YCR3URbxE8exular3QLW9EUJ8KurF4IHR3LN+fMXwJrAp3KFlC4WC5Ven2RneYoSRDHHU5CdmggyEDsQYi4rL0RyjlAcjYZfs8KdEkKmx3BlrrHxpTtIQ8QjhQsyxrKUkG6jlGNNl2UJol0jgnm2wD0PR6dCFJGz7r7cNovrX35pFtPJAwSQHgQZpE68KHyQUn4bJoIMxA6VO7CqAYQE/PDy4lwxq3pbAmIBKF+IQikGxEDwKlRDtouDPZRpSHm4frst55nNxl/nUqvVIjvd3Swqr0glHWqVK2TDwJGDp48POI+HjClZNU1igDdQAoiJIAOxAyHGaohROhj0wZoEWRlqHyoPDqK9hlDA1z75IbURprw026hs+OzZM1XKLZfzZnEBgKe4OnNfFEWKOu6eB3c4HAxQbQa4egZ2ulG0MMElmGcNUTQQOxbEWEMxXAmNx4dHyIbytr+8vFQEbz6HLGB7quQh6FhVjcdjxfRIL4kjMk9Ctdirj6gE4retMAz2arqOWqwggPwK6nh6dib3g5cAPyS3JoIMxI4l2u8EeXzyXMCyXmlNezQagdctkCNSFeSMUl6CQiJzzXw+t1QbgFwQ+OF53J3qIj+5vhawvH79Wv3WCjAMwQbzQsTGAPJLG201H6wypsJpajEDsWMpiqUmeIzSXq+vJMEnHowY4Rqgd7xQ8CFmKeyzM0WiyIs+SR+puhbTorsnrbx580Zdi4mSN99Cc5zUMUAPmvYVUtAKAghvzESQgdjB7g62oWQVgDUVubY5PeF1KaoYWfT7faXM8+AMCW6xXKnqrA0WNx4/ItO1VLTzPMyPeS5F4qtXr9QxLCT5t89wsGsLDG/++x90HHzVwiv3crqJIAOxQ1vPKJQIhBzIohKSJJ7KLBQcHCjqpJn39/fN4uz8BE4J5DUogRskwdl8phLc6emJEkBcDyofi8TpBGxQsuEpRHvPGeISiWo90NA4mU4VoGqgb4tFURmPooHYcSAWoh7ZbFb6y3P010fBgS/5B0giLKY63TYyi+BxMhnDM7xQv04lpN/vKSchVT5WabyfFZxU//75Z7no79rIyg4YrKcoHzntxYWINj/+80fJqrjnfYnSRJCB2IEQOzk5UaTr8fER0Jh8C2JPirKN8gO3IR0QWZt4BYxsVTd5MASvQ/rgb1G03L86m9qfPn2SOguV16url6pwOz89ReVVo7eeqwmCBG3ucI/umggyEDsQYlQeSNXevXvXLD58+GCJcHct3A8qNzmk69Ec1VbZcAI3RQTNv9vtKLCwd0ybE4UUyiY04XejSHWlaQz++PGjPAWqvKgTgV5aGKUJYMIXJnyOxxlPx+CZ8jjPn12aCDIQOwrEKJtzwfh/+/ativ8nIiE0BNdRaShNYzDGFoR9yYbn/jNQtQtcdLZnILTUmUMYP/iTem/Khi+Kn/71k+TH/kCZTDoAeIwqL/B8hTVm8ASav4kgA7EDIcYCh8j6/PmzCmBi7f379yqLtTCNxdkTupvYRBsMByqdTQE6noctM/7NONU17AwVrn1XLupFKCShVU6ghCzmCxjDau2QhMmKLDeDwrNay3lub25MBBmIHbf1HMJtuFpJRvjhh782i+//+L1gBBXKdDJV0NjNXiHFcNx4gNjO0Muml4ndbg4gc+EixThgjO6WpZyrxi03C7nnEnXW1qlwQk+BbrvF8CkvsS3U2+D+4c5EkIHYcQ1Uju0qizs7zlTe6FOiI5dS/xZwOTsXb2EHPa/1Zg3vBA+GcAFHrmU7SqLf2q4CFJknFUUyWIobLfw6aWGGnleNIU0P7bA2Cre+F6kpg8oyfTEDsSNvLEBxnAoGBZDb2xvVXx6Ohmq0+RzlFbW4G3At8rGg7X9rsHr3FwPWCtBC64mkqP7J2UkZIbrJAbioVHlpIeJnJwTkU9ibYacf9DsAnSxeXg1NBBmIHQVilA44vhF1I9Q1qP2xU0dtyTGU+tkFsyF3TKnOoZgKMflCXrdv1mIXYDfaCfQtkaq6gHwLVR51eAJzjsHq6+tf1SxM4kt2nq0E8g6Sso/76bR6eN2YvTsMxI4MMdejVX6DfZlitVNNBYitE6Fqo+FIeSd2w2V1pTplNdjX/pxLBhRvIbL7uOgWTM8Hq6wKjUds/LFLXjmHPZ2uciPTD9aHk6SLpp6H6oz2LRNBBmKHKookigj7BdR7ShksTDxYJoqSk1YCw2hnaBeIpbAwdWi7te29nTrkhHEdQ9NwVCnHrEoh5XF2p4CZ5nqCZn/rDw+6x+Wl9A56JyPYF221kw93qDMRZCB2IMR6KK8WnPzicL1dKIbGcCX7YqfYhmjPOUemmNlsij+HC7PuQOnw9p5ri2DhYoBbvQay+FpgAcgG2ZNmhJ7W5CSOhxyaoF0e4jycjDYRZCB2IMTopEXxYfmBAKoXkpghZ2FTtWS3rY2NfWkSiHKF2sCK8R/By0G3rcN6rdPCHm8QNjECQ5XPgdh+enauZq6f7FmKwRmw0zZUjuFgpGweuySYALOgqRG2EDERZCB2qGiP+awuxkAK1FDcKybb24ptC8vErs7CT2xLMHL13Us1d5wVscp9u50Vw7b1tb3DQx4ZwH/I/VFH8NVTfvny5UYpKjuTIcaxA6C4xA4kVa1n5RJs4rGGxmIiyEDs0FrMw85RDqoPRCDBQn2A3G838BUi+2zZKYN9F/moLrYYy6phYYqV0aLTIfdzlQ4fAum0i5Qo9yLsMxxQY7R0WtzEcgmrSCHap6q7HbRwiUCuvirMPooGYkdSFG3oA1u0aBHAXojCBEIBsxhzRJcqR5Ij/uFjTFGUZRD8XCiBgKGPIE822JfA9b/2PFoTOEkGsAF3YfHl2DLHBK5vxbG8gBXKAy2MC1LZEltsXcKsiP2KN5naLM5EkIHYgRDjjDNbSxn/TwcfzV/bVXmEXWl+wevVAsdI9hmdCZ37+z8+YsZfor3MK1UocWs4bhjigTEOsYf2k/llENcE8kskT9ED3V2hrdDBCFiCgqvKyz2DZQnLMfbJKR0TQQZix1EUe3hd17TML6FpCNZGGLkiUaRzaY7xLh8YsZFiJo93AJQgYgm3LcdSqqJSrgzO+LNea7+4kl+fSs+r9io1v0mH/G9+K/vkuEsUkvDVMwlGsHDU0EZ8zKW2ccy2MBAzEDtSLVZ6qiVkVaz9N3BZeSidEpVQqOC5iFLq79w0gDvwEEcUJJm86L/lvGQBvkqstZCPyjrHNqRd5fWlMhMv5eZnYxlbY3uiBxJI/wl6cVaNJvbORWlixEDsoM//AMDLwXvdh5IlAAAAAElFTkSuQmCC", vector: [-0.158277,0.353523,-0.086759,-0.181745,0.170213,0.101377,-0.391548,-0.025569,-0.098262,-0.009449,-0.091956,0.167548,0.305277,-0.124050,-0.140050,-0.148880,0.029154,0.085328,0.274686,0.136864,-0.043444,0.043863,-0.094097,-0.072385,-0.005915,0.087082,-0.021233,0.137959,-0.203594,0.153714,0.009838,0.239501,-0.047483,0.185336,-0.089927,0.035482,-0.086923,-0.090037,-0.091575,-0.143548,-0.123230,0.173014,-0.043742,0.010495,-0.061125,-0.059441,-0.000739,-0.064481,-0.023040,0.000000] },
  { label: "pájaro #13", category: "Pájaro", categoryEn: "bird", image: "data:image/png;base64,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", vector: [-0.145148,0.217030,0.284990,-0.190157,-0.238162,0.022358,0.102392,-0.293827,0.369283,0.044713,-0.017551,0.120447,0.039179,0.186800,0.003363,-0.031077,0.083489,0.234228,0.021348,-0.007573,0.395138,-0.257888,0.053106,0.008320,-0.027673,-0.077123,0.094384,0.133832,-0.116913,0.010969,0.052397,-0.042817,0.144023,-0.210102,0.059094,-0.055277,0.023064,-0.096090,0.050267,0.006016,-0.042290,0.057754,-0.000569,0.102107,-0.166597,0.039727,-0.015573,0.033864,-0.003253,0.000000] },
  { label: "pájaro #14", category: "Pájaro", categoryEn: "bird", image: "data:image/png;base64,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", vector: [0.027527,0.369781,-0.070749,-0.251923,-0.065068,0.329077,-0.147817,-0.158228,-0.083152,0.283912,0.216185,-0.089766,-0.048440,-0.029864,-0.044049,0.054227,0.000324,0.072683,0.172777,0.045516,-0.043335,-0.016551,-0.156112,0.534345,-0.122707,0.008329,-0.054237,-0.052557,-0.074512,-0.149727,-0.107861,-0.010579,-0.002112,0.018654,0.064993,0.012685,0.130573,0.043388,0.083332,0.039977,-0.045334,-0.162405,-0.071568,-0.062951,0.023860,-0.025485,0.012923,-0.052057,0.023783,0.000000] },
  { label: "pájaro #15", category: "Pájaro", categoryEn: "bird", image: "data:image/png;base64,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", vector: [-0.014539,0.293515,-0.123233,-0.128843,-0.302513,0.203075,0.195864,-0.229269,-0.259281,-0.111343,-0.263005,0.172915,0.319217,-0.159664,-0.243991,-0.039573,0.006495,0.207212,-0.001881,-0.080826,-0.008352,-0.024383,-0.028012,-0.226890,0.015533,0.101893,-0.037396,-0.116895,0.206152,0.046882,-0.002461,-0.142419,-0.156072,0.020901,0.016417,-0.052814,0.130180,0.015543,-0.017466,0.060770,0.021398,-0.198188,0.046799,0.018808,-0.034042,-0.053217,0.026585,0.042588,0.006096,0.000000] },
  { label: "gato #16", category: "Gato", categoryEn: "cat", image: "data:image/png;base64,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", vector: [-0.175345,-0.135024,-0.313295,-0.299003,0.178621,-0.017192,-0.118083,-0.047897,-0.020513,0.228284,-0.164849,-0.045234,-0.234713,0.039694,0.002158,0.090162,-0.030308,0.040888,-0.123599,-0.008074,-0.241662,0.097718,0.005175,-0.080388,-0.252792,0.020673,-0.086786,-0.066881,0.000579,-0.098623,0.023799,-0.334985,-0.103558,-0.004273,-0.095703,0.013203,0.014462,-0.153309,-0.173188,0.059317,-0.094904,0.121544,-0.253161,0.167617,-0.139981,0.250481,0.028770,0.006822,-0.027931,0.000000] },
  { label: "gato #17", category: "Gato", categoryEn: "cat", image: "data:image/png;base64,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", vector: [-0.354854,-0.367527,-0.164156,-0.015511,0.225026,-0.200078,-0.357346,0.161021,0.018368,-0.094541,0.172955,-0.065878,0.213873,0.116649,-0.326922,0.094431,0.126610,0.234597,-0.018907,-0.034261,-0.168580,-0.056284,0.191444,-0.041808,0.140277,-0.026614,-0.106418,-0.044641,-0.102176,-0.058418,-0.056657,0.014322,0.127943,-0.095399,0.098275,-0.048832,0.054758,-0.028871,0.035130,0.002680,0.062995,-0.082129,-0.010867,-0.000536,0.028127,0.013114,0.006991,0.000873,0.029423,0.000000] },
  { label: "gato #18", category: "Gato", categoryEn: "cat", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAANJklEQVR42u1cSY8b1xHulWzu5OybNBpLlgQrY8d2EtiOg8BADARBkJP/bg45BAFySCzYgh1b1jKjWciZ4doke+8c+vuK0hsLATI8Pl6m0OzXC6e+V1VfLebhb/9oGIZhGLlZKgQriQwcghCZJg4YdiG4WVAIVScthLWVTiHYNq4zGk4LIU1yXDmLC2Fj1SuEWqtWCK+uBoUwHOCCsVnBctsqBDOb4zEynBPFCW8BwbTkZDyzgXMNy8JjOC7OmU3HhZDFeB3XcXD3GI+KU/XnbR/9A/2Pj5NRXU372nfUbYPamsRhIXz20WEh3NutF4Ln4jqOVS2EJ98+K4TxyC+EDw/vFELDE/Wn2jc/KIR/fv1TIXz9/TGAkEHt0xgnp2miCItPnhtvPrTF/cG2ISSJLCf8MqwKg4Dg1RDTEFsWxKjkjuz2liKUqJxlMyXEHhXC4d31Qjh68V0hdM/6sFA21LXUwJWr5ZRggT0ybLf4+8Gjh7iFA/h1Ly4L4ceTEXCQ4nnSPAOKCJ+fEXIiy3L4VUaTlyoQc8TiEaFZlmkN0hBbCsRSWjHn2ney21u0CJ/9+uNCePTgnUJoujhnpQWs+WPAp9kEfOqtNdyiCgPXaW7A5thlfFUBDvd2cPKDg91CeH4CHzLO1P9rTtRYJv1Di8YrtwgfmOeEJi/LM+VNTS7PxQjmWoM0xJYDMSsTHME1Ss1c+fnSBHp73r0qhLOz00LYenCrECp1YKS9ukZEMKqi1chzgK5KPHbWVgHMGUzV1cV5IdzeaBbCnR0IT17hnMQo0Rfko9r2my6tYRNrErglScw4C+5uxjgtJQyzRCBmag3SEFuOo8i93aS+5dRT06Li8Zz5bEJaAL9sGMEbnM9BbngeDFO9XqeSC90BIZoMofY1V6EXLi8uYAS5/NNfIe7rzf4NH3IQKU6gY12LJGmqkjRWrFjKIzkRmvLBspQuKFVHa5CG2A0hlqTpNZ7AVLwm24RyfvLRe4VwsL9Do/OqEE6OX1I5sfzi8pJhEW6x2gRJ2KrBUeyfHuEf5QKYKyuwa0EAW7O73gZbcv92Ifz9Xz8obInFaDGl9RGwXI+8JF5zbBIpSaa8smVriGmILQdir0HLUDRQfr1GGbbmvbs75CtmPBnLax65+tGI5AYU+PgIMNzfBqdRrwFrDuyJMRjjgtXGCjxPLyKND6geHmzyCCjKH4569PRos3KbgMoUZOWZSpJYdCYzQ+UhZaPQGqQhdlOILXJehqJdMR2q+w9hPt4lBWGa0P8ghKPYqCPD5XL/9yrA0dSXGApXnsfkWMotnFyDFRtPccGmB7BEMwAqi2BM792CERxOYOm6o6nCBApXI1mJn/nwnRfsPQ8taBOtIxpiN4SY0ALkIkrML2818fP95Q+/L4SNzV2iBsFUew3Lh5c9kvZdLPcAutb6NnDUBsvRWN0mEPgfmvtMvYGQTEp4HtcDkRLGgGrTZgq7U2GYBkDFvE6ezBhnxUQN95AML5gTWVaqUj2ZhpiG2LIYRSa/JP3qQbWNr/70ZSF8/puPFApuPo8YDcE/rK+AWny3AkZxf3+/EHaukCkbjQFMw0XyazoHagIq+ebmJv91GVm+RKFNvBLuXrvwFX81TULCJ1Jt1YLGIVPK4hCT3nJuiqBjMQ2x5UDMoS7ZOTy0D98Dg/flF59TbxkWDa9YsAHUJLQIlRos1M6tPR4B2b5bx1elHqKq4QhCLKR7xeWqCulHunwhK6lEyOBVdtowVXn4iniM3twwFtUdEoJJUCaCcc1JvhaP6o+G2P/rKNJZ2uyAJP/qz1/ACSSjft5FFuzyqke6z2cwVaODF9CHROHfeNhXdLtardGwpEpNoGUCNWEIM+ReIzbdEixmMsc57TpAt8JH7V7GSupBrNj1MO21RLPKhBia7tAQWxLETG73D+/Cr3vwzg7DmYB+VEb23lCOWCwVNlMga9IfKPcoERp+BCMY+USoFOsyuz0PYZhCIeTlnynJL6nsYnru1gaKkF+cXvJe9DMXlGmumjMKUkX2WvGYhpiG2HIgVieV94uHqIkqVWEaYpqqmBaKNRRGmTS+6O1sPKBpgG6XSeObrMYPI7IKrK8wWbdlEWuOmSj5rHxRLkUCpMokGuHz7h6o/u+e46vJJX1IAUsqGfBU8UWja/GawFlrkIbYDSF2ew/k3ofvI60c0Y/yfTDh8wDqOpmMqfbQ0lqVdF+YcpVPGEp7i60QDywAMaJISuUzpsNc6rqnXDmOWdRBs1hhXmBvGxzL/QNEgq/63ykJMskAWnwO2Q0kBMslBNNWTENsSRC7d3DA0lyAZUIqwx+PCIRYWSb9WePxmKipEVllxT8UIERRxGhIqili9nDRQrlSbWgrgduMKTPBiKyyHNzr4T28ztPjM7iORydq8XAmFfvG23xIHYtpiC0LYp02kBUzCIrDKRmM+G2kXEiwjIYTbvvQ9k6nRWKffY4lRyEcptMpCc0yjZewhbRZNHCpuHNEehwid1arezwH77O5gtf5HdttLs7B1Vz1x2ygqRLgpvJz2FKxrzVIQ2xZeTE6S/miHjhT1EyUfEoncDDoK/bIIfMwn8+VgvaEKSqxa3KO58l/KCBXOVfsSBSkSgOmP1X91TBOlGzaw3eQp/v4EA7wX//2D24dTJlxW3DELbQsXd2hIbZciNELM8guGLMZ6fcpMDKdTBRmvkInrsvpARWW+AYhtD0cT2mPcJ1Oq83sVcY4C9o+neGcyRTGtFwqq9WGLESUmqg5IT9nt7JXLjGBDtP56S9RGHl+gjbqJz8eCTHK/UG65VJln9EapCF2Q4g9/s9zhjPYt/0hOrbu7d+Bp2clbDCBAvdOwR8+fgxWIS83SZsc0umCuvajMbunsTyTNkkifE4ncBZCCJP8bV3YkhhOaLwCmkXpahGvsspJHZ98/D7hjJN97gYpLWa4CBITrUEaYkuB2DfPUBfx7AT8QIONzPu7qP5tsxRwMmVL5gUgdnx2yTQWcLR/G4TDzhaKOoIpjOA0YBKNfV4W9T8S3TY5oIZWteZ5ClsiJ0ttFQ8sEOqyxFGM4PbWJjcBhGkvjvHuE9aDBQwAo1RrkIbYciAW0aAwcjK2OiuKX1etYpN/+uz7Qnh5hsZJq4yakHjKnsoBAHVwcBfLK3XeLmJDNNTeIxOY02al9NCkXzJhXnhGr/JyMOIqIKLR4HwQgtcn2WIbOKfKHs+7bHYL2ALguXNiLaCddbQGaYgtJxZjIXrK4TMZozIrl7lM3OTpmHXJzh2dwq7VG2ilLHMKR8mDStdYf2hwSptATIzFnNbnst9X5mkMRsBst9tlmht3X+t0FBgmUldPTy+NfCXgajJzvbeFbFptggc76fZocPUEKg2x5UAsHPfYAozE1sk5CIeTHr7aXYWjmFDxymKYXCiwz/T0mO1dQ/aVyKQOMykbb04YyBmLBbRiYz9gmnvEIhPo/3yKCzZaiPtMFplE0o3CEseEHEtG0HnVSCmMtFnwb3FY1oLlMHOtQRpiS4FYvwfTcPvWPfxmpPJ+PEZGaa2NryacLhUSa8LDb25uM5yBup6yeLjE5sqKJcOgMqIYodzp+QWL+dHwEnIYSE4ac7Xd4gSeFZVaZx+oFH4IHg2yLjNSIi4T1mKznp/gR+hxYmqS62YWDbEl5cU4t3Bje5cEONywp69ALb7/CPxAa20Ly16CAK9XsHyVgRuZdSOl7xeTUQ8YTA1HuMULciznxJrjsMyDNcfSPd1stYw3izGkNCszhDZJ2VOp5rzGE1/JgB+d4AWfdTknwYGXW67VtQZpiC0FYvsH99mWAuN1dnxOdeUY0j72/71bdwrhAb24Y8KQ06yNOus0NtewvFWHX/e8+xQQYzAldYOLuhF6euU6ajDW1xExldwSC5/orzILNmXXsx/S0ysBI+dXXSVv7vsI7nqTmP2kOxxV1+KvUdUapCG2FIhV67A+Z/SaZox9VtnR/9MJvLi62yFbeMAIjhW9GazG+gYQsdJu0+ULlLriHqM8GeLxWq2jp8yIc2iqBH2mDWC+PDri6GAsD1OH5L/N0PKMjuJM4T1ch/1rrPMP6AA7Wag1SENsOUPeGOBfkMqr1lc5xRfCFcs8vn0hc0Sx29tExCYBtcrpoyGnVL08fsqJcKesIuZsQ7IcUv27tc76fDIhx8xeiacXEhE9Eptjn60rnECVM82d02O0bOwYJq1hZlkK62KzbiQXWlXriIbYzSAWMJ/bbHfYrd+mG+Yps3b7xFr3G6DGzXFkuAElb15NWNCOIy847j5ghtcqwQ0Lc0cZuH0xCGizJnQLLaa6WAbJUvnEJe9RqymzAhxLaqJsxXhJBLcYwS3j7m21dF9rkIbYjacBG0rnV6NBiJGdkyywDI2ZsgpiRtCdDmDgvJyCCYdz1IefmVNvy6yQnzLh7bPO33VhH0usyCpxHIFV4Sgeokca2WJWUVZYCuLQQiV0L6UBR3pYPCasLfYCSAeNtBJoDdIQu9nnv6gLDI96jc08AAAAAElFTkSuQmCC", vector: [-0.297302,0.188121,0.085048,-0.203394,-0.175947,-0.140990,-0.145529,-0.023387,0.056588,0.152898,-0.025693,0.141261,0.051701,-0.086502,0.349542,0.293258,-0.054978,-0.180780,0.025628,0.315486,-0.130678,0.010741,0.106023,-0.072327,-0.004785,0.177533,-0.063288,0.014172,0.090018,-0.050788,0.286036,0.179500,0.092381,0.025685,0.075136,0.110625,0.167117,0.055539,0.037910,-0.036320,0.241891,-0.057203,-0.007848,0.185464,0.003523,0.018889,-0.034078,0.018368,0.023431,0.000000] },
  { label: "gato #19", category: "Gato", categoryEn: "cat", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAAOIElEQVR42u2d2Y/b5hXFSYmi9nVGGmk2r7HTrEXt1HHQoiiKFHnNa5/6h/ahQRsUCZJmcWo73mfs2bUvlKi1Dzw/BiZQ9MF6/PziixEpUqN7eO4993zf2J//5RPLsizL8kbjIMjYwf9WPhULAieVDoLFSq/Zq0UQjAcjHRN3gyBXrATBcDQMgvlqFQRuthQEqXQ2CC41ajomFg+Cs2Y3CIqpZBBsbVWDoFTZCIJOV8cMh/0gGI0HQVDIF4Mgbuue282eLrGYKJjp5o+Pj4NgZc2CYGOroYtW60GgX4H597/+mV/Q//nnlArK29W0pfyPzYOgvqWX+uOpIEZyJpPK/3w6EwSzsSf0+QrycSHLdhNBMAW8s7HgfH58GgQvLk6EkYIQmhjrnS8WSwHKE2YnY93q1NeNTZe651JBEEuB0Gxe7zOe6BjfFx5Ho7Zg2DkXwNtnQfDw56TJIAOxtUCsmFH+Z2uimHhMj/REQi/lYyKdwUgp7fmij/RSP1nOlcDzuWCYyojXbL6F+FzIKhcL4iNvwDE27KPgonkRBAevDoOgurMBxMRis6mvOyyK6S6sDsjStSxbCL1ovwiCw8PnemIsdWd7l3fFYtWdIOh2xiaDDMTWAjF7IURMPJV8rpBh9ecrqi8RwU59Mwh+vAePrMRZRY4pFErktkAXgxathapBh+/FSThBUIG84nHh2snnlO09VXr9zpBjYMP5jJ/EoSoBsw94l5Spw6HQN5mKvNIpYXarXoeddfUVvxaTQQZibwixsa8sHVMNTqdCRDodlljCUb2mh/wf7nwUBP+5963Qo5S0knDffDEHUPoakvDaSVtJ3vV09VJONGRR8sXSQl+ukuPbFMElc+qzkiuVcyk3D5x1rD/UE2M8HcJZorMGDddyngqC1rnQ58GPHGsyyEDsTSGWy9BMTcZgRK9lUsrANJ3XAtTsb1+mF9NLX/zjb0JNdwGdleEa5Ws6oWtZrvJ/cC6slXMVakg1U92+yGuzUqThsilTxVDTmbDf6z2huOUrj/kRZNmWMDsa6mHSbQtZw764bzbTWROePCaDDMTeEGJxS4iIOzaFojC2nAlQ/WGTo/XSeOtaEOxeeScIPp4q7f/55Rc0SqrQkml1Xj6Nm+OomLx5VRXaRogsBIckLZzruEBMt7qcqixc2XppOO8jXHRAn54Y1Im/8Oyg78GYej60WxIbBz2EncXKZJCB2Fog5nlKzulYzBJfuBGILadoGudK08a+KGaalxJyZf+GxATUifsPH0t5mAu8GStFE6Xg+ts6awUixm4fZM2RDZX/2bRuLJsSPx6fi30G8xiNm9in00ZI4aPalp4PC+4nnRFUNzb0ECiXbZDeNxlkILYWiC0RAHPJVORxP53OorxGN3R2eqCzEsy8YMNCSZ1OZceh6FKpNvCV0nlmb/EQRzN0j02Jex4zL9+Toj4Z6H5qm4KYW29EtMEpBZ4L4S5X4adIUgCXIwQXzsW8kcd4YmIyyEBsPRCzqIhC2ZzfWoLSMZMVVaWKmhRfufoWOoOY5d7334mGkA8TrjqvLHOBZNyGhoTH1oUoL+aoF9uhy6tXLwXB88WjIGhevKJiFFTLJUmCl5crekPdz3lHwsVFp0cHhyDpipTHnjqvk2Pkl5YX6TpNBhmIvSHEhhM9rvu90FYhOsu6DpXVBElkiL9C3dnpVGDxeUekOMsbKG+Xrt5wa2+TslBJ3mz20f10cL+rZurS/jV0yAxUlaDL0/eah3l7cOiVupTJ6/vb6g2/fhAEP/0ohLppXbRUFlQ9T8iahSqoY3oxA7H1QMx1lGbVTXxK+QJTYCpHerE8L4W2ioc/S8rLw3TZrPTzCRJlpVRiLjCm7xNUMxmdVd8WHyXB9XLWY2DnAV7hqFbUWcuRjknEhIhKRl/5dk3VYO53vw6Cl68kpPzw4ICKsYL4WUBabBq5w0Bsze6OdDh10i+rmNVPmv0uOBSPlDc0Fzs8OGJEuyLJBdVuU56oHcwYLv3aaCJFJYbXMQGKw8F3JiVpsVbbxC5yRuVJNVjS/Qy7guqMQrHTk8pRSuvjNDaFow/f2dfnal3Aszo4zqAiBYMnEq7JIAOxtUAsm1W6NqnQxm2PLAVZZSHLn+D+xZG4tyPuizMyXvqJCNPR5FkZ3tBahFOnJW8oiB0dqeQ8v2gx81KwRId5dvSC2RlOKoyRlayu3qgII05osmJ2UC4pWMZ19QxTuVyuRJAzGWQgthaIdQYigv4EBQ8xbelVGD2rwEvlYuSk1LkyNqdCKh7RD0cD5f8At+Em6kQ65eIAWaL7KUiQ9g4yppNOUbjqrBGNXyotyitmdBuJJcNoPtdoqrPi8HV972rEzLzgNtykDq5WqyaDDMTWArHWoBeptTIu6ZpUMGO4tBiFZqRQ2Fe6z/EdJtwYIqGgsbvbwCWllJ6MVKHlAGaplAPOnI7q7vmqGMd+6NOIsbgG6lyIMSd93WoPZWbuj/g4lYjt5OXLQ+yLOrhQzKPwm0LRQGxNHkXmyz5TMBtXRjmdiLgWy3mhZozRyKF5KW4KCF9++3flLehzE8JRxslTKAosTSxMo+GAmVcJlyAoRn50oarlSt+rP/bxFo6pGKfMvBw+oj7OKqGLbtXqeL06ERex7+sNHz54aDLIQGw9EEO0z4RmRbD2iwepr5+8vXU5CK7WNCDerEsbPzwK2yL90vdranmuNVTO7TLzarYk3D07kLh39rQHQzGMY8FXvpimLEyiqKcis2MLsdGyw0UxQk0Sep0B1VhMn7RaqzKw6LOmoMQo0PRiBmJr+Wf/8VPpbA2cEmnGWAvsu1sIbp/fvaX2Cvr4+pEwctJRE/Te++9Zr3vmR6GHn6lT8+I0snr6ytVrGAhVs52cHtEozfAfYp7HwpGlE9zA75FKppE6Q8K0YV6ETabjLQyNDizm4Ie8xv2YDDIQe1MbcGqFZUKBs/DwIKnWShe2guCrR4LGkwOtatzZFYvd/c11AQEl/MmLQ9bC0K/ZKwhFSX6J09Nw1gpD1064hiuVYEGokNViBZnPejE3wWNhIUC1mh3YORdpNnuc7jATDO0rr+jOplhBTAYZiL0hxAqMjRzsUguE9AkN1xmNUgsr4N3P/qrg9gdB8O+vtJhldNZicZmA2e6xGsufM8JW2p+cKZOfH3yja521sUHqfYolEdN2vUwzJR9XPpePdGdT3CY2e4lAxVYymcH9eByRDfca2+x4MHq93jQZZCD2phB7/PCl8q2sdC1QFsaotXo80qs1WRPbCAVffitZ4PiUlVZ2KrLOK19tgLUwgXVMaUNntdvnbEcgQqltlYFGivFcmflammka7i8k+jFWkJA6s7RXsbjeZ06z+RbV4P7+HqcPsIIcmQwyEFtLL/bb32+z0VMFNwU1EkJiKsYOVBYzJkc01NgR6Kp19XQpqq9wveSYubA3CfeAWrFPSAzhYoGwnwdH7uvqo9XriuBarRb72+CZ7LSR8Rd0Z1uRafKL5yoCLwOoP//pT5G52OOn8oMdnRybDDIQWwuLNS4VrdcNvCkL4W4WZwWZfjIfLYGPJLhOk7zdvUTQQC28r+DlEy4RZ6EWRguMkWV8jAuq0z6rnkNn44jpVafdjJhMyiURXG17F85K4vUKzfxqLT/48MPI4HswwNBS3OTGtkwGGYitx6O4kcRFj6mDjgnZ24qxt5tLL0YVZjnIj+HGMpCYVafTsZkLh8LdgJbnoilBcj5p4+5wIku3hkMvMrkLnYRF7CJ59uTx/QVmxdOIbLi/uwtVPQuCb3rfI3cUuLrLDLpoMshAbC0Q6zIScjH0LhHl7BjOpRkCCDuCjjybVMR6BLSePhFnNXtnvCFz6tAlQjkXElOP3aV+2bsAhgoVxRBHTjJP5blgA7dexKexwNBYq4qYPrlzJ3LM/bHWZT89eMFMMNx4yjYZZCC2nk3eUB7C3WPCZSk+46fZEu/EQscMGXWdXXQi27W9ffNKEDx4zH6kONtjuPEzWAE9TxzqsxGci+63gV1kK1zabOsSR6cqFFt0Z8N+VIdPUBbuNuRh7rS6OKl09bsf3w2C6222Fx5EXSImgwzE3hBi1bwE8H4bL8dUoNvIYg60B+yGrVWN3oxtNFZsUDNSnbn7rmS6nYq4pjlocQyKIjs03kDTW8V4n4lo8eBIJHjWGkXk9zmsmgyXnFDXLWmvwtVqZ5iQ77O0LdxMtcCOqWkkys3NGg+KX5kMMhBbC8Q2ckXGuDZP+xNYzGFtsiDWxMKxWLKmrKs687sHTzFssD3UbMDEuQs0RIuLMaYmENH3hFCPUm1KvepNpiylmbBs040YqM5Omoj/YtXPPvs0CLZ3NMJ+9uyQtWDJiJn56EgS/Q8/fM9290a0NxBbD8RWLF3Z21CFFvezqIUUeJjnHZcVK10fq3CFtFfeHrN303lLoy47zd90gCxyMQYE1jyyKf1oOo5sFhpac+MUgUmWtwwZh9nsqn3j5iU2b9TT4Bj4NBH2w01Z93ZUQ3700Z3IRkD37983GWQgthaI9RhazZvICzRllVSBLTIQ211R3gtrDMWM2WHmEEaQSJgtp5FNlogJCnZuaPfFSnELU5OY7vT8OPL3U2r8kZRcLouFY8qyzSZ/tOU8Yla0Wefy9NFjFrsVED/Fj/d+/Imxmq5++/btILh167bJIAOx9Tjt5+xUwybYKTbULVJDFh2BJYue75d11stjNUoHL4Wsyja6H7sHPPyXXrr2lsbTx9VnlKAd1i8PcICwe4a/iuyh3WpROmJCzucEqPffvYUbH0GSP+PiMiUP58uVCn+e6aaOOWc/xp/uibz29vZMBhmIrePffwFZCCl2AyzPIQAAAABJRU5ErkJggg==", vector: [-0.329503,0.198016,0.179885,-0.104113,0.446273,-0.137638,-0.138416,-0.095911,-0.003215,0.125313,0.008291,-0.158620,0.020159,-0.046309,-0.020976,0.018619,-0.105846,-0.167208,-0.033301,-0.107356,0.337221,0.326103,0.092216,-0.112183,-0.007504,-0.040145,-0.063171,0.209154,-0.094790,0.069093,-0.037259,-0.141903,-0.097570,-0.133272,0.008602,0.110253,0.079534,0.177798,-0.088782,0.093459,-0.035046,-0.078308,0.051367,0.062034,0.103668,-0.095114,0.054127,-0.097123,-0.023950,0.000000] },
  { label: "gato #20", category: "Gato", categoryEn: "cat", image: "data:image/png;base64,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", vector: [-0.369941,-0.110734,0.213489,-0.039547,0.155787,-0.353617,0.046192,0.062991,0.048635,0.012168,-0.199439,0.179658,-0.113009,0.334770,-0.225975,0.248197,-0.016641,0.030898,-0.169788,-0.106909,0.081176,0.052510,-0.063321,0.249061,-0.072077,0.050510,0.207150,-0.150218,0.028951,0.125216,0.019548,0.030778,-0.206740,0.189262,-0.051308,0.068551,-0.028334,0.000369,0.088163,-0.139127,0.046641,-0.029260,0.065010,0.004410,-0.055619,-0.045393,0.019196,0.037224,-0.017100,0.000000] },
  { label: "ciervo #21", category: "Ciervo", categoryEn: "deer", image: "data:image/png;base64,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", vector: [0.115605,0.027416,-0.270800,-0.116152,0.380602,0.135541,-0.346343,-0.103469,0.116217,-0.036848,-0.177814,0.224899,-0.295227,-0.159682,-0.123489,-0.025112,-0.061573,-0.166423,-0.182318,0.003022,0.096850,-0.124141,-0.022496,-0.090373,-0.075439,0.132420,0.116044,0.130569,0.052103,-0.142689,-0.070674,-0.014478,0.125104,-0.017318,-0.074186,-0.065796,0.002753,0.027368,-0.000566,0.047541,0.144625,0.037979,-0.093297,-0.219722,-0.060132,-0.182976,-0.026738,0.155007,0.171381,0.000000] },
  { label: "ciervo #22", category: "Ciervo", categoryEn: "deer", image: "data:image/png;base64,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", vector: [-0.248071,-0.165903,0.393231,0.402941,0.152342,0.309666,-0.021768,0.027683,-0.276159,-0.076694,0.103352,0.030389,0.150339,0.223390,-0.124045,-0.001024,0.040760,-0.111196,0.076998,0.319237,0.013417,0.039117,-0.159265,0.053658,0.046143,-0.016434,0.101429,0.131716,0.217298,-0.134107,0.007495,-0.089725,0.049193,-0.045359,-0.031386,0.046102,-0.069738,-0.048679,-0.092944,0.072302,0.024911,0.008327,0.032256,-0.001003,-0.063552,0.034706,-0.005878,0.022058,-0.024680,0.000000] },
  { label: "ciervo #23", category: "Ciervo", categoryEn: "deer", image: "data:image/png;base64,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", vector: [-0.292812,-0.255291,-0.304087,-0.192107,0.188177,-0.016884,0.093554,-0.063711,0.240296,-0.066455,0.272334,0.095294,-0.147165,-0.072744,-0.004818,-0.265853,0.051721,0.104511,0.045651,0.153311,0.001981,-0.068232,-0.246242,-0.063772,-0.060445,-0.018272,0.159467,-0.024935,0.041470,0.158789,0.143276,-0.078439,-0.000815,0.161965,0.156189,-0.186975,-0.150717,0.266278,-0.019805,0.080051,0.017232,-0.072067,0.006664,0.066265,0.077113,0.067659,-0.155783,-0.072045,-0.005780,0.000000] },
  { label: "ciervo #24", category: "Ciervo", categoryEn: "deer", image: "data:image/png;base64,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", vector: [-0.154321,0.226684,0.127538,-0.148978,0.255353,-0.030165,0.333627,0.303841,-0.111583,0.320664,-0.208083,-0.111660,0.101097,0.233540,0.250625,-0.024906,0.068240,0.150255,-0.031946,-0.254131,-0.189587,-0.125284,-0.130379,-0.101186,-0.018056,0.130827,0.032917,0.113042,0.065233,0.033596,-0.180181,0.099485,0.212082,0.032028,-0.001509,0.044289,-0.027410,0.059365,-0.014213,0.100192,0.001144,-0.012121,0.006296,-0.042961,0.005900,0.002971,-0.040330,-0.015891,-0.012530,0.000000] },
  { label: "ciervo #25", category: "Ciervo", categoryEn: "deer", image: "data:image/png;base64,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", vector: [-0.175516,-0.204533,0.004782,-0.030459,0.250720,0.254737,0.037837,0.010639,0.224924,0.221987,-0.062129,-0.265273,0.033636,-0.099932,-0.014593,-0.190752,0.087904,-0.182667,-0.099147,0.112333,0.004086,-0.218903,-0.124804,-0.180030,-0.039789,-0.246956,-0.220729,0.048770,0.148677,0.001512,-0.062599,-0.035161,-0.106568,0.086160,-0.144744,0.044191,0.069126,-0.132368,0.389446,-0.174327,-0.005280,-0.022255,0.105046,0.054620,0.020714,0.019672,0.034756,-0.084952,0.071248,0.000000] },
  { label: "perro #26", category: "Perro", categoryEn: "dog", image: "data:image/png;base64,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", vector: [-0.207694,-0.204596,-0.139599,-0.093775,-0.299578,-0.137428,0.034932,0.045113,-0.326058,-0.147026,-0.125456,-0.195659,0.015672,-0.105620,-0.099611,-0.054374,-0.146191,-0.126030,-0.022836,-0.155141,0.063343,0.216764,-0.062949,0.010906,-0.143394,-0.145528,0.212641,0.161096,-0.051859,0.028734,0.191047,0.134223,0.179409,-0.041863,-0.101895,-0.062663,0.251626,-0.075205,0.015200,-0.083199,-0.087517,-0.077543,0.069598,-0.198200,-0.006431,0.238629,-0.197818,-0.011398,0.048135,0.000000] },
  { label: "perro #27", category: "Perro", categoryEn: "dog", image: "data:image/png;base64,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", vector: [-0.237047,-0.097482,0.344639,-0.192976,-0.408282,-0.054465,-0.072857,-0.149526,0.135202,0.044627,-0.280189,0.123082,0.106552,-0.002074,-0.107286,0.070883,0.024423,-0.074026,-0.063617,0.018578,-0.032913,-0.135999,0.094237,0.108775,0.006143,0.019534,-0.027513,0.088242,0.143288,-0.101409,-0.051547,0.022453,-0.047985,0.019224,-0.008584,-0.206102,-0.029701,0.063241,-0.055277,0.049664,-0.067495,0.237253,-0.025859,-0.083857,0.440085,0.107723,0.117599,-0.040573,0.022740,0.000000] },
  { label: "perro #28", category: "Perro", categoryEn: "dog", image: "data:image/png;base64,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", vector: [-0.058827,-0.307926,0.017584,-0.107054,-0.416008,-0.034215,0.101149,0.016306,-0.262234,-0.074271,0.006565,-0.273931,-0.032847,0.063156,0.015893,-0.331189,-0.033205,-0.146861,-0.113931,0.032765,-0.117786,0.211789,0.087409,0.082131,-0.019504,0.111154,0.182101,0.144045,-0.050921,0.117489,-0.097298,-0.016277,0.079545,0.059020,0.125839,-0.213819,0.024898,-0.064725,0.149714,0.023777,0.059353,0.059472,-0.134196,0.186036,-0.076217,-0.213627,0.167204,-0.001216,-0.001753,0.000000] },
  { label: "perro #29", category: "Perro", categoryEn: "dog", image: "data:image/png;base64,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", vector: [-0.160601,-0.269980,0.392577,0.009756,-0.347069,-0.207896,-0.065004,0.211916,0.156093,-0.047668,-0.078289,0.092695,-0.052027,-0.307271,-0.025248,-0.351322,0.062967,-0.101200,0.038925,-0.028889,-0.016421,-0.103908,-0.017299,0.180343,0.081182,0.040314,-0.144580,-0.077078,-0.064488,0.108275,-0.187528,-0.083394,0.035008,-0.006347,-0.155267,0.179592,0.032217,0.063899,-0.160997,0.025355,0.120362,-0.044203,0.012366,0.015590,-0.083903,0.042971,-0.052333,0.001882,0.021534,0.000000] },
  { label: "perro #30", category: "Perro", categoryEn: "dog", image: "data:image/png;base64,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", vector: [-0.201680,-0.069410,0.201121,-0.034239,-0.325724,-0.284323,-0.259970,0.078802,0.124059,0.218895,-0.091527,-0.090226,0.011045,-0.034246,0.343302,0.065967,0.175094,0.018233,-0.093803,0.281381,-0.101188,0.111960,0.078960,-0.114314,0.033251,-0.010287,0.008749,-0.074266,-0.028622,-0.080354,-0.026753,-0.039923,-0.181495,-0.077074,0.012686,-0.151043,-0.151316,-0.047001,0.014965,0.042887,-0.237444,-0.142566,0.046462,-0.234950,-0.111785,-0.144654,-0.115017,0.008441,-0.039859,0.000000] },
  { label: "rana #31", category: "Rana", categoryEn: "frog", image: "data:image/png;base64,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", vector: [-0.172814,0.249454,0.095797,0.162074,-0.068246,-0.390035,-0.102072,-0.256732,0.053599,-0.020223,0.287682,-0.090433,-0.069002,-0.040349,0.002555,0.011331,-0.330905,-0.197269,0.195864,-0.289137,-0.160836,-0.172553,-0.156040,-0.102639,0.271436,0.026776,0.070884,0.052920,0.108055,-0.107428,-0.083498,-0.032128,-0.118269,0.018615,0.158567,0.003683,0.018668,-0.032593,0.000084,-0.083445,-0.076592,0.039429,-0.034243,0.011233,-0.057613,0.024154,-0.019483,0.057352,0.010174,0.000000] },
  { label: "rana #32", category: "Rana", categoryEn: "frog", image: "data:image/png;base64,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", vector: [-0.097699,0.285970,0.035355,0.342933,0.065646,-0.189894,0.325981,-0.256029,0.036810,-0.323594,-0.102738,-0.130965,-0.063073,-0.104711,-0.095376,0.226484,0.402133,-0.261016,0.170398,0.001651,-0.095410,-0.080672,0.059866,-0.045637,-0.179690,-0.038398,-0.018147,-0.028909,-0.135381,-0.005460,-0.029040,-0.037316,0.109912,0.089005,0.011608,-0.000496,-0.039663,0.017720,0.011460,0.023187,-0.010361,-0.043537,-0.072989,-0.020323,-0.006294,-0.019448,0.012252,-0.040874,-0.013282,0.000000] },
  { label: "rana #33", category: "Rana", categoryEn: "frog", image: "data:image/png;base64,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", vector: [-0.234800,0.324745,0.099219,0.020796,0.291634,-0.022647,0.456563,0.028607,0.086773,-0.106689,-0.007260,0.152381,-0.291072,-0.228044,-0.074521,-0.169620,-0.109450,0.183062,-0.136171,0.142342,-0.009609,0.208879,0.192427,0.077913,0.192945,-0.097001,-0.082493,-0.024986,0.131002,-0.101872,-0.032274,0.191223,0.051905,0.026023,0.047886,-0.015094,-0.009404,-0.101535,-0.000204,-0.008349,-0.064965,-0.034725,-0.073641,-0.015573,-0.009551,0.037199,0.022810,-0.011237,-0.034078,0.000000] },
  { label: "rana #34", category: "Rana", categoryEn: "frog", image: "data:image/png;base64,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", vector: [-0.143022,0.298651,-0.159228,0.229598,-0.018893,-0.164394,0.147401,-0.238560,-0.187768,0.188903,-0.053255,-0.307741,-0.048131,-0.081564,-0.117953,-0.115582,-0.145639,0.209166,-0.067886,0.035648,-0.190072,-0.000532,0.003035,0.128262,-0.091032,-0.056729,-0.149812,-0.101560,-0.065067,-0.110021,0.193582,-0.101661,0.100565,-0.138130,-0.127527,-0.062189,-0.125132,0.154114,-0.050408,-0.123494,0.087795,0.218213,0.276740,0.034414,-0.010374,-0.133581,-0.043913,0.098212,-0.023603,0.000000] },
  { label: "rana #35", category: "Rana", categoryEn: "frog", image: "data:image/png;base64,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", vector: [-0.232949,0.261127,0.081592,0.363857,-0.010394,-0.102306,-0.278157,-0.038438,-0.167471,-0.110275,0.269041,0.108676,0.217030,-0.107517,0.310343,-0.047420,-0.219069,0.135341,-0.130998,-0.060674,0.146975,0.001598,0.029028,-0.071387,-0.253456,-0.134654,0.081526,-0.272733,0.013793,0.060059,-0.104286,-0.020718,0.096804,0.053468,-0.085177,0.007464,-0.078012,-0.056870,0.106812,0.070227,0.088442,0.031160,-0.087892,-0.050208,0.056125,0.043044,0.067769,-0.018164,-0.009416,0.000000] },
  { label: "caballo #36", category: "Caballo", categoryEn: "horse", image: "data:image/png;base64,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", vector: [-0.225086,-0.336272,-0.251930,-0.022626,-0.216218,0.311787,0.263722,0.046536,-0.075714,-0.271201,0.011909,0.087560,0.047499,-0.046547,0.031260,0.148671,-0.068269,0.024043,-0.013137,-0.054269,0.081206,0.086372,0.020456,-0.045856,-0.093131,0.215798,-0.008343,-0.043803,-0.032994,-0.200736,-0.226676,0.087941,-0.131093,-0.242000,0.051585,0.176490,-0.126418,0.144126,0.143697,-0.120864,-0.025529,0.137222,-0.070328,0.053424,-0.010685,-0.022149,-0.190719,-0.114630,0.019332,0.000000] },
  { label: "caballo #37", category: "Caballo", categoryEn: "horse", image: "data:image/png;base64,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", vector: [-0.132390,-0.265701,0.320915,-0.006434,0.112234,0.467497,0.129152,-0.093466,-0.200374,0.205253,0.107359,-0.055515,0.026454,-0.056949,0.059905,0.042740,0.069309,-0.127151,-0.017997,-0.210877,0.185224,0.019389,0.113288,-0.042135,0.276962,0.186212,-0.113147,-0.208394,-0.211460,-0.027336,0.193914,-0.022880,0.022751,0.181838,-0.031625,-0.103139,-0.048262,0.063858,0.055723,0.018001,-0.021656,0.046925,-0.046293,-0.070065,-0.055493,0.076666,0.004965,0.076690,0.011620,0.000000] },
  { label: "caballo #38", category: "Caballo", categoryEn: "horse", image: "data:image/png;base64,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", vector: [-0.289591,-0.243828,-0.389781,-0.009780,-0.002218,0.042876,0.281496,0.015062,0.123731,-0.021344,0.261235,-0.032070,0.031560,0.026185,0.230027,-0.022748,0.220135,0.060657,0.040702,-0.156940,0.094494,-0.037149,-0.050269,0.083355,0.054865,0.032064,0.000021,-0.057810,0.140059,0.049797,0.204263,-0.092387,-0.055265,-0.010493,0.018957,0.107048,0.175340,-0.291899,-0.217811,-0.030049,0.077916,0.135070,-0.024104,-0.156473,0.083726,-0.228780,-0.001683,-0.131179,-0.006212,0.000000] },
  { label: "caballo #39", category: "Caballo", categoryEn: "horse", image: "data:image/png;base64,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", vector: [-0.108938,-0.356146,0.118923,-0.093745,-0.033709,0.445929,0.043182,0.112160,-0.006027,-0.088868,-0.151443,0.182532,-0.221412,0.039725,0.106874,0.233153,-0.365255,-0.031975,0.198589,-0.033233,-0.102508,-0.119562,0.037553,-0.097101,-0.066598,-0.312564,-0.028754,-0.043494,-0.154817,0.012041,-0.103111,-0.008809,0.079525,0.060272,0.039452,-0.108147,0.037427,-0.030241,-0.145881,-0.058839,0.004692,-0.079692,0.096027,0.042423,0.019122,-0.129140,0.018262,-0.013553,-0.088578,0.000000] },
  { label: "caballo #40", category: "Caballo", categoryEn: "horse", image: "data:image/png;base64,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", vector: [-0.331310,-0.274684,-0.490256,-0.206203,-0.127920,0.012768,0.149340,0.084104,0.116712,-0.143580,0.170125,0.021329,0.020791,0.005409,0.110241,-0.039266,0.074149,-0.075436,0.147605,-0.047495,0.021743,0.032243,-0.083366,0.004038,-0.129187,-0.042599,-0.073143,0.054405,0.006617,-0.015782,0.044779,0.213597,-0.073050,-0.077519,-0.037629,0.164395,-0.093858,0.070592,0.007276,0.132903,-0.119602,-0.040576,0.117852,-0.041807,-0.027271,0.061659,0.310227,0.293013,-0.015683,0.000000] },
  { label: "barco #41", category: "Barco", categoryEn: "ship", image: "data:image/png;base64,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", vector: [0.392741,-0.052076,0.297532,-0.383309,0.162580,-0.188236,0.044205,0.012457,-0.301760,-0.153637,0.009217,-0.184283,-0.026352,0.220460,0.005005,-0.204809,0.013347,-0.010703,0.036774,0.078119,0.052416,-0.227265,0.006595,-0.078371,-0.025506,-0.148761,0.016751,-0.175996,0.025373,-0.071032,0.145302,0.138845,-0.096399,-0.139768,-0.087859,0.055094,0.004914,0.113218,-0.082365,-0.100843,-0.020751,-0.070203,-0.228020,0.004603,0.059115,-0.067089,0.010057,0.018295,0.003432,0.000000] },
  { label: "barco #42", category: "Barco", categoryEn: "ship", image: "data:image/png;base64,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", vector: [0.194665,0.225423,-0.137063,-0.398717,-0.157672,-0.132200,0.113588,0.129872,-0.332432,-0.159696,0.303125,-0.022754,-0.170622,-0.068496,0.038238,0.307967,0.094150,0.096101,-0.182481,0.214496,0.069766,-0.097833,-0.085178,-0.060343,0.244546,-0.051996,0.040343,0.132907,-0.111942,0.062641,-0.151127,-0.112629,-0.023547,0.073839,-0.156034,0.010716,0.019945,0.004558,0.016060,0.013566,0.045035,0.068236,0.074546,-0.008156,0.019128,0.041223,0.023050,-0.001383,-0.011840,0.000000] },
  { label: "barco #43", category: "Barco", categoryEn: "ship", image: "data:image/png;base64,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", vector: [0.259580,-0.171235,0.168020,0.117439,-0.092088,0.078827,-0.224813,-0.159983,-0.121407,-0.101060,0.022665,0.137129,-0.204540,0.052480,0.159899,0.042656,0.123214,0.315228,0.245234,-0.224241,-0.167451,0.092797,0.288959,0.067672,0.016440,-0.179556,-0.069936,0.296023,0.212949,0.124438,0.129658,-0.087620,-0.050525,0.096584,-0.081339,0.125299,-0.048163,0.140309,0.152894,0.033469,-0.005822,0.041343,-0.055057,-0.037757,-0.046563,-0.022339,-0.044188,-0.005684,0.050883,0.000000] },
  { label: "barco #44", category: "Barco", categoryEn: "ship", image: "data:image/png;base64,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", vector: [0.375333,-0.109008,0.107351,-0.123772,0.084833,-0.046196,-0.203718,-0.330584,-0.207084,-0.266467,0.024546,0.010032,-0.151407,0.176640,0.100794,-0.237338,-0.002316,-0.011438,-0.245551,-0.023499,0.021097,-0.124276,0.114707,-0.002693,-0.176694,0.222425,-0.166877,0.061019,-0.060007,-0.116371,-0.016246,0.037515,-0.009143,0.162569,0.234252,0.131648,-0.047903,-0.144620,-0.057706,0.025034,-0.027811,-0.058978,0.249588,-0.013293,0.023127,0.069070,-0.016111,-0.064345,-0.040560,0.000000] },
  { label: "barco #45", category: "Barco", categoryEn: "ship", image: "data:image/png;base64,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", vector: [0.314820,-0.134403,0.336295,0.208190,0.104705,0.177750,-0.074128,0.025053,0.040201,0.247073,0.225076,0.045279,-0.119730,-0.396885,-0.048074,0.041080,0.263836,0.136485,-0.083700,-0.150714,-0.138740,0.005062,0.000772,-0.091439,-0.112832,0.088371,0.355544,0.034368,-0.034619,-0.054508,0.002567,0.099307,-0.077297,-0.126706,-0.039319,-0.004165,0.028320,-0.047781,-0.061762,-0.110445,-0.005960,-0.062818,0.074643,0.115014,0.080588,0.016804,0.061082,0.024025,-0.046492,0.000000] },
  { label: "camión #46", category: "Camión", categoryEn: "truck", image: "data:image/png;base64,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", vector: [0.275001,-0.051503,0.036258,-0.046698,0.365522,0.084345,0.175949,-0.321774,0.078941,-0.101843,0.021118,0.234549,0.153391,0.090347,0.097960,-0.020217,-0.144877,-0.175094,-0.051260,0.132604,-0.333194,0.013882,0.041545,0.121930,0.108283,0.094659,0.068112,-0.111004,-0.111764,0.362611,-0.002915,-0.090568,0.032753,-0.259212,-0.064030,0.057873,0.061938,-0.078038,0.107877,0.073151,-0.131544,0.016540,0.040733,-0.014563,0.093098,0.007997,-0.060192,0.058549,0.043523,0.000000] },
  { label: "camión #47", category: "Camión", categoryEn: "truck", image: "data:image/png;base64,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", vector: [0.355848,-0.185173,-0.309684,0.072856,0.072495,0.052736,-0.109024,-0.317416,0.242812,-0.023293,-0.185357,-0.151920,0.229130,-0.054720,0.064984,0.035702,-0.031930,-0.021709,-0.140673,-0.041072,0.052705,0.028432,-0.090279,0.117655,0.137291,0.001868,-0.069446,0.189244,0.034405,0.042825,-0.046959,0.022279,-0.000965,-0.024793,-0.046162,-0.026402,-0.067129,0.012379,0.044788,-0.100955,0.225834,-0.083906,-0.164758,-0.108513,0.023003,0.060131,-0.049406,0.090132,-0.439931,0.000000] },
  { label: "camión #48", category: "Camión", categoryEn: "truck", image: "data:image/png;base64,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", vector: [0.389802,-0.281458,0.250312,0.000633,0.018095,-0.184407,-0.106005,-0.196080,0.121987,-0.082095,-0.067606,-0.126038,-0.206531,0.041754,0.006819,0.149414,0.034501,0.204205,0.235339,0.033304,0.127877,0.316096,-0.360360,-0.116873,0.010236,0.125293,-0.194203,-0.171979,0.092544,0.053461,-0.092954,0.095034,0.119904,-0.042597,-0.022770,-0.095615,0.057700,-0.061619,0.024822,0.027025,0.025602,0.050877,0.026244,0.024705,0.022084,0.000234,0.023746,0.005494,0.044778,0.000000] },
  { label: "camión #49", category: "Camión", categoryEn: "truck", image: "data:image/png;base64,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", vector: [0.317981,-0.185135,-0.324553,0.146606,-0.011544,-0.034377,0.063089,-0.218191,0.173938,-0.044700,-0.149368,-0.090000,0.343624,-0.006463,0.252276,0.122712,-0.059291,0.051199,-0.170619,-0.027306,0.074967,0.081323,-0.018982,0.156027,0.191941,-0.067588,0.076554,0.060238,0.021070,-0.099145,-0.022948,-0.046877,0.153483,0.123652,-0.086094,0.019394,-0.203630,0.022345,-0.192969,-0.197449,-0.094349,-0.192702,-0.019904,0.139300,0.010471,0.014186,0.077488,-0.045152,0.222617,0.000000] },
  { label: "camión #50", category: "Camión", categoryEn: "truck", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAAOx0lEQVR42u2dyY8cdxXHq3rfl+np2TwznvEW23FMQkykgEhAAXFDnLhATnDgH4A/hH8BcUBICHHMhZggO8Emku3YzkzsWezZe3qvql6rmkN9vhVlEOLgPlZf/FR7t9+3vu993/u9Mb/3/vcNwzAMo9NxfCMRT/lGOp31jeHA9Q3XG/qGGRn7xmy16Bu5TNw3MqmIbyzPrfjGrz78hW/sZ7jg337/Z9/47e9+4xvJWMY3nm5+6RtXr6z6hhHj392NE9+Ij7l7Lpn2jZXLV33jL3/6I9d5fMc3avW+bxzUWnzTfsc3zr923jfmz/Oojx8+9Y3jfe7Flwk//+sT/kD/5xNz7BFOngRZxWIBZA0BlOvipeMRW1LppG+0G7ZvVIt46a23rvtGvd70jXuPnvjGfcvivyUFHisFEHrU6flGL8UWq7LkG3aPJ8xcnfWNUjrBWVsHvjGqNUDN5YugL8a9Pv7kX3zXEVvKOR7+5jWAuXzpim9sPfnKN2aK6dCDQohNBWKuy2+UlNsPBnh7IgF/JGImP+eELe4IXvPMiF77dS75Jv+eX4eGkoWKb7zc3fONSyU4a7P+0jc+34M1tpsw1McPo1zIjAuY3D2TBGIFUWdj47FvXMlzTLTMi2JUxcgkzvlGtsSW7LkFSHBx2Td+8qMPfGNnayP0oBBi0/iYN25+l+gLtzWSivSi8vGhA4+kkkDDcYChCyCMbILzlxd5/7/9/i2o6twN3/jrs00gNpmAkTIYeeF4vjFJAYR7MS7oWuxK63/T1GOsVcu+sXfnI+7VgzrLMY72orwfEjnOSheAWDWb940LabY060eQqd0IPSiE2FRYzBQNDQZEg0MxVEpkMVYu5iliNAzgl0pxjOlyjDnB+Oz+P4jr9ggmmzEopmdynYQtFO+TH11dIxrcKnCw1+SC+TbHnLhtwHIBhOZ2QJZbhyh3PZCVzBMWjiNAte9hXFknFzvs8xxbz4lpL64vhh4UQmwqEIvHo8IIYBkp4RoNg/gQT56M2RKcNehDZwsLc75x/Ro09Pj4IVFcC/9PzBOYuW2iytYJEkTpkJuud3eIN98hp4tmoEXDQZBpN4FYUmx4bY1M0PMAy8EeeHz3HSLXw8YhxukpTOeB4qbI2DX4gm3LCT0ohNhUIDZ28e3xmHd7PIZLe2Mc2BgHceVErgizTFxiyImHUShwesbGXRvH4Cg2OyeEcvrzNoHZu1l2zQl9+RGh2sgD4LUm6JtkkUTsLM+TWyXki9qINvHjhtQbHqNu8zaIRIGPa2J4gZ8oOM6VKqEHhRCbCsT6vZ7IC3eNRDBMeV5MEDMVa43GI7EgWzpdqGrvcE/pDApezwF0RTlwTEJKpwoiRIaGJ2lxEIGq6m1blLdLfHj5DWGNC8YzOfgowsGdDMa+d+wbVj6QcbjpMM63iErzKczOcJ2uFXpQCLHp5GJuRhBTaBTB8eKmqcKUJ4yd/WHdCSQo7d94vt/ldAMi8JKIEnUP8qoecLTpcMXOCdmZJVo8uXOfmE3+PxGdTU6hsxfda9CspeeqAcxIjOvUjoHYwOufqTj0TrVLKaY9xpoMvdCDQohNBWITqRNx/VaJYJ8QNYlRMnYjbDEl05kRGMpROrNzhN8uiFmcMrRoqTI1cDg41eeuvQi8ljM4a3GbGLJVBhGDEvHh6lyVe6lgvbeFVlk4bCsWLYG+dl6VdBgqPoT7hr0TVQEAlAoXRiIZCT0ohNhUIJbJmQqWUmKEoSiKXX1TSsjQ1cGGPJldEUWVxaJIMAqOIgP4MT4SeY3YFRvg2y3pfv0kQPhB8S1SOYOs6n4SpP/ypz/3jdttIJG4PhbNvkDTqBMomvnsmbJapwfPGumM6hTSRS01kOiNEXpQCLFXhFigZayuXVZkhTqRk6pQUkUpoUpZQhFjOpXSLn7rlaWcUjmuvNHjtF0x5WsLYpZT5VA5tjy5cME3Ppx5zTeebdLUdE909tETtME9D/h8cIk+DdMkX4vvbqo1RW+MCbnY/Kxk/AEUfNp1VWTngksqYYceFELsFSE2cPCu4zZpiLmAAJ5aooXp+hw+uVgAUIUUW/L5kiCGcyak8JsxkHUjh4x/e+e5b7yfB1CtMXf/vIv/384RVSaP4L5RQYL8G+u+8ekWPSGWolxvE/LKHBCLVho8hmP11DwJVfUs3KIvUt5uQZTVWV4mqwsLoQeFEJuO3DFKqCALarrqktppQGdHzQHv/7QqztIG4+qLSCnTyaXYklaXVLoIoB41Cd6Gh1SmOipqH5uctbPMdf5uqohQ4QkbCfHjwrrYFBo6cboKQammvbQPJL9zujfiW/QDqbMNG+ZjIlN7IO6Lhh4UQmw6uZi89NwCnNVforGhmQEj7oDfsWWQTPUdeelYArjFdcYOgoPXgxpyJ6pDZQFvt3kk8Z8tThQgzA+JTqMruP1hHBpK9lXGUlKWmAePWa8k0Z4nXMpxTEoSjSGIldWIEuvRRVnRWc8f0J//0e27oQeFEJsKxOaq6tObwaVHkgXsLKjpz8zj5CZ5zUQZnJMEEV0Dl64PKJB1zKagEVcFW3UB1xKzQBa9OML+jWXutfptQrW8Wjh6fXjtqQVGHkm4yItMjQSvhZ+tY1SENaclPV9rYQIS3GrC119tPFLtIMzFQohNB2LJFP7m1UhwkioiF+fw9tpwn/d/NqJOWsjLjsAjdhxELOQohw2k1810wcjhHmvB5vvkfS8tmOU0BtLv1p8B1S9AxK9rAKo1qzJ3gZs+aQGNwyZKoGtz5c89K1hLAM92bS1q6WqZzFBLaei2sjocEwvrYiHEprVeTFXb/foLVYvYV2iDtd19ZLorS/MS5WjW7brAJzNPS+1ahUQpW82p2ARVvVAPf20AsqpG0DcCNE7H5FDWU4yDR+BoLgcQ7PNrGLP08Lf6vCgmdfp4//nySI36oCbaFwUr4HQtbhodqNAw5Bax6DD0oBBi01EUpelFVOtytSxlMsbNGl0I5bQGeS3maCnc/ZKFWsOnMFRbFDO3CK/NrZHyRIa4dFud7a7gPF9gS7JJ5To6hNe8JWLRH99Ez3fU6/WJg0QTd8Cs8cV9cRa9jqYWlmajxH5pldRtdUl5ajuZyQYhpBl6UAix6dTF1PiUTZGYTOJJUQs+WSkiJuRzOcWXCRVvOavZQdzYcOhRfLq3TVZ1tKeFnEDM01qYhjqXWpIEux2gcW7ldQ6eIfIcZ3iwN22iuOUBkqDdb5/p/k0oBI0IPiWt3yyolrdjQdM9ASquQkNWfR6hB4UQe0WI5VROziUiWi8G6kbimOVFNMbFIt6ezvK6zxehmMSQ6KtYqSidUc23x6601lObQnEvB3gnoqHIMRAbZBH2Dzpw1oM7n3Gw3gGvLzMQoG6A1UbMDRbC6UWBMVTr8tBQT0gmpTWeKsYFp0cHoQeFEJsKxC6tEtcV1Bw7HOJvJw0QYWtJck/6uVsoiY8morOM5uQQ4C3MQnDtTRot3rt6k2OqpHJ/+JL1++39Y3VAqS6cJZnqrCI2ti5dUsc+Ad6be3BWtscTfqIy30kl+k2EGbYJfBwtCI2q++tKlaRwgR/DsDq7oQeFEJsKxGYLWh0sx4vl1BMVw3i2xSu92yWc25XuXWtAOpa61asF3NXs4dLFCNdZK6OWbO8DH1urNRdmwdHFBRK3Dc3SeXq44xuHEVB8blYtUapn1ZegzuE6+VqpdnJmalYqCXkVS7wEVio86q2VVeWGaCxHh/3Qg0KITQViUbXwxbUWLKUULFZURUmT3OrNrhaF4YotiyQomoQEOxoGldBIq4zSvZZmSW2/2FeBDKiuXybkW8lCJK6yvNvHgKXdBnTxNq+Ft37IeJALwsgttS6vlLl7WYAqFfKqm/Mt1pbp7Kq9pLPrwT3Um4vz4ZLMEGLTgdhSGbE9KeGjp6KVp/JrtVxRMwan1YWsdDYjQTIu5YHMa6zrZCa4/cfP8ORTCenFktbCDFQ7aCKbz8xrYJTyIzvG2yCtBWjvvfsdErc6z2PUuPuNH7whrQZkHe3Ahnc/uwfE1NWcdAHdaiWvzsZwSWYIselALB+b14QaSwv5SbicpqW1YI6qV/yglg1GbOnwrjfRrEWMiZAV01qwLRtPLqdB1oL087E6EucXCd66gmFVq7DLVVC8Y/Bglgceoy3q5iktUoukuWBXfVydbg3Iq9Nyb4tCQ9/lGFsTqAwvnN0RQmw6EFu98C31MtliMS3AL5IobezsKwhsnVmtWdQ83kBWGKgYPQzaKly8fTjRXIJEMLwxrUwwIToba/0mnDUjIWWmQgy56ZIbakWa8fbb76j3nlt4QwWl21Dn5sMHPKE6qcwYF+yo4tzWSORg1lboQSHEXhFi5dUVzROQaK/Wi9wSZFFdY8Tu2h4VLlssNpGiGIwObqsZ6eAEkfBUmkZXMWQw5Kqre12IaQiwI/ldEwaOu1xwVw0buSxU9ezfaJWpq9IP9TzxAzR/p9sSsnh1NGs8z9FpTQMKMCwFwK4XivYhxKbyMU8+3TgDMU9tt45w9N+fgaARGAHoHBscnTaJvo7rpzLw5OPaqaJT7rWsnpATjdqIVakL7LZqGhan+nIEQCUUgsY1odEUi0WjGp8lRSWb1OwClSfS0hi1x9CFDdcNIRZCbDosFpF+GBXETE3yzGpYblQOHMDQdb+e+6aZAyMtJcY51wZQlSXyaqv/tlZH6q+dgLX2gVb0S5nM6W9MDNUcYo173xw193W86kqICXZFtAo7GJ2aTugPW/SSGiaM+n9zFal/cXH+DNZCDwoh9soz7SdnN8XiGvhranD9RFhTW1E0AF0wFtjQWA/NWlQuFpSnpX8YHS2KPNbU0M2HqOWOWkFana7GfetPxgQDt41ghurkzFDiePCEkcSZnqi0jpkpl1RfQ1qpVGi5nJmpahpkIfSgEGLTCRTvbimyip6lKtFZRCyWVGticHBgTLxg+qLwqFHepghFUDNGyrMc1YX7WkWyt0tbxfZLOv+PGhCcNexqQqOjClfvTLtUSn+5Kaq6eUZqSUWACmSTckFtYImzv0tSZBp6UAixV/v8B3zB60NljEDuAAAAAElFTkSuQmCC", vector: [0.402877,-0.071101,-0.135897,-0.029403,0.229460,-0.222972,0.229306,-0.063388,0.035694,0.107445,-0.082351,0.154429,0.252956,0.088151,0.125115,-0.133915,0.052583,-0.063327,0.223329,-0.021580,-0.025306,0.124141,0.087054,0.038508,0.044770,-0.214041,0.122851,-0.014651,-0.167407,-0.250771,-0.095020,0.096595,-0.288407,0.029353,-0.029730,-0.153021,0.055515,-0.035898,0.006013,0.192396,0.250671,0.087626,0.106134,0.012339,-0.076525,0.076896,-0.038759,-0.045269,0.062469,0.000000] }
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
  // CIFAR-10 Images
  'Avión': '#38bdf8',
  'Automóvil': '#f87171',
  'Pájaro': '#a78bfa',
  'Gato': '#fb923c',
  'Ciervo': '#4ade80',
  'Perro': '#fbbf24',
  'Rana': '#34d399',
  'Caballo': '#c084fc',
  'Barco': '#60a5fa',
  'Camión': '#f472b6',
  'Personalizado': '#ffffff'
};

const DATASET_METADATA = {
  bbc_news: {
    id: 'bbc_news',
    name: 'BBC News Classification Dataset (Real)',
    desc: 'Artículos reales de noticias (Greene & Cunningham, 2006), vectorizados con TF-IDF + SVD a 50D.',
    type: 'document'
  },
  glove_words: {
    id: 'glove_words',
    name: 'Stanford GloVe (glove-wiki-gigaword-50, Real)',
    desc: 'Vectores léxicos pre-entrenados reales (Pennington et al., 2014) con relaciones de álgebra semántica (A - B + C = D).',
    type: 'word'
  },
  cifar_images: {
    id: 'cifar_images',
    name: 'CIFAR-10 (Imágenes Reales, Real)',
    desc: 'Imágenes reales de CIFAR-10 (Krizhevsky, 2009). Embeddings reales extraídos con MobileNetV2 preentrenada en ImageNet, reducidos a 50D con PCA.',
    type: 'image'
  },
  imdb_sentiment: {
    id: 'imdb_sentiment',
    name: 'IMDB Reviews Sentiment Dataset (Real)',
    desc: 'Reseñas reales de cine (Maas et al., 2011) con polaridad de sentimiento, vectorizadas con TF-IDF + SVD a 50D.',
    type: 'sentiment'
  }
};

/**
 * Universal Dataset Builder by Type.
 * Los vectores ya vienen pre-computados y normalizados (norma L2 = 1.0) desde datos reales;
 * esta función solo da forma al objeto que consume projection-engine.js / projector-3d.js.
 */
function buildDataset(datasetKey = 'bbc_news') {
  if (datasetKey === 'glove_words') {
    return RAW_GLOVE_WORDS.map((item, idx) => ({
      id: idx,
      word: item.word,
      category: item.category,
      color: CATEGORY_COLORS[item.category] || '#ffffff',
      vector: item.vector,
      isDocument: false
    }));
  }

  if (datasetKey === 'cifar_images') {
    return RAW_CIFAR_IMAGES.map((item, idx) => ({
      id: idx,
      word: item.label,
      category: item.category,
      color: CATEGORY_COLORS[item.category] || '#ffffff',
      vector: item.vector,
      isDocument: false,
      isImage: true,
      image: item.image,
      headline: item.label,
      snippet: `Imagen real de CIFAR-10 — categoría: ${item.category} (${item.categoryEn}). Embedding real extraído con MobileNetV2 (ImageNet) + PCA a 50D.`
    }));
  }

  if (datasetKey === 'imdb_sentiment') {
    return RAW_IMDB_REVIEWS.map((item, idx) => ({
      id: idx,
      word: item.text.slice(0, 36) + '...',
      category: item.sentiment,
      color: CATEGORY_COLORS[item.sentiment] || '#ffffff',
      vector: item.vector,
      isDocument: true,
      headline: item.sentiment === 'Positivo' ? '★ Crítica Positiva' : '✗ Crítica Negativa',
      snippet: item.text
    }));
  }

  // Default: BBC News
  return RAW_BBC_NEWS.map((item, idx) => ({
    id: idx,
    word: item.title,
    category: item.category,
    color: CATEGORY_COLORS[item.category] || '#ffffff',
    vector: item.vector,
    isDocument: true,
    headline: item.title,
    snippet: item.snippet
  }));
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
    this.imageTextureCache = new Map();

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
   * Build (or reuse from cache) a circular, category-colored framed texture for an
   * image data-URI. The colored circle renders immediately; the real photo is drawn
   * on top once it finishes decoding (fast for small base64 PNGs).
   */
  getFramedImageTexture(dataUri, colorHex) {
    if (this.imageTextureCache.has(dataUri)) {
      return this.imageTextureCache.get(dataUri);
    }

    const size = 160;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = colorHex || '#ffffff';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    const img = new Image();
    img.onload = () => {
      const inset = 10;
      const innerSize = size - inset * 2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, innerSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.imageSmoothingEnabled = false; // preserve crisp pixel look of small real images
      ctx.drawImage(img, inset, inset, innerSize, innerSize);
      ctx.restore();
      texture.needsUpdate = true;
    };
    img.src = dataUri;

    this.imageTextureCache.set(dataUri, texture);
    return texture;
  }

  /**
   * Set and render data points with 3D/2D coordinates
   */
  setData(points, coordinates) {
    this.pointsData = points;
    this.currentCoords = coordinates;

    // Clear previous elements
    // Note: THREE.Sprite instances share a single module-level BufferGeometry singleton
    // internally, so it must never be disposed here (it would break every sprite, including
    // future ones) — only dispose geometry that belongs to a regular Mesh (the spheres).
    while (this.nodesGroup.children.length > 0) {
      const obj = this.nodesGroup.children[0];
      if (obj.isMesh && obj.geometry) obj.geometry.dispose();
      this.nodesGroup.remove(obj);
    }
    this.nodeMeshes = [];
    this.labelsContainer.innerHTML = '';

    const sphereGeo = new THREE.SphereGeometry(this.options.pointSize, 16, 16);
    const spriteBaseScale = 6; // multiplier applied over pointSize for image sprites

    points.forEach((p, idx) => {
      const coord = coordinates[idx] || [0, 0, 0];
      const colorHex = parseInt(p.color.replace('#', '0x'), 16);

      let mesh;
      if (p.isImage && p.image) {
        const texture = this.getFramedImageTexture(p.image, p.color);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
        mesh = new THREE.Sprite(spriteMat);
        const s = spriteBaseScale * (this.options.pointSize / 2.5);
        mesh.scale.set(s, s, 1);
        mesh.userData = { id: p.id, word: p.word, category: p.category, color: p.color, index: idx, isSprite: true, baseScale: spriteBaseScale };
      } else {
        const mat = new THREE.MeshStandardMaterial({
          color: colorHex,
          emissive: colorHex,
          emissiveIntensity: 0.35,
          roughness: 0.3,
          metalness: 0.2
        });
        mesh = new THREE.Mesh(sphereGeo, mat);
        mesh.userData = { id: p.id, word: p.word, category: p.category, color: p.color, index: idx };
      }

      mesh.position.set(coord[0], coord[1], coord[2]);

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
      this.nodeMeshes.forEach(m => {
        if (m.userData && m.userData.isSprite) {
          const s = (m.userData.baseScale || 6) * scale;
          m.scale.set(s, s, 1);
        } else {
          m.scale.set(scale, scale, scale);
        }
      });
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
    this.inspectImageBox = document.getElementById('inspect-image-box');
    this.inspectImage = document.getElementById('inspect-image');
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
    const unit = meta.type === 'document' ? 'artículos' : meta.type === 'image' ? 'imágenes' : 'vectores';
    this.pointCountBadge.textContent = `${this.activeDataset.length} ${unit}`;
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

    if (pt.isImage && pt.image && this.inspectImageBox) {
      this.inspectImage.src = pt.image;
      this.inspectImageBox.classList.remove('hidden');
    } else if (this.inspectImageBox) {
      this.inspectImageBox.classList.add('hidden');
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
