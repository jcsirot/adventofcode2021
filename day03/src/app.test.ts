import {binaryDiagnosticPart1, binaryDiagnosticPart2 } from './app';

describe('Day 01', () => {
  it('Should validate part 1', async () => {
    // Given
    const diagnostics = {
      values: [0b00100, 0b11110, 0b10110, 0b10111, 0b10101, 0b01111, 0b00111, 0b11100, 0b10000, 0b11001, 0b00010, 0b01010],
      len: 5,
    }
    // When
    const result = await binaryDiagnosticPart1(diagnostics);
    // Then
    expect(result).toEqual(198);
  });

  it('Should validate part 2', async () => {
    // Given
    const diagnostics = {
      values: [0b00100, 0b11110, 0b10110, 0b10111, 0b10101, 0b01111, 0b00111, 0b11100, 0b10000, 0b11001, 0b00010, 0b01010],
      len: 5,
    }
    // When
    const result = await binaryDiagnosticPart2(diagnostics);
    // Then
    expect(result).toEqual(230);
  });
});
