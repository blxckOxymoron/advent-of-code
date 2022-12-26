import chalkin from "https://deno.land/x/chalkin@v0.1.3/mod.ts";

class Cell {
  static start: Cell;
  static end: Cell;

  x: number;
  y: number;
  height: number;
  cost: number;
  parent?: Cell;
  fromDir?: [number, number];
  goalPathDir?: [number, number];

  get beeline() {
    return Math.hypot(
      this.x - Cell.end.x,
      this.y - Cell.end.y,
      this.height - Cell.end.height,
    );
  }

  get factor() {
    return this.cost + this.beeline;
  }

  constructor(x: number, y: number, height: number) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.cost = Infinity;
  }
}

const data = await Deno.readTextFile("./12/data.txt");

// (⬇️, ➡️) -> (y, x)
const letterGrid = data.split("\r\n").map((l) => l.split(""));

// find start & end
for (const [y, row] of letterGrid.entries()) {
  for (const [x, cell] of row.entries()) {
    if (cell === "S") {
      letterGrid[y][x] = "a";
      Cell.start = new Cell(x, y, 0);
      Cell.start.cost = 0;
    } else if (cell === "E") {
      letterGrid[y][x] = "z";
      Cell.end = new Cell(x, y, 25);
    }
  }
}

const aCharCode = "a".charCodeAt(0);
const grid = letterGrid.map((row, y) =>
  row.map((cell, x) => new Cell(x, y, cell.charCodeAt(0) - aCharCode))
);
grid[Cell.start.y][Cell.start.x] = Cell.start;
grid[Cell.end.y][Cell.end.x] = Cell.end;

const styles: ((s: string) => string)[] = [
  (s) => chalkin.gray(s),
  (s) => chalkin.white(s),
  (s) => chalkin.magenta(s),
  (s) => chalkin.magentaBright(s),
  (s) => chalkin.blue(s),
  (s) => chalkin.cyan(s),
  (s) => chalkin.blueBright(s),
  (s) => chalkin.greenBright(s),
  (s) => chalkin.green(s),
  (s) => chalkin.yellowBright(s),
  (s) => chalkin.yellow(s),
  (s) => chalkin.red(s),
];

function addGoalPathDir() {
  grid.flat().forEach((cell) => cell.goalPathDir = undefined);

  let currentCell = Cell.end;
  Cell.start.parent = undefined;
  while (currentCell.parent) {
    currentCell.parent.goalPathDir = currentCell.fromDir;
    currentCell = currentCell.parent;
  }
}

function show() {
  addGoalPathDir();
  console.log(
    grid.map((row, y) =>
      row.map((cell, x) => {
        const letter = cell.goalPathDir
          ? arrows[cell.goalPathDir.join(",") as keyof typeof arrows]
          : String.fromCharCode(aCharCode + cell.height);
        // const letter = cell.height.toString().padStart(2, "0");

        if (
          (Cell.start.y === y && Cell.start.x === x) ||
          (Cell.end.y === y && Cell.end.x === x)
        ) {
          return chalkin.bgBlue(letter);
        } else {
          const styleNumber = Math.floor(
            grid[y][x].height / 26 * styles.length,
          );

          return styles[styleNumber](letter);
        }
      }).join(" ")
    ).join("\n"),
  );
}

show();

const arrows = {
  "0,1": "➡️",
  "1,0": "⬇️",
  "0,-1": "⬅️",
  "-1,0": "⬆️",
};

const directions: [number, number][] = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function search() {
  const quene: Cell[] = [Cell.start];

  while (quene.length) {
    const q = quene.sort((a, b) => a.factor - b.factor).shift();
    if (!q) break;

    for (const dir of directions) {
      const neighbor = grid[q.y + dir[0]]?.[q.x + dir[1]];
      if (!neighbor) continue;
      if (neighbor.height > q.height + 1) continue;
      if (neighbor.cost <= q.cost + 1) continue;

      neighbor.fromDir = dir;
      neighbor.parent = q;
      neighbor.cost = q.cost + 1;

      if (neighbor.x === Cell.end.x && neighbor.y === Cell.end.y) {
        return neighbor.cost;
      }

      if (!quene.includes(neighbor)) quene.push(neighbor);
    }
  }
  return Infinity;
}

console.log("cost:", search());
// cost: 383

show();

//! inefficient
let min = Infinity;
let minCell = Cell.start;
for (const cell of grid.flat().filter((c) => c.height === 0)) {
  Cell.start = cell;
  Cell.start.cost = 0;

  const path = search();

  if (path < min) {
    min = path;
    minCell = cell;
  }
}

Cell.start = minCell;
Cell.start.cost = 0;
search();
show();

console.log("min:", min);
// min: 377
