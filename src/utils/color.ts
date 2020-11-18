function zeroTo256() {
  return Math.round(Math.random() * 255);
}

function zeroTo1() {
  return Math.random().toFixed(1);
}

export function randomRgba(): string {
  return `rgba(${zeroTo256()},${zeroTo256()},${zeroTo256()},${zeroTo1()})`;
}
