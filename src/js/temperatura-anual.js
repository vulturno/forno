function temperaturaMedia() {

    var temp = "ºC";

    var margin = { top: 48, right: 48, bottom: 48, left: 48 },
        width = 900 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    var svg = d3.select('.temperatura-media-chart-container')
        .append('svg')
        .attr('class', 'temperatura-media-chart-graph')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%Y");

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 10]);

    var valueline = d3.line()
        .x(function(d) { return x(d.fecha); })
        .y(function(d) { return y(d.temperatura); })

    var yAxis = d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(function(d) { return d + temp; })
        .ticks(5);

    d3.csv("csv/temperatura-media.csv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            d.fecha = d.fecha;
            d.temperatura = +d.temperatura;
        });

        x.domain(d3.extent(data, function(d) { return d.fecha; }));
        y.domain([13, 18]);

        var path = svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline)
            .attr("stroke-width", "1.5")
            .attr("fill", "none");

        var totalLength = path.node().getTotalLength();

        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2500)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

    });

}

temperaturaMedia();
