"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_series_title_action = void 0;
const User_1 = __importDefault(require("../../../../model/User"));
const actions_1 = require("../../../../utils/actions");
const bot_1 = __importDefault(require("../../../../config/bot"));
const constants_1 = require("../../../../utils/constants");
const env_1 = require("../../../../config/env");
const tg_menu_1 = require("../../../../utils/tg_menu");
const check_series_title_action = async (msg, user) => {
    const [action_value, series_start_num] = user.action.split(constants_1.split_symbol);
    if (action_value === actions_1.actions.get_series_title && msg.text !== actions_1.actions_text.main_menu && series_start_num) {
        if (!msg.text) {
            await bot_1.default.sendMessage(user.userId, 'Serialni nomini kiriting');
            return true;
        }
        try {
            const result = await fetch(env_1.API_URL + '/api/movie/by_title/' + msg.text);
            const result_data = await result.json();
            if (!result_data || !result_data.movie) {
                await bot_1.default.sendMessage(user.userId, 'Serial topilmadi❗️');
                return true;
            }
        }
        catch (err) {
            console.error(err);
            await bot_1.default.sendMessage(user.userId, 'API bilan muommo sodir bo\'ldi❗️');
            return true;
        }
        await User_1.default.findByIdAndUpdate(user._id, { action: actions_1.actions.get_series_videos + constants_1.split_symbol + series_start_num + constants_1.split_symbol + msg.text });
        await bot_1.default.sendMessage(user.userId, '📥 Video yuklang 🎬', tg_menu_1.done_menu);
        return true;
    }
};
exports.check_series_title_action = check_series_title_action;
