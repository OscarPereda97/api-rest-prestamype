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
exports.ExchangeManager = void 0;
const exchange_model_1 = __importDefault(require("../models/exchange.model"));
const axios_1 = __importDefault(require("axios"));
class ExchangeManager {
    static create() {
        return new ExchangeManager();
    }
    setOrder(tipoCambio, monto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rate = yield this.getRate();
            let montoEnviar = monto, montoRecibir;
            if (tipoCambio === 'compra') {
                montoRecibir = montoEnviar * rate.data.purchase_price;
            }
            else {
                montoRecibir = montoEnviar * rate.data.sale_price;
            }
            const order = new exchange_model_1.default({
                tipoCambio,
                tasaCambio: {
                    _id: rate.data._id,
                    purchasePrice: rate.data.purchase_price,
                    salePrice: rate.data.sale_price
                },
                montoEnviar,
                montoRecibir,
                userId
            });
            yield order.save();
            return "order created successfully";
        });
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exchange_model_1.default.find({});
        });
    }
    getOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exchange_model_1.default.findOne({ _id: id });
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exchange_model_1.default.deleteOne({ _id: id });
        });
    }
    getRate() {
        return __awaiter(this, void 0, void 0, function* () {
            const rate = yield axios_1.default.get('https://api.test.cambioseguro.com/api/v1.1/config/rates');
            return rate.data;
        });
    }
}
exports.ExchangeManager = ExchangeManager;
