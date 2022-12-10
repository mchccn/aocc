const part1 = (input: string) => input.match(/(.)(?!\1)(.)(?!\1|\2)(.)(?!\1|\2|\3)(.)/).index + 4;

const part2 = (input: string) => input.match(new RegExp(new Array(14).fill().map((_, i) => i === 14 - 1 ? "(.)" : `(.)(?!${new Array(i + 1).fill().map((_, i) => `\\${i + 1}`).join("|")})`).join(""))).index + 14;
