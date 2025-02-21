import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { back_main_menu } from '../../../../utils/tg_menu';

export const create_series_action = async (msg: Message, user: IUser) => {
  if (msg.text === actions_text.create_series && user.action === actions.main_menu) {
    await User.findByIdAndUpdate(user._id, { action: actions.get_series_number });
    await bot.sendMessage(user.userId, '🔢 Serialni nechanchi qismidan boshlansin. Faqat son kiriting', back_main_menu);

    return true;
  }
};