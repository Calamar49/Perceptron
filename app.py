"""
Simulador del Perceptron — Streamlit
Ejecuta la clase Perceptron real (NumPy puro, sin scikit-learn) en vivo.

Correr localmente:  streamlit run app.py
Desplegar:          share.streamlit.io (Community Cloud), apuntando a este
                     repo + este archivo.
"""

import matplotlib.pyplot as plt
import numpy as np
import streamlit as st

st.set_page_config(page_title="Simulador del Perceptrón", page_icon="🧠", layout="wide")

COLOR_C0, COLOR_C1, COLOR_ACCENT, COLOR_DIM, COLOR_INK = (
    "#1a5fb4", "#c1440e", "#0a8f78", "#e4dcc7", "#211d15",
)
plt.rcParams["figure.facecolor"] = "#fffdf8"
plt.rcParams["axes.facecolor"] = "#fffdf8"
plt.rcParams["font.family"] = "monospace"

st.markdown(
    """
    <style>
    .stApp { background-color: #f5f1e8; }
    h1, h2, h3, .stMarkdown code { font-family: 'Courier New', monospace; }
    .eyebrow { font-family: 'Courier New', monospace; font-size: .8rem; letter-spacing: .09em;
               text-transform: uppercase; color: #0a8f78; margin-bottom: 4px; }
    .eq-card { background: #fffdf8; border: 1px solid #d9d0bd; border-radius: 10px;
               padding: 14px 16px; }
    .eq-card .eq-label { font-family: 'Courier New', monospace; font-size: .7rem;
                          letter-spacing: .05em; text-transform: uppercase; color: #6f6858;
                          margin-bottom: 8px; }
    .eq-card .eq { font-family: 'Courier New', monospace; font-weight: 700; font-size: .95rem;
                    color: #211d15; }
    .readout { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
               background: #d9d0bd; border: 1px solid #d9d0bd; border-radius: 10px;
               overflow: hidden; margin-top: 8px; }
    .readout .cell { background: #fffdf8; padding: 12px 14px; }
    .readout .cell .k { font-size: .68rem; letter-spacing: .05em; text-transform: uppercase;
                         color: #6f6858; font-family: 'Courier New', monospace; }
    .readout .cell .v { font-family: 'Courier New', monospace; font-size: 1.25rem;
                         font-weight: 700; margin-top: 3px; color: #211d15; }
    .live-eq { margin-top: 10px; padding: 12px 16px; background: #ece6d8; border-radius: 10px; }
    .live-eq .tag { font-family: 'Courier New', monospace; font-size: .68rem; letter-spacing: .05em;
                     text-transform: uppercase; color: #6f6858; margin-bottom: 6px; }
    .live-eq .eq { font-family: 'Courier New', monospace; font-size: 1rem; color: #211d15; }
    .verdict { margin-top: 10px; padding: 12px 18px; border-radius: 10px; border-left: 4px solid #0a8f78;
               background: #fffdf8; }
    .verdict.fail { border-left-color: #c1440e; }
    .verdict .tag { font-family: 'Courier New', monospace; font-weight: 700; font-size: .8rem;
                     letter-spacing: .03em; text-transform: uppercase; color: #0a8f78; }
    .verdict.fail .tag { color: #c1440e; }
    .verdict p { margin: 6px 0 0; color: #211d15; }
    </style>
    """,
    unsafe_allow_html=True,
)


# ------------------------------------------------------------------ MODELO
class Perceptron:
    """Perceptron de Rosenblatt, implementado unicamente con NumPy."""

    def __init__(self, input_size, learning_rate=0.1, epochs=100):
        self.lr = learning_rate
        self.epochs = epochs
        self.weights = np.zeros(input_size)
        self.bias = 0.0
        self.history = []  # snapshot de (epoca, pesos, bias, errores) por epoca

    def activation_function(self, z):
        return 1 if z >= 0 else 0

    def predict(self, x):
        z = np.dot(x, self.weights) + self.bias
        return self.activation_function(z)

    def fit(self, X, y):
        self.history = [(0, self.weights.copy(), self.bias, None)]
        converged_at = None
        for epoch in range(1, self.epochs + 1):
            total_errors = 0
            for xi, target in zip(X, y):
                prediction = self.predict(xi)
                error = target - prediction
                if error != 0:
                    self.weights = self.weights + self.lr * error * xi
                    self.bias = self.bias + self.lr * error
                    total_errors += 1
            self.history.append((epoch, self.weights.copy(), self.bias, total_errors))
            if total_errors == 0 and converged_at is None:
                converged_at = epoch
                break
        self.converged_at = converged_at
        return self


GATES = {
    "AND": np.array([0, 0, 0, 1]),
    "OR": np.array([0, 1, 1, 1]),
    "XOR": np.array([0, 1, 1, 0]),
    "NAND": np.array([1, 1, 1, 0]),
}
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])


@st.cache_data
def entrenar(gate_name, lr, max_epochs):
    y = GATES[gate_name]
    p = Perceptron(input_size=2, learning_rate=lr, epochs=max_epochs)
    p.fit(X, y)
    return p.history, p.converged_at


def _style_axes(ax, titulo):
    ax.set_title(titulo, fontsize=12, fontweight="bold", color=COLOR_INK, pad=10)
    ax.tick_params(colors=COLOR_INK, labelsize=9)
    for spine in ax.spines.values():
        spine.set_color("#d9d0bd")
    ax.xaxis.label.set_color(COLOR_INK)
    ax.yaxis.label.set_color(COLOR_INK)


def graficar_frontera(snapshot, y, ax):
    _, w, b, _ = snapshot
    for clase, color, marcador in [(0, COLOR_C0, "o"), (1, COLOR_C1, "s")]:
        mascara = y == clase
        ax.scatter(X[mascara, 0], X[mascara, 1], c=color, marker=marcador,
                   s=260, edgecolors="white", linewidths=2, zorder=3, label=f"clase {clase}")
    x1_vals = np.linspace(-0.5, 1.5, 100)
    if abs(w[1]) > 1e-9:
        ax.plot(x1_vals, -(w[0] * x1_vals + b) / w[1], "--", color=COLOR_ACCENT, linewidth=2.5)
    elif abs(w[0]) > 1e-9:
        ax.axvline(-b / w[0], linestyle="--", color=COLOR_ACCENT, linewidth=2.5)
    ax.set_xlim(-0.5, 1.5); ax.set_ylim(-0.5, 1.5)
    ax.set_xlabel("x1"); ax.set_ylabel("x2")
    _style_axes(ax, "Frontera de decisión")
    ax.grid(alpha=0.2, color="#d9d0bd")
    leg = ax.legend(loc="upper left", bbox_to_anchor=(1.02, 1), frameon=False)
    for text in leg.get_texts():
        text.set_color(COLOR_INK)


def graficar_convergencia(history, epoca_actual, ax):
    epocas = [h[0] for h in history[1:]]
    errores = [h[3] for h in history[1:]]
    ax.fill_between(epocas, errores, step="mid", color=COLOR_DIM, alpha=0.7)
    ax.plot(epocas, errores, drawstyle="steps-mid", color=COLOR_INK, linewidth=1.2)
    if epoca_actual in epocas:
        idx = epocas.index(epoca_actual)
        ax.scatter([epoca_actual], [errores[idx]], color=COLOR_ACCENT, s=70, zorder=5,
                   edgecolors="white", linewidths=1.5)
    ax.set_xlabel("Época"); ax.set_ylabel("Errores")
    ax.set_ylim(0, max(4, max(errores) if errores else 4))
    _style_axes(ax, "Convergencia — errores por época")
    ax.grid(alpha=0.2, axis="y", color="#d9d0bd")


# ------------------------------------------------------------------ UI
st.markdown('<p class="eyebrow">ROSENBLATT · 1958 · MARK I PERCEPTRON</p>', unsafe_allow_html=True)
st.title("🧠 Simulador del Perceptrón")
st.caption("La misma clase `Perceptron` en NumPy del notebook, corriendo en vivo.")

with st.expander("📐 El modelo matemático", expanded=False):
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown(
            '<div class="eq-card"><div class="eq-label">Suma ponderada</div>'
            '<div class="eq">z = w₁x₁ + w₂x₂ + b</div></div>', unsafe_allow_html=True)
    with col2:
        st.markdown(
            '<div class="eq-card"><div class="eq-label">Activación (escalón)</div>'
            '<div class="eq">ŷ = 1 si z≥0, si no 0</div></div>', unsafe_allow_html=True)
    with col3:
        st.markdown(
            '<div class="eq-card"><div class="eq-label">Regla de aprendizaje</div>'
            '<div class="eq">w += η·e·x &nbsp;|&nbsp; b += η·e</div></div>', unsafe_allow_html=True)

st.divider()

c1, c2, c3 = st.columns(3)
gate = c1.radio("Compuerta lógica", list(GATES.keys()), horizontal=True)
lr = c2.select_slider("Tasa de aprendizaje (η)", options=[0.01, 0.05, 0.1, 0.2, 0.5], value=0.1)
max_epochs = c3.number_input("Épocas máx.", min_value=5, max_value=300, value=100, step=5)

history, converged_at = entrenar(gate, lr, max_epochs)
total_epocas = len(history) - 1

epoca_idx = st.slider("Época", min_value=0, max_value=total_epocas, value=total_epocas)
snapshot = history[epoca_idx]
_, w, b, errores = snapshot

col_a, col_b = st.columns(2)
with col_a:
    fig1, ax1 = plt.subplots(figsize=(4.2, 4.2))
    graficar_frontera(snapshot, GATES[gate], ax1)
    st.pyplot(fig1, clear_figure=True)
with col_b:
    fig2, ax2 = plt.subplots(figsize=(4.6, 4.2))
    graficar_convergencia(history, epoca_idx, ax2)
    st.pyplot(fig2, clear_figure=True)

errores_txt = "–" if errores is None else str(errores)
st.markdown(
    f"""
    <div class="readout">
      <div class="cell"><div class="k">Peso w₁</div><div class="v">{w[0]:.2f}</div></div>
      <div class="cell"><div class="k">Peso w₂</div><div class="v">{w[1]:.2f}</div></div>
      <div class="cell"><div class="k">Sesgo b</div><div class="v">{b:.2f}</div></div>
      <div class="cell"><div class="k">Errores esta época</div><div class="v">{errores_txt}</div></div>
    </div>
    """,
    unsafe_allow_html=True,
)

st.markdown(
    f"""
    <div class="live-eq">
      <div class="tag">Ecuación con los pesos actuales</div>
      <div class="eq">z = {w[0]:.2f}·x1 + {w[1]:.2f}·x2 + ({b:.2f})</div>
    </div>
    """,
    unsafe_allow_html=True,
)

if converged_at is not None and epoca_idx >= converged_at:
    st.markdown(
        f'<div class="verdict ok"><div class="tag">✓ Convergió</div>'
        f'<p>El Perceptrón encontró una frontera que separa las dos clases sin errores en la época '
        f'<strong>{converged_at}</strong>. La compuerta <strong>{gate}</strong> es linealmente separable.</p></div>',
        unsafe_allow_html=True,
    )
elif epoca_idx == total_epocas and converged_at is None:
    st.markdown(
        f'<div class="verdict fail"><div class="tag">✕ No converge</div>'
        f'<p>Tras <strong>{max_epochs}</strong> épocas, el error sigue sin llegar a cero '
        f'(quedó en {errores}). <strong>{gate}</strong> no es linealmente separable — no existe ninguna '
        'recta que separe sus dos clases, por eso el Perceptrón simple oscila indefinidamente en vez de converger.</p></div>',
        unsafe_allow_html=True,
    )
else:
    st.markdown(
        f'<div class="verdict ok"><div class="tag">⏳ Entrenando…</div>'
        f'<p>Época <strong>{epoca_idx}</strong> de {max_epochs} — {errores} error(es) en esta pasada.</p></div>',
        unsafe_allow_html=True,
    )

st.divider()
st.markdown(f"### Efecto de la tasa de aprendizaje — {gate}")
filas = []
for lr_cmp in [0.1, 0.01]:
    hist_cmp, conv_cmp = entrenar(gate, lr_cmp, 300)
    ultima = hist_cmp[-1]
    filas.append({
        "η": lr_cmp,
        "Épocas hasta converger": conv_cmp if conv_cmp is not None else "> 300 (no converge)",
        "w1": round(ultima[1][0], 2),
        "w2": round(ultima[1][1], 2),
        "bias": round(ultima[2], 2),
    })
st.table(filas)

st.caption("Mismo algoritmo que `ANALISIS_PERCEPTRON.ipynb` — Taller de Inteligencia Artificial, Perceptrón de Rosenblatt.")
