import { Schema } from 'mongoose';

export const ExchangeSchema = new Schema({
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
})