const router = require('express').Router();
const timetableController = require('../controllers/timetableController');

//@POST
//personal and class timetable setup
post.Router('/personaltimetable', timetableController.personalTimetableSetup);
post.Router('/classtimetable', timetableController.classTimetableSetup);

module.exports = router;
