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

//Eliminando el año para quedarnos solamente con el día y la fecha en formato: DD-MM
function getYear(stringDate) {
    return stringDate.split('-')[2];
}

var svg = d3.select('.grafica-temp')
    .append('svg')
    .attr('class', 'chart-temp')
    .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

var xRange = d3.scaleLinear()
    .range([30, width]);

var yRange = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(xRange)
    .tickPadding(15)
    .tickFormat(d3.format("d"))
    .ticks(20);

var yAxis = d3.axisLeft()
    .scale(yRange)
    .tickPadding(10)
    .tickFormat(function(d) { return d + temp; })
    .ticks(6);

d3.csv('temperaturas.csv', function(err, data) {

    // console.log(data)

    dataFiltered = data.filter(function(d) {
        return String(d.fecha).match(/01-06/);
    });

    dataFiltered.forEach(function(d) {
        d.fecha = d.fecha;
        d.maxima = +d.maxima;
        d.minima = +d.minima;
        d.year = getYear(d.fecha);
    });


    maxTemp = d3.max(dataFiltered, function(d) {
        return d.maxima;
    });
    minTemp = d3.min(dataFiltered, function(d) {
        return d.maxima;
    });

    xRange.domain([d3.min(dataFiltered, function(d) {
            return d.year;
        }),
        d3.max(dataFiltered, function(d) {
            return d.year;
        })
    ]);

    yRange.domain([d3.min(dataFiltered, function(d) {
            return d.maxima;
        }),
        d3.max(dataFiltered, function(d) {
            return d.maxima;
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
        .attr("x", 190)
        .style("text-anchor", "end")
        .text("Temperaturas máximas");

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
                return 6 * Math.sqrt(d.maxima / Math.PI);
            } else if (d.maxima === minTemp) {
                return 6 * Math.sqrt(d.maxima / Math.PI);
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
        });
});

function update() {
    var valueDateDay = d3.select("#updateButtonDay").property("value");
    var valueDateMonth = d3.select("#updateButtonMonth").property("value");
    var valueDate = valueDateDay + '-' + valueDateMonth;
    console.log(valueDate)
    var reValueDate = new RegExp("^.*" + valueDate + ".*", "gi");

    d3.csv('temperaturas.csv', function(err, data) {

        dataFiltered = data.filter(function(d) {
            return String(d.fecha).match(reValueDate);
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

        xRange.domain([d3.min(dataFiltered, function(d) {
                return d.year;
            }),
            d3.max(dataFiltered, function(d) {
                return d.year;
            })
        ]);

        yRange.domain([d3.min(dataFiltered, function(d) {
                return d.maxima;
            }),
            d3.max(dataFiltered, function(d) {
                return d.maxima;
            })
        ]);


        d3.select('.yAxis')
            .transition()
            .duration(1000)
            .call(yAxis);

        d3.select('.xAxis')
            .transition()
            .duration(1000)
            .call(xAxis);

        d3.select('.legend-top')
            .text("Temperaturas máximas");

        var circles = svg.selectAll("circle")
            .data(dataFiltered);

        circles.transition()
            .duration(1000)
            .attr("r", function(d) {
                if (d.maxima === maxTemp) {
                    return 6 * Math.sqrt(d.maxima / Math.PI);
                } else if (d.maxima === minTemp) {
                    return 6 * Math.sqrt(d.maxima / Math.PI);
                } else {
                    return 4 * Math.sqrt(d.maxima / Math.PI);
                };
            })
            .attr("cx", function(d) {
                return xRange(d.year);
            })
            .attr("cy", function(d) {
                return yRange(d.maxima);
            });

        circles.style("fill", function(d) {
            if (d.maxima === maxTemp) {
                return "#70284a"
            } else if (d.maxima === minTemp) {
                return "#045275"
            } else {
                return color(d.maxima)
            };
        });

        circles.on("mouseover", function(d) {
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
            });

        circles.exit()
            .remove()
    });

}

function updateMin() {
    var valueDateDay = d3.select("#updateButtonDayMin").property("value");
    var valueDateMonth = d3.select("#updateButtonMonthMin").property("value");
    var valueDate = valueDateDay + '-' + valueDateMonth;
    console.log(valueDate)
    var reValueDate = new RegExp("^.*" + valueDate + ".*", "gi");

    // if (isNaN(valueDateDay) || valueDateDay < 1 || valueDateDay > 31 && isNaN(valueDateMonth) || valueDateMonth < 1 || valueDateMonth > 12) {
    //     alert("fail")
    // } else {
    //     alert("bien")
    // }

    d3.csv('temperaturas.csv', function(err, data) {

        dataFiltered = data.filter(function(d) {
            return String(d.fecha).match(reValueDate);
        });

        dataFiltered.forEach(function(d) {
            d.fecha = d.fecha;
            d.maxima = +d.maxima;
            d.minima = +d.minima;
            d.year = getYear(d.fecha);
            // console.log(d.maxima)
        });

        maxTemp = d3.max(dataFiltered, function(d) {
            return d.minima;
        });
        minTemp = d3.min(dataFiltered, function(d) {
            return d.minima;
        });

        xRange.domain([d3.min(dataFiltered, function(d) {
                return d.year;
            }),
            d3.max(dataFiltered, function(d) {
                return d.year;
            })
        ]);

        yRange.domain([d3.min(dataFiltered, function(d) {
                return d.minima;
            }),
            d3.max(dataFiltered, function(d) {
                return d.minima;
            })
        ]);

        var color = d3.scaleLinear()
            .domain([0, 25])
            .range(["#b0f2bc", "#89e8ac", "#67dba5", "#4cc8a3", "#38b2a3", "#2c98a0", "#257d98"]);

        d3.select('.yAxis')
            .transition()
            .duration(1000)
            .call(yAxis);

        d3.select('.xAxis')
            .transition()
            .duration(1000)
            .call(xAxis);


        d3.select('.legend-top')
            .text("Temperaturas mínimas");

        var circles = svg.selectAll("circle")
            .data(dataFiltered);

        circles.transition()
            .duration(1000)
            .attr("r", function(d) {
                if (d.minima === maxTemp) {
                    return 10 * Math.sqrt(d.minima / Math.PI);
                } else if (d.minima === minTemp) {
                    return 10 * Math.sqrt(d.minima / Math.PI);
                } else if (d.minima >= 20) {
                    return 11;
                } else if (d.minima >= 18) {
                    return 10;
                } else if (d.minima >= 14) {
                    return 9;
                } else if (d.minima >= 10) {
                    return 8;
                } else if (d.minima >= 5) {
                    return 7;
                } else if (d.minima >= 0) {
                    return 6;
                } else if (d.minima <= 0) {
                    return 4;
                };
            })
            .attr("cx", function(d) {
                return xRange(d.year);
            })
            .attr("cy", function(d) {
                return yRange(d.minima);
            });

        circles.style("fill", function(d) {
            if (d.minima === maxTemp) {
                return "#70284a";
            } else if (d.minima === minTemp) {
                return "#045275";
            } else if (d.minima >= 20) {
                return "#b0f2bc";
            } else if (d.minima >= 18) {
                return "#89e8ac";
            } else if (d.minima >= 14) {
                return "#67dba5";
            } else if (d.minima >= 10) {
                return "#4cc8a3";
            } else if (d.minima >= 5) {
                return "#38b2a3";
            } else if (d.minima >= 0) {
                return "#2c98a0";
            } else if (d.minima <= 0) {
                return "#257d98";
            };
        });

        circles.on("mouseover", function(d) {
                div.transition()
                // .duration(200)
                div.style("opacity", 1)
                    .html('<p class="tooltipYear">' + d.year + '<p/>' + '<p class="tooltipTemp">' + d.minima + 'º<p/>')
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", 0);
            });

        circles.exit()
            .remove();
    });

}


//Heladas

var svgH = d3.select('.heladas')
    .append('svg')
    .attr('class', 'chart-heladas')
    .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

widthBar = width / 66;

var xRangeH = d3.scaleLinear()
    .range([30, width]);

var yRangeH = d3.scaleLinear()
    .range([height, 0]);

var xAxisH =  d3.axisBottom()
    .scale(xRangeH)
    .tickFormat(d3.format("d"))
    .ticks(20);

var yAxisH = d3.axisLeft()
    .scale(yRangeH)
    .ticks(5);

var colorsH = d3.scaleLinear()
    .domain([10, 35])
    .range(["#68abb8","#4f90a6","#3b738f","#2a5674"]);

d3.csv('heladas.csv', function(err, data) {

    datosH = data;

    datosH.forEach(function(d) {
        d.anyo = d.fecha;
        d.dia = d.dias;
    });

    xRangeH.domain([d3.min(datosH, function(d) {
            return d.anyo;
        }),
        d3.max(datosH, function(d) {
            return d.anyo;
        })
    ]);

    yRangeH.domain([0, d3.max(datosH, function(d) {
            return d.dia;
        })
    ]);

    svgH.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .call(xAxisH);

    svgH.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(30, 0)")
        .call(yAxisH);

    svgH.selectAll("rect")
        .data(datosH)
        .enter()
        .append("rect")
        .attr("class", "barra")
        .attr("width", width / datosH.length - barPadding)
        .attr("fill",function(d,i){return colorsH(i)})
        .attr("x", function(d) { return xRangeH(d.anyo); })
        .attr("y", function(d) { return yRangeH(d.dias); })
        .attr("height", function(d) { return height - yRangeH(d.dias); });
});

//Noches tropicales

var svgT = d3.select('.tropicales')
    .append('svg')
    .attr('class', 'chart-tropicales')
    .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

widthBar = width / 66;

var xRangeT = d3.scaleLinear()
    .range([30, width]);

var yRangeT = d3.scaleLinear()
    .range([height, 0]);

var xAxisT = d3.axisBottom()
    .scale(xRangeT)
    .tickFormat(d3.format("d"))
    .ticks(20);

var yAxisT = d3.axisLeft()
    .scale(yRangeT)
    .ticks(5);

var colorsT = d3.scaleLinear()
    .domain([0, 45])
    .range(["#ffc6c4","#f4a3a8","#e38191","#cc607d","#ad466c","#8b3058","#672044"]);

d3.csv('tropicales.csv', function(err, data) {

    datosT = data;

    datosT.forEach(function(d) {
        d.anyo = d.fecha;
        d.dia = d.dias;
    });

    xRangeT.domain([d3.min(datosT, function(d) {
            return d.anyo;
        }),
        d3.max(datosT, function(d) {
            return d.anyo;
        })
    ]);

    yRangeT.domain([0, d3.max(datosT, function(d) {
            return d.dia;
        })
    ]);

    svgT.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .call(xAxisT);

    svgT.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(30, 0)")
        .call(yAxisT);

    svgT.selectAll("rect")
        .data(datosT)
        .enter()
        .append("rect")
        .attr("class", "barra")
        .attr("width", width / datosT.length - barPadding)
        .attr("fill",function(d,i){return colorsT(i)})
        .attr("x", function(d) { return xRangeH(d.anyo); })
        .attr("y", function(d) { return yRangeH(d.dias); })
        .attr("height", function(d) { return height - yRangeH(d.dias); });
});
