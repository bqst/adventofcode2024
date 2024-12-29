import { assertEquals } from "@std/assert";
import { solve_a, solve_b } from "./main.ts";

const input = Deno.readTextFileSync("day07/input_test.txt");

Deno.test(function solve_a_test() {
  assertEquals(solve_a(input), 3749);
});

Deno.test(function solve_b_test() {
  assertEquals(solve_b(input), 11387);
});