import {Readable} from "stream";
import {lanternfishPart1, lanternfishPart2, parseInput} from './app';
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

describe('Day 06', () => {
  it('Should validate part 1', async () => {
    // Given
    const rl = readable('3,4,3,1,2');
    // When
    const input = await parseInput(rl);
    const result = await lanternfishPart1(input);
    // Then
    expect(result).toEqual(5934);
  });

  it('Should validate part 2', async () => {
    // Given
    const rl = readable('3,4,3,1,2');
    // When
    const input = await parseInput(rl);
    const result = await lanternfishPart2(input);
    // Then
    expect(result).toEqual(26984457539);
  });
});
