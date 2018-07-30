var fs = require("fs");
var _ = require("lodash");

var temp = require('./temperaturas.json');
var tropicalYear = require('./tropicales-numero.json');

var tempNoche = 20;
var caloret = 40

tropicales = _.filter(temp, function(res) { if (res.min >= tempNoche) return res.fecha });

tropicalesNumero = _.countBy(tropicales, function(res) { return (res.fecha) })

tropicalesFuego = _.filter(temp, function(res) { if (res.min >= 22 ) return res.fecha });

forno = _.filter(temp, function(res) { if (res.max >= caloret) return res.fecha });

contando = _.map(_.countBy(tropicalYear, "fecha"), (val, key) => ({ fecha: key, min: val }))
console.log(contando)


fs.writeFile('tropicales.json', JSON.stringify(tropicales, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

// fs.writeFile('tropicales-numero.json', JSON.stringify(tropicalesNumero, null, 2), function(err) {
//     if (err) {
//         throw err;
//     }
// });

fs.writeFile('tropicales-fuego-22.json', JSON.stringify(tropicalesFuego, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

fs.writeFile('max-cuarenta.json', JSON.stringify(forno, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

