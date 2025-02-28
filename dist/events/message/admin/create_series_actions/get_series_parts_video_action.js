"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_series_parts_video_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const constants_1 = require("../../../../utils/constants");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const get_series_parts_video_action = async (msg, user) => {
    const [action_value, start_series_num, series_title, ...video_list] = user.action.split(constants_1.split_symbol);
    if (action_value === actions_1.actions.get_series_videos && msg.text !== actions_1.actions_text.done && msg.text !== actions_1.actions_text.main_menu && start_series_num && series_title) {
        const series_num = Number(start_series_num);
        const total = series_num + video_list?.length || series_num;
        const video_id = msg.video?.file_id;
        if (!video_id) {
            await bot_1.default.sendMessage(user.userId, 'Video yuklang');
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: user.action + constants_1.split_symbol + video_id });
        await bot_1.default.sendMessage(user.userId, total + '-qism yuklandi ✅', tg_menu_1.done_menu);
        return true;
    }
};
exports.get_series_parts_video_action = get_series_parts_video_action;
