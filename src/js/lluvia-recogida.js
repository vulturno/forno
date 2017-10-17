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

var x = d3.scaleTime()
    .domain([1941, 2017])
    .range([0, widthRLLUMIN]);

var y = d3.scaleLinear()
    .domain([0, 1000])
    .range([heightRLLUMIN, 0]);

var xAxisRLLUMIN = d3.axisBottom(x)
    .tickFormat(d3.format("d"))
    .ticks(13);

var yAxisRLLUMIN = d3.axisLeft(y)
    .tickSize(-widthLLUMIN)
    .tickFormat(d3.format("d"))
    .ticks(5);

var area = d3.area()
    .x(function(d) {
        return x(d.fecha);
    })
    .y0(height)
    .y1(function(d) {
        return y(d.precipitacion_anual);
    })
    .curve(d3.curveCardinal.tension(0.6));

d3.csv("csv/dias-de-lluvia.csv", function(error, data) {

    datosRLLUMIN = data;

    datosRLLUMIN.forEach(function(d) {
        d.anual = d.fecha;
        d.dia = d.precipitacion_anual;
    });

    svgRLLUMIN.append("path")
           .data([datosRLLUMIN])
           .attr("class", "area")
           .attr("d", area);

    svgRLLUMIN.append("g")
        .attr("transform", "translate(0," + heightRLLUMIN + ")")
        .call(xAxisRLLUMIN);

    svgRLLUMIN.append("g")
        .call(yAxisRLLUMIN);

});
