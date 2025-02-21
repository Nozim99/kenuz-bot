"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirm_video_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const Movie_1 = __importDefault(require("../../../../model/Movie"));
const channels_menu_1 = require("../../../../utils/tg_menu/channels_menu");
const confirm_video_action = async (msg, user) => {
    const [action_value, image_id, video_id] = user.action.split('@(=_=)@');
    if (action_value === actions_1.actions.get_description && image_id && video_id) {
        const description = msg.text;
        if (!description) {
            await bot_1.default.sendMessage(user.userId, '📝 Video uchun description kiriting!', tg_menu_1.back_main_menu);
            return true;
        }
        const result_message = await bot_1.default.sendVideo(user.userId, video_id, { caption: description });
        const message_id = result_message.message_id;
        const fromChatId = result_message.chat.id;
        if (!fromChatId) {
            await bot_1.default.sendMessage(user.userId, '🚫 fromChatId mavjud emas', tg_menu_1.back_main_menu);
            return true;
        }
        const new_movie = new Movie_1.default({
            message_id,
            fromChatId,
            description,
        });
        const new_movie_data = await new_movie.save();
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.choice_channel + '@(=_=)@' + image_id + '@(=_=)@' + new_movie_data._id.toString() });
        await bot_1.default.sendMessage(user.userId, '👥 Yaratilgan kontent qaysi kanalga yuborilsin?', channels_menu_1.channels_menu);
        return true;
    }
};
exports.confirm_video_action = confirm_video_action;
