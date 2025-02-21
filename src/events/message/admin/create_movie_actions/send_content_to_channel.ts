import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import { tg_channels } from '../../../../utils/constants';
import bot from '../../../../config/bot';
import Movie, { IMovie } from '../../../../model/Movie';
import { main_menu } from '../../../../utils/tg_menu';
import { WEBSITE_URL } from '../../../../config/env';

export const send_content_to_channel = async (msg: Message, user: IUser) => {
  const [action_value, image_id, content_id] = user.action?.split('@(=_=)@');
  if (actions.choice_channel === action_value && msg.text !== actions_text.main_menu && image_id && content_id) {
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

    const movie: IMovie | null = await Movie.findById(content_id);

    if (!movie) {
      await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
      await bot.sendMessage(user.userId, '🚫 Xatolik yuz berdi, qaytadan uruning', main_menu);
      return true;
    }

    await bot.sendPhoto(current_channel.id, image_id, {
      caption: movie.description,
      reply_markup: {
        inline_keyboard: [
          [{
            text: '📥 Yuklab olish',
            url: 'https://t.me/kenuzbot_bot?start=' + content_id,
          }],
          [{
            text: '🌏 Saytimizga tashrif buyuring',
            url: WEBSITE_URL + '/movies/' + current_channel.value + '/1',
          }],
        ],
      },
    });

    await Movie.findByIdAndUpdate(movie._id, { $unset: { description: '' } });
    await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
    await bot.sendMessage(user.userId, '✅ Tayyor bo\'ldi', main_menu);
    return true;
  }
};