const process_input = (input: string): string[][] => {
  return input.split("\n").map((line) => line.split(''));
}

const directions = [
  [0, 1], // right
  [0, -1], // left
  [1, 0], // down
  [-1, 0], // up
  [-1, -1], // up-left
  [-1, 1], // up-right
  [1, -1], // down-left
  [1, 1], // down-right
];

const WORD = "XMAS";

const getWord = (grid: string[][], x: number, y: number, [dx, dy]: number[]): string => {
  return [...WORD].map((_, i) => grid[x + dx * i]?.[y + dy * i])
    .filter(Boolean)
    .join('');
};

export const solve_a = (input: string): number => {
  const grid = process_input(input);
  const height = grid.length;
  const width = grid[0].length;
  
  return [...Array(height)].reduce((count, _, x) => 
    count + [...Array(width)].reduce((rowCount, _, y) =>
      rowCount + directions.reduce((dirCount, dir) =>
        dirCount + (getWord(grid, x, y, dir) === WORD ? 1 : 0)
      , 0)
    , 0)
  , 0);
};

const getMAS = (grid: string[][], x: number, y: number, [dx, dy]: number[]): string => {
  return [...'MAS'].map((_, i) => grid[x + dx * i]?.[y + dy * i])
    .filter(Boolean)
    .join('');
};

const isValidXMAS = (grid: string[][], x: number, y: number): boolean => {
  const validPatterns = [
    ['MAS', 'MAS'],
    ['MAS', 'SAM'],
    ['SAM', 'MAS'],
    ['SAM', 'SAM']
  ];

  const downRight = getMAS(grid, x, y, [1, 1]);
  const downLeft = getMAS(grid, x, y + 2, [1, -1]);

  return validPatterns.some(([p1, p2]) => 
    (downRight === p1 && downLeft === p2) || 
    (downRight === p2 && downLeft === p1)
  );
};

export const solve_b = (input: string): number => {
  const grid = process_input(input);
  const height = grid.length;
  const width = grid[0].length;
  
  return [...Array(height)].reduce((count, _, x) => 
    count + [...Array(width)].reduce((rowCount, _, y) =>
      rowCount + (isValidXMAS(grid, x, y) ? 1 : 0)
    , 0)
  , 0);
};