import { lcd } from "https://deno.land/x/denum@v1.2.0/mod.ts";

class Monkey {
  static monkeyRegex =
    /Monkey (\d+):\s+Starting items: ([\d, ]+)\s+Operation: new = (.+)\s+Test: divisible by (\d+)\s+If true: throw to monkey (\d+)\s+If false: throw to monkey (\d+)/;

  static lcd = 1;

  static monkeys: Monkey[] = [];
  static addMonkey(text: string) {
    Monkey.monkeys.push(new Monkey(text));

    // PART 2 MAGIC
    const divisors = Monkey.monkeys.map((m) => m.divisor);
    Monkey.lcd = divisors.length > 1 ? lcd(...divisors) : divisors[0];
  }

  static playRound() {
    for (const monkey of Monkey.monkeys) {
      monkey.inspectAll();
    }
  }

  id: number;
  items: number[];
  operation: (old: number) => number;
  divisor: number;
  throwTo: {
    true: number;
    false: number;
  };
  inspections = 0;

  private constructor(text: string) {
    const [_, strId, strItems, strOperation, strDivision, strTrue, strFalse] =
      text.match(Monkey.monkeyRegex) ?? [];

    this.id = parseInt(strId);

    this.items = strItems.split(", ").map((i) => parseInt(i));

    this.operation = new Function("old", "return " + strOperation) as (
      old: number,
    ) => number;

    this.divisor = parseInt(strDivision);

    this.throwTo = {
      true: parseInt(strTrue),
      false: parseInt(strFalse),
    };
  }

  public inspectAll() {
    for (const item of this.items.splice(0)) {
      this.inspect(item);
    }
  }

  private getNextHolder(item: number) {
    return this.throwTo[String(item % this.divisor === 0) as "true" | "false"];
  }

  private inspect(item: number) {
    this.inspections++;
    item = this.operation(item);
    item %= Monkey.lcd;

    // PART 1
    if (!part2) item = Math.floor(item / 3);

    item += Monkey.lcd;
    const nextHolder = this.getNextHolder(item);
    Monkey.monkeys[nextHolder].items.push(item);
  }
}

const data = await Deno.readTextFile("./11/data.txt");

data.split("\r\n\r\n").forEach(Monkey.addMonkey);

const part2 = true;

for (let i = 0; i < (part2 ? 10_000 : 20); i++) {
  Monkey.playRound();
}

console.log(
  "business",
  part2 ? 2 : 1,
  Monkey.monkeys
    .map((m) => m.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b),
);
// business1: 67830

// bisiness2: 15305381442
