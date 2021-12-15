import {Readable} from "stream";
import {
  extendedPolymerizationPart1,
  polymerizationStep,
  extendedPolymerizationPart2,
  parseInput,
  mergeMaps, computeFrequencies
} from './app';
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

const TEST_INPUT = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

describe('Day 14', () => {
  it('Should merge maps', () => {
    // Given
    const m1 = new Map([['a', 12], ['b', 4], ['c', 7]]);
    const m2 = new Map([['a', 3], ['b', 7], ['d', 1]]);
    // When
    const result = mergeMaps(m1, m2);
    // Then
    expect(result.get('a')).toEqual(15);
    expect(result.get('b')).toEqual(11);
    expect(result.get('c')).toEqual(7);
    expect(result.get('d')).toEqual(1);
  });

  it('Should compute frequencies round = 0', async () => {
    const rl = readable(TEST_INPUT);
    const elemnts = "NN";
    // When
    const input = await parseInput(rl);
    const cache = new Array(1).fill(new Map<string, number>());
    const result = computeFrequencies(elemnts, 0, cache, input.rules);
    // Then
    expect(result).toEqual(new Map([['N', 1]]));
  });

  it('Should compute frequencies round = 1', async () => {
    const rl = readable(TEST_INPUT);
    const elemnts = "NN";
    // When
    const input = await parseInput(rl);
    const cache = new Array(2).fill(new Map<string, number>());
    const result = computeFrequencies(elemnts, 1, cache, input.rules);
    // Then
    expect(result).toEqual(new Map([['N', 1], ['C', 1]]));
  });

  it('Should validate polymerization step', async () => {
    // Given
    const rl = readable(TEST_INPUT);
    // When
    const input = await parseInput(rl);
    const step1 = await polymerizationStep(input.template, input.rules);
    const step2 = await polymerizationStep(step1, input.rules);
    const step3 = await polymerizationStep(step2, input.rules);
    const step4 = await polymerizationStep(step3, input.rules);
    // Then
    expect(step1).toEqual('NCNBCHB');
    expect(step2).toEqual('NBCCNBBBCBHCB');
    expect(step3).toEqual('NBBBCNCCNBBNBNBBCHBHHBCHB');
    expect(step4).toEqual('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');
  });

  it('Should validate part 1', async () => {
    // Given
    const rl = readable(TEST_INPUT);
    // When
    const input = await parseInput(rl);
    const result = await extendedPolymerizationPart1(input);
    // Then
    expect(result).toEqual(1588);
  });

  it('Should validate part 2', async () => {
    // Given
    const rl = readable(TEST_INPUT);
    // When
    const input = await parseInput(rl);
    const result = await extendedPolymerizationPart2(input);
    // Then
    expect(result).toEqual(2188189693529);
  });
});
