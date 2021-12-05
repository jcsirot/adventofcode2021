import {Readable} from "stream";
import {hydrothermalVenturePart1, hydrothermalVenturePart2, parseInput, Segment} from './app';
import readline from "readline";

describe('Segment includes point', () => {
  it('returns true when point is in segment', async () => {
    // Given
    const s = new Segment(0, 0, 5, 0);
    const px = 3, py = 0;
    // When
    const result = s.include(px, py);
    // Then
    expect(result).toBeTruthy();
  });

  it('returns true when point is in 45° segment', async () => {
    // Given
    const s = new Segment(5, 2, 16, 13);
    const px = 8, py = 5;
    // When
    const result = s.include(px, py);
    // Then
    expect(result).toBeTruthy();
  });

  it('returns false when points are aligned but outside the segment', async () => {
    // Given
    const s = new Segment(2, 7, 2, 9);
    const px = 2, py = 11;
    // When
    const result = s.include(px, py);
    // Then
    expect(result).toBeFalsy();
  });

  it('returns false when points are not aligned', async () => {
    // Given
    const s = new Segment(1, 2, 9, 2);
    const px = 3, py = 6;
    // When
    const result = s.include(px, py);
    // Then
    expect(result).toBeFalsy();
  });
});

describe('Day 05', () => {
  it('Should validate part 1', async () => {
    // Given
    const bingo = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`
    const s = new Readable();
    s.push(bingo);
    s.push(null);
    const rl = readline.createInterface({
      input: s,
      output: process.stdout,
      terminal: false
    });
    // When
    const input = await parseInput(rl);
    const result = await hydrothermalVenturePart1(input);
    // Then
    expect(result).toEqual(5);
  });

  it('Should validate part 2', async () => {
    // Given
    const bingo = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`
    const s = new Readable();
    s.push(bingo);
    s.push(null);
    const rl = readline.createInterface({
      input: s,
      output: process.stdout,
      terminal: false
    });
    // When
    const input = await parseInput(rl);
    const result = await hydrothermalVenturePart2(input);
    // Then
    expect(result).toEqual(12);
  });
});
