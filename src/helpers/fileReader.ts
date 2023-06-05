import fs from "fs";
import { priceRegex, regex, symbolPattern } from "../constants";
import { instructions } from "../utils/instructions";
import LanguageDetect from "languagedetect";
import ISO6391 from "iso-639-1";
import translate from "translate";

const lngDetector = new LanguageDetect();

class ReadFile {
  async read(filePath: string) {
    const data = fs.readFileSync(filePath, "utf8");
    return this.detectLanguage(data);
  }

  async detectLanguage(text: string) {
    const detected = lngDetector.detect(text)[0][0];
    const languageCode = ISO6391.getCode(detected);

    if (languageCode !== "en") {
      // translate the language to english
      const translated = await translate(text, {
        from: languageCode,
        to: "en",
      });
      return this.parseData(translated);
    }
    return this.parseData(text);
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
      const priceMatch = executions.limit.match(priceRegex);

      // place market order
      if (marketQty) {
        const parsedMarketQty = parseFloat(marketQty[1].replace(",", "."));
        tradeData.marketQty = parsedMarketQty;
        tradeData.marketPair = marketPair;
      }
      if (limitQty) {
        const parsedLimitQty = parseFloat(limitQty[1].replace(",", "."));
        const parsedPriceMatch = parseFloat(priceMatch[1].replace(",", "."));
        tradeData.limitQty = parsedLimitQty;
        tradeData.limitPair = limitPair;
        tradeData.price = parsedPriceMatch;
      }
      return tradeData;
    }
  }
}

export const readFile = new ReadFile();
