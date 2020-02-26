const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassTimetableSchema = new Schema({
  programme: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  lecturer: {
    type: String,
    required: true
  },
  roomLocation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ClassTimetable', ClassTimetableSchema);
