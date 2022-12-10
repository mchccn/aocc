const part1 = (input: string) => {
  const matrix = input.split("\n").map((line) => line.split("").map(Number));
  const transpose = matrix[0].map((_, i) => matrix.map((row) => row[i]));

  return matrix
    .flatMap((line, y) =>
      line.map((_, x) => {
        const lr = matrix[y];
        const td = transpose[x];

        return [
          lr.slice(0, x),
          td.slice(0, y),
          lr.slice(x + 1),
          td.slice(y + 1),
        ].some((a) => a.every((v) => v < matrix[y][x]));
      })
    )
    .filter(Boolean).length;
};

const part2 = (input: string) => {
  const matrix = input.split("\n").map((line) => line.split("").map(Number));
  const transpose = matrix[0].map((_, i) => matrix.map((row) => row[i]));

  return Math.max(...matrix
    .flatMap((line, y) =>
      line.map((_, x) => {
        const lr = matrix[y];
        const td = transpose[x];

        return [
          lr.slice(0, x).reverse(),
          td.slice(0, y).reverse(),
          lr.slice(x + 1),
          td.slice(y + 1),
        ].map((line) => {
          const index = line.findIndex((v) => v >= matrix[y][x]);

          return index < 0 ? line.length : index + 1;
        }).reduce((a, b) => a * b);
      })
    )
  )
};
