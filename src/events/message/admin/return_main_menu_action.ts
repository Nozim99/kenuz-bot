import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../model/User';
import { actions, actions_text } from '../../../utils/actions';
import bot from '../../../config/bot';
import Movie, { IMovie } from '../../../model/Movie';

export const return_main_menu_action = async (msg: Message, user: IUser) => {
  if (msg.text === actions_text.main_menu) {
    // Back from send_content_to_channel
    const [action_value, image_id, content_id] = user.action?.split('@(=_=)@');
    if (actions.choice_channel === action_value && image_id && content_id) {
      const movie: IMovie | null = await Movie.findById(content_id);
      if (movie) await Movie.findByIdAndDelete(movie._id);
    }


    await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
    await bot.sendMessage(user.userId, msg.text, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [[{ text: actions_text.create_content }]],
      },
    });
    return true;
  }
};