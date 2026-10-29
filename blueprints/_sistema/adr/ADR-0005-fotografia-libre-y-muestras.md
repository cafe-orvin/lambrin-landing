# ADR-0005: Fotografía libre para escenas y muestras del catálogo
- Estado: Aceptado
- Fecha: 2026-10-28 · Aprobó: usuario (cafe@orvin.lat), en el chat («lo necesario», respuesta a PG0–PG3) · Compuerta: PG2
- Sustituye: ADR-0002

## Contexto
La v2 debe lucir el catálogo completo en escenas reales. El usuario eligió «Fotos libres + PDF». Las fotos de ambientación del PDF son de baja resolución y sus derechos no están claros.

## Decisión
- Escenas: fotos de Unsplash o Pexels (uso comercial gratuito), descargadas, convertidas a WebP y autoalojadas en `site/assets/escenas/`, con autor, URL y licencia en `site/assets/CREDITOS.md`.
- Cada escena lleva la nota «Imagen ilustrativa»: muestra el tipo de acabado, no el producto exacto.
- Colores: recortes de las muestras del PDF en `site/assets/muestras/`.
- El visualizador de muro lleva la etiqueta «Simulación · el color real puede variar».

## Alternativas rechazadas
- Fotos de ambientación del PDF: baja resolución y derechos sin aclarar.
- Imágenes generadas con IA: no fue la opción elegida.
- Texturas solo en canvas (v1): no luce los acabados reales.

## Consecuencias (+ / −)
- (+) Escenas de alta calidad que venden el tipo de acabado.
- (−) Las escenas no son el producto exacto; la nota es obligatoria.
- (−) Peso de imágenes; se mitiga con WebP, `srcset` y carga diferida.

## Se revertiría si
Lambrin entrega fotografías propias de sus productos instalados. Requiere ADR nuevo.

## Referencias
`blueprints/lambrin-v2/propuesta.md` (RF-01, RF-03, RF-05, RNF-03).
