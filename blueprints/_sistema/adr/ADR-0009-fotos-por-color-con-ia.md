# ADR-0009: Fotos por color generadas con IA en la ficha
- Estado: Aceptado
- Fecha: 2026-10-29 · Aprobó: usuario (cafe@orvin.lat), en el chat («Sí, prueba con Waby», «vamos a ver como quedo antes de hacerlo a todos», «Sí, hazlo en todos») · Compuerta: ciclo corto en `arq/lambrin-renders`
- Complementa: ADR-0005 (no lo sustituye: las escenas base siguen siendo fotos de Unsplash)

## Contexto
El usuario pidió que, al elegir un color en la ficha, el muro de la foto cambie a ese acabado y que se vea como una foto realista, no como la simulación dibujada del visualizador. Las fotos de Unsplash solo tienen un acabado y Lambrin no tiene fotos propias por color.

## Decisión
- Para cada uno de los 44 colores se genera una variante de la escena del producto con un editor de imágenes con IA (Nano Banana 2.1, en la cuenta de Higgsfield del usuario): la foto base más la muestra del PDF, con la instrucción de cambiar solo el revestimiento y conservar encuadre, muebles y luz. Los colores sin muestra usable (`soloTono`) se describen con su tono.
- Se revisa cada imagen contra la original; se repiten las que cambian el encuadre o inventan elementos.
- Archivos: `site/assets/escenas/colores/<escena>-<color>-{800,1600}.jpg` (JPG porque el sistema no escribe WebP). En `catalogo.js` cada color lleva `foto`.
- La ficha funde la foto del color elegido sobre la anterior y cambia el aviso a «Imagen ilustrativa generada con IA». Las fotos se descargan solo al tocar el color.
- El visualizador de la sección «Pruébalo en tu muro» sigue siendo la simulación dibujada (ADR-0005).

## Alternativas rechazadas
- Simulación dibujada en la ficha (v2.2): el usuario la consideró poco realista.
- Teñir la foto con máscaras y modos de mezcla: no cambia la textura y falla en cambios fuertes de tono (madera oscura a crema).
- Fotos reales por color: Lambrin no las tiene.

## Consecuencias (+ / −)
- (+) Cada color se ve instalado en una escena fotográfica.
- (−) Son imágenes generadas: pueden diferir del producto real; el aviso es obligatorio.
- (−) +21 MB en el repositorio y el paquete; no afecta la carga inicial.
- (−) Las escenas de Acústico (otro material en la foto original) y de las pérgolas cambiaron de geometría al generar; se aceptaron porque muestran el producto correcto.
- (−) Costo: 2 créditos por imagen; 98 créditos en total con prueba, reintentos y repeticiones.

## Se revertiría si
Lambrin entrega fotos propias por color, o el cliente no acepta imágenes generadas. Requiere ADR nuevo.

## Referencias
`blueprints/_sistema/CHANGELOG-ARQ.md` (2026-10-29), `site/assets/CREDITOS.md`.
