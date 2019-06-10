var d3 = require("d3");

export default class MonthGraph {

	drawGraph(svg, dimensions, data, monthInt, yearInt) {
      
		//hard coded values for dimensions of the svg
		var width = dimensions.width;
		var height = dimensions.height;
		var margin = dimensions.margin;

      //scales to simplify domain and ranges instead of calculating 
      //them manually
		var xDate = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);
		var heighty = d3.scaleLinear().range([0, height]);
      var xIndex = d3.scaleLinear().range([0,width]);
      heighty.domain([0, d3.max(data, function(d) {return d;})]);
      y.domain([0, d3.max(data, function(d) {return d;})]);
      xIndex.domain([0, data.length]);
      xDate.domain([new Date(yearInt, monthInt-1, 1), new Date(yearInt, monthInt-1, data.length)]);
      
      var barWidth = (width)*(5/6)/data.length;

      var bar = svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .style("fill", "red")
        .attr("x", function(d, i){return margin.left + xIndex(i);})
        .attr("y", function(d){return height+margin.top - heighty(d);})
        .attr("width", barWidth)
        .attr("height", function(d) {return heighty(d);});
      
      var areaFill = d3.area()
        .curve(d3.curveMonotoneX)
        .x(function(d,i) { return xIndex(i);})
        .y(function(d) {return y(d);});
      
      var line = svg.append("path")
        .data([data])
        .attr("fill", "blue")
        .attr("class", "line")
        .style("stroke", "rgba(101, 102, 98, 1.0)")
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
      
      var xtext = svg.append("text")
        .attr("x", margin.left + width/2)
        .attr("y", height+margin.top+margin.bottom*3/4)
          .style("text-anchor", "middle")
            .text("Month: " + monthInt + " Year: " + yearInt);
      
      var ytext = svg.append("text")
        .attr("x", margin.left/4)
        .attr("y", margin.top+height/2)
          .style("text-anchor", "left")
            .text("Watts ");
	}

}
