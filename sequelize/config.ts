import { Config as dbConfig } from "../lib/src/config";

const config = {
    development: {
        username: dbConfig.Database.username,
        password: dbConfig.Database.password,
        database: dbConfig.Database.database,
        host: dbConfig.Database.host,
        port: dbConfig.Database.port,
        dialect: 'mssql',
    },
    database: {
        username: dbConfig.Database.username,
        password: dbConfig.Database.password,
        database: dbConfig.Database.database,
        host: dbConfig.Database.host,
        port: dbConfig.Database.port,
        dialect: 'mssql',
    }
};

module.exports = config;