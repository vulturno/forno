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
