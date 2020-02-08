const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({});

module.exports = mongoose.model('Timetable', TimetableSchema);
