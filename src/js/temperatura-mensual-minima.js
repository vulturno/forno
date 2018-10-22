mesMenuMensualMinima = []

function temperaturaMensualMinima() {

    var margin = { top: 50, right: 50, bottom: 50, left: 110 },
        width = 1200 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    var svg = d3.select('.temperatura-mensual-minima-chart-container')
        .append('svg')
        .attr('class', 'temperatura-mensual-minima-chart-graph')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 10]);

    var area = d3.area()
        .x(function(d) {
            return x(d.fecha);
        })
        .y0(height)
        .y1(function(d) {
            return y(d.min);
        });

    var line = d3.line()
        .x(function(d) { return x(d.fecha); })
        .y(function(d) { return y(d.min); });

    var yAxisTemperaturaMMinima = d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(function(d) { return d + temp; })
        .ticks(5);

    var xAxisTemperaturaMMinima = d3.axisBottom(x)
        .tickFormat(d3.format("d"))
        .ticks(10);

    d3.csv("csv/total-media-limpio.csv", function(error, data) {
        if (error) throw error;

        var nest = d3.nest()
            .key(function(d) {
                return d.mes;
            })
            .entries(data)

        var mesMenuMensualMinima = d3.select("#mes-mensual-minima")

        mesMenuMensualMinima
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

        mesMenuMensualMinima.on('change', function() {

            var mes = d3.select(this)
                .select("select")
                .property("value")

                update(mes)

        });

        data = data.filter(function(d) {
            return String(d.mes).match(/Febrero/);
        });

        data.forEach(function(d) {
            d.min = d.min;
            d.fecha = d.fecha;
            d.mes = d.mes
        });

        x.domain([1951, 2018])
        y.domain([-6, 8]);


        svg.append("path")
            .data([data])
            .attr("class", "area-temperatura-mensual-minima")
            .attr("d", area)

        svg.append("path")
            .data([data])
            .attr("class", "line-temperatura-mensual-minima")
            .attr("d", line)
            .style("stroke", "#d8fdc9");

        svg.append("g")
            .attr("class", "xAxisTemperaturaMMinima")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxisTemperaturaMMinima);

        svg.append("g")
            .attr("class", "yAxisTemperaturaMMinima")
            .call(yAxisTemperaturaMMinima);

    });


    function update(mes) {


        d3.csv("csv/total-media-limpio.csv", function(error, data) {

            data = data.filter(function(d) {
                return String(d.mes).match(mes);
            });

            data.forEach(function(d) {
                d.min = +d.min;
            });

            x.domain([1951, 2018])
            y.domain([d3.min(data, function(d) { return d.min - 5 }), d3.max(data, function(d) { return d.min + 5 })]);

            d3.select('.yAxisTemperaturaMMinima')
                .transition()
                .duration(600)
                .call(yAxisTemperaturaMMinima);

            var areas = svg.selectAll(".area-temperatura-mensual-minima")
                .data([data]);

            areas.transition()
                .duration(600)
                .ease(d3.easeLinear)
                .attr("d", area);



            var lines = svg.selectAll(".line-temperatura-mensual-minima")
                .data([data])

            lines.transition()
                .duration(600)
                .ease(d3.easeLinear)
                .attr("d", line);

            lines.exit()
                .remove()

            areas.exit()
                .remove()


        });

    }

}

temperaturaMensualMinima();
