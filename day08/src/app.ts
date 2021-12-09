import * as readline from 'readline';

type InputLine = {
  left: string[]
  right: string[]
}

const parseInput = async (rd: readline.Interface): Promise<InputLine[]> => {
  const input: InputLine[] = [];
  for await (const line of rd) {
    const splits = line.split(' | ');
    input.push({
      left: splits[0].split(' ').map(s => s.trim()),
      right: splits[1].split(' ').map(s => s.trim()),
    });
  }
  return input;
}

const copy = (input: InputLine[]): InputLine[] => {
  const duplicate: InputLine[] = [];
  input.forEach(line => duplicate.push({left: [...line.left], right: [...line.right]}));
  return duplicate;
}

const sevenSegmentSearchPart1 = async (input: InputLine[]): Promise<number> => {
  const dup = copy(input)
  return dup.flatMap(line => line.right)
    .filter(entry => entry.length == 2 || entry.length == 3 || entry.length == 4 || entry.length == 7)
    .length;
};

const findCharsWithFreq = (input: string[], freq: number): string[] => {
  const res: string[] = [];
  const chars = input.flatMap(x => x.split(''));
  ['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach(x => {
    if (chars.filter(c => c == x).length == freq) {
      res.push(x);
    }
  });
  return res;
}

const findF = (input: string[]): string => {
  const cs = findCharsWithFreq(input, 9);
  if (cs.length != 1) {
    throw  new Error("findF failed");
  }
  return cs[0];
}

const findE = (input: string[]): string => {
  const cs = findCharsWithFreq(input, 4);
  if (cs.length != 1) {
    throw  new Error("findE failed");
  }
  return cs[0];
}

const findB = (input: string[]): string => {
  const cs = findCharsWithFreq(input, 6);
  if (cs.length != 1) {
    throw  new Error("findE failed");
  }
  return cs[0];
}

const findA = (input: string[]): string => {
  const cs = findCharsWithFreq(input.filter(x => x.length == 2 || x.length == 3), 1);
  if (cs.length != 1) {
    throw  new Error("findE failed");
  }
  return cs[0];
}

const findC = (input: string[], a: string): string => {
  const cs = findCharsWithFreq(input, 8);
  if (cs.length != 2) {
    throw  new Error("findC failed");
  }
  return cs[0] == a ? cs[1] : cs[0];
}

const findD = (input: string[], b: string): string => {
  const cs = findCharsWithFreq(input.filter(x => x.length == 4 || x.length == 2), 1);
  if (cs.length != 2) {
    throw  new Error("findD failed");
  }
  return cs[0] == b ? cs[1] : cs[0];
}

const findG = (input: string[], a: string, e: string): string => {
  const cs = findCharsWithFreq(input.filter(x => x.length == 4 || x.length == 7), 1);
  if (cs.length != 3) {
    throw  new Error("findG failed");
  }
  if (cs[0] != a && cs[0] != e) {
    return cs[0];
  } else if (cs[1] != a && cs[1] != e) {
    return cs[1];
  } else {
    return cs[2];
  }
}

const buildMapper = (a: string, b: string, c: string, d: string, e: string, f:string, g: string): {[k: string]: string } => {
  const m: {[k: string]: string} = {};
  m[a] = 'a';
  m[b] = 'b';
  m[c] = 'c';
  m[d] = 'd';
  m[e] = 'e';
  m[f] = 'f';
  m[g] = 'g';
  return m;
}

const segmentsToDigit = (seg: string): string => {
  if (seg == 'abcefg') {
    return '0';
  } else if (seg == 'cf') {
    return '1';
  } else if (seg == 'acdeg') {
    return '2';
  } else if (seg == 'acdfg') {
    return '3';
  } else if (seg == 'bcdf') {
    return '4';
  } else if (seg == 'abdfg') {
    return '5';
  } else if (seg == 'abdefg') {
    return '6';
  } else if (seg == 'acf') {
    return '7';
  } else if (seg == 'abcdefg') {
    return '8';
  } else if (seg == 'abcdfg') {
    return '9';
  }
  throw new Error("segmentsToDigit failed")
}

const mapToNumber = (str: string[], mapper: {[k: string]: string }): number => {
  let s = "";
  str.forEach(x => {
    s += segmentsToDigit(x.split('').map(c => mapper[c]).sort().join(''));
  });
  return parseInt(s);
}

const sevenSegmentSearchPart2 = async (input: InputLine[]): Promise<number> => {
  let sum = 0;
  input.forEach(line => {
    const f = findF(line.left);
    const e = findE(line.left);
    const b = findB(line.left);
    const a = findA(line.left);
    const c = findC(line.left, a);
    const d = findD(line.left, b);
    const g = findG(line.left, a, e);
    sum += mapToNumber(line.right, buildMapper(a, b, c, d, e, f, g));
  })
  return sum;
};

export { sevenSegmentSearchPart1, sevenSegmentSearchPart2, parseInput}
