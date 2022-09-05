const express = require('express');
const {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/events.controller');

const router = express.Router();

router.route('/').get(getEvents).post(createEvent);

router.route('/:id').get(getEventById).patch(updateEvent).delete(deleteEvent);

module.exports = router;
