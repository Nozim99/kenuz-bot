"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_series_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const create_series_action = async (msg, user) => {
    if (msg.text === actions_1.actions_text.create_series && user.action === actions_1.actions.main_menu) {
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.get_series_number });
        await bot_1.default.sendMessage(user.userId, '🔢 Serialni nechanchi qismidan boshlansin. Faqat son kiriting', tg_menu_1.back_main_menu);
        return true;
    }
};
exports.create_series_action = create_series_action;
