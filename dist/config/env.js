"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBSITE_URL = exports.ADMIN_SECRET = exports.TELEGRAM_BOT_TOKEN = exports.MONGO_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MONGO_URI = process.env.MONGO_URI;
exports.TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
exports.ADMIN_SECRET = process.env.ADMIN_SECRET;
exports.WEBSITE_URL = process.env.WEBSITE_URL;
