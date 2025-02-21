"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_password_login_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const constants_1 = require("../../../../utils/constants");
const env_1 = require("../../../../config/env");
const get_password_login_action = async (msg, user) => {
    const [action_value, username] = user.action?.split(constants_1.split_symbol);
    if (actions_1.actions.login_password === action_value && msg.text !== actions_1.actions_text.main_menu && username) {
        const password = msg.text;
        if (!password) {
            await bot_1.default.sendMessage(user.userId, '🔒 Parol kiriting ✍️');
            return true;
        }
        const response = await fetch(env_1.API_URL + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
            await bot_1.default.sendMessage(user.userId, '🚫 username yoki parol xato❗️', tg_menu_1.main_menu);
            return true;
        }
        const { token } = await response.json();
        if (!token) {
            await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
            await bot_1.default.sendMessage(user.userId, '🚫 username yoki parol xato❗️', tg_menu_1.main_menu);
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, {
            token,
            action: actions_1.actions.main_menu,
        });
        await bot_1.default.sendMessage(user.userId, '✅ Ro\'yhatdan muvaffaqiyatli o\'tdingiz');
        return true;
    }
};
exports.get_password_login_action = get_password_login_action;
