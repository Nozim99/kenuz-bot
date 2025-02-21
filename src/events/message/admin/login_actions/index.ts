import { Message } from 'node-telegram-bot-api';
import { IUser } from '../../../../model/User';
import { login_action } from './login_action';
import { get_username_login_action } from './get_username_login_action';
import { get_password_login_action } from './get_password_login_action';

export const login_actions = async (msg: Message, user: IUser) => {
  if (await login_action(msg, user)) return true;
  if (await get_username_login_action(msg, user)) return true;
  if (await get_password_login_action(msg, user)) return true;
};