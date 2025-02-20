"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send_content_to_channel = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const constants_1 = require("../../../../utils/constants");
const bot_1 = __importDefault(require("../../../../config/bot"));
const Movie_1 = __importDefault(require("../../../../model/Movie"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const env_1 = require("../../../../config/env");
const send_content_to_channel = async (msg, user) => {
    const [action_value, image_id, content_id] = user.action?.split('@(=_=)@');
    if (actions_1.actions.choice_channel === action_value && msg.text !== actions_1.actions_text.main_menu && image_id && content_id) {
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
        const movie = await Movie_1.default.findById(content_id);
        if (!movie) {
            await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
            await bot_1.default.sendMessage(user.userId, '🚫 Xatolik yuz berdi, qaytadan uruning', tg_menu_1.main_menu);
            return true;
        }
        await bot_1.default.sendPhoto(current_channel.id, image_id, {
            caption: movie.description,
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: '📥 Yuklab olish',
                            url: 'https://t.me/kenuzbot_bot?start=' + content_id,
                        }],
                    [{
                            text: '🌏 Saytimizga tashrif buyuring',
                            url: env_1.WEBSITE_URL + '/movies/' + current_channel.value + '/1',
                        }],
                ],
            },
        });
        await Movie_1.default.findByIdAndUpdate(movie._id, { $unset: { description: '' } });
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
        await bot_1.default.sendMessage(user.userId, '✅ Tayyor bo\'ldi', tg_menu_1.main_menu);
        return true;
    }
};
exports.send_content_to_channel = send_content_to_channel;
