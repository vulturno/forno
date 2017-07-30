var barPadding=2,margin={top:50,right:50,bottom:50,left:110},width=1200-margin.left-margin.right,height=450-margin.top-margin.bottom,svgT=d3.select(".tropicales").append("svg").attr("class","chart-tropicales").attr("viewBox","0 0 "+(width+margin.left+margin.right)+" "+(height+margin.top+margin.bottom)).attr("preserveAspectRatio","xMinYMin meet").append("g").attr("transform","translate("+(margin.left-margin.right)+","+margin.top+")");widthBar=width/66;var xRangeT=d3.scaleLinear().range([30,width]),yRangeT=d3.scaleLinear().range([height,0]),xAxisT=d3.axisBottom().scale(xRangeT).tickFormat(d3.format("d")).ticks(20),yAxisT=d3.axisLeft().scale(yRangeT).tickSize(16-width).ticks(5),colorsT=d3.scaleLinear().domain([0,45]).range(["#ffc6c4","#f4a3a8","#e38191","#cc607d","#ad466c","#8b3058","#672044"]);d3.csv("tropicales.csv",function(t,a){datosT=a,datosT.forEach(function(t){t.anyo=t.fecha,t.dia=t.dias}),xRangeT.domain([d3.min(datosT,function(t){return t.anyo}),d3.max(datosT,function(t){return t.anyo})]),yRangeT.domain([0,d3.max(datosT,function(t){return t.dia})]),svgT.append("g").attr("class","xAxis").attr("transform","translate(0,400)").call(xAxisT),svgT.append("g").attr("class","yAxis").attr("transform","translate(30, 0)").call(yAxisT),svgT.selectAll("rect").data(datosT).enter().append("rect").attr("class","barra").attr("width",width/datosT.length-barPadding).on("mouseover",function(t){div.transition(),div.style("opacity",1).html('<p class="tooltipTropicales">'+t.anyo+'<p/><p class="tooltipTropicales">'+t.dia+"<p/>").style("left",d3.event.pageX+"px").style("top",d3.event.pageY-28+"px")}).on("mouseout",function(t){div.transition().duration(200).style("opacity",0)}).attr("fill",function(t,a){return colorsT(a)}).attr("x",function(t){return xRangeH(t.anyo)}).attr("y",function(t){return yRangeH(t.dias)}).attr("height",function(t){return height-yRangeH(t.dias)})});