"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
mongoose_1.default.connect(database_1.mongooseConnection.uri);
exports.connection = mongoose_1.default.connection;
