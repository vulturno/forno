var fs = require("fs");
var _ = require("lodash");

var temp = require('./temperaturas.json');

var tempNoche = 20;

tropicales = _.filter(temp, function(res) { if (res.min >= tempNoche) return res.fecha });

tropicalesNumero = _.countBy(tropicales, function(res) { return (res.fecha) })

tropicalTotal = _.values(_.reduce(tropicales,function(result,obj){
  var name = obj.fecha.split('-');
  name = name[1]+', '+name[2];
  result[name] = {
    fecha:name,
    min: obj.min
  };
  return result;
},{}));


fs.writeFile('tropicales.json', JSON.stringify(tropicales, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

fs.writeFile('tropicales-numero.json', JSON.stringify(tropicalesNumero, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

fs.writeFile('tropicales-total.json', JSON.stringify(tropicalTotal, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

