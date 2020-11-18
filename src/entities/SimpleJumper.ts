import {
  registerKeyDownHandler,
  registerKeyUpHandler,
} from '../utils/appEvents';
import Rect from './Rect';
import { randomRgba } from '../utils/color';

export default class SimpleJumper {
  static Size = 32;
  static Gravity = 2;
  static Friction = 0.9;
  static JumpPower = 30;
  static MovingSpeed = 1;

  private controller: {
    left: boolean;
    right: boolean;
    up: boolean;
    keyListener: (event: KeyboardEvent) => void;
  };

  constructor(
    private x = 0,
    private y = 0,
    private jumping = true,
    private xVelocity = 0,
    private yVelocity = 0,
    private color = randomRgba(),
  ) {
    this.controller = {
      left: false,
      right: false,
      up: false,
      keyListener: (event: KeyboardEvent) => {
        const keyState = event.type === 'keydown';

        switch (event.key) {
          case 'ArrowUp':
            this.controller.up = keyState;

            break;
          case 'ArrowLeft':
            this.controller.left = keyState;

            break;
          case 'ArrowRight':
            this.controller.right = keyState;

            break;
        }
      },
    };
    registerKeyDownHandler(this.controller.keyListener);
    registerKeyUpHandler(this.controller.keyListener);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.x, this.y, SimpleJumper.Size, SimpleJumper.Size);
    ctx.fill();
  }

  update(ground: Rect): void {
    if (this.controller.up && !this.jumping) {
      this.yVelocity -= SimpleJumper.JumpPower;
      this.jumping = true;
    }

    if (this.controller.left) {
      this.xVelocity -= SimpleJumper.MovingSpeed;
    }

    if (this.controller.right) {
      this.xVelocity += SimpleJumper.MovingSpeed;
    }

    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.yVelocity += SimpleJumper.Gravity;
    this.xVelocity *= SimpleJumper.Friction;
    this.yVelocity *= SimpleJumper.Friction;

    if (this.y > ground.y - SimpleJumper.Size) {
      this.jumping = false;
      this.y = ground.y - SimpleJumper.Size;
      this.yVelocity = 0;
    }

    if (this.x < -SimpleJumper.Size) {
      this.x = ground.width;
    } else if (this.x > ground.width) {
      this.x = -SimpleJumper.Size;
    }
  }
}
