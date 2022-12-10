const part1 = (input: string) => {
  const movements = input
    .split("\n")
    .map((line) => line.split(" "))
    .map(([dir, n]) => [dir, +n]);

  const neighbors = (a, b) => Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;

  const move = () => {
    tail.x += Math.sign(head.x - tail.x);
    tail.y += Math.sign(head.y - tail.y);

    if (!positions.some(({ x, y }) => tail.x === x && tail.y === y)) positions.push({ ...tail });
  };

  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };
  const positions = [{ ...tail }];

  for (const [dir, n] of movements) {
    for (let i = 0; i < n; i++) {
      const _ = {
        L() { head.x-- },
        R() { head.x++ },
        U() { head.y-- },
        D() { head.y++ },
      }[dir]();
      
      if (!neighbors(head, tail)) move();
    }
  }

  return positions.length;
};
                          
const part2 = (input: string) => {
  const movements = input
    .split("\n")
    .map((line) => line.split(" "))
    .map(([dir, n]) => [dir, +n]);

  const neighbors = (a, b) => Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;

  const move = (head, tail) => {
    tail.x += Math.sign(head.x - tail.x);
    tail.y += Math.sign(head.y - tail.y);
  };

  const rope = Array.from({ length: 10 }, () => ({ x: 0, y: 0 }));
  const positions = [];

  for (const [dir, n] of movements) {
    for (let i = 0; i < n; i++) {
      const _ = {
        L() { rope[0].x-- },
        R() { rope[0].x++ },
        U() { rope[0].y-- },
        D() { rope[0].y++ },
      }[dir]();

      for (let j = 0; j < rope.length - 1; j++) {
        if (!neighbors(rope[j], rope[j + 1])) move(rope[j], rope[j + 1]);
      }
      
      if (!positions.some(({ x, y }) => rope.at(-1).x === x && rope.at(-1).y === y)) positions.push({ ...rope.at(-1) });
    }
  }

  return positions.length;
};
