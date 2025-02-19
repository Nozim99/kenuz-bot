import { actions_text } from '../actions';

export const main_menu = {
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: actions_text.create_content }]],
  },
};