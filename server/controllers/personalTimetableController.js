const Joi = require('@hapi/joi');

const PersonalTimeTable = require('../models/PersonalTimetable');
const Event = require('../models/Event');

//get user personal time table
exports.getPersonalTimetable = async (req, res) => {
  //check if user is student
  const student = req.user.student;

  if (!student) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Must be logged in as a student to view your personal time table',
    });
  }

  //get user id
  const id = student._id;

  //get user personal time table
  const pTable = await PersonalTimeTable.findOne({
    userId: id,
  }).populate('events.eventId');

  res.status(200).json({
    status: 'success',
    data: {
      personalTimeTable: pTable ? pTable : {},
    },
  });
};
//add to the timetable
exports.addEventToPersonalTimetable = async (req, res) => {
  const student = req.user.student;

  if (!student) {
    return res.status(400).json({
      status: 'fail',
      message: 'Must be logged in as student to add to personal time table',
    });
  }

  //validate user data
  const schema = Joi.object({
    eventName: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.string().required(),
    repeatDaily: Joi.boolean().optional(),
    repeatWeekly: Joi.boolean().optional(),
  });
  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }

  const event = await Event.create(req.body);

  //check if user does not already have a personal time table setup
  const pTable = await PersonalTimeTable.findOne({ userId: student._id });
  if (pTable) {
    //personal time table already exists, push the new event and save it
    pTable.events.push({ eventId: event._id });
    await pTable.save();

    res.status(200).json({
      status: 'success',
      data: {
        personalTimeTable: pTable,
      },
    });
  } else {
    //create a new peronsal timetable and add the event
    const newPT = await PersonalTimeTable.create({
      userId: student._id,
      events: [{ eventId: event._id }],
    });
    res.status(200).json({
      status: 'success',
      data: {
        personalTimeTable: newPT,
      },
    });
  }
};

exports.deleteEventFromPeronsalTable = async (req, res) => {
  //check if user is student
  const student = req.user.student;

  if (!student) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Must be logged in as a student to view your personal time table',
    });
  }

  const id = req.query.id;
  if (!id) {
    return res.status(400).json({
      status: 'fail',
      message: 'Must provide an id',
    });
  }

  const pTable = await PersonalTimeTable.findOne({ userId: student._id });
  if (!pTable) {
    return res.status(400).json({
      status: 'fail',
      message: 'No such event with given ID',
    });
  }

  await Event.findByIdAndDelete(id);

  const events = pTable.events.filter((obj) => {
    return obj.eventId != id;
  });
  await PersonalTimeTable.findOneAndUpdate(
    { userId: student._id },
    {
      events,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Event deleted',
  });
};
