const outcomes1 = {
  //   | rps score + ldw score |
  "A X": 1         + 3         , // rock     + draw
  "A Y": 2         + 6         , // paper    + win
  "A Z": 3         + 0         , // scissors + lose
  "B X": 1         + 0         , // rock     + lose
  "B Y": 2         + 3         , // paper    + draw
  "B Z": 3         + 6         , // scissors + win
  "C X": 1         + 6         , // rock     + win
  "C Y": 2         + 0         , // paper    + lose
  "C Z": 3         + 3         , // scissors + draw
};

const part1 = (input: string) => input.split("\n")
  .map((line) => outcomes1[line])
  .reduce((a, b) => a + b);
  
const outcomes2 = {
  //   | rps score + ldw score |
  "A X": 3         + 0         , // scissors + lose
  "A Y": 1         + 3         , // rock     + draw
  "A Z": 2         + 6         , // paper    + win
  "B X": 1         + 0         , // rock     + lose
  "B Y": 2         + 3         , // paper    + draw
  "B Z": 3         + 6         , // scissors + win
  "C X": 2         + 0         , // paper    + lose
  "C Y": 3         + 3         , // scissors + draw
  "C Z": 1         + 6         , // rock     + win
};

const part2 = (input: string) => input.split("\n")
  .map((line) => outcomes2[line])
  .reduce((a, b) => a + b);
