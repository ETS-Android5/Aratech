const router = require('express').Router();
const authController = require('../controllers/authController');

//@POST
//sign up user
router.post('/students/register', authController.studentSignup);
router.post('/lecturers/register', authController.lecturerSignup);

// user log in
router.post('/students/login', authController.studentSignin);
router.post('/lecturers/login', authController.lecturerSignin);

//verify email
router.post('/verifyemail', authController.verifyEmail);

//forgot password
router.post('/forgotpassword', authController.forgotPassword);

module.exports = router;
