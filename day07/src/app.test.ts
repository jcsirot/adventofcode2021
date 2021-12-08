import {Readable} from "stream";
import {treacheryOfWhalesPart1, treacheryOfWhalesPart2, parseInput} from './app';
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

describe('Day 07', () => {
  it('Should validate part 1', async () => {
    // Given
    const rl = readable('16,1,2,0,4,2,7,1,2,14');
    // When
    const input = await parseInput(rl);
    const result = await treacheryOfWhalesPart1(input);
    // Then
    expect(result).toEqual(37);
  });

  it('Should validate part 2', async () => {
    // Given
    const rl = readable('16,1,2,0,4,2,7,1,2,14');
    // When
    const input = await parseInput(rl);
    const result = await treacheryOfWhalesPart2(input);
    // Then
    expect(result).toEqual(168);
  });
});
