const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating LecturerSchema
const LecturerSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  otherNames: String,
  password: {
    type: String,
    required: true
  },
  phoneNo: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Lecturer', LecturerSchema);
