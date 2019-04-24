import React, { Component } from 'react'
import * as d3 from 'd3'


var d3 = require("d3");

export default class historyGraph() extends Component{


  function drawChart (data) {

    const testData = [
      {day: "Monday", power: 10},
      {day: "Tuesday", power: 30},
      {day: "Wednesday", power: 50},
      {day: "Thursday", power: 20},
      {day: "Friday", power: 40},
      {day: "Saturday", power: 70},
      {day: "Sunday", power: 60}
    ];

    var svgWidth = 500, svgHeight = 400;
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

      var g = svg.append("g")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleTime().rangeRound([0, width]);
      var y = d3.scaleLinear().rangeRound([height, 0]);

      var lineLastWeek = d3.line()
        .x(function(d) { return x(d.day); })
        .y(function(d) { return y(d.powers); });

      var lineThisWeek = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.open); });


      x.domain(testData.map(function(d) { return d.day; }));
      y.domain(testData.map(function(d) { return d.power; }));


  }
}
