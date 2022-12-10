const part1 = (input: string) =>
  input.split("\n")
    .map((line) => line.split(",").map((a) => a.split("-").map(Number)))
    .filter(([[a, b], [c, d]]) => (c <= a && b <= d) || (a <= c && d <= b))
    .length;

const part2 = (input: string) =>
  input.split("\n")
    .map((line) => line.split(",").map((a) => a.split("-").map(Number)))
    .filter(([[a, b], [c, d]]) => a <= d && c <= b)
    .length;
