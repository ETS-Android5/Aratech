const Department = require('../models/Department');

exports.getDepartments = async (req, res) => {
  const departments = await Department.find().sort({ name: 1 });

  res.status(200).json({
    status: 'success',
    data: {
      departments
    }
  });
};
