import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Thresholdbar from "../components/Thresholdbar/thresholdbar"
import { Button, Row, Form , ToggleButton, Col, ButtonToolbar, ButtonGroup} from "react-bootstrap"
import Appliances from "../Graphs/DragGraph/appliances"

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
				m: 12,
				thresh: 33,
				liveData: -1, 
				washerToggleOn: true,
				dryerToggleOn: true,
				ovenToggleOn: true,
				fridgeToggleOn: true,
				dishwasherToggleOn: true,
				computerToggleOn: true
			}

			this.db = new Appliances();
	}

	toggleWasher = () => {
		if(this.state.washerToggleOn){
			this.setState({val: this.state.val + this.db.washingMachineHot.kWh })
		}
		else{
			this.setState({val: this.state.val - this.db.washingMachineHot.kWh })
		}
	}

	changeColorWasher = () => {
		this.setState({washerToggleOn: !this.state.washerToggleOn})
	}

	toggleDryer = () => {
		if(this.state.dryerToggleOn){
			this.setState({val: this.state.val + this.db.dryer.kWh})
		}
		else{
			this.setState({val: this.state.val - this.db.dryer.kWh})
		}
	}

	changeColorDryer = () => {
		this.setState({dryerToggleOn: !this.state.dryerToggleOn})
	}

	toggleOven = () => {
		if(this.state.ovenToggleOn){
			this.setState({val: this.state.val + this.db.oven.kWh})
		}
		else{
			this.setState({val: this.state.val - this.db.oven.kWh})
		}
	}


	changeColorOven = () => {
		this.setState({ovenToggleOn: !this.state.ovenToggleOn})
	}

	toggleFridge = () => {
		if(this.state.fridgeToggleOn){
			this.setState({val: this.state.val + this.db.fridge.kWh})
		}
		else{
			this.setState({val: this.state.val - this.db.fridge.kWh})
		}
	}

	changeColorFridge = () => {
		this.setState({fridgeToggleOn: !this.state.fridgeToggleOn})
	}

	toggleDishwasher = () => {
		if(this.state.dishwasherToggleOn){
			this.setState({val: this.state.val + this.db.dishwasher.kWh})
		}
		else{
			this.setState({val: this.state.val - this.db.dishwasher.kWh})
		}
	}

	changeColorDishwasher = () => {
		this.setState({dishwasherToggleOn: !this.state.dishwasherToggleOn})
	}

	toggleComputer = () => {
		if(this.state.computerToggleOn){
			this.setState({val: this.state.val + this.db.computer.kWh})
		}
		else{
			this.setState({val: this.state.val - this.db.computer.kWh})
		}
	}

	changeColorComputer = () => {
		this.setState({computerToggleOn: !this.state.computerToggleOn})
	}
	
	updatePower = () => {
		var w;
		d3.json("http://seadsone.soe.ucsc.edu:8000/api/seads/power/last").then(function(liveDataa){
			w = liveDataa.DataPoints[0].Power;
			console.log("W_w"+w);
			//this.setState({liveData: 5})
		});
		setTimeout(function(){console.log("HUHawaaaa:" + w); this.setState({liveData:w});}, 5000);
	}

	render() {
		let washerColor = this.state.washerToggleOn ? "outline-success" : "success";
		let dryerColor = this.state.dryerToggleOn ? "outline-success" : "success";
		let ovenColor = this.state.ovenToggleOn ? "outline-success" : "success";
		let fridgeColor = this.state.fridgeToggleOn ? "outline-success" : "success";
		let dishwasherColor = this.state.dishwasherToggleOn ? "outline-success" : "success";
		let computerColor = this.state.computerToggleOn ? "outline-success" : "success";
		
		return (
			<Layout>
				<h1>{ this.state.liveData }</h1>
			<Thresholdbar value={this.state.val} max={this.state.m} thresholds={this.state.thresh} />
				<div align="center">
					<ButtonGroup>
						<ButtonToolbar>
							<Button variant={washerColor} onClick={() => {this.updatePower()}} >Washer</Button>
							<Button variant={washerColor} onClick={() => {this.toggleWasher(); this.changeColorWasher()}} >Washer</Button>
							<Button variant={dryerColor} onClick={() => {this.toggleDryer(); this.changeColorDryer()}} >Dryer</Button>
							<Button variant={ovenColor} onClick={() => {this.toggleOven(); this.changeColorOven()}} >Oven</Button>
							<Button variant={fridgeColor} onClick={() => {this.toggleFridge(); this.changeColorFridge()}} >Fridge</Button>
							<Button variant={dishwasherColor} onClick={() => {this.toggleDishwasher(); this.changeColorDishwasher()}} >Dishwasher</Button>
							<Button variant={computerColor} onClick={() => {this.toggleComputer(); this.changeColorComputer()}} >Computer</Button>
						</ButtonToolbar>
					</ButtonGroup>
				</div>
		</Layout>
		)
	}
}


export default DvHub
