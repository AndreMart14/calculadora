document.addEventListener('DOMContentLoaded', function () {
  const inputCorte1 = document.getElementById('corte1');
  const inputCorte2 = document.getElementById('corte2');
  const calcularBoton = document.getElementById('calcularBtn');
  const resultadoDiv = document.getElementById('resultado');
  const errorCorte1 = document.getElementById('error-corte1');
  const errorCorte2 = document.getElementById('error-corte2');
  const limpiarBoton = document.getElementById('limpiarBtn');
  const meteoroCount = document.getElementById('meteoroCount');
  let errorTimeout, contador = 0;

  const clickSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_d32b9a2c35.mp3?filename=click-124467.mp3');
  const successSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_450a87a3c4.mp3?filename=success-1-6297.mp3');
  const errorSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_8e46b57a35.mp3?filename=error-126627.mp3');

  // Partículas y destellos
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    document.body.appendChild(p);
    resetParticle(p);
  }
  function resetParticle(p) {
    const size = Math.random() * 6 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = '-10px';
    p.style.animationDuration = `${5 + Math.random() * 5}s`;
    setTimeout(() => resetParticle(p), Math.random() * 8000 + 5000);
  }
  setInterval(() => {
    const flash = document.createElement('div');
    flash.classList.add('flash');
    flash.style.left = `${Math.random() * 100}%`;
    flash.style.top = `${Math.random() * 100}%`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2000);
  }, 7000);

  // Meteoritos
  function crearMeteoro() {
    const m = document.createElement('div');
    m.classList.add('meteor');
    m.style.left = `${Math.random() * 100}%`;
    m.style.top = '-20px';
    m.style.animationDuration = `${4 + Math.random() * 3}s`;
    document.body.appendChild(m);

    m.addEventListener('click', () => {
      const ex = document.createElement('div');
      ex.classList.add('explosion');
      ex.style.left = m.style.left;
      ex.style.top = m.style.top;
      document.body.appendChild(ex);
      m.remove();
      setTimeout(() => ex.remove(), 700);
      contador++;
      meteoroCount.textContent = contador;
      successSound.play();
    });
    setTimeout(() => m.remove(), 8000);
  }
  setInterval(crearMeteoro, 6000);

  // Validaciones y cálculo
  const mostrarErrorTemporal = (el, msg) => {
    clearTimeout(errorTimeout);
    el.textContent = msg;
    errorTimeout = setTimeout(() => { el.textContent = ''; }, 2000);
    errorSound.play();
  };

  const filtrarCaracteres = (e) => {
    const k = e.key;
    const v = e.target.value;
    const el = e.target.id === 'corte1' ? errorCorte1 : errorCorte2;
    const permitidas = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (permitidas.includes(k)) return;
    if (k === '.' && v.includes('.')) { e.preventDefault(); mostrarErrorTemporal(el, 'Solo un punto.'); }
    if (!/^[0-9.]$/.test(k)) { e.preventDefault(); mostrarErrorTemporal(el, 'Solo números.'); }
  };
  inputCorte1.addEventListener('keydown', filtrarCaracteres);
  inputCorte2.addEventListener('keydown', filtrarCaracteres);

  calcularBoton.addEventListener('click', () => {
    clickSound.play();
    if (!inputCorte1.value) inputCorte1.value = '0.0';
    if (!inputCorte2.value) inputCorte2.value = '0.0';
    const n1 = parseFloat(inputCorte1.value);
    const n2 = parseFloat(inputCorte2.value);
    if (isNaN(n1) || isNaN(n2)) return mostrarError("Solo números válidos.");
    if (n1 < 0 || n1 > 5 || n2 < 0 || n2 > 5) return mostrarError("Las notas deben estar entre 0.0 y 5.0.");
    const necesaria = (3 - (n1 * 0.33) - (n2 * 0.33)) / 0.34;
    mostrarResultado(necesaria);
  });

  limpiarBoton.addEventListener('click', () => {
    clickSound.play();
    inputCorte1.value = inputCorte2.value = '';
    resultadoDiv.innerHTML = '';
    resultadoDiv.classList.remove('mostrar');
  });

  function mostrarResultado(n) {
    resultadoDiv.classList.add('mostrar');
    const r = n.toFixed(2);
    if (n > 5) { resultadoDiv.innerHTML = `Necesitas ${r}. No es posible 😞`; errorSound.play(); }
    else if (n <= 0) { resultadoDiv.innerHTML = `🎉 ¡Ya aprobaste!`; successSound.play(); }
    else { resultadoDiv.innerHTML = `Necesitas ${r} en el último corte.`; successSound.play(); }
  }
  function mostrarError(m) {
    resultadoDiv.innerHTML = m;
    resultadoDiv.classList.add('mostrar');
    errorSound.play();
  }

  // Panel cuántico
  const panel = document.getElementById('panelCiencia');
  const estado = document.getElementById('estadoCiencia');
  const frases = [
    'Todavía no... los físicos siguen intentándolo ⚛️',
    'Aún no 😅 — ¡la gravedad cuántica es compleja!',
    'No todavía, pero el CERN y la NASA investigan 🌌',
    'Quizás pronto... 👩‍🔬',
    'Sigue siendo un misterio del universo 🌀'
  ];
  let idx = 0;
  panel.addEventListener('click', () => {
    idx = (idx + 1) % frases.length;
    estado.textContent = frases[idx];
  });
  setInterval(() => {
    idx = (idx + 1) % frases.length;
    estado.textContent = frases[idx];
  }, 10000);
});
