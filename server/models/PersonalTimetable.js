const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalTimetableSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  events: [
    {
      eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    },
  ],
});

module.exports = mongoose.model('PersonalTimetable', PersonalTimetableSchema);
