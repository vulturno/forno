"use strict";

function temperaturaMediaMensual() {
  var margin = {
    top: 24,
    right: 24,
    bottom: 24,
    left: 24
  },
      width = 960 - margin.left - margin.right,
      height = 220 - margin.top - margin.bottom;
  var colors = ["#9a1622", "#e30613", "#0080b8", "#f07a36"];
  var color = d3.scaleOrdinal(colors);
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);
  var area = d3.area().x(function (d) {
    return x(d.fecha);
  }).y0(height).y1(function (d) {
    return y(d.max);
  }).curve(d3.curveBasis);
  var line = d3.line().x(function (d) {
    return x(d.fecha);
  }).y(function (d) {
    return y(d.max);
  }).curve(d3.curveBasis);
  d3.csv("csv/total-media-limpio.csv", type, function (error, data) {
    var symbols = d3.nest().key(function (d) {
      return d.mes;
    }).entries(data);
    symbols.forEach(function (s) {
      s.maxPrice = d3.max(s.values, function (d) {
        return d.max;
      });
    });
    x.domain([d3.min(data, function (d) {
      return d.fecha;
    }), d3.max(data, function (d) {
      return d.fecha;
    })]);
    y.domain([5, d3.max(data, function (d) {
      return d.max;
    })]);
    var svg = d3.select(".temperatura-media-mensual").selectAll("svg").data(symbols).enter().append("svg").attr('viewBox', '0 0 ' + (width + (margin.left + margin.right)) + '  ' + (height + (margin.top + margin.bottom))).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.append('g').attr('class', 'axis axis-x');
    svg.append('g').attr('class', 'axis axis-y');
    var axisX = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")).ticks(5);
    var axisY = d3.axisLeft(y).tickFormat(d3.format("d")).ticks(5).tickSizeInner(-width);
    svg.select(".axis-x").attr("transform", "translate(0," + height + ")").call(axisX);
    svg.select(".axis-y").call(axisY);
    svg.append("path").attr("class", "area").attr('class', function (d) {
      return d.key;
    }).style("opacity", 0.7).attr("d", function (d) {
      return area(d.values);
    });
    svg.append("path").attr("class", "line").attr("d", function (d) {
      return line(d.values);
    }).style("stroke", "#111");
    svg.append("text").attr("class", "multiple-legend").attr("x", 16).attr("y", -10).style("text-anchor", "start").text(function (d) {
      return d.key;
    });
  });

  function type(d) {
    d.max = +d.max;
    d.fecha = d.fecha;
    return d;
  }
}

temperaturaMediaMensual();