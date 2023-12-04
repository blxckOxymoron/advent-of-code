const data = await Deno.readTextFile("./7/data.txt");

const lines = data.split("\r\n");
const path: string[] = [];

type Dir = {
  [key: string]: Dir | number;
};

const dirs: Dir = {};

const fileRegex = /(\d+) (.+)/;

for (const line of lines) {
  if (line === "$ ls") continue;
  if (line === "$ cd ..") {
    path.pop();
    continue;
  }
  if (line === "$ cd /") {
    path.length = 0;
    continue;
  }
  if (line.startsWith("$ cd")) {
    const dirName = line.slice("$ cd ".length);
    path.push(dirName);
    continue;
  }
  if (line.startsWith("dir")) {
    const dirName = line.slice("dir ".length);
    const currentDir = getCurrentDir();
    currentDir[dirName] ??= {};
    continue;
  }
  const [size, filename] = line.match(fileRegex)?.slice(1) ?? ["", ""];
  if (filename) {
    const currentDir = getCurrentDir();
    currentDir[filename] = parseInt(size);
    continue;
  }
}

function getCurrentDir() {
  let currentDir: Dir = dirs;
  for (const dir of path) {
    const nextDir = currentDir[dir];
    if (typeof nextDir === "number") {
      console.error("Not a directory");
      return currentDir;
    }
    currentDir = nextDir;
  }
  return currentDir;
}

let totalSize = 0;

const diskSize = 70_000_000;
const freeNeeded = 30_000_000;
const totalUsed = 41_412_830;
const toDelete = freeNeeded - (diskSize - totalUsed);
let closestToDelete = Infinity;

function loopAllDirs(dir: Dir) {
  let dirSize = 0;
  for (const value of Object.values(dir)) {
    if (typeof value === "number") {
      dirSize += value;
    } else {
      dirSize += loopAllDirs(value);
    }
  }

  // part 1
  if (dirSize <= 100000) {
    totalSize += dirSize;
  }
  // part 2
  if (dirSize >= toDelete && dirSize < closestToDelete) {
    closestToDelete = dirSize;
  }

  return dirSize;
}

console.log("total size:", loopAllDirs(dirs));
// total size: 41412830
console.log("total sub 100000:", totalSize);
// total sub 100000: 1749646
console.log("closest to delete:", closestToDelete);
// closest to delete: 1498966
