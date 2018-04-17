function lluviaMes() {

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 1200 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    widthBar = width / 76;

    var x = d3.scaleBand()
        .range([0, width]);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .tickPadding(5)
        .tickFormat(function(d) { return d })
        .ticks(10);

    var yAxis = d3.axisLeft()
        .scale(y)
        .tickPadding(10)
        .tickFormat(function(d) { return d })
        .tickSize(-width + 30)
        .ticks(16);

    var svg = d3.select('.lluvias-por-mes-chart-container')
        .append('svg')
        .attr('class', 'lluvias-mes-media-chart-graph')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("csv/meses-lluvia.csv", function(error, data) {
        if (error) throw error;

        data = data.filter(function(d) {
            return String(d.mes).match(/APR/);
        });

        data.forEach(function(d) {
            d.cantidad = +d.cantidad;
        });

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

        x.domain(data.map(function(d) { return d.fecha; }));
        y.domain([0, d3.max(data, function(d) { return d.cantidad + (d.cantidad / 4) })]);

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.fecha); })
            .attr("width", widthBar)
            .attr("y", function(d) { return y(d.cantidad); })
            .attr("height", function(d) { return height - y(d.cantidad); });

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);


    });

}

lluviaMes();
