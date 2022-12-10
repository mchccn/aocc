import rstd from "@kelsny/rstd";

const { option: { None, Some }, iter: { iter } } = rstd;

const part1 = (input: string) => 
  iter(input.split("\n"))
    .scan(1, (_, instruction) => {
      if (instruction === "noop") return Some(iter([_.state]));
      const v = Number(instruction.slice("addx ".length));
      _.state += v;
      return Some(iter([_.state - v, _.state - v]));
    })
    .flatten()
    .enumerate()
    .skip(19)
    .step_by(40)
    .take(6)
    .map(([i, value]) => value * (i + 1))
    .sum();

// part2
