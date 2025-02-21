"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_username_login_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const constants_1 = require("../../../../utils/constants");
const get_username_login_action = async (msg, user) => {
    if (actions_1.actions.login === user.action && msg.text !== actions_1.actions_text.main_menu) {
        const username = msg.text;
        if (!username) {
            await bot_1.default.sendMessage(user.userId, '👤 username kiriting ✍️');
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.login_password + constants_1.split_symbol + username });
        await bot_1.default.sendMessage(user.userId, '🔒 Parol kiriting ✍️', tg_menu_1.back_main_menu);
        return true;
    }
};
exports.get_username_login_action = get_username_login_action;
