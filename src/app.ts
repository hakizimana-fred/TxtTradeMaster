import express from "express";
import http from "http";
import https from "https";
import fs from "fs";
import { readFile } from "./helpers/fileReader";
import "dotenv/config";
import { configMiddleware } from "./middlewares/";
import configRoutes from "./routes";
import { readFilePath } from "./utils/fileLocator";

// enable https
const isHttps = false;

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

const run = () => {
  const app = express();
  configMiddleware(app);
  configRoutes(app);

  if (isHttps)
    return https
      .createServer(options, app)
      .listen(process.env.PORT, () => console.log("server running on https"));
  return http.createServer(app).listen(process.env.PORT, () => {
    console.log("server running on http");
    // locate file path
    readFilePath();
  });
};

void run();
