export const solve_a = (input: string): number => {
  return [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
    .map(([_, a, b]) => [Number(a), Number(b)])
    .reduce((acc, [a, b]) => acc + a * b, 0);
}
export const solve_b = (input: string): number => {
  return [...input.matchAll(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g)]
    .reduce(({sum, enabled}, [full, a, b]) => ({
      sum: enabled && a ? sum + Number(a) * Number(b) : sum,
      enabled: full === "don't()" ? false : full === "do()" ? true : enabled
    }), {sum: 0, enabled: true}).sum;
}