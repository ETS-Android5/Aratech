const router = require('express').Router();
const authController = require('../controllers/authController');

//@POST
//sign up user
router.post('/student/register', authController.studentSignup);

module.exports = router;
