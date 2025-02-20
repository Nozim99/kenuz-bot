"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_video_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const get_video_action = async (msg, user) => {
    if (user.action === actions_1.actions.download_image && msg.text !== actions_1.actions_text.main_menu) {
        const image_id = msg.photo?.at(-1)?.file_id;
        if (!image_id) {
            await bot_1.default.sendMessage(user.userId, 'Rasm yuklang!', tg_menu_1.back_main_menu);
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.download_video + '@(=_=)@' + image_id });
        await bot_1.default.sendMessage(user.userId, '🎞 Video yuklang', tg_menu_1.back_main_menu);
        return true;
    }
};
exports.get_video_action = get_video_action;
