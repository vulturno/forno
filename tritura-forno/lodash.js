var fs = require("fs");
var _ = require("lodash");

//Variable que representa el valor de una noche tropical
var tempNoche = 20;

var fredor = 0;

//Variable que representa el PUTO INFIERNO
var caloret = 40;

//Guardamos en una variables la fecha, temperatura máxima y mínima desde 1951
var temp = require('./temperaturas.json');

/*
Guardamos en una variable TODOS los datos que consumimos de la AEMET
Estos datos no son diarios, son mensuales. El mes con el número 13 pertenece
a un resumen anual, contiene las medias de todo el año.
Para saber que significa cada dato ir a /json/lluvias/descripcion-datos.json
Los datos están actualizados hasta el 2017
*/

var totalYear = require('/Users/jorgeatgu/github/forno/tritura-forno/anyos-enteros-aemet/total.json');

/*
Ahora vamos a limpiar todos los datos mensuales por valor.
En este caso solo queremos la fecha y la temperatura media mensual de cada mes
*/
var temperaturaMedia = _.map(totalYear, _.partialRight(_.pick, ['fecha', 'tm_mes']));

//Obtenemos las mímimas que han sido iguales o superiores a 20º
tropicales = _.filter(temp, function(res) { if (res.minima >= tempNoche) return res.fecha });

// console.log(tropicales)

//Contamos el número de noches tropicales
tropicalesNumero = _.countBy(tropicales, function(res) { return (res.fecha) })

//Obtenemos las mímimas que han sido iguales o superiores a 0º
cheladas = _.filter(temp, function(res) { if (res.minima <= fredor) return res.fecha });

// console.log(cheladas)

//Contamos el número de heladas
cheladasNumero = _.countBy(cheladas, function(res) { return (res.fecha) })


//Obtenemos las mímimas que han sido iguales o superiores a 22º
tropicalesFuego = _.filter(temp, function(res) { if (res.minima >= 22 ) return res.fecha });
// console.log(tropicalesFuego)

//Obtenemos las máximas que han sido iguales o superiores a 40º
forno = _.filter(temp, function(res) { if (res.maxima >= caloret) return res.fecha });


//Generamos un archivo con todas las noches tropicales
fs.writeFile('tropicales.json', JSON.stringify(tropicales, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

//Generamos un archivo con todas las noches tropicales
fs.writeFile('tropicales-numero.json', JSON.stringify(tropicalesNumero, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

//Generamos un archivo con todas las heladas
fs.writeFile('heladas.json', JSON.stringify(cheladasNumero, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

//Generamos un archivo solamente con el mes y la temperatura media de ese mes
fs.writeFile('temperatura-media.json', JSON.stringify(temperaturaMedia, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

//Generamos un archivo con las noches tropicales donde la temperatura no ha bajado de 22º
fs.writeFile('tropicales-fuego-22.json', JSON.stringify(tropicalesFuego, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

//Generamos un archivo con las temperaturas superiores a 40º
fs.writeFile('max-cuarenta.json', JSON.stringify(forno, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

