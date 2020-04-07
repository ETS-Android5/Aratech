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

<<<<<<< HEAD
//create a new new class timetable
router.post(
  '/classTimetable',
  passport.authenticate('jwt', { session: false }),
  classTimetableController.createclassTimetable
=======
//delete event in personal time table
router.delete(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.deleteEventFromPeronsalTable
>>>>>>> master
);

module.exports = router;
