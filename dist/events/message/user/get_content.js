"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_content = void 0;
const bot_1 = __importDefault(require("../../../config/bot"));
const Movie_1 = __importDefault(require("../../../model/Movie"));
const empty_menu_1 = require("../../../utils/tg_menu/empty_menu");
const env_1 = require("../../../config/env");
const check_member_middleware_1 = require("../../../middleware/check_member_middleware");
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
];
const get_content = async (msg) => {
    const userId = msg.from?.id;
    if (!userId)
        return true;
    if (!msg.text)
        return;
    const [bot_command, content_id] = msg.text.split(' ');
    if (bot_command === '/start' && content_id) {
        if (await (0, check_member_middleware_1.check_member_middleware)(msg))
            return true;
        const movie = await Movie_1.default.findById(content_id);
        if (!movie) {
            await bot_1.default.sendMessage(userId, '🚫 Topilmadi!', empty_menu_1.empty_menu);
            return true;
        }
        await bot_1.default.copyMessage(userId, movie.fromChatId, movie.message_id, {
            reply_markup: {
                inline_keyboard: [
                    [{
                            text: '🌏 Saytimizga tashrif buyuring',
                            url: env_1.WEBSITE_URL,
                        }],
                ],
            },
        });
        return true;
    }
};
exports.get_content = get_content;
