function resizeT(){widthT=parseInt(d3.select("#tropicales").style("width")),widthT=widthH-25;var t=d3.select(".chart-tropicales");barpadding=1,xRangeT=d3.scaleLinear().domain([d3.min(datosT,function(t){return t.anyo}),d3.max(datosT,function(t){return t.anyo})]).range([30,widthT]),t.selectAll("rect").attr("width",widthT/datosT.length-barPadding).attr("fill",function(t,a){return colorsT(a)}).attr("x",function(t){return xRangeT(t.anyo)}).attr("y",function(t){return yRangeT(t.dias)}).attr("height",function(t){return heightT-yRangeT(t.dias)}),t.data(datosT).attr("width",widthT).select("g").attr("transform","translate(0,0)"),xRangeT.domain([d3.min(datosT,function(t){return t.anyo}),d3.max(datosT,function(t){return t.anyo})]),t.selectAll(".xAxis .tick").remove();var a=d3.axisBottom().scale(xRangeT).tickFormat(d3.format("d")).ticks(5);t.append("g").attr("class","xAxis").attr("transform","translate(0,400)").call(a)}var datosT=[],barPadding=2,width=window.innerWidth>0?window.innerWidth:screen.width,margin={top:50,right:50,bottom:50,left:110},widthT=1200-margin.left-margin.right,heightT=500-margin.top-margin.bottom,svgT=d3.select(".tropicales").append("svg").attr("class","chart-tropicales").attr("width",widthT+margin.left+margin.right).attr("height",heightT+margin.top+margin.bottom).append("g").attr("transform","translate("+(margin.left-margin.right)+","+margin.top+")");widthBar=widthT/66;var xRangeT=d3.scaleLinear().range([30,widthT]),yRangeT=d3.scaleLinear().range([heightT,8]),xAxisT=d3.axisBottom().scale(xRangeT).tickFormat(d3.format("d")).ticks(20),yAxisT=d3.axisLeft().scale(yRangeT).tickSize(16-widthT).ticks(5),colorsT=d3.scaleLinear().domain([0,45]).range(["#ffc6c4","#f4a3a8","#e38191","#cc607d","#ad466c","#8b3058","#672044"]);d3.csv("csv/tropicales.csv",function(t,a){if((datosT=a).forEach(function(t){t.anyo=t.fecha,t.dia=t.dias}),xRangeT.domain([d3.min(datosT,function(t){return t.anyo}),d3.max(datosT,function(t){return t.anyo})]),yRangeT.domain([0,d3.max(datosT,function(t){return t.dia})]),svgT.append("g").attr("class","xAxis").attr("transform","translate(0,400)").call(xAxisT),svgT.append("g").attr("class","yAxis").attr("transform","translate(30, 0)").call(yAxisT),svgT.selectAll("rect").data(datosT).enter().append("rect").attr("class","barra").attr("width",widthT/datosT.length-barPadding).on("mouseover",function(t){div.transition(),div.style("opacity",1).html('<p class="tooltipTropicales">'+t.anyo+'<p/><p class="tooltipTropicales">'+t.dia+"<p/>").style("left",d3.event.pageX+"px").style("top",d3.event.pageY-28+"px")}).on("mouseout",function(t){div.transition().duration(200).style("opacity",0)}).attr("fill",function(t,a){return colorsT(a)}).attr("x",function(t){return xRangeT(t.anyo)}).attr("y",function(t){return yRangeT(t.dias)}).attr("height",function(t){return heightT-yRangeT(t.dias)}),width>768){var n=[{note:{label:"En 1991 se superan por primera vez las 30 noches",wrap:380},data:{anyo:"1991",dias:33},dy:-15,dx:-142},{note:{label:"En 2003 se superan por primera vez las 40 noches",wrap:380},data:{anyo:"2003",dias:47},dy:-10,dx:-252},{note:{label:"El 14 de junio de 2009 se registro la mínima más alta, 24.7ºC",wrap:450},data:{anyo:"2009",dias:40},dy:-10,dx:-252}].map(function(t){return t.note=Object.assign({},t.note),t.subject={radius:6},t});window.makeAnnotations=d3.annotation().annotations(n).type(d3.annotationCalloutCircle).accessors({x:function(t){return xRangeT(t.anyo)},y:function(t){return yRangeT(t.dias)}}).accessorsInverse({anyo:function(t){return xRangeT.invert(t.x)},dias:function(t){return yRangeT.invert(t.y)}}).on("subjectover",function(t){t.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden",!1)}).on("subjectout",function(t){t.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden",!0)}),svgT.append("g").attr("class","annotation-test").call(makeAnnotations),svgT.selectAll("g.annotation-connector, g.annotation-note").classed("hidden",!0)}});