import { Message } from 'node-telegram-bot-api';
import { IUser } from '../../../../model/User';
import { create_series_action } from './create_series_action';
import { check_series_title_action } from './check_series_title_action';
import { get_series_title_action } from './get_series_title_action';
import { get_series_parts_video_action } from './get_series_parts_video_action';
import { save_series_action } from './save_series_action';

export const create_series_actions = async (msg: Message, user: IUser) => {
  if (await create_series_action(msg, user)) return true;
  if (await get_series_title_action(msg, user)) return true;
  if (await check_series_title_action(msg, user)) return true;
  if (await get_series_parts_video_action(msg, user)) return true;
  if (await save_series_action(msg, user)) return true;
};