const passport = require('passport');

const router = require('express').Router();
const authController = require('../controllers/authController');

//@POST
//sign up user
router.post('/students/register', authController.studentSignup);
router.post('/lecturers/register', authController.lecturerSignup);

//Login
router.post('/students/login', authController.studentSignin);
router.post('/lecturers/login', authController.lecturerSignin);

//verify email
router.post('/verifyemail', authController.verifyEmail);

//forgot password
router.post('/forgotpassword', authController.forgotPassword);

//reset password
router.post('/resetpassword', authController.resetPassword);

//resend email confirmation link
router.post(
  '/resendemailverify',
  passport.authenticate('jwt', { session: false }),
  authController.resendVerificationEmail
);

module.exports = router;
