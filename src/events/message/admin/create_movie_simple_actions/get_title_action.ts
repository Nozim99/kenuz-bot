import { Message } from 'node-telegram-bot-api';
import User, { IUser } from '../../../../model/User';
import { actions, actions_text } from '../../../../utils/actions';
import { API_URL } from '../../../../config/env';
import { Categories, MovieType, split_symbol, tg_channels } from '../../../../utils/constants';
import bot from '../../../../config/bot';


export interface IMovieData {
  message: string;
  movie?: {
    image: {
      url: string;
      cloudId: string;
    },
    views: number;
    _id: string;
    title: string;
    description: string;
    keywords: string[],
    category: Categories,
    type: MovieType,
    video_url?: string;
    country: string;
    language: string;
    year: number;
    genre: string[];
    age_limit: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}

export const get_title_action = async (msg: Message, user: IUser) => {
  if (user.action === actions.create_movie_simple && msg.text !== actions_text.main_menu) {
    if (!msg.text) return true;

    const result = await fetch(API_URL + '/api/movie/by_title/' + msg.text);
    const result_data: IMovieData | null = await result.json();
    if (!result_data || !result_data.movie) {
      await bot.sendMessage(user.userId, '🚫 Movie topilmadi❗️');
      return true;
    }
    if (result_data.movie.video_url) await bot.sendMessage(user.userId, 'Bu movie\'da video mavjud❗️');

    await User.findByIdAndUpdate(user._id, { action: actions.save_video_for_simple_movie + split_symbol + msg.text });
    await bot.sendMessage(user.userId, '📥 Video yuklang');

    return true;
  }
};