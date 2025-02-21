import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { main_menu } from '../../../../utils/tg_menu';
import { split_symbol } from '../../../../utils/constants';
import { API_URL } from '../../../../config/env';

export const get_password_login_action = async (msg: Message, user: IUser) => {
  const [action_value, username] = user.action?.split(split_symbol);

  if (actions.login_password === action_value && msg.text !== actions_text.main_menu && username) {
    const password = msg.text;

    if (!password) {
      await bot.sendMessage(user.userId, '🔒 Parol kiriting ✍️');
      return true;
    }

    const response = await fetch(API_URL + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
      await bot.sendMessage(user.userId, '🚫 username yoki parol xato❗️', main_menu);
      return true;
    }

    const { token }: { token?: string } = await response.json();

    if (!token) {
      await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
      await bot.sendMessage(user.userId, '🚫 username yoki parol xato❗️', main_menu);
      return true;
    }

    await User.findByIdAndUpdate(user._id, {
      token,
      action: actions.main_menu,
    });

    await bot.sendMessage(user.userId, '✅ Ro\'yhatdan muvaffaqiyatli o\'tdingiz');

    return true;
  }
};