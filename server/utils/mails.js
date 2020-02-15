const sgMail = require('@sendgrid/mail');

const LECTURE_MONITOR_ADMIN = 'admin@lecturemonitor.com';

//set up sendgrid
sgMail.setApiKey(process.env.SG_API_KEY);

//confirmation email
exports.sendConfirmationEmail = (email, confirmationToken) => {
  console.log('Sending email...');
  //message options
  const messageOpts = {
    to: email,
    from: LECTURE_MONITOR_ADMIN,
    message:
      'You are receiving this email to confirm your account registered with \n' +
      'LECTURE MONITOR. Please click on the link below or copy and paste in your browser to\n' +
      'Complete the verification process\n\n' +
      `${process.env.FRONTEND_URL}/confirmemail/${confirmationToken}`,
    subject: 'Confirm your email'
  };

  //send email
  sgMail.send(messageOpts).then(sent => {
    if (sent) {
      console.log('Email sent');
    }
  });
};
