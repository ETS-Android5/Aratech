const crypto = require('crypto');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mails = require('../utils/mails');

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

  //generate a confirmation token for user
  const confirmationToken = crypto.randomBytes(32).toString('hex');
  student.confirmationToken = confirmationToken;

  //save the new student doc
  await student.save();

  //send user a confirmation email
  mails.sendConfirmationEmail(student.email, student.confirmationToken);

  //sign a token for user
  const token = jwt.sign(
    {
      id: student._id,
      indexNo: student.indexNo,
      email: student.email,
      phoneNo: student.phoneNo
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

  //create a new lecturer document
  const lecturer = new Lecturer(req.body);
  //hash the user password
  const password = await bcrypt.hash(req.body.password, 12);
  lecturer.password = password;

  //generate a confirmation token for user
  const confirmationToken = crypto.randomBytes(32).toString('hex');
  lecturer.confirmationToken = confirmationToken;

  //save the new lecturer document
  await lecturer.save();

  //send user a confirmation email
  mails.sendConfirmationEmail(lecturer.email, lecturer.confirmationToken);

  //sign a token for user
  const token = jwt.sign(
    {
      id: lecturer._id,
      email: lecturer.email,
      phoneNo: lecturer.phoneNo
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

//student signin controller
exports.studentSignin = async (req, res) => {
  //validate student login inputs
  const schema = Joi.object({
    indexNo: Joi.number().required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required()
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    //error occurred while validating logging inputs
    return res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }

  // no error occurred in validating loggin inputs
  //check if the user index number exist, if no, direct user to signup
  const student = await Student.findOne({ indexNo: req.body.indexNo });
  if (!student) {
    return res.status(404).json({
      status: 'fail',
      message: 'User is not registered! Please signup first!'
    });
  }
  // compare user input password with password in database
  const passMatch = await bcrypt.compare(req.body.password, student.password);
  if (!passMatch) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password entered is incorrect! Enter the correct password'
    });
  }
  //no err
  //sign a token for user
  const token = jwt.sign(
    {
      id: student._id,
      indexNo: student.indexNo,
      email: student.email,
      phoneNo: student.phoneNo
    },
    process.env.SECRET_OR_KEY,
    {
      expiresIn: '2d'
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      token,
      student
    }
  });
};

//lecturer signin controller
exports.lecturerSignin = async (req, res) => {
  //validate lecturer login inputs
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required()
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    //error occurred while validating logging inputs
    return res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }

  // no error occurred in validating loggin inputs
  //check if the user email exist, if no, direct user to signup
  const lecturer = await Lecturer.findOne({ email: req.body.email });
  if (!lecturer) {
    return res.status(404).json({
      status: 'fail',
      message: 'User is not registered! Please signup first!'
    });
  }
  // compare user input password with password in database
  const ismatch = await bcrypt.compare(req.body.password, lecturer.password);
  if (!ismatch) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Password entered does not match user passowrd! Enter the correct password'
    });
  }
  //no errors found in entered login inputs
  //sign a token for the user
  const token = jwt.sign(
    {
      id: lecturer._id,
      email: lecturer.email,
      phoneNo: lecturer.phoneNo
    },
    process.env.SECRET_OR_KEY,
    {
      expiresIn: '2d'
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      token,
      lecturer
    }
  });
};
//Student Sign in controller
