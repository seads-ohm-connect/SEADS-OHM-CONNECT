const nodemailer = require("../models/nodemailer");

//params: email address, appliance that makes the user's energy level exceed threshold.
function sendEmailAlert(email, appliance) {
    const { transporter, mailOptionsAlert, mailOptionsWarning } = nodemailer;
    var contents = 'SEADConnect has detected a high amount of energy usage during your OhmHour!';

    if (appliance !== "undefined") {
      contents += '\nIt looks like the last appliance turned on was the ' + appliance + '. Consider turning it off to reduce power consumption.'
    }

    const options = { ...mailOptionsAlert, text: contents, to: email };
    transporter.sendMail(options, function(err, info) {
      if (err) {
        console.error("unable to send alert email");
      } 
      // can do something with info here
    });
}

function sendEmailWarning(email, hr, min) {
    const { transporter, mailOptionsAlert, mailOptionsWarning } = nodemailer;
    var hour     = hr > 0 ? hr + ' hour' + (hr > 1 ? 's' : '') : '';
    var minutes  = min > 0 ? " " + min + ' minutes' : ' 00 minutes';  
    var header   = 'Upcoming OhmHour in: ' + hour + " " + minutes + "!";
    var contents = 'An OhmHour is approaching!';

    const options = { ...mailOptionsAlert, subject: header, text: contents, to: email };
    transporter.sendMail(options, function(err, info) {
      if (err) {
        console.error("unable to send alert email");
      } 
      // can do something with info here
    });
}


module.exports = {sendEmailWarning, sendEmailAlert};