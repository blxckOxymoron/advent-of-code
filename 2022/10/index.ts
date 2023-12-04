const data = await Deno.readTextFile("./10/data.txt");

const lines = data.split("\r\n");

let x = 1;
let cycle = 1;

let total = 0;

let display = "";

for (const line of lines) {
  // beginning of nth cycle
  if (cycle % 40 === 20) total += x * cycle;
  draw();

  if (line.startsWith("noop")) {
    cycle++;
    // end of nth cycle
  } else if (line.startsWith("addx")) {
    const add = parseInt(line.slice("addx ".length));

    cycle++;

    if ((cycle) % 40 === 20) total += x * cycle;
    draw();

    cycle++;
    x += add;
    // end of n+1th cycle
  } else console.log("invalid line");
}

console.log("total:", total);
// total: 12520

function draw() {
  // 5 -> x = 3, 4, 5
  const isLit = Math.abs((cycle % 40) - (x + 1)) <= 1;
  if (isLit) display += "#";
  else display += ".";
  if (cycle % 40 === 0) {
    console.log(display);
    display = "";
  }
}

/**
 * ####.#..#.###..####.###....##..##..#....
 * #....#..#.#..#....#.#..#....#.#..#.#...#
 * ###..####.#..#...#..#..#....#.#....#...#
 * #....#..#.###...#...###.....#.#.##.#...#
 * #....#..#.#....#....#....#..#.#..#.#....
 * ####.#..#.#....####.#.....##...###.####.
 *
 * EHPZPJGL
 */
