const Course = require('../models/Course');

//get all courses
exports.getAllCourses = async (req, res, next) => {
  const courses = await Course.find();

  res.status(200).json({
    status: 'success',
    data: {
      courses,
    },
  });
};

//get a single course
exports.getSingleCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      status: 'fail',
      message: 'No such course with given ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      course,
    },
  });
};
