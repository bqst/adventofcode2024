# Advent of Code 2024

My solutions for [Advent of Code 2024](https://adventofcode.com/2024) puzzles.

## Prerequisites

- [Deno](https://deno.land/) runtime

## Project Structure

```plaintext
├── dayXX/
│ ├── input.txt # Puzzle input
│ ├── input_test.txt # Example input
│ ├── main.ts # Solution implementation
│ └── main_test.ts # Tests
├── deno.json # Deno configuration
└── main.ts # Entry point
```

## Commands

### Run Solution

```bash
# Run latest day
deno task start

# Run specific day
deno task start --day=1
```

### Development

```bash
# Watch mode
deno task dev

## Test
deno task test
```
