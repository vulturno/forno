//Dias de lluvia
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
    .domain([10, 35])
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
