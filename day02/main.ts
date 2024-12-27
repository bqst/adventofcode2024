const process_input = (input: string): number[][] => {
  return input.split("\n").map((line) => line.split(' ').map(Number));
}

const is_safe = (line: number[]): boolean => {
  const is_increasing = line.every((value, index, array) => index === 0 || value >= array[index - 1]);
  const is_decreasing = line.every((value, index, array) => index === 0 || value <= array[index - 1]);

  if(!is_increasing && !is_decreasing) return false;

  return line.every((value, index, array) => {
    if(index === 0) return true;

    const diff = Math.abs(value - array[index - 1]);
    return diff >= 1 && diff <= 3;
  })
}

export const solve_a = (input: string): number => {
  return process_input(input)
    .filter(is_safe)
    .length;
}

const try_dampener = (line: number[]): boolean => {
  if(is_safe(line)) return true;

  for (let i = 0; i < line.length; i++) {
    const dampened = [...line.slice(0, i), ...line.slice(i + 1)];
    if (is_safe(dampened)) return true;
  }
  return false;
}

export const solve_b = (input: string): number => {
  return process_input(input)
    .filter(try_dampener)
    .length;
}