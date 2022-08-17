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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const utils_1 = require("../../utils");
const logger_config_1 = __importDefault(require("../../config/logger.config"));
const httpResponse_1 = require("../../config/httpResponse");
const middlewares_1 = require("../../middlewares");
const managers_1 = require("../../managers");
class Exchange {
    constructor() {
        this.path = '/exchange';
        this.clientPath = `/client${this.path}/`;
        this.router = express.Router();
        this.initRoutes();
        console.log("Exchange ready!");
    }
    initRoutes() {
        //client
        this.router.post(`${this.clientPath}step-1`, [middlewares_1.verifyToken], this.exchange);
        this.router.get(`${this.clientPath}user`, [middlewares_1.verifyToken], this.getOrders);
        this.router.get(`${this.clientPath}user/:id`, [middlewares_1.verifyToken], this.getOrder);
        this.router.delete(`${this.clientPath}user/:id`, [middlewares_1.verifyToken], this.deleteOrder);
        //healthcheck
        this.router.get(`${this.path}/healthcheck`, this.healthcheck);
    }
    healthcheck(req, res) {
        const uuidT = (0, utils_1.generateUUIDToTraceability)();
        logger_config_1.default.info(`healthcheck(${uuidT}) - INIT PROCESS`);
        return res.status(httpResponse_1.HttpResponse.SUCCESS).json({
            message: 'exchange running successfully',
            code: process.env.NODE_ENV,
        });
    }
    exchange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuidT = (0, utils_1.generateUUIDToTraceability)();
            logger_config_1.default.info(`__exchange(${uuidT}) - INIT PROCESS`);
            try {
                //@ts-ignore
                const userId = req.session.userId;
                const { tipoCambio, monto } = req.body;
                logger_config_1.default.info(`__exchangeVariable(${uuidT}) - userId: ${userId}`);
                logger_config_1.default.info(`__exchangeVariable(${uuidT}) - tipoCambio: ${tipoCambio}`);
                logger_config_1.default.info(`__exchangeVariable(${uuidT}) - monto: ${monto}`);
                if (tipoCambio != "compra" && tipoCambio != "venta") {
                    logger_config_1.default.error(`__exchange(${uuidT}) - invalid operation`);
                    return res.status(httpResponse_1.HttpResponse.BAD_REQUEST).json({
                        message: 'invalid operation'
                    });
                }
                if (!monto || typeof monto !== 'number') {
                    logger_config_1.default.error(`__exchangeError(${uuidT}) - invalid amount`);
                    return res.status(httpResponse_1.HttpResponse.NOT_FOUND).json({
                        message: 'invalid amount'
                    });
                }
                const message = yield managers_1.ExchangeManagerFactory.setOrder(tipoCambio, monto, userId);
                return res.status(httpResponse_1.HttpResponse.SUCCESS).json({
                    message
                });
            }
            catch (error) {
                logger_config_1.default.error(`__exchange(${uuidT}) - ERROR: ${error.message}`);
                return res.status(httpResponse_1.HttpResponse.INTERNAL_SERVER_ERROR).json({
                    message: error.message
                });
            }
        });
    }
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuidT = (0, utils_1.generateUUIDToTraceability)();
            logger_config_1.default.info(`__getOrders(${uuidT}) - INIT PROCESS`);
            try {
                const orders = yield managers_1.ExchangeManagerFactory.getOrders();
                return res.status(httpResponse_1.HttpResponse.SUCCESS).json({
                    orders
                });
            }
            catch (error) {
                logger_config_1.default.error(`__getOrders(${uuidT}) - ERROR: ${error.message}`);
                return res.status(httpResponse_1.HttpResponse.INTERNAL_SERVER_ERROR).json({
                    message: error.message
                });
            }
        });
    }
    getOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuidT = (0, utils_1.generateUUIDToTraceability)();
            logger_config_1.default.info(`__getOrder(${uuidT}) - INIT PROCESS`);
            try {
                const { id } = req.params;
                logger_config_1.default.warn(`__getOrderVariable(${uuidT}) - id: ${id}`);
                const order = yield managers_1.ExchangeManagerFactory.getOrder(id);
                return res.status(httpResponse_1.HttpResponse.SUCCESS).json({
                    order
                });
            }
            catch (error) {
                logger_config_1.default.error(`__getOrder(${uuidT}) - ERROR: ${error.message}`);
                return res.status(httpResponse_1.HttpResponse.INTERNAL_SERVER_ERROR).json({
                    message: error.message
                });
            }
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuidT = (0, utils_1.generateUUIDToTraceability)();
            logger_config_1.default.info(`__deleteOrder(${uuidT}) - INIT PROCESS`);
            try {
                const { id } = req.params;
                logger_config_1.default.warn(`__deleteOrderVariable(${uuidT}) - id: ${id}`);
                yield managers_1.ExchangeManagerFactory.deleteOrder(id);
                return res.status(httpResponse_1.HttpResponse.SUCCESS).json({
                    message: "order deleted successfully"
                });
            }
            catch (error) {
                logger_config_1.default.error(`__deleteOrder(${uuidT}) - ERROR: ${error.message}`);
                return res.status(httpResponse_1.HttpResponse.INTERNAL_SERVER_ERROR).json({
                    message: error.message
                });
            }
        });
    }
}
exports.default = Exchange;
