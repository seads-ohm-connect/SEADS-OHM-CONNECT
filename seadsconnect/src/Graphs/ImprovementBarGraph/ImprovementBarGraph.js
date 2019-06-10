import React, { Component } from "react"
import './improvementGraph.css' 

var d3 = require("d3");


export default class ImprovementBarGraph extends Component {

	initGraph() {

	  //data will be each day of a week
	  const data = this.props.data;

	  var max = d3.max(data, d => d.watts);
	  var min = d3.min(data, d => d.watts);

	  var p_height = document.getElementById('graph').style.height;

	  const scaleY = d3
	    .scaleLinear()
	    .range([0,200])
	    .domain([0, max]);

	  //select the graph element  
	  const graph = d3.select('.graph');

	  //add a group for each day
	  const group = graph
      	.selectAll('.n_group')
      	.data(data)
      	.enter()
      	.append('div')
      	.attr('class', 'n_group')
      	.style('height', `${(max > Math.abs(min) ? max : Math.abs(min)) * 2 + 15}px`);


	  //add bars
	  const bar = group
	    .append('div')
	    .attr('class', 'bars')
	    .style('top', d => d.watts > 0 ? `${min}px` : `${min-d.watts}px`)
	    .style('background-color', d => d.watts > 0 ? '#33c437' : '#e52b2b')
	    .style('height', d => `${Math.abs(d.watts) < 1 ? 1 : Math.abs(d.watts)}px`);

	  bar.on("mousemove", function(d){
    	  tooltip
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 20) + 'px')
            .style('display', 'inline-block')
            .style('color', d.watts > 0 ? '#33c437' : '#e52b2b')
            .html(Math.floor(d.watts) + " Watts");
        }
      );

      bar.on("mouseout", function(){
    	  tooltip.style('display', 'none')
        }
      );
    

	  //add a day label
	  const label = group
	    .append('text')
	    .text(d => d.day)
	    .attr('class', 'label');


	 const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'custom_tooltip')
        .attr('id', 'tooltip');

	
	}


	componentDidMount() {
      this.initGraph();
    }

	render() {

		return (
			<div class="n_bordered">
			  <figure class="graph" id='graph'></figure>
			</div>
		);
	}

}
