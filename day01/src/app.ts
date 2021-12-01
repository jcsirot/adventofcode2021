import readline from 'readline';
import fs from 'fs';

const readFile = async (path: string): Promise<number[]> => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false
  });
  const nb: number[] = [];
  for await (const line of rl) {
    nb.push(parseInt(line));
  }
  return nb;
}

const sonarSweepPart1 = async (fullScan: number[]): Promise<number> => {
  let count = 0;
  let scan = fullScan;
  while (true) {
    if (scan.length < 2) {
      return count;
    }
    if (scan[1] > scan[0]) {
      count++;
    }
    scan = scan.slice(1);
  }
};

const sonarSweepPart2 = async (fullScan: number[]): Promise<number> => {
  let count = 0;
  let scan = fullScan;
  while (true) {
    if (scan.length < 4) {
      return count;
    }
    const win1 = scan[0] + scan[1] + scan[2]
    const win2 = scan[1] + scan[2] + scan[3]
    if (win2 > win1) {
      count++;
    }
    scan = scan.slice(1);
  }
};

export { sonarSweepPart1, sonarSweepPart2, readFile }
