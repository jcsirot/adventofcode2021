import {parseInput, giantSquidPart1, giantSquidPart2} from "./app";
import readline from "readline";
import fs from "fs";

const main = async (path: string): Promise<void> => {
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false
  });
  const input = await parseInput(rl);
  console.log("Part 1: ", await giantSquidPart1(input));
  console.log("Part 2: ", await giantSquidPart2(input));
};

const args = process.argv.slice(2);
if (args.length == 0) {
  throw new Error("Missing input file");
}
main(args[0]);
