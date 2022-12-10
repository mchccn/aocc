const part1 = (input: string) => {
  const listings = input.split(/(?=^\$ cd)/m);

  const tree = Object.assign(Object.create(null), { ["/"]: { dir: true, size: 0 } });
  const path = [];
  
  listings.forEach((listing) => {
    const [cd, _, ...entries] = listing.trim().split("\n");

    const dir = cd.match(/^\$ cd (.+)/)[1];

    if (dir === "..") return path.pop();
    
    path.push(dir);

    entries.forEach((entry) => {
      const [size, name] = entry.split(" ");

      if (size !== "dir") {
        path.forEach((_, i) => {
          tree[path.slice(0, i + 1).join("/")].size += +size;
        });
        tree[path.concat(name).join("/")] = { dir: false, size: +size };
      } else {
        tree[path.concat(name).join("/")] = { dir: true, size: 0 };
      }
    });
  });

  return Object.values(tree)
    .filter(({ dir, size }) => dir && size <= 100000)
    .reduce((total, { size }) => total + size, 0);
};

const part2 = (input: string) => {
  const listings = input.split(/(?=^\$ cd)/m);

  const tree = Object.assign(Object.create(null), { ["/"]: { dir: true, size: 0 } });
  const path = [];
  
  listings.forEach((listing) => {
    const [cd, _, ...entries] = listing.trim().split("\n");

    const dir = cd.match(/^\$ cd (.+)/)[1];

    if (dir === "..") return path.pop();
    
    path.push(dir);

    entries.forEach((entry) => {
      const [size, name] = entry.split(" ");

      if (size !== "dir") {
        path.forEach((_, i) => {
          tree[path.slice(0, i + 1).join("/")].size += +size;
        });
        tree[path.concat(name).join("/")] = { dir: false, size: +size };
      } else {
        tree[path.concat(name).join("/")] = { dir: true, size: 0 };
      }
    });
  });

  const unused = 70000000 - tree["/"].size;
  
  return Math.min(...Object.values(tree)
    .filter(({ dir, size }) => dir && unused + size >= 30000000)
    .map(({ size }) => size));
};
