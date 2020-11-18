export function randomIntFromRange(
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
