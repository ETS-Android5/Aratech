require('dotenv').config();

const app = require('./index');

//start the server to listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//catch unhandled promise rejections
process.on('unhandledRejection', err => {
  console.error(err);
  console.log('Unhandled rejection, server terminating...');
  process.exit(1);
});
