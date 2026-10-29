# 00 — Contexto: Landing Lambrin (v2)
Estado: Vigente (v2) — PG0–PG3 2026-10-28, PG4 2026-10-29; PG5 2026-10-29 · Fuente: `../lambrin-v2/propuesta.md`

## Propósito
Landing estática que vende el catálogo completo de Lambrin (13 productos, 44 colores y 5 accesorios) con escenas fotográficas, movimiento e interacción, y que lleva al visitante a cotizar por WhatsApp. La v1 conceptual se conserva en la etiqueta `lambrin-v1`.

## Actores
- **Visitante** (dueño de casa, arquitecto, diseñador o contratista): explora, compara, calcula y arma su cotización.
- **Asesor de Lambrin:** recibe por WhatsApp un mensaje con productos, colores, cantidades y total estimado.

## Alcance
Portada con escenas, manifiesto con cifras, catálogo filtrable con fichas (medidas, colores, precios, lupa), visualizador «Pruébalo en tu muro», calculadora de piezas, galería horizontal, accesorios, pasos para cotizar, llamada final, pie con avisos y créditos, lista de cotización y botón flotante.

## No-objetivos
Pago en línea, inventario en tiempo real, cuentas, backend, formularios que guarden datos, CMS, varios idiomas, despliegue hecho por Claude y compra del dominio.

## Restricciones
- HTML, CSS y JS nativos, sin compilación ni dependencias (ADR-0001); funciona desde `file://` y desde cualquier hosting estático.
- Fuentes autoalojadas (ADR-0008). Sin solicitudes a terceros al cargar; el único enlace externo es `wa.me`.
- Sin afirmaciones técnicas que no estén en el catálogo (supuesto S5 de la propuesta).

## Datos pendientes
| Dato | Efecto mientras falte |
|---|---|
| Número de WhatsApp | Botones con «Contacto próximamente»; botón flotante de WhatsApp oculto. |
| Dominio | `TU-DOMINIO` en `robots.txt` y `sitemap.xml`; `og:image` relativa. |
| Fotos propias de Lambrin | Escenas de Unsplash con nota «Imagen ilustrativa» (ADR-0005). |
