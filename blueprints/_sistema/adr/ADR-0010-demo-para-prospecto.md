# ADR-0010: Copia de demo para el prospecto con cotización de Orvin
- Estado: Aceptado
- Fecha: 2026-10-29 · Aprobó: usuario (cafe@orvin.lat), en el chat (marca Orvin, precios sugeridos con soporte menor, más IVA, URL aparte `/demo/`) · Compuerta: ciclo corto en `arq/lambrin-demo`

## Contexto
El usuario quiere enviar la landing a Lambrin como demo: que el prospecto la recorra y encuentre un botón «Cotiza tu landing page» con los costos de página, hosting, dominio y soporte.

## Decisión
- La capa de demo vive fuera de `site/`, en `demo/demo.js` y `demo/demo.css`; el sitio principal no la carga.
- `demo/armar.sh <destino>` copia `site/`, agrega la capa, marca la página `noindex` y cambia `og:title` y `og:url`. Se publica en `/demo/` de GitHub Pages: https://cafe-orvin.github.io/lambrin-landing/demo/
- Botón flotante dorado abajo a la izquierda (la derecha es del WhatsApp del sitio) y un aviso breve al entrar. Abre un diálogo nativo (`<dialog>`) con lo que incluye, la tabla de costos, el total para arrancar y el botón «Quiero mi landing» a WhatsApp.
- Costos (MXN más IVA): desarrollo $18,500 pago único (50 % anticipo); dominio .com.mx $650/año; hosting con SSL $1,800/año; soporte opcional $600/mes. Para arrancar: $20,950. Se editan en `COTIZACION` dentro de `demo/demo.js`.
- WhatsApp de la cotización: el número provisional 528681259055.

## Alternativas rechazadas
- Botón en la URL principal: habría que quitarlo al cerrar la venta.
- Archivos de demo dentro de `site/`: quedarían publicados en el sitio principal.

## Consecuencias (+ / −)
- (+) El prospecto ve su sitio funcionando y el precio en el mismo lugar.
- (+) El sitio principal queda limpio para la entrega.
- (−) Al publicar `gh-pages` hay que volver a armar `/demo/`.
- (−) Los botones de WhatsApp del catálogo también llegan al número provisional mientras sea demo.

## Se revertiría si
Lambrin contrata o rechaza la propuesta: se retira `/demo/` de `gh-pages`.
