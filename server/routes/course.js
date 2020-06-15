const router = require('express').Router();
const passport = require('passport');

const courseController = require('../controllers/courseController');

router
  .route('/')
  .get(courseController.getAllCourses) //get all courses
  .post(
    passport.authenticate('jwt', { session: false }),
    courseController.createNewCourse
  ); //create a new course

router.get('/:id', courseController.getSingleCourse);

module.exports = router;
