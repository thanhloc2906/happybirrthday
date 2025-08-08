// Fireworks.js
import Fireworks from "https://cdn.jsdelivr.net/npm/fireworks-js@2.9.2/dist/fireworks.module.js";

export function startFireworks() {
  const container = document.body;
  const fireworks = new Fireworks(container, {
    rocketsPoint: { min: 0, max: 100 },
    hue: { min: 0, max: 360 },
    delay: { min: 15, max: 30 },
    speed: 2,
    acceleration: 1.05,
    friction: 0.95,
    gravity: 1.5,
    particles: 100,
    trace: 3,
    explosion: 5,
    boundaries: {
      top: 0,
      bottom: container.clientHeight,
      left: 0,
      right: container.clientWidth
    },
    sound: { enabled: false }
  });

  fireworks.start();
}
