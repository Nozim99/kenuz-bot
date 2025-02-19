import { Message } from 'node-telegram-bot-api';
import { IUser } from '../../../../model/User';
import { get_video_description_action } from './get_video_description_action';
import { get_video_action } from './get_video_action';
import { confirm_video_action } from './confirm_video_action';
import { get_image_action } from './get_image_action';
import { send_content_to_channel } from './send_content_to_channel';

export const create_movie_actions = async (msg: Message, user: IUser) => {
  if (await get_image_action(msg, user)) return true;
  if (await get_video_action(msg, user)) return true;
  if (await get_video_description_action(msg, user)) return true;
  if (await confirm_video_action(msg, user)) return true;
  if (await send_content_to_channel(msg, user)) return true;
};