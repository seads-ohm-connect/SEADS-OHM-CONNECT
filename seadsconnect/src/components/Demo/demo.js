import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'
import Form from 'react-bootstrap/Form'

import DemoBar from './demoBar'
import sendMailAlert, { sendEmailWarning } from '../Alerts/email'
import sendPhoneAlert, { sendPhoneWarning } from "../Alerts/sms"
import Keys from '../../../keys'
import TrackAppliance from '../training/trackAppliance'
import getFirebase from '../Firebase'


export default class Demo extends Component {

	constructor(props) {
    	super(props);

    	this.attachRef = attchtarget => this.setState({ attchtarget });

    	this.state = {
    		threshold: 0,
    		target:    0,
            email:     "",
            number:    "",
    		alertTime: 0,
    		running: false,
    		status: "Not Running",
    		attchtarget: null,
            realtime: false,
    	}

    	this.age = 0;
    	this.notified = false;
    	this.warned = false;
    	this.power = 0;
        this.previousPower = 0;

        this.tracker = new TrackAppliance();

	}

    //function that calls the update age every second.
    //setting the state to be running is to force the render update to be called. It does nothing else.
	componentDidMount() {
    	this.interval = setInterval(() => this.updateAge(), 1000);
        //used to force a render call
        this.interval = setInterval(() => {this.setState({running: this.state.running})}, 100);
    }


    //increments the age.
    updateAge() {
    	var timeBeforeAlert = 10;
    	var ohmHourLength   = 30;
    	if (this.state.running) {
    		//this breaks each step depending on the length before the alert.
    		//Also needs to take in account how long the ohm hour is and adds a buffer before the alert will be sent 
    		this.age += 100 / (this.state.alertTime + timeBeforeAlert + ohmHourLength);

    		this.updateStatus(timeBeforeAlert, ohmHourLength, this.state.alertTime);
    	}
    	else {
    		this.age = 0;
    	}
    }

    //changes the status depending on how far along in the sim it is.
    updateStatus(timeBeforeAlert, ohmHourLength, alertTime) { 
 	
    	var totalTime = timeBeforeAlert + ohmHourLength + alertTime;

    	if (this.age >= 100) {
    		this.setState({status:  "Your Ohm Hour has ended!"})
    	}
 		else if (this.age < totalTime - ohmHourLength) {
    		if (!this.notified && totalTime - this.age - ohmHourLength === this.state.alertTime) {
    			var hr  = Math.floor(this.state.alertTime / 60);
        	    var min = this.state.alertTime % 60;
        	    this.notified = true;
        	    sendEmailWarning(this.state.email, hr, min);
    		}
    		this.setState({status: Math.floor(totalTime - this.age - ohmHourLength) + " minutes before your Ohm Hour"});
    	}
    	else {
    		if (this.power > this.state.threshold + this.state.target && !this.warned) {
    			this.warned = true;
                var guess;

                if (!getFirebase().auth().currentUser) {
                    sendMailAlert(this.state.email, "");
                }
                else {

                    var db = getFirebase().database();
                    var userId = getFirebase().auth().currentUser.uid;

                    var dif = this.power - this.previousPower;
                    var email = this.state.email;

                    db.ref('/users/' + userId).once('value').then(function(snapshot) {
                        var tracker = new TrackAppliance()
                        guess = tracker.guessAppliance(snapshot, dif);
                        sendMailAlert(email, guess);
                    });
                }
    		}

    		this.setState({status: "It is your Ohm Hour!"});
    	}
    }


    //changes the tooltip depending on how far along in the sim it is.
    tooltipContents() {

    	if (this.state.status === "Your Ohm Hour has ended!") {
    		return this.state.status;
    	}
    	else if (this.warned === true) {
    		return "An email has been sent warning you about your power usage!"
    	}
    	else if (this.state.status === "It is your Ohm Hour!"){
    		return "It is your Ohm Hour! Click the appliances to see how much it increases your power consumption!"
    	}
    	else if (this.notified === true) {
    		return "An email has been sent notifying you of your upcoming Ohm Hour!"
    	}
    	else {
    		return this.state.status;
    	}
    }


 	getPower = (power) => {
 		this.power = parseFloat(power).toFixed(2);
 	}

	render() {

		return (
		  <Card>

		    <Card.Header>
		      <h1>OhmHour Demo</h1>
		    </Card.Header>

		    <Card.Body>

		      <Col>

		      <Row>

		        <Col>
		          <InputGroup className="mb-3">
		      	    <InputGroup.Prepend>
      			      <InputGroup.Text id="inputGroup-sizing-sm">Enter Target</InputGroup.Text>
    			    </InputGroup.Prepend>
    			    <FormControl aria-label="Small" value={this.state.target} aria-describedby="inputGroup-sizing-sm" type="number" onChange={(e) => {this.setState({target: e.target.value});}}/>
		          </InputGroup>
		        </Col>



		        <Col>
                  <Form.Check type="checkbox" id='checkbox'>
                  <Form.Check.Input type="checkbox" onChange={(e) => {this.setState({realtime: !this.state.realtime})}}/>
                  <Form.Check.Label>Use Real-Time Data</Form.Check.Label>
                  </Form.Check>
		        </Col>


		        <Col>
		          <DropdownButton as={ButtonGroup} id="dropdown-basic-button" title={this.state.alertTime === 0 ? "Reminder" : this.state.alertTime + " Minutes"}>
		          	<Dropdown.Item as="button" onClick={() => {this.setState({alertTime: 30});}}>30 Minutes Before</Dropdown.Item>
		          	<Dropdown.Item as="button" onClick={() => {this.setState({alertTime: 60});}}>60 Minutes Before</Dropdown.Item>
		          	<Dropdown.Item as="button" onClick={() => {this.setState({alertTime: 90});}}>90 Minutes Before</Dropdown.Item>
                  </DropdownButton>
		        </Col>
		      </Row>

              <Col>
                <Row>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">Email(s)</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" value={this.state.email} placeholder="Enter email" aria-describedby="inputGroup-sizing-sm" onChange={(e) => {this.setState({email: e.target.value});}}/>
                  </InputGroup>
                </Row>
              </Col>

		      </Col>

		      <Col style={{paddingTop: '120px'}}>
		        <ProgressBar ref={this.attachRef} now={this.age} label={this.state.status}/>
                <Row>
		        <Overlay target={this.state.attchtarget} show={true} placement="top">
		          <Popover id="popover-basic" title={"Current power usage: " + this.power + " watts"}>
   				  {this.tooltipContents()}
  				  </Popover>
		        </Overlay>
                </Row>
		      </Col>


		      <Col style={{paddingTop: '20px', paddingBottom: '20px'}}>
		        <p1>Click the different appliances to see how they affect your watt usage!</p1>
		          <DemoBar target={this.state.target} threshold={this.state.threshold} getPower={this.getPower.bind(this)} useReal={this.state.realtime}/>
		      </Col>

		    </Card.Body>

		    <Card.Footer>
		      <Button variant={this.state.running ? 'danger' : 'success'} block disabled={this.state.alertTime === 0}
		      	onClick={() => {
		      		this.age = 0;
    				this.notified = false;
    				this.warned = false;
    				this.power = 0;
					this.setState({running: !this.state.running,
								   status:  "Your Ohm Hour has ended!"});
				}}>
                  {this.state.running ? "Stop" : "Go"}
              </Button>
		    </Card.Footer>

		  </Card>
		)
	}
}