"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
class App {
    constructor(initApp) {
        this.app = (0, express_1.default)();
        this.PORT = initApp.port;
        this.middlewares(initApp.middlewares);
        this.routes(initApp.routes);
        this.initDB();
    }
    middlewares(middlewares) {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }
    routes(controllers) {
        controllers.forEach(controller => {
            this.app.use('/prestamype-service/api/v1', controller.router);
        });
    }
    initDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                models_1.connection.once('open', () => {
                    console.log("connection succesfully");
                });
                models_1.connection.on('error', error => {
                    console.log(error);
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Running at port ${this.PORT}!!! `);
        });
    }
}
exports.default = App;
