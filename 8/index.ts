import chalkin from "https://deno.land/x/chalkin@v0.1.3/mod.ts";

const data = await Deno.readTextFile("./8/data.txt"); // 99x99

// const data = `\
// 30373\r
// 25512\r
// 65332\r
// 33549\r
// 35390`;

const grid = data.split("\r\n").map((line) =>
  line.split("").map((m) => parseInt(m))
);
const visibilityGrid: boolean[][] = Array.from(
  { length: grid.length },
  () => Array.from({ length: grid[0].length }, () => false),
);

const size = grid.length;
for (let i = 0; i < size; i++) { // square
  // rows
  let leftMax = -1;
  let rightMax = -1;
  let topMax = -1;
  let bottomMax = -1;
  for (let j = 0; j < size; j++) {
    if (grid[i][j] > leftMax) {
      leftMax = grid[i][j];
      visibilityGrid[i][j] = true;
    }
    if (grid[i][size - j - 1] > rightMax) {
      rightMax = grid[i][size - j - 1];
      visibilityGrid[i][size - j - 1] = true;
    }
    if (grid[j][i] > topMax) {
      topMax = grid[j][i];
      visibilityGrid[j][i] = true;
    }
    if (grid[size - j - 1][i] > bottomMax) {
      bottomMax = grid[size - j - 1][i];
      visibilityGrid[size - j - 1][i] = true;
    }
  }
}

showVisibilityGrid();

function showVisibilityGrid() {
  console.log(
    grid.map((row, i) =>
      row.reduce(
        (acc, m, j) =>
          acc + (visibilityGrid[i][j] ? chalkin.green(m) : chalkin.gray(m)),
        "",
      )
    ).join("\n"),
  );
}

console.log("visible:", visibilityGrid.flat().filter((m) => m).length);
// visible: 1845

