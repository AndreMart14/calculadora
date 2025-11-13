document.addEventListener('DOMContentLoaded', function () {
  const inputCorte1 = document.getElementById('corte1');
  const inputCorte2 = document.getElementById('corte2');
  const calcularBoton = document.getElementById('calcularBtn');
  const resultadoDiv = document.getElementById('resultado');
  const errorCorte1 = document.getElementById('error-corte1');
  const errorCorte2 = document.getElementById('error-corte2');
  const limpiarBoton = document.getElementById('limpiarBtn');
  let errorTimeout;

  // 🔊 Sonidos
  const clickSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_d32b9a2c35.mp3?filename=click-124467.mp3');
  const successSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_450a87a3c4.mp3?filename=success-1-6297.mp3');
  const errorSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_8e46b57a35.mp3?filename=error-126627.mp3');

  // 🌟 Generar partículas
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    document.body.appendChild(particle);
    resetParticle(particle);
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

  // 💥 Destellos aleatorios en el fondo
  function crearDestello() {
    const flash = document.createElement('div');
    flash.classList.add('flash');
    flash.style.left = `${Math.random() * 100}%`;
    flash.style.top = `${Math.random() * 100}%`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2000);
  }
  setInterval(crearDestello, 7000);

  // 💬 Errores
  const mostrarErrorTemporal = (elemento, mensaje) => {
    clearTimeout(errorTimeout);
    elemento.textContent = mensaje;
    errorTimeout = setTimeout(() => { elemento.textContent = ''; }, 2000);
    errorSound.play();
  };

  const filtrarCaracteres = (event) => {
    const teclaPresionada = event.key;
    const valorActual = event.target.value;
    const elementoError = event.target.id === 'corte1' ? errorCorte1 : errorCorte2;

    elementoError.textContent = '';
    clearTimeout(errorTimeout);

    const teclasPermitidas = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (teclasPermitidas.includes(teclaPresionada)) return;

    if (teclaPresionada === '.' && valorActual.includes('.')) {
      event.preventDefault();
      mostrarErrorTemporal(elementoError, 'Solo se permite un punto decimal.');
      return;
    }
    if (!/^[0-9.]$/.test(teclaPresionada)) {
      event.preventDefault();
      mostrarErrorTemporal(elementoError, 'Solo se permiten números y un punto.');
    }
  };

  inputCorte1.addEventListener('keydown', filtrarCaracteres);
  inputCorte2.addEventListener('keydown', filtrarCaracteres);

  calcularBoton.addEventListener('click', function () {
    clickSound.play();
    if (inputCorte1.value === '') inputCorte1.value = '0.0';
    if (inputCorte2.value === '') inputCorte2.value = '0.0';

    const nota1 = parseFloat(inputCorte1.value);
    const nota2 = parseFloat(inputCorte2.value);

    if (isNaN(nota1) || isNaN(nota2)) {
      mostrarError("Por favor, ingresa solo números válidos.");
      return;
    }
    if (nota1 < 0 || nota1 > 5 || nota2 < 0 || nota2 > 5) {
      mostrarError("Las calificaciones deben estar entre 0.0 y 5.0.");
      return;
    }

    const notaNecesaria = (3.0 - (nota1 * 0.33) - (nota2 * 0.33)) / 0.34;
    mostrarResultado(notaNecesaria);
  });

  limpiarBoton.addEventListener('click', function () {
    clickSound.play();
    inputCorte1.value = '';
    inputCorte2.value = '';
    resultadoDiv.innerHTML = '';
    resultadoDiv.style.backgroundColor = 'transparent';
    resultadoDiv.style.border = 'none';
    resultadoDiv.classList.remove('mostrar');
    inputCorte1.focus();
  });

  function mostrarResultado(nota) {
    resultadoDiv.classList.add('mostrar');
    setTimeout(() => resultadoDiv.classList.remove('mostrar'), 1800);

    const notaRedondeada = nota.toFixed(2);
    if (nota > 5.0) {
      resultadoDiv.innerHTML = `Necesitas <b>${notaRedondeada}</b>.<br>Ya no es posible alcanzar 3.0 😞`;
      resultadoDiv.style.background = 'rgba(220, 53, 69, 0.2)';
      resultadoDiv.style.border = '1px solid rgba(220, 53, 69, 0.5)';
      resultadoDiv.style.color = '#ffcdd2';
      errorSound.play();
    } else if (nota <= 0) {
      resultadoDiv.innerHTML = `🎉 ¡Felicitaciones! Ya aprobaste.`;
      resultadoDiv.style.background = 'rgba(40, 167, 69, 0.2)';
      resultadoDiv.style.border = '1px solid rgba(40, 167, 69, 0.5)';
      resultadoDiv.style.color = '#fff';
      successSound.play();
    } else {
      resultadoDiv.innerHTML = `Para obtener 3.0, necesitas <b>${notaRedondeada}</b> en el último corte.`;
      resultadoDiv.style.background = 'rgba(0,255,150,0.15)';
      resultadoDiv.style.border = '1px solid rgba(0,255,150,0.5)';
      resultadoDiv.style.color = '#d9fff0';
      successSound.play();
    }
  }

  function mostrarError(mensaje) {
    resultadoDiv.style.background = 'rgba(220, 53, 69, 0.2)';
    resultadoDiv.style.border = '1px solid rgba(220, 53, 69, 0.5)';
    resultadoDiv.style.color = '#ffcdd2';
    resultadoDiv.innerHTML = mensaje;
    resultadoDiv.classList.add('mostrar');
    errorSound.play();
  }

  // 🧠 Panel sobre física cuántica
  const panel = document.getElementById('panelCiencia');
  const estado = document.getElementById('estadoCiencia');
  const frases = [
    'Todavía no... pero los físicos siguen intentando ⚛️',
    'Aún no 😅 — ¡la gravedad cuántica es difícil!',
    'No todavía, pero el CERN y la NASA están trabajando en ello 🌌',
    'Quizás pronto... 👩‍🔬',
    'Sigue siendo un misterio del universo 🌀'
  ];
  let idx = 0;
  panel.addEventListener('click', () => {
    idx = (idx + 1) % frases.length;
    estado.textContent = frases[idx];
    panel.style.color = idx % 2 === 0 ? '#00ffb3' : '#ffff80';
  });
  setInterval(() => {
    idx = (idx + 1) % frases.length;
    estado.textContent = frases[idx];
  }, 10000);
});
