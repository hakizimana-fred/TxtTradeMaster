import express from "express";
import http from "http";
import https from "https";
import fs from "fs";
import "dotenv/config";

// enable https
let isHttps = true;

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

const run = () => {
  const app = express();

  if (isHttps)
    return https
      .createServer(options, app)
      .listen(process.env.PORT, () => console.log("server running on https"));
  return http
    .createServer(app)
    .listen(process.env.PORT, () => console.log("server running on http"));
};

void run();
