"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_image_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const get_image_action = async (msg, user) => {
    if (msg.text === actions_1.actions_text.create_content && user.action === actions_1.actions.main_menu) {
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.download_image });
        await bot_1.default.sendMessage(user.userId, '🖼 Rasm yuklang', tg_menu_1.back_main_menu);
        return true;
    }
};
exports.get_image_action = get_image_action;
