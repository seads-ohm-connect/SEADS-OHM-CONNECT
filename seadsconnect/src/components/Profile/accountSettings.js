import React, { Component } from "react"
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import Fade from 'react-bootstrap/Fade'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import DropdownButton  from 'react-bootstrap/DropdownButton'

import getFirebase from '../firebase'

export default class AccountSettings extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		changeEmail   : false,
    		setUpAlerts   : false,
    		emailAlerts   : false,
    		phoneAlerts   : false,
    		changePw      : false,
    		addSEADSDevice: false,
    		connectOhm    : false,
    		newEmail      : "",
    		confirmEmail  : "",

    		numberOfEmail : 1,
    		numberOfPhone : 1,
    		numberOfSEADS : 1
    	}
  	}

  	changeEmailForm() {
  		return (
  			<Collapse in={this.state.changeEmail}>
  			  <Card>
  			  <Col>
  			    <Form>
  			      <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter new Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Confirm Email address</Form.Label>
                    <Form.Control type="email" placeholder="Re-enter email" />
                  </Form.Group>

                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>  

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>                
  			    </Form>
  			  </Col>
  			  </Card>
  			</Collapse>
  		)
  	}

  	addEmail() {

  		let emails = [];
  		for (var i = 1; i < this.state.numberOfEmail; ++i) {
  			emails.push(
  				<Card.Body>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Recipient's email"
                    onChange={(e) => this.handleChange(e, i)}
                  />
                  <InputGroup.Append>
                    <Button variant="outline-danger" onClick={() => {this.setState({numberOfEmail: this.state.numberOfEmail - 1})}}>-</Button>
                  </InputGroup.Append>
                </InputGroup>
                </Card.Body>
  			);
  		}

  		emails.push(
  		  <Card.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's email"
              onChange={(e) => this.handleChange(e, 0)}
            />
            <InputGroup.Append>
              <Button variant="outline-success" onClick={() => {this.setState({numberOfEmail: this.state.numberOfEmail + 1})}}>+</Button>
            </InputGroup.Append>
          </InputGroup>
          </Card.Body>
  		);
  		return emails;
  	}

  	addPhone() {

  		let phones = [];

      phones.push(
        <Card.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's phone #"
              onChange={(e) => this.handleChange(e, 0)}
            />
            <InputGroup.Append>
              <Button variant="outline-success" onClick={() => {this.setState({numberOfPhone: this.state.numberOfPhone + 1})}} >+</Button>
            </InputGroup.Append>
          </InputGroup>
        </Card.Body>
      );

  		for (var i = 1; i < this.state.numberOfPhone; ++i) {
  			phones.push(
  				<Card.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient's phone #"
                onChange={(e) => this.handleChange(e, i)}
              />
              <InputGroup.Append>
                <Button variant="outline-danger" onClick={() => {this.setState({numberOfPhone: this.state.numberOfPhone - 1})}} >-</Button>
              </InputGroup.Append>
            </InputGroup>
          </Card.Body>
  			);
  		}

  		return phones;
  	}

  	setUpAlertsForm() {
  		let emails = this.addEmail();
  		let phones = this.addPhone();

  		return (
  			<Collapse in={this.state.setUpAlerts}>
  			  <Card>
  			    <Card.Body>
                      <ListGroupItem action variant="primary" onClick={() => {this.setState({emailAlerts: !this.state.emailAlerts})}} block>
                      Set up email alerts
                      </ListGroupItem>
                    <Collapse in={this.state.emailAlerts}>
                      <div>
                        {emails}
                      </div>
                    </Collapse>
                      <ListGroupItem action variant="primary" onClick={() => {this.setState({phoneAlerts: !this.state.phoneAlerts})}} block>
                      Set up phone alerts
                      </ListGroupItem>
                    <Collapse in={this.state.phoneAlerts}>
                      <div>
                        {phones}
                      </div>
                    </Collapse>
    			</Card.Body>
  			  </Card>
  			</Collapse>  			
  		)
  	}

  	changePwForm() {
  		return (
  			<Collapse in={this.state.changePw}>
  			  <Card>
  			  <Col>
  			    <Form>
  			      <Form.Group controlId="formGroupPassword">
                    <Form.Label>Enter new Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                  </Form.Group>

                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter password" />
                  </Form.Group>

                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Enter Old Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>  

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>                
  			    </Form>
  			  </Col>
  			  </Card>
  			</Collapse>
  		);
  	}

  	addSEADSForm() {

  		let SEADS = [];
  		for (var i = 1; i < this.state.numberOfSEADS; ++i) {
  			SEADS.push(
  				<Card.Body>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="SEADS ID #"
                    onChange={(e) => this.handleChange(e, i)}
                  />
                  <InputGroup.Append>
                    <Button variant="outline-danger" onClick={() => {this.setState({numberOfSEADS: this.state.numberOfSEADS - 1})}} >-</Button>
                  </InputGroup.Append>
                </InputGroup>
                </Card.Body>
  			);
  		}

  		SEADS.push(
  		  <Card.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="SEADS ID #"
              onChange={(e) => this.handleChange(e, 0)}
            />
            <InputGroup.Append>
              <Button variant="outline-success" onClick={() => {this.setState({numberOfSEADS: this.state.numberOfSEADS + 1})}} >+</Button>
            </InputGroup.Append>
          </InputGroup>
          </Card.Body>
  	    );
  		return SEADS;
  	}

  handleChange = (event, count) => {

    var db = getFirebase().database();
    var userId = getFirebase().auth().currentUser.uid;

    //write appliance values to realtime database
    db.ref('/users/' + userId + '/phoneAlerts').set({ 
      [count]: event.target.value
    });


    this.setState({[event.target.id]: event.target.value});
  }

	render() {

		let seadsForms = this.addSEADSForm();
		let alerts     = this.setUpAlertsForm();
		return (
			<Card>
			  <Card.Body>
			    <Card.Title><h2>Account Settings</h2></Card.Title>
			    <ListGroup>

			      <ListGroupItem action variant="secondary" 
			         onClick={() => {
			         	this.setState({changeEmail: !this.state.changeEmail});
			         }} >
			         Change Email
			      </ListGroupItem>
			      {this.changeEmailForm()}

			      <ListGroupItem action variant="secondary" onClick={() => {
			         	this.setState({setUpAlerts: !this.state.setUpAlerts});
			         }} >Setup Alerts
			      </ListGroupItem>
			      {alerts}

    			  <ListGroupItem action variant="secondary" onClick={() => {
			         	this.setState({changePw: !this.state.changePw});
			         }}>Change Password
			      </ListGroupItem>
			      {this.changePwForm()}

    			  <ListGroupItem action variant="secondary" onClick={() => {
			         	this.setState({addSEADSDevice: !this.state.addSEADSDevice});
			         }}>Add SEADS device
			      </ListGroupItem>
			      <Collapse in={this.state.addSEADSDevice}>
			         <div>{seadsForms}</div>
			      </Collapse>

    			  <ListGroupItem action variant="secondary" onClick={() => {
			         	this.setState({connectOhm: !this.state.connectOhm});
			         }}>Connect to Ohm Connect
			      </ListGroupItem>
    			</ListGroup>
			  </Card.Body>
			</Card>
		)
	}
}