"""
Simulador del Perceptron — Streamlit
Ejecuta la clase Perceptron real (NumPy puro, sin scikit-learn) en vivo.

Correr localmente:  streamlit run app.py
Desplegar:          share.streamlit.io (Community Cloud), apuntando a este
                     repo + este archivo.
"""

import time

import matplotlib.pyplot as plt
import numpy as np
import streamlit as st

# layout="wide" para que quepan los dos graficos (frontera + convergencia) lado a lado
st.set_page_config(page_title="Simulador del Perceptrón", page_icon="🧠", layout="wide")

# Paleta de colores propia (no el tema por defecto de Streamlit), reutilizada tambien
# en el notebook y en la version Gradio para que los tres luzcan iguales.
COLOR_C0, COLOR_C1, COLOR_ACCENT, COLOR_DIM, COLOR_INK = (
    "#1a5fb4", "#c1440e", "#0a8f78", "#e4dcc7", "#211d15",
)
plt.rcParams["figure.facecolor"] = "#fffdf8"
plt.rcParams["axes.facecolor"] = "#fffdf8"
plt.rcParams["font.family"] = "monospace"

# ------------------------------------------------------------ ESTILO (CSS a medida)
# Streamlit no permite personalizar tanto el diseño desde Python puro, asi que se
# inyecta CSS crudo con st.markdown(..., unsafe_allow_html=True). Cada clase de aca
# abajo se usa mas adelante en algun st.markdown con HTML (tabla de verdad, tarjetas
# de ecuaciones, el panel de "readout" con los pesos, etc).
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
    .gate-math { display: flex; gap: 16px; align-items: center; flex-wrap: wrap;
                 background: #ece6d8; border-radius: 10px; padding: 14px 18px; margin: 10px 0 2px; }
    .gate-math .simbolo { font-family: 'Courier New', monospace; font-weight: 700; font-size: 1.1rem;
                           color: #0a8f78; }
    .gate-math .nota { font-family: 'Courier New', monospace; font-size: .8rem; color: #6f6858; flex: 1; min-width: 220px; }
    .tabla-verdad { border-collapse: collapse; font-family: 'Courier New', monospace; font-size: .85rem; }
    .tabla-verdad th, .tabla-verdad td { border: 1px solid #d9d0bd; padding: 4px 12px; text-align: center; }
    .tabla-verdad th { background: #0a8f78; color: #fffdf8; }
    .tabla-verdad td.uno { color: #c1440e; font-weight: 700; }
    .tabla-verdad td.cero { color: #1a5fb4; font-weight: 700; }
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
        self.weights = np.zeros(input_size)  # arranca en w=[0, 0]
        self.bias = 0.0
        self.history = []  # snapshot de (epoca, pesos, bias, errores) por epoca

    def activation_function(self, z):
        # Funcion escalon (Heaviside): 1 si z>=0, si no 0. Es lo que hace que el
        # Perceptron sea un clasificador BINARIO y su frontera sea siempre una recta.
        return 1 if z >= 0 else 0

    def predict(self, x):
        # z = w1*x1 + w2*x2 + b  (combinacion lineal de las entradas)
        z = np.dot(x, self.weights) + self.bias
        return self.activation_function(z)

    def fit(self, X, y):
        # epoca 0 = estado inicial (pesos en cero), antes de aprender nada
        self.history = [(0, self.weights.copy(), self.bias, None)]
        converged_at = None
        for epoch in range(1, self.epochs + 1):
            total_errors = 0
            for xi, target in zip(X, y):
                prediction = self.predict(xi)
                error = target - prediction  # -1, 0 o +1
                if error != 0:
                    # Regla de aprendizaje del Perceptron:
                    # w += lr * error * x   y   b += lr * error
                    # Si predijo de mas, resta un poco de x a los pesos; si predijo
                    # de menos, le suma. Si acerto (error=0), no toca nada.
                    self.weights = self.weights + self.lr * error * xi
                    self.bias = self.bias + self.lr * error
                    total_errors += 1
            # se guarda una "foto" de los pesos al final de cada epoca, para poder
            # despues recorrerlas una por una en el slider / la animacion
            self.history.append((epoch, self.weights.copy(), self.bias, total_errors))
            if total_errors == 0 and converged_at is None:
                # 0 errores en una pasada completa por los 4 ejemplos = convergio
                converged_at = epoch
                break  # no hace falta seguir entrenando, ya encontro una solucion
        self.converged_at = converged_at
        return self


# Las compuertas logicas a simular, como tabla de verdad (mismo orden que X abajo:
# (0,0), (0,1), (1,0), (1,1)). AND/OR son linealmente separables, XOR no.
GATES = {
    "AND": np.array([0, 0, 0, 1]),
    "OR": np.array([0, 1, 1, 1]),
    "XOR": np.array([0, 1, 1, 0]),
}

# Texto de apoyo (expresion booleana + nota de separabilidad) que se muestra junto
# a la tabla de verdad de la compuerta elegida.
GATES_INFO = {
    "AND": {"simbolo": "y = x₁ ∧ x₂", "nota": "1 solo si ambas entradas son 1. Linealmente separable."},
    "OR": {"simbolo": "y = x₁ ∨ x₂", "nota": "1 si al menos una entrada es 1. Linealmente separable."},
    "XOR": {"simbolo": "y = x₁ ⊕ x₂", "nota": "1 solo si las entradas son distintas. NO es linealmente separable."},
}
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])  # las 4 combinaciones de entrada binaria


@st.cache_data
def entrenar(gate_name, lr, max_epochs):
    # @st.cache_data evita re-entrenar si ya se pidio esta misma combinacion
    # (compuerta, tasa de aprendizaje, epocas maximas) antes en la sesion.
    y = GATES[gate_name]
    p = Perceptron(input_size=2, learning_rate=lr, epochs=max_epochs)
    p.fit(X, y)
    return p.history, p.converged_at


def _style_axes(ax, titulo):
    # Aplica el mismo look (colores, tipografia) a cualquier grafico de matplotlib
    # para que combine con el resto de la pagina en vez de verse "por defecto".
    ax.set_title(titulo, fontsize=12, fontweight="bold", color=COLOR_INK, pad=10)
    ax.tick_params(colors=COLOR_INK, labelsize=9)
    for spine in ax.spines.values():
        spine.set_color("#d9d0bd")
    ax.xaxis.label.set_color(COLOR_INK)
    ax.yaxis.label.set_color(COLOR_INK)


def graficar_frontera(snapshot, y, ax):
    """Dibuja los 4 puntos (x1, x2) coloreados por clase, mas la recta
    w1*x1 + w2*x2 + b = 0 (despejada en funcion de x2) para los pesos de esa epoca."""
    _, w, b, _ = snapshot
    for clase, color, marcador in [(0, COLOR_C0, "o"), (1, COLOR_C1, "s")]:
        mascara = y == clase
        ax.scatter(X[mascara, 0], X[mascara, 1], c=color, marker=marcador,
                   s=260, edgecolors="white", linewidths=2, zorder=3, label=f"clase {clase}")
    x1_vals = np.linspace(-0.5, 1.5, 100)
    if abs(w[1]) > 1e-9:
        # caso normal: despejar x2 = -(w1*x1 + b) / w2 y graficar la recta
        ax.plot(x1_vals, -(w[0] * x1_vals + b) / w[1], "--", color=COLOR_ACCENT, linewidth=2.5)
    elif abs(w[0]) > 1e-9:
        # si w2 es (casi) cero, la ecuacion normal de la recta no se puede despejar
        # (division por cero) — la frontera es en realidad una linea VERTICAL en
        # x1 = -b/w1 (es justo lo que pasa con XOR en algunas epocas)
        ax.axvline(-b / w[0], linestyle="--", color=COLOR_ACCENT, linewidth=2.5)
    # si tanto w1 como w2 son cero (epoca 0, antes de aprender nada) no se dibuja
    # ninguna recta todavia — no hay frontera definida sin pesos.
    ax.set_xlim(-0.5, 1.5); ax.set_ylim(-0.5, 1.5)
    ax.set_xlabel("x1"); ax.set_ylabel("x2")
    _style_axes(ax, "Frontera de decisión")
    ax.grid(alpha=0.2, color="#d9d0bd")
    leg = ax.legend(loc="upper left", bbox_to_anchor=(1.02, 1), frameon=False)
    for text in leg.get_texts():
        text.set_color(COLOR_INK)


def graficar_convergencia(history, epoca_actual, ax):
    """Grafico de escalones (no barras) del numero de errores por epoca. Se usa
    fill_between/steps-mid en vez de ax.bar() porque con muchas epocas finas, las
    barras generaban un patron de rayas por moire al renderizar (bug ya corregido)."""
    epocas = [h[0] for h in history[1:]]
    errores = [h[3] for h in history[1:]]
    ax.fill_between(epocas, errores, step="mid", color=COLOR_DIM, alpha=0.7)
    ax.plot(epocas, errores, drawstyle="steps-mid", color=COLOR_INK, linewidth=1.2)
    if epoca_actual in epocas:
        # marca con un punto la epoca que se esta mostrando ahora mismo
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

# Panel plegable con las 3 formulas base del modelo (siempre las mismas,
# no dependen de la compuerta elegida).
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

# Controles principales: que compuerta, que tasa de aprendizaje, cuantas epocas
# maximas entrenar. Cambiar cualquiera de estos dispara un rerun de todo el script
# (asi funciona Streamlit) y por lo tanto un nuevo entrenamiento (o uno cacheado).
c1, c2, c3 = st.columns(3)
gate = c1.radio("Compuerta lógica", list(GATES.keys()), horizontal=True)
lr = c2.select_slider("Tasa de aprendizaje (η)", options=[0.01, 0.05, 0.1, 0.2, 0.5], value=0.1)
max_epochs = c3.number_input("Épocas máx.", min_value=5, max_value=300, value=100, step=5)

# Tabla de verdad + expresion booleana de la compuerta elegida, armada dinamicamente
# con HTML (usa las clases .gate-math / .tabla-verdad definidas en el CSS de arriba).
info = GATES_INFO[gate]
y_gate = GATES[gate]
filas_tabla = "".join(
    f"<tr><td>{x1}</td><td>{x2}</td><td class='{'uno' if y == 1 else 'cero'}'>{y}</td></tr>"
    for (x1, x2), y in zip(X, y_gate)
)
st.markdown(
    f"""
    <div class="gate-math">
      <table class="tabla-verdad">
        <tr><th>x1</th><th>x2</th><th>y</th></tr>
        {filas_tabla}
      </table>
      <div>
        <div class="simbolo">{info['simbolo']}</div>
        <div class="nota">{info['nota']}</div>
      </div>
    </div>
    """,
    unsafe_allow_html=True,
)

# Entrena (o recupera del cache) el historial completo de pesos por epoca para
# la combinacion actual de compuerta / tasa de aprendizaje / epocas maximas.
history, converged_at = entrenar(gate, lr, max_epochs)
total_epocas = len(history) - 1

# Slider para navegar manualmente por las epocas + boton para animarlas solo.
col_slider, col_play = st.columns([5, 1])
epoca_idx = col_slider.slider("Época", min_value=0, max_value=total_epocas, value=total_epocas)
reproducir = col_play.button("▶ Reproducir", use_container_width=True)

# st.empty() crea "huecos" reutilizables: se pueden volver a escribir muchas veces
# sin crear elementos nuevos cada vez. Es lo que permite animar (reescribir estos
# mismos huecos en un loop) en vez de que Streamlit vaya agregando graficos nuevos
# uno debajo del otro.
col_a, col_b = st.columns(2)
plot_ph_a = col_a.empty()
plot_ph_b = col_b.empty()
readout_ph = st.empty()
eq_ph = st.empty()
verdict_ph = st.empty()


def _dibujar_epoca(idx):
    """Renderiza el estado completo (2 graficos + pesos + ecuacion + veredicto)
    correspondiente a la epoca `idx`, escribiendo sobre los placeholders de arriba."""
    snapshot = history[idx]
    _, w, b, errores = snapshot

    fig1, ax1 = plt.subplots(figsize=(4.2, 4.2))
    graficar_frontera(snapshot, GATES[gate], ax1)
    plot_ph_a.pyplot(fig1, clear_figure=True)

    fig2, ax2 = plt.subplots(figsize=(4.6, 4.2))
    graficar_convergencia(history, idx, ax2)
    plot_ph_b.pyplot(fig2, clear_figure=True)

    errores_txt = "–" if errores is None else str(errores)
    readout_ph.markdown(
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

    eq_ph.markdown(
        f"""
        <div class="live-eq">
          <div class="tag">Ecuación con los pesos actuales</div>
          <div class="eq">z = {w[0]:.2f}·x1 + {w[1]:.2f}·x2 + ({b:.2f})</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    # Tres estados posibles del veredicto: ya convergio, se acabaron las epocas
    # sin converger, o todavia esta en pleno entrenamiento (durante la animacion).
    if converged_at is not None and idx >= converged_at:
        verdict_ph.markdown(
            f'<div class="verdict ok"><div class="tag">✓ Convergió</div>'
            f'<p>El Perceptrón encontró una frontera que separa las dos clases sin errores en la época '
            f'<strong>{converged_at}</strong>. La compuerta <strong>{gate}</strong> es linealmente separable.</p></div>',
            unsafe_allow_html=True,
        )
    elif idx == total_epocas and converged_at is None:
        verdict_ph.markdown(
            f'<div class="verdict fail"><div class="tag">✕ No converge</div>'
            f'<p>Tras <strong>{max_epochs}</strong> épocas, el error sigue sin llegar a cero '
            f'(quedó en {errores}). <strong>{gate}</strong> no es linealmente separable — no existe ninguna '
            'recta que separe sus dos clases, por eso el Perceptrón simple oscila indefinidamente en vez de converger.</p></div>',
            unsafe_allow_html=True,
        )
    else:
        verdict_ph.markdown(
            f'<div class="verdict ok"><div class="tag">⏳ Entrenando…</div>'
            f'<p>Época <strong>{idx}</strong> de {max_epochs} — {errores} error(es) en esta pasada.</p></div>',
            unsafe_allow_html=True,
        )


if reproducir:
    # Animacion: recorre las epocas llamando _dibujar_epoca() en un loop con una
    # pequena pausa entre cuadro y cuadro. Streamlit va mandando cada actualizacion
    # de los placeholders al navegador a medida que se ejecuta, por eso se ve "en vivo"
    # sin necesidad de recargar la pagina.
    max_frames = 60
    # si hay muchas mas de 60 epocas (p. ej. XOR con 300), se muestran solo ~60
    # cuadros repartidos parejo en vez de los 300 completos, para que la animacion
    # no tarde demasiado — el resultado final se ve igual.
    paso = max(1, round(total_epocas / max_frames)) if total_epocas > max_frames else 1
    indices = list(range(0, total_epocas, paso)) + [total_epocas]  # asegura terminar en la ultima epoca
    delay = 0.4 if total_epocas <= 10 else 0.12  # mas lento si hay pocos cuadros, para que se note
    for idx in indices:
        _dibujar_epoca(idx)
        time.sleep(delay)
else:
    # sin animacion: muestra directamente la epoca que indica el slider
    _dibujar_epoca(epoca_idx)

st.divider()

# Tabla comparativa: repite el entrenamiento de la compuerta actual con dos tasas
# de aprendizaje distintas (0.1 y 0.01) para mostrar el efecto de eta en cuantas
# epocas tarda en converger (o si nunca converge, como con XOR). Los pesos que
# muestra son los de la MISMA epoca que indica el slider de arriba (no siempre el
# resultado final), asi se puede comparar como iban ambas tasas en un punto dado.
st.markdown(f"### Efecto de la tasa de aprendizaje — {gate}")
st.caption(f"Pesos comparados en la época {epoca_idx} (la misma que el slider de arriba).")
filas = []
for lr_cmp in [0.1, 0.01]:
    hist_cmp, conv_cmp = entrenar(gate, lr_cmp, 300)
    # si esta tasa convergio antes de llegar a epoca_idx, el historial ya no crece
    # mas alla de esa epoca (fit() corta ahi) — se usa la ultima disponible.
    idx_cmp = min(epoca_idx, len(hist_cmp) - 1)
    estado = hist_cmp[idx_cmp]
    errores_cmp = "–" if estado[3] is None else estado[3]
    filas.append({
        "η": lr_cmp,
        "Épocas hasta converger": conv_cmp if conv_cmp is not None else "> 300 (no converge)",
        f"w1 (época {idx_cmp})": round(estado[1][0], 2),
        f"w2 (época {idx_cmp})": round(estado[1][1], 2),
        f"bias (época {idx_cmp})": round(estado[2], 2),
        "errores en esa época": errores_cmp,
    })
st.table(filas)

st.caption("Mismo algoritmo que `ANALISIS_PERCEPTRON.ipynb` — Taller de Inteligencia Artificial, Perceptrón de Rosenblatt.")
