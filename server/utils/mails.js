const sgMail = require('@sendgrid/mail');

const LECTURE_MONITOR_ADMIN = 'admin@lecturemonitor.com';

//set up sendgrid
sgMail.setApiKey(process.env.SG_API_KEY);

//confirmation email
exports.sendConfirmationEmail = async (email, confirmationToken) => {
  console.log('Sending email...');
  //message options
  const messageOpts = {
    to: email,
    from: LECTURE_MONITOR_ADMIN,
    text:
      'You are receiving this email to confirm your account registered with \n' +
      'LECTURE MONITOR. Please click on the link below or copy and paste in your browser to\n' +
      'Complete the verification process\n\n' +
      'http://localhost:3000/confirmemail/' +
      confirmationToken,
    subject: 'Confirm Your Email'
  };

  //send email
  try {
    await sgMail.send(messageOpts);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
};
