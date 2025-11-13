document.addEventListener('DOMContentLoaded', function () {
  const meteoroCount = document.getElementById('meteoroCount');
  let contador = 0;
  const successSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_450a87a3c4.mp3?filename=success-1-6297.mp3');

  // 🌟 FONDO DE ESTRELLAS
  function iniciarCieloEstrellado() {
    const canvas = document.getElementById('cieloEstrellado');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, estrellas = [];

    function ajustar() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      estrellas = Array.from({ length: 200 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.2,
        brillo: Math.random(),
        vel: 0.005 + Math.random() * 0.01
      }));
    }

    function dibujar() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      for (const e of estrellas) {
        e.brillo += e.vel * (Math.random() < 0.5 ? -1 : 1);
        e.brillo = Math.max(0, Math.min(1, e.brillo));
        ctx.globalAlpha = e.brillo;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(dibujar);
    }

    window.addEventListener('resize', ajustar);
    ajustar();
    dibujar();
  }
  iniciarCieloEstrellado();

  // 🌠 Meteoritos
  const colores = [
    { base: '#00ffaa', glow: 'rgba(0,255,150,0.6)' },
    { base: '#00bfff', glow: 'rgba(0,191,255,0.6)' },
    { base: '#ff66ff', glow: 'rgba(255,102,255,0.6)' },
    { base: '#ffd700', glow: 'rgba(255,215,0,0.6)' }
  ];

  function crearMeteoro() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    if (Math.random() < 0.15) meteor.classList.add('cometa');
    const color = colores[Math.floor(Math.random() * colores.length)];
    meteor.style.background = `radial-gradient(circle, white, ${color.base})`;
    meteor.style.boxShadow = `0 0 20px 5px ${color.glow}`;
    document.body.appendChild(meteor);

    const lados = ['top', 'right', 'bottom', 'left'];
    const origen = lados[Math.floor(Math.random() * lados.length)];
    let sx, sy, ex, ey;

    switch (origen) {
      case 'top': sx = Math.random()*innerWidth; sy=-50; ex=Math.random()*innerWidth; ey=innerHeight+100; break;
      case 'bottom': sx=Math.random()*innerWidth; sy=innerHeight+50; ex=Math.random()*innerWidth; ey=-100; break;
      case 'left': sx=-50; sy=Math.random()*innerHeight; ex=innerWidth+100; ey=Math.random()*innerHeight; break;
      case 'right': sx=innerWidth+50; sy=Math.random()*innerHeight; ex=-100; ey=Math.random()*innerHeight; break;
    }

    const dur = 8 + Math.random()*4;
    const ang = Math.atan2(ey-sy, ex-sx)*180/Math.PI;
    meteor.style.rotate = `${ang}deg`;

    const t0 = performance.now();
    function animar(t) {
      const p = Math.min((t - t0) / (dur * 1000), 1);
      const x = sx + (ex - sx) * p;
      const y = sy + (ey - sy) * p;
      meteor.style.transform = `translate(${x}px, ${y}px) rotate(${ang}deg)`;
      if (p < 1) requestAnimationFrame(animar);
      else meteor.remove();
    }
    requestAnimationFrame(animar);

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

    setTimeout(() => meteor.remove(), (dur + 2) * 1000);
  }

  setInterval(crearMeteoro, 1800);
});
