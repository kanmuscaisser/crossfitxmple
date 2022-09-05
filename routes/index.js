const express = require('express');
const config = require('../config');
const eventsRouter = require('./events.router');
const usersRouter = require('./users.router');

function router(app) {
  const router = express.Router();
  app.use(config.baseUrl, router);

  router.use('/events', eventsRouter);
  router.use('/users', usersRouter);
}

module.exports = router;
