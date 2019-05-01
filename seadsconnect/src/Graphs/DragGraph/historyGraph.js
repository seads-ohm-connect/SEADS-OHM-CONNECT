import React, { Component } from 'react'
import * as d3 from 'd3'


var d3 = require("d3");

export default class historyGraph() extends Component{


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
      .y(function(d) { return y(d.power); });

    var lineThisWeek = d3.line()
      .x(function(d) { return x(d.day); })
      .y(function(d) { return y(d.power; });

    function draw(data, device) {

      data.forEach(function(d) {


      })
      d3.json()
      x.domain(testData.map(function(d) { return d.day; }));
      y.domain(testData.map(function(d) { return d.power; }));

    }


  }
}
