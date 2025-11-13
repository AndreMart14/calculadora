document.addEventListener('DOMContentLoaded', function () {
  const meteoroCount = document.getElementById('meteoroCount');
  let contador = 0;

  const successSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_450a87a3c4.mp3?filename=success-1-6297.mp3');

  const colores = [
    { base: '#00ffaa', glow: 'rgba(0,255,150,0.6)' },
    { base: '#00bfff', glow: 'rgba(0,191,255,0.6)' },
    { base: '#ff66ff', glow: 'rgba(255,102,255,0.6)' },
    { base: '#ffd700', glow: 'rgba(255,215,0,0.6)' }
  ];

  // 🌠 Crear meteoritos o cometas
  function crearMeteoro() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');

    // 15% serán cometas especiales
    const esCometa = Math.random() < 0.15;
    if (esCometa) meteor.classList.add('cometa');

    const color = colores[Math.floor(Math.random() * colores.length)];
    meteor.style.background = `radial-gradient(circle, white, ${color.base})`;
    meteor.style.boxShadow = `0 0 20px 5px ${color.glow}`;
    document.body.appendChild(meteor);

    // Puntos inicial y final aleatorios (fuera de pantalla)
    const startX = Math.random() * window.innerWidth;
    const startY = -50; // desde arriba
    const endX = Math.random() * window.innerWidth;
    const endY = window.innerHeight + 100; // hasta abajo

    // Pequeña variación lateral
    const desviacionX = (Math.random() - 0.5) * 400;

    const duracion = esCometa ? 11 + Math.random() * 3 : 8 + Math.random() * 2; // segundos
    const startTime = performance.now();

    const angulo = Math.atan2(endY - startY, (endX + desviacionX) - startX) * (180 / Math.PI);
    meteor.style.rotate = `${angulo}deg`;

    // 🕐 Movimiento animado frame a frame (más estable que transition)
    function animar(t) {
      const progreso = (t - startTime) / (duracion * 1000);
      if (progreso >= 1) {
        meteor.remove();
        return;
      }
      const x = startX + (endX + desviacionX - startX) * progreso;
      const y = startY + (endY - startY) * progreso;
      meteor.style.transform = `translate(${x}px, ${y}px) rotate(${angulo}deg)`;
      requestAnimationFrame(animar);
    }
    requestAnimationFrame(animar);

    // 💥 Click = explosión y contador
    meteor.addEventListener('click', (e) => {
      const boom = document.createElement('div');
      boom.classList.add('explosion');
      boom.style.left = `${e.clientX - 30}px`;
      boom.style.top = `${e.clientY - 30}px`;
      document.body.appendChild(boom);
      meteor.remove();
      setTimeout(() => boom.remove(), 700);
      contador++;
      meteoroCount.textContent = contador;
      successSound.play();
    });

    // Eliminación de seguridad
    setTimeout(() => meteor.remove(), (duracion + 2) * 1000);
  }

  // 🌌 Crear meteoritos frecuentes
  setInterval(crearMeteoro, 1800); // más meteoritos, sin saturar

  // 💫 Destellos de fondo
  setInterval(() => {
    const flash = document.createElement('div');
    flash.classList.add('flash');
    flash.style.left = `${Math.random() * 100}%`;
    flash.style.top = `${Math.random() * 100}%`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2000);
  }, 7000);
});
