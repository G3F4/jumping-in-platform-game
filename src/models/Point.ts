export default class Point {
  constructor(public x = 0, public y = 0) {}
}

export function distance(first: Point, second: Point): number {
  const xDist = second.x - first.x;
  const yDist = second.y - first.y;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
