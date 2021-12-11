import * as readline from 'readline';

// Grid is a two dimensional 10 x 10 number array
class Grid {
  private values: number[];

  constructor(values: number[]) {
    this.values = values;
  }

  private static isLegalCoordinates(x: number, y: number): boolean {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  }

  static toCoordinates(index: number): {x: number, y: number} {
    return {x: index % 10, y: Math.floor(index / 10)};
  }

  static adjacent(x: number, y: number): {x: number, y: number}[] {
    return [
      {x: x - 1, y: y - 1}, {x: x, y: y - 1}, {x: x + 1, y: y - 1},
      {x: x - 1, y: y}, {x: x + 1, y: y},
      {x: x - 1, y: y + 1}, {x: x, y: y + 1}, {x: x + 1, y: y + 1}
    ].filter(p => Grid.isLegalCoordinates(p.x, p.y));
  }

  count(value: number): number {
    return this.values.filter(x => x == value).length;
  }

  step(): Grid {
    let newValues = this.values.map(x => (x + 1) % 10);
    while(newValues.filter(x => x == 0).length > 0) {
      newValues = newValues.map(x => x <= 0 ? x - 1 : x);
      newValues.forEach((x, i) => {
        if (x < 0) {
          return;
        }
        const p = Grid.toCoordinates(i);
        const zeros = Grid.adjacent(p.x, p.y).filter(q => newValues[10 * q.y + q.x] == -1).length;
        newValues[i] = x + zeros;
        if (newValues[i] >= 10) {
          newValues[i] = 0;
        }
      });
    }
    return new Grid(newValues.map(x => x < 0 ? 0 : x));
  }

  toString(): string {
    const str: string[] = [];
    for (let i = 0; i < 10; i++) {
      str.push(this.values.slice(i*10, (i+1)*10).map(x => x.toString()).join(''));
    }
    return str.join('\n');
  }
}

const parseInput = async (rd: readline.Interface): Promise<Grid> => {
  const input: number[] = [];
  for await (const line of rd) {
    input.push(...line.split('').map(x => parseInt(x)));
  }
  return new Grid(input);
}

const dumboOctopusPart1 = async (input: Grid): Promise<number> => {
  let g = input;
  let count = 0;
  for (let i = 0; i < 100; i++) {
    g = g.step();
    count += g.count(0);
  }
  return count;
};

const dumboOctopusPart2 = async (input: Grid): Promise<number> => {
  let g = input;
  let count = 0;
  for (let i = 1;; i++) {
    g = g.step();
    if (g.count(0) == 100) {
      return i;
    }
  }
};

export { dumboOctopusPart1, dumboOctopusPart2, parseInput }
