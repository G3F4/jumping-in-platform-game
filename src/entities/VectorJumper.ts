import {
  registerKeyDownHandler,
  registerKeyUpHandler,
} from '../utils/appEvents';
import Rect from '../models/Rect';
import { randomRgba } from '../utils/color';
import Vector from '../models/Vector';

export default class VectorJumper {
  static Size = 32;
  static Gravity = 2;
  static GroundFriction = 0.9;
  static AirFriction = 0.9;
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
    private velocity = new Vector(0, 0),
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
    ctx.rect(this.x, this.y, VectorJumper.Size, VectorJumper.Size);
    ctx.fill();
  }

  update(ground: Rect): void {
    if (this.controller.up && !this.jumping) {
      this.velocity = this.velocity.add(new Vector(0, 20));
      this.jumping = true;
    }

    if (this.controller.left) {
      this.velocity = this.velocity.subtract(
        new Vector(VectorJumper.MovingSpeed, 0),
      );
    }

    if (this.controller.right) {
      this.velocity = this.velocity.add(
        new Vector(VectorJumper.MovingSpeed, 0),
      );
    }

    this.x += this.velocity.components[0];
    this.y += this.velocity.components[1];
    this.velocity = this.velocity.add(new Vector(0, VectorJumper.Gravity));
    this.velocity = this.velocity.add(
      new Vector(VectorJumper.GroundFriction, 0),
    );
    this.velocity = this.velocity.add(new Vector(0, VectorJumper.AirFriction));

    if (this.y > ground.y - VectorJumper.Size) {
      this.jumping = false;
      this.y = ground.y - VectorJumper.Size;
      this.velocity = new Vector(this.velocity.components[0], 0);
    }

    if (this.x < -VectorJumper.Size) {
      this.x = ground.width;
    } else if (this.x > ground.width) {
      this.x = -VectorJumper.Size;
    }
  }
}
