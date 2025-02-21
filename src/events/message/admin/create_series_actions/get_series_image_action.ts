import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { split_symbol } from '../../../../utils/constants';

export const get_series_image_action = async (msg: Message, user: IUser) => {
  const [action_value, start_series_num] = user.action?.split('@(=_=)@');

  if (action_value === actions.get_series_image && msg.text !== actions_text.main_menu && start_series_num) {
    const image_id = msg.photo?.at(-1)?.file_id;

    if (!image_id) {
      await bot.sendMessage(user.userId, '🖼 Rasm yuklang!');
      return true;
    }

    await User.findByIdAndUpdate(user._id, { action: actions.get_series_videos + split_symbol + start_series_num + split_symbol + image_id });
    await bot.sendMessage(user.userId, '🎬 Videolarni yuklang!', {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: actions_text.write_description }],
          [{ text: actions_text.main_menu }],
        ],
      },
    });

    return true;
  }
};