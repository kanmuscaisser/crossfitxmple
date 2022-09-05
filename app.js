const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const config = require('./config');
const router = require('./routes');

const app = express();

// Global Middlewares
// Implement CORS
app.use(cors()); // Access-Control-Allow-Origin *
app.options('*', cors());

//logs
if (config.dev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('short'));
}

//Body-parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//Cooike-parser
app.use(cookieParser());

//Router
router(app);

module.exports = app;
