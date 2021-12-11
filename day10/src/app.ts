import * as readline from 'readline';

class Stack<T> {
  private items: T[] = [];

  constructor(private capacity: number = Infinity) {}

  push(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Max capacity reached");
    }
    this.items.push(item);
  }

  pop(): T {
    const item = this.items.pop();
    if (item == undefined) {
      throw Error("Stack is empty");
    }
    return item;
  }

  peek(): T | undefined {
    return this.items[this.size() - 1];
  }

  size(): number {
    return this.items.length;
  }
}



const parseInput = async (rd: readline.Interface): Promise<string[]> => {
  const input: string[] = [];
  for await (const line of rd) {
    input.push(line);
  }
  return input;
}

const getMatching = (c: string): string => {
  switch (c) {
    case '(':
      return ')';
    case '[':
      return ']';
    case '{':
      return '}';
    case '<':
      return '>';
    default:
      throw new Error(`unexpected character: ${c}`);
  }
}

const match = (a: string, b: string): boolean => {
  return b == getMatching(a);
}

const getScorePart1 = (c: string): number => {
  switch (c) {
    case ')':
      return 3;
    case ']':
      return 57;
    case '}':
      return 1197;
    case '>':
      return 25137;
    default:
      throw new Error(`unexpected character: ${c}`);
  }
}

const syntaxScoringPart1 = async (input: string[]): Promise<number> => {
  let score = 0;
  input.forEach(line => {
    const stack = new Stack<string>();
    for (const c of line.split('')) {
      if ('([{<'.indexOf(c) != -1) {
        stack.push(c);
      } else {
        const m = stack.pop();
        if (!match(m, c)) {
          // console.log(`expected closing ${m} got ${c}`);
          score += getScorePart1(c);
        }
      }
    }
  });
  return score;
};

const getScorePart2 = (c: string): number => {
  switch (c) {
    case ')':
      return 1;
    case ']':
      return 2;
    case '}':
      return 3;
    case '>':
      return 4;
    default:
      throw new Error(`unexpected character: ${c}`);
  }
}

const syntaxScoringPart2 = async (input: string[]): Promise<number> => {
  const scores: number[] = [];
  input.forEach(line => {
    const stack = new Stack<string>();
    for (const c of line.split('')) {
      if ('([{<'.indexOf(c) != -1) {
        stack.push(c);
      } else {
        const m = stack.pop();
        if (!match(m, c)) {
          return;
        }
      }
    }
    // The line is incomplete
    let score = 0;
    while (stack.size() > 0) {
      score = score * 5 + getScorePart2(getMatching(stack.pop()));
    }
    scores.push(score);
  });
  return scores.sort((x,y) => x - y)[scores.length >> 1];
};

export { syntaxScoringPart1, syntaxScoringPart2, parseInput }
