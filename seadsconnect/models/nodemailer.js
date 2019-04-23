const nodemailer = require('nodemailer');
import Keys from './keys'
//const config = require('../config/keys');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Keys.ADMIN_EMAIL,
        pass: Keys.ADMIN_EMAIL_PASSWORD,
    },
});

const mailOptions = {
    from: 'seadsconnectalert@gmail.com',
    subject: 'Warning! Energy usage high!',
    text: 'SEADConnect has detect a high amount of energy usage during your ohm our! Consider reducing power consumption.',
};

module.exports = {
    transporter,
    mailOptions,
};