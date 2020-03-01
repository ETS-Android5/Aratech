const router = require('express').Router();
const passport = require('passport');

const personalTimetableController = require('../controllers/personalTimetableController');

//get student personal timetable
router.get(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.getPersonalTimetable
);

//create a new personal time table
router.post(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.createPersonalTimeTable
);

module.exports = router;
