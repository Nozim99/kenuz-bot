"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_series_image_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const constants_1 = require("../../../../utils/constants");
const get_series_image_action = async (msg, user) => {
    const [action_value, start_series_num] = user.action?.split('@(=_=)@');
    if (action_value === actions_1.actions.get_series_image && msg.text !== actions_1.actions_text.main_menu && start_series_num) {
        const image_id = msg.photo?.at(-1)?.file_id;
        if (!image_id) {
            await bot_1.default.sendMessage(user.userId, '🖼 Rasm yuklang!');
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.get_series_videos + constants_1.split_symbol + start_series_num + constants_1.split_symbol + image_id });
        await bot_1.default.sendMessage(user.userId, '🎬 Videolarni yuklang!', {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [
                    [{ text: actions_1.actions_text.write_description }],
                    [{ text: actions_1.actions_text.main_menu }],
                ],
            },
        });
        return true;
    }
};
exports.get_series_image_action = get_series_image_action;
