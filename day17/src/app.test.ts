import {Readable} from "stream";
import {parseInput, trickShotPart1, trickShotPart2} from './app';
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

const TEST_VALUE = `target area: x=20..30, y=-10..-5`;

describe('Day 17', () => {

  it(`Should validate part 1`, async () => {
    // Given
    const rl = readable(TEST_VALUE);
    // When
    const input = await parseInput(rl);
    const result = await trickShotPart1(input);
    // Then
    expect(result).toEqual(45);
  });

  it(`Should validate part 2`, async () => {
    // Given
    const rl = readable(TEST_VALUE);
    // When
    const input = await parseInput(rl);
    const result = await trickShotPart2(input);
    // Then
    expect(result).toEqual(112);
  });
});
