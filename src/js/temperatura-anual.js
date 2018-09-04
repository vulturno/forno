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

    var bisectDate = d3.bisector(function(d) { return d.fecha; }).left;

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 10]);

    var valueline = d3.area()
        .x(function(d) { return x(d.fecha); })
        .y0(height)
        .y1(function(d) {
            return y(d.temperatura);
        })
        .curve(d3.curveCardinal.tension(0.6));

    var yAxis = d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(function(d) { return d + temp; })
        .ticks(5);

    var xAxis = d3.axisBottom(x)
        .tickFormat(d3.format("d"))
        .ticks(10);

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

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", height);

        focus.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", width)
            .attr("x2", width);

        focus.append("circle")
            .attr("class", "circle-focus")
            .attr("r", 8);

        focus.append("text")
            .attr("class", "text-focus")
            .attr("x", -20)
            .attr("y", -20)
            .attr("dy", ".31em");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.fecha > d1.fecha - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.fecha) + "," + y(d.temperatura) + ")");
            focus.select("text").text(d.temperatura + "ºC");
            focus.select(".x-hover-line")
                .attr("transform", "translate(" + x(d.fecha) + "," + y(d.temperatura) + ")")
                .attr("y2", height - y(d.temperatura));
            focus.select(".y-hover-line")
                .attr("transform", "translate(" + width * - 1 + "," + y(d.temperatura) + ")")
                .attr("x2", width + width);
        }

    });

}

temperaturaMedia();
