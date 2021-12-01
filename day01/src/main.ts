import {readFile, sonarSweepPart1, sonarSweepPart2} from "./app";

const main = async (path: string): Promise<void> => {
  const scan = await readFile(path);
  console.log(await sonarSweepPart1(scan));
  console.log(await sonarSweepPart2(scan));
};

const args = process.argv.slice(2);
if (args.length == 0) {
  throw new Error("Missing input file");
}
main(args[0]);
