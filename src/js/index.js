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

var xAxis = d3.axisBottom()
    .scale(xRange)
    .tickPadding(15)
    .tickFormat(d3.format("d"))
    .tickSize(-height)
    .ticks(20);

var yAxis = d3.axisLeft()
    .scale(yRange)
    .tickPadding(10)
    .tickFormat(function(d) { return d + temp; })
    .tickSize(-width + 30)
    .ticks(6);

d3.csv('csv/temperaturas.csv', function(err, data) {

    dataFiltered = data.filter(function(d) {
        return String(d.fecha).match(/07-02/);
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
                if (d.minima >= 20) {
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
            if (d.minima === minTemp) {
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
var barPadding = 2;
var datosH = [];

var margin = { top: 50, right: 50, bottom: 50, left: 110 },
    widthH = 1200 - margin.left - margin.right,
    heightH = 500 - margin.top - margin.bottom;

var svgH = d3.select('.heladas')
    .append('svg')
    .attr('class', 'chart-heladas')
    .attr("width", widthH + margin.left + margin.right)
    .attr("height", heightH + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

widthBar = widthH / 66;

var xRangeH = d3.scaleLinear()
    .range([30, widthH]);

var yRangeH = d3.scaleLinear()
    .range([heightH, 0]);

var xAxisH =  d3.axisBottom()
    .scale(xRangeH)
    .tickFormat(d3.format("d"))
    .ticks(5);

var yAxisH = d3.axisLeft()
    .scale(yRangeH)
    .tickSize(-widthH + 16)
    .ticks(5);

var colorsH = d3.scaleLinear()
    .domain([10, 35])
    .range(["#68abb8","#4f90a6","#3b738f","#2a5674"]);

d3.csv('csv/heladas.csv', function(err, data) {

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
        .attr("width", widthH / datosH.length - barPadding)
        .on("mouseover", function(d) {
            div.transition()
            div.style("opacity", 1)
                .html('<p class="tooltipHeladas">' + d.anyo + '<p/>' + '<p class="tooltipHeladas">' + d.dia + '<p/>')
                .style("left", (d3.event.pageX) - 50 + "px")
                .style("top", (d3.event.pageY - 100) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        })
        .attr("fill",function(d,i){
            return colorsH(i)
        })
        .attr("x", function(d) {
            return xRangeH(d.anyo);
        })
        .attr("y", function(d) {
            return yRangeH(d.dias);
        })
        .attr("height", function(d) {
            return heightH - yRangeH(d.dias);
        });
});

function resize() {

    widthH = parseInt(d3.select('#heladas').style('width'));
    widthH = widthH - 25;

    var svgH = d3.select('.chart-heladas')

    barpadding = 1;

    xRangeH = d3.scaleLinear()
        .domain([d3.min(datosH, function(d) {
                return d.anyo;
            }),
            d3.max(datosH, function(d) {
                return d.anyo;
            })
        ])
        .range([30, widthH]);

    svgH.selectAll("rect")
        .attr("width", widthH / datosH.length - barPadding)
        .attr("fill",function(d,i){
            return colorsH(i)
        })
        .attr("x", function(d) {
            return xRangeH(d.anyo);
        })
        .attr("y", function(d) {
            return yRangeH(d.dias);
        })
        .attr("height", function(d) {
            return heightH - yRangeH(d.dias);
        });

    svgH.data(datosH)
    .attr('width', widthH)
    .select("g")
    .attr("transform", "translate(0,0)");

    xRangeH.domain([d3.min(datosH, function(d) {
            return d.anyo;
        }),
        d3.max(datosH, function(d) {
            return d.anyo;
        })
    ]);

    svgH.selectAll(".xAxis .tick").remove();

    var xAxisH =  d3.axisBottom()
        .scale(xRangeH)
        .tickFormat(d3.format("d"))
        .ticks(5);

    svgH.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .call(xAxisH);

}

//Noches tropicales
var datosT = [];
var barPadding = 2;
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

var margin = { top: 50, right: 50, bottom: 50, left: 110 },
    widthT = 1200 - margin.left - margin.right,
    heightT = 500 - margin.top - margin.bottom;


var svgT = d3.select('.tropicales')
    .append('svg')
    .attr('class', 'chart-tropicales')
    .attr("width", widthT + margin.left + margin.right)
    .attr("height", heightT + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

widthBar = widthT / 66;

var xRangeT = d3.scaleLinear()
    .range([30, widthT]);

var yRangeT = d3.scaleLinear()
    .range([heightT, 8]);

var xAxisT = d3.axisBottom()
    .scale(xRangeT)
    .tickFormat(d3.format("d"))
    .ticks(20);

var yAxisT = d3.axisLeft()
    .scale(yRangeT)
    .tickSize(-widthT + 16)
    .ticks(5);

var colorsT = d3.scaleLinear()
    .domain([0, 45])
    .range(["#ffc6c4", "#f4a3a8", "#e38191", "#cc607d", "#ad466c", "#8b3058", "#672044"]);

d3.csv('csv/tropicales.csv', function(err, data) {

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
    })]);

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
        .attr("width", widthT / datosT.length - barPadding)
        .on("mouseover", function(d) {
            div.transition()
            div.style("opacity", 1)
                .html('<p class="tooltipTropicales">' + d.anyo + '<p/>' + '<p class="tooltipTropicales">' + d.dia + '<p/>')
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        })
        .attr("fill", function(d, i) {
            return colorsT(i)
        })
        .attr("x", function(d) {
            return xRangeT(d.anyo);
        })
        .attr("y", function(d) {
            return yRangeT(d.dias);
        })
        .attr("height", function(d) {
            return heightT - yRangeT(d.dias);
        });

        if (width > 768) {
            var labels = [{
              note: {
                  label: "En 1991 se superan por primera vez las 30 noches",
                  wrap: 430
                },
              data: { anyo: "1991", dias: 33 },
              dy: -15,
              dx: -142
            }, {
              note: {
                  label: "En 2003 se superan por primera vez las 40 noches",
                  wrap: 430
              },
              data: { anyo: "2003", dias: 47 },
              dy: -10,
              dx: -252
            }, {
              note: {
                  label: "El 14 de junio de 2009 se registra la mínima más alta, 24.7ºC",
                  wrap: 500
              },
              data: { anyo: "2009", dias: 40 },
              dy: -10,
              dx: -252
            }].map(function (l) {
              l.note = Object.assign({}, l.note);
              l.subject = { radius: 6 };

              return l;
            });


            window.makeAnnotations = d3.annotation().annotations(labels).type(d3.annotationCalloutCircle).accessors({ x: function x(d) {
                return xRangeT(d.anyo);
              },
              y: function y(d) {
                return yRangeT(d.dias);
              }
            }).accessorsInverse({
              anyo: function anyo(d) {
                return xRangeT.invert(d.x);
              },
              dias: function dias(d) {
                return yRangeT.invert(d.y);
              }
            }).on('subjectover', function (annotation) {
              annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", false);
            }).on('subjectout', function (annotation) {
              annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", true);
            });

            svgT.append("g").attr("class", "annotation-test").call(makeAnnotations);

            svgT.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", true);
        }
});

function resizeT() {

    widthT = parseInt(d3.select('#tropicales').style('width'));
    widthT = widthH - 25;

    var svgT = d3.select('.chart-tropicales')

    barpadding = 1;

    xRangeT = d3.scaleLinear()
        .domain([d3.min(datosT, function(d) {
                return d.anyo;
            }),
            d3.max(datosT, function(d) {
                return d.anyo;
            })
        ])
        .range([30, widthT]);

    svgT.selectAll("rect")
        .attr("width", widthT / datosT.length - barPadding)
        .attr("fill", function(d, i) {
            return colorsT(i)
        })
        .attr("x", function(d) {
            return xRangeT(d.anyo);
        })
        .attr("y", function(d) {
            return yRangeT(d.dias);
        })
        .attr("height", function(d) {
            return heightT - yRangeT(d.dias);
        });

    svgT.data(datosT)
        .attr('width', widthT)
        .select("g")
        .attr("transform", "translate(0,0)");

    xRangeT.domain([d3.min(datosT, function(d) {
            return d.anyo;
        }),
        d3.max(datosT, function(d) {
            return d.anyo;
        })
    ]);

    svgT.selectAll(".xAxis .tick").remove();

    var xAxisT =  d3.axisBottom()
        .scale(xRangeT)
        .tickFormat(d3.format("d"))
        .ticks(5);

    svgT.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .call(xAxisT);

}

//Heladas
var barPadding = 2;
var datosRM = [];

var margin = { top: 50, right: 50, bottom: 50, left: 110 },
    widthRM = 1200 - margin.left - margin.right,
    heightRM = 500 - margin.top - margin.bottom;

var svgRM = d3.select('.maximas-chart-container')
    .append('svg')
    .attr('class', 'record-chart-maximas')
    .attr("width", widthRM + margin.left + margin.right)
    .attr("height", heightRM + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

widthBar = widthRM / 66;

var xRangeRM = d3.scaleLinear()
    .range([30, widthRM]);

var yRangeRM = d3.scaleLinear()
    .range([heightRM, 0]);

var xAxisRM =  d3.axisBottom()
    .scale(xRangeRM)
    .tickFormat(d3.format("d"))
    .ticks(5);

var yAxisRM = d3.axisLeft()
    .scale(yRangeRM)
    .tickSize(-widthRM + 16)
    .ticks(5);

var colorsRM = d3.scaleLinear()
    .domain([10, 35])
    .range(["#cd669d", "#9a366f", "#690044", "#230000"]);

d3.csv('csv/record-maximas.csv', function(err, data) {

    datosRM = data;

    datosRM.forEach(function(d) {
        d.anyo = d.fecha;
        d.dia = d.dias;
    });

    xRangeRM.domain([d3.min(datosRM, function(d) {
            return d.anyo;
        }),
        d3.max(datosRM, function(d) {
            return d.anyo;
        })
    ]);

    yRangeRM.domain([0, d3.max(datosRM, function(d) {
            return d.dia;
        })
    ]);

    svgRM.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .call(xAxisRM);

    svgRM.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(30, 0)")
        .call(yAxisRM);

    svgRM.selectAll("rect")
        .data(datosRM)
        .enter()
        .append("rect")
        .attr("class", "barra")
        .attr("width", widthRM / datosRM.length - barPadding)
        .on("mouseover", function(d) {
            div.transition()
            div.style("opacity", 1)
                .html('<p class="tooltipHeladas">' + d.anyo + '<p/>' + '<p class="tooltipHeladas">' + d.dia + '<p/>')
                .style("left", (d3.event.pageX) - 50 + "px")
                .style("top", (d3.event.pageY - 100) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        })
        .attr("fill",function(d,i){
            return colorsRM(i)
        })
        .attr("x", function(d) {
            return xRangeRM(d.anyo);
        })
        .attr("y", function(d) {
            return yRangeRM(d.dias);
        })
        .attr("height", function(d) {
            return heightRM - yRangeRM(d.dias);
        });
});

function resizeRM() {

    widthRM = parseInt(d3.select('#rm-chart').style('width'));
    widthRM = widthRM - 25;

    var svgRM = d3.select('.record-chart-maximas')

    barpadding = 1;

    xRangeRM = d3.scaleLinear()
        .domain([d3.min(datosRM, function(d) {
                return d.anyo;
            }),
            d3.max(datosRM, function(d) {
                return d.anyo;
            })
        ])
        .range([30, widthRM]);

    svgRM.selectAll("rect")
        .attr("width", widthRM / datosRM.length - barPadding)
        .attr("fill",function(d,i){
            return colorsRM(i)
        })
        .attr("x", function(d) {
            return xRangeRM(d.anyo);
        })
        .attr("y", function(d) {
            return yRangeRM(d.dias);
        })
        .attr("height", function(d) {
            return heightRM - yRangeRM(d.dias);
        });

    svgRM.data(datosRM)
    .attr('width', widthRM)
    .select("g")
    .attr("transform", "translate(0,0)");

    xRangeRM.domain([d3.min(datosRM, function(d) {
            return d.anyo;
        }),
        d3.max(datosRM, function(d) {
            return d.anyo;
        })
    ]);

    svgRM.selectAll(".xAxis .tick").remove();

    var xAxisRM =  d3.axisBottom()
        .scale(xRangeRM)
        .tickFormat(d3.format("d"))
        .ticks(5);

    svgRM.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .call(xAxisRM);
}

//Heladas
var barPadding = 2;
var datosRMIN = [];

var margin = { top: 50, right: 50, bottom: 50, left: 110 },
    widthRMIN = 1200 - margin.left - margin.right,
    heightRMIN = 500 - margin.top - margin.bottom;

var svgRMIN = d3.select('.minimas-chart-container')
    .append('svg')
    .attr('class', 'record-chart-minimas')
    .attr("width", widthRMIN + margin.left + margin.right)
    .attr("height", heightRMIN + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

widthBar = widthRMIN / 66;

var xRangeRMIN = d3.scaleLinear()
    .range([30, widthRMIN]);

var yRangeRMIN = d3.scaleLinear()
    .range([heightRMIN, 0]);

var xAxisRMIN =  d3.axisBottom()
    .scale(xRangeRMIN)
    .tickFormat(d3.format("d"))
    .ticks(5);

var yAxisRMIN = d3.axisLeft()
    .scale(yRangeRMIN)
    .tickSize(-widthRMIN + 16)
    .ticks(5);

var colorsRMIN = d3.scaleLinear()
    .domain([10, 35])
    .range(["#6893ff","#2166d7","#003da5","#000049"]);

d3.csv('csv/record-minimas.csv', function(err, data) {

    datosRMIN = data;

    datosRMIN.forEach(function(d) {
        d.anyo = d.fecha;
        d.dia = d.dias;
    });

    xRangeRMIN.domain([d3.min(datosRMIN, function(d) {
            return d.anyo;
        }),
        d3.max(datosRMIN, function(d) {
            return d.anyo;
        })
    ]);

    yRangeRMIN.domain([0, d3.max(datosRMIN, function(d) {
            return d.dia;
        })
    ]);

    svgRMIN.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .call(xAxisRMIN);

    svgRMIN.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(30, 0)")
        .call(yAxisRMIN);

    svgRMIN.selectAll("rect")
        .data(datosRMIN)
        .enter()
        .append("rect")
        .attr("class", "barra")
        .attr("width", widthRMIN / datosRMIN.length - barPadding)
        .on("mouseover", function(d) {
            div.transition()
            div.style("opacity", 1)
                .html('<p class="tooltipHeladas">' + d.anyo + '<p/>' + '<p class="tooltipHeladas">' + d.dia + '<p/>')
                .style("left", (d3.event.pageX) - 50 + "px")
                .style("top", (d3.event.pageY - 100) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        })
        .attr("fill",function(d,i){
            return colorsRMIN(i)
        })
        .attr("x", function(d) {
            return xRangeRMIN(d.anyo);
        })
        .attr("y", function(d) {
            return yRangeRMIN(d.dias);
        })
        .attr("height", function(d) {
            return heightRMIN - yRangeRMIN(d.dias);
        });
});

function resizeRMIN() {

    widthRMIN = parseInt(d3.select('#rmin-chart').style('width'));
    widthRMIN = widthRMIN - 25;

    var svgRMIN = d3.select('.record-chart-minimas');

    barpadding = 1;

    xRangeRMIN = d3.scaleLinear()
        .domain([d3.min(datosRMIN, function(d) {
                return d.anyo;
            }),
            d3.max(datosRMIN, function(d) {
                return d.anyo;
            })
        ])
        .range([30, widthRMIN]);

    svgRMIN.selectAll("rect")
        .attr("width", widthRMIN / datosRMIN.length - barPadding)
        .attr("fill",function(d,i){
            return colorsRMIN(i)
        })
        .attr("x", function(d) {
            return xRangeRMIN(d.anyo);
        })
        .attr("y", function(d) {
            return yRangeRMIN(d.dias);
        })
        .attr("height", function(d) {
            return heightRMIN - yRangeRMIN(d.dias);
        });

    svgRMIN.data(datosRMIN)
    .attr('width', widthRMIN)
    .select("g")
    .attr("transform", "translate(0,0)");

    xRangeRMIN.domain([d3.min(datosRMIN, function(d) {
            return d.anyo;
        }),
        d3.max(datosRMIN, function(d) {
            return d.anyo;
        })
    ]);

    svgRMIN.selectAll(".xAxis .tick").remove();

    var xAxisRMIN =  d3.axisBottom()
        .scale(xRangeRMIN)
        .tickFormat(d3.format("d"))
        .ticks(5);

    svgRMIN.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .call(xAxisRMIN);
}

//Días de lluvia
var barPadding = 2;
var datosLLUMIN = [];

var margin = { top: 50, right: 50, bottom: 50, left: 110 },
    widthLLUMIN = 1200 - margin.left - margin.right,
    heightLLUMIN = 500 - margin.top - margin.bottom;

var svgLLUMIN = d3.select('.lluvias-chart-container')
    .append('svg')
    .attr('class', 'chart-lluvias')
    .attr("width", widthLLUMIN + margin.left + margin.right)
    .attr("height", heightLLUMIN + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

widthBar = widthLLUMIN / 66;

var xRangeLLUMIN = d3.scaleLinear()
    .range([30, widthLLUMIN]);

var yRangeLLUMIN = d3.scaleLinear()
    .range([heightLLUMIN, 0]);

var xAxisLLUMIN =  d3.axisBottom()
    .scale(xRangeLLUMIN)
    .tickFormat(d3.format("d"))
    .ticks(5);

var yAxisLLUMIN = d3.axisLeft()
    .scale(yRangeLLUMIN)
    .tickSize(-widthLLUMIN + 16)
    .ticks(5);

var colorsLLUMIN = d3.scaleLinear()
    .domain([0, 15])
    .range(["#4f90a6", "#3b738f", "#2a5674"]);

d3.csv('csv/dias-de-lluvia.csv', function(err, data) {

    datosLLUMIN = data;

    datosLLUMIN.forEach(function(d) {
        d.anual = d.fecha;
        d.dia = d.dias_lluvia;
    });

    xRangeLLUMIN.domain([d3.min(datosLLUMIN, function(d) {
            return d.anual;
        }),
        d3.max(datosLLUMIN, function(d) {
            return d.anual;
        })
    ]);

    yRangeLLUMIN.domain([0, d3.max(datosLLUMIN, function(d) {
            return d.dia;
        })
    ]);

    svgLLUMIN.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .call(xAxisLLUMIN);

    svgLLUMIN.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(30, 0)")
        .call(yAxisLLUMIN);

    svgLLUMIN.selectAll("rect")
        .data(datosLLUMIN)
        .enter()
        .append("rect")
        .attr("class", "barra")
        .attr("width", widthLLUMIN / datosLLUMIN.length - barPadding)
        .on("mouseover", function(d) {
            div.transition()
            div.style("opacity", 1)
                .html('<p class="tooltipHeladas">' + d.anual + '<p/>' + '<p class="tooltipHeladas">' + d.dia + '<p/>')
                .style("left", (d3.event.pageX) - 50 + "px")
                .style("top", (d3.event.pageY - 100) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        })
        .attr("fill",function(d,i){
            return colorsLLUMIN(i)
        })
        .attr("x", function(d) {
            return xRangeLLUMIN(d.anual);
        })
        .attr("y", function(d) {
            return yRangeLLUMIN(d.dias_lluvia);
        })
        .attr("height", function(d) {
            return heightLLUMIN - yRangeLLUMIN(d.dias_lluvia);
        });
});

function resizeLLUMIN() {

    widthLLUMIN = parseInt(d3.select('#dias-lluvia').style('width'));
    widthLLUMIN = widthLLUMIN - 25;

    var svgLLUMIN = d3.select('.chart-lluvias');

    barpadding = 1;

    xRangeLLUMIN = d3.scaleLinear()
        .domain([d3.min(datosLLUMIN, function(d) {
                return d.anual;
            }),
            d3.max(datosLLUMIN, function(d) {
                return d.anual;
            })
        ])
        .range([30, widthLLUMIN]);

    svgLLUMIN.selectAll("rect")
        .attr("width", widthLLUMIN / datosLLUMIN.length - barPadding)
        .attr("fill",function(d,i){
            return colorsLLUMIN(i)
        })
        .attr("x", function(d) {
            return xRangeLLUMIN(d.anual);
        })
        .attr("y", function(d) {
            return yRangeLLUMIN(d.dias_lluvia);
        })
        .attr("height", function(d) {
            return heightLLUMIN - yRangeLLUMIN(d.dias_lluvia);
        });

    svgLLUMIN.data(datosLLUMIN)
    .attr('width', widthLLUMIN)
    .select("g")
    .attr("transform", "translate(0,0)");

    xRangeLLUMIN.domain([d3.min(datosLLUMIN, function(d) {
            return d.anual;
        }),
        d3.max(datosLLUMIN, function(d) {
            return d.anual;
        })
    ]);

    svgLLUMIN.selectAll(".xAxis .tick").remove();

    var xAxisLLUMIN =  d3.axisBottom()
        .scale(xRangeLLUMIN)
        .tickFormat(d3.format("d"))
        .ticks(5);

    svgLLUMIN.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0,400)")
        .call(xAxisLLUMIN);
}

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

function responsiveChart() {
    resize();
    resizeT();
    resizeRM();
    resizeRMIN();
    resizeLLUMIN();
}

d3.select(window).on('resize', function() {
    responsiveChart();
});

if (width <= 1024) {
    responsiveChart();
}
