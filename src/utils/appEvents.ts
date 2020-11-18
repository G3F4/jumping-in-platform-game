import Point from '../models/Point';

const mouse: Point = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

export function registerResizeHandler(handler: () => void): void {
  addEventListener('resize', () => {
    setTimeout(handler, 100);
  });
}

export function getMousePosition(): Point {
  return mouse;
}

export function registerClickHandler(handler: () => void): void {
  addEventListener('click', handler);
}

export function registerKeyDownHandler(
  handler: (event: KeyboardEvent) => void,
): void {
  window.addEventListener('keydown', handler);
}
export function registerKeyUpHandler(
  handler: (event: KeyboardEvent) => void,
): void {
  window.addEventListener('keyup', handler);
}
