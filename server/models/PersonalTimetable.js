const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalTimetableSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  monday: [
    {
      event: {
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
    }
  ],
  tuesday: [
    {
      event: {
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
    }
  ],
  wednesday: [
    {
      event: {
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
    }
  ],
  thursday: [
    {
      event: {
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
    }
  ],
  friday: [
    {
      event: {
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
    }
  ],
  saturday: [
    {
      event: {
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
    }
  ],
  sunday: [
    {
      event: {
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
    }
  ]
});

module.exports = mongoose.model('PersonalTimetable', PersonalTimetableSchema);
