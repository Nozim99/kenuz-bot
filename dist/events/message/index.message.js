"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("../../config/bot"));
const admin_1 = require("./admin");
const user_1 = require("./user");
bot_1.default.on('message', async (msg) => {
    if (msg.from?.is_bot)
        return;
    try {
        if (await (0, user_1.user_message_actions)(msg))
            return true;
        if (await (0, admin_1.admin_message)(msg))
            return true;
    }
    catch (error) {
        console.error(error);
    }
});
