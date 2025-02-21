"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStatus = void 0;
const mongoose_1 = require("mongoose");
exports.userStatus = {
    USER: 'user',
    ADMIN: 'admin',
};
const UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
    },
    action: {
        type: String,
        default: '',
    },
    token: String,
    status: {
        type: String,
        enum: [exports.userStatus.USER, exports.userStatus.ADMIN],
        default: exports.userStatus.USER,
    },
});
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
