import { actions_text } from '../actions';

export const back_main_menu = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: actions_text.main_menu }]],
  },
};