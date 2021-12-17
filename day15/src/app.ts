import * as readline from 'readline';

type Node = {
  x: number;
  y: number;
}

interface RiskMap {
  width: number;
  height: number;
  values: number[];

  adjacent(n: Node): Node[];

  value(n: Node): number;

}

class RiskMapPart1 implements RiskMap {
  width: number;
  height: number;
  values: number[];

  constructor(width: number, height: number, values: number[]) {
    this.width = width;
    this.height = height;
    this.values = values;
  }

  adjacent(n: Node): Node[] {
    return [{x: n.x, y: n.y-1}, {x: n.x+1, y: n.y}, {x: n.x, y: n.y+1}, {x: n.x-1, y: n.y}]
      .filter(p => p.x >= 0 && p.x < this.width && p.y >= 0 && p.y < this.height);
  }

  value(n: Node): number {
    return this.values[this.width*n.y + n.x];
  }
}

class RiskMapPart2 implements RiskMap {
  width: number;
  height: number;
  values: number[];

  constructor(width: number, height: number, values: number[]) {
    this.width = width * 5;
    this.height = height * 5;
    this.values = values;
  }

  adjacent(n: Node): Node[] {
    return [{x: n.x, y: n.y-1}, {x: n.x+1, y: n.y}, {x: n.x, y: n.y+1}, {x: n.x-1, y: n.y}]
      .filter(p => p.x >= 0 && p.x < this.width && p.y >= 0 && p.y < this.height);
  }

  value(n: Node): number {
    const [w, h] = [this.width / 5, this.height / 5];
    const mx = Math.floor(n.x / (this.width / 5));
    const my = Math.floor(n.y / (this.height / 5));
    const [nx, ny] = [n.x - mx * w, n.y - my * h];
    const v = this.values[(this.width/5)*ny + nx] + mx + my;
    return v < 10 ? v : v - 9;
  }
}
const parseInputPart1 = async (rd: readline.Interface): Promise<RiskMap> => {
  let width = 0;
  let heigth = 0;
  const values: number[] = [];
  for await (const line of rd) {
    width = line.length;
    heigth++;
    values.push(...line.split('').map(x => parseInt(x)));
  }
  return new RiskMapPart1(width, heigth, values);
}

const parseInputPart2 = async (rd: readline.Interface): Promise<RiskMap> => {
  let width = 0;
  let heigth = 0;
  const values: number[] = [];
  for await (const line of rd) {
    width = line.length;
    heigth++;
    values.push(...line.split('').map(x => parseInt(x)));
  }
  return new RiskMapPart2(width, heigth, values);
}

const index = (p: Node, input: RiskMap): number => p.x + input.width*p.y;

const update = (p: Node, best: number[], input: RiskMap): boolean => {
  if (p.x == 0 && p.y == 0) {
    return false;
  }
  const value =  best[index(p, input)];
  const adj = input.adjacent(p);
  const risk = input.value(p);
  const min = adj.reduce((a, n) => Math.min(a, risk + best[index(n, input)]), value)
  if (min < value) {
    best[index(p, input)] = min;
    return true;
  }
  return false;
}

const chiton = async (input: RiskMap): Promise<number> => {
  const best = new Array(input.width * input.height).fill(Infinity);
  best[0] = 0;
  let updated = false;
  do {
    updated = false;
    for (let j = 0; j < input.height; j++)  {
      for (let i = 0; i < input.width; i++)  {
        updated = update({x: i, y: j}, best, input) || updated;
      }
    }
  } while (updated);
  return best[best.length - 1] - best[0];
};

export { chiton, parseInputPart1, parseInputPart2 }
