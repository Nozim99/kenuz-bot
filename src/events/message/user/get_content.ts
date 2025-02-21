import { Message } from 'node-telegram-bot-api';
import bot from '../../../config/bot';
import Movie, { IMovie } from '../../../model/Movie';
import { empty_menu } from '../../../utils/tg_menu/empty_menu';
import { WEBSITE_URL } from '../../../config/env';
import { check_member_middleware } from '../../../middleware/check_member_middleware';


export const get_content = async (msg: Message) => {
  const userId = msg.from?.id;

  if (!userId) return true;
  if (!msg.text) return;

  const [bot_command, content_id] = msg.text.split(' ');

  if (bot_command === '/start' && content_id) {

    if (await check_member_middleware(msg)) return true;


    const movie: IMovie | null = await Movie.findById(content_id);

    if (!movie) {
      await bot.sendMessage(userId, '🚫 Topilmadi!', empty_menu);
      return true;
    }

    try {
      await bot.copyMessage(userId, movie.fromChatId, movie.message_id, {
        reply_markup: {
          inline_keyboard: [
            [{
              text: '🌏 Saytimizga tashrif buyuring',
              url: WEBSITE_URL,
            }],
          ],
        },
        protect_content: true,
      });
    } catch (error) {
      await bot.sendMessage(userId, '❗️ Topilmadi');
    }
    return true;
  }
};