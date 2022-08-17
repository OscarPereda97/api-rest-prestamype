import Exchange from '../models/exchange.model';
import { IExchange } from '../models/interfaces';
import axios from 'axios';

export class ExchangeManager {
    static create(): ExchangeManager {
        return new ExchangeManager();
    }

    public async setOrder(tipoCambio: string, monto: number, userId: string): Promise<string> {
        const rate = await this.getRate();
        let montoEnviar = monto, montoRecibir;
        if(tipoCambio === 'compra'){
            montoRecibir = montoEnviar * rate.data.purchase_price;
        }else{
            montoRecibir = montoEnviar * rate.data.sale_price;
        }
        const order = new Exchange({
            tipoCambio,
            tasaCambio:{
                _id: rate.data._id,
                purchasePrice: rate.data.purchase_price,
                salePrice: rate.data.sale_price
            },
            montoEnviar,
            montoRecibir,
            userId
        })
        await order.save();
        return "order created successfully";
    }

    public async getOrders(): Promise<IExchange[]> {
        return await Exchange.find({});
    }

    public async getOrder(id: string): Promise<IExchange | null> {
        return await Exchange.findOne({ _id: id });
    }

    public async deleteOrder(id: string): Promise<void> {
        await Exchange.deleteOne({ _id: id });
    }

    private async getRate():Promise<any>{
        const rate = await axios.get('https://api.test.cambioseguro.com/api/v1.1/config/rates')
        return rate.data;
    }
}