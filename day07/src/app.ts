import * as readline from 'readline';

const parseInput = async (rd: readline.Interface): Promise<number[]> => {
  for await (const line of rd) {
    const nb = line.trim().split(',').map(s => parseInt(s));
    return nb;
  }
  throw new Error("Invalid input");
}

const treacheryOfWhalesPart1 = async (input: number[]): Promise<number> => {
  const crabs = [...input].sort((x1, x2) => x1-x2);
  const hlen = (crabs.length >> 1);
  const med = crabs[hlen];
  //return crabs.reduce((x, a) => a + Math.abs(x - med), 0);
  let a = 0;
  crabs.forEach(x => a += Math.abs(x-med));
  return a;
};

const evaluate = (crabs: number[], tested: number) => {
  let a = 0;
  crabs.forEach(x => {
    const d = Math.abs(x - tested);
    const fuel = d * (d + 1) / 2;
    a += fuel;
  });
  return a;
}

const treacheryOfWhalesPart2 = async (input: number[]): Promise<number> => {
  const crabs = [...input].sort((x1, x2) => x1-x2);
  const hlen = (crabs.length >> 1);
  let best = 1000000000;
  let offset = 0;
  while (true) {
    const u = evaluate(crabs, crabs[hlen] + offset)
    const v = evaluate(crabs, crabs[hlen] - offset)
    if (best > v || best > u) {
      best = Math.min(u, v);
    } else {
      return best;
    }
    offset++;
  }
};

export { treacheryOfWhalesPart1, treacheryOfWhalesPart2, parseInput}
