"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPIRES_IN = exports.mongooseConnection = void 0;
exports.mongooseConnection = {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/prestamype',
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD
};
exports.EXPIRES_IN = 60 * 30;
