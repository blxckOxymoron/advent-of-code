// https://adventofcode.com/2022/day/1

const data = await Deno.readTextFile("./1/data.txt");

const lines = data.split("\r\n");

let max = -Infinity, current = 0;
let cells = 0;

for (const line of lines) {
  if (line === "") {
    current = 0;
    cells++;
  } else {
    current += parseInt(line);
    if (current > max) max = current;
  }
}

console.log("cells:", cells, "max:", max);
// 247 66719

current = 0;
const maxes = new Array(3).fill(-Infinity);

for (const line of lines) {
  if (line === "") {
    current = 0;
  } else {
    current += parseInt(line);
    const isGreater = maxes.findIndex((m) => current >= m);
    if (isGreater !== -1) {
      maxes.splice(isGreater, 0, current);
      maxes.splice(3);
    }
  }
}

console.log("maxes:", maxes, "total:", maxes.reduce((a, b) => a + b));
// [ 66719, 66339, 65493 ] 198551
