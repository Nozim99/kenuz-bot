"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.return_main_menu_action = void 0;
const User_1 = __importDefault(require("../../../model/User"));
const actions_1 = require("../../../utils/actions");
const bot_1 = __importDefault(require("../../../config/bot"));
const Movie_1 = __importDefault(require("../../../model/Movie"));
const return_main_menu_action = async (msg, user) => {
    if (msg.text === actions_1.actions_text.main_menu) {
        // Back from send_content_to_channel
        const [action_value, image_id, content_id] = user.action?.split('@(=_=)@');
        if (actions_1.actions.choice_channel === action_value && image_id && content_id) {
            const movie = await Movie_1.default.findById(content_id);
            if (movie)
                await Movie_1.default.findByIdAndDelete(movie._id);
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.main_menu });
        await bot_1.default.sendMessage(user.userId, msg.text, {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [[{ text: actions_1.actions_text.create_content }]],
            },
        });
        return true;
    }
};
exports.return_main_menu_action = return_main_menu_action;
