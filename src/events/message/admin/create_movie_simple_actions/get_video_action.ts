import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { Categories, MovieType, split_symbol, tg_channels } from '../../../../utils/constants';
import { actions, actions_text } from '../../../../utils/actions';
import { API_URL, WEBSITE_URL } from '../../../../config/env';
import bot from '../../../../config/bot';
import { IMovieData } from './get_title_action';
import { main_menu } from '../../../../utils/tg_menu';
import Movie, { IMovie } from '../../../../model/Movie';

export const get_video_action = async (msg: Message, user: IUser) => {
  const [action_value, title] = user.action.split(split_symbol);

  if (action_value === actions.save_video_for_simple_movie && title && msg.text !== actions_text.main_menu) {
    if (!msg.video?.file_id) {
      await bot.sendMessage(user.userId, 'Video yuklang ❗️');
      return true;
    }

    const result = await fetch(API_URL + '/api/movie/by_title/' + title);
    const result_data: IMovieData | null = await result.json();

    if (!result_data || !result_data.movie) {
      await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
      await bot.sendMessage(user.userId, '🚫 Movie topilmadi❗️', main_menu);
      return true;
    }

    await User.findByIdAndUpdate(user._id, { action: actions.save_video_for_simple_movie + split_symbol + msg.text });
    await bot.sendMessage(user.userId, '📥 Video yuklang');


    const age_limit = result_data.movie.age_limit < 13
      ? result_data.movie.age_limit + '+ 🟢'
      : result_data.movie.age_limit < 18
        ? result_data.movie.age_limit + '+  🔵'
        : result_data.movie.age_limit + '+  🔴';
    const current_channel = result_data.movie.category === Categories.anime
      ? tg_channels.anime
      : result_data.movie.category === Categories.film
        ? tg_channels.film
        : tg_channels.cartoon;

    const movie_message = '🎬 Nomi: ' + result_data.movie.title + '\n' +
      '\n' +
      (result_data.movie.type === MovieType.movie ? '🎥 Film' : '🎞 Serial') + '\n' +
      '🌍 Davlati: ' + result_data.movie.country + '\n' +
      '🇺🇿 Tili: ' + result_data.movie.language + '\n' +
      (result_data.movie.year ? '📆 Yili: ' + result_data.movie.year + '\n' : '') +
      (result_data.movie.genre?.length ? '🧬 Janri: ' + result_data.movie.genre.join(', ') + '\n' : '') +
      (result_data.movie.age_limit ? '👥 Yosh chegarasi: ' + age_limit + '\n' : '') +
      '\n' + current_channel.username;


    // * Send video to Bot
    const bot_video_message = await bot.sendVideo(user.userId, msg.video.file_id, {
      caption: movie_message,
      reply_markup: {
        inline_keyboard: [[{
          text: '🌏 Saytimizga tashrif buyuring',
          url: WEBSITE_URL + `/movies/${result_data.movie.category}/1`,
        }]],
      },
    });

    // * Save video in DB
    const new_movie: IMovie = await new Movie({
      message_id: bot_video_message.message_id,
      fromChatId: user.userId,
    }).save();

    // * Send message to channel
    const channel_message = await bot.sendPhoto(
      current_channel.id,
      result_data.movie.image.url,
      {
        caption: movie_message,
        reply_markup: {
          inline_keyboard: [
            [{
              text: '📥 Yuklab olish',
              url: 'https://t.me/kenuzbot_bot?start=' + new_movie._id,
            }],
            [{
              text: '🌏 Saytimizga tashrif buyuring',
              url: WEBSITE_URL + '/movies/' + current_channel.value + '/1',
            }],
          ],
        },
      });

    const video_url = 'https://t.me/' + current_channel.username.replace('@', '') + '/' + channel_message.message_id;

    try {
      await fetch(API_URL + '/api/movie/edit/video', {
        method: 'PUT',
        body: JSON.stringify({ title, video_url }),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `token=${user.token}; Path=/`,
        },
      });
    } catch (error) {
      await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
      await bot.sendMessage(user.userId, 'Videoni linki qo\'shilmadi❗️ Xatolik yuz berdi 🚫');
      return true;
    }

    await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
    await bot.sendMessage(user.userId, 'Video qo\\\'shildi ✅', main_menu);

    return true;
  }
};