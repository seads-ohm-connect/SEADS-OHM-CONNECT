// Twilio Credentials (very insecure right now!!!)
const accountSid = 'AC6b57b40315fa2d189dc6c5bfe687ccf1';
const authToken = '7652429c131d90652f8a6ee163bffd12';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);


function sendPhoneAlert(phone) {
	client.messages.create(
	  {
	    to: phone,
	    from: '+18312160330',
	    body: 'Your Ohm Hour is coming up on ___ at ____!',
	  }
	).then(message => console.log(message.sid));
}

function sendPhoneWarning(phone, hr, min) {
	console.log(phone);
	client.messages.create(
	  {
	    to: phone,
	    from: '+18312160330',
	    body: 'You\'re over your threshold!',
	  }
	).then(message => console.log(message.sid));
}

module.exports = {sendPhoneWarning, sendPhoneAlert};