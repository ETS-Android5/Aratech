const mongoose = require('mongoose');

const db_uri =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_PROD
    : process.env.DB_URI;

//connect to db
const initDB = () => {
  mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  });

  //check the connection status of the DB
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Unable to connect to DB'));
  db.once('open', () => {
    console.log('Successfully connected to MONGODB');
  });
};

module.exports = initDB;
