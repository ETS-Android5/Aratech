const { model, Schema } = require('mongoose');

const EventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  repeatDaily: {
    type: Boolean,
    default: false,
  },
  repeatWeekly: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Event', EventSchema);
