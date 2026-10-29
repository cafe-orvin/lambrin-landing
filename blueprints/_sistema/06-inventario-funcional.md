# 06 — Inventario funcional (v2)
Estado: Vigente (v2) — PG0–PG3 2026-10-28, PG4 2026-10-29; PG5 2026-10-29 · Repositorio: `~/Documents/Orvin/Lambrin/lambrin-landing` (worktree `lambrin-landing-v2`, rama `arq/lambrin-v2`)

| Funcionalidad | Módulo | Ruta |
|---|---|---|
| Estructura, SEO, diálogos (ficha y cotización), avisos | Marcado | `site/index.html` |
| Diseño, telón, portada, revelado, galería anclada, responsive, movimiento reducido | Estilos | `site/css/styles.css` |
| Catálogo, accesorios, portada, galería, créditos, CONTACT, leyenda, merma | Datos | `site/js/catalogo.js` |
| Tarjetas, filtros, rejilla, inclinación 3D | Lógica | `site/js/main.js` |
| Ficha con lupa, contadores, precios, unidad y cantidad | Lógica | `site/js/main.js` |
| Visualizador (listones, lámina, celosía, mosaico, tablero; luces; comparación) | Lógica | `site/js/main.js` |
| Calculadora (superficie, piso, vigas) | Lógica | `site/js/main.js` |
| Lista de cotización, copiar pedido, WhatsApp | Lógica | `site/js/main.js` |
| Escenas (26 fotos × 2–3 tamaños) | Recursos | `site/assets/escenas/` |
| Muestras de color y accesorios (49) | Recursos | `site/assets/muestras/` |
| Fuentes y licencias | Recursos | `site/assets/fuentes/` |
| Favicon, Open Graph, robots, sitemap, `.htaccess` | Publicación | `site/` |
| Guía de publicación y paquete | Entrega | `PUBLICAR.md`, `lambrin-sitio-v2.zip` (ignorado en git) |

## Retirado de la v1
Generador de texturas en canvas, apagadores `role="switch"`, hash de acabado y bloque CTA sin canal (en la etiqueta `lambrin-v1`).

## Entorno de prueba (fuera del repositorio)
Entrada temporal `lambrin-v2-prueba` en `~/Documents/Orvin/SC360/.claude/launch.json` (puerto 4394), autorizada en el chat y retirada al terminar T07 restaurando el respaldo (SHA-256 `769baf5e…6921fb`).
