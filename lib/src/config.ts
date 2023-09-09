import * as dotenv from 'dotenv'

dotenv.config();

export class Config {
    static Database = {
        host: process.env.DATABASE_HOST || 'localhost',
        database: process.env.DATABASE_NAME || 'LinkerDB',
        username: process.env.DATABASE_USERNAME || 'user',
        password: process.env.DATABASE_PASSWORD || 'password',
        port: process.env.DATABASE_PORT && !isNaN(parseInt(process.env.DATABASE_PORT)) ? parseInt(process.env.DATABASE_PORT) : 1433
    };

    static ApplicationPort = process.env.APP_PORT && !isNaN(parseInt(process.env.APP_PORT)) ? parseInt(process.env.APP_PORT) : 8080;
}