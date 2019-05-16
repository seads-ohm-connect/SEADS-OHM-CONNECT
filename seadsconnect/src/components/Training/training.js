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


import RealTimeGraph from "../../Graphs/RealTime/realTimeGraph"
import getFirebase from '../Firebase'
import GetDevice from "../Profile/getDeviceID"
import TrackAppliance from "./trackAppliance"


var d3 = require("d3");


export default class Training extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		currentAppliance: null,
    		running:          false,
        liveData:         0,
        liveDataAppliance:0,
        liveTime:         new Date(),
        savedData:        [],
    	}

      this.device = new GetDevice();
			this.tracker = new TrackAppliance();

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
			if(!this.tracker.tracking){
				this.tracker.startTracking(this.state.liveData);
			}
			else{
				this.tracker.endTracking();
			}
    	//if running, render real time graph of data usage.
    }

    updatePower = () => {

      if (getFirebase().auth().currentUser) {
        var userID = getFirebase().auth().currentUser.uid;
        this.device.getSeadsData(userID).then((powTime) => {
          if(powTime){
            this.device.liveData = powTime[0];
            this.device.liveTime = powTime[1];
          }
        });

        this.setState({liveData: this.device.liveData});
        this.setState({liveTime: this.device.liveTime});

				this.setState({liveDataAppliance: this.tracker.track(this.device.liveData)})
				console.log("Live Appliance Data")
				console.log(this.tracker.tracking);
				console.log(this.tracker.samples);
      }
      else {
        var currentTime = new Date().toLocaleString();
        this.setState({liveTime: currentTime});
      }
    }

    componentDidMount() {

      this.interval = setInterval(() => this.updatePower(), 1000);

      var item = document.getElementById("test").getBoundingClientRect();

      var width = item.width  * .90;
      var height = item.height * 4;
      var margin = {left: 0, right: 60, top:30, bottom:60};
      var TooltipValues = {height: 40, width: 300, textOffset: 15, heightOffset: 80, leftOffset: 130};
      var dimensions = {margin, width, height};

      /*
        Svg is d3's canvas basically.
        Declared here because svg is persistent and doesn't
        need to be "drawn" every second.
      */
      var svg = d3.select(".graph1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.left + margin.right)

              //draw the realtime graph once a second
      setInterval(() => RealTimeGraph.drawGraph(svg, dimensions, TooltipValues, this, this.state.liveData, "#ffb2b2", "#ff0000"), 1000);


      var svg2 = d3.select(".graph2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.left + margin.right)

      console.log(this.state.liveDataAppliance);
      setInterval(() => RealTimeGraph.drawGraph(svg2, dimensions, TooltipValues, this, this.state.liveDataAppliance, "#20b2b2", "#200000"), 1000);
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
    		      <p class="graph1" id="test">
      		        This is where we can show the real-time graph when an appliance is running.
    		      </p>

              <p class="graph2" id="test">
                  This is where we can show the real-time graph of only the appliance.
              </p>


              <Button variant={this.state.running ? 'danger' : 'success'} block onClick={e => this.handleButtonClick(e)}>
                Click here when the appliance is turned {this.state.running ? 'off' : 'on'}
              </Button>

  			    </Container>
			    </Jumbotron>
			  </Col>
  		</Row>


  		</div>
   		);
    }
}
