"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.done_menu = void 0;
const actions_1 = require("../actions");
exports.done_menu = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: actions_1.actions_text.done }],
            [{ text: actions_1.actions_text.main_menu }],
        ],
    },
};
