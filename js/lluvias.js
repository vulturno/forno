function lluviaMes(){var t={top:20,right:20,bottom:30,left:40},a=1200-t.left-t.right,n=500-t.top-t.bottom;widthBar=a/76;var e=d3.scaleBand().range([0,a]),r=d3.scaleLinear().range([n,0]),i=d3.axisBottom().scale(e).tickPadding(5).tickFormat(function(t){return t}).ticks(10),c=d3.axisLeft().scale(r).tickPadding(10).tickFormat(function(t){return t}).tickSize(30-a).ticks(16),d=d3.select(".lluvias-por-mes-chart-container").append("svg").attr("class","lluvias-mes-media-chart-graph").attr("width",a+t.left+t.right).attr("height",n+t.top+t.bottom).append("g").attr("transform","translate("+t.left+","+t.top+")");d3.csv("csv/meses-lluvia.csv",function(t,a){if(t)throw t;(a=a.filter(function(t){return String(t.mes).match(/APR/)})).forEach(function(t){t.cantidad=+t.cantidad});var o=d3.nest().key(function(t){return t.mes}).entries(a);d3.select("#mes").append("select").selectAll("option").data(o).enter().append("option").attr("value",function(t){return t.key}).text(function(t){return t.key}),e.domain(a.map(function(t){return t.fecha})),r.domain([0,d3.max(a,function(t){return t.cantidad+t.cantidad/4})]),d.selectAll(".bar").data(a).enter().append("rect").attr("class","bar").attr("x",function(t){return e(t.fecha)}).attr("width",widthBar).attr("y",function(t){return r(t.cantidad)}).attr("height",function(t){return n-r(t.cantidad)}),d.append("g").attr("transform","translate(0,"+n+")").call(i),d.append("g").call(c)})}lluviaMes();