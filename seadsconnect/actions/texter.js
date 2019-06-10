// Twilio Credentials (very insecure right now!!!)
const accountSid = 'AC6b57b40315fa2d189dc6c5bfe687ccf1';
const authToken = '7652429c131d90652f8a6ee163bffd12';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);


function sendPhoneAlert(phone, appliance) {
	client.messages
	.create({
	  	body: 'Your Ohm Hour is coming up on ___ at ____!',
	    to: phone,
	    from: '+18312160330'
	}).then(message => console.log(message.sid));
}

function sendPhoneWarning(phone, hr, min) {
	console.log(phone);
	client.messages
	.create({
	  	body: 'You\'re over your threshold!',
	    to: phone,
	    from: '+18312160330'
	}).then(message => console.log(message.sid));
}

module.exports = {sendPhoneWarning, sendPhoneAlert};