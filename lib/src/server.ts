import express from "express";
import { Config } from "./config";
import { DB } from "./db";
import { setupAssociations, syncModels } from "./db-operations";

export class Server {
    async init() {
        if (!await this.checkLinkerDB())
            throw new Error('Unable to connect to LinkerDB');
        const server = express();
        server.listen(Config.ApplicationPort, () => {
            console.log(`Server started on port: ${Config.ApplicationPort}`);
        });
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
}