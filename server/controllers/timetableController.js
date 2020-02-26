const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const personalTimetable = require('../models/PersonalTimetable');
const classTimetable = require('../models/ClassTimetable');

// student personal timetable
exports.personalTimetable = async (req, res) => {
  const schema = Joi.object({});
};

//class timetable
exports.classTimetable = async (req, res) => {};
