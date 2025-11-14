document.addEventListener("DOMContentLoaded", () => {

    // ---------------------- CONTADOR ----------------------
    let muertos = 0;
    const count = document.getElementById("count");

    function resetScore() {
        muertos = 0;
        count.textContent = 0;
    }
    window.resetScore = resetScore;


    // ---------------------- ESTRELLAS ----------------------
    const canvas = document.getElementById("cielo");
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
    resize();
    addEventListener("resize", resize);

    let estrellas = [];
    for (let i = 0; i < 200; i++) {
        estrellas.push({
            x: Math.random() * innerWidth,
            y: Math.random() * innerHeight,
            r: Math.random() * 1.5 + 0.2,
            b: Math.random(),
            s: Math.random() * 0.01 + 0.002
        });
    }

    function dibujarEstrellas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        for (let e of estrellas) {
            e.b += (Math.random() < 0.5 ? -1 : 1) * e.s;
            e.b = Math.max(0.15, Math.min(1, e.b));
            ctx.globalAlpha = e.b;
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(dibujarEstrellas);
    }
    dibujarEstrellas();


    // ---------------------- METEORITOS ----------------------
    const colores = [
        { base: "#00d9ff", glow: "rgba(0,255,255,0.6)" },
        { base: "#ff00d9", glow: "rgba(255,0,255,0.6)" },
        { base: "#8d42ff", glow: "rgba(180,90,255,0.6)" }
    ];

    const sonido = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_450a87a3c4.mp3");

    function crearMeteoro() {
        const m = document.createElement("div");
        m.classList.add("meteor");

        if (Math.random() < 0.3) m.classList.add("cometa");

        let c = colores[Math.floor(Math.random() * colores.length)];
        m.style.background = `radial-gradient(circle, white, ${c.base})`;
        m.style.boxShadow = `0 0 25px ${c.glow}`;

        document.body.appendChild(m);

        const lados = ["top", "bottom", "left", "right"];
        const origen = lados[Math.floor(Math.random() * lados.length)];

        let sx, sy, ex, ey;

        switch (origen) {
            case "top": sx=Math.random()*innerWidth; sy=-50; ex=Math.random()*innerWidth; ey=innerHeight+100; break;
            case "bottom": sx=Math.random()*innerWidth; sy=innerHeight+50; ex=Math.random()*innerWidth; ey=-100; break;
            case "left": sx=-50; sy=Math.random()*innerHeight; ex=innerWidth+100; ey=Math.random()*innerHeight; break;
            case "right": sx=innerWidth+50; sy=Math.random()*innerHeight; ex=-100; ey=Math.random()*innerHeight; break;
        }

        let dur = 10 + Math.random() * 5;
        let ang = Math.atan2(ey - sy, ex - sx) * 180 / Math.PI;
        m.style.rotate = `${ang}deg`;

        let t0 = performance.now();
        function anim(t) {
            let p = (t - t0) / (dur * 1000);
            if (p >= 1) { m.remove(); return; }
            m.style.transform = `translate(${sx + (ex - sx) * p}px, ${sy + (ey - sy) * p}px) rotate(${ang}deg)`;
            requestAnimationFrame(anim);
        }
        requestAnimationFrame(anim);

        m.onclick = (e) => {
            const boom = document.createElement("div");
            boom.classList.add("explosion");
            boom.style.left = `${e.clientX - 30}px`;
            boom.style.top = `${e.clientY - 30}px`;
            document.body.appendChild(boom);
            setTimeout(() => boom.remove(), 700);

            sonido.play();
            m.remove();

            muertos++;
            count.textContent = muertos;
        };

        setTimeout(() => m.remove(), (dur + 2) * 1000);
    }

    setInterval(crearMeteoro, 1500);


    // ---------------------- CALCULADORA ----------------------
    const c1 = document.getElementById("c1");
    const c2 = document.getElementById("c2");
    const res = document.getElementById("res");

    calcular.onclick = () => {
        let v1 = parseFloat(c1.value);
        let v2 = parseFloat(c2.value);

        if (isNaN(v1) || isNaN(v2)) {
            res.innerHTML = "⚠️ Ingresa ambos valores.";
            return;
        }

        let parcial = v1 * 0.33 + v2 * 0.33;
        let faltante = 3 - parcial;
        let necesario = faltante / 0.34;

        if (necesario <= 0) {
            res.innerHTML = "✅ Ya apruebas con lo que tienes.";
        } else if (necesario > 5) {
            res.innerHTML = "❌ Ni con 5 alcanzas.";
        } else {
            res.innerHTML = `📘 Necesitas <b>${necesario.toFixed(2)}</b> en el tercer corte.`;
        }
    };

    limpiar.onclick = () => {
        c1.value = "";
        c2.value = "";
        res.innerHTML = "";
    };


    // ---------------------- PANEL DE CIENCIA ----------------------
    const panel = document.getElementById("panel");
    const estado = document.getElementById("estado");

    const frases = [
        "Aún no... 😅",
        "Los físicos siguen intentando ⚛️",
        "No, pero estamos cerca 🚀",
        "La gravedad cuántica es la clave 🌌",
        "Quizá en 20 años 😄"
    ];

    let i = 0;
    setInterval(() => {
        i = (i + 1) % frases.length;
        estado.textContent = frases[i];
    }, 6000);

    panel.onclick = () => {
        i = (i + 1) % frases.length;
        estado.textContent = frases[i];
    };

    window.togglePanel = () => {
        panel.style.display =
            panel.style.display === "none" ? "block" : "none";
    };

    window.scrollToCalc = () => {
        document.getElementById("calc").scrollIntoView({ behavior: "smooth" });
    };

});
