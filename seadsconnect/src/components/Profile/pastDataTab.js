import React, { Component } from "react"
import ListGroup from 'react-bootstrap/ListGroup'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Media from 'react-bootstrap/Media'
import MonthGraph from "../../Graphs/Month/MonthGraph"

var d3 = require("d3");

export default class PastData extends Component {


  componentDidMount() {
   var monthGraphExample = new MonthGraph();
      var width = 500 * .90;
      var height = 300 * .90;
      var margin = {left: 0, right: 60, top:0, bottom:60};
      var TooltipValues = {height: 40, width: 300, textOffset: 15, heightOffset: 80, leftOffset: 130};
      var dimensions = {margin, width, height};
      var svg = d3.select("#header")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.left + margin.right)   
        monthGraphExample.drawGraph(svg, dimensions, [300,400,100,300,250,600,1000,567,286,373,73,731,824,363,768,456,375,357,136,834,237,365,246,23,175,643,789,287,293,387,202], 5, 2019);
  }

	render() {
		return (
			<div>
			  <Jumbotron>
  			    <h1>This page is where past data can go.</h1>
  			    <p id='header'>
  			    Placeholder
  			    </p>
		      </Jumbotron>

		    <ul className="list-unstyled">
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Show how many Ohm Connect Credits the user has gained</h5>
  			    <p>
  			    Show a wallet and matrics of how much the user has earned over the month/year 
  			    and project future earnings.  
  			    </p>
  			  </Media.Body>
  			</Media>
			
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Charts showing power usage</h5>
  			    <p>
  			      Graphs showing power consumption over the day/month/year.
  			      When the deaggregation works we could possibly show appliances that are using 
  			      the most energy. 
  			    </p>
  			  </Media.Body>
  			</Media>
			
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Show information about past ohm hours</h5>
  			    <p>
  			      When they  typically occur and make estimates for when they will occur next.
  			    </p>
  			  </Media.Body>
  			</Media>
  			</ul>
		    </div>
		)
	}
}