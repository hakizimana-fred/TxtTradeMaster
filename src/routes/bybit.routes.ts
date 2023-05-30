import { Router } from "express";
import { readFile } from "../helpers/fileReader";
import { bybit } from "../exchange/bybit";

const router = Router();

router.get("/market-order", async (req, res) => {
  try {
    const marketData = await readFile.read();
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
      message: "Place market order successfully!",
    });
  } catch (e) {
    return res.status(200).json({
      success: false,
      error: e.message,
    });
  }
});

export default router;
