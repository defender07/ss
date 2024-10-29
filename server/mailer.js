// mailer.js
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // For Gmail
  port: 587, // For TLS
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'vyshnavk891@gmail.com', // Your email
    pass: '662474856574', // Your email password or app password
  },
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'vyshnavk891@gmail.com', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
