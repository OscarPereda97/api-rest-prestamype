import * as express from 'express';
import { Request, Response } from 'express';
import { IControllerBase } from '../../interfaces';
import { generateUUIDToTraceability } from '../../utils';
import Logger from '../../config/logger.config';
import { HttpResponse } from '../../config/httpResponse';
import { verifyToken } from '../../middlewares';
import { ExchangeManagerFactory } from '../../managers';

export default class Exchange implements IControllerBase {
    public path = '/exchange';
    public clientPath = `/client${this.path}/`;
    public router = express.Router();

    constructor() {
        this.initRoutes();
        console.log("Exchange ready!");
    }

    public initRoutes() {
        //client
        this.router.post(`${this.clientPath}step-1`, [verifyToken], this.exchange);
        this.router.get(`${this.clientPath}user`, [verifyToken], this.getOrders);
        this.router.get(`${this.clientPath}user/:id`, [verifyToken], this.getOrder);
        this.router.delete(`${this.clientPath}user/:id`, [verifyToken], this.deleteOrder);


        //healthcheck
        this.router.get(`${this.path}/healthcheck`, this.healthcheck);
    }

    private healthcheck(req: Request, res: Response) {
        const uuidT = generateUUIDToTraceability();
        Logger.info(`healthcheck(${uuidT}) - INIT PROCESS`);
        return res.status(HttpResponse.SUCCESS).json({
            message: 'exchange running successfully',
            code: process.env.NODE_ENV,
        });
    }

    private async exchange(req: Request, res: Response): Promise<Response> {
        const uuidT = generateUUIDToTraceability();
        Logger.info(`__exchange(${uuidT}) - INIT PROCESS`);
        try {
            //@ts-ignore
            const userId = req.session.userId;
            const {
                tipoCambio,
                monto
            } = req.body;
            Logger.info(`__exchangeVariable(${uuidT}) - userId: ${userId}`);
            Logger.info(`__exchangeVariable(${uuidT}) - tipoCambio: ${tipoCambio}`);
            Logger.info(`__exchangeVariable(${uuidT}) - monto: ${monto}`);
            if (tipoCambio != "compra" && tipoCambio != "venta") {
                Logger.error(`__exchange(${uuidT}) - invalid operation`)
                return res.status(HttpResponse.BAD_REQUEST).json({
                    message: 'invalid operation'
                })
            }
            if (!monto || typeof monto !== 'number') {
                Logger.error(`__exchangeError(${uuidT}) - invalid amount`);
                return res.status(HttpResponse.NOT_FOUND).json({
                    message: 'invalid amount'
                })
            }
            const message = await ExchangeManagerFactory.setOrder(tipoCambio, monto, userId);
            return res.status(HttpResponse.SUCCESS).json({
                message
            })
        } catch (error: any) {
            Logger.error(`__exchange(${uuidT}) - ERROR: ${error.message}`)
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }

    private async getOrders(req: Request, res: Response) {
        const uuidT = generateUUIDToTraceability();
        Logger.info(`__getOrders(${uuidT}) - INIT PROCESS`);
        try {
            const orders = await ExchangeManagerFactory.getOrders();
            return res.status(HttpResponse.SUCCESS).json({
                orders
            })
        } catch (error: any) {
            Logger.error(`__getOrders(${uuidT}) - ERROR: ${error.message}`)
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }

    private async getOrder(req: Request, res: Response) {
        const uuidT = generateUUIDToTraceability();
        Logger.info(`__getOrder(${uuidT}) - INIT PROCESS`);
        try {
            const { id } = req.params;
            Logger.warn(`__getOrderVariable(${uuidT}) - id: ${id}`);
            const order = await ExchangeManagerFactory.getOrder(id);
            return res.status(HttpResponse.SUCCESS).json({
                order
            })
        } catch (error: any) {
            Logger.error(`__getOrder(${uuidT}) - ERROR: ${error.message}`)
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }

    private async deleteOrder(req: Request, res: Response) {
        const uuidT = generateUUIDToTraceability();
        Logger.info(`__deleteOrder(${uuidT}) - INIT PROCESS`);
        try {
            const { id } = req.params;
            Logger.warn(`__deleteOrderVariable(${uuidT}) - id: ${id}`);
            await ExchangeManagerFactory.deleteOrder(id);
            return res.status(HttpResponse.SUCCESS).json({
                message: "order deleted successfully"
            })
        } catch (error: any) {
            Logger.error(`__deleteOrder(${uuidT}) - ERROR: ${error.message}`)
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }
}
