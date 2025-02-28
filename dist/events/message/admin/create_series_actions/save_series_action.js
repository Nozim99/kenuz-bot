"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save_series_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const constants_1 = require("../../../../utils/constants");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const env_1 = require("../../../../config/env");
const Movie_1 = __importDefault(require("../../../../model/Movie"));
const save_series_action = async (msg, user) => {
    const [action_value, start_series_num, series_title, ...video_list] = user.action.split(constants_1.split_symbol);
    const starter_num = Number(start_series_num);
    if (action_value === actions_1.actions.get_series_videos && msg.text === actions_1.actions_text.done && starter_num && series_title) {
        try {
            if (!video_list?.length) {
                await bot_1.default.sendMessage(user.userId, 'Birorta ham video yuklanmagan ❗️');
                return true;
            }
            const result = await fetch(env_1.API_URL + '/api/movie/by_title/' + series_title);
            const result_data = await result.json();
            console.log(result_data);
            if (!result_data || !result_data.movie) {
                await bot_1.default.sendMessage(user.userId, 'Serial topilmadi❗️');
                return true;
            }
            await bot_1.default.sendMessage(user.userId, 'Kutib turing🧘 Videolar yuklanyabdi🎬 Bu biroz vaqt oladi⏳');
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
            const genres_capitalize = result_data.movie.genre?.map(item => {
                if (!item)
                    return item;
                const new_item = item.toLowerCase().split('');
                new_item[0] = new_item[0]?.toUpperCase();
                return new_item.join('');
            });
            // * LOOP
            for (const video_id of video_list) {
                const video_index = video_list.findIndex(item => item === video_id);
                const video_part_num = starter_num + video_index;
                const movie_message = '🎬 Nomi: ' + result_data.movie.title + ' ' + video_part_num + ' -qism' + '\n' +
                    '\n' +
                    (result_data.movie.type === constants_1.MovieType.movie ? '🎥 Film' : '🎞 Serial') + '\n' +
                    '🌍 Davlati: ' + result_data.movie.country + '\n' +
                    '🇺🇿 Tili: ' + result_data.movie.language + '\n' +
                    (result_data.movie.year ? '📆 Yili: ' + result_data.movie.year + '\n' : '') +
                    (genres_capitalize?.length ? '🧬 Janri: ' + genres_capitalize.join(', ') + '\n' : '') +
                    (result_data.movie.age_limit ? '👥 Yosh chegarasi: ' + age_limit + '\n' : '') +
                    '\n' + current_channel.username;
                // * Send video to Bot
                const bot_video_message = await bot_1.default.sendVideo(user.userId, video_id, {
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
                    const episode_result = await fetch(env_1.API_URL + '/api/episode/create', {
                        method: 'POST',
                        body: JSON.stringify({ video_url, series_title, episode_number: video_part_num }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Cookie': `token=${user.token}; Path=/`,
                        },
                    });
                    if (!episode_result.ok) {
                        await bot_1.default.sendMessage(user.userId, '🚫 API\'da hatolik yuz berdi❗️\n' + video_part_num + '-qism');
                    }
                }
                catch (error) {
                    await bot_1.default.sendMessage(user.userId, '🚫 API\'da hatolik yuz berdi❗️\n' + video_part_num + '-qism');
                }
                if (video_list.length > 20) {
                    await new Promise(resolve => setTimeout(resolve, 3000));
                }
            }
            // * /LOOP
            await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
            await bot_1.default.sendMessage(user.userId, '✅ Videolar yuklandi', tg_menu_1.main_menu);
        }
        catch (err) {
            await bot_1.default.sendMessage(user.userId, 'API bilan muommo sodir bo\'ldi❗️');
        }
        return true;
    }
};
exports.save_series_action = save_series_action;
