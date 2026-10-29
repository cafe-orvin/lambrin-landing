# 06 — Inventario funcional
Estado: Vigente — aprobado en PG2, construido en F4 (PG4, 2026-10-28) · Repositorio: `~/Documents/Orvin/Lambrin/lambrin-landing/`, rama `arq/lambrin-landing`

## Funcionalidad construida
| Funcionalidad | Módulo | Ruta |
|---|---|---|
| Estructura, textos y avisos | Marcado | `site/index.html` |
| Escena, capas de luz, apagadores, secciones, responsive, movimiento reducido | Estilos | `site/styles.css` |
| Datos `FINISHES`, `INSPIRATIONS`, `CONTACT` | Configuración | `site/main.js` |
| Generador de texturas conceptuales | Lógica | `site/main.js` |
| Estado, selector, apagadores, deslizamiento, hash, anuncios, CTA | Lógica | `site/main.js` |

## Referencias revisadas (no se modifican)
| Funcionalidad | Origen | Tratamiento |
|---|---|---|
| Capas de escena CSS y apagadores `role="switch"` | Demo 2 de Codex | Se reescriben con el modelo de capas de `02-diagramas.md`. |
| Nombres de los seis acabados | Demo 2 | Se conservan. |
| Tonos hexadecimales de la demo | Demo 2 | Punto de partida; se ajustan en F4 y siguen siendo conceptuales. |
| Modal de cotización | Demo 1 | Descartado. |
| «Lambrin Estudio», «Colección esencial», «Línea natural / 2026» | Demo 2 | Descartados por no estar verificados. |

Las rutas y SHA-256 de las demos están en `../00-inicio.md` §9.

## Entorno de prueba (fuera del repositorio)
| Elemento | Ruta | Nota |
|---|---|---|
| Entrada `lambrin-landing` del servidor de vista previa (retirada en PG5) | `~/Documents/Orvin/SC360/.claude/launch.json` | Autorizada en el chat para T07 y retirada en PG5 restaurando el respaldo (SHA-256 `769baf5e…6921fb`). Sirve una copia de `site/` desde la carpeta temporal de la sesión, porque macOS no permite al servidor leer `~/Documents`. Respaldo: `SC360/backups/launch.json.pre-lambrin-2026-10-28.bak`. |
