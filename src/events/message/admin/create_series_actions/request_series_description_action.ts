import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import { split_symbol } from '../../../../utils/constants';
import bot from '../../../../config/bot';
import { back_main_menu } from '../../../../utils/tg_menu';

export const request_series_description_action = async (msg: Message, user: IUser) => {
  const [action_value, start_series_num, image_id, ...video_id_list] = user.action?.split(split_symbol);

  if (msg.text === actions_text.write_description && action_value === actions.get_series_videos) {
    if (!video_id_list?.length) {
      await bot.sendMessage(user.userId, '🎬 Video yuklang!', {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [[{ text: actions_text.write_description }], [{ text: actions_text.main_menu }]],
        },
      });

      return true;
    }

    const new_user_action_arr = user.action.split(split_symbol);
    new_user_action_arr[0] = actions.get_series_description;
    await User.findByIdAndUpdate(user._id, { action: new_user_action_arr.join(split_symbol) });
    await bot.sendMessage(
      user.userId,
      '✍️ Description yozing video uchun 🎬\n' +
      'Qismni o\'rniga <code>@(=_=)@</code> yozing\n' +
      'Masalan 1-qism o\'rniga @(=_=)@\n',
      {
        ...back_main_menu,
        parse_mode: 'HTML',
      },
    );

    await bot.sendMessage(
      user.userId,
      'Sizning id raqamingiz: 123',
      back_main_menu,
    );

    return true;
  }
};