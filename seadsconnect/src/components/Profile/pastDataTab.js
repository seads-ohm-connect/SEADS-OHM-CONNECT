import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Media from 'react-bootstrap/Media'

import MonthGraph from "../../Graphs/Month/MonthGraph"
import LayeredBarGraph from '../../Graphs/LayeredBarGraph/layeredBarGraph'
import ImprovementBarGraph from '../../Graphs/ImprovementBarGraph/ImprovementBarGraph'
import ClockHistogram from '../../Graphs/ClockHistogram/ClockHistogram'


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//using random arrays to populate the graphs for now.
const layeredBarGraphData = [
        {
          day: 'Sun.',
          counts: { Washer: getRandomArbitrary(25, 100), Dryer: getRandomArbitrary(25, 100), Oven: getRandomArbitrary(25, 100), Lights: getRandomArbitrary(25, 100) }
        },
        {
          day: 'Mon.',
          counts: { Washer: getRandomArbitrary(25, 100), Dryer: getRandomArbitrary(25, 100), Oven: getRandomArbitrary(25, 100), Lights: getRandomArbitrary(25, 100) }
        },
        {
          day: 'Tues.',
          counts: { Washer: getRandomArbitrary(25, 100), Dryer: getRandomArbitrary(25, 100), Oven: getRandomArbitrary(25, 100), Lights: getRandomArbitrary(25, 100) }
        },
        {
          day: 'Wed.',
          counts: { Washer: getRandomArbitrary(25, 100), Dryer: getRandomArbitrary(25, 100), Oven: getRandomArbitrary(25, 100), Lights: getRandomArbitrary(25, 100) }
        },
        {
          day: 'Th.',
          counts: { Washer: getRandomArbitrary(25, 100), Dryer: getRandomArbitrary(25, 100), Oven: getRandomArbitrary(25, 100), Lights: getRandomArbitrary(25, 100) }
        },
        {
          day: 'Fri.',
          counts: { Washer: getRandomArbitrary(25, 100), Dryer: getRandomArbitrary(25, 100), Oven: getRandomArbitrary(25, 100), Lights: getRandomArbitrary(25, 100) }
        },
        {
          day: 'Sat.',
          counts: { Washer: getRandomArbitrary(25, 100), Dryer: getRandomArbitrary(25, 100), Oven: getRandomArbitrary(25, 100), Lights: getRandomArbitrary(25, 100) }
        }
      ];

const improvementBarGraphData = [
        {
          day: 'S.',
          watts: getRandomArbitrary(-50, 50)
          },
        {
          day: 'M.',
          watts: getRandomArbitrary(-50, 50)
        },
        {
          day: 'T.',
          watts: getRandomArbitrary(-50, 50)
        },
        {
          day: 'W.',
          watts: getRandomArbitrary(-50, 50)
        },
        {
          day: 'T.',
          watts: getRandomArbitrary(-50, 50)
        },
        {
          day: 'F.',
          watts: getRandomArbitrary(-50, 50)
        },
        {
          day: 'S.',
          watts: getRandomArbitrary(-50, 50)
        }
      ];

const clockGraphData = [
      {hour: "0", watts: 50},
      {hour: "1", watts: getRandomArbitrary(50, 100)},
      {hour: "2", watts: getRandomArbitrary(50, 100)},
      {hour: "3", watts: getRandomArbitrary(50, 100)},
      {hour: "4", watts: getRandomArbitrary(50, 100)},
      {hour: "5", watts: getRandomArbitrary(50, 100)},
      {hour: "6", watts: getRandomArbitrary(50, 100)},
      {hour: "7", watts: getRandomArbitrary(50, 100)},
      {hour: "8", watts: getRandomArbitrary(50, 100)},
      {hour: "9", watts: getRandomArbitrary(50, 100)},
      {hour: "10", watts: getRandomArbitrary(50, 100)},
      {hour: "11", watts: getRandomArbitrary(50, 100)},
      {hour: "12", watts: getRandomArbitrary(50, 100)},
      {hour: "13", watts: getRandomArbitrary(50, 100)},
      {hour: "14", watts: getRandomArbitrary(50, 100)},
      {hour: "15", watts: getRandomArbitrary(50, 100)},
      {hour: "16", watts: getRandomArbitrary(50, 100)},
      {hour: "17", watts: getRandomArbitrary(50, 100)},
      {hour: "18", watts: getRandomArbitrary(50, 100)},
      {hour: "19", watts: getRandomArbitrary(50, 100)},
      {hour: "20", watts: getRandomArbitrary(50, 100)},
      {hour: "21", watts: getRandomArbitrary(50, 100)},
      {hour: "22", watts: getRandomArbitrary(50, 100)},
      {hour: "23", watts: getRandomArbitrary(50, 100)},

      {hour: "24", watts: 50}
];

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

            <p/>
  			    <p id='header'>
  			    </p>
		      </Jumbotron>

		    <ul className="list-unstyled">
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Show how many OhmConnect Credits the user has gained</h5>
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
  			      Graphs showing e consumption over the day/month/year.
  			      When the deaggregation works we could possibly show appliances that are using 
  			      the most energy.
              <p/>
              <p>
                <LayeredBarGraph data={layeredBarGraphData}/>
              </p>
  			    </p>
  			  </Media.Body>
  			</Media>
			
  			<Media as="li">
  			  <Media.Body>
  			    <h5>Show information about how much a user improves over the last week</h5>
  			    <p>
  			      This is a simple graph that can show how much better or worse a user saved energy compared to last week.
              <p/>
              <p>
                <ImprovementBarGraph data={improvementBarGraphData} />
              </p>
  			    </p>
  			  </Media.Body>
  			</Media>

        <Media as="li">
          <Media.Body>
            <h5>A chart that shows a breakdown of the past day</h5>
            <p>
              A mockup chart that shows how much enery is used over a 24 hour period. 
              <p/>
              <p>
                <ClockHistogram data={clockGraphData} /> 
              </p>
            </p>
          </Media.Body>
        </Media>
  			</ul>
		    </div>
		)
	}
}

