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

  // ✨ FONDO DE ESTRELLAS
  function iniciarCieloEstrellado() {
    const canvas = document.getElementById('cieloEstrellado');
    const ctx = canvas.getContext('2d');
    let w, h;
    let estrellas = [];

    function ajustarTamaño() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      estrellas = Array.from({ length: 200 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.2,
        brillo: Math.random(),
        velocidad: 0.005 + Math.random() * 0.01
      }));
    }

    function dibujar() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      for (const e of estrellas) {
        e.brillo += e.velocidad * (Math.random() < 0.5 ? -1 : 1);
        if (e.brillo < 0) e.brillo = 0;
        if (e.brillo > 1) e.brillo = 1;
        ctx.globalAlpha = e.brillo;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(dibujar);
    }

    window.addEventListener('resize', ajustarTamaño);
    ajustarTamaño();
    dibujar();
  }
  iniciarCieloEstrellado();

  // 🌠 CREAR METEOROS / COMETAS
  function crearMeteoro() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    if (Math.random() < 0.15) meteor.classList.add('cometa');

    // Generar color aleatorio
    const color = colores[Math.floor(Math.random() * colores.length)];
    meteor.style.background = `radial-gradient(circle, white, ${color.base})`;
    meteor.style.boxShadow = `0 0 20px 5px ${color.glow}`;
    meteor.style.position = 'fixed';
    meteor.style.pointerEvents = 'auto'; // permite hacer clic aunque esté sobre la calculadora
    meteor.style.zIndex = 50; // por encima de todo lo visual
    document.body.appendChild(meteor);

    // Origen fuera de la pantalla (borde aleatorio)
    const lados = ['top', 'right', 'bottom', 'left'];
    const origen = lados[Math.floor(Math.random() * lados.length)];
    let startX, startY, endX, endY;

    switch (origen) {
      case 'top':
        startX = Math.random() * window.innerWidth;
        startY = -50;
        endX = Math.random() * window.innerWidth;
        endY = window.innerHeight + 100;
        break;
      case 'bottom':
        startX = Math.random() * window.innerWidth;
        startY = window.innerHeight + 50;
        endX = Math.random() * window.innerWidth;
        endY = -100;
        break;
      case 'left':
        startX = -50;
        startY = Math.random() * window.innerHeight;
        endX = window.innerWidth + 100;
        endY = Math.random() * window.innerHeight;
        break;
      case 'right':
        startX = window.innerWidth + 50;
        startY = Math.random() * window.innerHeight;
        endX = -100;
        endY = Math.random() * window.innerHeight;
        break;
    }

    // Configurar movimiento
    const duracion = 8 + Math.random() * 4;
    const angulo = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    meteor.style.rotate = `${angulo}deg`;

    const t0 = performance.now();
    function animar(t) {
      const progreso = Math.min((t - t0) / (duracion * 1000), 1);
      const x = startX + (endX - startX) * progreso;
      const y = startY + (endY - startY) * progreso;
      meteor.style.transform = `translate(${x}px, ${y}px) rotate(${angulo}deg)`;
      if (progreso < 1) requestAnimationFrame(animar);
      else meteor.remove();
    }
    requestAnimationFrame(animar);

    // 💥 Explosión + contador
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

    // Seguridad por si no se elimina
    setTimeout(() => meteor.remove(), (duracion + 2) * 1000);
  }

  setInterval(crearMeteoro, 1800);
});
