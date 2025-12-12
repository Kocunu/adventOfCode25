import { content } from "./day1";


const dataInput = content("src/data/day4.txt");

const spliited = dataInput.split('\n');
const height = spliited.length;
const width = spliited[0]?.length ?? 0;
const paperRoll = '@';
const offsets: Array<[number, number]> = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],            [0, 1],
  [1, -1],  [1, 0],   [1, 1],
];

let accessibleCount = 0;

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    const cell = spliited[i][j];
    if (cell === paperRoll) {
      let neighborCount = 0;
      for (const [dx, dy] of offsets) {
        const ni = i + dx;
        const nj = j + dy;
        if (
          ni >= 0 &&
          ni < height &&
          nj >= 0 &&
          nj < width &&
          spliited[ni][nj] === paperRoll
        ) {
          neighborCount++;
        }
      }
      if (neighborCount < 4) {
        accessibleCount++;
      }
    }
  }
}

console.log(`Accessible rolls: ${accessibleCount}`);
