import { Message } from 'node-telegram-bot-api';
import { IUser } from '../../../../model/User';
import { create_series_action } from './create_series_action';
import { get_series_number_action } from './get_series_number_action';
import { get_series_image_action } from './get_series_image_action';
import { get_series_videos_action } from './get_series_videos_action';
import { request_series_description_action } from './request_series_description_action';
import { get_series_description_action } from './get_series_description_action';
import { send_series_content_to_channel } from './send_series_content_to_channel';

export const create_series_actions = async (msg: Message, user: IUser) => {
  if (await create_series_action(msg, user)) return true;
  if (await get_series_number_action(msg, user)) return true;
  if (await get_series_image_action(msg, user)) return true;
  if (await get_series_videos_action(msg, user)) return true;
  if (await request_series_description_action(msg, user)) return true;
  if (await get_series_description_action(msg, user)) return true;
  if (await send_series_content_to_channel(msg, user)) return true;
};