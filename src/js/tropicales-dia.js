var dataTD;
var xRangeTD;
var yRangeTD;
var xAxisTD;
var yAxisTD;
var temp = "ºC";
var barPadding = 2;

var margin = { top: 50, right: 50, bottom: 50, left: 110 },
    widthTD = 1200 - margin.left - margin.right,
    heightTD = 500 - margin.top - margin.bottom;

//Creando una escala de color
var color = d3.scaleLinear()
    .domain([10, 35])
    .range(["#d39c83", "#e34f6f", "#7c1d6f"]);

//Creando los div que contendrán los tooltips con la información del año y de la temperatura
var divTD = d3.select(".tropicales-dia")
    .append("div")
    .attr("class", "tooltip-tropical-container")
    .style("opacity", 0);

function getYear(stringDate) {
    return stringDate.split('-')[2];
}


function removeYear(stringDay) {
    var inicio = 0;
    var fin = 5;
    return stringDay.substring(0, 5);
}


var svgTD = d3.select('.tropicales-dia')
    .append('svg')
    .attr('class', 'tropicales-dia-chart')
    .attr("viewBox", "0 0 " + (widthTD + margin.left + margin.right) + " " + (heightTD + margin.top + margin.bottom))
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

var xRangeTD = d3.scaleLinear()
    .range([30, widthTD]);

var yRangeTD = d3.scaleLinear()
    .range([heightTD, -20]);

var xAxisTD = d3.axisBottom(xRangeTD)
    .tickPadding(15)
    .tickFormat(d3.format("d"))
    .tickSize(-heightTD)
    .ticks(20);

var yAxisTD = d3.axisLeft(yRangeTD)
    .tickPadding(10)
    .tickFormat(function(d) { return d + temp; })
    .tickSize(-widthTD + 30)
    .ticks(6);

d3.csv('csv/tropicales-por-dia.csv', function(err, data) {

    dataTD = data;

    dataTD.forEach(function(d) {
        d.fecha = d.fecha;
        d.dias = removeYear(d.fecha);
        d.minima = d.min;
        d.year = getYear(d.fecha);
    });

    xRangeTD.domain([d3.min(dataTD, function(d) {
            return d.year;
        }),
        d3.max(dataTD, function(d) {
            return d.year;
        })
    ]);


    yRangeTD.domain([d3.min(dataTD, function(d) {
            return d.minima;
        }),
        d3.max(dataTD, function(d) {
            return d.minima;
        })
    ]);

    svgTD.append("g")
        .attr("class", "xAxisTD")
        .attr("transform", "translate(0,400)")
        .transition()
        .duration(1000)
        .call(xAxisTD);

    svgTD.append("g")
        .attr("class", "yAxisTD")
        .attr("transform", "translate(30, 0)")
        .transition()
        .duration(1000)
        .call(yAxisTD);

    svgTD.selectAll("dot")
        .data(dataTD)
        .enter()
        .append("circle")
        .attr("class", "circles")
        .on("mouseover", function(d) {
            divTD.transition()
            divTD.style("opacity", 1)
                .html('<p class="tooltipTropical">El ' + d.fecha + ' se registró una mínima de ' + d.minima + 'º<p/>')
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            divTD.transition()
                .duration(4000)
                .style("opacity", 0);
        })
        .transition()
        .duration(1000)
        .attr("cx", function(d) {
            return xRangeTD(d.year);
        })
        .attr("cy", function(d) {
            return yRangeTD(d.minima);
        })
        .attr("r", 6)
        .style("fill", "#DD435C")
        .attr('fill-opacity', .5);
});
