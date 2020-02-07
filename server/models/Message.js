const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating MessageSchema
const MessageSchema = new Schema({
  forum_id: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Message', MessageSchema);
