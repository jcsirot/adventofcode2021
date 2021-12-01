import { sonarSweepPart1, sonarSweepPart2 } from './app';

describe('Day 01', () => {
  it('Should validate part 1', async () => {
    // Given
    const scan = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    // When
    const result = await sonarSweepPart1(scan);
    // Then
    expect(result).toEqual(7);
  });

  it('Should validate part 2', async () => {
    // Given
    const scan = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    // When
    const result = await sonarSweepPart2(scan);
    // Then
    expect(result).toEqual(5);
  });
});
