const boxes1 = [
  // left = top
  ["J", "F", "C", "N", "D", "B", "W"],
  ["T", "S", "L", "Q", "V", "Z", "P"],
  ["T", "J", "G", "B", "Z", "P"],
  ["C", "H", "B", "Z", "J", "L", "T", "D"],
  ["S", "J", "B", "V", "G"],
  ["Q", "S", "P"],
  ["N", "P", "M", "L", "F", "D", "V", "B"],
  ["R", "L", "D", "B", "F", "M", "S", "P"],
  ["R", "T", "D", "V"],
];
const boxes2 = [
  // left = top
  ["J", "F", "C", "N", "D", "B", "W"],
  ["T", "S", "L", "Q", "V", "Z", "P"],
  ["T", "J", "G", "B", "Z", "P"],
  ["C", "H", "B", "Z", "J", "L", "T", "D"],
  ["S", "J", "B", "V", "G"],
  ["Q", "S", "P"],
  ["N", "P", "M", "L", "F", "D", "V", "B"],
  ["R", "L", "D", "B", "F", "M", "S", "P"],
  ["R", "T", "D", "V"],
];

const data = await Deno.readTextFile("./5/data.txt");

const lines = data.split("\r\n");

const inputRegex = /move (\d+) from (\d+) to (\d+)/;

for (const line of lines) {
  const [count, from, to] = line.match(inputRegex)
    ?.map((m) => parseInt(m))
    ?.filter((m) => !isNaN(m)) ??
    [0, 1, 1];

  const elements1 = boxes1[from - 1].splice(0, count);
  boxes1[to - 1].unshift(...elements1.reverse());

  const elements2 = boxes2[from - 1].splice(0, count);
  boxes2[to - 1].unshift(...elements2);
}

const topBoxes = (boxes: string[][]) => boxes.map((b) => b[0]).join("");

console.log("boxes1", topBoxes(boxes1));
console.log("boxes2", topBoxes(boxes2));

// boxes1 LBLVVTVLP
// boxes2 TPFFBDRJD
