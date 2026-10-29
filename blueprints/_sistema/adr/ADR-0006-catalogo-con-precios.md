# ADR-0006: Catálogo con precios públicos en un archivo de datos
- Estado: Aceptado
- Fecha: 2026-10-28 · Aprobó: usuario (cafe@orvin.lat), en el chat («lo necesario», respuesta a PG0–PG3) · Compuerta: PG2

## Contexto
El usuario decidió mostrar los precios del catálogo. Los precios cambian más seguido que el diseño.

## Decisión
- Precios por pieza y por caja, tal como el catálogo (`~/Downloads/lambrin.pdf`), con la leyenda «Precios en MXN, sujetos a cambio sin previo aviso». No se menciona IVA (decisión del usuario).
- Todo el catálogo vive en `site/js/catalogo.js`; la interfaz se arma a partir de ese archivo.
- La calculadora es una estimación con 10 % de merma y lo dice en pantalla.
- El Deck Teka se muestra «Agotado», como en el catálogo.

## Alternativas rechazadas
- Solo «Cotiza»: el usuario eligió mostrar precios.
- Precios escritos en el HTML: cambiar uno obligaría a tocar el diseño.

## Consecuencias (+ / −)
- (+) Cambiar precios o colores es editar un solo archivo.
- (−) Sin JavaScript no se ve el catálogo; se agrega un aviso `<noscript>`.

## Se revertiría si
Se aprueba una tienda con inventario o un CMS.

## Referencias
`propuesta.md` (RF-02, RF-03, RF-06, RF-11, RNF-07).
