"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.be_admin = void 0;
const env_1 = require("../../../config/env");
const User_1 = __importStar(require("../../../model/User"));
const actions_1 = require("../../../utils/actions");
const bot_1 = __importDefault(require("../../../config/bot"));
const be_admin = async (msg) => {
    const userId = msg.from?.id;
    if (msg.text === env_1.ADMIN_SECRET && userId) {
        const user = await User_1.default.findOne({ userId });
        if (user) {
            await User_1.default.findByIdAndUpdate({ status: User_1.userStatus.ADMIN, action: actions_1.actions.main_menu });
        }
        else {
            const newUser = new User_1.default({
                userId,
                action: actions_1.actions.main_menu,
                status: User_1.userStatus.ADMIN,
            });
            await newUser.save();
        }
        await bot_1.default.sendMessage(userId, 'Admin bo\'ldingiz', {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [
                    [{ text: actions_1.actions_text.create_content }],
                ],
            },
        });
        return true;
    }
};
exports.be_admin = be_admin;
