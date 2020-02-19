const router = require('express').Router();
const authController = require('../controllers/authController');

//@POST
//sign up user
router.post('/students/register', authController.studentSignup);
router.post('/lecturers/register', authController.lecturerSignup);

//Login
router.post('/students/login', authController.studentlogin);
router.post('/lecturers/login', authController.lecturerlogin);


  


module.exports = router;
