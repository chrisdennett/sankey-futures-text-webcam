export function map(value, in_min, in_max, out_min, out_max) {
  const inRange = in_max - in_min;
  const outRange = out_max - out_min;
  const mapped = ((value - in_min) * outRange) / inRange + out_min;

  return clamp(mapped, out_min, out_max);
}

function clamp(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
