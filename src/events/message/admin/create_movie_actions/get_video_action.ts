import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { back_main_menu } from '../../../../utils/tg_menu';

export const get_video_action = async (msg: Message, user: IUser) => {
  if (user.action === actions.download_image && msg.text !== actions_text.main_menu) {
    const image_id = msg.photo?.at(-1)?.file_id;

    if (!image_id) {
      await bot.sendMessage(user.userId, 'Rasm yuklang!', back_main_menu);
      return true;
    }

    await User.findByIdAndUpdate(user._id, { action: actions.download_video + '@(=_=)@' + image_id });
    await bot.sendMessage(user.userId, '🎞 Video yuklang', back_main_menu);
    return true;
  }
};