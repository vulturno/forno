function lluviaMes() {

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var y = d3.scaleLinear()
              .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('.lluvias-por-mes-chart-container')
        .append('svg')
        .attr('class', 'lluvias-mes-media-chart-graph')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    d3.csv("csv/meses-lluvia.csv", function(error, data) {
      if (error) throw error;

      // format the data
      data.forEach(function(d) {
        d.cantidad = +d.cantidad;
      });

      // Scale the range of the data in the domains
      x.domain(data.map(function(d) { return d.mes; }));
      y.domain([0, d3.max(data, function(d) { return d.cantidad + (d.cantidad / 4) })]);

      // append the rectangles for the bar chart
      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.mes); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.cantidad); })
          .attr("height", function(d) { return height - y(d.cantidad); });

      // add the x Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // add the y Axis
      svg.append("g")
          .call(d3.axisLeft(y));

    });

}

lluviaMes();
