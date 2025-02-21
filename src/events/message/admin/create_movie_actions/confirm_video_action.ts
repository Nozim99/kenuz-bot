import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { back_main_menu } from '../../../../utils/tg_menu';
import Movie, { IMovie } from '../../../../model/Movie';
import { channels_menu } from '../../../../utils/tg_menu/channels_menu';

export const confirm_video_action = async (msg: Message, user: IUser) => {
  const [action_value, image_id, video_id] = user.action.split('@(=_=)@');

  if (action_value === actions.get_description && image_id && video_id) {
    const description = msg.text;

    if (!description) {
      await bot.sendMessage(user.userId, '📝 Video uchun description kiriting!', back_main_menu);
      return true;
    }

    const result_message = await bot.sendVideo(user.userId, video_id, { caption: description });

    const message_id = result_message.message_id;
    const fromChatId = result_message.chat.id;

    if (!fromChatId) {
      await bot.sendMessage(user.userId, '🚫 fromChatId mavjud emas', back_main_menu);
      return true;
    }


    const new_movie = new Movie({
      message_id,
      fromChatId,
      description,
    });

    const new_movie_data: IMovie = await new_movie.save();

    await User.findByIdAndUpdate(user._id, { action: actions.choice_channel + '@(=_=)@' + image_id + '@(=_=)@' + new_movie_data._id.toString() });

    await bot.sendMessage(user.userId, '👥 Yaratilgan kontent qaysi kanalga yuborilsin?', channels_menu);

    return true;
  }
};