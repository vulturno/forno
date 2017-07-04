var datos = [];

var margin = {top: 30, right: 50, bottom: 30, left: 110},
    width = 1600 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;
    widthBar = width / 62;

function loadCSV() {
    d3.csv('temperaturas-prueba.csv', function(err, data) {
        datos = data;
        datos = data.filter(function(d) { return String(d.fecha).match(/01-09/); });

        function getYear(stringDate){
            return stringDate.split('-')[2];
        }
        datos.forEach(function(d) {
            d.fecha = d.fecha;
            d.maxima = +d.maxima;
            d.minima = +d.minima;
            d.year = getYear(d.fecha);
            // console.log(d.year)
        });
        pintando();
    });
}

function pintando() {


    var svg = d3.select('body')
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xRange = d3.scale.linear()
        .range([30, width])
        .domain([d3.min(datos, function(d) {
                return d.year;
            }),
            d3.max(datos, function(d) {
                return d.year;
            })
        ])

    yRange = d3.scale.linear()
        .range([height, 0])
        .domain([d3.min(datos, function(d) {
                return d.maxima;
            }),
            d3.max(datos, function(d) {
                return d.maxima;
            })
        ])

        var xAxis = d3.svg.axis()
            .scale(xRange)
            .orient("bottom")
            .ticks(20);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0,490)")
            .call(xAxis);

        var yAxis = d3.svg.axis()
            .scale(yRange)
            .orient("left")
            .ticks(6);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(30, 0)")
            .call(yAxis);

        var lineFunc = d3.svg.line()
            .x(function(d) {
                return xRange(d.year);
            })
            .y(function(d) {
                return yRange(d.maxima);
            })
            .interpolate('cardinal');

        svg.append("svg:path")
            .attr("d", lineFunc(datos))
            .attr("class", "linea");


}

loadCSV();
