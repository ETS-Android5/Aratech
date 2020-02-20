const Department = require('../models/Department');

exports.getDepartments = async (req, res) => {
  const departments = await Department.find();

  res.status(200).json({
    status: 'success',
    data: {
      departments
    }
  });
};
