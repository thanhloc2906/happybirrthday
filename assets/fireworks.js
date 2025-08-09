function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let particles = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }function startFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const particles = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createFirework(x, y) {
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        const count = 100;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: x,
                y: y,
                angle: random(0, Math.PI * 2),
                speed: random(2, 6),
                radius: random(2, 4),
                alpha: 1,
                decay: random(0.015, 0.03),
                color: color
            });
        }
    }

    function loop() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, W, H);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed + 0.3; // gravity
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        requestAnimationFrame(loop);
    }

    // Random fireworks
    setInterval(() => {
        createFirework(random(100, W - 100), random(100, H - 200));
    }, 600);

    loop();
}


    function createFirework(x, y) {
        let count = 80;
        while (count--) {
            particles.push({
                x: x,
                y: y,
                speed: random(2, 6),
                angle: random(0, Math.PI * 2),
                radius: random(1, 3),
                alpha: 1
            });
        }
    }

    function loop() {
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed + 0.3;
            p.alpha -= 0.015;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${p.alpha})`;
            ctx.fill();

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(loop);
    }

    setInterval(() => {
        createFirework(random(100, W - 100), random(100, H / 2));
    }, 500);

    loop();

    // Cập nhật kích thước canvas khi đổi kích thước cửa sổ
    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });
}

