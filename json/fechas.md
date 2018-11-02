https://opendata.aemet.es/opendata/api/valores/climatologicos/mensualesanuales/datos/anioini/1980/aniofin/1980/estacion/9434/?api_key=


Seleccionando solamente el mes de agosto con jq
```
jq -c 'map(select(.fecha | contains("-08-")))'
```

Quedandonos con unos o  dato del array

```
jq '.[].fecha | .tm_mes' total.json > temperatura-media.json
jq '.[] | .fecha, .tm_mes' total.json > temperatura-media.json
```


Creamos un objeto con [] y con los valores que nosotros seleccionamos, en este caso fecha y tm_mes

```
jq ['.[] | {"fecha": .fecha, "tm_mes": .tm_mes}'] total.json > temperatura-media.json
```


Creamos un objeto solo con las fechas, temperaturas medias maximas y minimas de cada mes
```
jq --raw-output ['.[] | {"fecha": .fecha, "max": .tm_max, "minima": .tm_min}'] total.json > total-media-limpio.json
```

Como hay meses que no tienen estos datos los eliminamos, usamos sponge para actuar sobre el propio JSON, ya que jq no podemos editar en el mismo archivo https://github.com/stedolan/jq/issues/105
```
jq --raw-output ['.[] | select(.max!=null) '] total-media-limpio.json | sponge total-media-limpio.json
```


Como el API de AEMET nos devuelve un resumen anual de cada año bajo el número 13 y no nos interesa lo quitamos.
```
jq --raw-output ['.[]  | select(.fecha | contains("-13") | not) ']  total-media-limpio.json | sponge total-media-limpio.json
```

Obteniendo el record de máximas y minimas de todos los días el script esta en scripts/max-min.sh

```
jq ['.[] | {"fecha": .fecha, "maxima": .tmax, "minima": .tmin, "año": .fecha}'] 9434-total-diario.json > max-min.json
```

Obteniendo del resumen anual solo el global que representa a los totales de todo el año

```
jq --raw-output ['.[]  | select(.fecha | contains("-13")) '] 9434-anual.json > 9434-13.json
```

Ahora solo nos quedamos con la fecha, lluvias y con los días de lluvia superior a 0.1mm

```
jq --raw-output ['.[] | {"fecha": .fecha, "lluvias": .p_mes, "dias_lluvia": .np_001}'] 9434-13.json > lluvias-anuales.json
```
