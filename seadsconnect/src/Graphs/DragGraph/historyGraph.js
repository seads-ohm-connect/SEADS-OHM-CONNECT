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
    var margin = 10;
    var width = svgWidth - margin;
    var height = svgHeight - margin;

    var svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleTime().rangeRound([0, width]);
      var y = d3.scaleLinear().rangeRound([height, 0]);

      var line = d3.line();


  }
}
