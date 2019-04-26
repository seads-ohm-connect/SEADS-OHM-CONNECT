import axios from 'Axios' 

    
export default function sendMailAlert(emails) {
	var _url = 'http://localhost:5000/sendAlert?email=' + emails;
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