import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Thresholdbar from "../components/Thresholdbar/thresholdbar"
import 'bootstrap/dist/css/bootstrap.css';
import { Alert, Button, CardGroup, Row, Form , ToggleButton, Col, ButtonToolbar, ButtonGroup, Card, Container} from "react-bootstrap"
import Appliances from "../Graphs/DragGraph/appliances"
import GetDevice from "../components/Profile/getDeviceID"
import GetOhmData from "../components/Profile/OhmConnect"


import getFirebase from '../components/firebase'

var d3 = require("d3");

	/*
	This stuff is a something I was playing around with to
	get used to d3. Since I can't get my line graph to work,
	I'm uploading this temporary bar graph which I had working
	which doesn't require a csv and only the hourData array.

	var hourData = [500,300,100,100,100,100,100,100,400,800,1000,1500,2000,2300,2000,1800,1800,2000,2400,2600,3000,2500,1500,1000,200];

	var mainWidth = 1400
	var mainHeight = 800
	var barWidth = 49
	  d3.select("body").append("svg")
		.attr("width", mainWidth)
		.attr("height", mainHeight)
		.style("background", "#b0b0b0")
		  .selectAll('rect')
		    .data(hourData)
			.enter().append('rect')
			  .attr("width", barWidth)
			  .style("background","#00ff00")
			  .attr("height", function(d) { //d = data
			    return d/5;
			  })
			  .attr("x", function(d, i) { //i = index
			    return i * (barWidth+1);
			  })
			  .attr("y", function(d) {
			    return mainHeight - d/5;
			  })

	/* some of the things i've tried to get csv import to work
	var workingDir = window.location.pathname.split('/').slice(0, -1).join('/')
	var datafile = workingDir + "/secondData.csv";
	console.log(workingDir);
	console.log(datafile);
	*/

	/*


		var workingDir = window.location.pathname.split('/').slice(0, -1).join('/')
	var datafile = workingDir + "/secondData.csv";
	d3.csv(datafile, function (error, data) {
	  if (error) throw error;

	  data.forEach(function(d) {
	    console.log(d);
		d.Second = +d.Second; // this needs to be done to change value to int
		d.Energy = +d.Energy; // Otherwise, csv is interpreted as a string
	  });

	  var width = 1000;
	  var height = 800;
	  var margin = {left: 50, right: 60, top: 30, bottom: 60};

	  var x = d3.scaleLinear().range([0, width]);
	  var y = d3.scaleLinear().range([height, 0]);

	  x.domain([d3.min(data, function(d) {return d.Second;})
			,d3.max(data, function(d) {return d.Second;})]);
	  y.domain([0,d3.max(data, function(d) {return d.Energy;})]);


	  var areaFill = d3.area()
	    .x(function(d) { return x(d.Second); })
	    .y(function(d) { return y(d.Energy); })
	    .y1(height);

	  var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  svg.append("path")
	    .data([data])
	    .attr("fill", "#ffb2b2")
	    .attr("class", "line")
	    .attr("d", areaFill)
	    .attr("stroke", "#ff0000")
		.attr("stroke-width", "2px")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  svg.append("g")
		.attr("transform", "translate("+ margin.left + "," + (height + margin.top) + ")") //20 for text size
	    .call(d3.axisBottom(x));

	  svg.append("text")
	    .attr("x", margin.left+width/2)
		.attr("y", height+margin.top+(margin.bottom)/2)
		.style("text-anchor", "middle")
		.text("Second");

	  svg.append("g")
	    .call(d3.axisLeft(y))
		.attr("transform", "translate(" + margin.left + "," + 0 + ")");

	  svg.append("text")
	    .attr("x", 0)
		.attr("y", margin.top+height/2)
		.attr("text-anchor", "middle")
		.text("Energy");
	});
	*/

//Thresholdbar: Change pass watts into value and change max to what ever you want.
class DvHub extends Component {
	constructor(props) {
    	super(props);
			this.state = {
				val: 0,
				m: 100,
				liveData: 0,
				liveTime: new Date().toLocaleString(),
				targetThreshold: 0,
				ohmHourDate: new Date().toString(),
				ohmHourStart: 0,
				ohmHourEnd: 0,
				washerToggleOn: true,
				dryerToggleOn: true,
				ovenToggleOn: true,
				fridgeToggleOn: true,
				dishwasherToggleOn: true,
				computerToggleOn: true
			}

			this.device = new GetDevice()
      this.ohmData = new GetOhmData()

	}

	//queries the data base to see if there is a value entered for the appliance.
	//if not it uses the static database values
	setValue(req, toggle) {

		var watts = req.watts;
		//if user not signed in just use values from database
		if (!getFirebase().auth().currentUser) {
			if (toggle)
				this.setState({val: this.state.val + watts});
			else
				this.setState({val: this.state.val - watts});
		}
		else {

			var userId = getFirebase().auth().currentUser.uid;
			var ref = getFirebase().database().ref('users/' + userId + '/appliances/' + req.name + '/watts');
			ref.once("value",snapshot => {
				if (snapshot.exists()) {
					if (toggle)
						this.setState({val: this.state.val + parseFloat(snapshot.val())});
					else
						this.setState({val: this.state.val - parseFloat(snapshot.val())});
				}
				else {
					if (toggle)
						this.setState({val: this.state.val + watts});
					else
						this.setState({val: this.state.val - watts});
				}
			});
		}
    }

	toggleWasher = () => {

		if(this.state.washerToggleOn){
			this.setValue(Appliances.washingMachineHot, true);
		}
		else{
			this.setValue(Appliances.washingMachineHot, false);
		}
	}

	changeColorWasher = () => {
		this.setState({washerToggleOn: !this.state.washerToggleOn})
	}

	toggleDryer = () => {
		if(this.state.dryerToggleOn){
			this.setValue(Appliances.dryer, true);
		}
		else{
			this.setValue(Appliances.dryer, false);
		}
	}

	changeColorDryer = () => {
		this.setState({dryerToggleOn: !this.state.dryerToggleOn})
	}

	toggleOven = () => {
		if(this.state.ovenToggleOn){
			this.setValue(Appliances.oven, true);
		}
		else{
			this.setValue(Appliances.oven, false);
		}
	}


	changeColorOven = () => {
		this.setState({ovenToggleOn: !this.state.ovenToggleOn})
	}

	toggleFridge = () => {
		if(this.state.fridgeToggleOn){
			this.setValue(Appliances.fridge, true);
		}
		else{
			this.setValue(Appliances.fridge, false);
		}
	}

	changeColorFridge = () => {
		this.setState({fridgeToggleOn: !this.state.fridgeToggleOn})
	}

	toggleDishwasher = () => {
		if(this.state.dishwasherToggleOn){
			this.setValue(Appliances.dishwasher, true);
		}
		else{
			this.setValue(Appliances.dishwasher, false);
		}
	}

	changeColorDishwasher = () => {
		this.setState({dishwasherToggleOn: !this.state.dishwasherToggleOn})
	}

	toggleComputer = () => {
		if(this.state.computerToggleOn){
			this.setValue(Appliances.computer, true);
		}
		else{
			this.setValue(Appliances.computer, false);
		}
	}

	changeColorComputer = () => {
		this.setState({computerToggleOn: !this.state.computerToggleOn})
	}

	componentDidMount() {
			this.interval = setInterval(() => this.updatePower(), 500);
			console.log("go to jbaskin 316 and look for the turkey picture on the whiteboard ")
			console.log("austin was an onion ring back in 3012")
  }

  componentWillUnmount() {
        clearInterval(this.interval);
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
		}
		else {
			var currentTime = new Date().toLocaleString();
			this.setState({liveTime: currentTime});
		}
		this.ohmTargetDate();
	}

	ohmTargetDate() {
		if (getFirebase().auth().currentUser) {
			var userID = getFirebase().auth().currentUser.uid;
			this.ohmData.getOhmHourThreshold(userID).then((thresholdValue) => {
				if(thresholdValue){
					this.ohmData.threshold = thresholdValue;
					console.log(thresholdValue);
				}
			});
			this.ohmData.getOhmDate(userID).then((ohmDate) => {
				if(ohmDate){
					this.ohmData.ohmHourDate = ohmDate;
				}
			}); 
			this.ohmData.getOhmStartTime(userID).then((ohmStartTime) => {
				if(ohmStartTime) {
					this.ohmData.startTime = ohmStartTime;
				}
			});
			this.ohmData.getOhmEndTime(userID).then((ohmEndTime) => {
				if(ohmEndTime) {
					this.ohmData.endTime = ohmEndTime;
				}
			});

			this.setState({targetThreshold: this.ohmData.threshold});
			this.setState({ohmHourDate: this.ohmData.ohmHourDate});
			this.setState({ohmHourStart: this.ohmData.startTime});
			this.setState({ohmHourEnd: this.ohmData.endTime});
			console.log(this.state.ohmHourDate);
			console.log(this.state.targetThreshold);
		}
	}
	

	render() {

		return (
		<Layout>
			  <Container>
					<Card className="text-center" border="info" bg="info" text="white">
						<Card.Body>
							<h3>The information below gives you real time updates on your power usage as well as any upcoming OhmHours</h3>
						</Card.Body>
					</Card>
					<Card className="text-center" border="info">
						<Card.Header as={Card} bg="success" text="white" style={ohmHourHeaderStyle}><h1>Your Upcoming OhmHour</h1></Card.Header>
						<Card.Body>
							<Alert variant="primary">
								<h3> {this.state.ohmHourDate} </h3> 
							</Alert>
							<Alert variant="primary">
								<h3> {this.state.ohmHourStart} - {this.state.ohmHourEnd} </h3>
							</Alert>
						</Card.Body>
					</Card>
					<CardGroup>
								<Card className="text-center" border="info">
								<Card.Header as={Card} bg="info" text="white" style={dataHeaderStyle}><h1>Current Usage</h1></Card.Header>
								<Card.Body>
								<Container>
									<Row>
										<Col/>
										<Col>
											<div class="dot" class="p-3 mb-2 bg-info text-white" style={liveWattsCircle} align="center">
												<h1 style={liveDataStyle}>{ this.state.liveData }</h1>
												<h1>watts</h1>
											</div>
										</Col>
										<Col/>
									</Row>
								</Container>
								</Card.Body>
							</Card>
								<Card className="text-center" border="info">
									<Card.Header as={Card} bg="warning" text="white" style={dataHeaderStyle}><h1>Target</h1></Card.Header>
									<Card.Body>
									<Container>
										<Row>
											<Col></Col>
											<Col>
												<div class="dot" class="p-3 mb-2 bg-warning text-white" style={liveWattsCircle} align="center">
													<h1 style={liveDataStyle}>{ this.state.targetThreshold }</h1>
													<h1>watts</h1>
												</div>
											</Col>
											<Col></Col>
										</Row>
									</Container>
									</Card.Body>
								</Card>
					</CardGroup>
				</Container>
  	</Layout>
		)
	}
}

const dataHeaderStyle = {
	fontSize: 40
}

const ohmHourHeaderStyle = {
	fontSize: 15
}

const liveWattsCircle = {
	height: 200,
	width: 200, 
	borderRadius: 100,
}

const liveDataStyle = {
	fontSize: 70
}

export default DvHub
