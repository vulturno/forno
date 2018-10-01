mesMenu = []


function lluviaMes() {

    var margin = { top: 50, right: 50, bottom: 50, left: 110 },
        width = 1200 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    widthBar = width / 90;

    var x = d3.scaleBand()
        .range([0, width]);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var yAxis = d3.axisLeft(y)
        .tickPadding(5)
        .ticks(22)
        .tickSize(-width);

    var svg = d3.select('.lluvias-por-mes-chart-container')
        .append('svg')
        .attr('class', 'lluvias-mes-media-chart-graph')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    var tooltip = d3.select('.lluvias-por-mes-chart-container')
        .append("div")
        .attr("class", "tooltip-container")
        .style("opacity", 1);

    d3.csv("csv/meses-lluvia.csv", function(error, data) {
        if (error) throw error;

        var nest = d3.nest()
            .key(function(d) {
                return d.mes;
            })
            .entries(data)

        var mesMenu = d3.select("#mes")

        mesMenu
            .append("select")
            .selectAll("option")
            .data(nest)
            .enter()
            .append("option")
            .attr("value", function(d) {
                return d.key;
            })
            .text(function(d) {
                return d.key;
            })

        mesMenu.on('change', function(){

            var mes = d3.select(this)
                  .select("select")
                  .property("value")

            update(mes)

        });

        data = data.filter(function(d) {
            return String(d.mes).match(/ENERO/);
        });

        data.forEach(function(d) {
            d.cantidad = +d.cantidad;
            d.totalanyo = +d.totalanyo;
            d.media = +d.media;
        });

        x.domain(data.map(function(d) { return d.fecha; }));
        y.domain([0, 185]);

        var xAxis = d3.axisBottom(x)
        .tickValues(x.domain().filter(function(d,i){ return !(i%4)}));

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.fecha); })
            .attr("width", widthBar)
            .attr("y", function(d) { return y(d.cantidad); })
            .attr("height", function(d) { return height - y(d.cantidad); })
            .on("mouseover", function(d) {
                tooltip.transition().duration(300).style("opacity", 1);
                tooltip
                    .html('<div class="tooltip-lluvia-mes-container"><p class="tooltip-lluvia-mes">Lluvia acumulada en ' + d.mes + '<span class="tooltip-lluvia-mes-total">: ' + d.cantidad + 'mm</span><p/><p class="tooltip-lluvia-mes">Lluvia acumulada en ' + d.fecha + '<span class="tooltip-lluvia-mes-total">: ' + d.totalanyo + 'mm</span><p/><p class="tooltip-lluvia-mes">La media en ' + d.mes + ' es de<span class="tooltip-lluvia-mes-total">: ' + d.media + 'mm</span><p/></div>')
            });

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "xAxis")
            .call(xAxis)

        svg.append("g")
            .attr("class", "yAxis")
            .call(yAxis)

        svg.append('line')
            .data(data)
            .attr("class", "promedio")
            .attr('x1', 0)
            .attr('y1', function(d) { return y(d.media); })
            .attr('x2', width)
            .attr('y2', function(d) { return y(d.media); })
            .attr('stroke', '#044c71')
            .attr('stroke-width', 2)

    });

    function update(mes) {

        tooltip.style("opacity", 0)

        d3.csv('csv/meses-lluvia.csv', function(err, data) {

            data = data.filter(function(d) {
                return String(d.mes).match(mes);
            });

            data.forEach(function(d) {
                d.cantidad = +d.cantidad;
            });

            x.domain(data.map(function(d) { return d.fecha; }));
            y.domain([0, 185]);

            d3.select('.yAxis')
                .transition()
                .duration(600)
                .call(yAxis);

            d3.select('.xAxis')
                .transition()
                .duration(600)
                .call(xAxis);

            var bars = svg.selectAll("rect")
                .data(data);

            bars.transition()
                .duration(600)
                .ease(d3.easeLinear)
                .attr("y", function(d) { return y(d.cantidad); })
                .attr("height", function(d) { return height - y(d.cantidad); })

            bars.exit()
                .remove()

            var lines = svg.select(".promedio")
                .data(data);

            lines.transition()
                .duration(600)
                .ease(d3.easeLinear)
                .attr('y1', function(d) { return y(d.media); })
                .attr('x2', width)
                .attr('y2', function(d) { return y(d.media); })

            lines.exit()
                .remove()

            var textPromedio = svg.select("textoPromedio")
            .data(data)

                textPromedio.attr("y", function(d) { return y(d.media) - 5; })

                textPromedio.exit()
                .remove()
        });

    }

}

lluviaMes();
