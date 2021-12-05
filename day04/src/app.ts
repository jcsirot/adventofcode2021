import * as readline from 'readline';

class Board {
  size: number;
  nums: number[];
  marks: boolean[];

  constructor(size: number) {
    this.size = size;
    this.nums = [];
    this.marks = new Array(size * size);
    this.marks.fill(false);
  }

  addCell(num: number) {
    this.nums.push(num);
  }

  play(v: number): boolean {
    const index = this.nums.indexOf(v);
    if (index >= 0) {
      this.marks[index] = true;
    }
    return this.won();
  }

  sumOfUnmarked(): number {
    return this.nums.filter((v, i) => !this.marks[i]).reduce((s, x) => s + x, 0);
  }

  won(): boolean {
    for (let x = 0; x < this.size; x++) {
      const a = this.marks.filter((b, i) => Math.floor(i / this.size) == x);
      if (a.every((b) => b)) {
        return true;
      }
      if (this.marks.filter((b, i) => i % this.size == x).every((b) => b)) {
        return true;
      }
    }
    return false;
  }
}

class Input {
  boards: Board[];
  draws: number[];
  wonBoards: number[];

  constructor() {
    this.draws = [];
    this.boards = [];
    this.wonBoards = [];
  }

  addDrawNumber(value: number) {
    this.draws.push(value);
  }

  addBoard(board: Board) {
    this.boards.push(board);
  }

  play(v: number): number {
    let wonThisTurn = -1;
    this.boards.forEach((b, index) => {
      const w = b.play(v)
      if (w && this.wonBoards.indexOf(index) == -1) {
        this.wonBoards.push(index);
        wonThisTurn = index;
      }
    });
    return wonThisTurn;
  }

  won(): number {
    const won = this.boards.map((b, index) => b.won() ? index : -1).filter(u => u != -1);
    if (won.length >= 1) {
      return won[0];
    } else {
      return -1;
    }
  }

  lost(): number[] {
    return this.boards.map((b, index) => !b.won() ? index : -1).filter(u => u != -1);
  }
}

const parseInput = async (rd: readline.Interface): Promise<Input> => {
  const input = new Input();
  let board: Board;
  for await (const line of rd) {
    if (line.includes(',')) {
      line.split(',').map(s => parseInt(s)).forEach((v) => input.addDrawNumber(v));
    } else if (line == '') {
      board = new Board(5);
      input.addBoard(board);
    } else {
      const x = line.trim().split(/\s+/);
      x.map(s => parseInt(s)).forEach((v) => board.addCell(v));
    }
  }
  return input;
}

const giantSquidPart1 = async (input: Input): Promise<number> => {
  for (let i = 0; i < input.draws.length; i++) {
    const v = input.draws[i];
    const won = input.play(v);
    if (won != -1) {
      return input.boards[won].sumOfUnmarked() * v;
    }
  }
  return 0;
};

const giantSquidPart2 = async (input: Input): Promise<number> => {
  let lastScore = 0;
  for (let i = 0; i < input.draws.length; i++) {
    const v = input.draws[i];
    const won = input.play(v);
    if (won != -1) {
      lastScore = input.boards[won].sumOfUnmarked() * v;
    }
  }
  return lastScore;
};

export { giantSquidPart1, giantSquidPart2, parseInput }
