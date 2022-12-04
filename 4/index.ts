const data = await Deno.readTextFile("./4/data.txt");

// const data = `\
// 2-4,6-8\r
// 2-3,4-5\r
// 5-7,7-9\r
// 2-8,3-7\r
// 6-6,4-6\r
// 2-6,4-8`;

const lines = data.split("\r\n");

let total1 = 0;
let total2 = 0;

for (const line of lines) {
  const [first, second] = line.split(",").map((s) => {
    return s.split("-").map((n) => parseInt(n));
  });
  const firstComp = first[0] - second[0]; // start of first -> start of second
  const secondComp = first[1] - second[1]; // end of first -> end of second

  if (
    (firstComp <= 0 && secondComp >= 0) || // first in second
    (firstComp >= 0 && secondComp <= 0) // second in first
  ) {
    total1++;
  }

  // first overlaps second
  // second overlaps first

  if (
    (first[0] <= second[1] && first[1] >= second[0]) ||
    (second[0] <= first[1] && second[1] >= first[0])
  ) {
    total2++;
  }
}

console.log("total 1:", total1);
// 450

console.log("total 2:", total2);
// 837
