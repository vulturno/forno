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
        .attr("fill", "#dc7176")
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
        .attr("fill", "#dc7176")
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
