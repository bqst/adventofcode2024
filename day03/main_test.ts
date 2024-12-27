import { assertEquals } from "@std/assert";
import { solve_a, solve_b } from "./main.ts";

const input_a = Deno.readTextFileSync("day03/input_test_a.txt");

Deno.test(function solve_a_test() {
  assertEquals(solve_a(input_a), 161);
});

const input_b = Deno.readTextFileSync("day03/input_test_b.txt");

Deno.test(function solve_b_test() {
  assertEquals(solve_b(input_b), 48);
});