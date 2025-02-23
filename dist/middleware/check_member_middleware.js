"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_member_middleware = void 0;
const bot_1 = __importDefault(require("../config/bot"));
const env_1 = require("../config/env");
const get_number_emoji_1 = require("../utils/get_number_emoji");
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
    // {
    //   name: 'Tarjima Filmlar',
    //   chatId: -1002462536703,
    //   link: 'https://t.me/tarjima_filmlar_12',
    // },
    // {
    //   name: 'Tarjima Multfilmlar',
    //   chatId: -1002364151215,
    //   link: 'https://t.me/tarjima_multfilmlar_12',
    // },
];
const check_member_middleware = async (msg) => {
    const userId = msg.from?.id;
    if (!userId)
        return;
    const unsubscribeChannels = [];
    for (const channel of tg_channels_must_member) {
        const chatMember = await bot_1.default.getChatMember(channel.chatId, userId);
        const isChatMember = ['creator', 'administrator', 'member'].includes(chatMember.status);
        if (!isChatMember) {
            unsubscribeChannels.push(channel);
        }
    }
    if (unsubscribeChannels.length) {
        const unChannels = unsubscribeChannels.map((channel, channel_index) => {
            const result = {
                text: (0, get_number_emoji_1.get_number_emoji)(channel_index + 1) + ' ' + channel.name,
                url: channel.link,
            };
            return [result];
        });
        const content_id = msg.text?.split(' ')[1];
        await bot_1.default.sendMessage(userId, '💐 Biz sizni kanalimizda intizorlik bilan kutamiz\n' +
            '🏃🏃‍♀️ Botdan foydalanish uchun quyidagi kanallarga obuna bo\'ling va qayta urunib ko\'ring 🔁\n' +
            'O\'zingiz izlagan narsangazni albatta topasiz 💯\n', {
            reply_markup: {
                inline_keyboard: [
                    ...unChannels,
                    [{ text: '🔁 Qayta urunish', url: `https://t.me/kenuzbot_bot?start=${content_id}` }],
                    [{ text: '🌏 Saytimizga tashrif buyuring', url: env_1.WEBSITE_URL }],
                ],
            },
        });
        return true;
    }
};
exports.check_member_middleware = check_member_middleware;
