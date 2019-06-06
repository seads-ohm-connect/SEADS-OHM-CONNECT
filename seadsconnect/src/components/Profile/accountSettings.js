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
import Nav  from 'react-bootstrap/Nav'

import getFirebase from '../Firebase'


//Component for both the functionality and the UI of the account settings bar.
//UI allows of users to interact with it and imput information that can then
//be stored in the useres Firebase user information.
//If firebase storage layout is updated, then change the reference paths for
//each of the setting adding functions here.
//Reminder: use firebase .update function when writing to firebase outside
//of this component as using the save functions can erase data. 
export default class AccountSettings extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		changeEmail    : false,
    		setUpAlerts    : false,
    		emailAlerts    : false,
    		phoneAlerts    : false,
    		changePw       : false,
    		addSEADSDevice : false,
    		connectOhm     : false,
    		newEmail       : "",
    		confirmEmail   : "",

    		numberOfEmail  : 0,
    		numberOfPhone  : 0,
    		numberOfSEADS  : 0,

        confirmToken   : "Update",
        removeToken    : "Remove",

        activeTimeEmail: "0",
        activeTimePhone: "0"
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

      if (!getFirebase().auth().currentUser)
        return;

      var db = getFirebase().database();
      var userId = getFirebase().auth().currentUser.uid;
      var path = '/emailAlerts';

      var ref = db.ref('/users/' + userId + path);

      if (this.state.numberOfEmail === 0)
        this.state.numberOfEmail = 1;

      var setState = this.setState;
      var state = this.state;
      var self = this

      var confirm = this.state.confirmToken;
      var remove = this.state.removeToken;

      var createForm = (function (ind, setState, state) {
          emails.push(
            <Card.Body>
              <InputGroup className="mb-3">
                <FormControl
                  id={(`email ${ind}` + 1)}
                  placeholder="Recipient's email"
                />
                <InputGroup.Append>
                  <Button
                  id={`email ${ind}`}
                  variant="outline-success"
                  onClick={() => {
                    var keys = [`email ${ind}` + 1];
                    if (document.getElementById(`email ${ind}`).innerHTML === confirm) {
                      self.saveToDB(keys, path, `email ${ind}`);
                      self.setState({numberOfEmail: self.state.numberOfEmail + 1});
                    }
                    else {
                      self.removeFromDB(path, `email ${ind}`);
                      self.setState({numberOfEmail: self.state.numberOfEmail - 1});
                    }
                  }}
                  >{confirm}</Button>
                </InputGroup.Append>
              </InputGroup>
            </Card.Body>
          );
      });

  		let emails = [];

      emails.push(
        <div>
          <p1>Notify me of my OhmHour in advance by: </p1>
          <Card.Body>
          <Nav variant="pills" activeKey={this.state.activeTimeEmail} onSelect={k => this.handleSelectEmail(k)}>
            <Nav.Item>
              <Nav.Link eventKey="0">None</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="1">30 Mins</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2">1 Hour</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">90 Mins</Nav.Link>
            </Nav.Item>
          </Nav>
          </Card.Body>
          </div>
      )

  		for (var i = 0; i < 5; ++i) {
  		  createForm(i, setState, state);
      }

      ref.once("value").then(function(snapshot) {
        if (snapshot.exists()) {
          var ind = 0
          snapshot.forEach(function(child) {
            var address = child.val();
            document.getElementById(`email ${ind}`).innerHTML = remove;
            document.getElementById((`email ${ind}`) + 1).setAttribute("value", address);
            ind++;
          });
        }
      });
  		return emails;
  	}

  	addPhone() {

      if (!getFirebase().auth().currentUser)
        return;

      var db = getFirebase().database();
      var userId = getFirebase().auth().currentUser.uid;
      var path = '/phoneAlerts';

      var ref = db.ref('/users/' + userId + path);

      if (this.state.numberOfPhone === 0)
        this.state.numberOfPhone = 1;

      var setState = this.setState;
      var state = this.state;
      var self = this;

      var confirm = this.state.confirmToken;
      var remove = this.state.removeToken;

      //creates a input form with three seperate blocks for a phone number
      var createForm = (function (ind, setState, state) {
        phones.push(
        <Card.Body>
          <InputGroup className="mb-3" style={{width: "100%"}}>
          <Row>
            <FormControl
              id={(`phone ${ind}`) + 1}
              style={{width: "25%"}}
              placeholder="###"
              maxlength={3}
            />
            <p>_</p>
            <FormControl
              id={(`phone ${ind}`) + 2}
              style={{width: "25%"}}
              placeholder="###"
              maxlength={3}
            />
            <p>_</p>
            <FormControl
              id={(`phone ${ind}`) + 3}
              style={{width: "25%"}}
              placeholder="####"
              maxlength={4}
            />
            <InputGroup.Append>
              <Button
                id={`phone ${ind}`}
                variant="outline-success"
                size='sm'
                onClick={(e) => {
                  var keys = [(`phone ${ind}`) + 1, (`phone ${ind}`) + 2, (`phone ${ind}`) + 3];
                  if (document.getElementById(`phone ${ind}`).innerHTML === confirm) {
                    console.log('confirm clicked ' + ind)
                    self.saveToDB(keys, path, `phone ${ind}`);
                    self.setState({numberOfPhone: self.state.numberOfPhone + 1})
                  }
                  else {
                    self.removeFromDB(path, `phone ${ind}`)
                    self.setState({numberOfPhone: self.state.numberOfPhone - 1})
                  }
                }}
              >{confirm}
              </Button>
            </InputGroup.Append>
            </Row>
          </InputGroup>
        </Card.Body>
        );
      });

      let phones = [];

      phones.push(
        <div>
          <p1>Notify me of my OhmHour in advance by: </p1>
          <Card.Body>
          <Nav variant="pills" activeKey={this.state.activeTimePhone} onSelect={k => this.handleSelectPhone(k)}>
            <Nav.Item>
              <Nav.Link eventKey="0">None</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="1">30 Mins</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="2">1 Hour</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="3">90 Mins</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Body>
        </div>
      )

  		for (var i = 0; i < 5; ++i) {
        createForm(i, setState, state);
      }

      var ind = 0
      ref.once("value").then(function(snapshot) {
        if (snapshot.exists()) {
          snapshot.forEach(function(child) {
            var number = child.val();
            document.getElementById(`phone ${ind}`).innerHTML = remove;
            document.getElementById((`phone ${ind}`) + 1).setAttribute("value", number.slice(0,3));
            document.getElementById((`phone ${ind}`) + 2).setAttribute("value", number.slice(3,6));
            document.getElementById((`phone ${ind}`) + 3).setAttribute("value", number.slice(6,10));
            ind++;
          });
        }
      });

  		return phones;
  	}

    //'
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

    //write values to realtime database
    db.ref('/users/' + userId + '/phoneAlerts').update({
      [count]: event.target.value
    });


    this.setState({[event.target.id]: event.target.value});
  }

  handleSelectEmail(eventKey) {

    if (!getFirebase().auth().currentUser)
      return;

    var db = getFirebase().database();
    var userId = getFirebase().auth().currentUser.uid;

    this.setState({activeTime: eventKey});

    var mins = parseInt(eventKey) * 30;

    db.ref('/users/' + userId).update({
      notifyInAdvanceEmail: mins
    });
  }

  handleSelectPhone(eventKey) {

    if (!getFirebase().auth().currentUser)
      return;

    var db = getFirebase().database();
    var userId = getFirebase().auth().currentUser.uid;

    this.setState({activeTime: eventKey});

    var mins = parseInt(eventKey) * 30;

    db.ref('/users/' + userId).update({
      notifyInAdvancePhone: mins
    });
  }


  //writes user input to the specified path and changes the button from confirm to remove.
  saveToDB(input, path, buttonId) {

    if (!getFirebase().auth().currentUser)
      return;

    var db = getFirebase().database();
    var userId = getFirebase().auth().currentUser.uid;


    var userInput = '';
    for (var x in input) {
      if (document.getElementById(input[x]))
        userInput += document.getElementById(input[x]).value;
    }


    console.log(buttonId);
    db.ref('/users/' + userId + path).update({
      [buttonId]: userInput
    });

    document.getElementById(buttonId).innerHTML = "Remove";
  }

  //removes user input from the database and changes the button from remove to cornfirm.
  removeFromDB(path, buttonId) {

    if (!getFirebase().auth().currentUser)
      return;

    var db = getFirebase().database();
    var userId = getFirebase().auth().currentUser.uid;

    var ref = db.ref('/users/' + userId + path + '/' + buttonId).once("value",snapshot => {
      if (snapshot.exists()) {
        snapshot.ref.remove();
      }
    });

    document.getElementById(buttonId).innerHTML = "Update";
    //doesn't always work?
    if (path === '/phoneAlerts') {
      document.getElementById(buttonId + 1).setAttribute("placeholder", "###");
      document.getElementById(buttonId + 2).setAttribute("placeholder", "###");
      document.getElementById(buttonId + 3).setAttribute("placeholder", "####");
    }
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
