const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating DaysSchema
const DaysSchema = new Schema({
  Name: {
    type: String,
    required: true
  }
});
