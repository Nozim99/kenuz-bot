import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';

export const get_series_number_action = async (msg: Message, user: IUser) => {
  if (user.action === actions.get_series_number && msg.text !== actions_text.main_menu) {
    const series_num = Number(msg.text);

    if (!series_num) {
      await bot.sendMessage(user.userId, '❗️ Son kiriting, Serial nechanchi qismidan boshlanishini kiriting 🔢');
      return true;
    }

    await User.findByIdAndUpdate(user._id, { action: actions.get_series_image + '@(=_=)@' + series_num });
    await bot.sendMessage(user.userId, "🖼 Rasm kiriting")

    return true;
  }
};