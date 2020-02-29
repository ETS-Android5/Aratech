const router = require('express').Router();
const timetableController = require('../controllers/timetableController');

//@POST
//personal and class timetable setup
router.post('/personaltimetable', timetableController.personalTimetableSetup);
router.post('/classtimetable', timetableController.classTimetableSetup);

module.exports = router;
