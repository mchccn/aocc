const part1 = (input: string) =>
  input
    .split("\n")
    .map((line) =>
      line
        .slice(0, line.length / 2)
        .split("")
        .filter((c) => line.slice(line.length / 2).includes(c))[0]
        .codePointAt(0)
    )
    .map((code) => (code >= 97 ? code - 97 + 1 : code - 65 + 1 + 26))
    .reduce((a, b) => a + b);

const part2 = (input: string) =>
  Array.from(input.match(/(?=[\s\S])(?:.*\n?){1,3}/g))
    .map((group) => group.split("\n"))
    .map((group) => group[0].split("").find((c) => group[1].includes(c) && group[2].includes(c)).codePointAt(0))
    .map((code) => (code >= 97 ? code - 97 + 1 : code - 65 + 1 + 26))
    .reduce((a, b) => a + b);
