import { Document } from 'mongoose';

export interface IExchange extends Document {
    tipoCambio: 'compra' | 'venta',
    tasaCambio: {
        _id: string,
        purchasePrice: number,
        salePrice: number
    },
    montoEnviar: number,
    montoRecibir: number,
    userId: string
}