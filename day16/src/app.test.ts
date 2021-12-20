import {Readable} from "stream";
import {packetDecoderPart1, packetDecoderPart2, parseInput} from './app';
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

const TEST_VECTORS_PART_1 = [
  {packet: `D2FE28`, expected: 6},
  {packet: `38006F45291200`, expected: 9},
  {packet: `8A004A801A8002F478`, expected: 16},
  {packet: `620080001611562C8802118E34`, expected: 12},
  {packet: `C0015000016115A2E0802F182340`, expected: 23},
  {packet: `A0016C880162017C3686B18A3D4780`, expected: 31},
];

const TEST_VECTORS_PART_2 = [
  {packet: 'C200B40A82', expected: 3},
  {packet: '04005AC33890', expected: 54},
  {packet: '880086C3E88112', expected: 7},
  {packet: 'CE00C43D881120', expected: 9},
  {packet: 'D8005AC2A8F0', expected: 1},
  {packet: 'F600BC2D8F', expected: 0},
  {packet: '9C005AC2F8F0', expected: 0},
  {packet: '9C0141080250320F1802104A08', expected: 1},
];

describe('Day 16', () => {

  test.each(TEST_VECTORS_PART_1)(
    `Should validate input $packet with version sum $expected`, async ({packet, expected}) => {
      // Given
      const rl = readable(packet);
      // When
      const input = await parseInput(rl);
      const result = await packetDecoderPart1(input);
      // Then
      expect(result).toEqual(expected);
    }
  );

  test.each(TEST_VECTORS_PART_2)(
    `Should validate input $packet with value $expected`, async ({packet, expected}) => {
      // Given
      const rl = readable(packet);
      // When
      const input = await parseInput(rl);
      const result = await packetDecoderPart2(input);
      // Then
      expect(result).toEqual(expected);
    }
  );
});
