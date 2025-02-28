import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { split_symbol } from '../../../../utils/constants';
import { API_URL } from '../../../../config/env';
import { IMovieData } from '../create_movie_simple_actions/get_title_action';
import { done_menu } from '../../../../utils/tg_menu';

export const check_series_title_action = async (msg: Message, user: IUser) => {
  const [action_value, series_start_num] = user.action.split(split_symbol);

  if (action_value === actions.get_series_title && msg.text !== actions_text.main_menu && series_start_num) {
    if (!msg.text) {
      await bot.sendMessage(user.userId, 'Serialni nomini kiriting');
      return true;
    }

    try {
      const result = await fetch(API_URL + '/api/movie/by_title/' + msg.text);
      const result_data: IMovieData | null = await result.json();
      if (!result_data || !result_data.movie) {
        await bot.sendMessage(user.userId, 'Serial topilmadi❗️');
        return true;
      }
    } catch (err) {
      console.error(err);
      await bot.sendMessage(user.userId, 'API bilan muommo sodir bo\'ldi❗️');
      return true;
    }

    await User.findByIdAndUpdate(user._id, { action: actions.get_series_videos + split_symbol + series_start_num + split_symbol + msg.text });
    await bot.sendMessage(user.userId, '📥 Video yuklang 🎬', done_menu);

    return true;
  }
};