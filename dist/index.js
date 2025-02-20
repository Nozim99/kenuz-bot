"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("./config/db.config");
require("./app");
(0, db_config_1.dbConnect)();
