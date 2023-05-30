import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function readFilePath() {
  return rl.question("Enter your file path: ", (answer) => {
    console.log("answer", answer);
  });
}
