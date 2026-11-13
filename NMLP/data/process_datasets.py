import json
import os
import random
import re

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import normalize

RAW = r"C:\Users\cuchu\AppData\Local\Temp\claude\c10c8aa0efd514db\17c484a7-5c31-4f7a-b036-d3ec096098bd\scratchpad\data\raw"
OUT = r"C:\Users\cuchu\AppData\Local\Temp\claude\c10c8aa0efd514db\17c484a7-5c31-4f7a-b036-d3ec096098bd\scratchpad\data\processed"
os.makedirs(OUT, exist_ok=True)
random.seed(42)
np.random.seed(42)

# ---------------------------------------------------------------------------
# 1. GloVe (real, Stanford/Pennington et al. 2014 — glove.6B.50d via gensim-data)
# ---------------------------------------------------------------------------
print("=== GloVe ===")
GLOVE_PATH = os.path.join(RAW, "glove-wiki-gigaword-50")

# Spanish word -> (English GloVe word, category, [secondary english for offset analogy group])
GLOVE_VOCAB = [
    ("rey", "king", "Realeza"), ("reina", "queen", "Realeza"),
    ("príncipe", "prince", "Realeza"), ("princesa", "princess", "Realeza"),
    ("hombre", "man", "Realeza"), ("mujer", "woman", "Realeza"),
    ("españa", "spain", "Geografía"), ("madrid", "madrid", "Geografía"),
    ("francia", "france", "Geografía"), ("parís", "paris", "Geografía"),
    ("italia", "italy", "Geografía"), ("roma", "rome", "Geografía"),
    ("alemania", "germany", "Geografía"), ("berlín", "berlin", "Geografía"),
    ("japón", "japan", "Geografía"), ("tokio", "tokyo", "Geografía"),
    ("computadora", "computer", "Tecnología"), ("software", "software", "Tecnología"),
    ("hardware", "hardware", "Tecnología"), ("algoritmo", "algorithm", "Tecnología"),
    ("inteligencia", "intelligence", "Tecnología"), ("robot", "robot", "Tecnología"),
    ("internet", "internet", "Tecnología"), ("código", "code", "Tecnología"),
    ("servidor", "server", "Tecnología"), ("datos", "data", "Tecnología"),
    ("perro", "dog", "Fauna"), ("gato", "cat", "Fauna"), ("lobo", "wolf", "Fauna"),
    ("león", "lion", "Fauna"), ("tigre", "tiger", "Fauna"), ("elefante", "elephant", "Fauna"),
    ("águila", "eagle", "Fauna"), ("ballena", "whale", "Fauna"),
    ("alegría", "joy", "Emoción"), ("felicidad", "happiness", "Emoción"),
    ("tristeza", "sadness", "Emoción"), ("dolor", "pain", "Emoción"),
    ("amor", "love", "Emoción"), ("ira", "anger", "Emoción"), ("calma", "calm", "Emoción"),
    ("estrella", "star", "Ciencia"), ("planeta", "planet", "Ciencia"),
    ("galaxia", "galaxy", "Ciencia"), ("sol", "sun", "Ciencia"), ("átomo", "atom", "Ciencia"),
    ("gravedad", "gravity", "Ciencia"), ("energía", "energy", "Ciencia"),
    ("manzana", "apple", "Alimento"), ("pan", "bread", "Alimento"),
    ("queso", "cheese", "Alimento"), ("vino", "wine", "Alimento"),
    ("café", "coffee", "Alimento"), ("chocolate", "chocolate", "Alimento"),
]

glove = {}
needed = {eng for _, eng, _ in GLOVE_VOCAB}
with open(GLOVE_PATH, "r", encoding="utf-8") as f:
    first = f.readline()  # header "400000 50"
    for line in f:
        parts = line.rstrip("\n").split(" ")
        w = parts[0]
        if w in needed:
            glove[w] = np.asarray(parts[1:], dtype=np.float32)

print(f"Found {len(glove)}/{len(needed)} words in real GloVe vectors")
missing = needed - set(glove.keys())
if missing:
    print("MISSING:", missing)

glove_out = []
for es, en, cat in GLOVE_VOCAB:
    if en not in glove:
        continue
    vec = normalize(glove[en].reshape(1, -1))[0]
    glove_out.append({"word": es, "wordSource": en, "category": cat, "vector": vec.tolist()})

with open(os.path.join(OUT, "glove_words_real.json"), "w", encoding="utf-8") as f:
    json.dump(glove_out, f, ensure_ascii=False, indent=2)
print(f"Saved {len(glove_out)} real GloVe word vectors")

# Sanity check analogy: king - man + woman ~= queen
def cos(a, b):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-9))

v = glove["king"] - glove["man"] + glove["woman"]
sims = sorted(((w, cos(v, vec)) for w, vec in glove.items() if w not in ("king", "man", "woman")),
              key=lambda x: -x[1])[:3]
print("Analogy check king-man+woman ->", sims)

# ---------------------------------------------------------------------------
# 2. BBC News Classification Dataset (real, Greene & Cunningham 2006)
# ---------------------------------------------------------------------------
print("\n=== BBC News ===")
BBC_DIR = os.path.join(RAW, "bbc-extracted", "bbc")
CAT_MAP = {
    "tech": "Tecnología",
    "business": "Negocios",
    "politics": "Política",
    "sport": "Deportes",
    "entertainment": "Entretenimiento",
}

all_docs = []
for folder, cat_es in CAT_MAP.items():
    folder_path = os.path.join(BBC_DIR, folder)
    files = sorted(os.listdir(folder_path))
    for fname in files:
        with open(os.path.join(folder_path, fname), "r", encoding="latin-1") as f:
            text = f.read().strip()
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        title = lines[0] if lines else fname
        body = " ".join(lines[1:]) if len(lines) > 1 else ""
        all_docs.append({"category": cat_es, "folder": folder, "title": title, "body": body, "full": text})

print(f"Total real BBC articles available: {len(all_docs)}")

# Balanced sample: 7-8 per category (~37 total, matching prior dataset size)
random.shuffle(all_docs)
by_cat = {}
for d in all_docs:
    by_cat.setdefault(d["category"], []).append(d)

sample = []
per_cat = 7
for cat, docs in by_cat.items():
    sample.extend(docs[:per_cat])
# pad to ~37 with extra tech/business
while len(sample) < 37:
    for cat in ("Tecnología", "Negocios"):
        extra = by_cat[cat][per_cat + (len(sample) - 35)]
        sample.append(extra)
        if len(sample) >= 37:
            break

print(f"Sampled {len(sample)} real articles for the projector")

# Vectorize ALL real docs with TF-IDF+SVD (fit on full corpus for a meaningful space),
# then keep only the sampled subset's vectors.
texts_all = [d["full"] for d in all_docs]
tfidf = TfidfVectorizer(max_features=20000, stop_words="english")
X = tfidf.fit_transform(texts_all)
svd = TruncatedSVD(n_components=50, random_state=42)
dense_all = svd.fit_transform(X)
dense_all = normalize(dense_all)
print("BBC explained variance (50D):", round(float(svd.explained_variance_ratio_.sum()), 4))

idx_map = {id(d): i for i, d in enumerate(all_docs)}
bbc_out = []
for d in sample:
    i = idx_map[id(d)]
    vec = dense_all[i]
    bbc_out.append({
        "title": d["title"][:90],
        "category": d["category"],
        "snippet": (d["body"][:260] + "...") if len(d["body"]) > 260 else d["body"],
        "vector": vec.tolist(),
    })

with open(os.path.join(OUT, "bbc_news_real.json"), "w", encoding="utf-8") as f:
    json.dump(bbc_out, f, ensure_ascii=False, indent=2)
print(f"Saved {len(bbc_out)} real BBC News document vectors")

# ---------------------------------------------------------------------------
# 3. IMDB 50K Movie Reviews (real, Maas et al. 2011, via HF datasets-server mirror)
# ---------------------------------------------------------------------------
print("\n=== IMDB ===")
with open(os.path.join(RAW, "imdb_sample_raw.json"), encoding="utf-8") as f:
    neg_raw = json.load(f)["rows"]
with open(os.path.join(RAW, "imdb_pos_raw.json"), encoding="utf-8") as f:
    pos_raw = json.load(f)["rows"]

neg_reviews = [r["row"]["text"] for r in neg_raw if r["row"]["label"] == 0][:9]
pos_reviews = [r["row"]["text"] for r in pos_raw if r["row"]["label"] == 1][:9]
print(f"neg={len(neg_reviews)} pos={len(pos_reviews)}")

imdb_texts = neg_reviews + pos_reviews
imdb_labels = (["Negativo"] * len(neg_reviews)) + (["Positivo"] * len(pos_reviews))

tfidf2 = TfidfVectorizer(max_features=20000, stop_words="english")
X2 = tfidf2.fit_transform(imdb_texts)
n_components = min(50, X2.shape[0] - 1, X2.shape[1] - 1)
svd2 = TruncatedSVD(n_components=n_components, random_state=42)
dense2 = svd2.fit_transform(X2)
if n_components < 50:
    pad = np.zeros((dense2.shape[0], 50 - n_components))
    dense2 = np.hstack([dense2, pad])
dense2 = normalize(dense2)

imdb_out = []
for text, label, vec in zip(imdb_texts, imdb_labels, dense2):
    clean = re.sub(r"<br\s*/?>", " ", text).strip()
    imdb_out.append({
        "text": clean[:300] + ("..." if len(clean) > 300 else ""),
        "sentiment": label,
        "vector": vec.tolist(),
    })

with open(os.path.join(OUT, "imdb_reviews_real.json"), "w", encoding="utf-8") as f:
    json.dump(imdb_out, f, ensure_ascii=False, indent=2)
print(f"Saved {len(imdb_out)} real IMDB review vectors")

print("\nDONE.")
