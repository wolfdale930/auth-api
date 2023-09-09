import express, { Express } from "express";
import { DB } from "./db"

export class Server {
    async init() {
        if (!await this.checkLinkerDB())
            throw new Error('Unable to connect to LinkerDB');
        const server = express();
        server.listen(8080, () => {
            console.log(`Server started`);
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