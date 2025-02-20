"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.back_main_menu = void 0;
const actions_1 = require("../actions");
exports.back_main_menu = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[{ text: actions_1.actions_text.main_menu }]],
    },
};
