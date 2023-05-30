import fs from "fs";
import path from "path";
import { franc, francAll } from "franc";
import { regex, symbolPattern } from "../constants";
import { instructions } from "../utils/instructions";

class ReadFile {
  async read() {
    const data = fs.readFileSync(path.join(__dirname, "sample.txt"), "utf8");
    return this.parseData(data);
  }

  parseData(data: string): any {
    if (data && data.length > 10) {
      const executions = instructions(data);

      const [marketPair, limitPair] = [
        executions.market.match(symbolPattern)[1],
        executions.limit.match(symbolPattern)[1],
      ];

      const [marketQty, limitQty] = [
        executions.market.match(regex),
        executions.limit.match(regex),
      ];

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
