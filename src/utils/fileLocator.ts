import readline from "readline";
import Redis from "ioredis";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const redis = new Redis();

export function readFilePath() {
  return new Promise((resolve, reject) => {
    rl.question("Enter your file path: ", (answer) => {
      redis.set("filePath", answer);
      console.log("Saved path!");
      resolve(answer);
    });
  });
}
