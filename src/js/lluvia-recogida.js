//Dias de lluvia
var barPadding = 2;
var datosRLLUMIN = [];

var margin = { top: 50, right: 50, bottom: 50, left: 110 },
    widthRLLUMIN = 1200 - margin.left - margin.right,
    heightRLLUMIN = 500 - margin.top - margin.bottom;

var svgRLLUMIN = d3.select('.recogida-lluvias-chart-container')
    .append('svg')
    .attr('class', 'chart-lluvias-recogida')
    .attr("width", widthRLLUMIN + margin.left + margin.right)
    .attr("height", heightRLLUMIN + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left - margin.right) + "," + margin.top + ")");

var x = d3.scaleTime().range([0, widthRLLUMIN]);
var y = d3.scaleLinear().range([heightRLLUMIN, 0]);

// // define the area
// var area = d3.area()
//     .x(function(d) { return x(d.date); })
//     .y0(height)
//     .y1(function(d) { return y(d.close); });

var valueline = d3.line()
    .x(function(d) {
        return x(d.fecha);
    })
    .y(function(d) {
        return y(d.precipitacion_anual);
    });

d3.csv("csv/dias-de-lluvia.csv", function(error, data) {

    datosLLUMIN = data;

    datosLLUMIN .forEach(function(d) {
        d.anual = d.fecha;
        d.dia = d.precipitacion_anual;
    });

    x.domain([d3.min(datosLLUMIN, function(d) {
            return d.fecha;
        }),
        d3.max(datosLLUMIN, function(d) {
            return d.fecha;
        })
    ]);

    y.domain([0, d3.max(datosLLUMIN, function(d) {
            return d.precipitacion_anual;
        })
    ]);

    svgRLLUMIN.append("path")
        .data([datosLLUMIN])
        .attr("class", "line")
        .attr("d", valueline);

    svgRLLUMIN.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svgRLLUMIN.append("g")
        .call(d3.axisLeft(y));

});
