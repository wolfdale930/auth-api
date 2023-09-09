import { Sequelize } from "sequelize";
import { Config } from "./config";

export class DB {
    static instance: Sequelize;

    static connect() {
        DB.instance = new Sequelize(
            Config.Database.database,
            Config.Database.username,
            Config.Database.password,
            {
                host: Config.Database.host,
                dialect: 'mssql',
                port: Config.Database.port
            });
    }

}