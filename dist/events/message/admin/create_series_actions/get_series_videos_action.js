"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_series_videos_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const constants_1 = require("../../../../utils/constants");
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const get_series_videos_action = async (msg, user) => {
    const [action_value, start_series_num, image_id, ...video_list] = user.action?.split(constants_1.split_symbol);
    if (action_value === actions_1.actions.get_series_videos && start_series_num && image_id && msg.text !== actions_1.actions_text.write_description && msg.text !== actions_1.actions_text.main_menu) {
        const video_id = msg.video?.file_id;
        if (!video_id) {
            await bot_1.default.sendMessage(user.userId, '🎬 Video yuklang!', {
                reply_markup: {
                    resize_keyboard: true,
                    keyboard: [[{ text: actions_1.actions_text.write_description }], [{ text: actions_1.actions_text.main_menu }]],
                },
            });
            return true;
        }
        const video_number = (video_list?.length || 0) + 1;
        await User_1.default.findByIdAndUpdate(user._id, { action: user.action + constants_1.split_symbol + video_id });
        await bot_1.default.sendMessage(user.userId, `✅ ${video_number}-qism Qo'shildi!`, {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [[{ text: actions_1.actions_text.write_description }], [{ text: actions_1.actions_text.main_menu }]],
            },
        });
        return true;
    }
};
exports.get_series_videos_action = get_series_videos_action;
