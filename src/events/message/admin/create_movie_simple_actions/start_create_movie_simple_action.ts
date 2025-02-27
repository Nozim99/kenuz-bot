import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { back_main_menu } from '../../../../utils/tg_menu';

export const start_create_movie_simple_action = async (msg: Message, user: IUser) => {
  if (user.action === actions.main_menu && msg.text === actions_text.create_movie_simple) {
    await User.findByIdAndUpdate(user._id, { action: actions.create_movie_simple });
    await bot.sendMessage(user.userId, '🎬 Movie nomini kiriting', back_main_menu);
    return true;
  }
};