import Point from '../models/Point';

interface DrawTextProps {
  text: string;
  position: Point;
  color?: string | CanvasGradient | CanvasPattern;
}

export default function getTextPrinter(
  ctx: CanvasRenderingContext2D,
): (props: DrawTextProps) => void {
  return (props: DrawTextProps) => {
    const { text, color = 'black', position } = props;

    ctx.fillStyle = color;
    ctx.fillText(text, position.x, position.y);
  };
}
