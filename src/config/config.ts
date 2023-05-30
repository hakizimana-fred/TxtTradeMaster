import "dotenv/config";

export const CONFIGS = {
  port: process.env.PORT,
  bybitKey: process.env.BY_BIT_API_KEY || "",
  bybitSecret: process.env.BIT_API_SECRET || "",
  bybitTestUrl: process.env.TEST_NET_URL || "",
};
