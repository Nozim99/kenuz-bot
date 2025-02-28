"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_series_actions = void 0;
const create_series_action_1 = require("./create_series_action");
const check_series_title_action_1 = require("./check_series_title_action");
const get_series_title_action_1 = require("./get_series_title_action");
const get_series_parts_video_action_1 = require("./get_series_parts_video_action");
const save_series_action_1 = require("./save_series_action");
const create_series_actions = async (msg, user) => {
    if (await (0, create_series_action_1.create_series_action)(msg, user))
        return true;
    if (await (0, get_series_title_action_1.get_series_title_action)(msg, user))
        return true;
    if (await (0, check_series_title_action_1.check_series_title_action)(msg, user))
        return true;
    if (await (0, get_series_parts_video_action_1.get_series_parts_video_action)(msg, user))
        return true;
    if (await (0, save_series_action_1.save_series_action)(msg, user))
        return true;
};
exports.create_series_actions = create_series_actions;
