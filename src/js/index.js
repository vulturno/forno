var datos = [];

var margin = {top: 30, right: 50, bottom: 30, left: 50},
    width = 1600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;
    widthBar = width / 62;

function loadCSV() {
    d3.csv('temperaturas-prueba.csv', function(err, data) {
        datos = data;
        datos = data.filter(function(d) { return String(d.fecha).match(/01-09/); });
        console.log(datos)

        function getYear(stringDate){
            return stringDate.split('-')[2];
        }
        datos.forEach(function(d) {
            d.fecha = d.fecha;
            d.maxima = +d.maxima;
            d.minima = +d.minima;
            d.year = getYear(d.fecha);
            console.log(d.year)
        });
        pintando();

    });
}

function pintando() {


    var svg = d3.select('body')
        .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)

    svg.selectAll("rect")
        .data(datos)
        .enter()
        .append("rect")
        .attr("class", "barra")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", widthBar)
        .attr("height", 100)


    .attr("x", function(d, i) {
            return i * 21 + 300
        })
        .attr("height", function(d) {
            return d.maxima * 5;
        })
        .attr("y", function(d) {
            return height - d.maxima * 5;
        })

    svg.selectAll("text")
        .data(datos)
        .enter()
        .append("text")
        .text(function(d) {
            return d.maxima;
        })
        .attr("x", function(d, i) {
            return i * 21 + 300;
        })
        .attr("y", function(d) {
            return height - d.maxima * 5.1;
        })
        .attr("class", "textoBarras")


        svg.selectAll("text.fecha")
            .data(datos)
            .enter()
            .append("text")
            .text(function(d) {
                return d.year;
            })
            .attr("x", function(d, i) {
                return i * 21 + 300;
            })
            .attr("y", function(d) {
                return height + d.maxima;
            })
            .attr("class", "textoBarras")

}


loadCSV();
