"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start_create_movie_simple_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const tg_menu_1 = require("../../../../utils/tg_menu");
const start_create_movie_simple_action = async (msg, user) => {
    if (user.action === actions_1.actions.main_menu && msg.text === actions_1.actions_text.create_movie_simple) {
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.create_movie_simple });
        await bot_1.default.sendMessage(user.userId, '🎬 Movie nomini kiriting', tg_menu_1.back_main_menu);
        return true;
    }
};
exports.start_create_movie_simple_action = start_create_movie_simple_action;
