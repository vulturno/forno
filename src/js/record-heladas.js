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
