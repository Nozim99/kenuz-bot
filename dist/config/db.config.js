"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = require("mongoose");
const env_1 = require("./env");
const dbConnect = () => {
    (0, mongoose_1.connect)(env_1.MONGO_URI)
        .then(() => console.log(`Mongodb connected`))
        .catch(error => console.error("Mongodb error.", error));
};
exports.dbConnect = dbConnect;
