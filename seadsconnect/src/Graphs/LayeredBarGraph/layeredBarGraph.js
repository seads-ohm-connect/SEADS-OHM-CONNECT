import React, { Component } from "react"
import './barGraph.css'

var d3 = require("d3");

export default class LayeredBarGraph extends Component {

	initGraph() {

	  //data will be each day of a week split by appliance
	  const data = this.props.data;

      // Add a total value for each day
      const smTotal = data.map(d => {
      	const counts = d3.entries(d.counts);
      	const total = d3.sum(counts, c => c.value);
      	return { day: d.day, counts, total };
      });

      const scaleY = d3
	    .scaleLinear()
	    .range([0, 200])
	    .domain([0, d3.max(smTotal, d => d.total)]);

      const scaleColor = d3
	    .scaleOrdinal()
	    .range(['#0000ff', '#0033ff', '#0066ff', '#0099ff'])
	    .domain(['Washer', 'Dryer', 'Oven', 'Lights']);

      // Select the figure element
      const stack = d3.select('.stack');

      //create a tooltip somewhere within the body (position it later)
      const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'custom_tooltip')
        .attr('id', 'tooltip');
      
      // Add a div for each day
      const group = stack
      	.selectAll('.group')
      	.data(smTotal)
      	.enter()
      	.append('div')
      	.attr('class', 'group');
      
      // Add a block for each social media type
      const block = group
      	.selectAll('.block')
      	.data(d => d.counts)
      	.enter()
      	.append('div')
      	.attr('class', 'block')
      	// And scale the height of the box based on the value
      	.style('height', d => `${scaleY(d.value)}px`)
      	// Scale the color based on the social media type
      	.style('background-color', d => scaleColor(d.key));
      

      block.on("mousemove", function(d){
    	  tooltip
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 20) + 'px')
            .style('display', 'inline-block')
            .html(d.key + ": " + Math.floor(d.value) + " Watts");
        }
      );

      block.on("mouseout", function(){
    	  tooltip.style('display', 'none')
        }
      );

      // Add a day label
      const label = group
      	.append('text')
      	.text(d => d.day)
      	.attr('class', 'label');	
      
      // Add a total count label
      const count = group
      	.append('text')
      	.text(d => d3.format('')(Math.floor(d.total)))
      	.attr('class', 'count');

    }

  

    componentDidMount() {
      this.initGraph();
    }

	render() {

	  return (
	  	<p class="bordered">
	  	  <figure class='stack'></figure>
	  	</p>
	  );
	}
}