"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const env_1 = require("./env");
if (!env_1.TELEGRAM_BOT_TOKEN)
    throw new Error('TELEGRAM_TOKEN does not exist');
const bot = new node_telegram_bot_api_1.default(env_1.TELEGRAM_BOT_TOKEN, { polling: true });
exports.default = bot;
