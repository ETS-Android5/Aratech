const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Student = require('../models/Student');
const Lecturer = require('../models/Lecturer');

// student signup controller
exports.studentSignup = async (req, res) => {
  //validate user input
  const schema = Joi.object({
    fName: Joi.string()
      .alphanum()
      .required(),
    lName: Joi.string()
      .alphanum()
      .required(),
    otherNames: Joi.string().alphanum(),
    email: Joi.string()
      .email()
      .required(),
    indexNo: Joi.number().required(),
    department: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required(),
    phoneNo: Joi.string().required(),
    level: Joi.number().required()
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    //error occured validating user input
    return res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }

  //no error in validating student user input
  //check if user with similar email or index no does not already exist
  const stdEmail = await Student.findOne({ email: req.body.email });
  if (stdEmail) {
    return res.status(400).json({
      status: 'fail',
      message: 'Student with same email already exists'
    });
  }
  const stdIndexNo = await Student.findOne({ indexNo: req.body.indexNo });
  if (stdIndexNo) {
    return res.status(400).json({
      status: 'fail',
      message: 'Student with the same index number already exists'
    });
  }

  //create a new student doc
  const student = new Student(req.body);
  //hash the user password
  const password = await bcrypt.hash(req.body.password, 12);
  student.password = password;

  //save the new student doc
  await student.save();

  //todo: send the user an email to confirm the email

  //sign a token for user
  const token = jwt.sign(
    {
      id: student._id
    },
    process.env.SECRET_OR_KEY,
    {
      expiresIn: '2d'
    }
  );

  res.status(201).json({
    status: 'success',
    data: {
      token,
      student
    }
  });
};

// lecturer signup controller
exports.lecturerSignup = async (req, res) => {
  //validate user input
  const schema = Joi.object({
    fName: Joi.string()
      .alphanum()
      .required(),
    lName: Joi.string()
      .alphanum()
      .required(),
    otherNames: Joi.string().alphanum(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required(),
    phoneNo: Joi.string().required(),
    courses: Joi.array().items(Joi.string().required())
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    //error occured validating user input
    return res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }

  //no error in validating lecturer user input
  //check if user with similar email does not already exist
  const lectEmail = await Lecturer.findOne({ email: req.body.email });
  if (lectEmail) {
    return res.status(400).json({
      status: 'fail',
      message: 'Lecturer with same email already exists'
    });
  }

  //create a new lecturer doc
  const lecturer = new Lecturer(req.body);
  //hash the user password
  const password = await bcrypt.hash(req.body.password, 12);
  lecturer.password = password;

  //save the new student doc
  await lecturer.save();

  //todo: send the user an email to confirm the email

  //sign a token for user
  const token = jwt.sign(
    {
      id: lecturer._id
    },
    process.env.SECRET_OR_KEY,
    {
      expiresIn: '2d'
    }
  );

  res.status(201).json({
    status: 'success',
    data: {
      token,
      lecturer
    }
  });
};
