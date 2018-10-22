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

d3.csv('csv/heladas.csv', function(err, data) {

    datosH = data;

    datosH.forEach(function(d) {
        d.anyo = d.fecha;
        d.dia = d.dias;
        d.diaTooltip = getDay(d.dia)
    });

    function getDay(stringDate) {
        return stringDate.replace(/^0+/, '');
    }

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
                .html('<p class="tooltipTropicales">En' + d.anyo + ' se registraron ' + d.diaTooltip + ' heladas.<p/>')
                .style("left", (d3.event.pageX) - 50 + "px")
                .style("top", (d3.event.pageY - 100) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0);
        })
        .attr("fill", "#257d98")
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
        .attr("fill", "#257d98")
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
