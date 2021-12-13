import {Readable} from "stream";
import {transparentOrigamiPart1, transparentOrigamiPart2, parseInput} from './app';
import readline, {Interface} from "readline";

const readable = (input: string): Interface => {
  const s = new Readable();
  s.push(input);
  s.push(null);
  return readline.createInterface({
    input: s,
    output: process.stdout,
    terminal: false
  });
}

describe('Day 12', () => {
  it('Should validate part 1', async () => {
    // Given
    const rl = readable(`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`);
    // When
    const input = await parseInput(rl);
    const result = await transparentOrigamiPart1(input);
    // Then
    expect(result).toEqual(17);
  });

  it('Should validate part 2', async () => {
    // Given
    const rl = readable(`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`);
    const expected = `#####
#   #
#   #
#   #
#####`
    // When
    const input = await parseInput(rl);
    const result = await transparentOrigamiPart2(input);
    // Then
    expect(result).toEqual(expected);
  });
});
