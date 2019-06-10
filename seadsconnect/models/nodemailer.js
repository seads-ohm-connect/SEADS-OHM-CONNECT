/*
    This file sets up the emailer to send through gmail.
*/
const Keys = require('../keys');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Keys.ADMIN_EMAIL,
        pass: Keys.ADMIN_EMAIL_PASSWORD,
    },
});

const mailOptionsAlert = {
    from: 'seadsconnectalert@gmail.com',
    subject: 'Alert! Energy usage high!',
};

const mailOptionsWarning = {
    from: 'seadsconnectalert@gmail.com',
    subject: 'Up Comming OhmHour!'
};

module.exports = {
    transporter,
    mailOptionsAlert,
    mailOptionsWarning
};