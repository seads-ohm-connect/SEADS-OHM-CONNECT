import axios from 'axios' 

//functions called from adminupDater to send emails    
export default function sendMailAlert(emails, appliance) {
	if (emails === "")
		return;

	if (appliance === "")
		appliance = "undefined";

	var _url = 'http://localhost:5000/sendAlert?email=' + emails + '&appliance=' + appliance;
	axios({ 
        url: _url 
   	});
}

export function sendEmailWarning(emails, hr, min) {
	if (emails === "")
		return;
	
	var _url = 'http://localhost:5000/sendWarning?email=' + emails + '&hr=' + hr + '&min=' + min;
	axios({ 
        url: _url 
   	});
}
