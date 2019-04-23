const express = require('express');
const bodyParser = require("body-parser");
const mailer = require("./actions/mailer");
const app = express();

const PORT = 5000;

/*
 * this tells the app to attach a body object {} to the front end http req and parse any 
 * json data that was included 
 */
app.use(bodyParser.json());

app.get('/send', function(req, res) {
    mailer.sendEmailAlert(req.query.email);
});

app.listen(PORT, () => console.log('server started...'));