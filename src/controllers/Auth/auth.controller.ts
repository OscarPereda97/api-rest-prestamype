import * as express from 'express';
import { Request, Response } from 'express';
import { IControllerBase } from '../../interfaces';
import { generateUUIDToTraceability } from '../../utils';
import Logger from '../../config/logger.config';
import { HttpResponse } from '../../config/httpResponse';
import { UserManagerFactory } from '../../managers';
import { checkEmailExists } from '../../middlewares';

export default class Auth implements IControllerBase {
    public path = '/auth';
    public clientPath = `/client${this.path}/`;
    public router = express.Router();

    constructor() {
        this.initRoutes();
        console.log("Auth ready!");
    }

    public initRoutes() {
        //client
        this.router.post(`${this.clientPath}signin`, [checkEmailExists], this.signin);
        this.router.post(`${this.clientPath}login`, this.login);

        //healthcheck
        this.router.get(`${this.path}/healthcheck`, this.healthcheck);
    }

    private healthcheck(req: Request, res: Response) {
        const uuidT = generateUUIDToTraceability();
        Logger.info(`healthcheck(${uuidT}) - INIT PROCESS`);
        return res.status(HttpResponse.SUCCESS).json({
            message: 'auth running successfully',
            code: process.env.NODE_ENV
        });
    }

    private async signin(req: Request, res: Response): Promise<Response> {
        const uuidT = generateUUIDToTraceability()
        Logger.info(`__signin(${uuidT}) - INIT PROCESS`);
        try {
            const {
                email,
                password,
            } = req.body;
            Logger.info(`__signinVariable(${uuidT}) - email: ${email}`);
            if (!email || typeof email !== 'string') {
                Logger.error(`__loginAdminError(${uuidT}) - ERROR: invalid email`);
                return res.status(HttpResponse.NOT_FOUND).json({
                    message: 'invalid email'
                })
            }
            if (!password || typeof password !== 'string') {
                Logger.error(`__loginAdminError(${uuidT}) - ERROR: no password`);
                return res.status(HttpResponse.NOT_FOUND).json({
                    message: 'no password'
                })
            }
            await UserManagerFactory.setUser(email, password);
            return res.status(HttpResponse.SUCCESS).json({
                message: "user created successfully"
            })
        } catch (error: any) {
            Logger.error(`__signin(${uuidT}) - ERROR: ${error.message}`)
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }

    private async login(req: Request, res: Response): Promise<Response> {
        const uuidT = generateUUIDToTraceability()
        Logger.info(`__login(${uuidT}) - INIT PROCESS`);
        try {
            const {
                email,
                password,
            } = req.body;
            Logger.info(`__signinVariable(${uuidT}) - email: ${email}`);
            if (!email || typeof email !== 'string') {
                Logger.error(`__loginAdminError(${uuidT}) - ERROR: invalid email`);
                return res.status(HttpResponse.NOT_FOUND).json({
                    message: 'invalid email'
                })
            }
            if (!password || typeof password !== 'string') {
                Logger.error(`__loginAdminError(${uuidT}) - ERROR: no password`);
                return res.status(HttpResponse.NOT_FOUND).json({
                    message: 'no password'
                })
            }
            const user = await UserManagerFactory.getUser(email);
            if (user.length === 0) {
                Logger.error(`__loginAdminError(${uuidT}) - ERROR: email not exists`);
                return res.status(HttpResponse.NOT_FOUND).json({
                    message: 'email not exists'
                })
            }
            const comparePassword = await UserManagerFactory.comparePassword(password, user.password);
            if (!comparePassword) {
                Logger.error(`__loginAdminError(${uuidT}) - ERROR: invalid password`);
                return res.status(HttpResponse.NOT_FOUND).json({
                    message: 'invalid password'
                })
            }
            const JWT = await UserManagerFactory.getJWT(email, user._id);
            return res.status(HttpResponse.SUCCESS).json({
                message: JWT
            })

        } catch (error: any) {
            Logger.error(`__login(${uuidT}) - ERROR: ${error.message}`)
            return res.status(HttpResponse.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }

}
