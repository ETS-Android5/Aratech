const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');

//create a basic express application
const app = express();

//configure passport
require('./middlewares/passport');

//connect to db
require('./utils/db')();

//configure middlewares on the server
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(helmet());

//configure application routes
app.use('/api/auth', authRoutes);

module.exports = app;
