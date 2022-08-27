const dotenv = require('dotenv');
dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
};

module.exports = config;
