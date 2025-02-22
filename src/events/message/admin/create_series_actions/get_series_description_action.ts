import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { split_symbol } from '../../../../utils/constants';
import { actions, actions_text } from '../../../../utils/actions';
import bot from '../../../../config/bot';
import { back_main_menu, main_menu } from '../../../../utils/tg_menu';
import Movie, { IMovie } from '../../../../model/Movie';
import { channels_menu } from '../../../../utils/tg_menu/channels_menu';

export const get_series_description_action = async (msg: Message, user: IUser) => {
  const [action_value, start_series_num, image_id, ...video_id_list] = user.action?.split(split_symbol);

  if (actions.get_series_description === action_value && msg.text !== actions_text.main_menu && video_id_list?.length) {
    const description = msg.text;

    if (!description) {
      await bot.sendMessage(user.userId, '✍️ Description yozing!');
      return true;
    }


    const movie_schema_id_list: string[] = [];

    for (let index = 0; index < video_id_list.length; index++) {
      const description_with_part = description.replaceAll(split_symbol, (+start_series_num + index) + '-qism');


      const result_message = await bot.sendVideo(user.userId, video_id_list[index], { caption: description_with_part });

      const message_id = result_message.message_id;
      const fromChatId = result_message.chat.id;

      if (!fromChatId) {
        await bot.sendMessage(user.userId, '🚫 fromChatId mavjud emas | ' + video_id_list[index] + ' | qism: ' + (+start_series_num + index), back_main_menu);
      } else {
        const new_movie = new Movie({
          message_id,
          fromChatId,
          description: description_with_part,
        });

        const new_movie_data: IMovie = await new_movie.save();
        movie_schema_id_list.push(new_movie_data._id.toString());
      }

      if (video_id_list.length > 30) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    if (!movie_schema_id_list.length) {
      await User.findByIdAndUpdate(user._id, { action: actions.main_menu });
      await bot.sendMessage(user.userId, '🚫 Birorta ham film saqlanmadi!', main_menu);
      return true;
    }

    await User.findByIdAndUpdate(user._id, { action: actions.choice_channel_for_series + split_symbol + image_id + split_symbol + movie_schema_id_list.join(split_symbol) });
    await bot.sendMessage(user.userId, '👥 Yaratilgan kontent qaysi kanalga yuborilsin?', channels_menu);

    return true;
  }
};