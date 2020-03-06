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

//update personal time table
router.put(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.updatePersonalTimetable
);
router.patch(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.updatePersonalTimetable
);

//delete personal time table
router.delete(
  '/personal',
  passport.authenticate('jwt', { session: false }),
  personalTimetableController.deletePersonalTimeTable
);

module.exports = router;
