import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/src/.env` });
import App from './app';
import Auth from "./controllers/Auth/auth.controller";
import Exchange from "./controllers/Exchange/exchange.controller";
import * as bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
const corsConfig = {
    credentials: true,
    origin: true,
};

const app = new App({
    port: Number(process.env.PORT || 8000),
    routes: [
        new Auth(),
        new Exchange()
    ],
    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        session({ secret: '_secret_' }),
        cors(corsConfig)
    ]
});

app.listen();
