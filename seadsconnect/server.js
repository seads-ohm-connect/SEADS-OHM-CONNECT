const express = require('express');
const bodyParser = require("body-parser");
const mail = require("./actions/mailer");
const app = express();

const PORT = 5000;

/*
 * this tells the app to attach a body object {} to the front end http req and parse any 
 * json data that was included 
 */
app.use(bodyParser.json());

//send email from server to notify when the user has gone above their energy threshold
app.get('/sendAlert', function(req, res) {
    mail.sendEmailAlert(req.query.email);
});

//send email from server to notify when the user has an upcoming ohm hour
app.get('/sendWarning', function(req, res) {
	console.log('sdfsdf');
    mail.sendEmailWarning(req.query.email, req.query.hr, req.query.min);
});

app.listen(PORT, () => console.log('server started...'));