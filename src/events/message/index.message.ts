import bot from '../../config/bot';
import { Message } from 'node-telegram-bot-api';
import { admin_message } from './admin';
import { user_message_actions } from './user';

bot.on('message', async (msg: Message) => {
  if (msg.from?.is_bot) return;

  try {
    if (await user_message_actions(msg)) return true;
    if (await admin_message(msg)) return true;
  } catch (error) {
    console.error(error);
  }
});

