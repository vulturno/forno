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

var layerDates = svgRLLUMIN.append('g');

var focus = svgRLLUMIN.append("g")
    .style("display", "none");

var bisectDate = d3.bisector(function(d) {
    return d.fecha;
}).left;

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
    .tickSize(-widthRLLUMIN)
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

var tooltipDates = d3.select('.recogida-lluvias-chart-container')
    .append("div")
    .attr("class", "tooltip tooltip-lluvias")
    .style("opacity", 0);

d3.csv("csv/dias-de-lluvia.csv", function(error, data) {

    datosRLLUMIN = data;

    datosRLLUMIN.forEach(function(d) {
        d.anual = d.fecha;
        d.dia = d.precipitacion_anual;
        d.dias = d.dias_lluvia;
    });

    svgRLLUMIN.append("g")
        .attr("transform", "translate(0," + heightRLLUMIN + ")")
        .call(xAxisRLLUMIN);

    svgRLLUMIN.append("g")
        .call(yAxisRLLUMIN);

    var areaDates = layerDates.append("path")
        .data([datosRLLUMIN])
        .attr("class", "area")
        .attr("d", area);

    focus.append("line")
        .attr("class", "x")
        .attr("y1", 0)
        .attr("y2", heightRLLUMIN);

    focus.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    focus.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "1em");

    svgRLLUMIN.append("rect")
        .attr("width", widthRLLUMIN)
        .attr("height", heightRLLUMIN)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(datosRLLUMIN, x0, 1),
            d0 = datosRLLUMIN[i - 1],
            d1 = datosRLLUMIN[i],
            d = x0 - d0.fecha > d1.fecha - x0 ? d1 : d0;
            positionX = x(d.fecha);
            positionY = y(d.precipitacion_anual) + 80;

        tooltipDates.style("opacity", 1)
            .html('<p class="tooltipYear"><span class="textYear">' + d.fecha + '</span>En <span>' + d.dias + '</span> días de lluvia se recogieron <span>' + d.precipitacion_anual + '</span> milímetros de agua.<p/>')
            .style("left", positionX + "px")
            .style("top", positionY + "px");



        focus.select(".x")
            .attr("transform",
                "translate(" + x(d.fecha) + "," +
                0 + ")");
    }
});
