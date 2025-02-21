"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channels_menu = void 0;
const constants_1 = require("../constants");
const actions_1 = require("../actions");
exports.channels_menu = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: constants_1.tg_channels.anime.name }],
            [{ text: constants_1.tg_channels.film.name }],
            [{ text: constants_1.tg_channels.cartoon.name }],
            [{ text: actions_1.actions_text.main_menu }],
        ],
    },
};
