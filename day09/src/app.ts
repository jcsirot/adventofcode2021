import * as readline from 'readline';

class HeightMap {
  width: number;
  height: number;
  values: number[];

  constructor(width: number, height: number, values: number[]) {
    this.width = width;
    this.height = height;
    this.values = values;
  }

  copy(): HeightMap {
    return new HeightMap(this.width, this.height, [...this.values]);
  }

  validCoordinates(x: number, y: number): boolean {
    return (x >= 0 && x < this.width && y >= 0 && y < this.height);
  }

  setValue(x: number, y: number, v: number): void {
    if (!this.validCoordinates(x, y)) {
      throw new Error(`Invalid coordinates: x=${x}, y=${y}`);
    }
    this.values[y * this.width + x] = v;
  }

  value(x: number, y: number): number {
    if (!this.validCoordinates(x, y)) {
      throw new Error(`Invalid coordinates: x=${x}, y=${y}`);
    }
    return this.values[y * this.width + x];
  }

  findBasin(x: number, y: number): number {
    if (!this.validCoordinates(x, y)) {
      throw new Error(`Invalid coordinates: x=${x}, y=${y}`);
    }

    let size = 0;
    let points = [{x: x, y: y}];
    while (points.length > 0) {
      points = points.flatMap(p => {
        const v = this.value(p.x, p.y);
        if (v == -1 || v == 9) {
          return [];
        }
        this.setValue(p.x, p.y, -1);
        size++;
        return [{x: p.x+1, y: p.y}, {x: p.x-1, y: p.y}, {x: p.x, y: p.y+1}, {x: p.x, y: p.y-1}].filter(u => this.validCoordinates(u.x, u.y));
      });
    }

    return size;
  }

  adjacent(x: number, y: number): number[] {
    if (!this.validCoordinates(x, y)) {
      throw new Error(`Invalid coordinates: x=${x}, y=${y}`);
    }
    return [{x: x+1, y: y}, {x: x-1, y: y}, {x: x, y: y+1}, {x: x, y: y-1}]
      .filter(c => this.validCoordinates(c.x, c.y))
      .map(c => this.values[c.y * this.width + c.x]);
  }
}

const parseInput = async (rd: readline.Interface): Promise<HeightMap> => {
  const input: number[] = [];
  let width = 0;
  let height = 0;
  for await (const line of rd) {
    const digits = line.split('').map(x => parseInt(x));
    width = Math.max(width, digits.length);
    height++;
    input.push(...digits);
  }
  return new HeightMap(width, height, input);
}

const smokeBasinPart1 = async (input: HeightMap): Promise<number> => {
  const localMin: number[] = [];
  for (let i = 0; i < input.width; i++) {
    for (let j = 0; j < input.height; j++) {
      const v = input.value(i, j);
      if (input.adjacent(i, j).filter(x => x <= v).length == 0) {
        localMin.push(v);
      }
    }
  }
  return localMin.reduce((a, x) => a + x + 1, 0);
};

const smokeBasinPart2 = async (input: HeightMap): Promise<number> => {
  const localMin: {x: number, y: number}[] = [];
  for (let i = 0; i < input.width; i++) {
    for (let j = 0; j < input.height; j++) {
      const v = input.value(i, j);
      if (input.adjacent(i, j).filter(x => x <= v).length == 0) {
        localMin.push({x:i, y:j});
      }
    }
  }
  let basins: number[] = [];
  localMin.forEach(m => {
    const copy = input.copy();
    basins.push(copy.findBasin(m.x, m.y));
  });
  return basins.sort((a,b) => (a < b ? 1 : -1)).slice(0, 3).reduce((a, x) => a * x, 1);
};

export { smokeBasinPart1, smokeBasinPart2, parseInput}
