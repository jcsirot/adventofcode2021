import readline from 'readline';
import fs, {Dir} from 'fs';

enum Direction {
  Forward,
  Up,
  Down,
}

const parseDirection = (str: string): Direction => {
  if (str === 'forward') {
    return Direction.Forward;
  } else if (str === 'up') {
    return Direction.Up;
  } else if (str === 'down') {
    return Direction.Down;
  }
  throw new Error(`Direction parsing failed: ${str}`);
}

type Move = {
  direction: Direction;
  value: number;
}

const parseInput = async (path: string): Promise<Move[]> => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false
  });
  const moves: Move[] = [];
  for await (const line of rl) {
    const elts = line.split(/\s+/);
    moves.push({direction: parseDirection(elts[0]), value: parseInt(elts[1])});
  }
  return moves;
}

const divePart1 = async (moves: Move[]): Promise<number> => {
  let x = 0, y = 0;
  for await (const move of moves) {
    if (move.direction === Direction.Forward) {
      x += move.value;
    } else if (move.direction === Direction.Up) {
      y -= move.value;
    } else {
      y += move.value;
    }
  }
  return x*y;
};

const divePart2 = async (moves: Move[]): Promise<number> => {
  let x = 0, y = 0, aim = 0;
  for await (const move of moves) {
    if (move.direction === Direction.Forward) {
      x += move.value;
      y += move.value * aim;
    } else if (move.direction === Direction.Up) {
      aim -= move.value;
    } else {
      aim += move.value;
    }
  }
  return x*y;
};

export { divePart1, divePart2, parseInput, Direction }
