import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { back_main_menu } from '../../../../utils/tg_menu';
import { split_symbol } from '../../../../utils/constants';

export const get_username_login_action = async (msg: Message, user: IUser) => {
  if (actions.login === user.action && msg.text !== actions_text.main_menu) {
    const username = msg.text;

    if (!username) {
      await bot.sendMessage(user.userId, '👤 username kiriting ✍️');
      return true;
    }

    await User.findByIdAndUpdate(user._id, { action: actions.login_password + split_symbol + username });
    await bot.sendMessage(user.userId, '🔒 Parol kiriting ✍️', back_main_menu);

    return true;
  }
};