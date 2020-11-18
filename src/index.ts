import { randomIntFromRange } from './utils/array';
import appLoop from './utils/appLoop';
import { randomRgba } from './utils/color';
import Particle, {
  particleMaxRadius,
  particlePhases,
} from './entities/Particle';
import {
  clearDrawingArea,
  getDrawingContext,
  getMousePosition,
  registerClickHandler,
  registerResizeHandler,
} from './utils/appWindow';
import getTextPrinter from './utils/getTextPrinter';

const fps = 24;
const particleCount = Math.hypot(innerWidth, innerHeight);
let particles = createParticles();

appLoop({ fps, onFrame: logic });

function createParticles() {
  const items: Particle[] = [];

  for (let i = 0; i < particleCount; i++) {
    items.push(
      new Particle(
        randomIntFromRange(0, innerWidth),
        randomIntFromRange(0, innerHeight),
        randomIntFromRange(0, particleMaxRadius % i),
        randomRgba(),
        particlePhases[randomIntFromRange(0, 1)],
      ),
    );
  }

  return items;
}

function randomizeParticles() {
  particles.forEach((particle) => particle.randomPosition());
}

function recreateParticles() {
  particles = createParticles();
}

function logic({ currentFps }: { currentFps: number }) {
  const ctx = getDrawingContext();
  const mouse = getMousePosition();
  const textPrinter = getTextPrinter(ctx);

  clearDrawingArea();

  particles.forEach((object) => {
    object.update({ ctx, mouse });
  });

  textPrinter({ text: `FPS: ${currentFps}`, position: { x: 0, y: 10 } });
  textPrinter({
    text: 'HTML CANVAS BOILERPLATE',
    color: randomRgba(),
    position: { x: mouse.x, y: mouse.y },
  });
}

registerClickHandler(randomizeParticles);
registerResizeHandler(recreateParticles);
