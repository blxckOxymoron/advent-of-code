const data = await Deno.readTextFile("./13/data.txt");

const pairs: number[][] = data.split("\r\n\r\n").map((p) =>
  p.split("\r\n").map((s) => JSON.parse(s))
);

function compare(left: number[] | number, right: number[] | number): number {
  // Mixed
  if (Array.isArray(left) && !Array.isArray(right)) {
    return compare(left, [right]);
  } else if (!Array.isArray(left) && Array.isArray(right)) {
    return compare([left], right);
  }

  if (typeof left === "number" && typeof right === "number") {
    // Numbers
    return right - left;
  } else if (Array.isArray(left) && Array.isArray(right)) {
    // Arrays
    for (let i = 0; i < left.length && i < right.length; i++) {
      const result = compare(left[i], right[i]);
      if (result !== 0) {
        return result;
      }
    }
    return right.length - left.length;
  } else {
    // assert never
    return 0;
  }
}

let total = 0;
for (const [i, pair] of pairs.entries()) {
  if (compare(pair[0], pair[1]) > 0) {
    total += i + 1;
  }
}

console.log("sum:", total);
// sum: 5852

const packets = data.split("\r\n").filter((s) => s.length).map((p) =>
  JSON.parse(p)
);
packets.push([[2]], [[6]]);
packets.sort((a, b) => -compare(a, b));

const divider2Index = 1 +
  packets.findIndex((p) => JSON.stringify(p) === "[[2]]");

const divider6Index = 1 +
  packets.findIndex((p) => JSON.stringify(p) === "[[6]]");

console.log("key:", divider2Index * divider6Index);
// key: 24190
