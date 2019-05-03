import React, { Component } from 'react'
import Appliances from '../../Graphs/DragGraph/appliances'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'



export default class Training extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		currentAppliance: null,
    		running:          false       
    	}

	//should make a list of this in the Appliance class.
	    this.appList = [Appliances.electricFurnace, Appliances.centralAirconditioning, Appliances.windowAC120v, 
            Appliances.windowAC240v, Appliances.electricWaterHeater, Appliances.oven, 
            Appliances.dishwasher, Appliances.fridge, Appliances.computer, Appliances.washingMachineWarm, 
            Appliances.washingMachineHot, Appliances.dryer, Appliances.hairDryer];
    }

    handleDropDownClick(e) {
    	this.setState({currentAppliance: e});
    }

    handleButtonClick(e) {
    	this.setState({running: !this.state.running});
    	//if running, render real time graph of data usage.
    }

    render() {

    	const dropDown = this.appList.map(appliance => <Dropdown.Item as="button" onClick={e => this.handleDropDownClick(appliance)}>{appliance.name}</Dropdown.Item>);

   		return(
   		<div>
   		  <Row>

   		    <Col>
   		      <DropdownButton id="dropdown-basic-button" title={this.state.currentAppliance === null ? "Choose Appliance" : this.state.currentAppliance.name}>
      	        {dropDown}
  		      </DropdownButton>
   		    </Col>

   		    <Col>
  		      <Form.Text>Choose an appliance that you wish to run.</Form.Text>
  		    </Col>

  		  </Row>

  		  <Row>
  		    <Col>
  		      <Jumbotron fluid>
  			    <Container>
    		      <h1>Analytics</h1>
    		      <p>
      		        This is where we can show the real-time graph when an appliance is running.
    		      </p>
  			    </Container>
			  </Jumbotron>
			</Col>
  		  </Row>

  		  <Row>
  		  	<Col>
  		  	  <Button variant={this.state.running ? 'danger' : 'success'} block onClick={e => this.handleButtonClick(e)}>
  		  	    Click here when the appliance is turned {this.state.running ? 'off' : 'on'}
  		  	  </Button>
  		  	</Col>
  		  </Row>
  		</div>
   		);
    }
}