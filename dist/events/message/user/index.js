"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_message_actions = void 0;
const be_admin_1 = require("./be_admin");
const get_content_1 = require("./get_content");
const user_message_actions = async (msg) => {
    if (await (0, be_admin_1.be_admin)(msg))
        return true;
    if (await (0, get_content_1.get_content)(msg))
        return true;
};
exports.user_message_actions = user_message_actions;
