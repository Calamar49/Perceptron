import base64
import io
import json
import os
import random

import numpy as np
from PIL import Image

os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "3")
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input
from sklearn.decomposition import PCA
from sklearn.preprocessing import normalize

random.seed(42)
np.random.seed(42)
tf.random.set_seed(42)

OUT = r"C:\Users\cuchu\AppData\Local\Temp\claude\c10c8aa0efd514db\17c484a7-5c31-4f7a-b036-d3ec096098bd\scratchpad\data\processed"
os.makedirs(OUT, exist_ok=True)

print("Downloading / loading CIFAR-10 (Krizhevsky, 2009, real dataset)...")
(_, _), (x_test, y_test) = tf.keras.datasets.cifar10.load_data()
print("CIFAR-10 test set shape:", x_test.shape, y_test.shape)

CLASSES_EN = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]
CLASSES_ES = ["avión", "automóvil", "pájaro", "gato", "ciervo", "perro", "rana", "caballo", "barco", "camión"]

PER_CLASS = 5
y_flat = y_test.flatten()
selected_idx = []
for cls in range(10):
    idxs = np.where(y_flat == cls)[0]
    rng = np.random.RandomState(42 + cls)
    chosen = rng.choice(idxs, size=PER_CLASS, replace=False)
    selected_idx.extend(chosen.tolist())

print(f"Selected {len(selected_idx)} real CIFAR-10 images ({PER_CLASS} per class)")

images = x_test[selected_idx]  # (N, 32, 32, 3) uint8
labels = y_flat[selected_idx]

print("Building MobileNetV2 (ImageNet pretrained, real CNN features)...")
model = MobileNetV2(weights="imagenet", include_top=False, pooling="avg", input_shape=(96, 96, 3))

# Resize 32x32 -> 96x96 (MobileNetV2 minimum) and preprocess
resized = tf.image.resize(images.astype("float32"), (96, 96)).numpy()
batch = preprocess_input(resized.copy())

print("Extracting real pretrained embeddings (1280-D)...")
features = model.predict(batch, verbose=0)
print("Feature shape:", features.shape)

print("Reducing to 50D with real PCA...")
n_components = min(50, features.shape[0] - 1)
pca = PCA(n_components=n_components, random_state=42)
reduced = pca.fit_transform(features)
if n_components < 50:
    pad = np.zeros((reduced.shape[0], 50 - n_components))
    reduced = np.hstack([reduced, pad])
reduced = normalize(reduced)
print("Explained variance (sum):", round(float(pca.explained_variance_ratio_.sum()), 4))


def to_base64_png(img_array, size=96):
    img = Image.fromarray(img_array.astype("uint8"))
    img = img.resize((size, size), Image.NEAREST)
    buf = io.BytesIO()
    img.save(buf, format="PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


out_records = []
for i, idx in enumerate(selected_idx):
    cls = int(labels[i])
    out_records.append({
        "label": f"{CLASSES_ES[cls]} #{i+1}",
        "category": CLASSES_ES[cls].capitalize(),
        "categoryEn": CLASSES_EN[cls],
        "image": to_base64_png(images[i]),
        "vector": reduced[i].tolist(),
    })

with open(os.path.join(OUT, "cifar10_images_real.json"), "w", encoding="utf-8") as f:
    json.dump(out_records, f, ensure_ascii=False)

total_b64_kb = sum(len(r["image"]) for r in out_records) / 1024
print(f"Saved {len(out_records)} real CIFAR-10 image embeddings. Total base64 size: {total_b64_kb:.1f} KB")

# Quick sanity check: same-class images should be closer than cross-class on average
def cos(a, b):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-9))

same_sims, diff_sims = [], []
for i in range(len(out_records)):
    for j in range(i + 1, len(out_records)):
        s = cos(np.array(out_records[i]["vector"]), np.array(out_records[j]["vector"]))
        if out_records[i]["categoryEn"] == out_records[j]["categoryEn"]:
            same_sims.append(s)
        else:
            diff_sims.append(s)

print(f"Avg cosine same-class: {np.mean(same_sims):.4f} | cross-class: {np.mean(diff_sims):.4f}")
print("DONE.")
