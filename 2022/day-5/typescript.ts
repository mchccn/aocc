const part1 = (input: string) => {
  const [stacks, instructions] = input.split("\n\n");

  const [count, ...state] = stacks.split("\n").reverse();

  const crates = Array.from({ length: count.split("   ").length }, () => []);
  
  for (const line of state) {
    for (const [crate, letter] of Array.from(line.match(/(.{3})( |$)/g) ?? []).entries()) {
      if (letter.trim()) crates[crate].push(letter[1]);
    }
  }

  for (const inst of instructions.split("\n")) {
    const [, move, from, to] = Array.from(inst.match(/move (\d+) from (\d+) to (\d+)/) ?? []).map(Number);

    crates[to - 1].push(...crates[from - 1].splice(crates[from - 1].length - move, move).reverse());
  }

  return crates.map((stack) => stack.at(-1)).join("");
};

const part2 = (input: string) => {
  const [stacks, instructions] = input.split("\n\n");

  const [count, ...state] = stacks.split("\n").reverse();

  const crates = Array.from({ length: count.split("   ").length }, () => []);
  
  for (const line of state) {
    for (const [crate, letter] of Array.from(line.match(/(.{3})( |$)/g) ?? []).entries()) {
      if (letter.trim()) crates[crate].push(letter[1]);
    }
  }

  for (const inst of instructions.split("\n")) {
    const [, move, from, to] = Array.from(inst.match(/move (\d+) from (\d+) to (\d+)/) ?? []).map(Number);

    crates[to - 1].push(...crates[from - 1].splice(crates[from - 1].length - move, move));
  }

  return crates.map((stack) => stack.at(-1)).join("");
};

