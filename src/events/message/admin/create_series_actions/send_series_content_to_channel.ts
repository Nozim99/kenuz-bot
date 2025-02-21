import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { split_symbol, tg_channels } from '../../../../utils/constants';
import { actions, actions_text } from '../../../../utils/actions';
import Movie, { IMovie } from '../../../../model/Movie';
import bot from '../../../../config/bot';
import { API_URL, WEBSITE_URL } from '../../../../config/env';
import { main_menu } from '../../../../utils/tg_menu';

export const send_series_content_to_channel = async (msg: Message, user: IUser) => {
  const [action_value, image_id, ...video_id_list] = user.action?.split(split_symbol);

  if (action_value === actions.choice_channel_for_series && msg.text !== actions_text.main_menu && video_id_list?.length) {
    const tg_channel_name_list = Object.keys(tg_channels).map(channel => tg_channels[channel].name);

    if (!tg_channel_name_list.includes(msg.text || '')) {
      await bot.sendMessage(user.userId, '❗️ Menyudan kerakli kanalni tanlang');
      return true;
    }

    const current_channel = Object.values(tg_channels).find(channel => channel.name === msg.text);
    if (!current_channel) {
      await bot.sendMessage(user.userId, '❗️ Menyudan kerakli kanalni tanlang');
      return true;
    }

    await bot.sendMessage(user.userId, '📥 Yuklanish boshlandi. ⏳ Biroz kuting');
    for (const videoId of video_id_list) {
      const saved_movie: IMovie | null = await Movie.findById(videoId);

      if (saved_movie) {
        const response = await bot.sendPhoto(current_channel.id, image_id, {
          caption: saved_movie.description,
          reply_markup: {
            inline_keyboard: [
              [{
                text: '📥 Yuklab olish',
                url: 'https://t.me/kenuzbot_bot?start=' + videoId,
              }],
              [{
                text: '🌏 Saytimizga tashrif buyuring',
                url: WEBSITE_URL + '/movies/' + current_channel.value + '/1',
              }],
            ],
          },
        });


        await Movie.findByIdAndUpdate(saved_movie._id, { $unset: { description: '' } });

        if (user.token && response.sender_chat) {
          try {
            const video_url = 'https://t.me/' + response.sender_chat.username + '/' + response.message_id;
            const series_title = saved_movie.description?.split('🎬 Nomi: ')?.[1]?.split(' | ')?.[0];
            const episode_number = saved_movie.description?.split('-qism\n')?.[0]?.split(' | ')?.at(-1);

            if (series_title && episode_number) {
              await fetch(API_URL + '/api/episode/create', {
                method: 'POST',
                body: JSON.stringify({ video_url, series_title, episode_number }),
                headers: {
                  'Content-Type': 'application/json',
                  'Cookie': `token=${user.token}; Path=/`,
                },
              });
            }
          } catch (error) {
            await bot.sendMessage(user.userId, '🚫 WEB_API\'da hatolik yuz berdi❗️');
          }
        }
      }
    }

    await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
    await bot.sendMessage(user.userId, '✅ Tayyor bo\'ldi', main_menu);

    return true;
  }
};
