import Rect from '../models/Rect';
import Vector from '../models/Vector';
import {
  registerKeyDownHandler,
  registerKeyUpHandler,
} from '../utils/appEvents';

const ON_GROUND = 0;
const LEFT_GROUND_LEFT = 1;
const LEFT_GROUND_RIGHT = 2;

export default class VectorJumper {
  static Size = 32;
  static Speed = 100;
  static MaxSpeed = new Vector(100, 0);
  static JumpUp = new Vector(0, -50);
  static Movement = new Vector(20, 0);
  static GroundFriction = new Vector(15, 0);
  static AirFriction = new Vector(1, 0);
  static Gravity = new Vector(0, 10);

  private controller: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    keyListener: (event: KeyboardEvent) => void;
  };

  constructor(
    private x = 0,
    private y = 0,
    private position = new Vector(0, 0),
    private velocity = new Vector(0, 0),
    private color = 'green',
  ) {
    this.controller = {
      left: false,
      right: false,
      up: false,
      down: false,
      keyListener: (event: KeyboardEvent) => {
        const keyState = event.type === 'keydown';

        switch (event.key) {
          case 'ArrowUp':
            this.controller.up = keyState;

            break;
          case 'ArrowDown':
            this.controller.down = keyState;

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
    const [x, y] = this.position.components;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(x, y, VectorJumper.Size, VectorJumper.Size);
    ctx.fill();
  }

  isMovingRight() {
    return this.velocity.components[0] > 0;
  }

  isMovingLeft() {
    return this.velocity.components[0] < 0;
  }

  isMovingWithMaxSpeed() {
    return this.velocity.components[0] < 0;
  }

  onGround(ground: Rect) {
    const [_, y] = this.position.components;

    return y + VectorJumper.Size >= ground.y;
  }

  hasLeftGround(ground: Rect) {
    const [x] = this.position.components;

    if (x < ground.x - VectorJumper.Size) {
      return LEFT_GROUND_LEFT;
    }

    if (x > ground.x + ground.width) {
      return LEFT_GROUND_RIGHT;
    }

    return 0;
  }

  update(props: { ground: Rect; deltaTime: number }): void {
    const { deltaTime, ground } = props;
    const frameScale = deltaTime / VectorJumper.Speed;

    if (this.controller.up && this.onGround(ground)) {
      this.velocity = this.velocity.add(VectorJumper.JumpUp);
    }

    if (this.controller.right && this.onGround(ground)) {
      this.velocity = this.velocity.add(
        VectorJumper.Movement.scaleBy(frameScale),
      );
    }

    if (this.controller.left && this.onGround(ground)) {
      this.velocity = this.velocity.add(
        VectorJumper.Movement.scaleBy(frameScale).negate(),
      );
    }

    if (this.isMovingLeft()) {
      if (this.onGround(ground)) {
        this.velocity = this.velocity.add(
          VectorJumper.GroundFriction.scaleBy(frameScale),
        );
      } else {
        this.velocity = this.velocity.add(
          VectorJumper.AirFriction.scaleBy(frameScale),
        );
      }
    }

    if (this.isMovingRight()) {
      if (this.onGround(ground)) {
        this.velocity = this.velocity.add(
          VectorJumper.GroundFriction.scaleBy(frameScale).negate(),
        );
      } else {
        this.velocity = this.velocity.add(
          VectorJumper.AirFriction.scaleBy(frameScale).negate(),
        );
      }
    }

    if (this.hasLeftGround(ground) === LEFT_GROUND_LEFT) {
      const [_, y] = this.position.components;

      this.position = new Vector(ground.width, y);
    }

    if (this.hasLeftGround(ground) === LEFT_GROUND_RIGHT) {
      const [_, y] = this.position.components;

      this.position = new Vector(0, y);
    }

    if (!this.onGround(ground)) {
      this.velocity = this.velocity.add(
        VectorJumper.Gravity.scaleBy(frameScale),
      );
    }

    this.position = this.position.add(this.velocity.scaleBy(frameScale));

    if (this.onGround(ground)) {
      const [x] = this.position.components;
      const [velX] = this.velocity.components;

      this.velocity = new Vector(velX, 0);
      this.position = new Vector(x, ground.y - VectorJumper.Size);
    }
  }
}
