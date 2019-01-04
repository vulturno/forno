const dedicatoria = 'Dedicado a Maria del Carmen Tobajas Urieta y Agustín Aznar Gracia. Gracias por todo.';
    console.log(dedicatoria);
const temp = "ºC";
const widthMobile = (window.innerWidth > 0) ? window.innerWidth : screen.width;


function menu() {
    var overlay = document.querySelector('.overlay');
    var navigation = document.querySelector('.navegacion');
    var body = document.querySelector('body');
    var elementBtn = document.querySelectorAll('.navegacion-btn');
    var burger = document.querySelector('.burger');

    function classToggle() {
        burger.classList.toggle('clicked');
        overlay.classList.toggle('show');
        navigation.classList.toggle('show');
        body.classList.toggle('overflow');
    }

    document.querySelector('.burger').addEventListener('click', classToggle);
    document.querySelector('.overlay').addEventListener('click', classToggle);

    for(i=0; i<elementBtn.length; i++){
        elementBtn[i].addEventListener("click", function(){
            removeClass();
        });
    }

    function removeClass() {
        overlay.classList.remove("show");
        navigation.classList.remove("show");
        burger.classList.remove("clicked");

    }
}

menu();

const scatterInput = () => {

    //Estructura similar a la que utilizan en algunos proyectos de pudding.cool
    const margin = { top: 48, right: 16, bottom: 24, left: 32 };
    let width = 0;
    let height = 0;
    const chart = d3.select('.scatter-inputs');
    const svg = chart.select('svg');
    const scales = {};
    let dataz;

    //Eliminando el año para quedarnos solamente con el día y la fecha en formato: DD-MM
    const getYear = (stringDate) => stringDate.split('-')[2];

    //Escala para los ejes X e Y
    const setupScales = () => {

        const countX = d3.scaleLinear()
            .domain(
                [d3.min(dataz, d => d.year),
                    d3.max(dataz, d => d.year)
                ]
            );

        const countY = d3.scaleLinear()
            .domain([d3.min(dataz, d => d.minima),
                d3.max(dataz, d => d.minima)
            ])


        scales.count = { x: countX, y: countY };

    }

    //Seleccionamos el contenedor donde irán las escalas y en este caso el area donde se pirntara nuestra gráfica
    const setupElements = () => {

        const g = svg.select('.scatter-inputs-container');

        g.append('g').attr('class', 'axis axis-x');

        g.append('g').attr('class', 'axis axis-y');

        g.append('g').attr('class', 'scatter-inputs-container-dos');

    }

    //Actualizando escalas
    const updateScales = (width, height) => {
        scales.count.x.range([10, width]);
        scales.count.y.range([height, -10]);
    }

    //Dibujando ejes
    const drawAxes = (g) => {

        const axisX = d3.axisBottom(scales.count.x)
            .tickPadding(10)
            .tickFormat(d3.format("d"))
            .tickSize(-height)
            .ticks(20)

        g.select(".axis-x")
            .attr("transform", "translate(0," + height + ")")
            .transition()
            .duration(600)
            .ease(d3.easeLinear)
            .call(axisX);

        const axisY = d3.axisLeft(scales.count.y)
            .tickFormat(d => d + temp)
            .tickSize(-width)
            .ticks(6);

        g.select(".axis-y")
            .transition()
            .duration(600)
            .ease(d3.easeLinear)
            .call(axisY)
    }

    const updateChart = (dataz) => {

        const w = chart.node().offsetWidth;
        const h = 500;

        width = w - margin.left - margin.right;
        height = h - margin.top - margin.bottom;

        svg
            .attr('width', w)
            .attr('height', h);

        const translate = "translate(" + margin.left + "," + margin.top + ")";

        const g = svg.select('.scatter-inputs-container')

        g.attr("transform", translate)

        updateScales(width, height)

        const container = chart.select('.scatter-inputs-container-dos')

        const layer = container.selectAll('.scatter-inputs-circles')
            .data(dataz)

        const newLayer = layer.enter()
            .append('circle')
            .attr('class', 'scatter-inputs-circles')

        layer.merge(newLayer)
            .transition()
            .duration(600)
            .ease(d3.easeLinear)
            .attr("cx", d => scales.count.x(d.year))
            .attr("cy", (d, i) => i * (Math.random() * i))
            .attr('fill-opacity', 1)
            .transition()
            .delay((d, i) => i * 10)
            .duration(300)
            .attr("cx", d => scales.count.x(d.year))
            .attr("cy", d => scales.count.y(d.minima))
            .attr("r", 6)
            .style("fill", "#257d98");

        drawAxes(g)

    }

    d3.select("#update")
        .on("click", (dataz) => {
            updateMax()
        });

    d3.select("#updateMin")
        .on("click", (dataz) => {
            updateMin()
        });

    const updateMax = () => {

        let valueDateDay = d3.select("#updateButtonDay").property("value");
        let valueDateMonth = d3.select("#updateButtonMonth").property("value");
        if (valueDateDay < 10) valueDateDay = ('0' + valueDateDay).slice(-2);
        if (valueDateMonth < 10) valueDateMonth = ('0' + valueDateMonth).slice(-2);
        let valueDate = valueDateDay + '-' + valueDateMonth;
        let reValueDate = new RegExp("^.*" + valueDate + ".*", "gi");

        d3.csv("csv/temperaturas.csv", (error, dataz) => {

            dataz = dataz.filter(d => String(d.fecha).match(reValueDate));

            dataz.forEach(d => {
                d.fecha = d.fecha;
                d.maxima = +d.maxima;
                d.minima = +d.minima;
                d.year = getYear(d.fecha);
            });

            scales.count.x.range([10, width]);
            scales.count.y.range([height, -10]);

            const countX = d3.scaleTime()
                .domain(
                    [d3.min(dataz, d => d.year),
                        d3.max(dataz, d => d.year)
                    ]
                );

            const countY = d3.scaleLinear()
                .domain(
                    [d3.min(dataz, d => d.maxima),
                        d3.max(dataz, d => d.maxima)
                    ]
                );

            scales.count = { x: countX, y: countY };

            const translate = "translate(" + margin.left + "," + margin.top + ")";

            const g = svg.select('.scatter-inputs-container')

            g.attr("transform", translate)

            updateScales(width, height)

            const container = chart.select('.scatter-inputs-container-dos')

            const layer = container.selectAll('.scatter-inputs-circles')
                .data(dataz)

            const newLayer = layer.enter()
                .append('circle')
                .attr('class', 'scatter-inputs-circles')

            layer.merge(newLayer)
                .transition()
                .duration(600)
                .ease(d3.easeLinear)
                .attr("cx", d => scales.count.x(d.year))
                .attr("cy", d => scales.count.y(d.maxima))
                .attr("r", 6)
                .style("fill", "#dc7176");

            drawAxes(g)

        });


    }

    const updateMin = () => {

        let valueDateDay = d3.select("#updateButtonDay").property("value");
        let valueDateMonth = d3.select("#updateButtonMonth").property("value");
        if (valueDateDay < 10) valueDateDay = ('0' + valueDateDay).slice(-2);
        if (valueDateMonth < 10) valueDateMonth = ('0' + valueDateMonth).slice(-2);
        let valueDate = valueDateDay + '-' + valueDateMonth;
        let reValueDate = new RegExp("^.*" + valueDate + ".*", "gi");

        d3.csv("csv/temperaturas.csv", (error, dataz) => {

            dataz = dataz.filter(d => String(d.fecha).match(reValueDate));

            dataz.forEach(d => {
                d.fecha = d.fecha;
                d.maxima = +d.maxima;
                d.minima = +d.minima;
                d.year = getYear(d.fecha);
            });

            scales.count.x.range([10, width]);
            scales.count.y.range([height, -10]);

            const countX = d3.scaleTime()
                .domain(
                    [d3.min(dataz, d => d.year),
                        d3.max(dataz, d => d.year)
                    ]
                );

            const countY = d3.scaleLinear()
                .domain(
                    [d3.min(dataz, d => d.minima),
                        d3.max(dataz, d => d.minima)
                    ]
                );


            scales.count = { x: countX, y: countY };

            updateChart(dataz)

        });


    }

    const resize = () => {

        let valueDateDay = d3.select("#updateButtonDay").property("value");
        let valueDateMonth = d3.select("#updateButtonMonth").property("value");

        let valueDateResize = valueDateDay + '-' + valueDateMonth;

        d3.csv("csv/temperaturas.csv", (error, dataz) => {

            dataz = dataz.filter(d => String(d.fecha).match(valueDateResize));

            dataz.forEach(d => {
                d.fecha = d.fecha;
                d.maxima = +d.maxima;
                d.minima = +d.minima;
                d.year = getYear(d.fecha);
            });

            scales.count.x.range([10, width]);
            scales.count.y.range([height, -10]);

            const countX = d3.scaleTime()
                .domain(
                    [d3.min(dataz, d => d.year),
                        d3.max(dataz, d => d.year)
                    ]
                );

            const countY = d3.scaleLinear()
                .domain(
                    [d3.min(dataz, d => d.minima),
                        d3.max(dataz, d => d.minima)
                    ]
                );

            scales.count = { x: countX, y: countY };

            updateChart(dataz)

        });


    }

    // LOAD THE DATA
    const loadData = () => {

        d3.csv('csv/temperaturas.csv', (error, data) => {
            if (error) {
                console.log(error);
            } else {

                dataz = data

                dataz = data.filter(d => String(d.fecha).match(/31-12/));

                dataz.forEach(d => {
                    d.fecha = d.fecha;
                    d.maxima = +d.maxima;
                    d.minima = +d.minima;
                    d.year = getYear(d.fecha);
                });

                setupElements()
                setupScales()
                updateChart(dataz)
            }

        });
    }

    window.addEventListener('resize', resize)

    loadData()

}

scatterInput()

const areaTooltip = () => {
    //Estructura similar a la que utilizan en algunos proyectos de pudding.cool
    const margin = { top: 24, right: 24, bottom: 24, left: 48 };
    let width = 0;
    let height = 0;
    const chart = d3.select('.temperatura-media');
    const svg = chart.select('svg');
    const scales = {};
    let dataz;
    const bisectDate = d3.bisector(d => d.fecha).left;

    //Escala para los ejes X e Y
    const setupScales = () => {

        const countX = d3.scaleTime()
                    .domain([d3.min(dataz, d => d.fecha
                ),
                d3.max(dataz, d => d.fecha)
            ]);

        const countY = d3.scaleLinear()
            .domain([13, 18]);

        scales.count = { x: countX,  y: countY };

    }

    //Seleccionamos el contenedor donde irán las escalas y en este caso el area donde se pirntara nuestra gráfica
    const setupElements = () => {

        const g = svg.select('.temperatura-media-container');

        g.append('g').attr('class', 'axis axis-x');

        g.append('g').attr('class', 'axis axis-y');

        g.append('g').attr('class', 'temperatura-media-container-dos');

        g.append('rect').attr('class', 'overlay');

        g.append('g').attr('class', 'focus').style("display", "none");

    }

    //Actualizando escalas
    const updateScales = (width, height) => {
        scales.count.x.range([0, width]);
        scales.count.y.range([height, 0]);
    }

    //Dibujando ejes
    const drawAxes = (g) => {

        const axisX = d3.axisBottom(scales.count.x)
            .tickFormat(d3.format("d"))
            .ticks(13)

        g.select(".axis-x")
            .attr("transform", "translate(0," + height + ")")
            .call(axisX)

        const axisY = d3.axisLeft(scales.count.y)
            .tickFormat(d => d + temp)
            .ticks(6)
            .tickSizeInner(-width)

        g.select(".axis-y")
            .call(axisY)

        const focus = g.select('.focus');

        const overlay = g.select('.overlay');

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
            .attr("x", -10)
            .attr("y", -20)
            .attr("dy", ".31em");

        overlay.attr("width", width + margin.left + margin.right )
            .attr("height", height )
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            const x0 = scales.count.x.invert(d3.mouse(this)[0]);
            const i = bisectDate(dataz, x0, 1);
            const d0 = dataz[i - 1];
            const d1 = dataz[i];
            const d = x0 - d0.fecha > d1.fecha - x0 ? d1 : d0;
                focus.attr("transform", `translate(${scales.count.x(d.fecha)},${scales.count.y(d.temperatura)})`);
                focus.select("text").text(d.temperatura);
                focus.select('.x-hover-line').attr("y2", height - scales.count.y(d.temperatura));
                focus.select('.y-hover-line').attr('x1', 0 - scales.count.x(d.fecha));
        }

    }

    function updateChart(datazz) {
        const w = chart.node().offsetWidth;
        const h = 600;

        width = w - margin.left - margin.right;
        height = h - margin.top - margin.bottom;

        svg
            .attr('width', w)
            .attr('height', h);

        const translate = "translate(" + margin.left + "," + margin.top + ")";

        const g = svg.select('.temperatura-media-container')

        g.attr("transform", translate)

        const area = d3.area()
            .x(d =>  scales.count.x(d.fecha))
            .y0(height)
            .y1(d =>  scales.count.y(d.temperatura))
            .curve(d3.curveCardinal.tension(0.6));

        updateScales(width, height)

        const container = chart.select('.temperatura-media-container-dos')


        const layer = container.selectAll('.area')
               .data([dataz])

        const newLayer = layer.enter()
                .append('path')
                .attr('class', 'area area-anual')

        layer.merge(newLayer)
            .attr('d', area)

        drawAxes(g)

    }

    const resize = () => {
        updateChart(dataz)
    }

    // LOAD THE DATA
    const loadData = () => {

        d3.csv('csv/temperatura-media.csv', (error, data) => {
                if (error) {
                      console.log(error);
                } else {
                      dataz = data
                      dataz.forEach(d => {
                          d.fecha = d.fecha;
                          d.temperatura = +d.temperatura;
                      });
                      setupElements()
                      setupScales()
                      updateChart(dataz)
                }

        });
    }

    window.addEventListener('resize', resize)

    loadData()

}

areaTooltip()

const mediaMensualMaxima = () => {

    //Estructura similar a la que utilizan en algunos proyectos de pudding.cool
    const margin = { top: 16, right: 16, bottom: 24, left: 32 };
    let width = 0;
    let height = 0;
    const chart = d3.select('.media-mensual-maxima-chart');
    const svg = chart.select('svg');
    let scales = {};
    const temp = "ºC";

    //Escala para los ejes X e Y
    const setupScales = () => {

        const countX = d3.scaleTime()
            .domain([1951, 2018]);


        const countY = d3.scaleLinear()
            .domain([0,20]);

        scales.count = { x: countX, y: countY };

    }

    //Seleccionamos el contenedor donde irán las escalas y en este caso el area donde se pirntara nuestra gráfica
    const setupElements = () => {

        const g = svg.select('.media-mensual-maxima-container');

        g.append('g').attr('class', 'axis axis-x');

        g.append('g').attr('class', 'axis axis-y');

        g.append('g').attr('class', 'media-mensual-maxima-container-bis');

    }

    //Actualizando escalas
    const updateScales = (width, height) => {
        scales.count.x.range([0, width]);
        scales.count.y.range([height, 0]);
    }

    //Dibujando ejes
    const drawAxes = (g) => {

        const axisX = d3.axisBottom(scales.count.x)
            .tickPadding(5)
            .tickFormat(d3.format("d"))
            .ticks(13)

        g.select(".axis-x")
            .attr("transform", "translate(0," + height + ")")
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .call(axisX);

        const axisY = d3.axisLeft(scales.count.y)
            .tickPadding(5)
            .tickFormat(d => d + temp)
            .tickSize(-width)
            .ticks(6);

        g.select(".axis-y")
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .call(axisY)
    }

    function updateChart(data) {
        const w = chart.node().offsetWidth;
        const h = 400;


        width = w - margin.left - margin.right;
        height = h - margin.top - margin.bottom;

        svg
            .attr('width', w)
            .attr('height', h);

        const translate = "translate(" + margin.left + "," + margin.top + ")";

        const g = svg.select('.media-mensual-maxima-container')

        g.attr("transform", translate)

        const area = d3.area()
            .x(d => scales.count.x(d.fecha))
            .y0(height)
            .y1(d => scales.count.y(d.max));

        updateScales(width, height)

        const container = chart.select('.media-mensual-maxima-container-bis')

        const layer = container.selectAll('.area')
            .data([data])

        const newLayer = layer.enter()
            .append('path')
            .attr('class', 'area area-temperatura-mensual')

        layer.merge(newLayer)
            .transition()
            .duration(600)
            .ease(d3.easeLinear)
            .attr('d', area)

        drawAxes(g)

    }

    function update(mes) {

        d3.csv("csv/total-media-limpio.csv", (error, data) => {

            data = data.filter(function(d) {
                return String(d.mes).match(mes);
            });

            data.forEach(d => {
                d.max = +d.max;
            });

            scales.count.x.range([0, width]);
            scales.count.y.range([height, 0]);

            const countX = d3.scaleTime()
                .domain([1951, 2018]);

            const countY = d3.scaleLinear()
                .domain([d3.min(data, d => d.max - 5), d3.max(data, d => d.max + 5 )]);

            scales.count = { x: countX, y: countY };
            updateChart(data)

        });


    }

    const resize = () => {

        d3.csv("csv/total-media-limpio.csv", (error, data) => {

            const mesActual = d3.select("#mes-mensual-maxima")
                .select("select")
                .property("value")

            data = data.filter(d => String(d.mes).match(mesActual));
            updateChart(data)


        });

    }

    const menuMes = () => {
        d3.csv('csv/total-media-limpio.csv', (error, data) => {
            if (error) {
                console.log(error);
            } else {

                const nest = d3.nest()
                    .key(d => d.mes)
                    .entries(data);

                const mesMenuMensualMaxima = d3.select("#mes-mensual-maxima");

                mesMenuMensualMaxima
                    .append("select")
                    .selectAll("option")
                    .data(nest)
                    .enter()
                    .append("option")
                    .attr("value", d => d.key)
                    .text(d => d.key)

                mesMenuMensualMaxima.on('change', function() {

                    const mes = d3.select(this)
                        .select("select")
                        .property("value")

                    update(mes)

                });


            }

        });

    }

    // LOAD THE DATA
    const loadData = () => {

        d3.csv('csv/total-media-limpio.csv', (error, data) => {
            if (error) {
                console.log(error);
            } else {

                data = data.filter(d => String(d.mes).match(/Enero/));

                data.forEach(d => {
                    d.max = +d.max;
                    d.fecha = d.fecha;
                    d.mes = d.mes;
                });
                setupElements()
                setupScales()
                updateChart(data)
            }

        });
    }

    window.addEventListener('resize', resize)

    loadData()
    menuMes()

}

mediaMensualMaxima()

const mediaMensualMinima = () => {

    //Estructura similar a la que utilizan en algunos proyectos de pudding.cool
    const margin = { top: 16, right: 16, bottom: 24, left: 32 };
    let width = 0;
    let height = 0;
    const chart = d3.select('.media-mensual-minima-chart');
    const svg = chart.select('svg');
    let scales = {};
    const temp = "ºC";

    //Escala para los ejes X e Y
    const setupScales = () => {

        const countX = d3.scaleTime()
            .domain([1951, 2018]);


        const countY = d3.scaleLinear()
            .domain([0,20]);

        scales.count = { x: countX, y: countY };

    }

    //Seleccionamos el contenedor donde irán las escalas y en este caso el area donde se pirntara nuestra gráfica
    const setupElements = () => {

        const g = svg.select('.media-mensual-minima-container');

        g.append('g').attr('class', 'axis axis-x');

        g.append('g').attr('class', 'axis axis-y');

        g.append('g').attr('class', 'media-mensual-minima-container-bis');

    }

    //Actualizando escalas
    const updateScales = (width, height) => {
        scales.count.x.range([0, width]);
        scales.count.y.range([height, 0]);
    }

    //Dibujando ejes
    const drawAxes = (g) => {

        const axisX = d3.axisBottom(scales.count.x)
            .tickPadding(5)
            .tickFormat(d3.format("d"))
            .ticks(13)

        g.select(".axis-x")
            .attr("transform", "translate(0," + height + ")")
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .call(axisX);

        const axisY = d3.axisLeft(scales.count.y)
            .tickPadding(5)
            .tickFormat(d => d + temp)
            .tickSize(-width)
            .ticks(6);

        g.select(".axis-y")
            .transition()
            .duration(300)
            .ease(d3.easeLinear)
            .call(axisY)
    }

    function updateChart(data) {
        const w = chart.node().offsetWidth;
        const h = 400;


        width = w - margin.left - margin.right;
        height = h - margin.top - margin.bottom;

        svg
            .attr('width', w)
            .attr('height', h);

        const translate = "translate(" + margin.left + "," + margin.top + ")";

        const g = svg.select('.media-mensual-minima-container')

        g.attr("transform", translate)

        const area = d3.area()
            .x(d => scales.count.x(d.fecha))
            .y0(height)
            .y1(d => scales.count.y(d.max));

        updateScales(width, height)

        const container = chart.select('.media-mensual-minima-container-bis')

        const layer = container.selectAll('.area')
            .data([data])

        const newLayer = layer.enter()
            .append('path')
            .attr('class', 'area area-temperatura-mensual-minima')

        layer.merge(newLayer)
            .transition()
            .duration(600)
            .ease(d3.easeLinear)
            .attr('d', area)

        drawAxes(g)

    }

    function update(mes) {

        d3.csv("csv/total-media-limpio.csv", (error, data) => {

            data = data.filter(function(d) {
                return String(d.mes).match(mes);
            });

            data.forEach(d => {
                d.max = +d.max;
            });

            scales.count.x.range([0, width]);
            scales.count.y.range([height, 0]);

            const countX = d3.scaleTime()
                .domain([1951, 2018]);

            const countY = d3.scaleLinear()
                .domain([d3.min(data, d => d.max - 5), d3.max(data, d => d.max + 5 )]);

            scales.count = { x: countX, y: countY };
            updateChart(data)

        });


    }

    const resize = () => {

        d3.csv("csv/total-media-limpio.csv", (error, data) => {

            const mesActual = d3.select("#mes-mensual-minima")
                .select("select")
                .property("value")

            data = data.filter(d => String(d.mes).match(mesActual));

            updateChart(data)


        });

    }

    const menuMes = () => {
        d3.csv('csv/total-media-limpio.csv', (error, data) => {
            if (error) {
                console.log(error);
            } else {

                const nest = d3.nest()
                    .key(d => d.mes)
                    .entries(data);

                const mesMenuMensualMinima = d3.select("#mes-mensual-minima");

                mesMenuMensualMinima
                    .append("select")
                    .selectAll("option")
                    .data(nest)
                    .enter()
                    .append("option")
                    .attr("value", d => d.key)
                    .text(d => d.key)

                mesMenuMensualMinima.on('change', function() {

                    const mes = d3.select(this)
                        .select("select")
                        .property("value")

                    update(mes)

                });


            }

        });

    }

    // LOAD THE DATA
    const loadData = () => {

        d3.csv('csv/total-media-limpio.csv', (error, data) => {
            if (error) {
                console.log(error);
            } else {

                data = data.filter(d => String(d.mes).match(/Enero/));

                data.forEach(d => {
                    d.max = +d.max;
                    d.fecha = d.fecha;
                    d.mes = d.mes;
                });
                setupElements()
                setupScales()
                updateChart(data)
            }

        });
    }

    window.addEventListener('resize', resize)

    loadData()
    menuMes()

}

mediaMensualMinima()

const tropicalesHorizontal = () => {
    //Estructura similar a la que utilizan en algunos proyectos de pudding.cool
    const margin = { top: 24, right: 24, bottom: 24, left: 24 };
    let width = 0;
    let height = 0;
    const chart = d3.select('.noches-tropicales-chart');
    const svg = chart.select('svg');
    const scales = {};
    let dataz;
    const tooltip = chart.append("div")
        .attr("class", "tooltip-container")
        .style("opacity", 1);

    function getDay(stringDate) {
        return stringDate.replace(/^0+/, '');
    }

    //Escala para los ejes X e Y
    const setupScales = () => {

        const countX = d3.scaleLinear()
            .domain([d3.min(dataz, d => d.fecha
        ),
        d3.max(dataz, d => d.fecha)
    ]);

        const countY = d3.scaleLinear()
            .domain([0, 60]);

        scales.count = { x: countX,  y: countY };

    }

    //Seleccionamos el contenedor donde irán las escalas y en este caso el area donde se pirntara nuestra gráfica
    const setupElements = () => {

        const g = svg.select('.noches-tropicales-chart-container');

        g.append('g').attr('class', 'axis axis-x');

        g.append('g').attr('class', 'axis axis-y');

        g.append('g').attr('class', 'noches-tropicales-chart-container-bis');

    }

    //Actualizando escalas
    const updateScales = (width, height) => {
        scales.count.x.range([0, width]);
        scales.count.y.range([height, 0]);
    }

    //Dibujando ejes
    const drawAxes = (g) => {

        const axisX = d3.axisBottom(scales.count.x)
            .tickFormat(d3.format("d"))

        g.select(".axis-x")
            .attr("transform", "translate(0," + height + ")")
            .call(axisX)

        const axisY = d3.axisLeft(scales.count.y)
            .tickFormat(d3.format("d"))
            .ticks(5)
            .tickSize(-width)

        g.select(".axis-y")
            .call(axisY)

    }

    const updateChart = (dataz) => {
        const w = chart.node().offsetWidth;
        const h = 600;

        width = w - margin.left - margin.right;
        height = h - margin.top - margin.bottom;

        svg
            .attr('width', w)
            .attr('height', h);

        const translate = "translate(" + margin.left + "," + margin.top + ")";

        const g = svg.select('.noches-tropicales-chart-container')

        g.attr("transform", translate)

        updateScales(width, height)

        const container = chart.select('.noches-tropicales-chart-container-bis')

        const layer = container.selectAll('.bar-vertical')
               .data(dataz)

        const newLayer = layer.enter()
                .append('rect')
                .attr('class', 'bar-vertical bar-bgc4')


        layer.merge(newLayer)
            .on("mouseover", d => {
                tooltip.transition()
                .duration(300)
                .style("opacity", 1);
                tooltip.html('<div class="tooltip-lluvia-mes-container"><p class="tooltip-lluvia-mes">Lluvia acumulada en ' + d.dias + '<span class="tooltip-lluvia-mes-total">: ' + d.fecha + 'mm</span><p/><p class="tooltip-lluvia-mes">Lluvia acumulada en ' + d.precipitacion_anual + '<span class="tooltip-lluvia-mes-total">: ' + d.fecha + 'mm</span><p/></div>')
            })
            .on("mouseout", d => {
                tooltip.style("opacity", 0)
            })
            .attr("width", width / dataz.length - 1)
            .attr("x", d => scales.count.x(d.fecha))
            .attr("y", d => scales.count.y(d.dias))
            .attr("height", d => height - scales.count.y(d.dias));

        drawAxes(g)

        if (width > 768) {
            var labels = [{
              note: {
                  label: "En 1991 se superan por primera vez las 30 noches",
                  wrap: 430
                },
              data: { anyo: "1991", dias: 33 },
              dy: -15,
              dx: -142
            }, {
              note: {
                  label: "En 2003 se superan por primera vez las 40 noches",
                  wrap: 430
              },
              data: { anyo: "2003", dias: 47 },
              dy: -10,
              dx: -252
            }, {
              note: {
                  label: "El 14 de junio de 2009 se registra la mínima más alta, 24.7ºC",
                  wrap: 500
              },
              data: { anyo: "2009", dias: 40 },
              dy: -10,
              dx: -252
            }].map(function (l) {
              l.note = Object.assign({}, l.note);
              l.subject = { radius: 6 };

              return l;
            });


            window.makeAnnotations = d3.annotation()
                .annotations(labels)
                .type(d3.annotationCalloutCircle)
                .accessors({
                    x: d => scales.count.x(d.anyo),
                    y: d => scales.count.y(d.dias)
                }).accessorsInverse({
                    fecha: d => scales.count.x.invert(d.x),
                    dia: d => scales.count.y.invert(d.y)
                }).on('subjectover', function (annotation) {
                  annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", false);
                }).on('subjectout', function (annotation) {
                  annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", true);
            });

            svg.append("g").attr("class", "annotation-test").call(makeAnnotations);

            svg.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", true);
        }

    }

    const resize = () => {
        updateChart(dataz)
    }

    // LOAD THE DATA
    const loadData = () => {

        d3.csv('csv/tropicales.csv', (error, data) => {
                if (error) {
                      console.log(error);
                } else {
                      dataz = data
                      dataz.forEach( d => {
                          d.anyo = d.fecha;
                          d.dia = d.dias;
                          d.diaTooltip = getDay(d.dia);
                      });
                      setupElements()
                      setupScales()
                      updateChart(dataz)
                }

        });
    }

    window.addEventListener('resize', resize)

    loadData()

}

tropicalesHorizontal()
