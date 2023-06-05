import { Request, Response } from "express";
import { readFile } from "../helpers/fileReader";
import { redis } from "../utils/fileLocator";
import { bybit } from "../exchange/bybit";

export const controllerExchange = {
  async placeMarketOrder(_req: Request, res: Response) {
    try {
      const filePath: string | null = await redis.get("filePath");
      if (filePath) {
        const marketData = await readFile.read(filePath);
        const { marketPair, marketQty } = marketData;
        const myActiveOrder = await bybit.placeActiveOrder({
          side: "Sell",
          symbol: marketPair,
          order_type: "Market",
          qty: marketQty,
          time_in_force: "GoodTillCancel",
          reduce_only: false,
          close_on_trigger: false,
        });
        return res.status(200).json({
          success: true,
          data: myActiveOrder,
          message: "Placed Market order successfully!",
        });
      } else {
        throw new Error("Could not locate file");
      }
    } catch (e) {
      return res.status(200).json({
        success: false,
        error: e.message,
      });
    }
  },
  async placeLimitOrder(req: Request, res: Response) {
    try {
      const filePath: string | null = await redis.get("filePath");
      console.log(filePath, "just file path");
      if (filePath) {
        const limitData = await readFile.read(filePath);
        const { limitPair, limitQty, price } = limitData;
        const myActiveOrder = await bybit.placeActiveOrder({
          side: "Buy",
          symbol: limitPair,
          order_type: "Limit",
          qty: limitQty,
          time_in_force: "GoodTillCancel",
          reduce_only: false,
          price,
          close_on_trigger: false,
        });
        return res.status(200).json({
          success: true,
          data: myActiveOrder,
          message: "Placed Limit order successfully!",
        });
      } else {
        throw new Error("Could not locate file");
      }
    } catch (e) {
      return res.status(200).json({
        success: false,
        error: e.message,
      });
    }
  },
};
