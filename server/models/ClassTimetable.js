const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassTimetableSchema = new Schema({
  programme: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  events: [
    {
      eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    },
  ],
});

module.exports = mongoose.model('ClassTimetable', ClassTimetableSchema);
