import * as readline from 'readline';

const parseInput = async (rd: readline.Interface): Promise<number[]> => {
  for await (const line of rd) {
    const nb = line.trim().split(',').map(s => parseInt(s));
    return nb;
  }
  throw new Error("Invalid input");
}

const lanternfishPart1 = async (input: number[]): Promise<number> => {
  const fishes = [...input];
  for (let t = 0; t < 80; t++) {
    const len = fishes.length;
    for (let i = 0; i < len; i++) {
      if (fishes[i] > 0) {
        fishes[i]--;
      } else {
        fishes[i] = 6;
        fishes.push(8);
      }
    }
  }
  return fishes.length;
};

const lanternfishPart2 = async (input: number[]): Promise<number> => {
  const freq = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  input.forEach(x => freq[x]++);
  for (let t = 0; t < 256; t++) {
    const zero = freq[0];
    for (let i = 1; i < 9; i++) {
      freq[i-1] = freq[i];
    }
    freq[6] += zero;
    freq[8] = zero;
  }
  return freq.reduce((a, x) => a+x, 0);
};

export { lanternfishPart1, lanternfishPart2, parseInput}
