import { content } from "./day1";

const data = content("src/data/day3.txt")

const splitedData = data.split("\n");
let total = 0;
for (const l of splitedData) {
  const digits = [...l].map((char) => parseInt(char, 10));
  let bestPair = -1;
  let maxSuffix = -1;
  for (let i = digits.length - 1; i >= 0; i--) {
    const digit = digits[i];
    if (digit === undefined) continue;
    if (maxSuffix !== -1) {
      const candidate = digit * 10 + maxSuffix;
      if (candidate > bestPair) {
        bestPair = candidate;
      }
    }
    if (digit > maxSuffix) {
      maxSuffix = digit;
    }
  }
  console.log(bestPair);
  total += bestPair;
}
console.log(`Summe: ${total}`);
