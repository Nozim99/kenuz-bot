import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { split_symbol } from '../../../../utils/constants';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';


export const get_series_videos_action = async (msg: Message, user: IUser) => {
  const [action_value, start_series_num, image_id, video_list] = user.action?.split(split_symbol);

  if (action_value === actions.get_series_videos && start_series_num && image_id && msg.text !== actions_text.write_description && msg.text !== actions_text.main_menu) {
    const video_id = msg.video?.file_id;

    if (!video_id) {
      await bot.sendMessage(user.userId, '🎬 Video yuklang!', {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: actions_text.write_description }], [{ text: actions_text.main_menu }]],
        },
      });
      return true;
    }

    const video_number = (video_list?.length || 0) + 1;
    await User.findByIdAndUpdate(user._id, { action: user.action + split_symbol + video_id });
    await bot.sendMessage(user.userId, `✅ ${video_number}-qism Qo'shildi!`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [[{ text: actions_text.write_description }], [{ text: actions_text.main_menu }]],
      },
    });

    return true;
  }
};