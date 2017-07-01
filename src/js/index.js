var datos = [];

var margin = {top: 30, right: 50, bottom: 30, left: 50},
    width = 900 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

function loadCSV() {
    d3.csv('temperaturas-prueba.csv', function(err, data) {
        datos = data;
        pintando();
    });
}

function pintando() {


    var svg = d3.select('body')
        .append('svg')
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("rect")
        .data(datos)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", 100)

    .attr("x", function(d, i) {
            return i * 21 + 30
        })
        .attr("height", function(d) {
            return d.maxima;
        })
        .attr("y", function(d) {
            return h - d.maxima;
        })

    svg.selectAll("text")
        .data(datos)
        .enter()
        .append("text")
        .text(function(d) {
            return d.maxima;
        })
        .attr("x", function(d, i) {
            return i * 21 + 40; // +5
        })
        .attr("y", function(d) {
            return h - d.maxima - 3; // +15
        })
}


loadCSV();
