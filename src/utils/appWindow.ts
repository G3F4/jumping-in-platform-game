const canvas = document.querySelector('canvas') as HTMLCanvasElement;

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

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

export interface WindowSize {
  width: number;
  height: number;
}

export function getWindowSize(): WindowSize {
  return {
    width: innerWidth,
    height: innerHeight,
  };
}
