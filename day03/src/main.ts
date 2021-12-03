import {parseInput, binaryDiagnosticPart1, binaryDiagnosticPart2} from "./app";

const main = async (path: string): Promise<void> => {
  const diagnostic = await parseInput(path);
  console.log(await binaryDiagnosticPart1(diagnostic));
  console.log(await binaryDiagnosticPart2(diagnostic));
};

const args = process.argv.slice(2);
if (args.length == 0) {
  throw new Error("Missing input file");
}
main(args[0]);
