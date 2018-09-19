// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// dataSource = "StarterCode"


// Import and Load Data
//var extract = [];
var labels = [];
d3.csv("assets/data/data.csv").then(function(newsData){
  console.log(newsData);
  newsData.forEach(function(news)  {
  news.poverty =+ news.poverty;
  news.healthcare =+ news.healthcare;
  news.smokes =+ news.smokes;
  news.age =+ news.age;
  news.state =+ news.state;
  labels.push(news.abbr)

  });
   console.log(labels);

   // Configure FirstGraph x scale(Poverty) and y Scale(Healthcare)
var xScale = d3.scaleLinear()
.domain([d3.min(newsData, d=>d.poverty)-1, d3.max(newsData, d=>d.poverty)+1])
.range([0, width]);
   
var yScale = d3.scaleLinear()
.domain([0, d3.max(newsData, d=>d.healthcare)])
.range([height, 0])

// var stLabels = d3.scaleLinear()
// .domain([newsData,d=>d.abbr]);



var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);

//Plot my Scatter Plot - FirstGraph
var circlesGroup = chartGroup.selectAll("circle")//circle
.data(newsData)
.enter()
.append("circle")

//.append("text").text(d=>newsData(d.abbr))
.attr("cx", d => xScale(d.poverty))
.attr("cy", d => yScale(d.healthcare))

.attr("r", "10")
.attr("fill", "blue")
.attr("opacity", ".65")
.text(labels);



// var toolTip = d3.select("body").append("div")
// .attr("class", "tooltip");



var toolTip = d3.tip()
.attr("class", "tooltip")
.html(function(d) {
  return (`<br>Lacks Healthcare: ${d.healthcare}(%)<br>In Poverty: ${d.poverty}(%)`);
});


chartGroup.call(toolTip);

circlesGroup.on("mouseover", function(data) {
  toolTip.show(data)
  toolTip.style("display", "block")
  .style("left",d3.event.pageX + "px")
  .style("top",d3.event.pageY + "py")
})
  // onmouseout event
  .on("mouseout", function(data, index) {
    toolTip.hide(data);
  });


// Step 4: Append Axes to the chart
// ==============================
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

   
chartGroup.append("g")
.call(leftAxis);


// chartGroup.append("text")
// .text(labels);


//Label axes - Y-axis
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 40)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "axisText")
.text("Lacks Healthcare (%)");

//Label axes - X-axis
chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("class", "axisText")
.text("In Poverty(%)");





// // Configure Seccond Graph-  x scale(Smoker) and y Scale(Age)
// var xScale2 = d3.scaleLinear()
// .domain([20, d3.max(newsData, d=>d.smokes)])
// .range([0, width]);

// var yScale2 = d3.scaleLinear()
// .domain([0, d3.max(newsData, d=>d.age)])
// .range([height, 0])

// var bottomAxis2 = d3.axisBottom(xScale2);
// var leftAxis2 = d3.axisLeft(yScale2);

 

   

   
   
 
});