"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main_menu = void 0;
const actions_1 = require("../actions");
exports.main_menu = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: actions_1.actions_text.create_content }],
            [{ text: actions_1.actions_text.create_series }],
            [{ text: actions_1.actions_text.login }],
        ],
    },
};
