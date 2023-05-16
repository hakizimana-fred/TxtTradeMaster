import { Application, json } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

export function configMiddleware(app: Application) {
  app.use(json());
  app.use(helmet());
  app.use(cors());
  app.use(morgan("dev"));
}
