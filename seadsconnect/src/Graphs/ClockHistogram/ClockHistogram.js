import React, { Component } from "react"
import './histogram.css'

var d3 = require("d3");

export default class ClockHistogram extends Component {

  initGraph() {

    const data = this.props.data;

    const width = 460,
      height = 400,
      chartRadius = height / 2 - 40;
    
    let svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    let tooltip = d3.select('body').append('div')
      .attr('class', 'custom_tooltip');
    
    const PI = Math.PI,
      arcMinRadius = 10,
      arcPadding = 10,
      labelPadding = -5,
      numTicks = 24;

    
    let scale = d3.scaleLinear()
      .domain([0, 24])
      .range([0, 2 * PI]);
  
    let ticks = scale.ticks(numTicks).slice(0, -1);
    let keys = data.map((d, i) => d.hour);

    //number of arcs
    const numArcs = 1;
    const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

    var x = d3.scaleTime()
        .domain([0, 2 * PI]);
    
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.watts)]);

    let line = d3.lineRadial()
      .angle(function(d) { return (d.hour / 24 * 2 * PI); })
      .radius(function(d) { return y(d.watts) * chartRadius; })
      .curve(d3.curveCatmullRom)
  
    let arc = d3.arc()
      .innerRadius((d, i) => getInnerRadius(i))
      .outerRadius((d, i) => getOuterRadius(i))
      .startAngle(0)
      .endAngle((d, i) => scale(d))
  
    let radialAxis = svg.append('g')
      .attr('class', 'r axis')
      .selectAll('g')
        .data(data)
        .enter().append('g');
  
    radialAxis.append('circle')
      .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

  
    let axialAxis = svg.append('g')
      .attr('class', 'a axis')
      .selectAll('g')
        .data(ticks)
        .enter().append('g')
          .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

  
    axialAxis.append('line')
      .attr('x2', chartRadius);
  
    axialAxis.append('text')
      .attr('x', chartRadius + 10)
      .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
      .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
      .text(d => d);
  
    //data arcs
    let arcs = svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('stroke', '#4099ff')
      .attr('d', line);

  
    arcs.on('mousemove', function showTooltip(d) {
      var posX = -d3.mouse(this)[1];
      var posY = d3.mouse(this)[0];


      var deg; 
      if (posX > 0 && posY > 0) deg = Math.floor(Math.atan(posY / posX) * 180 / PI);
      else if (posX < 0 && posY > 0 || posX < 0 && posY < 0) deg = 180 + Math.floor(Math.atan(posY / posX) * 180 / PI);
      else if (posX > 0 && posY < 0) deg = 360 + Math.floor(Math.atan(posY / posX) * 180 / PI); 
      
      var index = Math.floor(deg / 15);
      tooltip.style('left', (d3.event.pageX + 10) + 'px')
        .style('top', (d3.event.pageY - 25) + 'px')
        .style('display', 'inline-block')
        .html("Hour: " + index + " Watts: " + Math.floor(data[index].watts));
    })

    arcs.on('mouseout', function(){
        tooltip.style('display', 'none')
    })
  
  
    function arcTween(d, i) {
      let interpolate = d3.interpolate(0, d.hour);
      return t => arc(interpolate(t), i);
    }
  
    function rad2deg(angle) {
      return angle * 180 / PI;
    }
  
    function getInnerRadius(index) {
      return arcMinRadius + (numArcs - (1)) * (arcWidth + arcPadding);
    }
  
    function getOuterRadius(index) {
      return getInnerRadius(index) + arcWidth;
    }
  }

  componentDidMount() {
      this.initGraph();
    }

  render() {

    return (
      <div class="bordered">
        <svg></svg>
      </div>
    )
  }
}