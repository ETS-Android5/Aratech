const router = require('express').Router();
const passport = require('passport');

const assignmentController = require('../controllers/assignmentController');
const uploadMiddleware = require('../utils/upload');

router
  .route('/:courseId')
  .get(
    passport.authenticate('jwt', { session: false }),
    assignmentController.getActiveAssignments
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    uploadMiddleware.single('file'),
    assignmentController.createNewAssignment
  );

module.exports = router;
