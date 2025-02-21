import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../model/User';
import { actions, actions_text } from '../../../utils/actions';
import bot from '../../../config/bot';
import Movie, { IMovie } from '../../../model/Movie';
import { main_menu } from '../../../utils/tg_menu';
import { split_symbol } from '../../../utils/constants';

export const return_main_menu_action = async (msg: Message, user: IUser) => {
  if (msg.text === actions_text.main_menu) {
    // Back from send_content_to_channel
    const [action_value, image_id, content_id] = user.action?.split('@(=_=)@');
    if (actions.choice_channel === action_value && image_id && content_id) {
      const movie: IMovie | null = await Movie.findById(content_id);
      if (movie) await Movie.findByIdAndDelete(movie._id);
    }

    // Back from create_series
    const [s_action_value, s_image_id, ...videos] = user.action?.split(split_symbol);
    if (s_action_value === actions.choice_channel_for_series && videos?.length) {
      for (const videoId of videos) {
        await Movie.findByIdAndDelete(videoId);
      }
    }


    await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
    await bot.sendMessage(user.userId, msg.text, main_menu);
    return true;
  }
};