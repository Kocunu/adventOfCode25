import { content } from "./day1";

type Range = {
  start: number;
  end: number;
};

const parseRanges = (raw: string): Range[] =>
  raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [start, end] = part.split("-").map(Number);
      if (start === undefined || end === undefined || Number.isNaN(start) || Number.isNaN(end)) {
        throw new Error(`Invalid range entry: "${part}"`);
      }
      return { start, end };
    });

const generateRepeatedCandidates = (limit: number): number[] => {
  const maxDigits = limit.toString().length;
  const candidates: number[] = [];

  for (let halfLen = 1; halfLen <= Math.floor(maxDigits / 2); halfLen++) {
    const pow = 10 ** halfLen;
    const start = 10 ** (halfLen - 1);
    const end = 10 ** halfLen - 1;

    for (let base = start; base <= end; base++) {
      const candidate = base * pow + base;
      if (candidate > limit) {
        break;
      }
      candidates.push(candidate);
    }
  }

  return candidates;
};

const findInvalidIds = (ranges: Range[]): number[] => {
  if (ranges.length === 0) {
    return [];
  }

  const maxEnd = Math.max(...ranges.map((range) => range.end));
  const candidates = generateRepeatedCandidates(maxEnd);
  const invalid: number[] = [];

  for (const candidate of candidates) {
    for (const range of ranges) {
      if (candidate >= range.start && candidate <= range.end) {
        invalid.push(candidate);
        break;
      }
    }
  }

  return invalid;
};

const sumInvalidIds = (ids: number[]): number =>
  ids.reduce((total, id) => total + id, 0);

const exampleInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;
const exampleRanges = parseRanges(exampleInput);
const exampleInvalidIds = findInvalidIds(exampleRanges);
const exampleSum = sumInvalidIds(exampleInvalidIds);

const puzzleInput = content("src/data/day2.txt");
const puzzleRanges = parseRanges(puzzleInput);
const puzzleInvalidIds = findInvalidIds(puzzleRanges);
const puzzleSum = sumInvalidIds(puzzleInvalidIds);

console.log("Example invalid IDs:", exampleInvalidIds);
console.log("Example sum:", exampleSum);
console.log("Puzzle invalid IDs count:", puzzleInvalidIds.length);
console.log("Puzzle sum:", puzzleSum);
