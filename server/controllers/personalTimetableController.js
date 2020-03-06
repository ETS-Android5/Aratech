const Joi = require('@hapi/joi');

const PersonalTimeTable = require('../models/PersonalTimetable');

//get user personal time table
exports.getPersonalTimetable = async (req, res) => {
  //check if user is student
  const student = req.user.student;

  if (!student) {
    return res.status(400).json({
      status: 'fail',
      message: 'Must be logged in as a student to view your personal time table'
    });
  }

  //get user id
  const id = student._id;

  //get user personal time table
  const pTable = await PersonalTimeTable.findOne({
    userId: id
  });
  if (!pTable) {
    //user does not have a personal time table yet
    return res.status(404).json({
      status: 'fail',
      message:
        'User does not have a personal time table yet, please create one!'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      personalTimeTable: pTable
    }
  });
};

//create a new personal time table
exports.createPersonalTimeTable = async (req, res) => {
  //check if logged user is a student
  const student = req.user.student;

  if (!student) {
    return res.status(400).json({
      status: 'failed',
      message:
        'Must be logged in as a student to create your personal time table'
    });
  }

  //get student ID
  const id = student._id;

  //check if student does not already have a personal time table
  const pTable = await PersonalTimeTable.findOne({ userId: id });
  if (pTable) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Already has a personal time table, consider modifying it instead'
    });
  }

  //validate incoming data
  const schema = Joi.schema({
    monday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    tuesday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    wednesday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    thursday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    friday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    saturday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    sunday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required()
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    //error occurred while validating time table setup inputs
    return res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
  // create   new  personal timetable document
  const newPTable = new PersonalTimeTable(req.body);
  newPTable.userId = id;
  // save the created document
  await newPTable.save();

  res.status(201).json({
    status: 'success',
    data: {
      personalTimeTable: newPTable
    }
  });
};

//update personal time table
exports.updatePersonalTimetable = async (req, res) => {
  //check if logged user is a student
  const student = req.user.student;

  if (!student) {
    return res.status(400).json({
      status: 'failed',
      message:
        'Must be logged in as a student to create your personal time table'
    });
  }

  //get student ID
  const id = student._id;

  //check if student does not already have a personal time table
  const pTable = await PersonalTimeTable.findOne({ userId: id });
  if (!pTable) {
    return res.status(404).json({
      status: 'fail',
      message:
        'User does not have a personal time table, please create a new one!'
    });
  }

  //validate incoming data
  const schema = Joi.schema({
    monday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    tuesday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    wednesday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    thursday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    friday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    saturday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required(),
    sunday: Joi.array()
      .items(
        Joi.object({
          event: Joi.string().required(),
          startTime: Joi.date().required(),
          endTime: Joi.date().required()
        })
      )
      .required()
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    //error occurred while validating time table setup inputs
    return res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }

  //update time table
  try {
    await pTable.update(req.body);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      personalTimeTable: pTable
    }
  });
};

//delete personal time table
exports.deletePersonalTimeTable = async (req, res) => {
  //check if logged user is a student
  const student = req.user.student;

  if (!student) {
    return res.status(400).json({
      status: 'failed',
      message:
        'Must be logged in as a student to create your personal time table'
    });
  }

  //get student ID
  const id = student._id;

  //check if student does not already have a personal time table
  const pTable = await PersonalTimeTable.findOne({ userId: id });
  if (!pTable) {
    return res.status(400).json({
      status: 'fail',
      message: 'User does not have a personal time table'
    });
  }

  await pTable.remove();

  res.status(200).json({
    status: 'sucess',
    message: 'Personal time table deleted, can create a new one now'
  });
};
