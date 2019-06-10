import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'

export default class DemoInfo extends Component {


	render() {
		return(
		  <Card>
		    <Card.Body>
		    <p1>
		      In this module users can see the sequence of events that happen leading up to and during an OhmHour. Enter a target value that you wish to 
		      keep below during your OhmHour and select a time that you wish to notified to before your upcoming OhmHour. If you want to see what the email notification
		      look like; enter an email you wish to recieve an email at. Once you are ready, Press the "Go" button to begin the simulation. During the OhmHour, press the
		      different appliances to see how they affect your total power output. The green portion of the bar indicates what percentage if your power output is below your
		      target and the red bar indicates the perectage above your target. If you have a SEADS device installed already, you can choose to use your real-time data in the simulation
		      by clicking the checkbox.
		    </p1>
		    </Card.Body>
		  </Card>
		);
	}
}