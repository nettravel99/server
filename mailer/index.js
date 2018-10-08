var nodemailer = require("nodemailer");

const from = '"CRM Application"    <info@crm.com>';

function setUp() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // host: process.env.EMAIL_HOST,
  // port: process.env.EMAIL_PORT,
  // auth: {
  //   user: process.env.EMAIL_USER,
  //   pass: process.env.EMAIL_PASS

  // host: `${process.env.EMAIL_HOST}`,
  // port: `${process.env.EMAIL_PORT}`,
  // auth: {
  //   user: `${process.env.EMAIL_USER}`,
  //   pass: `${process.env.EMAIL_PASS}`
  // }
}

function sendConfirmationEmail(user) {
  const transport = setUp();
  const confirmationURL = `${process.env.HOST}/confirmation/${
    user.confirmationToken
  }`;
  const email = {
    from,
    to: user.email,
    subject: "Welcome to CRM application",
    text: `Welcome to CRM. Please confirm your email.
      ${confirmationURL} ` // for more advanced options use email templates.
  };

  transport.sendMail(email);
}

module.exports = sendConfirmationEmail;
