var fs = require("fs");
var _ = require("lodash");

require('./mociones/mociones.json');

//Obtenemos las mociones y votaciones que ha presentado cada partido
ppMociones = _.filter(mociones, function(res) { if (res.presentada == pp) return res.fecha });

//Obtenemos los votos que ha emitido cada partido: a favor, en contra y abstención
ppTotal = _.filter(mociones, function(res) { if (/PP/.test(res.a_favor) || /PP/.test(res.en_contra) || /PP/.test(res.abstencion)) return res.fecha });

$resultado = _.countBy(mociones, function(res) { return (res.resultado) })

fs.writeFile('pp/pp-mociones.json', JSON.stringify(ppMociones, null, 2), function(err) {
    if (err) {
        throw err;
    }
});

