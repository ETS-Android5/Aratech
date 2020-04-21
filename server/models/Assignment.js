const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  deadline: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  submssionType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
