"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_actions = void 0;
const login_action_1 = require("./login_action");
const get_username_login_action_1 = require("./get_username_login_action");
const get_password_login_action_1 = require("./get_password_login_action");
const login_actions = async (msg, user) => {
    if (await (0, login_action_1.login_action)(msg, user))
        return true;
    if (await (0, get_username_login_action_1.get_username_login_action)(msg, user))
        return true;
    if (await (0, get_password_login_action_1.get_password_login_action)(msg, user))
        return true;
};
exports.login_actions = login_actions;
