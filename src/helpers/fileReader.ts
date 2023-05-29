import fs from "fs";
import path from "path";
import { franc, francAll } from "franc";

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

      const symbolPattern = /([A-Z]+)/g;

      const [marketPair, limitPair] = [
        executions.market.match(symbolPattern)[1],
        executions.limit.match(symbolPattern)[1],
      ];

      const regex = /([\d,]+(?:\.\d+)?)/;
      const marketQty = executions.market.match(regex);
      const limitQty = executions.limit.match(regex);

      // place market order
      if (marketQty) {
        const quantity = parseFloat(marketQty[1].replace(",", "."));
      }
    }
  }
}

export const readFile = new ReadFile();
