"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_series_title_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const get_series_title_action = async (msg, user) => {
    if (user.action === actions_1.actions.get_series_number && msg.text !== actions_1.actions_text.main_menu) {
        const series_num = Number(msg.text);
        if (!series_num) {
            await bot_1.default.sendMessage(user.userId, '❗️ Son kiriting, Serial nechanchi qismidan boshlanishini kiriting 🔢');
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.get_series_title + '@(=_=)@' + series_num });
        await bot_1.default.sendMessage(user.userId, '✍️ Serialni nomini kiriting');
        return true;
    }
};
exports.get_series_title_action = get_series_title_action;
