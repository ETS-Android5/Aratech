const router = require('express').Router();
const passport = require('passport');

const personalTimetableController = require('../controllers/personalTimetableController');

//get student personal timetable
router.get(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.getPersonalTimetable
);

//add a new event to peronal time table
router.post(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.addEventToPersonalTimetable
);

//delete event in personal time table
router.delete(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.deleteEventFromPeronsalTable
);

module.exports = router;
