let frameCount = 0;
let fpsInterval: number,
  startTime: number,
  now: number,
  then: number,
  elapsed: number,
  loop: (loopTime: number) => void;

export interface FrameProps {
  currentFps: number;
  fpsInterval: number;
  elapsed: number;
}

export type OnFrame = (props: FrameProps) => void;

export default function appLoop({
  fps,
  onFrame,
}: {
  fps: number;
  onFrame: OnFrame;
}): void {
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  loop = createLoop(onFrame);
  loop(startTime);
}

function createLoop(logic: OnFrame) {
  return (loopTime: number) => {
    requestAnimationFrame(loop);

    now = loopTime;
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      const sinceStart = now - startTime;
      const currentFps =
        Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;

      logic({ currentFps, fpsInterval, elapsed });
    }
  };
}
