const router = require('express').Router();
const authController = require('../controllers/authController');

//@POST
//sign up user
router.post('/students/register', authController.studentSignup);
router.post('/lecturers/register', authController.lecturerSignup);

// user log in
router.post('/students/login', authController.studentSignin);
router.post('/lecturers/login', authController.lecturerSignin);

module.exports = router;
