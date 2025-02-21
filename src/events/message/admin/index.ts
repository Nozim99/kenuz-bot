import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../model/User';
import { create_movie_actions } from './create_movie_actions';
import { return_main_menu_action } from './return_main_menu_action';
import { create_series_actions } from './create_series_actions';
import { login_actions } from './login_actions';

export const admin_message = async (msg: Message) => {
  const user: IUser | null = await User.findOne({ userId: msg.from?.id });

  if (!user) return true;

  if (await return_main_menu_action(msg, user)) return true;
  if (await create_movie_actions(msg, user)) return true;
  if (await create_series_actions(msg, user)) return true;
  if (await login_actions(msg, user)) return true;
};