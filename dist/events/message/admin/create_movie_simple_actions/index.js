"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_movie_simple_actions = void 0;
const start_create_movie_simple_action_1 = require("./start_create_movie_simple_action");
const get_title_action_1 = require("./get_title_action");
const get_video_action_1 = require("./get_video_action");
const create_movie_simple_actions = async (msg, user) => {
    if (await (0, start_create_movie_simple_action_1.start_create_movie_simple_action)(msg, user))
        return true;
    if (await (0, get_title_action_1.get_title_action)(msg, user))
        return true;
    if (await (0, get_video_action_1.get_video_action)(msg, user))
        return true;
};
exports.create_movie_simple_actions = create_movie_simple_actions;
