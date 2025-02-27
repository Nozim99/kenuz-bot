"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_video_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const constants_1 = require("../../../../utils/constants");
const actions_1 = require("../../../../utils/actions");
const env_1 = require("../../../../config/env");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const Movie_1 = __importDefault(require("../../../../model/Movie"));
const get_video_action = async (msg, user) => {
    const [action_value, title] = user.action.split(constants_1.split_symbol);
    if (action_value === actions_1.actions.save_video_for_simple_movie && title && msg.text !== actions_1.actions_text.main_menu) {
        if (!msg.video?.file_id) {
            await bot_1.default.sendMessage(user.userId, 'Video yuklang ❗️');
            return true;
        }
        const result = await fetch(env_1.API_URL + '/api/movie/by_title/' + title);
        const result_data = await result.json();
        if (!result_data || !result_data.movie) {
            await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
            await bot_1.default.sendMessage(user.userId, '🚫 Movie topilmadi❗️', tg_menu_1.main_menu);
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.save_video_for_simple_movie + constants_1.split_symbol + msg.text });
        await bot_1.default.sendMessage(user.userId, '📥 Video yuklang');
        const age_limit = result_data.movie.age_limit < 13
            ? result_data.movie.age_limit + '+ 🟢'
            : result_data.movie.age_limit < 18
                ? result_data.movie.age_limit + '+  🔵'
                : result_data.movie.age_limit + '+  🔴';
        const current_channel = result_data.movie.category === constants_1.Categories.anime
            ? constants_1.tg_channels.anime
            : result_data.movie.category === constants_1.Categories.film
                ? constants_1.tg_channels.film
                : constants_1.tg_channels.cartoon;
        const movie_message = '🎬 Nomi: ' + result_data.movie.title + '\n' +
            '\n' +
            (result_data.movie.type === constants_1.MovieType.movie ? '🎥 Film' : '🎞 Serial') + '\n' +
            '🌍 Davlati: ' + result_data.movie.country + '\n' +
            '🇺🇿 Tili: ' + result_data.movie.language + '\n' +
            (result_data.movie.year ? '📆 Yili: ' + result_data.movie.year + '\n' : '') +
            (result_data.movie.genre?.length ? '🧬 Janri: ' + result_data.movie.genre.join(', ') + '\n' : '') +
            (result_data.movie.age_limit ? '👥 Yosh chegarasi: ' + age_limit + '\n' : '') +
            '\n' + current_channel.username;
        // * Send video to Bot
        const bot_video_message = await bot_1.default.sendVideo(user.userId, msg.video.file_id, {
            caption: movie_message,
            reply_markup: {
                inline_keyboard: [[{
                            text: '🌏 Saytimizga tashrif buyuring',
                            url: env_1.WEBSITE_URL + `/movies/${result_data.movie.category}/1`,
                        }]],
            },
        });
        // * Save video in DB
        const new_movie = await new Movie_1.default({
            message_id: bot_video_message.message_id,
            fromChatId: user.userId,
        }).save();
        // * Send message to channel
        const channel_message = await bot_1.default.sendPhoto(current_channel.id, result_data.movie.image.url, {
            caption: movie_message,
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: '📥 Yuklab olish',
                            url: 'https://t.me/kenuzbot_bot?start=' + new_movie._id,
                        }],
                    [{
                            text: '🌏 Saytimizga tashrif buyuring',
                            url: env_1.WEBSITE_URL + '/movies/' + current_channel.value + '/1',
                        }],
                ],
            },
        });
        const video_url = 'https://t.me/' + current_channel.username.replace('@', '') + '/' + channel_message.message_id;
        try {
            await fetch(env_1.API_URL + '/api/movie/edit/video', {
                method: 'PUT',
                body: JSON.stringify({ title, video_url }),
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `token=${user.token}; Path=/`,
                },
            });
        }
        catch (error) {
            await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
            await bot_1.default.sendMessage(user.userId, 'Videoni linki qo\'shilmadi❗️ Xatolik yuz berdi 🚫');
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
        await bot_1.default.sendMessage(user.userId, 'Video qo\\\'shildi ✅', tg_menu_1.main_menu);
        return true;
    }
};
exports.get_video_action = get_video_action;
