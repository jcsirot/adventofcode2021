import * as readline from 'readline';

interface TargetZone {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

const parseInput = async (rd: readline.Interface): Promise<TargetZone> => {
  for await (const line of rd) {
    const coordinates = line.match(/(-?\d+)/g);
    if (coordinates != null) {
      const [xmin, xmax, ymin, ymax] = coordinates.map(x => parseInt(x));
      return {xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax};
    }
    throw new Error(`could not parse coordinates: ${line}`);
  }
  throw new Error();
}

/**
 * x(t) = v0*t + t*(t-1)/2   if t <= v0
 *      = x(v0)              if t > v0
 */
const x = (v0: number): (t: number) => number => (t: number): number => t <= v0 ? v0 * t - (t * (t - 1) >> 1) : x(v0)(v0);

/**
 * y(t) = v0*t + t*(t-1)/2
 */
const y = (v0: number): (t: number) => number =>  (t: number): number => v0 * t - (t * (t - 1) >> 1);

/**
 * Returns a function which returns the velocity on y axis from he time.
 * @param v0 the initial velocity on y axis
 */
const vy = (v0: number): (t: number) => number =>  (t: number): number => v0 - t;

/**
 * Returns a function which returns t from y value. Inverse y(t) function.
 * The trajectory does not necessary include a point for that y. In that case the value is not an integer
 * @param v0 the initial velocity on y axis
 */
const invy = (v0: number): (y: number) => number =>  (y: number): number => {
  const b = -(1+2*v0)
  const c = 2*y;
  const delta = b*b - 4*c;
  const [t] = [(Math.sqrt(delta) - b)/2, (-Math.sqrt(delta) - b)/2].filter(t => t > 0); // ignore negative solution
  return t;
}

/**
 * Returns an upper value for the initial velocity for which we are sure that the trajectory hit the target zone.
 * @param ymin the lower bound of the target zone
 */
const vylimit = (ymin: number): number => {
  for (let vy0 = 0; ; vy0++) {
    // at t1 = 2vy0+1, y(t1)=0 => if vy(t1) < ymin then vy0 is a vy upper bound
    if (Math.abs(vy(vy0)(2 * vy0 + 1)) > Math.abs(ymin)) {
      return vy0;
    }
  }
}

const trickShotPart1 = async (input: TargetZone): Promise<number> => {
  let vy0 = 0;
  let vybest
  let ymax = 0;
  const limit = vylimit(input.ymin);
  while (vy0 < limit) {
    const tlimit = invy(vy0)(input.ymin);
    const ypos = y(vy0)(Math.floor(tlimit));
    if (ypos <= input.ymax) {
      ymax = y(vy0)(vy0);
      vybest = vy0;
    }
    vy0++;
  }
  return ymax;
};

const trickShotPart2 = async (input: TargetZone): Promise<number> => {
  let limit = vylimit(input.ymin);
  let hits = 0;
  for (let vx0 = 1; vx0 <= input.xmax; vx0++) {
    for (let vy0 = input.ymin; vy0 < limit; vy0++) {
      let t = 0;
      const X = x(vx0);
      const Y = y(vy0);
      while (true) {
        if (X(t) >= input.xmin && X(t) <= input.xmax && Y(t) >= input.ymin && Y(t) <= input.ymax) {
          hits++;
          break;
        }
        if (X(t) > input.xmax || Y(t) < input.ymin) {
          break;
        }
        t++;
      }
    }
  }
  return hits;
};

export { trickShotPart1, trickShotPart2, parseInput }
