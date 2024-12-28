import { parseArgs } from "jsr:@std/cli/parse-args";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const flags = parseArgs(Deno.args);

  const day = flags.day?.toString().padStart(2, "0") ?? "05";

  const input = Deno.readTextFileSync(`day${day}/input.txt`);

  const { solve_a, solve_b } = await import(`./day${day}/main.ts`);

  console.log(`Day ${day.toString().padStart(2, "0")}`);
  console.log(`Part A: ${solve_a(input)}`);
  console.log(`Part B: ${solve_b(input)}`);
}
