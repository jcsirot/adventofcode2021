import {Readable} from "stream";
import {passagePathingPart1, passagePathingPart2, parseInput} from './app';
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
  it('Should validate part 1 case 1', async () => {
    // Given
    const rl = readable(`start-A
start-b
A-c
A-b
b-d
A-end
b-end`);
    // When
    const input = await parseInput(rl);
    const result = await passagePathingPart1(input);
    // Then
    expect(result).toEqual(10);
  });

  it('Should validate part 1 case 2', async () => {
    // Given
    const rl = readable(`dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`);
    // When
    const input = await parseInput(rl);
    const result = await passagePathingPart1(input);
    // Then
    expect(result).toEqual(19);
  });

  it('Should validate part 1 case 3', async () => {
    // Given
    const rl = readable(`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`);
    // When
    const input = await parseInput(rl);
    const result = await passagePathingPart1(input);
    // Then
    expect(result).toEqual(226);
  });

  it('Should validate part 2 case 1', async () => {
    // Given
    const rl = readable(`start-A
start-b
A-c
A-b
b-d
A-end
b-end`);
    // When
    const input = await parseInput(rl);
    const result = await passagePathingPart2(input);
    // Then
    expect(result).toEqual(36);
  });

  it('Should validate part 2 case 2', async () => {
    // Given
    const rl = readable(`dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`);
    // When
    const input = await parseInput(rl);
    const result = await passagePathingPart2(input);
    // Then
    expect(result).toEqual(103);
  });

  it('Should validate part 2 case 3', async () => {
    // Given
    const rl = readable(`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`);
    // When
    const input = await parseInput(rl);
    const result = await passagePathingPart2(input);
    // Then
    expect(result).toEqual(3509);
  });
});
