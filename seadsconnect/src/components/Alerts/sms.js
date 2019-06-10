import axios from 'axios' 

//functions called from adminupDater to send emails    
export default function sendPhoneAlert(phone, appliance) {
	if (phone === "")
		return;

	if (appliance === "")
		appliance = "undefined";

	var _url = 'http://localhost:5000/sendPhoneAlert?numbers=' + phone + '&appliance=' + appliance;
	axios({ 
        url: _url 
   	});
}

export function sendPhoneWarning(phone, hr, min) {
	if (phone === "")
		return;

	var _url = 'http://localhost:5000/sendPhoneWarning?numbers=' + phone + '&hr=' + hr + '&min=' + min;
	axios({ 
        url: _url 
   	});
}

