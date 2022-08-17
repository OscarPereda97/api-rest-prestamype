"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeManagerFactory = exports.UserManagerFactory = void 0;
const user_manager_1 = require("./user.manager");
const exchange_manager_1 = require("./exchange.manager");
exports.UserManagerFactory = user_manager_1.UserManager.create();
exports.ExchangeManagerFactory = exchange_manager_1.ExchangeManager.create();
