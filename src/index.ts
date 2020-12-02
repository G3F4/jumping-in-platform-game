import appLoop, { FrameProps } from './utils/appLoop';
import {
  clearDrawingArea,
  getDrawingContext,
  getWindowSize,
} from './utils/appWindow';
import SimpleJumper from './entities/SimpleJumper';
import { drawGround, getGround } from './entities/Ground';
import VectorJumper from './entities/VectorJumper';

const fps = 50;

appLoop({ fps, onFrame });

const context = getDrawingContext();
const simpleJumper = new SimpleJumper();
const vectorJumper = new VectorJumper(0, getWindowSize().height / 3);

function onFrame({ fpsInterval, currentFps, elapsed }: FrameProps) {
  updateObjects({ fpsInterval, currentFps, elapsed });
  clearDrawingArea();
  drawFrame();
}

function updateObjects({ fpsInterval, currentFps, elapsed }: FrameProps) {
  const windowSize = getWindowSize();
  const firstGround = getGround(windowSize, 1);
  const secondGround = getGround(windowSize, 2);

  simpleJumper.update(firstGround);
  vectorJumper.update({ ground: secondGround, deltaTime: elapsed });
}

function drawFrame() {
  const windowSize = getWindowSize();
  const firstGround = getGround(windowSize, 1);
  const secondGround = getGround(windowSize, 2);

  drawGround(context, firstGround);
  drawGround(context, secondGround);

  simpleJumper.draw(context);
  vectorJumper.draw(context);
}
