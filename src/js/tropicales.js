//Noches tropicales
var barPadding = 2;

var margin = { top: 50, right: 50, bottom: 50, left: 110 },
    widthT = 1200 - margin.left - margin.right,
    heightT = 500 - margin.top - margin.bottom;


var svgT = d3.select('.tropicales')
    .append('svg')
    .attr('class', 'chart-tropicales')
    .attr("viewBox", "0 0 " + (widthT + margin.left + margin.right) + " " + (heightT + margin.top + margin.bottom))
    .attr("preserveAspectRatio", "xMinYMin meet")
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
        .attr("fill",function(d,i){
            return colorsT(i)
        })
        .attr("x", function(d) {
            return xRangeH(d.anyo);
        })
        .attr("y", function(d) {
            return yRangeH(d.dias);
        })
        .attr("height", function(d) {
            return heightT - yRangeH(d.dias);
        });
});
