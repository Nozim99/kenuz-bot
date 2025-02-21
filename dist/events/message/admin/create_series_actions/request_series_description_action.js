"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request_series_description_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const constants_1 = require("../../../../utils/constants");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const request_series_description_action = async (msg, user) => {
    const [action_value, start_series_num, image_id, ...video_id_list] = user.action?.split(constants_1.split_symbol);
    if (msg.text === actions_1.actions_text.write_description && action_value === actions_1.actions.get_series_videos) {
        if (!video_id_list?.length) {
            await bot_1.default.sendMessage(user.userId, '🎬 Video yuklang!', {
                reply_markup: {
                    resize_keyboard: true,
                    keyboard: [[{ text: actions_1.actions_text.write_description }], [{ text: actions_1.actions_text.main_menu }]],
                },
            });
            return true;
        }
        const new_user_action_arr = user.action.split(constants_1.split_symbol);
        new_user_action_arr[0] = actions_1.actions.get_series_description;
        await User_1.default.findByIdAndUpdate(user._id, { action: new_user_action_arr.join(constants_1.split_symbol) });
        await bot_1.default.sendMessage(user.userId, '✍️ Description yozing video uchun 🎬\n' +
            'Qismni o\'rniga <code>@(=_=)@</code> yozing\n' +
            'Masalan 1-qism o\'rniga @(=_=)@\n', {
            ...tg_menu_1.back_main_menu,
            parse_mode: 'HTML',
        });
        await bot_1.default.sendMessage(user.userId, 'Sizning id raqamingiz: 123', tg_menu_1.back_main_menu);
        return true;
    }
};
exports.request_series_description_action = request_series_description_action;
