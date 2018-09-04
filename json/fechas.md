https://opendata.aemet.es/opendata/api/valores/climatologicos/mensualesanuales/datos/anioini/1980/aniofin/1980/estacion/9434/?api_key=


# Seleccionando solamente el mes de agosto con jq
jq -c 'map(select(.fecha | contains("-08-")))'
