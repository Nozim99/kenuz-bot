import { actions_text } from '../actions';

export const done_menu = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [{ text: actions_text.done }],
      [{ text: actions_text.main_menu }],
    ],
  },
};