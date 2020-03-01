const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const personalTimetable = require('../models/PersonalTimetable');
const classTimetable = require('../models/ClassTimetable');

// student personal timetable
exports.personalTimetableSetup = async (req, res) => {
  const schema = Joi.object({});
};

//class timetable
exports.classTimetableSetup = async (req, res) => {};
