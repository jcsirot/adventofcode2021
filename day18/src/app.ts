import * as readline from 'readline';

class Iterator<T> {
  private readonly str: T[];
  private index: number;

  constructor(str: T[]) {
    this.str = str;
    this.index = 0;
  }

  read(): T {
    return this.str[this.index++];
  }
}

const parseNumber = (input: string): string[] => {
  const out: string[] = [];
  let index = 0;
  while (index < input.length) {
    let c = input[index];
    switch (c) {
      case '[':
      case ']':
        out.push(c);
        break;
      case ',':
        break;
      default:
        let n = '';
        do {
          n += c;
          c = input[++index];
        } while (c.match(/^[0-9]/));
        out.push(n);
        index --;
        break;
    }
    index++;
  }
  return out;
}

const parseInput = async (rd: readline.Interface): Promise<string[][]> => {
  const nb: string[][] = [];
  for await (const line of rd) {
    nb.push(parseNumber(line));
  }
  return nb;
}

const explode = (input: string[]): string[] | undefined => {
  let depth = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] == '[') {
      depth ++;
    } else if (input[i] == ']') {
      depth --;
    }
    if (depth > 4) {
      const left = input[i+1];
      const right = input[i+2];
      for (let j = i-1; j >= 0; j--) {
        if (input[j] != '[' && input[j] != ']') {
          input[j] = (parseInt(input[j]) + parseInt(left)).toString();
          break;
        }
      }
      for (let j = i+3; j < input.length; j++) {
        if (input[j] != '[' && input[j] != ']') {
          input[j] = (parseInt(input[j]) + parseInt(right)).toString();
          break;
        }
      }
      return [...input.slice(0, i), '0', ...input.slice(i+4, input.length)];
    }
  }
  return undefined;
}

const split = (input: string[]): string[] | undefined => {
  for (let i = 0; i < input.length; i++) {
    if (input[i] != '[' && input[i] != ']') {
      const v = parseInt(input[i]);
      if (v >= 10) {
        const left = Math.floor(v / 2).toString();
        const right = Math.ceil(v / 2).toString();
        return [...input.slice(0, i), '[', left, right, ']', ...input.slice(i+1, input.length)];
      }
    }
  }
  return undefined;
}

const reduce = (input: string[]): string[] => {
  let x = input;
  while (true) {
    const y = explode(x);
    if (y) {
      x = reduce(y);
    } else {
      break;
    }
  }
  while (true) {
    const y = split(x);
    if (y) {
      x = reduce(y);
    } else {
      break;
    }
  }
  return x;
}

const add = (a: string[], b: string[]): string[] => {
  return ['[', ...a, ...b, ']'];
}

class SFNumber {
  static parse(input: Iterator<string>): SFNumber | number {
    const c = input.read();
    if (c == '[') {
      const left = SFNumber.parse(input);
      const right = SFNumber.parse(input);
      input.read();
      return new SFNumber(left, right);
    } else {
      return parseInt(c);
    }
  }

  private constructor(private left: SFNumber|number, private right: SFNumber|number) { }

  // constructor(input: Iterator<string>) {
  //   input.read();
  //   const left = input.read();
  //   if (left == '[') {
  //     this.left = new SFNumber(input);
  //   } else {
  //     this.left = parseInt(left);
  //   }
  //   const right = input.read();
  //   if (right == '[') {
  //     this.right = new SFNumber(input);
  //   } else {
  //     this.right = parseInt(right);
  //   }
  //   input.read(); // consume ']'
  // }

  magnitude(): number {
    const l = typeof this.left == 'number' ? this.left : this.left.magnitude();
    const r = typeof this.right == 'number' ? this.right : this.right.magnitude();
    return 3*l + 2*r;
  }
}


const snailfishPart1 = async (input: string[][]): Promise<number> => {
  let x: string[] = input[0];
  for (let i = 1; i < input.length; i++) {
    x = add(x, input[i]);
    x = reduce(x);
  }
  const n = SFNumber.parse(new Iterator(x)) as SFNumber;
  return n.magnitude();
};

const snailfishPart2 = async (input: string[][]): Promise<number> => {
  let maxMag = 0;
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i+1; j < input.length; j++) {
      const sum1 = SFNumber.parse(new Iterator(reduce(add(input[i], input[j])))) as SFNumber;
      const sum2 = SFNumber.parse(new Iterator(reduce(add(input[j], input[i])))) as SFNumber;
      maxMag = Math.max(maxMag, sum1.magnitude(), sum2.magnitude());
    }
  }
  return maxMag;
};

export { snailfishPart1, snailfishPart2, parseInput }
