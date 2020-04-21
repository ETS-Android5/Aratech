const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating ForumSchema
const ForumSchema = new Schema({
  course: {
    type: String,
    required: true
  },
  message: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }
});

module.exports = mongoose.model('Forum', ForumSchema);
