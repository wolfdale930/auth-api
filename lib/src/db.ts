import { Sequelize } from "sequelize";
import { Config } from "./config";

export const DB = new Sequelize(
    Config.Database.database,
    Config.Database.username,
    Config.Database.password,
    {
        host: Config.Database.host,
        dialect: 'mssql',
        port: Config.Database.port
    });