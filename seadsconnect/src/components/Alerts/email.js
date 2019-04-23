import axios from 'Axios' 

    
export default function sendMailAlert(emails) {
	var _url = 'http://localhost:5000/send?email=' + emails;
	axios({ 
        url: _url 
   	});
}