import { Sequelize } from "sequelize";

export class DB {
    static instance: Sequelize;

    static connect() {
        DB.instance = new Sequelize('LinkerDB', 'areeb', 'areeb@1234', {
            host: '192.168.1.110',
            dialect: 'mssql',
            port: 1433
        });
    }

}