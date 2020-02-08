const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating DaysSchema
const DaysSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});
