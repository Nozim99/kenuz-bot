"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin_message = void 0;
const User_1 = __importDefault(require("../../../model/User"));
const create_movie_actions_1 = require("./create_movie_actions");
const return_main_menu_action_1 = require("./return_main_menu_action");
const create_series_actions_1 = require("./create_series_actions");
const login_actions_1 = require("./login_actions");
const admin_message = async (msg) => {
    const user = await User_1.default.findOne({ userId: msg.from?.id });
    if (!user)
        return true;
    if (await (0, return_main_menu_action_1.return_main_menu_action)(msg, user))
        return true;
    if (await (0, create_movie_actions_1.create_movie_actions)(msg, user))
        return true;
    if (await (0, create_series_actions_1.create_series_actions)(msg, user))
        return true;
    if (await (0, login_actions_1.login_actions)(msg, user))
        return true;
};
exports.admin_message = admin_message;
