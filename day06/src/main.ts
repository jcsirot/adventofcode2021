import {parseInput, lanternfishPart1, lanternfishPart2} from "./app";
import readline from "readline";
import fs from "fs";

const main = async (path: string): Promise<void> => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false
  });
  const input = await parseInput(rl);
  console.log("Part 1: ", await lanternfishPart1(input));
  console.log("Part 2: ", await lanternfishPart2(input));
};

const args = process.argv.slice(2);
if (args.length == 0) {
  throw new Error("Missing input file");
}
main(args[0]);
