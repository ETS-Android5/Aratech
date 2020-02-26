const router = require('express').Router();
const authController = require('../controllers/authController');

//@POST
//sign up user
router.post('/students/register', authController.studentSignup);
router.post('/lecturers/register', authController.lecturerSignup);

//Login
router.post('/students/login', authController.studentlogin);
router.post('/lecturers/login', authController.lecturerlogin);


  


//verify email
router.post('/verifyemail', authController.verifyEmail);

//forgot password
router.post('/forgotpassword', authController.forgotPassword);

//reset password
router.post('/resetpassword', authController.resetPassword);

module.exports = router;
