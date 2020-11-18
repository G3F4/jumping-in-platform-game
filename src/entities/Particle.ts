import { randomIntFromRange } from '../utils/array';
import Point, { distance } from '../models/Point';

export const particlePhases = ['grow', 'shrink'] as const;
export const particleMaxRadius = 10;
export const particleMoveRandomness = 3;
export const particleRadiusGrowSpeed = 0.3;

export default class Particle implements Point {
  constructor(
    public x: number,
    public y: number,
    private radius: number,
    private color: string | CanvasGradient | CanvasPattern,
    private phase: 'grow' | 'shrink',
  ) {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(props: { ctx: CanvasRenderingContext2D; mouse: Point }): void {
    const { ctx, mouse } = props;

    this.lifeCycle();
    this.move();
    this.checkCollisionWithMouse(mouse);
    this.draw(ctx);
  }

  lifeCycle(): void {
    if (this.phase === 'grow') {
      this.radius +=
        particleRadiusGrowSpeed * randomIntFromRange(0, particleMoveRandomness);

      if (this.radius > particleMaxRadius) {
        this.phase = 'shrink';
      }
    }

    if (this.phase === 'shrink') {
      this.radius -= Math.pow(particleRadiusGrowSpeed, 3);

      if (this.radius < 0) {
        this.radius = 0;
        this.phase = 'grow';
        this.randomPosition();
      }
    }
  }

  checkCollisionWithMouse(mouse: Point): void {
    if (distance(this, mouse) < 100) {
      this.radius += particleRadiusGrowSpeed;
    }
  }

  move(): void {
    this.x += randomIntFromRange(
      -particleMoveRandomness,
      particleMoveRandomness,
    );
    this.y += randomIntFromRange(
      -particleMoveRandomness,
      particleMoveRandomness,
    );
  }

  randomPosition(): void {
    this.x = randomIntFromRange(0, innerWidth);
    this.y = randomIntFromRange(0, innerHeight);
  }
}
