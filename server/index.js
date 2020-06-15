const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const departmentRoutes = require('./routes/department');
const timetableRoutes = require('./routes/timetable');
const assignmentRoutes = require('./routes/assignment');
const courseRoutes = require('./routes/course');

//create a basic express application
const app = express();

//configure passport
require('./middlewares/passport');

//connect to db
require('./utils/db')();

//configure middlewares on the server
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(helmet());

//configure application routes
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/courses', courseRoutes);

module.exports = app;
