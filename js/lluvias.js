function lluviaMes(){function t(t){c.style("opacity",0),d3.csv("csv/meses-lluvia.csv",function(a,n){(n=n.filter(function(a){return String(a.mes).match(t)})).forEach(function(t){t.cantidad=+t.cantidad}),i.domain(n.map(function(t){return t.fecha})),r.domain([0,185]),d3.select(".yAxis").transition().duration(600).call(s),d3.select(".xAxis").transition().duration(600).call(xAxis);var c=l.selectAll("rect").data(n);c.transition().duration(600).ease(d3.easeLinear).attr("y",function(t){return r(t.cantidad)}).attr("height",function(t){return e-r(t.cantidad)}),c.exit().remove()})}var a={top:50,right:50,bottom:50,left:110},n=1200-a.left-a.right,e=500-a.top-a.bottom;widthBar=n/90;var i=d3.scaleBand().range([0,n]),r=d3.scaleLinear().range([e,0]),s=d3.axisLeft(r).tickPadding(5).ticks(22).tickSize(-n),l=d3.select(".lluvias-por-mes-chart-container").append("svg").attr("class","lluvias-mes-media-chart-graph").attr("width",n+a.left+a.right).attr("height",e+a.top+a.bottom).append("g").attr("transform","translate("+a.left+","+a.top+")"),c=d3.select(".lluvias-por-mes-chart-container").append("div").attr("class","tooltip-container").style("opacity",1);d3.csv("csv/meses-lluvia.csv",function(a,n){if(a)throw a;var o=d3.nest().key(function(t){return t.mes}).entries(n),d=d3.select("#mes");d.append("select").selectAll("option").data(o).enter().append("option").attr("value",function(t){return t.key}).text(function(t){return t.key}),d.on("change",function(){t(d3.select(this).select("select").property("value"))}),(n=n.filter(function(t){return String(t.mes).match(/ENERO/)})).forEach(function(t){t.cantidad=+t.cantidad,t.totalanyo=+t.totalanyo}),i.domain(n.map(function(t){return t.fecha})),r.domain([0,185]);var u=d3.axisBottom(i).tickValues(i.domain().filter(function(t,a){return!(a%4)}));l.selectAll(".bar").data(n).enter().append("rect").attr("class","bar").attr("x",function(t){return i(t.fecha)}).attr("width",widthBar).attr("y",function(t){return r(t.cantidad)}).attr("height",function(t){return e-r(t.cantidad)}).on("mouseover",function(t){c.transition().duration(300).style("opacity",1),c.html('<div class="tooltip-lluvia-mes-container"><p class="tooltip-lluvia-mes">Lluvia acumulada en '+t.mes+'<span class="tooltip-lluvia-mes-total">: '+t.cantidad+'mm</span><p/><p class="tooltip-lluvia-mes">Lluvia acumulada en '+t.fecha+'<span class="tooltip-lluvia-mes-total">: '+t.totalanyo+"mm</span><p/></div>")}),l.append("g").attr("transform","translate(0,"+e+")").attr("class","xAxis").call(u),l.append("g").attr("class","yAxis").call(s)})}mesMenu=[],lluviaMes();