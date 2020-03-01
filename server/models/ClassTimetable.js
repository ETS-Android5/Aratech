const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassTimetableSchema = new Schema({
  programme: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  monday: [
    {
      course: {
        courseName: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
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
          type: Schema.Types.ObjectId,
          ref: 'Lecturer',
          required: true
        },
        roomLocation: {
          type: String,
          required: true
        }
      }
    }
  ],
  tuesday: [
    {
      course: {
        courseName: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
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
          type: Schema.Types.ObjectId,
          ref: 'Lecturer',
          required: true
        },
        roomLocation: {
          type: String,
          required: true
        }
      }
    }
  ],
  wednesday: [
    {
      course: {
        courseName: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
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
          type: Schema.Types.ObjectId,
          ref: 'Lecturer',
          required: true
        },
        roomLocation: {
          type: String,
          required: true
        }
      }
    }
  ],
  thursday: [
    {
      course: {
        courseName: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
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
          type: Schema.Types.ObjectId,
          ref: 'Lecturer',
          required: true
        },
        roomLocation: {
          type: String,
          required: true
        }
      }
    }
  ],
  friday: [
    {
      course: {
        courseName: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
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
          type: Schema.Types.ObjectId,
          ref: 'Lecturer',
          required: true
        },
        roomLocation: {
          type: String,
          required: true
        }
      }
    }
  ],
  saturday: [
    {
      course: {
        courseName: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
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
          type: Schema.Types.ObjectId,
          ref: 'Lecturer',
          required: true
        },
        roomLocation: {
          type: String,
          required: true
        }
      }
    }
  ],
  sunday: [
    {
      course: {
        courseName: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
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
          type: Schema.Types.ObjectId,
          ref: 'Lecturer',
          required: true
        },
        roomLocation: {
          type: String,
          required: true
        }
      }
    }
  ]
});

module.exports = mongoose.model('ClassTimetable', ClassTimetableSchema);
