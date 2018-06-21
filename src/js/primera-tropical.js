var dataFiltered;
var xRange;
var yRange;
var xAxis;
var yAxis;
var temp = "ºC";
var barPadding = 2;

var margin = { top: 50, right: 50, bottom: 50, left: 110 },
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//Creando una escala de color
var color = d3.scaleLinear()
    .domain([10, 35])
    .range(["#d39c83", "#e34f6f", "#7c1d6f"]);

//Creando los div que contendrán los tooltips con la información del año y de la temperatura
var div = d3.select(".grafica-temp")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select('.grafica-temp')
    .append('svg')
    .attr('class', 'chart-temp')
    .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

var xRange = d3.scaleLinear()
    .range([30, width]);

var yRange = d3.scaleLinear()
    .range([height, -20]);

var xAxis = d3.axisBottom(xRange)
    .tickPadding(15)
    .tickFormat(d3.format("d"))
    .tickSize(-height)
    .ticks(20);

var yAxis = d3.axisLeft(yRange)
    .tickPadding(10)
    .tickFormat(function(d) { return d + temp; })
    .tickSize(-width + 30)
    .ticks(6);

d3.csv('csv/primera-noche-tropial.csv', function(err, data) {

    dataFiltered.forEach(function(d) {
        d.fecha = d.fecha;
        d.year = +d.year;
    });

    xRange.domain([d3.min(dataFiltered, function(d) {
            return d.year;
        }),
        d3.max(dataFiltered, function(d) {
            return d.year;
        })
    ]);

    yRange.domain([d3.min(dataFiltered, function(d) {
            return d.fecha;
        }),
        d3.max(dataFiltered, function(d) {
            return d.fecha;
        })
    ]);

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .transition()
        .duration(1000)
        .call(xAxis);

    svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(30, 0)")
        .transition()
        .duration(1000)
        .call(yAxis);

    svg.append("text")
        .attr("class", "legend-top")
        .attr("transform", "rotate(0)")
        .attr("y", -20)
        .attr("x", 190);

    svg.selectAll("dot")
        .data(dataFiltered)
        .enter()
        .append("circle")
        .attr("class", "circles")
        .on("mouseover", function(d) {
            div.transition()
            div.style("opacity", 1)
                .html('<p class="tooltipYear">' + d.year + '<p/>' + '<p class="tooltipTemp">' + d.maxima + 'º<p/>')
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        })
        .transition()
        .duration(1000)
        .attr("cx", function(d) {
            return xRange(d.year);
        })
        .attr("cy", function(d) {
            return yRange(d.maxima);
        })
        .attr("r", function(d) {
            if (d.maxima === maxTemp) {
                return 12;
            } else if (d.maxima === minTemp) {
                return 6;
            } else if (d.maxima >= 35) {
                return 11;
            } else if (d.maxima >= 30) {
                return 10;
            } else if (d.maxima >= 25) {
                return 9;
            } else if (d.maxima >= 20) {
                return 8;
            } else if (d.maxima >= 15) {
                return 7;
            } else {
                return 6;
            };
        })
        .style("fill", function(d) {
            if (d.maxima === maxTemp) {
                return "#70284a";
            } else if (d.maxima === minTemp) {
                return "#045275";
            } else if (d.maxima >= 35) {
                return "#9c3f5d";
            } else if (d.maxima >= 30) {
                return "#c8586c";
            } else if (d.maxima >= 25) {
                return "#dc7176";
            } else if (d.maxima >= 20) {
                return "#ee8a82";
            } else if (d.maxima >= 15) {
                return "#ee8a82";
            } else if (d.maxima >= 10) {
                return "#4cc8a3";
            } else if (d.maxima >= 7) {
                return "#38b2a3";
            } else if (d.maxima >= 3) {
                return "#2c98a0";
            } else if (d.maxima >= 0) {
                return "#257d98";
            } else {
                return "#257d98";
            };
        });
});
