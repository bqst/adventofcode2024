const process_input = (input: string): { left_list: number[], right_list: number[] } => {
  const [left_list, right_list] = input
    .split("\n")
    .reduce(
      ([lefts, rights], line) => {
        const [left, right] = line.trim().split(/\s+/);
        return [
          [...lefts, parseInt(left)],
          [...rights, parseInt(right)]
        ];
      },
      [[], []] as [number[], number[]]
    );

  return {
    left_list: left_list.sort(),
    right_list: right_list.sort()
  };
}

export const solve_a = (input: string): number => {
  const { left_list, right_list } = process_input(input);

  return left_list
    .map((value, index) => Math.abs(value - right_list[index]))
    .reduce((acc, value) => acc + value, 0);
}

export const solve_b = (input: string): number => {
  const { left_list, right_list } = process_input(input);
  
  return left_list
    .map((value) => value * right_list.filter((right) => right === value).length)
    .reduce((acc, value) => acc + value, 0);
}