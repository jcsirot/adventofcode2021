import {Readable} from "stream";
import {chiton, parseInputPart1, parseInputPart2} from './app';
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

const TEST_INPUT = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

/*
const TEST_INPUT = `112
234
191`;
*/
describe('Day 15', () => {

  it('Should validate part 1', async () => {
    // Given
    const rl = readable(TEST_INPUT);
    // When
    const input = await parseInputPart1(rl);
    const result = await chiton(input);
    // Then
    expect(result).toEqual(40);
  });

  it('Should validate part 2', async () => {
    // Given
    const rl = readable(TEST_INPUT);
    // When
    const input = await parseInputPart2(rl);
    const result = await chiton(input);
    // Then
    expect(result).toEqual(315);
  });
});
