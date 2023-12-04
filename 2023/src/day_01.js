/**
 * Contains solutions for Day 1
 * Puzzle Description: https://adventofcode.com/2023/day/1
 */

/**
 * Returns the solution for level one of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelOne = ({ input, lines }) => {
  const codes = lines.map(line => {
    const numberMatches = line.matchAll(/\d/g);
    const numbers = Array.from(numberMatches, match => Number(match[0]));

    const firstNum = numbers.at(0);
    const secondNum = numbers.at(-1);

    return parseInt(`${firstNum}${secondNum}`);
  });
  return codes.reduce((acc, cur) => acc + cur);
};

/**
 * Returns the solution for level two of this puzzle.
 * @param {Object} args - Provides both raw and split input.
 * @param {String} args.input - The original, unparsed input string.
 * @param {String[]} args.lines - Array containing each line of the input string.
 * @returns {Number|String}
 */
export const levelTwo = ({ input, lines }) => {
  const numbersAsStrings = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
  };

  const codes = lines.map(line => {
    const lineWithNumbers = line.replace(
      /(one|two|three|four|five|six|seven|eight|nine)/g,
      (match) => numbersAsStrings[match]
    );

    const numbers = Array.from(
      lineWithNumbers.matchAll(/\d/g),
      match => parseInt(match[0]) || numbersAsStrings[match[0]]
    );

    const firstNum = numbers.at(0);
    const secondNum = numbers.at(-1);

    return firstNum * 10 + secondNum;
  });
  return codes.reduce((acc, cur) => acc + cur);
};