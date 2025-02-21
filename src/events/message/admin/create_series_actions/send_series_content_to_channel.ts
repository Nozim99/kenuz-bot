import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { split_symbol, tg_channels } from '../../../../utils/constants';
import { actions, actions_text } from '../../../../utils/actions';
import Movie, { IMovie } from '../../../../model/Movie';
import bot from '../../../../config/bot';
import { WEBSITE_URL } from '../../../../config/env';
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


    for (const videoId of video_id_list) {
      const saved_movie: IMovie | null = await Movie.findById(videoId);

      if (saved_movie) {
        await bot.sendPhoto(current_channel.id, image_id, {
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
      }
    }

    await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
    await bot.sendMessage(user.userId, '✅ Tayyor bo\'ldi', main_menu);

    return true;
  }
};