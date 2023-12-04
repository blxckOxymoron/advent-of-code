// x: distance from left
// y: distance from top
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class AxisAlignedLine {
  start: Point;
  end: Point;
  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }

  intersects(line: AxisAlignedLine) {
  }
}

class Polygon {
  lines: AxisAlignedLine[];
  constructor(lines: AxisAlignedLine[]) {
    this.lines = lines;
  }
}

// grains spawn at 500,0
class World {
  rocks: Polygon[] = [];
  grains: Point[] = [];

  addRock(rock: Polygon) {
    this.rocks.push(rock);
  }

  spawnGrain() {
  }
}
