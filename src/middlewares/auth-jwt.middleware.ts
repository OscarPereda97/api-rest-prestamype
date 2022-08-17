import * as jwt from 'jsonwebtoken';
import {
    Request,
    Response,
    NextFunction
} from 'express';
import {
    auth
} from '../config';
import Logger from '../config/logger.config';
import { HttpResponse } from '../config/httpResponse';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = <string>req.headers['x-access-token'];
        if (!token) {
            Logger.error(`__verifyTokenError: no token provided`);
            return res.status(HttpResponse.NOT_FOUND).json({
                message: "not token provided"
            })
        }
        const tokenJWT = jwt.verify(token, auth.secret);
        //@ts-ignore
        req.session.userId = tokenJWT.data.userId;
        next();
        return;
    }catch(error:any){
        return res.status(HttpResponse.BAD_REQUEST).json({
            message: error.message
        })
    }
};