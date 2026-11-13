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
 * Generado por docs/notebooks/ (01_glove_embeddings_exploracion.ipynb,
 * 02_bbc_imdb_datasets_exploracion.ipynb). Ningún vector en este archivo es sintético.
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
