const nodemailer = require("../models/nodemailer");

const mailer = {
  sendEmailAlert: function(email) {
    const { transporter, mailOptions } = nodemailer;

    const options = { ...mailOptions, to: email };
    transporter.sendMail(options, function(err, info) {
      if (err) {
        console.error("unable to send alert email");
      } 
      // can do something with info here
    });
  }
};

module.exports = mailer;