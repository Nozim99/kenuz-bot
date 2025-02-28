import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import { Categories, MovieType, split_symbol, tg_channels } from '../../../../utils/constants';
import bot from '../../../../config/bot';
import { main_menu } from '../../../../utils/tg_menu';
import { API_URL, WEBSITE_URL } from '../../../../config/env';
import { IMovieData } from '../create_movie_simple_actions/get_title_action';
import Movie, { IMovie } from '../../../../model/Movie';

export const save_series_action = async (msg: Message, user: IUser) => {
  const [action_value, start_series_num, series_title, ...video_list] = user.action.split(split_symbol);
  const starter_num = Number(start_series_num);

  if (action_value === actions.get_series_videos && msg.text === actions_text.done && starter_num && series_title) {
    try {
      if (!video_list?.length) {
        await bot.sendMessage(user.userId, 'Birorta ham video yuklanmagan ❗️');
        return true;
      }

      const result = await fetch(API_URL + '/api/movie/by_title/' + series_title);
      const result_data: IMovieData | null = await result.json();
      console.log(result_data);
      if (!result_data || !result_data.movie) {
        await bot.sendMessage(user.userId, 'Serial topilmadi❗️');
        return true;
      }


      await bot.sendMessage(user.userId, 'Kutib turing🧘 Videolar yuklanyabdi🎬 Bu biroz vaqt oladi⏳');

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

      const genres_capitalize = result_data.movie.genre?.map(item => {
        if (!item) return item;
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
          (result_data.movie.type === MovieType.movie ? '🎥 Film' : '🎞 Serial') + '\n' +
          '🌍 Davlati: ' + result_data.movie.country + '\n' +
          '🇺🇿 Tili: ' + result_data.movie.language + '\n' +
          (result_data.movie.year ? '📆 Yili: ' + result_data.movie.year + '\n' : '') +
          (genres_capitalize?.length ? '🧬 Janri: ' + genres_capitalize.join(', ') + '\n' : '') +
          (result_data.movie.age_limit ? '👥 Yosh chegarasi: ' + age_limit + '\n' : '') +
          '\n' + current_channel.username;

        // * Send video to Bot
        const bot_video_message = await bot.sendVideo(user.userId, video_id, {
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
          const episode_result = await fetch(API_URL + '/api/episode/create', {
            method: 'POST',
            body: JSON.stringify({ video_url, series_title, episode_number: video_part_num }),
            headers: {
              'Content-Type': 'application/json',
              'Cookie': `token=${user.token}; Path=/`,
            },
          });

          if (!episode_result.ok) {
            await bot.sendMessage(user.userId, '🚫 API\'da hatolik yuz berdi❗️\n' + video_part_num + '-qism');
          }
        } catch (error) {
          await bot.sendMessage(user.userId, '🚫 API\'da hatolik yuz berdi❗️\n' + video_part_num + '-qism');
        }

        if (video_list.length > 20) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
      // * /LOOP

      await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
      await bot.sendMessage(user.userId, '✅ Videolar yuklandi', main_menu);

    } catch (err) {
      await bot.sendMessage(user.userId, 'API bilan muommo sodir bo\'ldi❗️');
    }
    return true;
  }
};