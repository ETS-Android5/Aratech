const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating CourseSchema
const CourseSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  CourseCode: {
    type: String,
    required: true
  },
  Description: {
    type: String
  }
});

module.exports = mongoose.model('Course', CourseSchema);
