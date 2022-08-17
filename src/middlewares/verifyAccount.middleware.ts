import {
    Request,
    Response,
    NextFunction
} from 'express';
import Logger from '../config/logger.config';
import { HttpResponse } from '../config/httpResponse';
import User from '../models/user.model';

export const checkEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { email } = req.body
    if (!email) {
        Logger.error(`__checkEmailExistsError: 1000 - no parameters found`);
        return res.status(HttpResponse.BAD_REQUEST).json({
            message: "no parameters found"
        })
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(HttpResponse.BAD_REQUEST).json({
                message: "user already exists"
            })
        }
        next();
        //@ts-ignore
        return;
    } catch (error: any) {
        return res.status(HttpResponse.BAD_REQUEST).json({
            message: error.message
        })
    }
}