import axios from 'axios' 

    
export default function sendMailAlert(emails, appliance) {
	if (appliance === "")
		appliance = "undefined";

	var _url = 'http://localhost:5000/sendAlert?email=' + emails + '&appliance=' + appliance;
	axios({ 
        url: _url 
   	});
}

export function sendEmailWarning(emails, hr, min) {
	var _url = 'http://localhost:5000/sendWarning?email=' + emails + '&hr=' + hr + '&min=' + min;
	axios({ 
        url: _url 
   	});
}
