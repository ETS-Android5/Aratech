const Joi = require('@hapi/joi');

const Course = require('../models/Course');

//get all courses
exports.getAllCourses = async (req, res) => {
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

//create a new course
exports.createNewCourse = async (req, res) => {
  const { lecturer } = req.user;

  if (!lecturer) {
    return res.status(401).json({
      status: 'Failed',
      message: 'You must be logged in as a lecturer to create a course',
    });
  }

  //validate data
  const schema = Joi.object({
    name: Joi.string().required(),
    courseCode: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }

  const course = await Course.findOne({
    courseCode: req.body.courseCode,
  });

  if (course) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Course with same course code already exists',
    });
  }

  const newCourse = await Course.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      course: newCourse,
    },
  });
};
