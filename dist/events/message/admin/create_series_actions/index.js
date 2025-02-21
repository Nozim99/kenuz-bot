"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_series_actions = void 0;
const create_series_action_1 = require("./create_series_action");
const get_series_number_action_1 = require("./get_series_number_action");
const get_series_image_action_1 = require("./get_series_image_action");
const get_series_videos_action_1 = require("./get_series_videos_action");
const request_series_description_action_1 = require("./request_series_description_action");
const get_series_description_action_1 = require("./get_series_description_action");
const send_series_content_to_channel_1 = require("./send_series_content_to_channel");
const create_series_actions = async (msg, user) => {
    if (await (0, create_series_action_1.create_series_action)(msg, user))
        return true;
    if (await (0, get_series_number_action_1.get_series_number_action)(msg, user))
        return true;
    if (await (0, get_series_image_action_1.get_series_image_action)(msg, user))
        return true;
    if (await (0, get_series_videos_action_1.get_series_videos_action)(msg, user))
        return true;
    if (await (0, request_series_description_action_1.request_series_description_action)(msg, user))
        return true;
    if (await (0, get_series_description_action_1.get_series_description_action)(msg, user))
        return true;
    if (await (0, send_series_content_to_channel_1.send_series_content_to_channel)(msg, user))
        return true;
};
exports.create_series_actions = create_series_actions;
