import * as readline from 'readline';

interface Point {
  x: number,
  y: number,
}

interface Fold {
  axis: 'x' | 'y',
  value: number,
}

class Origami {
  points: Point[];
  folds: Fold[];

  constructor(points: Point[], folds: Fold[]) {
    this.points = points;
    this.folds = folds;
  }
}

const parseInput = async (rd: readline.Interface): Promise<Origami> => {
  const points: Point[] = [];
  const folds: Fold[] = [];
  for await (const line of rd) {
    if (line.startsWith('fold')) {
      const [axis, value] = line.slice(11).split('=');
      if (axis != 'x' &&  axis != 'y') {
        throw new Error(`invalid folding axis: ${axis}`);
      }
      folds.push({axis: axis, value: parseInt(value)});
    } else if (line == '') {
      // empty line, continue...
    } else {
      const [x, y] = line.split(',').map(x => parseInt(x));
      points.push({x: x, y: y});
    }
  }
  return new Origami(points, folds);
}

const uniq = (list: Point[]): Point[] => {
  return Array.from(list.reduce((m, p) => {
    const id = p.x + (p.x+p.y)*(p.x+p.y+1)/2;
    m.set(id, p);
    return m;
  }, new Map<number, Point>()).values());
}

const transform = (fold: Fold): ((p: Point) => Point) => {
  if (fold.axis == 'x') {
    return (p) => {
      if (p.x > fold.value) {
        return {x: 2 * fold.value - p.x, y: p.y};
      } else {
        return p;
      }
    };
  } else {
    return (p) => {
      if (p.y > fold.value) {
        return {x: p.x, y: 2 * fold.value - p.y};
      } else {
        return p;
      }
    };
  }
}

const transparentOrigamiPart1 = async (input: Origami): Promise<number> => {
  const t = transform(input.folds[0]);
  return uniq(input.points.map(p => t(p))).length;
};

const toString = (points: Point[]): string => {
  const maxX = points.reduce((a, p) => p.x > a ? p.x : a, 0);
  const maxY = points.reduce((a, p) => p.y > a ? p.y : a, 0);
  const r: string[] = []
  for (let i = 0; i <= maxY; i++) {
    r.push(' '.repeat(maxX));
  }
  points.forEach(p => r[p.y] = r[p.y].substring(0, p.x) + "#" + r[p.y].substring(p.x + 1));
  return r.join('\n');
}

const transparentOrigamiPart2 = async (input: Origami): Promise<string> => {
  let points: Point[];
  points = input.points;
  input.folds.forEach(fold => {
    points = uniq(points.map(p => transform(fold)(p)));
  });
  return toString(points);
};

export { transparentOrigamiPart1, transparentOrigamiPart2, parseInput }
