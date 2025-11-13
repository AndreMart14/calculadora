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

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;

    const dx = endX - startX;
    const dy = endY - startY;
    const duracion = esCometa ? 9 + Math.random() * 3 : 6 + Math.random() * 3;

    meteor.style.left = `${startX}px`;
    meteor.style.top = `${startY}px`;
    meteor.style.transition = `transform ${duracion}s linear, opacity 1s`;

    const angulo = Math.atan2(dy, dx) * (180 / Math.PI);
    meteor.style.rotate = `${angulo}deg`;

    requestAnimationFrame(() => {
      meteor.style.transform = `translate(${dx}px, ${dy}px) rotate(${angulo + 720}deg)`;
      meteor.style.opacity = '0';
    });

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

    setTimeout(() => meteor.remove(), duracion * 1000 + 2000);
  }

  // 🌌 Frecuencia
  setInterval(crearMeteoro, 2200);

  // 💫 Destellos suaves
  setInterval(() => {
    const flash = document.createElement('div');
    flash.classList.add('flash');
    flash.style.left = `${Math.random() * 100}%`;
    flash.style.top = `${Math.random() * 100}%`;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 2000);
  }, 7000);
});
