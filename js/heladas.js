var barPadding=2,datosH=[],margin={top:50,right:50,bottom:50,left:110},widthH=1200-margin.left-margin.right,heightH=500-margin.top-margin.bottom,svgH=d3.select(".heladas").append("svg").attr("class","chart-heladas").attr("width",widthH+margin.left+margin.right).attr("height",heightH+margin.top+margin.bottom).append("g").attr("transform","translate("+(margin.left-margin.right)+","+margin.top+")");widthBar=widthH/66;var xRangeH=d3.scaleLinear().range([30,widthH]),yRangeH=d3.scaleLinear().range([heightH,0]),xAxisH=d3.axisBottom().scale(xRangeH).tickFormat(d3.format("d")).ticks(5),yAxisH=d3.axisLeft().scale(yRangeH).tickSize(16-widthH).ticks(5);function resize(){widthH=parseInt(d3.select("#heladas").style("width")),widthH-=25;var t=d3.select(".chart-heladas");barpadding=1,xRangeH=d3.scaleLinear().domain([d3.min(datosH,function(t){return t.anyo}),d3.max(datosH,function(t){return t.anyo})]).range([30,widthH]),t.selectAll("rect").attr("width",widthH/datosH.length-barPadding).attr("fill","#257d98").attr("x",function(t){return xRangeH(t.anyo)}).attr("y",function(t){return yRangeH(t.dias)}).attr("height",function(t){return heightH-yRangeH(t.dias)}),t.data(datosH).attr("width",widthH).select("g").attr("transform","translate(0,0)"),xRangeH.domain([d3.min(datosH,function(t){return t.anyo}),d3.max(datosH,function(t){return t.anyo})]),t.selectAll(".xAxis .tick").remove();var a=d3.axisBottom().scale(xRangeH).tickFormat(d3.format("d")).ticks(5);t.append("g").attr("class","xAxis").attr("transform","translate(0,400)").call(a)}d3.csv("csv/heladas.csv",function(t,a){(datosH=a).forEach(function(t){t.anyo=t.fecha,t.dia=t.dias,t.diaTooltip=t.dia.replace(/^0+/,"")}),xRangeH.domain([d3.min(datosH,function(t){return t.anyo}),d3.max(datosH,function(t){return t.anyo})]),yRangeH.domain([0,d3.max(datosH,function(t){return t.dia})]),svgH.append("g").attr("class","xAxis").attr("transform","translate(0,400)").call(xAxisH),svgH.append("g").attr("class","yAxis").attr("transform","translate(30, 0)").call(yAxisH),svgH.selectAll("rect").data(datosH).enter().append("rect").attr("class","barra").attr("width",widthH/datosH.length-barPadding).on("mouseover",function(t){div.transition(),div.style("opacity",1).html('<p class="tooltipTropicales">En'+t.anyo+" se registraron "+t.diaTooltip+" heladas.<p/>").style("left",d3.event.pageX-50+"px").style("top",d3.event.pageY-100+"px")}).on("mouseout",function(t){div.transition().duration(200).style("opacity",0)}).attr("fill","#257d98").attr("x",function(t){return xRangeH(t.anyo)}).attr("y",function(t){return yRangeH(t.dias)}).attr("height",function(t){return heightH-yRangeH(t.dias)})});