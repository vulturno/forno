var datos = [];

var margin = {top: 30, right: 50, bottom: 30, left: 110},
    width = 1300 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;
    widthBar = width / 62;

    var color = d3.scale.linear()
        .domain([20, 35])
        .range([ "#fcde9c",
            "#e34f6f",
            "#7c1d6f"]);




function loadCSV() {
    d3.csv('temperaturas-prueba.csv', function(err, data) {
        datos = data;
        datos = data.filter(function(d) { return String(d.fecha).match(/04-07/); });

        function getYear(stringDate){
            return stringDate.split('-')[2];
        }
        datos.forEach(function(d) {
            d.fecha = d.fecha;
            d.maxima = +d.maxima;
            d.minima = +d.minima;
            d.year = getYear(d.fecha);
            console.log(d.maxima)
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

        var points = d3.range(1, 5).map(function(i) {
          return [i * width / 5, 50 + Math.random() * (height - 100)];
        });

        svg.append("path")
            .datum(points)
            .attr("class", "line")

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
            .interpolate('linear');

        // svg.append("svg:path")
        //     .attr("d", lineFunc(datos))
        //     .attr("class", "linea");

        svg.selectAll("dot")
            .data(datos)
            .enter().append("circle")
            .attr("r", function (d) { return 4 * Math.sqrt(d.maxima / Math.PI); })
            .style("fill", function(d) { return color(d.maxima); })
            .attr("cx", function(d) {
                return xRange(d.year);
            })
            .attr("cy", function(d) {
                return yRange(d.maxima);
            });


}

loadCSV();
