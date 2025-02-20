"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_movie_actions = void 0;
const get_video_description_action_1 = require("./get_video_description_action");
const get_video_action_1 = require("./get_video_action");
const confirm_video_action_1 = require("./confirm_video_action");
const get_image_action_1 = require("./get_image_action");
const send_content_to_channel_1 = require("./send_content_to_channel");
const create_movie_actions = async (msg, user) => {
    if (await (0, get_image_action_1.get_image_action)(msg, user))
        return true;
    if (await (0, get_video_action_1.get_video_action)(msg, user))
        return true;
    if (await (0, get_video_description_action_1.get_video_description_action)(msg, user))
        return true;
    if (await (0, confirm_video_action_1.confirm_video_action)(msg, user))
        return true;
    if (await (0, send_content_to_channel_1.send_content_to_channel)(msg, user))
        return true;
};
exports.create_movie_actions = create_movie_actions;
