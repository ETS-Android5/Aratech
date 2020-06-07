const Joi = require('@hapi/joi');

const Assignment = require('../models/Assignment');
const Event = require('../models/Assignment');

// Creating an assignment. this is done by the Lecturer
exports.addToAssignment = async (req, res) => {
    const Lecturer = req.user.Lecturer;
  
    // check if user is the Lecturer
    if (!Lecturer) {
        return res.status(403).json({
          status: 'fail',
          message:
            'Unauthorized, must be a Lecturer to add an Assignment',
        });
      }
      //validate user data
  const schema = Joi.object({
    course: Joi.string().required(),
    deadline: Joi.string().required(),
    content: Joi.date().required(),
    submissionType: Joi.string().required(),
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

  //create a new Assignment
  const newCT = await Assignment.create({
    course: student.department,
    events: [{ eventId: event._id }],
  });
  res.status(200).json({
    status: 'success',
    data: {
      Assignment: newCT,
    },
  });
};

exports.getAssignment = async (req, res) => {
    //check if user is student
    const student = req.user.student;
  
    if (!student) {
      return res.status(400).json({
        status: 'fail',
        message:
          'Must be logged in as a student to view your Assignment',
      });
    }
  
    //get user Assignment
    const cTable = await Assignment.findOne({
      course: student.department,
    }).populate('eventId');
    res.status(200).json({
      status: 'success',
      data: {
        Assignment: cTable ? cTable : {},
      },
    });
  };

// Deleting and Updating an Assignment,Only done by the Lecturer
exports.deleteFromAssignment = async (req, res) => {
    const student = req.user.student;
    // Check if user is a Lecturer
    if (!Lecturer) {
        return res.status(403).json({
          status: 'fail',
          message:
            'Unauthorized, must be a Lecturer to delete an Assignment',
        });
      }
      // Get the Assignment
  const Assignment = await Assignment.findOne({
    course: student.department,
  });

  //get ID of event to be deleted
  const { eventId } = req.params;
  await Event.findOneAndDelete({ _id: eventId });

  //remove event ID from Assignment
  Assignment.events = Assignment.events.filter(
    (event) => event.eventId !== eventId
  );
  await Assignment.save();

  res.status(200).json({
    status: 'success',
    message: 'Event removed successfully',
  });
};
