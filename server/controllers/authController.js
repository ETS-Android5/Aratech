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
    fName: Joi.string().alphanum().required(),
    lName: Joi.string().alphanum().required(),
    otherNames: Joi.string().alphanum().optional().allow(''),
    email: Joi.string().email().required(),
    indexNo: Joi.number().required(),
    department: Joi.string().required(),
    phoneNo: Joi.string().required(),
    password: Joi.string().min(8).max(32).required(),
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    //error occured validating user input
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  //no error in validating student user input
  //check if user with similar email or index no does not already exist
  const stdEmail = await Student.findOne({ email: req.body.email });
  if (stdEmail) {
    return res.status(400).json({
      status: 'fail',
      message: 'Student with same email already exists',
    });
  }
  const stdIndexNo = await Student.findOne({ indexNo: req.body.indexNo });
  if (stdIndexNo) {
    return res.status(400).json({
      status: 'fail',
      message: 'Student with the same index number already exists',
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

  //expire token after one hour
  student.confirmationTokenExpires = Date.now() + 3600000;

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
      avatar: student.avatar,
      phoneNo: student.phoneNo,
    },
    process.env.SECRET_OR_KEY,
    {
      expiresIn: '2d',
    }
  );

  res.status(201).json({
    status: 'success',
    data: {
      token,
      student,
    },
  });
};

// lecturer signup controller
exports.lecturerSignup = async (req, res) => {
  //validate user input
  const schema = Joi.object({
    fName: Joi.string().alphanum().required(),
    lName: Joi.string().alphanum().required(),
    otherNames: Joi.string().alphanum().optional().allow(''),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(32).required(),
    phoneNo: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    //error occured validating user input
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  //no error in validating lecturer user input
  //check if user with similar email does not already exist
  const lectEmail = await Lecturer.findOne({ email: req.body.email });
  if (lectEmail) {
    return res.status(400).json({
      status: 'fail',
      message: 'Lecturer with same email already exists',
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

  //expire token after one hour
  lecturer.confirmationTokenExpires = Date.now() + 3600000;

  //save the new lecturer document
  await lecturer.save();

  //send user a confirmation email
  mails.sendConfirmationEmail(lecturer.email, lecturer.confirmationToken);

  //sign a token for user
  const token = jwt.sign(
    {
      id: lecturer._id,
      email: lecturer.email,
      avatar: lecturer.avatar,
      phoneNo: lecturer.phoneNo,
    },
    process.env.SECRET_OR_KEY,
    {
      expiresIn: '2d',
    }
  );

  res.status(201).json({
    status: 'success',
    data: {
      token,
      lecturer,
    },
  });
};

//student signin controller
exports.studentSignin = async (req, res) => {
  //validate student login inputs
  const schema = Joi.object({
    indexNo: Joi.number().required(),
    password: Joi.string().min(8).max(32).required(),
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    //error occurred while validating logging inputs
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  // no error occurred in validating loggin inputs
  //check if the user index number exist, if no, direct user to signup
  const student = await Student.findOne({ indexNo: req.body.indexNo });
  if (!student) {
    return res.status(404).json({
      status: 'fail',
      message: 'User is not registered! Please signup first!',
    });
  }
  // compare user input password with password in database
  const passMatch = await bcrypt.compare(req.body.password, student.password);
  if (!passMatch) {
    return res.status(400).json({
      status: 'fail',
      message: 'Password entered is incorrect! Enter the correct password',
    });
  }
  //no err
  //sign a token for user
  const token = jwt.sign(
    {
      id: student._id,
      indexNo: student.indexNo,
      email: student.email,
      avatar: student.avatar,
      phoneNo: student.phoneNo,
    },
    process.env.SECRET_OR_KEY,
    {
      expiresIn: '2d',
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      token,
      student,
    },
  });
};

//lecturer signin controller
exports.lecturerSignin = async (req, res) => {
  //validate lecturer login inputs
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).max(32).required(),
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    //error occurred while validating logging inputs
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  // no error occurred in validating loggin inputs
  //check if the user email exist, if no, direct user to signup
  const lecturer = await Lecturer.findOne({ email: req.body.email }).populate(
    'courses'
  );
  if (!lecturer) {
    return res.status(404).json({
      status: 'fail',
      message: 'User is not registered! Please signup first!',
    });
  }
  // compare user input password with password in database
  const ismatch = await bcrypt.compare(req.body.password, lecturer.password);
  if (!ismatch) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Password entered does not match user passowrd! Enter the correct password',
    });
  }
  //no errors found in entered login inputs
  //sign a token for the user
  const token = jwt.sign(
    {
      id: lecturer._id,
      email: lecturer.email,
      avatar: lecturer.avatar,
      phoneNo: lecturer.phoneNo,
    },
    process.env.SECRET_OR_KEY,
    {
      expiresIn: '2d',
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      token,
      lecturer,
    },
  });
};

exports.addCourseForLecturer = async (req, res) => {
  const { lecturer } = req.user;

  const id = req.body.courseId;
  if (!id) {
    return res.status(400).json({
      status: 'fail',
      message: 'Course Id is required',
    });
  }

  if (!lecturer) {
    return res.status(401).json({
      status: 'fail',
      message: 'Must be logged in as a lecturer to create or add new courses',
    });
  }

  await Lecturer.findByIdAndUpdate(
    lecturer._id,
    {
      $set: {
        courses: [...lecturer.courses, id],
      },
    },
    { upsert: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Course added successfully',
  });
};

//check email verification
exports.verifyEmail = async (req, res) => {
  //get the validation token
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({
      status: 'fail',
      message: 'Must provide a token',
    });
  }

  //query for student or lectuer with same confirmation token
  const student = await Student.findOne({
    confirmationToken: token,
    confirmationTokenExpires: { $gt: Date.now() },
  });
  const lecturer = await Lecturer.findOne({
    confirmationToken: token,
    confirmationTokenExpires: { $gt: Date.now() },
  });

  if (student) {
    student.isEmailVerified = true;
    student.confirmationToken = null;
    student.confirmationTokenExpires = null;

    await student.save();

    return res.status(200).json({
      status: 'success',
      message: 'Email verfied successfully',
    });
  } else if (lecturer) {
    lecturer.isEmailVerified = true;
    lecturer.confirmationToken = null;
    lecturer.confirmationTokenExpires = null;

    await lecturer.save();

    return res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  } else {
    //token does not exist
    return res.status(404).json({
      status: 'fail',
      message: 'Link is invalid or has expired',
    });
  }
};

//forget password controller
exports.forgotPassword = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });

    if (student) {
      //set a password reset token for the student
      const token = crypto.randomBytes(32).toString('hex');
      student.passwordResetToken = token;
      student.passwordResetTokenExpires = Date.now() + 3600000;

      mails.sendPasswordResetMail(student.email, token);

      return res.status(200).json({
        status: 'success',
        message: 'Password reset email successfully sent',
      });
    } else {
      const lecturer = await Lecturer.findOne({ email: req.body.email });
      if (lecturer) {
        //set a password reset token for the student
        const token = crypto.randomBytes(32).toString('hex');
        lecturer.passwordResetToken = token;
        lecturer.passwordResetTokenExpires = Date.now() + 3600000;

        mails.sendPasswordResetMail(lecturer.email, token);

        return res.status(200).json({
          status: 'success',
          message: 'Password reset email successfully sent',
        });
      }
    }
  } catch (error) {
    const lecturer = await Lecturer.findOne({ email: req.body.email });
    if (lecturer) {
      //set a password reset token for the student
      const token = crypto.randomBytes(32).toString('hex');
      lecturer.passwordResetToken = token;
      lecturer.passwordResetTokenExpires = Date.now() + 3600000;

      mails.sendPasswordResetMail(lecturer.email, token);

      return res.status(200).json({
        status: 'success',
        message: 'Password reset email successfully sent',
      });
    }
  }
};

exports.resetPassword = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Must provide a token',
    });
  }

  //query for student or lectuer with same password reset token
  const student = await Student.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });
  const lecturer = await Lecturer.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (student) {
    student.password = req.body.password;

    await student.save();

    return res.status(200).json({
      status: 'success',
      message: 'Password changed successfully',
    });
  } else if (lecturer) {
    lecturer.password = req.body.password;

    await lecturer.save();

    return res.status(200).json({
      status: 'success',
      message: 'Password changed successfully',
    });
  } else {
    //token does not exist
    return res.status(404).json({
      status: 'fail',
      message: 'Link is invalid or has expired',
    });
  }
};

//resend email verification mail
exports.resendVerificationEmail = async (req, res) => {
  //check if logged user is a student or lecturer
  const std = req.user.student;
  const lct = req.user.lecturer;

  if (std) {
    const student = await Student.findById(std._id);

    //generate a new confirmation token for student
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    student.confirmationToken = confirmationToken;
    //expire token after one hour
    student.confirmationTokenExpires = Date.now() + 3600000;

    await student.save();

    //send new verification link
    mails.sendConfirmationEmail(student.email, confirmationToken);

    return res.status(200).json({
      status: 'Success',
      message: 'Confirmation email sent successfully',
    });
  } else if (lct) {
    const lecturer = await Lecturer.findById(lct._id);

    //generate a new confirmation token for lecturer
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    lecturer.confirmationToken = confirmationToken;
    //expire token after one hour
    lecturer.confirmationTokenExpires = Date.now() + 3600000;

    await lecturer.save();

    //send new verification link
    mails.sendConfirmationEmail(lecturer.email, confirmationToken);

    return res.status(200).json({
      status: 'Success',
      message: 'Confirmation email sent successfully',
    });
  }

  res.status(500).json({
    status: 'Failed',
    message: 'Oops... something went wrong, try again later...',
  });
};

//get current user
exports.me = async (req, res) => {
  //check if logged user is a student or lecturer
  const std = req.user.student;
  const lct = req.user.lecturer;

  if (std) {
    return res.status(200).json({
      status: 'Success',
      data: {
        student: std,
      },
    });
  } else if (lct) {
    const lecturer = await Lecturer.findById(lct._id).populate('courses');
    return res.status(200).json({
      status: 'Success',
      data: {
        lecturer,
      },
    });
  }

  //something went wrong here
  res.status(500).json({
    status: 'Failed',
    message: 'Ooops... Something went wrong here.. try again later.',
  });
};

//change user password
exports.changeUserPassword = async (req, res) => {
  const { student, lecturer } = req.user;

  // validate user data
  const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(32).required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }

  if (student) {
    const passMatch = await bcrypt.compare(
      req.body.oldPassword,
      student.password
    );
    if (!passMatch) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Old password invalid!',
      });
    }

    //hash new password
    const password = await bcrypt.hash(req.body.newPassword, 12);
    await Student.findByIdAndUpdate(
      student._id,
      {
        $set: {
          password,
        },
      },
      { upsert: true }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Successfully updated your password',
    });
  } else {
    const passMatch = await bcrypt.compare(
      req.body.oldPassword,
      lecturer.password
    );
    if (!passMatch) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Old password invalid!',
      });
    }

    //hash new password
    const password = await bcrypt.hash(req.body.newPassword, 12);
    await Lecturer.findByIdAndUpdate(
      lecturer._id,
      {
        $set: {
          password,
        },
      },
      { upsert: true }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Successfully updated your password',
    });
  }
};

//set user profile picture
exports.setProfilePic = async (req, res) => {
  const url = req.file.secure_url;

  //check if logged in user is student or lecturer
  const { student, lecturer } = req.user;
  if (student) {
    student.avatar = url;
    await student.save();

    //sign a token for the user
    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
        avatar: student.avatar,
        phoneNo: student.phoneNo,
      },
      process.env.SECRET_OR_KEY,
      {
        expiresIn: '2d',
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        token,
        student,
      },
    });
  } else if (lecturer) {
    lecturer.avatar = url;
    await lecturer.save();

    //sign a token for the user
    const token = jwt.sign(
      {
        id: lecturer._id,
        email: lecturer.email,
        avatar: lecturer.avatar,
        phoneNo: lecturer.phoneNo,
      },
      process.env.SECRET_OR_KEY,
      {
        expiresIn: '2d',
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        token,
        lecturer,
      },
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Ooops.... something went wrong, try again later',
    });
  }
};

//delete student account
exports.deleteStudentAccount = async (req, res) => {
  const { student } = req.user;
  if (!student) {
    return res.status(400).json({
      status: 'fail',
      message: 'Must be logged in as a student to continue',
    });
  }

  //delete user account
  await Student.findByIdAndDelete(student._id);

  res.status(200).json({
    status: 'success',
    message: 'Account successfully deleted',
  });
};
//delete student account
exports.deleteLecturerAccount = async (req, res) => {
  const { lecturer } = req.user;
  if (!lecturer) {
    return res.status(400).json({
      status: 'fail',
      message: 'Must be logged in as a lecturer to continue',
    });
  }

  //delete user account
  await Lecturer.findByIdAndDelete(lecturer._id);

  res.status(200).json({
    status: 'success',
    message: 'Account successfully deleted',
  });
};
