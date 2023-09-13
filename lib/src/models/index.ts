import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'database';
const config = require(__dirname + '../../../../sequelize/config')['database'];

const sequelize = config.url
    ? new Sequelize(config.url, config)
    : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

