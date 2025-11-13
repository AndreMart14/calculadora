document.addEventListener('DOMContentLoaded', function () {
  const inputCorte1 = document.getElementById('corte1');
  const inputCorte2 = document.getElementById('corte2');
  const calcularBoton = document.getElementById('calcularBtn');
  const resultadoDiv = document.getElementById('resultado');
  const errorCorte1 = document.getElementById('error-corte1');
  const errorCorte2 = document.getElementById('error-corte2');
  const limpiarBoton = document.getElementById('limpiarBtn');
  const meteoroCount = document.getElementById('meteoroCount');
  let contador = 0;

  // 🔊 Sonidos
  const clickSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_d32b9a2c35.mp3?filename=click-124467.mp3');
  const successSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_450a87a3c4.mp3?filename=success-1-6297.mp3');

  // 🌠 Generar meteoros aleatorios
  function crearMeteoro() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    meteor.style.left = `${100 + Math.random() * 20}vw`;
    meteor.style.top = `${-10 - Math.random() * 20}vh`;
    meteor.style.animationDuration = `${3 + Math.random() * 2}s`;
    document.body.appendChild(meteor);

    // Click = explosión y contador
    meteor.addEventListener('click', (e) => {
      const boom = document.createElement('div');
      boom.classList.add('explosion');
      boom.style.left = `${e.clientX - 30}px`;
      boom.style.top = `${e.clientY - 30}px`;
      document.body.appendChild(boom);
      meteor.remove();
      setTimeout(() => boom.remove(), 600);
      contador++;
      meteoroCount.textContent = contador;
      successSound.play();
    });

    // Eliminar si sale de pantalla
    setTimeout(() => meteor.remove(), 5000);
  }
  setInterval(crearMeteoro, 5000);

  // 💫 Destellos suaves
  setInterval(() => {
    const flash = document.createElement('div');
    flash.classList.add('flash');
    flash.style.left = `${Math.random() * 100}%`;
    flash.style.top = `${Math.random() * 100}%`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2000);
  }, 7000);

  // 🧮 Calculadora básica
  const mostrarError = (m) => { resultadoDiv.textContent = m; };
  calcularBoton.addEventListener('click', () => {
    clickSound.play();
    const n1 = parseFloat(inputCorte1.value || 0);
    const n2 = parseFloat(inputCorte2.value || 0);
    const nota = (3 - (n1 * 0.33) - (n2 * 0.33)) / 0.34;
    resultadoDiv.classList.add('mostrar');
    resultadoDiv.textContent = nota > 5 ? "Ya no es posible alcanzar 3.0" :
      nota <= 0 ? "🎉 ¡Ya aprobaste!" :
      `Necesitas ${nota.toFixed(2)} en el último corte.`;
    successSound.play();
  });
  limpiarBoton.addEventListener('click', () => {
    inputCorte1.value = inputCorte2.value = '';
    resultadoDiv.textContent = '';
  });

  // 🔬 Panel de física cuántica
  const panel = document.getElementById('panelCiencia');
  const estado = document.getElementById('estadoCiencia');
  const frases = [
    'Todavía no... los físicos siguen intentándolo ⚛️',
    'Aún no 😅 — ¡la gravedad cuántica es difícil!',
    'No todavía, pero el CERN y la NASA trabajan 🌌',
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
