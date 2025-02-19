import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { back_main_menu } from '../../../../utils/tg_menu';

export const get_video_description_action = async (msg: Message, user: IUser) => {
  const [action_value, image_id] = user.action?.split('@(=_=)@');

  if (action_value === actions.download_video && msg.text !== actions_text.main_menu && image_id) {
    const video_id = msg.video?.file_id;

    if (!video_id) {
      await bot.sendMessage(user.userId, '🚫 Video yuklang!', back_main_menu);
      return true;
    }

    await User.findByIdAndUpdate(user._id, { action: actions.get_description + '@(=_=)@' + image_id + '@(=_=)@' + video_id });
    await bot.sendMessage(user.userId, '📝 Video uchun description yozing', back_main_menu);

    return true;
  }
};