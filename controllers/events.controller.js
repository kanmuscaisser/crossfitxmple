const Event = require('../models/event.model');

exports.getEvents = async (req, res, next) => {
  const events = await Event.find();
  res.status(200).json({
    message: 'Events Retrieved',
    results: events.length,
    data: {
      events,
    },
  });
};

exports.getEventById = async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) {
    res.status(404).json({
      message: `Event with id: ${id} doesn't exist`,
    });
    return;
  }
  res.status(200).json({
    message: 'Event Retrieved',
    data: {
      event,
    },
  });
};

exports.createEvent = async (req, res, next) => {
  const { body } = req;
  const newEvent = await Event.create(body);
  res.status(201).json({
    message: 'Event created',
    data: {
      event: newEvent,
    },
  });
};
exports.updateEvent = () => {};
exports.deleteEvent = () => {};
