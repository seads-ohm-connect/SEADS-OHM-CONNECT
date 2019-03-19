import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Thresholdbar from "../components/Thresholdbar/thresholdbar"
import { Button, Row, Form , ToggleButton, Col, ButtonToolbar, ButtonGroup} from "react-bootstrap"
import Appliances from "../Graphs/DragGraph/appliances"

var d3 = require("d3");

//Thresholdbar: Change pass watts into value and change max to what ever you want.
class DvHub extends Component {
	constructor(props) {
    	super(props);
			this.state = {
				val: 0,
				m: 100,
				thresh: 33,
				liveData: 0, 
				savedData: [],
				liveTime: new Date(0).toLocaleString(),
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


	componentDidMount() {
        this.interval = setInterval(() => this.updatePower(), 500);
		setInterval(() => this.drawChart(), 1000);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }
	
	updatePower = () => {
		var liveUpdateURL = new String("http://seadsone.soe.ucsc.edu:8000/api/seads/power/last");
		d3.json(liveUpdateURL).then( (liveData) => {
			var watts = liveData.DataPoints[0].Power;
			var currentTime = new Date(liveData.DataPoints[0].Timestamp*1000).toLocaleString();
			this.setState({liveData: watts });	
			this.setState({liveTime: currentTime });
		});
	}
	
	drawChart = () => {
		var width = 1000;
		var height = 400;
		var margin = {left: 80, right: 60, top:30, bottom:60};
		
		var x = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);
		var mode = "live";
		
		var currentData = this.state.savedData;
		
		/* mode 1: random data  between 1 and 101 */
		if (mode == "random") {
			currentData[currentData.length]={"Second":currentData.length+1, "Energy":(Math.floor(Math.random()*100)+1)};
		}
		
		/* mode 2: based on live data */
		/* TODO: This assumes that data comes in consistently at once 
		 * every second. This will not always be the case in real life.
		 */
		if (mode == "live") {
			currentData[currentData.length]={"Second":currentData.length+1, "Energy":this.state.liveData};
		}
		
		this.setState({savedData : currentData});
		  
		x.domain([d3.min(currentData, function(d) {return d.Second;})
		         ,d3.max(currentData, function(d) {return d.Second;})]);
		y.domain([0,d3.max(currentData, function(d) {return d.Energy;})]);
		
		/* This is used to remove the current graph before replacing with updated graph */
		d3.selectAll("svg").remove()
		  
		var areaFill = d3.area()
		  .x(function(d) { return x(d.Second); })
		  .y(function(d) { return y(d.Energy); })
		  .y1(height);
		
		var svg = d3.select("body")
		  .append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.left + margin.right)
					  
		svg.append("path")
		  .data([currentData])
			.attr("fill", "#ffb2b2")
			.attr("class", "line")
			.attr("d", areaFill)
			.attr("stroke", "#ff0000")
			.attr("stroke-width", "2px")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
		svg.append("g")
		  .attr("transform", "translate(" + margin.left + "," + (margin.top+height) + ")")
		    .call(d3.axisBottom(x));
		  
		svg.append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		  .call(d3.axisLeft(y));
		  
		svg.append("text")
		  .attr("x", margin.left+width/2)
		  .attr("y", height+margin.top+margin.bottom/2)
		    .style("text-anchor", "middle")
		      .text("Time (in second)");
		  
		svg.append("text")
		  .attr("x", 0)
		  .attr("y", margin.top+height/2)
		  .attr("text-anchor", "left")
		    .text("Watts");
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
			<h1>current power: { this.state.liveData }</h1>
			<h2>current date: { this.state.liveTime }</h2>
			<Thresholdbar value={this.state.val + this.state.liveData} max={this.state.m} thresholds={this.state.thresh} />
				<div align="center">
					<ButtonGroup>
						<ButtonToolbar>
							<Button variant={washerColor} onClick={() => {this.toggleWasher(); this.changeColorWasher()}} >Washer</Button>
							<Button variant={dryerColor} onClick={() => {this.toggleDryer(); this.changeColorDryer()}} >Dryer</Button>
							<Button variant={ovenColor} onClick={() => {this.toggleOven(); this.changeColorOven()}} >Oven</Button>
							<Button variant={fridgeColor} onClick={() => {this.toggleFridge(); this.changeColorFridge()}} >Fridge</Button>
							<Button variant={dishwasherColor} onClick={() => {this.toggleDishwasher(); this.changeColorDishwasher()}} >Dishwasher</Button>
							<Button variant={computerColor} onClick={() => {this.toggleComputer(); this.changeColorComputer()}} >Computer</Button>
						</ButtonToolbar>
					</ButtonGroup>
				</div>
				<div id={"#" + this.props.id}></div>
		</Layout>
		)
	}
}


export default DvHub
