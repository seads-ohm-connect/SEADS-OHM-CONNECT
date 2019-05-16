var d3 = require("d3");

export default class RealTimeGraph {

	drawGraph(svg, dimensions, TooltipValues, self, liveData, savedData_tag, fillColor, lineColor, lowerBound, tooltips, mode) {
		//hard coded values for dimensions of the graph
    if (!liveData)
      liveData = 0;
      
		var width = dimensions.width;
		var height = dimensions.height;
		var margin = dimensions.margin;

		
      //scales eg: the bottom of y axis corresponds to lowest watt instead of 0
		var x = d3.scaleLinear().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);

      
      /* Probably remove this and just detect is the graph is live */

		var currentData = self.state[savedData_tag];
    var prevData = JSON.parse(JSON.stringify(currentData));


    var length = currentData === null ? 0 : currentData.length;
		/* mode 1: random data  between 1 and 101 */
		if (mode === "random") {
      liveData = (Math.floor(Math.random()*100)+1);
			currentData[length]={"Second":length+1, "Energy":liveData};
		}
		
		/* mode 2: based on live data */
		/* TODO: This assumes that data comes in consistently at once 
		 * every second. This will not always be the case in real life.
		*/
		if (mode === "live") {
			currentData[currentData.length]={"Second":length+1, "Energy":liveData};
		}

    var lBound, rBound = 0;
    if (lowerBound === true) {
      lBound = d3.min(length <= 5 ? currentData : currentData.slice(length - 5, length), function(d) {return d.Energy;});
      rBound = d3.max(length <= 5 ? currentData : currentData.slice(length - 5, length), function(d) {return d.Energy;});
    }
		
		self.setState({[savedData_tag] : currentData});
		  

		//y.domain([lBound ,d3.max(currentData, function(d) {return d.Energy;}) * 2]);

    var max = d3.max(currentData, function(d) {return d.Second});
    x.domain([max - 5 < 1 ? 1 : max - 5, 
             max <= 5 ? 5 : max]);

    


    y.domain([lBound / 2, rBound * 2]);
		
		/* This is used to remove the current graph before replacing with updated graph */
		//d3.selectAll("svg").remove()
      //d3.selectAll("path").remove();
      //if (path) path.remove();
		  
      //
		var areaFill = d3.line()
        .curve(d3.curveCatmullRom) //curveLinear, curveStep, curveCardinal, curveMonotoneX, d3.curveCatmullRom work
		  .x(function(d) { return x(d.Second === null ? 0 : d.Second); })
		  .y(function(d) { return y(d.Energy === null ? 0 : d.Energy); })
		  //.y1(height); if you want to use d3.area() instead of d3.line(). Area doesn't work too well with transitions though.

	
      //declare svg
      //the line of the graph

    var path;
    if (svg.select("path").empty()) {
      path = svg.append("path");
    }
    else {
      path = svg.select("path");
      path.transition();
    }

		path
		  .data([currentData])
      .transition()
			.attr("fill", "none")
			.attr("class", "line")
      .attr("d", areaFill)
			.attr("stroke", lineColor)
			.attr("stroke-width", "2px")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("stroke-linejoin", "round")
      //.attr("stroke-miterlimit", "2")
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
		    .text("Watts (" + liveData + ")");
      
      //this removes the following things to redraw them to update the graph
      setTimeout( function() { //path.remove(); 
                               xaxis.remove();
                               yaxis.remove();
                               xtext.remove();
                               ytext.remove();
      }, 1000);
      
      /* TODO(graph dev): Stop updates from interfering tooltips
         To do this, only make a new tooltip rectangle upon mouse movement.
         I felt that this would take too much time to be worth implementing for now.
      */
      if (tooltips) {

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
           var time = currentData[mouseAtIndex].Second;
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
	}

}
