import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { back_main_menu } from '../../../../utils/tg_menu';

export const get_image_action = async (msg: Message, user: IUser) => {
  if (msg.text === actions_text.create_content && user.action === actions.main_menu) {
    await User.findByIdAndUpdate(user._id, { action: actions.download_image });
    await bot.sendMessage(user.userId, '🖼 Rasm yuklang', back_main_menu);
    return true;
  }
};