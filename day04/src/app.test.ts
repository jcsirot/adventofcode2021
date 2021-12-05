import {Readable} from "stream";
import {giantSquidPart1, giantSquidPart2, parseInput} from './app';
import readline from "readline";

describe('Day 04', () => {
  it('Should validate part 1', async () => {
    // Given
    const bingo = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`
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
    const result = await giantSquidPart1(input);
    // Then
    expect(result).toEqual(4512);
  });

  it('Should validate part 2', async () => {
    // Given
    const bingo = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`
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
    const result = await giantSquidPart2(input);
    // Then
    expect(result).toEqual(1924);
  });
});
