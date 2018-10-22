mesMenuMensual = []

function temperaturaMensual() {

    var margin = { top: 50, right: 50, bottom: 50, left: 110 },
        width = 1200 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    var svg = d3.select('.temperatura-mensual-chart-container')
        .append('svg')
        .attr('class', 'lluvias-mes-media-chart-graph')
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
            return y(d.max);
        });

    var line = d3.line()
        .x(function(d) { return x(d.fecha); })
        .y(function(d) { return y(d.max); });

    var yAxisTemperaturaMM = d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(function(d) { return d + temp; })
        .ticks(5);

    var xAxisTemperaturaMM = d3.axisBottom(x)
        .tickFormat(d3.format("d"))
        .ticks(10);

    d3.csv("csv/total-media-limpio.csv", function(error, data) {
        if (error) throw error;

        var nest = d3.nest()
            .key(function(d) {
                return d.mes;
            })
            .entries(data)

        var mesMenuMensual = d3.select("#mes-mensual")

        mesMenuMensual
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

        mesMenuMensual.on('change', function() {

            var mes = d3.select(this)
                .select("select")
                .property("value")

                update(mes)

        });

        data = data.filter(function(d) {
            return String(d.mes).match(/Febrero/);
        });

        data.forEach(function(d) {
            d.max = d.max;
            d.fecha = d.fecha;
            d.mes = d.mes
        });

        x.domain([1951, 2018])
        y.domain([1,20]);


        svg.append("path")
            .data([data])
            .attr("class", "area-temperatura-mensual")
            .attr("d", area)

        svg.append("path")
            .data([data])
            .attr("class", "line-temperatura-mensual")
            .attr("d", line)
            .style("stroke", "#140320")
            .style("opacity", "0.5");

        svg.append("g")
            .attr("class", "xAxisTemperaturaMM")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxisTemperaturaMM);

        svg.append("g")
            .attr("class", "yAxisTemperaturaMM")
            .call(yAxisTemperaturaMM);

    });


    function update(mes) {


        d3.csv("csv/total-media-limpio.csv", function(error, data) {

            data = data.filter(function(d) {
                return String(d.mes).match(mes);
            });

            data.forEach(function(d) {
                d.max = +d.max;
            });

            x.domain([1951, 2018])
            y.domain([d3.min(data, function(d) { return d.max - 5 }), d3.max(data, function(d) { return d.max + 5 })]);

            d3.select('.yAxisTemperaturaMM')
                .transition()
                .duration(600)
                .call(yAxisTemperaturaMM);

            var areas = svg.selectAll(".area-temperatura-mensual")
                .data([data]);

            areas.transition()
                .duration(600)
                .ease(d3.easeLinear)
                .attr("d", area);



            var lines = svg.selectAll(".line-temperatura-mensual")
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

temperaturaMensual();
