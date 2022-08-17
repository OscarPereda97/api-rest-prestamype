"use strict";
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
exports.checkEmailExists = void 0;
const logger_config_1 = __importDefault(require("../config/logger.config"));
const httpResponse_1 = require("../config/httpResponse");
const user_model_1 = __importDefault(require("../models/user.model"));
const checkEmailExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        logger_config_1.default.error(`__checkEmailExistsError: 1000 - no parameters found`);
        return res.status(httpResponse_1.HttpResponse.BAD_REQUEST).json({
            message: "no parameters found"
        });
    }
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (user) {
            return res.status(httpResponse_1.HttpResponse.BAD_REQUEST).json({
                message: "user already exists"
            });
        }
        next();
        //@ts-ignore
        return;
    }
    catch (error) {
        return res.status(httpResponse_1.HttpResponse.BAD_REQUEST).json({
            message: error.message
        });
    }
});
exports.checkEmailExists = checkEmailExists;
