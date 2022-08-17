import express from 'express';
import { Application } from 'express';
import {
    initApp,
    middlewares as Middlewares,
    controllers as Controllers
} from './interfaces';
import { connection } from './models';

export default class App {
    public app: Application;
    public readonly PORT: number;

    constructor(initApp: initApp) {
        this.app = express();
        this.PORT = initApp.port;
        this.middlewares(initApp.middlewares);
        this.routes(initApp.routes);
        this.initDB();
    }

    private middlewares(middlewares: Middlewares) {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }

    private routes(controllers: Controllers) {
        controllers.forEach(controller => {
            this.app.use('/prestamype-service/api/v1', controller.router);
        });
    }

    private async initDB(): Promise<void> {
        try{
            connection.once('open', () => {
                console.log("connection succesfully")
            })
            connection.on('error', error => {
                console.log(error);
            })
        }catch(err){
            throw err;
        }
        
    }

    public listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Running at port ${this.PORT}!!! `);
        })
    }
}