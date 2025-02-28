import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import { split_symbol } from '../../../../utils/constants';
import bot from '../../../../config/bot';
import { done_menu } from '../../../../utils/tg_menu';

export const get_series_parts_video_action = async (msg: Message, user: IUser) => {
  const [action_value, start_series_num, series_title, ...video_list] = user.action.split(split_symbol);

  if (action_value === actions.get_series_videos && msg.text !== actions_text.done && msg.text !== actions_text.main_menu && start_series_num && series_title) {
    const series_num = Number(start_series_num);
    const total = series_num + video_list?.length || series_num;

    const video_id = msg.video?.file_id;

    if (!video_id) {
      await bot.sendMessage(user.userId, 'Video yuklang');
      return true;
    }

    await User.findByIdAndUpdate(user._id, { action: user.action + split_symbol + video_id });
    await bot.sendMessage(user.userId, total + '-qism yuklandi ✅', done_menu);

    return true;
  }
};