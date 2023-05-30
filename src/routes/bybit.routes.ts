import { Router } from "express";
import { readFile } from "../helpers/fileReader";

const router = Router();

router.get("/market-order", async (req, res) => {
  try {
    const marketData = await readFile.read();
    const { marketPair, marketQty } = marketData;
  } catch (e) {}
});

export default router;
