import { Message } from 'node-telegram-bot-api';
import { ADMIN_SECRET } from '../../../config/env';
import User, { IUser, userStatus } from '../../../model/User';
import { actions, actions_text } from '../../../utils/actions';
import bot from '../../../config/bot';

export const be_admin = async (msg: Message) => {
  const userId = msg.from?.id;
  if (msg.text === ADMIN_SECRET && userId) {
    const user: IUser | null = await User.findOne({ userId });

    if (user) {
      await User.findByIdAndUpdate({ status: userStatus.ADMIN, action: actions.main_menu });
    } else {
      const newUser = new User({
        userId,
        action: actions.main_menu,
        status: userStatus.ADMIN,
      });

      await newUser.save();
    }
    await bot.sendMessage(userId, 'Admin bo\'ldingiz', {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{ text: actions_text.create_content }],
        ],
      },
    });

    return true;
  }
};