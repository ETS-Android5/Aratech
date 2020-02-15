const router = require('express').Router();
const authController = require('../controllers/authController');

//@POST
//sign up user
router.post('/students/register', authController.studentSignup);

module.exports = router;
