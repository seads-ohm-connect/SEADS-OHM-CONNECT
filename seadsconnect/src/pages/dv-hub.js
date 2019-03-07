import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Thresholdbar from "../components/Thresholdbar/thresholdbar"
import { Button, Row, Form , ToggleButton } from "react-bootstrap"
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
				val: 70,
				m: 100,
				thresh: 33
			}
			
			this.tester = {
				t: 10
			}
	}

	getLocal(req) {
    	const cachedHits = localStorage.getItem(req.name);
        if (cachedHits)
        	return (JSON.parse(cachedHits));
        else 
        	return req.kWh;
    }

	AddDryer = () => {
		this.setState({val: this.state.val + this.getLocal(Appliances.dryer) })
	}


	AddWasher = () => {
		this.setState({val: this.state.val + this.getLocal(Appliances.washingMachineWarm)})
	}

	AddElectricWaterHeater = () => {
		this.setState({val: this.state.val + this.getLocal(Appliances.electricWaterHeater)})
	}

	ReduceLoad = () => {
		this.setState({val: this.state.val - 5 })
	}



	render() {
		return (
			<Layout>
  			<Thresholdbar value={this.state.val} max={this.state.m} thresholds={this.state.thresh} />
				<Form>
					<Row>
						<Button variant="outline-success" data-toggle="button" onClick={this.AddDryer} >Dryer On</Button>
						<Button variant="outline-success" data-toggle="button" onClick={this.AddWasher}>Washer On</Button>
						<Button variant="outline-success" data-toggle="button" onClick={this.AddElectricWaterHeater}>Water Heater On</Button>
						<Button variant="outline-success" data-toggle="button" onClick={this.ReduceLoad}>Reduce Load</Button>
					</Row>
				</Form>
  		</Layout>
		)
	}
}


export default DvHub
