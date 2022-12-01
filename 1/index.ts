// https://adventofcode.com/2022/day/1

const data = await Deno.readTextFile("./1/data.txt");

const lines = data.split("\n");

let max = -Infinity, current = 0;
let cells = 0;

for (const line of lines) {
  if (line.trim() === "") {
    current = 0;
    cells++;
  } else {
    current += parseInt(line);
    if (current > max) max = current;
  }
}

console.log("cells:", cells, "max:", max);
// 247 66719
