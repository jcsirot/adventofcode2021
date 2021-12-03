import readline from 'readline';
import fs from 'fs';

type Input = {
  values: number[];
  len: number;
}

const parseInput = async (path: string): Promise<Input> => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false
  });
  let len = 0;
  const nb: number[] = [];
  for await (const line of rl) {
    len = Math.max(line.length);
    nb.push(parseInt(line, 2));
  }
  return { values: nb, len: len };
}

const mostCommonBit = async (values: number[], column: number): Promise<number> => {
  return values.map(x => (x >> column) & 0b1).reduce((s, x) => s + x, 0) >= values.length / 2 ? 1 : 0;
}

const leastCommonBit = async (values: number[], column: number): Promise<number> => {
  return values.map(x => (x >> column) & 0b1).reduce((s, x) => s + x, 0) >= values.length / 2 ? 0 : 1;
}

const binaryDiagnosticPart1 = async (diag: Input): Promise<number> => {
  let gamma = 0, epsilon = 0;
  for (let i = 0; i < diag.len; i++) {
    const bit = await mostCommonBit(diag.values, i);
    gamma = gamma | (bit << i)
    epsilon = epsilon | ((1-bit) << i)
  }
  return gamma * epsilon;
};

const binaryDiagnosticPart2 = async (diag: Input): Promise<number> => {
  let i = diag.len - 1;
  let o2 = [... diag.values];
  while (true) {
    const b = await mostCommonBit(o2, i);
    o2 = o2.filter((x) => ((x >> i) & 1) === b)
    if (o2.length == 1) {
      break;
    }
    i--;
  }
  i = diag.len - 1;
  let co2 = [... diag.values];
  while (true) {
    const b = await leastCommonBit(co2, i);
    co2 = co2.filter((x) => ((x >> i) & 1) === b)
    if (co2.length == 1) {
      break;
    }
    i--;
  }

  return o2[0] * co2[0];
};

export { binaryDiagnosticPart1, binaryDiagnosticPart2, parseInput }
