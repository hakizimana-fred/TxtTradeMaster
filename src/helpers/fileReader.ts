import fs from "fs";
import path from "path";

class ReadFile {
  async read() {
    const data = fs.readFileSync(path.join(__dirname, "sample.txt"), "utf8");
    this.parseData(data);
  }

  parseData(data: any) {
    if (data) {
      const instructions = data.split("\n");
      const executions = {
        market: instructions.find((line: string) =>
          line.includes("market order")
        ),
        limit: instructions.find((line: string) =>
          line.includes("limit order")
        ),
      };

      console.log(executions, "executions");
    }
  }
}

export const readFile = new ReadFile();
