const part1 = (input: string) => Math.max(...input.split("\n\n")
  .map((chunk) => chunk.split("\n")
    .map(Number)
    .reduce((a, b) => a + b)
  )
);

const part2 = (input: string) => input.split("\n\n")
  .map((chunk) => chunk.split("\n")
    .map(Number)
    .reduce((a, b) => a + b)
  )
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b);
