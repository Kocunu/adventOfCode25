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
const splittedExample = data.split('\n');

let dial = 50;
let zeroCount = 0;

export type Direction = 'L' | 'R';

for (const instr of splittedExample) {
  const dir = instr[0] as Direction;
  const amount = Number(instr.replace(/^\D+/, ''));
  dial = ((dir === 'L' ? dial - amount : dial + amount) + 100) % 100;
  if (dial === 0) {
    zeroCount++;
  }
}

console.log(zeroCount);

  