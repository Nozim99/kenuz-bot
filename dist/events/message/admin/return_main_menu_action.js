"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.return_main_menu_action = void 0;
const User_1 = __importDefault(require("../../../model/User"));
const actions_1 = require("../../../utils/actions");
const bot_1 = __importDefault(require("../../../config/bot"));
const Movie_1 = __importDefault(require("../../../model/Movie"));
const tg_menu_1 = require("../../../utils/tg_menu");
const constants_1 = require("../../../utils/constants");
const return_main_menu_action = async (msg, user) => {
    if (msg.text === actions_1.actions_text.main_menu) {
        // Back from send_content_to_channel
        const [action_value, image_id, content_id] = user.action?.split('@(=_=)@');
        if (actions_1.actions.choice_channel === action_value && image_id && content_id) {
            const movie = await Movie_1.default.findById(content_id);
            if (movie)
                await Movie_1.default.findByIdAndDelete(movie._id);
        }
        // Back from create_series
        const [s_action_value, s_image_id, ...videos] = user.action?.split(constants_1.split_symbol);
        if (s_action_value === actions_1.actions.choice_channel_for_series && videos?.length) {
            for (const videoId of videos) {
                await Movie_1.default.findByIdAndDelete(videoId);
            }
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
        await bot_1.default.sendMessage(user.userId, msg.text, tg_menu_1.main_menu);
        return true;
    }
};
exports.return_main_menu_action = return_main_menu_action;
