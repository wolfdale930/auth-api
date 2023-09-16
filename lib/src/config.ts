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
    static JwtSecret = process.env.JWT_SECRET || 'local-secret';
    static BcryptSaltRounds = process.env.BCRYPT_SALT_ROUNDS && !isNaN(parseInt(process.env.BCRYPT_SALT_ROUNDS)) ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : 10;
    static Mailer = {
        emailId: process.env.MAILER_USER || 'email@domain.com',
        password: process.env.MAILER_PASSWORD || 'password',
        clientId: process.env.MAILER_CLIENT_ID || 'clientId',
        clientSecret: process.env.MAILER_CLIENT_SECRET || 'clientSecret',
        refreshToken: process.env.MAILER_GMAIL_REFRESH_TOKEN || 'refreshToken'
    }
}