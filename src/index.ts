import appLoop from './utils/appLoop';
import {
  clearDrawingArea,
  getDrawingContext,
  getWindowSize,
} from './utils/appWindow';
import SimpleJumper from './entities/SimpleJumper';
import { drawGround, getGround } from './entities/Ground';
import VectorJumper from './entities/VectorJumper';

const fps = 50;

appLoop({ fps, onFrame: loop });

const context = getDrawingContext();
const simpleJumper = new SimpleJumper();
const vectorJumper = new VectorJumper(0, getWindowSize().height / 3);

function loop() {
  const windowSize = getWindowSize();
  const firstGround = getGround(windowSize, 1);
  const secondGround = getGround(windowSize, 2);

  simpleJumper.update(firstGround);
  vectorJumper.update(secondGround);

  clearDrawingArea();

  drawGround(context, firstGround);
  drawGround(context, secondGround);

  simpleJumper.draw(context);
  vectorJumper.draw(context);
}
