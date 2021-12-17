import {parseInputPart2, parseInputPart1, chiton} from "./app";
import readline, {Interface} from "readline";
import fs from "fs";
import {Readable} from "stream";

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

const main = async (path: string): Promise<void> => {
  const content = fs.readFileSync(path,'utf8');
  const input1 = await parseInputPart1(readable(content));
  console.log("Part 1: ", await chiton(input1));
  const input2 = await parseInputPart2(readable(content));
  console.log("Part 2: ", await chiton(input2));
};

const args = process.argv.slice(2);
if (args.length == 0) {
  throw new Error("Missing input file");
}
main(args[0]);
