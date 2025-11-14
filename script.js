document.addEventListener('DOMContentLoaded', function () {

  const meteoroCount = document.getElementById('meteoroCount');
  const calcularBtn = document.getElementById('calcularBtn');
  const limpiarBtn = document.getElementById('limpiarBtn');
  const resultado = document.getElementById('resultado');
  const panelCiencia = document.getElementById('panelCiencia');
  const estadoCiencia = document.getElementById('estadoCiencia');
  let contador = 0;

  // ⭐ Sonido de explosión exitosa
  const successSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_450a87a3c4.mp3?filename=success-1-6297.mp3");

  // 🌌 CIELO ESTRELLADO
  function iniciarCieloEstrellado() {
    const canvas = document.getElementById('cieloEstrellado');
    const ctx = canvas.getContext('2d');

    let w, h, estrellas = [];

    function ajustar() {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
      estrellas = [];

      for (let i = 0; i < 200; i++) {
        estrellas.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: Math.random()*1.5 + 0.3,
          b: Math.random(),
          vel: Math.random()*0.009 + 0.003
        });
      }
    }

    function dibujar() {
      ctx.clearRect(0,0,w,h);
      for (let s of estrellas) {
        s.b += s.vel * (Math.random() < 0.5 ? -1 : 1);
        s.b = Math.max(0.1, Math.min(1, s.b));
        ctx.globalAlpha = s.b;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = "#fff";
        ctx.fill();
      }
      requestAnimationFrame(dibujar);
    }

    ajustar();
    dibujar();
    addEventListener('resize', ajustar);
  }
  iniciarCieloEstrellado();


  // ☄️ METEORITOS
  const colores = [
    { base: '#00ffaa', glow: 'rgba(0,255,150,0.6)' },
    { base: '#00bfff', glow: 'rgba(0,191,255,0.6)' },
    { base: '#ff66ff', glow: 'rgba(255,102,255,0.6)' },
    { base: '#ffd700', glow: 'rgba(255,215,0,0.6)' }
  ];

  function crearMeteoro() {
    const m = document.createElement('div');
    m.classList.add('meteor');
    if (Math.random() < 0.2) m.classList.add('cometa');

    let c = colores[Math.floor(Math.random()*colores.length)];
    m.style.background = `radial-gradient(circle, white, ${c.base})`;
    m.style.boxShadow = `0 0 20px 5px ${c.glow}`;
    document.body.appendChild(m);

    const lados = ['top','right','bottom','left'];
    const origen = lados[Math.floor(Math.random()*lados.length)];

    let sx, sy, ex, ey;
    switch(origen){
      case 'top':    sx=Math.random()*innerWidth; sy=-40; ex=Math.random()*innerWidth; ey=innerHeight+80; break;
      case 'bottom': sx=Math.random()*innerWidth; sy=innerHeight+40; ex=Math.random()*innerWidth; ey=-80; break;
      case 'left':   sx=-40; sy=Math.random()*innerHeight; ex=innerWidth+80; ey=Math.random()*innerHeight; break;
      case 'right':  sx=innerWidth+40; sy=Math.random()*innerHeight; ex=-80; ey=Math.random()*innerHeight; break;
    }

    let dur = 10 + Math.random()*6;
    let ang = Math.atan2(ey-sy, ex-sx)*180/Math.PI;
    m.style.rotate = `${ang}deg`;

    let t0 = performance.now();
    function animar(t){
      let p = Math.min((t-t0)/(dur*1000), 1);
      m.style.transform = `translate(${sx+(ex-sx)*p}px, ${sy+(ey-sy)*p}px) rotate(${ang}deg)`;
      if(p < 1) requestAnimationFrame(animar);
      else m.remove();
    }
    requestAnimationFrame(animar);

    m.onclick = (e) => {
      const boom = document.createElement('div');
      boom.classList.add('explosion');
      boom.style.left = (e.clientX-30)+"px";
      boom.style.top = (e.clientY-30)+"px";
      document.body.appendChild(boom);
      setTimeout(()=>boom.remove(), 700);

      m.remove();
      contador++;
      meteoroCount.textContent = contador;
      successSound.play();
    };

    setTimeout(()=>m.remove(), (dur+2)*1000);
  }

  setInterval(crearMeteoro, 2000);


  // 🧮 CALCULADORA
  calcularBtn.onclick = () => {
    const c1 = parseFloat(corte1.value);
    const c2 = parseFloat(corte2.value);

    if(isNaN(c1) || isNaN(c2)){
      resultado.innerHTML = "⚠️ Ingresa ambos números.";
      return;
    }

    let parcial = c1*0.33 + c2*0.33;
    let restante = 3 - parcial;
    let necesitado = restante / 0.34;

    if(necesitado <= 0){
      resultado.innerHTML = "✅ Ya apruebas la materia.";
    } else if(necesitado > 5){
      resultado.innerHTML = "❌ Aún sacando 5 no alcanzas.";
    } else {
      resultado.innerHTML = `📘 Necesitas <b>${necesitado.toFixed(2)}</b> en el tercer corte.`;
    }
  };

  limpiarBtn.onclick = () => {
    corte1.value = "";
    corte2.value = "";
    resultado.innerHTML = "";
  };


  // 🔬 PANEL DE CIENCIA
  const frases = [
    "Aún no... 😅",
    "Los físicos siguen intentándolo ⚛️",
    "No, pero estamos más cerca 🚀",
    "Todavía falta la gravedad cuántica 🌌",
    "Einstein estaría orgulloso 😄"
  ];

  let idx = 0;
  setInterval(()=>{
    idx = (idx+1) % frases.length;
    estadoCiencia.textContent = frases[idx];
  }, 6000);

  panelCiencia.onclick = () => {
    idx = (idx+1) % frases.length;
    estadoCiencia.textContent = frases[idx];
  };

});
