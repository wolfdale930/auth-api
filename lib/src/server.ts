import express, { Express } from "express";
import { Config } from "./config";
import { DB } from "./db";
import { setupAssociations, syncModels } from "./db-operations";
import routes from "./routes";
import { ApiMethod } from "./enums/api-method.enum";

export class Server {
    async init() {
        if (!await this.checkLinkerDB())
            throw new Error('Unable to connect to LinkerDB');
        const server = express();
        server.listen(Config.ApplicationPort, () => {
            console.log(`Server started on port: ${Config.ApplicationPort}`);
        });
        this.addRoutes(server);
        return server;
    }

    async checkLinkerDB(): Promise<boolean> {
        try {
            await DB.authenticate();
            setupAssociations();
            syncModels();
            return true;
        }
        catch (err) {
            console.log(err);
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