const data = await Deno.readTextFile("./2/data.txt");
// const data = `\
// A Y\r
// B X\r
// C Z`;
const lines = data.split("\r\n");

let total1 = 0;

// Rock A or X
// Paper B or Y
// Scissors C or Z

const points1 = [
  ["A Z", "B X", "C Y"], // lost
  ["A X", "B Y", "C Z"], // draw
  ["A Y", "B Z", "C X"], // won
];

const xCharCode = "X".charCodeAt(0);

for (const line of lines) {
  const score = points1.findIndex((p) => p.includes(line));
  const selection = line.charCodeAt(2) - xCharCode + 1;
  total1 += score * 3 + selection;
}

console.log("total 1:", total1);
// 11475

let total2 = 0;

const aCharCode = "A".charCodeAt(0);
for (const line of lines) {
  const score = line.charCodeAt(2) - xCharCode; // X lose -> 0, Y draw -> 1, Z win -> 2 => *3
  const opponent = line.charCodeAt(0) - aCharCode; // A -> 0, B -> 1, C -> 2
  const selection = ((opponent + score - 1) + 3) % 3 + 1; // win -> +1, draw -> 0, lose -> -1
  total2 += score * 3 + selection;
}

console.log("total 2:", total2);
// 16862
