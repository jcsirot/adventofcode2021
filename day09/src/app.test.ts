import {Readable} from "stream";
import {smokeBasinPart1, smokeBasinPart2, parseInput} from './app';
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

describe('Day 09', () => {
  it('Should validate part 1', async () => {
    // Given
    const rl = readable(`2199943210
3987894921
9856789892
8767896789
9899965678`);
    // When
    const input = await parseInput(rl);
    const result = await smokeBasinPart1(input);
    // Then
    expect(result).toEqual(15);
  });

  it('Should validate part 2', async () => {
    // Given
    const rl = readable(`2199943210
3987894921
9856789892
8767896789
9899965678`);
    // When
    const input = await parseInput(rl);
    const result = await smokeBasinPart2(input);
    // Then
    expect(result).toEqual(1134);
  });
});
