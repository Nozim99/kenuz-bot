"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const login_action = async (msg, user) => {
    if (msg.text === actions_1.actions_text.login && user.action === actions_1.actions.main_menu) {
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.login });
        await bot_1.default.sendMessage(user.userId, '👤 username kiriting ✍️', tg_menu_1.back_main_menu);
        return true;
    }
};
exports.login_action = login_action;
