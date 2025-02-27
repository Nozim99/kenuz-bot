"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_title_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const env_1 = require("../../../../config/env");
const constants_1 = require("../../../../utils/constants");
const bot_1 = __importDefault(require("../../../../config/bot"));
const get_title_action = async (msg, user) => {
    if (user.action === actions_1.actions.create_movie_simple && msg.text !== actions_1.actions_text.main_menu) {
        if (!msg.text)
            return true;
        const result = await fetch(env_1.API_URL + '/api/movie/by_title/' + msg.text);
        const result_data = await result.json();
        if (!result_data || !result_data.movie) {
            await bot_1.default.sendMessage(user.userId, '🚫 Movie topilmadi❗️');
            return true;
        }
        if (result_data.movie.video_url)
            await bot_1.default.sendMessage(user.userId, 'Bu movie\'da video mavjud❗️');
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.save_video_for_simple_movie + constants_1.split_symbol + msg.text });
        await bot_1.default.sendMessage(user.userId, '📥 Video yuklang');
        return true;
    }
};
exports.get_title_action = get_title_action;
