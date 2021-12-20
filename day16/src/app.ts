import * as readline from 'readline';

interface Packet {
  version: number;
  type: number;

  versionSum(): number;
  value(): number;
}

class StringStream {

  str: string;
  index: number;

  constructor(str: string) {
    this.str = str;
    this.index = 0;
  }

  read(len: number): string {
    this.index += len;
    return this.str.slice(this.index - len, this.index);
  }
}

const decode = (input: StringStream): Packet => {
  const version = parseInt(input.read(3), 2);
  const type = parseInt(input.read(3), 2);
  switch (type) {
    case 4:
      const value = decodeLiteralPaylod(input);
      return new LiteralPacket(version, type, value);
    default:
      const { totalLength, len } = decodeOperatorPayload(input);
      const packets: Packet[] = [];
      let remain = len;
      while (remain > 0) {
        const curIndex = input.index;
        packets.push(decode(input));
        remain -= totalLength ? input.index - curIndex : 1;
      }
      return new OperatorPacket(version, type, packets);
  }
}

const decodeLiteralPaylod = (input: StringStream): number => {
  let value = 0;
  while (true) {
    const prefix = input.read(1);
    const x = input.read(4);
    //value += x;
    value = (value * 16) + parseInt(x, 2);
    if (prefix == '0') {
      return value; // parseInt(value, 2);
    }
  }
}

const decodeOperatorPayload = (input: StringStream): { totalLength: boolean, len: number } => {
  const lenTypeId = input.read(1);
  return {
    totalLength: lenTypeId == '0',
    len: parseInt(input.read(lenTypeId == '0' ? 15 : 11), 2),
  };
}

class OperatorPacket implements Packet {
  version: number;
  type: number;
  packets: Packet[]

  constructor(version: number, type: number, packets: Packet[]) {
    this.version = version;
    this.type = type;
    this.packets = packets;
  }

  versionSum(): number {
    return this.packets.reduce((sum, p) => sum + p.versionSum(), this.version);
  }

  value(): number {
    const values = this.packets.map(p => p.value());
    switch (this.type) {
      case 0:
        return values.reduce((sum, v) => sum + v, 0);
      case 1:
        return values.reduce((prod, v) => prod * v, 1);
      case 2:
        return Math.min(...values);
      case 3:
        return Math.max(...values);
      case 5:
        return values[0] > values[1] ? 1 : 0;
      case 6:
        return values[0] < values[1] ? 1 : 0;
      case 7:
        return values[0] == values[1] ? 1 : 0;
      default:
        throw new Error(`unexpected packet type: ${this.type}`);
    }
  }

}

class LiteralPacket implements Packet {
  version: number;
  type: number;
  val: number;

  constructor(version: number, type: number, value: number) {
    this.version = version;
    this.type = type;
    this.val = value;
  }

  versionSum(): number {
    return this.version;
  }

  value(): number {
    return this.val;
  }
}

const parseInput = async (rd: readline.Interface): Promise<string> => {
  let input = '';
  for await (const line of rd) {
    input += line;
  }
  return input;
}

const packetDecoderPart1 = async (input: string): Promise<number> => {
  let binaryStr = input.split('').map(x => parseInt(x, 16)).map(x => x.toString(2).padStart(4, '0')).join('');
  const p = decode(new StringStream(binaryStr));
  return p.versionSum();
};

const packetDecoderPart2 = async (input: string): Promise<number> => {
  let binaryStr = input.split('').map(x => parseInt(x, 16)).map(x => x.toString(2).padStart(4, '0')).join('');
  const p = decode(new StringStream(binaryStr));
  return p.value();
};

export { packetDecoderPart1, packetDecoderPart2, parseInput }
