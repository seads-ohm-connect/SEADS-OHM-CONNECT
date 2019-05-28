import React, { Component } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Thresholdbar from "../components/Thresholdbar/thresholdbar"
import { Button, Row, Form , ToggleButton, Col, ButtonToolbar, ButtonGroup} from "react-bootstrap"
import Appliances from "../Graphs/DragGraph/appliances"
import * as d3Chromatic from 'd3-scale-chromatic';

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
            /* is this reasonable?
              monthdata:
              {
                 month: {days:28, energy: []} 
              }
            */
            monthData: {
               "May2019" : {days: 0, Energy: []}
            },
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
        
		var width = 1000;
		var height = 400;
		var margin = {left: 80, right: 60, top:30, bottom:60};
      var TooltipValues = {height: 40, width: 300, textOffset: 15, heightOffset: 80, leftOffset: 130};
      var dimensions = {margin, width, height};
      /*
        Svg is d3's canvas basically.
        Declared here because svg is persistent and doesn't
        need to be "drawn" every second.
      */
		var svg = d3.select("body")
		  .append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.left + margin.right)
		var svg2 = d3.select("body")
		  .append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.left + margin.right)
      
      //draw the realtime graph once a second
		setInterval(() => this.drawChart(svg, dimensions, TooltipValues), 1000);
      this.drawChart(svg, dimensions, TooltipValues);
      this.updateMonthData();
      this.drawMonthChart(svg2, dimensions);
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }
	
	updatePower = () => {
		var liveUpdateURL = new String("http://seadsone.soe.ucsc.edu:8000/api/seads/power/last");
		d3.json(liveUpdateURL).then( (liveData) => {
			var watts = liveData.DataPoints[0].Power;
         //temporary solution to not see the seads plug device in baskin
         if (watts == 0)
            return;
			var currentTime = new Date(liveData.DataPoints[0].Timestamp*1000).toLocaleString();
         var currentData = this.state.savedData;
         //  This ensures that only new data will get saved
         //by checking the latest time saved and updated time.
         //  Also, if no data saved yet, check to see if we got response
         if (currentData.length > 0) {
           if (currentTime == currentData[currentData.length-1].Second)
             return;
         }
         else {
            if (currentTime == "12/31/1969, 4:00:00 PM")
               return;
         }
			this.setState({liveData: watts });	
			this.setState({liveTime: currentTime });
		});
	}
   
   updateMonthData = () => {
      //this data is to be replaced when real data from the SEADS team is given
      var month = 3
      var numDays = 31;
      var monthData = this.state.monthData;
      var month = "May2019";
      for (var i = 0; i < Math.round(numDays); i++) {
         monthData[month].Energy[i] = Math.round(Math.random() * 1500);
      }
      monthData[month].days = monthData[month].Energy.length;
      this.setState({monthData : monthData});
      console.log(this.state.monthData);
   }
	
   drawMonthChart = (svg, dimensions) => {
      //style is slightly different in this this one compared to live graph
      //should probably change 
      var width = dimensions.width;
      var height = dimensions.height;
      var margin = dimensions.margin;
      //month we are currently working on. make this dynamic somehow
      var month = "May2019";
      
		var xDate = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);
		var heighty = d3.scaleLinear().range([0, height]);
      var xIndex = d3.scaleLinear().range([0,width]);
      
      var savedData = this.state.monthData;
      var energyData = savedData[month].Energy;
      heighty.domain([0, d3.max(energyData, function(d) {return d;})]);
      
      xDate.domain([new Date(2019,4,1), new Date(2019,4,31)]);
      y.domain([0, d3.max(energyData, function(d) {return d;})]);
      xIndex.domain([0,energyData.length]);
      
      var barWidth = (width)*(5/6)/energyData.length;
      var barWidthSpacing = (width)*(1/6)/(energyData.length-1)
      
      
      var bar = svg.selectAll("rect")
         .data(energyData)
          .enter().append("rect")
        .style("fill","red")
        .attr("x",function(d, i){return margin.left+xIndex(i);})
        .attr("y",function(d){return height+margin.top-heighty(d);})
        .attr("width", "" + barWidth)
        .attr("height",function(d) {return heighty(d);});
      
        
      var areaFill = d3.area()
        .curve(d3.curveMonotoneX)
        .x(function(d, i) { console.log(i+"x");return xIndex(i); })
        .y(function(d) { console.log(d+"y");return y(d); });
      
      var line = svg.append("path")
        .data([energyData])
        .attr("fill", "blue")
        .attr("class", "line")
        .attr("d", areaFill)
        .attr("stroke", "blue")
        .attr("stroke-width", "2px")
        .attr("transform", "translate(" + margin.left + "," + (margin.top) + ")");
      
      var xaxis = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + (margin.top+height) + ")")
        .call(d3.axisBottom(xDate)
                .ticks(6)
                .tickFormat(d3.timeFormat("%d %b")));
        
      var yaxis = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.axisLeft(y));
   }
   
	drawChart = (svg, dimensions, TooltipValues) => {
      //hard coded values for dimensions of the graph
      
		var width = dimensions.width;
		var height = dimensions.height;
		var margin = dimensions.margin;
		
      //scales eg: the bottom of y axis corresponds to lowest watt instead of 0
		var x = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);
      
      /* Probably remove this and just detect is the graph is live */
		var mode = "live";
		
		var currentData = this.state.savedData;
		
		/* mode 1: random data  between 1 and 101 */
		if (mode === "random") {
			currentData[currentData.length]={"Second":currentData.length+1, "Energy":(Math.floor(Math.random()*100)+1)};
		}
		
		/* mode 2: based on live data */
		/* TODO(jordan): This assumes that data comes in consistently at once 
		 * every second. This will not always be the case in real life.
		 */
      console.log(this.state.liveTime);
		if (mode === "live") {
         //this assumes at least something is on. maybe we shouldn't do that?
         if (this.state.liveTime == "12/31/1969, 4:00:00 PM") {
            return;
            currentData[0] = {"Second": 0, "Energy":this.state.liveData,"unixtime":this.state.liveTime};
         }
         else {
            console.log(this.state.liveTime);
           //TODO(jordan): updates made below make tooltip location inaccurate.
           //Make sure that tooltips work correctly after below updates are made
           if (currentData.length != 0 && currentData[currentData.length-1].unixtime == this.state.liveTime) {
              //don't update the graph because no new information
           }
           else { //updates the graph
             console.log(currentData[currentData.length-1]);
			    currentData[currentData.length]={"Second":currentData.length+1, "Energy":this.state.liveData, "unixtime":this.state.liveTime};
           }
         }
		}
		
		this.setState({savedData : currentData});
		  
		x.domain([d3.min(currentData, function(d) {return d.Second;})
		         ,d3.max(currentData, function(d) {return d.Second;})]);
		y.domain([0,d3.max(currentData, function(d) {return d.Energy;})]);
		
		/* This is used to remove the current graph before replacing with updated graph */
		//d3.selectAll("svg").remove()
      //d3.selectAll("path").remove();
      //if (path) path.remove();
		  
      
		var areaFill = d3.area()
        .curve(d3.curveMonotoneX) //curveLinear, curveStep, curveCardinal, curveMonotoneX, d3.curveCatmullRom work
		  .x(function(d) { return x(d.Second); })
		  .y(function(d) { return y(d.Energy); })
		  .y1(height);
		
		
      //the line of the graph
      console.log(currentData);
		var path = svg.append("path")
		  .data([currentData])
			.attr("fill", "#ffb2b2")
			.attr("class", "line")
			.attr("d", areaFill)
			.attr("stroke", "#ff0000")
			.attr("stroke-width", "2px")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
         .attr("stroke-linejoin", "round")
         .attr("stroke-miterlimit", "2")
         .attr("stroke-linecap", "round");
		
      //x axis placement
		var xaxis = svg.append("g")
		  .attr("transform", "translate(" + margin.left + "," + (margin.top+height) + ")")
		    .call(d3.axisBottom(x));
		  
      //y axis placement
		var yaxis = svg.append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		  .call(d3.axisLeft(y));
		  
      //x axis text
		var xtext = svg.append("text")
		  .attr("x", margin.left+width/2)
		  .attr("y", height+margin.top+margin.bottom/2)
		    .style("text-anchor", "middle")
		      .text("Time (in second)");
		  
      //y axis scale
		var ytext = svg.append("text")
		  .attr("x", 10)
		  .attr("y", margin.top+height/2)
		  .attr("text-anchor", "left")
		    .text("Watts");
      
      //this removes the following things to redraw them to update the graph
      setTimeout( function() { path.remove(); 
                               xaxis.remove();
                               yaxis.remove();
                               xtext.remove();
                               ytext.remove();
      }, 1000);
      
      /* TODO(graph dev): Stop updates from interfering tooltips
         To do this, only make a new tooltip rectangle upon mouse movement.
         I felt that this would take too much time to be worth implementing for now.
      */
      svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "transparent")
        .on("mouseover", function() {mousemove(d3.mouse(this)[0]); tooltip.style("display", null);})
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function() {mousemove(d3.mouse(this)[0]); tooltip.style("display", null);});
          
      var tooltip = svg.append("g")
        .style("display", null);
      
      var xHover = tooltip.append("line")
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "Red")
        .attr("stroke-width", "1px")
        .attr("pointer-events", "none");
        
      var yHover = tooltip.append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "Red")
        .attr("stroke-width", "1px")
        .attr("pointer-events", "none");
      
      var circle = tooltip.append("circle")
        .attr("x", -100) //-100 is to fix things appearing in the top left
        .attr("y", -100) //-100 is to fix things appearing in the top left
        .attr("r", 7) //radius of 7
        .attr("fill", "white")
        .attr("stroke-width", "2px")
        .attr("stroke", "white")
        .attr("pointer-events", "none");
        
      var tooltipRect = tooltip.append("rect")
        .attr("x", -100)
        .attr("y", -100)
        .attr("width", TooltipValues.width)
        .attr("height", TooltipValues.height)
        .attr("fill", "white")
        .attr("stroke", "green")
        .attr("stroke-width", "2px")
        .attr("pointer-events", "none");
        
      var tooltipText = tooltip.append("text")
        .attr("x", TooltipValues.textOffset)
        .attr("dy", ".31em")
        .attr("pointer-events", "none");
        
      function mousemove(x) {
         var numIndexes = currentData.length - 1;
         var mouseAtIndex = Math.round((parseFloat(x)/dimensions.width)*numIndexes)
         var indexXPosition = mouseAtIndex * (dimensions.width/numIndexes)
         var energy = currentData[mouseAtIndex].Energy;
         var time = currentData[mouseAtIndex].unixtime;
         var maxEnergy = d3.max(currentData, function(d) {return d.Energy;})
         var indexYPosition = (1-parseFloat(energy)/maxEnergy)*dimensions.height
         
         if (x > (margin.top + width - TooltipValues.width)) {
            tooltipText.attr("x", -TooltipValues.width);  
            tooltipRect.attr("transform", "translate(" + -TooltipValues.width+TooltipValues.heightOffset + "," + TooltipValues.heightOffset + ")");
         }
         else {
            tooltipText.attr("x", 50);
            tooltipRect.attr("transform", "translate(" + TooltipValues.leftOffset + "," + TooltipValues.heightOffset + ")");
         }
         tooltip.attr("transform", "translate(" + (indexXPosition+dimensions.margin.left) + "," + (indexYPosition+dimensions.margin.top) +")");
         circle.attr("stroke", "red");
         tooltipText.text("Power Usage: " + energy + "\r\nTime: " + time); //how do I separate this? probably need 2 texts
         xHover.attr("y2", dimensions.height - indexYPosition);
         yHover.attr("x2", dimensions.width - indexXPosition)
               .attr("x2", -indexXPosition);
      }
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
