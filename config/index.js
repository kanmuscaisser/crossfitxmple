const dotenv = require('dotenv');
dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL || '/api',
  database: process.env.DATABASE,
  dbUserName: process.env.DATABASE_USERNAME,
  dbPassword: process.env.DATABASE_PASSWORD,
};

module.exports = config;
