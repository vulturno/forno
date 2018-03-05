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
        .attr("width", widthH / datosRM.length - barPadding)
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
