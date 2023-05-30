import fs from "fs";
import path from "path";
import { franc, francAll } from "franc";
import { regex, symbolPattern } from "../constants";

class ReadFile {
  async read() {
    const data = fs.readFileSync(path.join(__dirname, "sample.txt"), "utf8");
    return this.parseData(data);
  }

  parseData(data: any): any {
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

      const [marketPair, limitPair] = [
        executions.market.match(symbolPattern)[1],
        executions.limit.match(symbolPattern)[1],
      ];

      const marketQty = executions.market.match(regex);
      const limitQty = executions.limit.match(regex);

      const tradeData: Record<string, any> = {};

      // place market order
      if (marketQty) {
        const parsedMarketQty = parseFloat(marketQty[1].replace(",", "."));
        tradeData.marketQty = parsedMarketQty;
        tradeData.marketPair = marketPair;
      }
      if (limitQty) {
        const parsedLimitQty = parseFloat(limitQty[1].replace(",", "."));
        tradeData.limitQty = parsedLimitQty;
        tradeData.limitPair = limitPair;
      }
      return tradeData;
    }
  }
}

export const readFile = new ReadFile();
