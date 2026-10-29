# Verificación — Landing Lambrin v2
Fecha: 2026-10-29 · Rama: `arq/lambrin-v2` · Prueba de humo T07 autorizada en PG3 y, para el entorno de prueba, en el chat («Sí, agregar y restaurar»).

## Entorno de prueba
- Copia de `site/` en la carpeta temporal de la sesión, servida con `python3 -m http.server 4394 --bind 127.0.0.1`.
- Entrada temporal `lambrin-v2-prueba` en `SC360/.claude/launch.json`, con respaldo previo. Al terminar se restauró el archivo original: SHA-256 `769baf5e912b9b2b89f46b26641f2aa726bd3f5af26918e800fffa8aac6921fb` verificado.
- Navegador integrado de Claude, escritorio a 1440 × 900 y móvil a 375 × 812.

## Resultados
| Requisito | Resultado | Evidencia |
|---|---|---|
| RF-01 Portada | Cumple | Telón de listones, fundido con zoom lento y barrido entre 3 escenas, titular por palabras, luz que sigue al cursor. |
| RF-02 Filtros y 13 fichas | Cumple | Todos 13 · Interior 6 · Exterior 7. La rejilla arma filas completas ([6,6] y [4,4,4]) también al filtrar. |
| RF-03 Ficha | Cumple | Medidas con contador, precio por pieza y caja, costo por pieza en caja, ahorro (Serie 15: $178.57, 3 %). |
| RF-04 Lupa | Cumple | Zoom ×2.4 al pasar el cursor; en táctil se activa al tocar. |
| RF-05 Visualizador | Cumple | Probado con listones (Serie 15), mármol (láminas con junta), celosía (Viga Interior) y mosaico (Piedra PU); luz de día, noche y acento; comparación con línea arrastrable. Etiqueta «Simulación». |
| RF-06 Calculadora | Cumple | 3 casos comprobados a mano (ver abajo). |
| RF-07 Lista y WhatsApp | Cumple | Con número ficticio solo en la copia de prueba, el enlace `wa.me` arma el mensaje completo con productos, colores, cantidades, total y leyenda. No se abrió ni se envió. La lista se conserva al recargar. Sin número: «Contacto próximamente» y botón flotante oculto. |
| RF-08 Galería horizontal | Cumple | Escritorio: anclada y desplazada con el scroll, el título se mueve con las fotos. Móvil: carrusel con deslizamiento. |
| RF-09 Accesorios | Cumple | 5 tarjetas con cantidad y botón «Agregar». |
| RF-10 Botón flotante | Cumple | Lista de cotización (aparece con productos) y WhatsApp (oculto sin número). |
| RF-11 Deck agotado | Cumple | Muestra tachada, «Agotado», botón «Consultar disponibilidad» y nota en el mensaje. |
| RNF-01 320 px – 4K sin desplazamiento horizontal | Cumple | A 375 px: `scrollWidth` = 375. Se corrigió el desborde de las tarjetas de accesorios. |
| RNF-02 Movimiento reducido | Solo en código | Bloque `prefers-reduced-motion` en CSS y bandera `reduce` en JS (sin telón, sin barridos, sin rotación automática, texto visible). El navegador integrado no permite emularlo. |
| RNF-03 Peso | Cumple | Carga inicial: 279 KB en móvil y 330 KB en escritorio (HTML, CSS, JS, fuentes y foto de portada). Total del sitio: 12 MB. |
| RNF-04 Accesibilidad | Cumple parcial | Teclado, foco visible, `aria` en filtros, muestras, diálogos con trampa de foco y Esc. Objetivos de 44 px salvo los enlaces de texto de los créditos. |
| RNF-05 SEO | Cumple | Título, descripción, Open Graph con `og.jpg` 1200 × 630, favicon, `robots.txt` y `sitemap.xml` (dominio por llenar). |
| RNF-06 Consola | Cumple | Sin errores ni avisos. |
| RNF-07 Datos en un archivo | Cumple | Todo en `site/js/catalogo.js`. |

## Casos de la calculadora (comprobados a mano)
1. Lambrin Interior Serie 15, muro de 3.5 × 2.6 m, 10 % de merma: 9.1 m² → 10.01 m² / 0.435 m² = 24 piezas. Opciones: 24 × $185 = $4,440; 1 caja + 10 piezas = $4,350; 2 cajas = $5,000. Resultado: **1 caja + 10 piezas, $4,350**. ✔
2. Viga Interior, 3.5 m de ancho, 2.6 m de alto, separación 7.5 cm: ⌈357.5 / 15⌉ = 24 vigas × 1 tramo × 1.10 = 27 piezas × $600 = **$16,200**. ✔
3. Deck Piso, 4 × 3 m: 13.2 m² / 0.406 m² = 33 piezas → 7 cajas de 5 = **$13,300**, con aviso de agotado. ✔

## Correcciones hechas durante la prueba
- Selectores de la calculadora en blanco (el `background` abreviado anulaba la flecha).
- El aviso emergente asomaba en la parte inferior.
- Rejilla del catálogo con huecos.
- Título de la galería tapado por las fotos.
- Desborde horizontal en móvil por las tarjetas de accesorios.
- Redacción de la calculadora para productos sin caja.
- Zona táctil de los enlaces con flecha.

## Pendiente
- Número de WhatsApp (`CONTACT.whatsapp` en `site/js/catalogo.js`).
- Dominio en `robots.txt` y `sitemap.xml`.
- Movimiento reducido verificado solo en código.
