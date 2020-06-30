const Joi = require('@hapi/joi');

const Assignment = require('../models/Assignment');

exports.getActiveAssignments = async (req, res) => {
  const courseId = req.params.courseId;

  const assignments = await Assignment.find({
    course: courseId,
    submitted: false,
  });
  res.status(200).json({
    status: 'success',
    data: {
      assignments,
    },
  });
};

exports.createNewAssignment = async (req, res) => {
  const { lecturer } = req.user;

  if (!lecturer) {
    return res.status(401).json({
      status: 'fail',
      message: 'Must be a lecturer to create assignments',
    });
  }

  const courseId = req.params.courseId;

  if (!courseId) {
    return res.status(400).json({
      status: 'fail',
      message: 'Course Id must be present',
    });
  }

  // validate user data
  const schema = Joi.object({
    deadline: Joi.date().required(),
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  const assignment = await Assignment.create({
    ...req.body,
    file: req.file.secure_url,
    course: courseId,
  });

  res.status(200).json({
    status: 'success',
    data: {
      assignment,
    },
  });
};
