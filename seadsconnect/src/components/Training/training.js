/*
  The main UI for the training model

*/

import React, { Component } from 'react'
import Appliances from '../../Graphs/DragGraph/appliances'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
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
        savedData2:       []

    	}

      this.device = new GetDevice();
			this.tracker = new TrackAppliance();
      this.average = 0;

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

      if (this.state.currentAppliance === null)
        return; 

    	this.setState({running: !this.state.running});
			if(!this.tracker.tracking){
				this.tracker.startTracking(this.state.liveData);
			}
			else{
				this.tracker.endTracking();
        this.average = this.tracker.getAverage();
        this.setDBValues();

        this.setState({savedData2: []})        
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
      }
      else {
        var currentTime = new Date().toLocaleString();
        this.setState({liveTime: currentTime});
      }
    }


    setDBValues() {
        var db = getFirebase().database();
        var userId = getFirebase().auth().currentUser.uid;

        if (!getFirebase().auth().currentUser)
          return; 

        //write appliance values to realtime database
        if (!this.average)
          this.average = 0;
        
        db.ref('/users/' + userId + '/appliances/' + this.state.currentAppliance.name).set({ 
          watts: this.average,
          price: (Math.round(this.average / 9.09090909 * 100) / 100) 
        }); 
    }

    //initialize the real-time graphs here.
    componentDidMount() {

      this.interval = setInterval(() => this.updatePower(), 1000);

      var dg1 = new RealTimeGraph();
      var dg2 = new RealTimeGraph();

      var item = document.getElementById("test").getBoundingClientRect();

      var width = item.width  * .99;
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


      //draw the realtime graph once a second.
      setInterval(() => {
        dg1.drawGraph(svg, dimensions, TooltipValues, this, this.state.liveData, 'savedData', "#ffb2b2", "#ff0000", true, false, "live");
      }, 1000);


      var svg2 = d3.select(".graph2")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.left + margin.right)

      setInterval(() => {
        if (this.state.running) {
          svg2.style("opacity", 1)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.left + margin.right);
          dg2.drawGraph(svg2, dimensions, TooltipValues, this, this.state.liveDataAppliance, 'savedData2', "#20b2b2", "#44c63b", true, false, "live");
        }
        else {
          svg2.style("opacity", 0)
            .attr("width", 0)
            .attr("height", 0);
        }
      }, 1000);
    }


    render() {
    	const dropDown = this.appList.map(appliance => <Dropdown.Item as="button" onClick={e => this.handleDropDownClick(appliance)}>{appliance.name}</Dropdown.Item>);

   		return(
   		<div>

      <p/>

  		  <Row>
  		    <Col>
  		      <Card>

            <Card.Header>
              <DropdownButton as={ButtonGroup} id="dropdown-basic-button" title={this.state.currentAppliance === null ? "Choose Appliance" : this.state.currentAppliance.name}>
                {dropDown}
              </DropdownButton>
            </Card.Header>


  			    <Container>
    		      <h1>Analytics</h1>
    		      <p class="graph1" id="test">
      		        This is where we can show the real-time graph when an appliance is running.
    		      </p>

              <p class="graph2">
                  This is where we can show the real-time graph of only the appliance.
              </p>

              <Card.Footer>
                <Button variant={this.state.running ? 'danger' : 'success'} block onClick={e => this.handleButtonClick(e)}>
                  Click here when the appliance is turned {this.state.running ? 'off' : 'on'}
                </Button>
              </Card.Footer>

  			    </Container>
			    </Card>
			  </Col>
  		</Row>


  		</div>
   		);
    }
}
