import { Message } from 'node-telegram-bot-api';
import bot from '../config/bot';
import { WEBSITE_URL } from '../config/env';
import { get_number_emoji } from '../utils/get_number_emoji';


const tg_channels_must_member = [
  {
    name: 'ANIHUB',
    chatId: -1002478699595,
    link: 'https://t.me/Anihub_Rasmiy',
  },
  {
    name: 'Tarjima Animelar',
    chatId: -1002382338695,
    link: 'https://t.me/tarjima_animelar_123',
  },
  {
    name: 'Tarjima Filmlar',
    chatId: -1002462536703,
    link: 'https://t.me/tarjima_filmlar_12',
  },
  {
    name: 'Tarjima Multfilmlar',
    chatId: -1002364151215,
    link: 'https://t.me/tarjima_multfilmlar_12',
  },
] as const;


export const check_member_middleware = async (msg: Message) => {
  const userId = msg.from?.id;
  if (!userId) return;

  const unsubscribeChannels: { name: string, chatId: number, link: string }[] = [];

  for (const channel of tg_channels_must_member) {
    const chatMember = await bot.getChatMember(channel.chatId, userId);
    const isChatMember = ['creator', 'administrator', 'member'].includes(chatMember.status);
    if (!isChatMember) {
      unsubscribeChannels.push(channel);
    }
  }

  if (unsubscribeChannels.length) {
    const unChannels = unsubscribeChannels.map((channel, channel_index) => {
      const result = {
        text: get_number_emoji(channel_index + 1) + ' ' + channel.name,
        url: channel.link,
      };
      return [result];
    });

    const content_id = msg.text?.split(' ')[1];
    await bot.sendMessage(
      userId,
      '💐 Biz sizni kanalimizda intizorlik bilan kutamiz\n' +
      '🏃🏃‍♀️ Botdan foydalanish uchun quyidagi kanallarga obuna bo\'ling va qayta urunib ko\'ring 🔁\n' +
      'O\'zingiz izlagan narsangazni albatta topasiz 💯\n',
      {
        reply_markup: {
          inline_keyboard: [
            ...unChannels,
            [{ text: '🔁 Qayta urunish', url: `https://t.me/kenuzbot_bot?start=${content_id}` }],
            [{ text: '🌏 Saytimizga tashrif buyuring', url: WEBSITE_URL }],
          ],
        },
      },
    );
    return true;
  }
};

