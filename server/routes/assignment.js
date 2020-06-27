const router = require('express').Router();
const passport = require('passport');

const assignmentController = require('../controllers/assignmentController');

router
  .route('/:courseId')
  .get(
    passport.authenticate('jwt', { session: false }),
    assignmentController.getActiveAssignments
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    assignmentController.createNewAssignment
  );

module.exports = router;
