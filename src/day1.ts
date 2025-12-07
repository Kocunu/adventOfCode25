import { readFileSync } from "fs";

export const content = (path: string): string => {
  try {
    return readFileSync(path, 'utf-8');
  } catch (err) {
    console.log("Error reading file: ", err);
    throw err
  }
}

const data = content("data/day1.txt")
const sliced = data.split('\n');
const START_DIAL = 50;

export type Direction = 'L' | 'R';

const normalizeDial = (value: number): number => {
  return ((value % 100) + 100) % 100;
};

function part1(splittedExample: string[]): number {
  let zeroCount = 0;
  let dial = START_DIAL;
  for (const instr of splittedExample) {
    const trimmed = instr.trim();
    if (!trimmed) {
      continue;
    }
    const dir = trimmed[0] as Direction;
    const amount = Number(trimmed.slice(1));
    dial = normalizeDial(dir === 'L' ? dial - amount : dial + amount);
    if (dial === 0) {
      zeroCount++;
    }
  }
  return zeroCount
}

function countZeroHits(currentDial: number, direction: Direction, amount: number): number {
  if (amount === 0) {
    return 0;
  }

  if (direction === 'R') {
    const first = currentDial === 0 ? 100 : 100 - currentDial;
    if (first > amount) {
      return 0;
    }
    return 1 + Math.floor((amount - first) / 100);
  }

  const first = currentDial === 0 ? 100 : currentDial;
  if (first > amount) {
    return 0;
  }
  return 1 + Math.floor((amount - first) / 100);
}

function part2(splittedExample: string[]): number {
  let zeroCount = 0;
  let dial = START_DIAL;

  for (const instr of splittedExample) {
    const trimmed = instr.trim();
    if (!trimmed) {
      continue;
    }

    const dir = trimmed[0] as Direction;
    const amount = Number(trimmed.slice(1));

    zeroCount += countZeroHits(dial, dir, amount);
    dial = normalizeDial(dir === 'L' ? dial - amount : dial + amount);
  }

  return zeroCount;
}

const resultPart1 = part1(sliced);
const resultPart2 = part2(sliced);
console.log(resultPart1);
console.log(resultPart2);

  