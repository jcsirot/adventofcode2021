import { divePart1, divePart2, Direction } from './app';

describe('Day 02', () => {
  it('Should validate part 1', async () => {
    // Given
    const input = [
      {direction: Direction.Forward, value: 5},
      {direction: Direction.Down, value: 5},
      {direction: Direction.Forward, value: 8},
      {direction: Direction.Up, value: 3},
      {direction: Direction.Down, value: 8},
      {direction: Direction.Forward, value: 2},
    ];
    // When
    const result = await divePart1(input);
    // Then
    expect(result).toEqual(150);
  });

  it('Should validate part 2', async () => {
    // Given
    const input = [
      {direction: Direction.Forward, value: 5},
      {direction: Direction.Down, value: 5},
      {direction: Direction.Forward, value: 8},
      {direction: Direction.Up, value: 3},
      {direction: Direction.Down, value: 8},
      {direction: Direction.Forward, value: 2},
    ];
    // When
    const result = await divePart2(input);
    // Then
    expect(result).toEqual(900);
  });
});
