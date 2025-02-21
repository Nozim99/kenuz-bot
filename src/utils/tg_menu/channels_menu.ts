import { tg_channels } from '../constants';
import { actions_text } from '../actions';

export const channels_menu = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: tg_channels.anime.name }],
      [{ text: tg_channels.film.name }],
      [{ text: tg_channels.cartoon.name }],
      [{ text: actions_text.main_menu }],
    ],
  },
};