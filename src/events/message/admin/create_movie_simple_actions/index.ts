import { Message } from 'node-telegram-bot-api';
import { IUser } from '../../../../model/User';
import { start_create_movie_simple_action } from './start_create_movie_simple_action';
import { get_title_action } from './get_title_action';
import { get_video_action } from './get_video_action';

export const create_movie_simple_actions = async (msg: Message, user: IUser) => {
  if (await start_create_movie_simple_action(msg, user)) return true;
  if (await get_title_action(msg, user)) return true;
  if (await get_video_action(msg, user)) return true;
};