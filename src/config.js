import dotenv from "dotenv";

dotenv.config({
  override: true,
  path: "./src/.env",
});

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SESSIONSECRET: process.env.SESSIONSECRET,
  CLIENT_ID_GITHUB: process.env.CLIENT_ID_GITHUB,
  CLIENT_SECRET_GITHUB: process.env.CLIENT_SECRET_GITHUB,
};