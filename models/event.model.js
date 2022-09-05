const mongoose = require('mongoose');
const slugify = require('slugify');

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An event must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        50,
        'An event name must have less or equal than 50 characters',
      ],
      minlength: [
        10,
        'An event name must have more or equal than 10 characters',
      ],
    },
    slug: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, 'An event must have a duration'],
    },
    imageCover: {
      type: String,
    },
    startDate: {
      type: Date,
      required: [true, 'An event must have start date'],
    },
    price: {
      type: Number,
      required: [true, 'An event must have a price'],
    },
    categories: {
      type: [String],
      enum: ['RX', 'Elite', 'Scaled'],
      required: [true, 'An event must have categories'],
    },
    description: {
      type: String,
      trim: true,
    },
    judges: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    director: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Mongoose DB middleware
eventSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Mongoose Query Middleware
eventSchema.pre(/^find/, function (next) {
  //this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

eventSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
