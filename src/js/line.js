var margin = { top: 50, right: 50, bottom: 50, left: 110 },
    width = 1300 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;
widthBar = width / 62;

//Creando una escala de color
var color = d3.scale.linear()
    .domain([20, 35])
    .range(["#fcde9c", "#e34f6f", "#7c1d6f"]);

//Creando los div que contendrán los tooltips con la información del año y de la temperatura
var div = d3.select(".grafica-temp")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//Eliminando el año para quedarnos solamente con el día y la fecha en formato: DD-MM
function getYear(stringDate) {
    return stringDate.split('-')[2];
}

d3.csv('temperaturas-prueba.csv', function(err, data) {


    dataFiltered = data.filter(function(d) {
        return String(d.fecha).match(/07-07/);
    });

    dataFiltered.forEach(function(d) {
        d.fecha = d.fecha;
        d.maxima = +d.maxima;
        d.minima = +d.minima;
        d.year = getYear(d.fecha);
        // console.log(d.maxima)
    });

    maxTemp = d3.max(dataFiltered, function(d) {
        return d.maxima;
    });
    minTemp = d3.min(dataFiltered, function(d) {
        return d.maxima;
    });
    // console.log(maxTemp)
    // console.log(minTemp)
    // console.log(dataFiltered)

    draw(dataFiltered);
});


function draw(datos) {

    var svg = d3.select('.grafica-temp')
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xRange = d3.scale.linear()
        .range([30, width])
        .domain([d3.min(dataFiltered, function(d) {
                return d.year;
            }),
            d3.max(dataFiltered, function(d) {
                return d.year;
            })
        ])

    yRange = d3.scale.linear()
        .range([height, 0])
        .domain([d3.min(dataFiltered, function(d) {
                return d.maxima;
            }),
            d3.max(dataFiltered, function(d) {
                return d.maxima;
            })
        ])

    var xAxis = d3.svg.axis()
        .scale(xRange)
        .orient("bottom")
        .innerTickSize(-height)
        .outerTickSize(0)
        .tickPadding(15)
        .tickFormat(d3.format("d"))
        .ticks(20);

    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,450)")
        .transition()
        .duration(1000)
        .ease('linear')
        .call(xAxis);

    var yAxis = d3.svg.axis()
        .scale(yRange)
        .orient("left")
        .innerTickSize(-width)
        .outerTickSize(0)
        .tickPadding(15)
        .ticks(6);

    svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(30, 0)")
        .transition()
        .duration(1000)
        .ease('linear')
        .call(yAxis);

    var lineFunc = d3.svg.line()
        .x(function(d) {
            return xRange(d.year);
        })
        .y(function(d) {
            return yRange(d.maxima);
        })
        .interpolate('linear');

    svg.selectAll("dot")
        .data(dataFiltered)
        .enter()
        .append("circle")
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
            div.style("opacity", 1)
                .html('<p class="tooltipYear">' + d.year + '<p/>' + '<p class="tooltipTemp">' + d.maxima + 'º<p/>')
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .transition()
        .duration(1000)
        .ease('linear')
        .style("r", function(d) {
            if (d.maxima === maxTemp) {
                return 10 * Math.sqrt(d.maxima / Math.PI);
            } else if (d.maxima === minTemp) {
                return 10 * Math.sqrt(d.maxima / Math.PI);
            } else {
                return 4 * Math.sqrt(d.maxima / Math.PI);
            };
        })
        .style("fill", function(d) {
            if (d.maxima === maxTemp) {
                return "#70284a"
            } else if (d.maxima === minTemp) {
                return "#045275"
            } else {
                return color(d.maxima)
            };
        })
        .attr("cx", function(d) {
            return xRange(d.year);
        })
        .attr("cy", function(d) {
            return yRange(d.maxima);
        });
}

function update() {
    d3.select("svg").remove();
    var valueDate = d3.select("#updateButton").property("value");
    var reValueDate = new RegExp("^.*" + valueDate + ".*", "gi");


    d3.csv('temperaturas-prueba.csv', function(err, data) {

        dataFiltered = data.filter(function(d) {
            return String(d.fecha).match(reValueDate);
        });

        function getYear(stringDate) {
            return stringDate.split('-')[2];
        }
        dataFiltered.forEach(function(d) {
            d.fecha = d.fecha;
            d.maxima = +d.maxima;
            d.minima = +d.minima;
            d.year = getYear(d.fecha);
            // console.log(d.maxima)
        });

        maxTemp = d3.max(dataFiltered, function(d) {
            return d.maxima;
        });
        minTemp = d3.min(dataFiltered, function(d) {
            return d.maxima;
        });
        // console.log(maxTemp)
        // console.log(minTemp)
        // console.log(dataFiltered)

        draw(dataFiltered);
    });
}
