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

let max = 0;

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const score = getScenicScore(i, j);
    if (score > max) {
      max = score;
    }
  }
}

function getScenicScore(x: number, y: number): number {
  let leftView: number | undefined;
  let rightView: number | undefined;
  let topView: number | undefined;
  let bottomView: number | undefined;

  for (let d = 1; d <= size; d++) {
    if (leftView === undefined) {
      if (grid[x][y - d] === undefined) {
        leftView = d - 1;
      } else if (grid[x][y - d] >= grid[x][y]) {
        leftView = d;
      }
    }

    if (rightView === undefined) {
      if (grid[x][y + d] === undefined) {
        rightView = d - 1;
      } else if (grid[x][y + d] >= grid[x][y]) {
        rightView = d;
      }
    }

    if (topView === undefined) {
      if (grid[x - d] === undefined) {
        topView = d - 1;
      } else if (grid[x - d][y] >= grid[x][y]) {
        topView = d;
      }
    }

    if (bottomView === undefined) {
      if (grid[x + d] === undefined) {
        bottomView = d - 1;
      } else if (grid[x + d][y] >= grid[x][y]) {
        bottomView = d;
      }
    }
  }

  return (leftView ?? 0) * (rightView ?? 0) * (topView ?? 0) *
    (bottomView ?? 0);
}

console.log("max:", max);
// max: 230112
