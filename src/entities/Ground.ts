import { WindowSize } from '../utils/appWindow';
import Rect from './Rect';

export function getGround(size: WindowSize): Rect {
  const x = 0;
  const y = size.height / 3;
  const height = 16;
  const width = size.width;

  return { x, y, width, height };
}

export function drawGround(
  context: CanvasRenderingContext2D,
  ground: Rect,
): void {
  context.fillStyle = '#202020';
  context.lineWidth = 4;
  context.fillRect(ground.x, ground.y, ground.width, ground.height);
}
