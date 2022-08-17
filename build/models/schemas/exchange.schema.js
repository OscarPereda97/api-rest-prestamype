"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ExchangeSchema = new mongoose_1.Schema({
    tipoCambio: {
        type: String,
        enum: ['compra', 'venta'],
    },
    tasaCambio: {
        _id: {
            type: String
        },
        purchasePrice: {
            type: Number
        },
        salePrice: {
            type: Number
        }
    },
    montoEnviar: {
        type: Number
    },
    montoRecibir: {
        type: Number
    },
    userId: {
        type: String
    }
});
