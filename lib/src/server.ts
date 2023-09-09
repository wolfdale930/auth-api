import express, { Express } from "express";
import { DB } from "./db"
import { Config } from "./config";

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
            DB.connect();
            await DB.instance.authenticate();
            return true;
        }
        catch (err) {
            return false;
        }
    }
}