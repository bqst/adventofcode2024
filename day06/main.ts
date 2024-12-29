const parse_input = (input: string): string[][] => {
  return input.split('\n').map(line => line.split(''));
};

const directions = [
  [-1, 0],  // UP (0)
  [0, 1],   // RIGHT (1)
  [1, 0],   // DOWN (2)
  [0, -1]   // LEFT (3)
];

const isWithinBounds = (x: number, y: number, grid: string[][]): boolean => {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
};

const turnRight = (direction: number): number => {
  return (direction + 1) % 4;
};

const findGuardPosition = (grid: string[][]): [number, number] => {
  const position = grid.flatMap((row, i) => row.map((cell, j) => cell === '^' ? [i, j] : null)).find(pos => pos !== null);
  return position ? position as [number, number] : [0, 0];
};

const moveGuard = (grid: string[][], startX: number, startY: number): Set<string> => {
  const visited = new Set<string>();
  let x = startX;
  let y = startY;
  let direction = 0; // Start facing up
  let steps = 0;
  const maxSteps = grid.length * grid[0].length * 4; // Maximum possible steps before loop

  while (isWithinBounds(x, y, grid) && steps < maxSteps) {
    visited.add(`${x},${y}`);
    steps++;
    
    const [dx, dy] = directions[direction];
    const nextX = x + dx;
    const nextY = y + dy;

    if (!isWithinBounds(nextX, nextY, grid)) {
      break; // Exit if next move is out of bounds
    }

    if (grid[nextX][nextY] === '#') {
      direction = turnRight(direction);
    } else {
      x = nextX;
      y = nextY;
    }
  }

  return visited;
};

export const solve_a = (input: string): number => {
  const grid = parse_input(input);
  const [startX, startY] = findGuardPosition(grid);

  const visited = moveGuard(grid, startX, startY);
  return visited.size;
};

const detectLoop = (grid: string[][], startX: number, startY: number): boolean => {
  const visited = new Set<string>();
  let x = startX, y = startY, direction = 0;
  
  while (isWithinBounds(x, y, grid)) {
    const state = `${x},${y},${direction}`;
    if (visited.has(state)) return true;
    visited.add(state);
    
    const [dx, dy] = directions[direction];
    const nextX = x + dx, nextY = y + dy;
    
    if (!isWithinBounds(nextX, nextY, grid)) return false;
    
    if (grid[nextX][nextY] === '#') {
      direction = turnRight(direction);
    } else {
      x = nextX;
      y = nextY;
    }
  }
  return false;
}

const testPosition = (grid: string[][], startX: number, startY: number, obstacleX: number, obstacleY: number): boolean =>{
  const testGrid = grid.map(row => [...row]);
  testGrid[obstacleX][obstacleY] = '#';
  return detectLoop(testGrid, startX, startY);
}

export const solve_b = (input: string): number => {
  const grid = parse_input(input);
  const [startX, startY] = findGuardPosition(grid);
  
  return grid.flatMap((row, x) => 
    row.map((cell, y) => 
      cell === '.' && (x !== startX || y !== startY) && 
      testPosition(grid, startX, startY, x, y)
    ).filter(Boolean)
  ).length;
};