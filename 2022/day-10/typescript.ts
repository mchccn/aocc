const part1 = (input: string) => {
  let x = 1;
  
  let cycles = 0;
  
  const values = input.split("\n").flatMap((instruction) => {
    if (instruction === "noop") return (cycles++, x);
    const v = Number(instruction.slice("addx ".length));
    return [(cycles++, x), (cycles++, x += v, x - v)];
  });

  return values.filter((_, i) => !((i - 20 + 1) % 40)).reduce((total, value, index) => total + value * (20 + index * 40), 0);
};

const part2 = (input: string) => {
  let x = 1;
  
  let cycles = 0;
  
  const values = input.split("\n").flatMap((instruction) => {
    if (instruction === "noop") return (cycles++, x);
    const v = Number(instruction.slice("addx ".length));
    return [(cycles++, x), (cycles++, x += v, x - v)];
  });

  const crt = values.map((value, i) => [value - 1, value, value + 1].includes(i % 40) ? "#" : ".");

  return Array.from({ length: 6 }, (_, i) => crt.slice(i * 40, i * 40 + 40).join("")).join("\n");
};
