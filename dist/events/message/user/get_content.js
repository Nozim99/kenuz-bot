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
        try {
            await bot_1.default.copyMessage(userId, movie.fromChatId, movie.message_id, {
                reply_markup: {
                    inline_keyboard: [
                        [{
                                text: '🌏 Saytimizga tashrif buyuring',
                                url: env_1.WEBSITE_URL,
                            }],
                    ],
                },
                protect_content: true,
            });
        }
        catch (error) {
            await bot_1.default.sendMessage(userId, '❗️ Topilmadi');
        }
        return true;
    }
};
exports.get_content = get_content;
