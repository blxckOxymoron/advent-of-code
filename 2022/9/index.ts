const data = await Deno.readTextFile("./9/data.txt");

// const data = `\
// R 4\r
// U 4\r
// L 3\r
// D 1\r
// R 4\r
// D 1\r
// L 5\r
// R 2`;

const lines = data.split("\r\n");

const dirs: Record<"R" | "L" | "D" | "U", [number, number]> = {
  R: [0, 1],
  L: [0, -1],
  D: [1, 0],
  U: [-1, 0],
};

const headLocation = [0, 0];
const tailLocation = [0, 0];

// 0 > head, 9 > tail
const rope: [number, number][] = Array.from({ length: 10 }, () => [0, 0]);

const maxLocation = [0, 0];
const minLocation = [0, 0];

const visited = new Set();
visited.add(tailLocation.join(","));

const visitedPart2 = new Set();
visitedPart2.add("0,0");

for (const line of lines) {
  const dir = dirs[line[0] as keyof typeof dirs];
  const distance = parseInt(line.slice(2));

  // show();
  // showPart2();
  for (let i = 0; i < distance; i++) {
    move(dir);
    movePart2(dir);
    // show();
    // showPart2();
  }
}

function move(dir: [number, number]) {
  headLocation[0] += dir[0];
  headLocation[1] += dir[1];

  maxLocation[0] = Math.max(maxLocation[0], headLocation[0]);
  maxLocation[1] = Math.max(maxLocation[1], headLocation[1]);
  minLocation[0] = Math.min(minLocation[0], headLocation[0]);
  minLocation[1] = Math.min(minLocation[1], headLocation[1]);

  const relativeLocation = [
    headLocation[0] - tailLocation[0],
    headLocation[1] - tailLocation[1],
  ];

  if (Math.hypot(...relativeLocation) < 1.5) return;

  if (Math.abs(relativeLocation[0]) >= 1) {
    tailLocation[0] += Math.sign(relativeLocation[0]);
  }
  if (Math.abs(relativeLocation[1]) >= 1) {
    tailLocation[1] += Math.sign(relativeLocation[1]);
  }
  visited.add(tailLocation.join(","));
}

function movePart2(dir: [number, number]) {
  rope[0][0] += dir[0];
  rope[0][1] += dir[1];

  for (let i = 1; i < rope.length; i++) {
    const relativeLocation = [
      rope[i - 1][0] - rope[i][0],
      rope[i - 1][1] - rope[i][1],
    ];

    if (Math.hypot(...relativeLocation) < 1.5) continue;

    if (Math.abs(relativeLocation[0]) >= 1) {
      rope[i][0] += Math.sign(relativeLocation[0]);
    }

    if (Math.abs(relativeLocation[1]) >= 1) {
      rope[i][1] += Math.sign(relativeLocation[1]);
    }
  }

  visitedPart2.add(rope.at(-1)?.join(","));
}

function show() {
  Deno.writeTextFileSync("./9/show.txt", "");
  for (let y = minLocation[1] - 1; y <= maxLocation[1] + 1; y++) {
    let line = "";
    for (let x = minLocation[0] - 1; x <= maxLocation[0] + 1; x++) {
      const loc = [x, y].join(",");
      if (headLocation.join(",") === loc) {
        line += "H";
      } else if (tailLocation.join(",") === loc) {
        line += "T";
      } else if (visited.has(loc)) {
        line += "#";
      } else {
        line += " ";
      }
    }
    Deno.writeTextFileSync("./9/show.txt", line + "\r\n", { append: true });
  }
}

function showPart2() {
  Deno.writeTextFileSync("./9/show2.txt", "====================\r\n", {
    append: true,
  });
  const positions = rope.map((loc) => loc.join(","));
  for (let y = minLocation[1] - 1; y <= maxLocation[1] + 1; y++) {
    let line = "";
    for (let x = minLocation[0] - 1; x <= maxLocation[0] + 1; x++) {
      const loc = [x, y].join(",");
      const index = positions.indexOf(loc);
      const wasVisited = visitedPart2.has(loc);
      line += index < 0 ? wasVisited ? "#" : " " : index;
    }
    Deno.writeTextFileSync("./9/show2.txt", line + "\r\n", { append: true });
  }
}

show();
console.log("visited:", visited.size);
console.log("maxLocation:", maxLocation);
console.log("minLocation:", minLocation);
// visited: 6494

showPart2();
console.log("visitedPart2:", visitedPart2.size);
// visitedPart2: 2691
