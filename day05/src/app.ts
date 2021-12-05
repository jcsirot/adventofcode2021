import * as readline from 'readline';
import {inflate} from "zlib";

class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  det(v: Vector): number {
    return this.x * v.y - this.y * v.x;
  }

  scalarProduct(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }
}

class Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  include(x: number, y: number): boolean {
    const am = new Vector(x - this.x1, y - this.y1);
    const bm = new Vector(x - this.x2, y - this.y2);
    if (am.det(bm) != 0) {
      return false;
    }
    if (Math.sign(am.scalarProduct(bm)) > 0) {
      return false;
    }
    return true;
  }
}

class Input {

  segments: Segment[];

  constructor() {
    this.segments = [];
  }

  addSegment(x1: number, y1: number, x2: number, y2: number) {
    this.segments.push(new Segment(x1, y1, x2, y2));
  }
}

const parseInput = async (rd: readline.Interface): Promise<Input> => {
  const input = new Input();
  for await (const line of rd) {
    let coordinates = line.replace(/\D/g, " ").trim().split(/\s+/).map(s => parseInt(s));
    if (coordinates.length != 4) {
      throw new Error("Invalid input: " + line);
    }
    input.addSegment(coordinates[0], coordinates[1], coordinates[2], coordinates[3]);
  }
  return input;
}

const minX = (segments: Segment[]): number => segments.reduce((a, s) => Math.min(a, s.x1, s.x2), 0);

const minY = (segments: Segment[]): number => segments.reduce((a, s) => Math.min(a, s.y1, s.y2), 0);

const maxX = (segments: Segment[]): number => segments.reduce((a, s) => Math.max(a, s.x1, s.x2), 0);

const maxY = (segments: Segment[]): number => segments.reduce((a, s) => Math.max(a, s.y1, s.y2), 0);

const countIntersectingPoints = async (segments: Segment[]): Promise<number> => {
  let result = 0;
  for (let c = minX(segments); c <= maxX(segments); c++) {
    for (let r = minY(segments); r <= maxY(segments); r++) {
      let count = 0;
      segments.forEach((s) => {
        if (s.include(r, c)) {
          count ++;
        }
      });
      if (count >= 2) {
        result++;
      }
    }
  }
  return result;
};

const hydrothermalVenturePart1 = async (input: Input): Promise<number> => {
  // filter only horizontal and vertical segments
  const segments = input.segments.filter((s) => s.x1 == s.x2 || s.y1 == s.y2);
  return countIntersectingPoints(segments);
};

const hydrothermalVenturePart2 = async (input: Input): Promise<number> => {
  return countIntersectingPoints(input.segments);
};

export { hydrothermalVenturePart1, hydrothermalVenturePart2, parseInput, Segment}
