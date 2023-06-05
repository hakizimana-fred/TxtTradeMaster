import { Router } from "express";
import { controllerExchange } from "../controllers/bybit.controller";

const router = Router();

router.get("/market-order", controllerExchange.placeMarketOrder);
router.get("/limit-order", controllerExchange.placeLimitOrder);

export default router;
