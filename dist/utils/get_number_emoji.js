"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_number_emoji = void 0;
const get_number_emoji = (num) => {
    const emoji_icons = {
        '0': '0️⃣',
        '1': '1️⃣',
        '2': '2️⃣',
        '3': '3️⃣',
        '4': '4️⃣',
        '5': '5️⃣',
        '6': '6️⃣',
        '7': '7️⃣',
        '8': '8️⃣',
        '9': '9️⃣',
    };
    return String(num).split('').map((num) => emoji_icons[num]);
};
exports.get_number_emoji = get_number_emoji;
