var dataFiltered;
var xRange;
var yRange;
var xAxis;
var yAxis;
var temp = "ºC";
var barPadding = 2;

var dedicatoria = 'Dedicado a Maria del Carmen Tobajas Urieta y Agustín Aznar Gracia. Gracias por todo.';
console.log(dedicatoria);

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

d3.csv('csv/temperaturas.csv', function(err, data) {

    dataFiltered = data.filter(function(d) {
        return String(d.fecha).match(/02-01/);
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

function update() {
    var valueDateDay = d3.select("#updateButtonDay").property("value");
    var valueDateMonth = d3.select("#updateButtonMonth").property("value");
    if (valueDateDay < 10) valueDateDay = ('0' + valueDateDay).slice(-2);
    if (valueDateMonth < 10) valueDateMonth = ('0' + valueDateMonth).slice(-2);
    var valueDate = valueDateDay + '-' + valueDateMonth;
    var reValueDate = new RegExp("^.*" + valueDate + ".*", "gi");

    d3.csv('csv/temperaturas.csv', function(err, data) {

        dataFiltered = data.filter(function(d) {
            return String(d.fecha).match(reValueDate);
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
                    return 12;
                } else if (d.maxima === minTemp) {
                    return 12;
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
            .attr("cx", function(d) {
                return xRange(d.year);
            })
            .attr("cy", function(d) {
                return yRange(d.maxima);
            });
        circles.style("fill", function(d) {
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
    var valueDateDay = d3.select("#updateButtonDay").property("value");
    var valueDateMonth = d3.select("#updateButtonMonth").property("value");
    if (valueDateDay < 10) valueDateDay = ('0' + valueDateDay).slice(-2);
    if (valueDateMonth < 10) valueDateMonth = ('0' + valueDateMonth).slice(-2);
    var valueDate = valueDateDay + '-' + valueDateMonth;
    var reValueDate = new RegExp("^.*" + valueDate + ".*", "gi");

    // if (isNaN(valueDateDay) || valueDateDay < 1 || valueDateDay > 31 && isNaN(valueDateMonth) || valueDateMonth < 1 || valueDateMonth > 12) {
    //     alert("fail")
    // } else {
    //     alert("bien")
    // }

    d3.csv('csv/temperaturas.csv', function(err, data) {

        dataFilterMin = data.filter(function(d) {
            return String(d.fecha).match(reValueDate);
        });

        dataFilterMin.forEach(function(d) {
            d.fecha = d.fecha;
            d.maxima = +d.maxima;
            d.minima = +d.minima;
            d.year = getYear(d.fecha);
        });

        maxTemp = d3.max(dataFilterMin, function(d) {
            return d.minima;
        });
        minTemp = d3.min(dataFilterMin, function(d) {
            return d.minima;
        });

        xRange.domain([d3.min(dataFilterMin, function(d) {
                return d.year;
            }),
            d3.max(dataFilterMin, function(d) {
                return d.year;
            })
        ]);

        yRange.domain([d3.min(dataFilterMin, function(d) {
                return d.minima;
            }),
            d3.max(dataFilterMin, function(d) {
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
            .data(dataFilterMin);

        circles.transition()
            .duration(1000)
            .attr("r", function(d) {
                if (d.minima === maxTemp) {
                    return 16;
                } else if (d.minima >= 20) {
                    return 11;
                } else if (d.minima >= 20) {
                    return 10;
                } else if (d.minima >= 15) {
                    return 9;
                } else if (d.minima >= 10) {
                    return 8;
                } else if (d.minima >= 5) {
                    return 7;
                } else if (d.minima >= 0) {
                    return 6;
                } else if (d.minima < 0) {
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
            } else if (d.minima < 0) {
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
