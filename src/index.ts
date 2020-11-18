import appLoop from './utils/appLoop';
import {
  clearDrawingArea,
  getDrawingContext,
  getWindowSize,
} from './utils/appWindow';
import SimpleJumper from './entities/SimpleJumper';
import { drawGround, getGround } from './entities/Ground';

const fps = 50;

appLoop({ fps, onFrame: loop });

const context = getDrawingContext();
const jumper = new SimpleJumper();

function loop() {
  const windowSize = getWindowSize();
  const ground = getGround(windowSize);

  jumper.update(ground);
  clearDrawingArea();
  drawGround(context, ground);
  jumper.draw(context);
}
