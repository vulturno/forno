var barPadding=2,datosRLLUMIN=[],margin={top:50,right:50,bottom:50,left:110},widthRLLUMIN=1200-margin.left-margin.right,heightRLLUMIN=500-margin.top-margin.bottom,svgRLLUMIN=d3.select(".recogida-lluvias-chart-container").append("svg").attr("class","chart-lluvias-recogida").attr("width",widthRLLUMIN+margin.left+margin.right).attr("height",heightRLLUMIN+margin.top+margin.bottom).append("g").attr("transform","translate("+(margin.left-margin.right)+","+margin.top+")"),layerDates=svgRLLUMIN.append("g"),focus=svgRLLUMIN.append("g").style("display","none"),bisectDate=d3.bisector(function(t){return t.fecha}).left,x=d3.scaleTime().domain([1941,2017]).range([0,widthRLLUMIN]),y=d3.scaleLinear().domain([0,1e3]).range([heightRLLUMIN,0]),xAxisRLLUMIN=d3.axisBottom(x).tickFormat(d3.format("d")).ticks(13),yAxisRLLUMIN=d3.axisLeft(y).tickSize(-widthRLLUMIN).tickFormat(d3.format("d")).ticks(5),area=d3.area().x(function(t){return x(t.fecha)}).y0(height).y1(function(t){return y(t.precipitacion_anual)}).curve(d3.curveCardinal.tension(.6)),tooltipDates=d3.select(".recogida-lluvias-chart-container").append("div").attr("class","tooltip tooltip-lluvias").style("opacity",0);d3.csv("csv/dias-de-lluvia.csv",function(t,a){function e(){var t=x.invert(d3.mouse(this)[0]),a=bisectDate(datosRLLUMIN,t,1),e=datosRLLUMIN[a-1],i=datosRLLUMIN[a],s=t-e.fecha>i.fecha-t?i:e;positionX=x(s.fecha)+150,positionY=y(s.precipitacion_anual)+50,tooltipDates.style("opacity",1).html('<p class="tooltipYear"><span class="textYear">'+s.fecha+"</span>En <span>"+s.dias+"</span> días de lluvia se recogieron <span>"+s.precipitacion_anual+"</span> milímetros de agua.<p/>").style("left",positionX+"px").style("top",positionY+"px"),focus.select(".x").attr("transform","translate("+x(s.fecha)+",0)")}(datosRLLUMIN=a).forEach(function(t){t.anual=t.fecha,t.dia=t.precipitacion_anual,t.dias=t.dias_lluvia}),svgRLLUMIN.append("g").attr("transform","translate(0,"+heightRLLUMIN+")").call(xAxisRLLUMIN),svgRLLUMIN.append("g").call(yAxisRLLUMIN);layerDates.append("path").data([datosRLLUMIN]).attr("class","area").attr("d",area);focus.append("line").attr("class","x").attr("y1",0).attr("y2",heightRLLUMIN),focus.append("text").attr("class","y2").attr("dx",8).attr("dy","-.3em"),focus.append("text").attr("class","y4").attr("dx",8).attr("dy","1em"),svgRLLUMIN.append("rect").attr("width",widthRLLUMIN).attr("height",heightRLLUMIN).style("fill","none").style("pointer-events","all").on("mouseover",function(){focus.style("display",null)}).on("mouseout",function(){focus.style("display","none")}).on("mousemove",e)});