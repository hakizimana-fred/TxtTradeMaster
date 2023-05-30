import { Application } from "express";
import router from "./bybit.routes";

export default (app: Application) => {
  app.use("/api/v1", router);
};
