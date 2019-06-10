const express = require('express');
const bodyParser = require("body-parser");
const mail = require("./actions/mailer");
const phone = require("./actions/texter")
const app = express();

const PORT = 5000;

/*
 * this tells the app to attach a body object {} to the front end http req and parse any 
 * json data that was included 
 */
app.use(bodyParser.json());

//send email from server to notify when the user has gone above their energy threshold
app.get('/sendAlert', function(req, res) {
	console.log(req.query.appliance);
    mail.sendEmailAlert(req.query.email, req.query.appliance);
});

//send email from server to notify when the user has an upcoming ohm hour
app.get('/sendWarning', function(req, res) {
    mail.sendEmailWarning(req.query.email, req.query.hr, req.query.min);
});

app.get('/sendPhoneAlert', function(req, res) {
    phone.sendPhoneAlert(req.query.numbers, req.query.appliance);
});

//send sms from server to notify when the user has an upcoming ohm hour
app.get('/sendPhoneWarning', function(req, res) {
    phone.sendPhoneWarning(req.query.numbers, req.query.hr, req.query.min);
});

app.listen(PORT, () => console.log('server started...'));