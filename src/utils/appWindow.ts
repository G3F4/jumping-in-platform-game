import Point from '../models/Point';

const canvas = document.querySelector('canvas') as HTMLCanvasElement;

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

const mouse: Point = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

export function registerClickHandler(handler: () => void): void {
  addEventListener('click', handler);
}

export function registerResizeHandler(handler: () => void): void {
  addEventListener('resize', () => {
    setTimeout(handler, 100);
  });
}

export function getMousePosition(): Point {
  return mouse;
}

export function clearDrawingArea(): void {
  const c = getDrawingContext();

  c.clearRect(0, 0, canvas.width, canvas.height);
}

export function getDrawingContext(): CanvasRenderingContext2D {
  const context = canvas.getContext('2d');

  if (context) {
    return context;
  }

  throw new Error('Unable to get canvas drawing 2d context');
}
