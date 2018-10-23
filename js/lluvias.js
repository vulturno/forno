function lluviaMes(){var t=50,a=50,e=50,n=110,r=1200-n-a,s=500-t-e;widthBar=r/90;var c=d3.scaleBand().range([0,r]),l=d3.scaleLinear().range([s,0]),o=d3.axisLeft(l).tickPadding(5).ticks(10).tickSize(-r),d=d3.select(".lluvias-por-mes-chart-container").append("svg").attr("class","lluvias-mes-media-chart-graph").attr("width",r+n+a).attr("height",s+t+e).append("g").attr("transform","translate("+n+","+t+")"),u=d3.select(".lluvias-por-mes-chart-container").append("div").attr("class","tooltip-container").style("opacity",1);d3.csv("csv/meses-lluvia.csv",function(t,a){if(t)throw t;var e=d3.nest().key(function(t){return t.mes}).entries(a),n=d3.select("#mes");n.append("select").selectAll("option").data(e).enter().append("option").attr("value",function(t){return t.key}).text(function(t){return t.key}),n.on("change",function(){var i,t=d3.select(this).select("select").property("value");i=t,u.style("opacity",0),d3.csv("csv/meses-lluvia.csv",function(t,a){(a=a.filter(function(t){return String(t.mes).match(i)})).forEach(function(t){t.cantidad=+t.cantidad}),c.domain(a.map(function(t){return t.fecha})),l.domain([0,d3.max(a,function(t){return t.cantidad+10})]),d3.select(".yAxisLluvia").transition().duration(600).call(o),d3.select(".xAxis").transition().duration(600).call(xAxis);var e=d.selectAll("rect").data(a);e.transition().duration(600).ease(d3.easeLinear).attr("y",function(t){return l(t.cantidad)}).attr("height",function(t){return s-l(t.cantidad)}),e.exit().remove();var n=d.select(".promedio").data(a);n.transition().duration(600).ease(d3.easeLinear).attr("y1",function(t){return l(t.media)}).attr("x2",r).attr("y2",function(t){return l(t.media)}),n.exit().remove()})}),(a=a.filter(function(t){return String(t.mes).match(/Enero/)})).forEach(function(t){t.cantidad=+t.cantidad,t.totalanyo=+t.totalanyo,t.media=+t.media}),c.domain(a.map(function(t){return t.fecha})),l.domain([0,d3.max(a,function(t){return t.cantidad})]);var i=d3.axisBottom(c).tickValues(c.domain().filter(function(t,a){return!(a%4)}));d.selectAll(".bar").data(a).enter().append("rect").attr("class","bar").attr("x",function(t){return c(t.fecha)}).attr("width",widthBar).attr("y",function(t){return l(t.cantidad)}).attr("height",function(t){return s-l(t.cantidad)}).on("mouseover",function(t){u.transition().duration(300).style("opacity",1),u.html('<div class="tooltip-lluvia-mes-container"><p class="tooltip-lluvia-mes">Lluvia recogida en '+t.mes+'<span class="tooltip-lluvia-mes-total">: '+t.cantidad+'mm</span><p/><p class="tooltip-lluvia-mes">Lluvia acumulada en '+t.fecha+'<span class="tooltip-lluvia-mes-total">: '+t.totalanyo+'mm</span><p/><p class="tooltip-lluvia-mes">La media en '+t.mes+' es de<span class="tooltip-lluvia-mes-total">: '+t.media+"mm</span><p/></div>")}),d.append("g").attr("transform","translate(0,"+s+")").attr("class","xAxis").call(i),d.append("g").attr("class","yAxisLluvia").call(o),d.append("line").data(a).attr("class","promedio").attr("x1",0).attr("y1",function(t){return l(t.media)}).attr("x2",r).attr("y2",function(t){return l(t.media)}).attr("stroke","#044c71").attr("stroke-width",2)})}mesMenu=[],lluviaMes();