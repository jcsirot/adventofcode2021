import {parseInput, divePart1, divePart2} from "./app";

const main = async (path: string): Promise<void> => {
  const moves = await parseInput(path);
  console.log('part 1: ', await divePart1(moves));
  console.log('part 2: ',await divePart2(moves));
};

const args = process.argv.slice(2);
if (args.length == 0) {
  throw new Error("Missing input file");
}
main(args[0]);
