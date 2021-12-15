import * as readline from 'readline';

class Polymerizer {
  template: string;
  rules: {[key: string]: string};

  constructor(template: string, rules: {[key: string]: string}) {
    this.template = template;
    this.rules = rules;
  }
}

const parseInput = async (rd: readline.Interface): Promise<Polymerizer> => {
  let template: string = '';
  let rules: {[key: string]: string} = {};
  for await (const line of rd) {
    if (line.length == 0) {
      // Skip empty line
    } else if (line.indexOf('->') == -1) {
      template = line;
    } else {
      const [from, to] = line.split(' -> ');
      rules[from] = to;
    }
  }
  return new Polymerizer(template, rules);
}

const polymerizationStep = (current: string, rules: {[key: string]: string}): string => {
  const split = current.split('');
  const produced = split.flatMap((x, i, l) => i > 0 ? [`${l[i-1]}${x}`] : []).map(x => rules[x]);
  return split.flatMap((x, i) => i < produced.length ? [x, produced[i]] : [x]).join('');
}

const extendedPolymerizationPart1 = async (input: Polymerizer): Promise<number> => {
  let round = 0;
  let current = input.template
  while (round < 10) {
    current = polymerizationStep(current, input.rules);
    round ++;
  }
  const freq = current.split('').reduce((freq, c) => freq.set(c, (freq.get(c) || 0) + 1), new Map<string, number>());
  const [min, max] = Array.from(freq.values()).reduce((a,x) => [Math.min(x, a[0]), Math.max(x, a[1])], [Infinity, -Infinity]);
  return max - min;
};

const mergeMaps = (a: Map<string, number>, b: Map<string, number>): Map<string, number> => {
  let copy = new Map(a);
  return Array.from(b.entries()).reduce((m, e) => m.set(e[0], (m.get(e[0]) || 0) + e[1]), copy);
}

const computeFrequencies = (elements: string, rounds: number, cache: Map<string, Map<string, number>>[], rules: {[key: string]: string}): Map<string, number> => {
  if (rounds == 0) {
    return new Map([[elements[0], 1]]);
  }
  const newElement = rules[elements];

  const f1Elts = `${elements[0]}${newElement}`;
  const f1 = (cache[rounds - 1].get(f1Elts)) || computeFrequencies(f1Elts, rounds-1, cache, rules);
  cache[rounds - 1].set(f1Elts, f1);

  const f2Elts = `${newElement}${elements[1]}`;
  const f2 = cache[rounds - 1].get(f2Elts) || computeFrequencies(f2Elts, rounds-1, cache, rules);
  cache[rounds - 1].set(f2Elts, f2);

  return mergeMaps(f1, f2);
}

const extendedPolymerizationPart2 = async (input: Polymerizer): Promise<number> => {
  const couples = input.template.split('').flatMap((x, i, l) => i > 0 ? [`${l[i-1]}${x}`] : []);
  const lastChar = input.template[input.template.length - 1];
  let freq = new Map([[lastChar, 1]]);
  const cache = new Array(41).fill(0).map(x => new Map<string, Map<string, number>>());
  couples.forEach(c => {
    freq = mergeMaps(computeFrequencies(c, 40, cache, input.rules), freq);
  });
  const [min, max] = Array.from(freq.values()).reduce((a,x) => [Math.min(x, a[0]), Math.max(x, a[1])], [Infinity, -Infinity]);
  return max - min;
};

export { extendedPolymerizationPart1, polymerizationStep, extendedPolymerizationPart2, mergeMaps, computeFrequencies, parseInput }
