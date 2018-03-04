// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var xLinearScale = d3.scaleLinear().range([0, width]).domain([3, 19]);

var yLinearScale = d3.scaleLinear().range([height, 0]).domain([6, 23]);

var xAxis = d3.axisBottom(xLinearScale);
var yAxis = d3.axisLeft(yLinearScale);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", function(error, data) {
  if (error) throw error;

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
      
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  svg.selectAll(".dot")
      .data(data)
      .enter()
    .append("circle")
      .attr("class", "dot")
      .attr("state", function(data) { return data.state; })
      .attr("r", 15)
      .attr("cx", function(data) { return xLinearScale(data.productionTransport); })
      .attr("cy", function(data) { return yLinearScale(data.percentSmoke); })
      .style("fill", 'b5b415')
      .on("mouseover", function(d) {
        var circle = d3.select(this);
        var label = svg.selectAll(".dot-label").filter(function(e) { 
            return e.state === circle.attr('state');
        });
        circle.style("stroke", "black").style("stroke-width", 2);
        label.style("opacity", 1);
      })
      .on("mouseout", function(d) {
        var circle = d3.select(this);
        var label = svg.selectAll(".dot-label").filter(function(e) { 
            return e.state === circle.attr('state');
        });
        circle.style("stroke", "none"); 
        label.style("opacity", 0);
      });

  svg.selectAll(".dot-label")
      .data(data)
      .enter()
    .append("text")
      .attr("class", "dot-label")
      .attr("state", function(data) { return data.state; })
      .attr("x", function(data) { return xLinearScale(data.productionTransport); })
      .attr("y", function(data) { return yLinearScale(data.percentSmoke); })
      .text( function (data) { return (data.state); })
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .style("opacity", 0);
 });