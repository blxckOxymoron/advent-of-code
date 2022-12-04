const data = await Deno.readTextFile("./3/data.txt");

// const data = `\
// vJrwpWtwJgWrhcsFMMfFFhFp\r
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\r
// PmmdzqPrVvPwwTWBwg\r
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\r
// ttgJtRGJQctTZtZT\r
// CrZsJsPPZsGzwwsLwLmpwMDw`;

const lines = data.split("\r\n");

let total1 = 0;

const ACharCode = "A".charCodeAt(0);

for (const line of lines) {
  const firstHalf = line.split("");
  const secondHalf = firstHalf.splice(firstHalf.length / 2);
  const duplicate = firstHalf.find((c) => secondHalf.includes(c));

  if (!duplicate) continue;

  total1 += priority(duplicate);
}

function priority(item: string): number {
  const code = item.charCodeAt(0) - ACharCode + 1; // A -> 1, Z -> 26, a -> 33
  const score = code < 32 ? code + 26 : code - 32; // a -> 1, z -> 26, A -> 27, Z -> 52
  return score;
}

console.log("total 1:", total1);
// 8176

let total2 = 0;
let collectiveItems: string[] = [];
const groupSize = 3;

for (const [i, line] of lines.entries()) {
  switch (i % groupSize) {
    case 0: {
      collectiveItems = line.split("");
      break;
    }

    case (groupSize - 1): {
      collectiveItems = intersect(collectiveItems, line.split(""));
      total2 += priority(collectiveItems[0]);
      break;
    }

    default: {
      collectiveItems = intersect(collectiveItems, line.split(""));
      break;
    }
  }
}

function intersect(a: string[], b: string[]): string[] {
  return a.filter((c) => b.includes(c));
}

console.log("total 2:", total2);
// 2689
