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
  avatar: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course'
    }
  ],
  password: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  confirmationToken: String,
  confirmationTokenDate: Date,
  passwordResetToken: String,
  passwordResetDate: Date
});

module.exports = mongoose.model('Lecturer', LecturerSchema);
