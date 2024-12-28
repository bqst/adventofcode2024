const process_input = (input: string): {rules: Set<string>, updates: number[][]} => {
  const lines = input.split("\n");

  const rules = new Set(lines
    .filter((line) => line.includes("|")));

  const updates = lines
    .filter(line => line.includes(","))
    .map(line => line.split(",").map(Number));

  return {
    rules,
    updates
  }
}

const getMiddleElement = (arr: number[]): number => arr[Math.floor(arr.length / 2)];

export const solve_a = (input: string): number => {
  const { rules, updates } = process_input(input);

  return updates
    .filter(update => update.every((value, i) => 
      update.slice(i + 1).every(nextValue => !rules.has(`${nextValue}|${value}`))
    ))
    .map(getMiddleElement)
    .reduce((acc, value) => acc + value, 0);
}

const sortUpdate = (update: number[], rules: Set<string>): number[] => {
  return update.slice().sort((a, b) => {
    if (rules.has(`${a}|${b}`)) return -1;
    if (rules.has(`${b}|${a}`)) return 1;
    return 0;
  });
};

export const solve_b = (input: string): number => {
  const { rules, updates } = process_input(input);

  return updates
    .filter(update => !update.every((value, i) => 
      update.slice(i + 1).every(nextValue => !rules.has(`${nextValue}|${value}`))
    ))
    .map(update => getMiddleElement(sortUpdate(update, rules)))
    .reduce((acc, value) => acc + value, 0);
};