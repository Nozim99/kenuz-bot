"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send_series_content_to_channel = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const constants_1 = require("../../../../utils/constants");
const actions_1 = require("../../../../utils/actions");
const Movie_1 = __importDefault(require("../../../../model/Movie"));
const bot_1 = __importDefault(require("../../../../config/bot"));
const env_1 = require("../../../../config/env");
const tg_menu_1 = require("../../../../utils/tg_menu");
const send_series_content_to_channel = async (msg, user) => {
    const [action_value, image_id, ...video_id_list] = user.action?.split(constants_1.split_symbol);
    if (action_value === actions_1.actions.choice_channel_for_series && msg.text !== actions_1.actions_text.main_menu && video_id_list?.length) {
        const tg_channel_name_list = Object.keys(constants_1.tg_channels).map(channel => constants_1.tg_channels[channel].name);
        if (!tg_channel_name_list.includes(msg.text || '')) {
            await bot_1.default.sendMessage(user.userId, '❗️ Menyudan kerakli kanalni tanlang');
            return true;
        }
        const current_channel = Object.values(constants_1.tg_channels).find(channel => channel.name === msg.text);
        if (!current_channel) {
            await bot_1.default.sendMessage(user.userId, '❗️ Menyudan kerakli kanalni tanlang');
            return true;
        }
        for (const videoId of video_id_list) {
            const saved_movie = await Movie_1.default.findById(videoId);
            if (saved_movie) {
                await bot_1.default.sendPhoto(current_channel.id, image_id, {
                    caption: saved_movie.description,
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                    text: '📥 Yuklab olish',
                                    url: 'https://t.me/kenuzbot_bot?start=' + videoId,
                                }],
                            [{
                                    text: '🌏 Saytimizga tashrif buyuring',
                                    url: env_1.WEBSITE_URL + '/movies/' + current_channel.value + '/1',
                                }],
                        ],
                    },
                });
                await Movie_1.default.findByIdAndUpdate(saved_movie._id, { $unset: { description: '' } });
            }
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
        await bot_1.default.sendMessage(user.userId, '✅ Tayyor bo\'ldi', tg_menu_1.main_menu);
        return true;
    }
};
exports.send_series_content_to_channel = send_series_content_to_channel;
