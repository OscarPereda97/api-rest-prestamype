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
const managers_1 = require("../../managers");
const middlewares_1 = require("../../middlewares");
class Auth {
    constructor() {
        this.path = '/auth';
        this.clientPath = `/client${this.path}/`;
        this.router = express.Router();
        this.initRoutes();
        console.log("Auth ready!");
    }
    initRoutes() {
        //client
        this.router.post(`${this.clientPath}signin`, [middlewares_1.checkEmailExists], this.signin);
        this.router.post(`${this.clientPath}login`, this.login);
        //healthcheck
        this.router.get(`${this.path}/healthcheck`, this.healthcheck);
    }
    healthcheck(req, res) {
        const uuidT = (0, utils_1.generateUUIDToTraceability)();
        logger_config_1.default.info(`healthcheck(${uuidT}) - INIT PROCESS`);
        return res.status(httpResponse_1.HttpResponse.SUCCESS).json({
            message: 'auth running successfully',
            code: process.env.NODE_ENV
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuidT = (0, utils_1.generateUUIDToTraceability)();
            logger_config_1.default.info(`__signin(${uuidT}) - INIT PROCESS`);
            try {
                const { email, password, } = req.body;
                logger_config_1.default.info(`__signinVariable(${uuidT}) - email: ${email}`);
                if (!email || typeof email !== 'string') {
                    logger_config_1.default.error(`__loginAdminError(${uuidT}) - ERROR: invalid email`);
                    return res.status(httpResponse_1.HttpResponse.NOT_FOUND).json({
                        message: 'invalid email'
                    });
                }
                if (!password || typeof password !== 'string') {
                    logger_config_1.default.error(`__loginAdminError(${uuidT}) - ERROR: no password`);
                    return res.status(httpResponse_1.HttpResponse.NOT_FOUND).json({
                        message: 'no password'
                    });
                }
                yield managers_1.UserManagerFactory.setUser(email, password);
                return res.status(httpResponse_1.HttpResponse.SUCCESS).json({
                    message: "user created successfully"
                });
            }
            catch (error) {
                logger_config_1.default.error(`__signin(${uuidT}) - ERROR: ${error.message}`);
                return res.status(httpResponse_1.HttpResponse.INTERNAL_SERVER_ERROR).json({
                    message: error.message
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuidT = (0, utils_1.generateUUIDToTraceability)();
            logger_config_1.default.info(`__login(${uuidT}) - INIT PROCESS`);
            try {
                const { email, password, } = req.body;
                logger_config_1.default.info(`__signinVariable(${uuidT}) - email: ${email}`);
                if (!email || typeof email !== 'string') {
                    logger_config_1.default.error(`__loginAdminError(${uuidT}) - ERROR: invalid email`);
                    return res.status(httpResponse_1.HttpResponse.NOT_FOUND).json({
                        message: 'invalid email'
                    });
                }
                if (!password || typeof password !== 'string') {
                    logger_config_1.default.error(`__loginAdminError(${uuidT}) - ERROR: no password`);
                    return res.status(httpResponse_1.HttpResponse.NOT_FOUND).json({
                        message: 'no password'
                    });
                }
                const user = yield managers_1.UserManagerFactory.getUser(email);
                if (user.length === 0) {
                    logger_config_1.default.error(`__loginAdminError(${uuidT}) - ERROR: email not exists`);
                    return res.status(httpResponse_1.HttpResponse.NOT_FOUND).json({
                        message: 'email not exists'
                    });
                }
                const comparePassword = yield managers_1.UserManagerFactory.comparePassword(password, user.password);
                if (!comparePassword) {
                    logger_config_1.default.error(`__loginAdminError(${uuidT}) - ERROR: invalid password`);
                    return res.status(httpResponse_1.HttpResponse.NOT_FOUND).json({
                        message: 'invalid password'
                    });
                }
                const JWT = yield managers_1.UserManagerFactory.getJWT(email, user._id);
                return res.status(httpResponse_1.HttpResponse.SUCCESS).json({
                    message: JWT
                });
            }
            catch (error) {
                logger_config_1.default.error(`__login(${uuidT}) - ERROR: ${error.message}`);
                return res.status(httpResponse_1.HttpResponse.INTERNAL_SERVER_ERROR).json({
                    message: error.message
                });
            }
        });
    }
}
exports.default = Auth;
