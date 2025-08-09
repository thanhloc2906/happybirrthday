// assets/fireworks.js
function initFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');

    // Set full màn hình
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Resize khi thay đổi kích thước cửa sổ
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Mảng chứa pháo hoa
    let fireworks = [];
    let particles = [];

    // Random helper
    const random = (min, max) => Math.random() * (max - min) + min;

    // Class Pháo hoa chính
    class Firework {
        constructor(sx, sy, tx, ty) {
            this.x = sx;
            this.y = sy;
            this.sx = sx;
            this.sy = sy;
            this.tx = tx;
            this.ty = ty;
            this.distanceToTarget = Math.sqrt((tx - sx) ** 2 + (ty - sy) ** 2);
            this.distanceTraveled = 0;
            this.coordinates = [];
            this.coordinateCount = 3;
            while (this.coordinateCount--) {
                this.coordinates.push([this.x, this.y]);
            }
            this.angle = Math.atan2(ty - sy, tx - sx);
            this.speed = 5;
            this.acceleration = 1.05;
            this.brightness = random(50, 70);
            this.targetRadius = 2;
        }
        update(index) {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);

            if (this.targetRadius < 8) {
                this.targetRadius += 0.3;
            } else {
                this.targetRadius = 2;
            }

            this.speed *= this.acceleration;
            let vx = Math.cos(this.angle) * this.speed;
            let vy = Math.sin(this.angle) * this.speed;
            this.distanceTraveled = Math.sqrt((this.x - this.sx) ** 2 + (this.y - this.sy) ** 2);

            if (this.distanceTraveled >= this.distanceToTarget) {
                createParticles(this.tx, this.ty);
                fireworks.splice(index, 1);
            } else {
                this.x += vx;
                this.y += vy;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = `hsl(${random(0, 360)}, 100%, ${this.brightness}%)`;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    // Class Hạt pháo hoa
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.coordinates = [];
            this.coordinateCount = 5;
            while (this.coordinateCount--) {
                this.coordinates.push([this.x, this.y]);
            }
            this.angle = random(0, Math.PI * 2);
            this.speed = random(2, 10); // to hơn
            this.friction = 0.95;
            this.gravity = 0.8; // hạt rơi nhanh hơn
            this.hue = random(0, 360);
            this.brightness = random(50, 80);
            this.alpha = 1;
            this.decay = random(0.015, 0.03);
        }
        update(index) {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);
            this.speed *= this.friction;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + this.gravity;
            this.alpha -= this.decay;

            if (this.alpha <= 0.05) {
                particles.splice(index, 1);
            }
        }
        draw() {
            ctx.beginPath();
            ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
            ctx.lineTo(this.x, this.y);
            ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
            ctx.stroke();
        }
    }

    // Tạo hạt
    function createParticles(x, y) {
        let particleCount = 100; // nhiều hạt hơn
        while (particleCount--) {
            particles.push(new Particle(x, y));
        }
    }

    // Vẽ và update
    function loop() {
        requestAnimationFrame(loop);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        // Update pháo hoa
        fireworks.forEach((fw, index) => {
            fw.draw();
            fw.update(index);
        });

        // Update hạt
        particles.forEach((p, index) => {
            p.draw();
            p.update(index);
        });

        // Tạo pháo hoa mới liên tục
        if (Math.random() < 0.1) { // tần suất
            let startX = canvas.width / 2;
            let startY = canvas.height;
            let targetX = random(0, canvas.width);
            let targetY = random(0, canvas.height / 2);
            fireworks.push(new Firework(startX, startY, targetX, targetY));
        }
    }

    loop();
}
