const router = require('express').Router();
const departmentController = require('../controllers/departmentController');

//get all departments
router.get('/', departmentController.getDepartments);

module.exports = router;
