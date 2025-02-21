import { config } from "dotenv";

config();

export const MONGO_URI = process.env.MONGO_URI;
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
export const ADMIN_SECRET = process.env.ADMIN_SECRET;
export const WEBSITE_URL = process.env.WEBSITE_URL;
export const API_URL = process.env.API_URL;
