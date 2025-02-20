"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_video_description_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const get_video_description_action = async (msg, user) => {
    const [action_value, image_id] = user.action?.split('@(=_=)@');
    if (action_value === actions_1.actions.download_video && msg.text !== actions_1.actions_text.main_menu && image_id) {
        const video_id = msg.video?.file_id;
        if (!video_id) {
            await bot_1.default.sendMessage(user.userId, '🚫 Video yuklang!', tg_menu_1.back_main_menu);
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.get_description + '@(=_=)@' + image_id + '@(=_=)@' + video_id });
        await bot_1.default.sendMessage(user.userId, '📝 Video uchun description yozing', tg_menu_1.back_main_menu);
        return true;
    }
};
exports.get_video_description_action = get_video_description_action;
