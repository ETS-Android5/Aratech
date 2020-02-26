const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalTimetableSchema = new Schema({
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
  }
});

module.exports = mongoose.model('PersonalTimetable', PersonalTimetableSchema);
