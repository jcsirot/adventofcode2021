import {Readable} from "stream";
import {dumboOctopusPart1, dumboOctopusPart2, parseInput} from './app';
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

describe('Day 11', () => {
  it('Should validate 10 steps', async () => {
    // Given
    const rl = readable(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`);
    const expected = `0481112976
0031112009
0041112504
0081111406
0099111306
0093511233
0442361130
5532252350
0532250600
0032240000`;
    // When
    let input = await parseInput(rl);
    for (let i = 0; i < 10; i++) {
      input = input.step();
    }
    // Then
    expect(input.toString()).toEqual(expected);
  });

  it('Should validate 20 steps', async () => {
    // Given
    const rl = readable(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`);
    const expected = `3936556452
5686556806
4496555690
4448655580
4456865570
5680086577
7000009896
0000000344
6000000364
4600009543`;
    // When
    let input = await parseInput(rl);
    for (let i = 0; i < 20; i++) {
      input = input.step();
    }
    // Then
    expect(input.toString()).toEqual(expected);
  });

  it('Should validate part 1', async () => {
    // Given
    const rl = readable(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`);
    // When
    const input = await parseInput(rl);
    const result = await dumboOctopusPart1(input);
    // Then
    expect(result).toEqual(1656);
  });

  it('Should validate part 2', async () => {
    // Given
    const rl = readable(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`);
    // When
    const input = await parseInput(rl);
    const result = await dumboOctopusPart2(input);
    // Then
    expect(result).toEqual(195);
  });
});
