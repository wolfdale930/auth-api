import express, { Express } from "express";
import { Config } from "./config";
import routes from "./routes";
import { ApiMethod } from "./enums/api-method.enum";
import * as bodyParser from 'body-parser';
import DB from "./db";
import { EmailService } from "./services/email.service";

export class Server {
    async init() {
        if (!await this.checkLinkerDB())
            throw new Error('Unable to connect to LinkerDB');
        if (!this.startEmailService())
            throw new Error('Unable to start Email Service');
        const server = express();
        server.use(bodyParser.urlencoded({
            extended: true
        }));
        server.use(bodyParser.json({ type: 'application/json' }));
        server.listen(Config.ApplicationPort, () => {
            console.log(`Server started on port: ${Config.ApplicationPort}`);
        });
        this.addRoutes(server);
        return server;
    }

    async checkLinkerDB(): Promise<boolean> {
        try {
            DB.$connect();
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    startEmailService() {
        try {
            EmailService.init();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    addRoutes(server: Express) {
        routes.forEach(element => {
            switch (element.method) {
                case ApiMethod.GET:
                    server.get(element.path, element.controller);
                    break;
                case ApiMethod.POST:
                    server.post(element.path, element.controller);
                    break;
                case ApiMethod.PUT:
                    server.put(element.path, element.controller);
                    break;
                case ApiMethod.PATCH:
                    server.patch(element.path, element.controller);
                    break;
                case ApiMethod.DELETE:
                    server.delete(element.path, element.controller);
                    break;
                default:
                    break;
            }
        });
    }
}