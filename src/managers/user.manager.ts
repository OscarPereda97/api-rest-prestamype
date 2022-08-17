import User from '../models/user.model';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
    auth,
    EXPIRES_IN
} from '../config';

export class UserManager {
    static create(): UserManager {
        return new UserManager();
    }

    public async setUser(email: string, password: string): Promise<string> {
        const user = new User({ email, password });
        await user.save();
        return user._id;
    }

    public async getUser(email: string): Promise<any> {
        const user = await User.findOne({ email });
        return user;
    }

    public async comparePassword(password: string, passwordBD: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordBD);
    }

    public async getJWT(email: string, userId: string, expires?: number): Promise<string> {
        const expiresTime = expires || EXPIRES_IN;
        const expiresIn = Math.floor(Date.now() / 1000) + expiresTime;
        const data = {
            userId,
            email
        }
        const seed = auth.secret;
        return jwt.sign({
            exp: expiresIn,
            data
        }, seed);
    }
}