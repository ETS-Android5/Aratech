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

exports.sendPasswordResetMail = async (email, token) => {
  console.log('Sending email...');

  const messageOpts = {
    to: email,
    from: LECTURE_MONITOR_ADMIN,
    text:
      'You are receiving this message becuase you or someone else\n' +
      'Has requested for the password reset of your account. Please click on the link below to reset your password \n' +
      'Or ignore and your password will remain unchanged\n\n' +
      'http://localhost:3000/passwordreset/' +
      token,
    subject: 'Reset your password'
  };

  //send email
  try {
    await sgMail.send(messageOpts);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
}