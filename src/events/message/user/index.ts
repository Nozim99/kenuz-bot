import { Message } from 'node-telegram-bot-api';
import { be_admin } from './be_admin';
import { get_content } from './get_content';

export const user_message_actions = async (msg: Message) => {
  if (await be_admin(msg)) return true;
  if (await get_content(msg)) return true;
};