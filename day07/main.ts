type Equation = {
  testValue: number;
  numbers: number[];
}

const parse_input = (input: string): Equation[] => {
  return input.split("\n").map(line => {
    const [test, nums] = line.split(": ");
    return {
      testValue: parseInt(test),
      numbers: nums.split(" ").map(Number)
    };
  });
};

const generateOperators = (length: number, operators: string[]): string[][] => {
  if (length === 0) return [[]];
  const shorter = generateOperators(length - 1, operators);
  return shorter.flatMap(ops => operators.map(op => [...ops, op]));
};

const evaluate = (numbers: number[], operators: string[]): number => {
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      result += numbers[i + 1];
    } else if (operators[i] === '*') {
      result *= numbers[i + 1];
    } else if (operators[i] === '||') {
      result = parseInt(`${result}${numbers[i + 1]}`);
    }
  }
  return result;
};

const canMakeValue = (equation: Equation, operators: string[]): boolean => {
  const ops = generateOperators(equation.numbers.length - 1, operators);
  return ops.some(operators => 
    evaluate(equation.numbers, operators) === equation.testValue
  );
};

export const solve_a = (input: string): number => {
  const equations = parse_input(input);
  return equations
    .filter(eq => canMakeValue(eq, ['+', '*']))
    .reduce((sum, eq) => sum + eq.testValue, 0);
};

export const solve_b = (input: string): number => {
  const equations = parse_input(input);
  return equations
    .filter(eq => canMakeValue(eq, ['+', '*', '||']))
    .reduce((sum, eq) => sum + eq.testValue, 0);
};