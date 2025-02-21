"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_series_description_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const constants_1 = require("../../../../utils/constants");
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const Movie_1 = __importDefault(require("../../../../model/Movie"));
const channels_menu_1 = require("../../../../utils/tg_menu/channels_menu");
const get_series_description_action = async (msg, user) => {
    const [action_value, start_series_num, image_id, ...video_id_list] = user.action?.split(constants_1.split_symbol);
    if (actions_1.actions.get_series_description === action_value && msg.text !== actions_1.actions_text.main_menu && video_id_list?.length) {
        const description = msg.text;
        if (!description) {
            await bot_1.default.sendMessage(user.userId, '✍️ Description yozing!');
            return true;
        }
        const movie_schema_id_list = [];
        for (let index = 0; index < video_id_list.length; index++) {
            const description_with_part = description.replaceAll(constants_1.split_symbol, (+start_series_num + index) + '-qism');
            const result_message = await bot_1.default.sendVideo(user.userId, video_id_list[index], { caption: description_with_part });
            const message_id = result_message.message_id;
            const fromChatId = result_message.chat.id;
            if (!fromChatId) {
                await bot_1.default.sendMessage(user.userId, '🚫 fromChatId mavjud emas | ' + video_id_list[index] + ' | qism: ' + (+start_series_num + index), tg_menu_1.back_main_menu);
            }
            else {
                const new_movie = new Movie_1.default({
                    message_id,
                    fromChatId,
                    description: description_with_part,
                });
                const new_movie_data = await new_movie.save();
                movie_schema_id_list.push(new_movie_data._id.toString());
            }
        }
        if (!movie_schema_id_list.length) {
            await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
            await bot_1.default.sendMessage(user.userId, '🚫 Birorta ham film saqlanmadi!', tg_menu_1.main_menu);
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.choice_channel_for_series + constants_1.split_symbol + image_id + constants_1.split_symbol + movie_schema_id_list.join(constants_1.split_symbol) });
        await bot_1.default.sendMessage(user.userId, '👥 Yaratilgan kontent qaysi kanalga yuborilsin?', channels_menu_1.channels_menu);
        return true;
    }
};
exports.get_series_description_action = get_series_description_action;
