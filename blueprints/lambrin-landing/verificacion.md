# Verificación F4 — Landing Lambrin
Fecha: 2026-10-28 · Rama: `arq/lambrin-landing` · Etiquetas: `lambrin-t01` … `lambrin-t07`

Prueba de humo **autorizada y ejecutada** (T07) en el navegador integrado, servida desde una copia en la carpeta temporal de la sesión mediante la entrada `lambrin-landing` de `SC360/.claude/launch.json` (autorizada en el chat; respaldo `SC360/backups/launch.json.pre-lambrin-2026-10-28.bak`, SHA-256 `769baf5e…6921fb`). Anchos probados: 1440 × 900, 689 × 684, 375 × 812 y 320 × 640.

Leyenda: **E** = inspección estática · **N** = navegador.

| Criterio | Resultado | Evidencia |
|---|---|---|
| CA-001 Muro protagonista, sin muebles | Cumple (E + N) | El muro ocupa todo el encuadre salvo el piso (11–13 %); solo hay ventana, lámpara y placa de apagadores. |
| CA-002 Radiogroup con seis opciones en orden | Cumple (E + N) | 6 `role="radio"` en orden; siempre una con `aria-checked="true"`. |
| CA-003 Vista propia por acabado, geometría fija | Cumple (E + N) | `FINISHES` define paleta, textura y luz por acabado; la geometría está en CSS y no cambia. |
| CA-004 Apagador día/noche | Cumple (E + N) | Nombre fijo «Luz de día»; `aria-checked` cambia; de noche se oscurecen la ventana y el muro y se enciende la lámpara. |
| CA-005 Apagador de acento | Cumple (E + N) | Nombre fijo «Luz de acento»; baño rasante visible de día y de noche. |
| CA-006 Sección de valor | Cumple (E) | Tres bloques del anexo, sin cifras ni atributos técnicos. |
| CA-007 Ideas con «Ver en la escena» | Cumple (E + N) | Cuatro ideas; el botón aplica la combinación, sube a la escena y deja el foco en el acabado. |
| CA-008 CTA sin canal | Cumple (E + N) | Aviso «Canal de contacto pendiente de confirmar»; sin `<form>`, `mailto:`, `tel:` ni envío; resumen actualizado. |
| CA-009 Avisos de simulación | Cumple (E + N) | Junto a la escena, en la sección de acabados y en el pie. |
| CA-010 Sin datos comerciales | Cumple (E) | Barrido de palabras de riesgo (precio, materiales, medidas, certificación, cliente, testimonio, disponibilidad) sin coincidencias. |
| CA-011 Enlace `#acabado-<id>` | Cumple (E + N) | El hash se actualiza al elegir y se respeta al cargar; solo acepta los seis `id`. |
| CA-012 Mouse, teclado y táctil | Cumple (E + N) | Flechas/Inicio/Fin con tabindex móvil (un solo radio tabulable); Espacio en apagadores; ningún control < 44 px; deslizamiento táctil cambia de acabado. |
| CA-013 Adaptable sin desbordamiento | Cumple (E + N) | `scrollWidth` = ancho de ventana en 320, 375, 689 y 1440 px. |
| CA-014 Foco visible, anuncios y contraste | Cumple (E + N) | `:focus-visible` con anillo doble; `aria-live` anuncia acabado e ideas; contrastes calculados entre 5.3:1 y 15.1:1 en textos clave. |
| CA-015 Movimiento reducido | Cumple (E) | `prefers-reduced-motion` anula transiciones y desplazamiento suave. No se pudo emular en el navegador integrado. |
| CA-016 `lang="es-MX"` | Cumple (E) | Presente. |
| CA-017 Sin dependencias ni red | Cumple (E + N) | Sin URL externas ni fuentes web; en red solo se piden `index.html`, `styles.css` y `main.js`; consola sin errores. |
| CA-018 Sin datos personales | Cumple (E) | Sin campos, cookies ni almacenamiento local. |
| CA-019 Rendimiento | Cumple (E) | Texturas en caché por acabado y generadas en momentos libres; solo se animan `opacity` y `transform`. |

## Ajustes hechos tras la prueba de humo (T07)
- Luz de ventana más suave; lámpara y luz de acento más visibles de noche.
- Veta menos ondulada para que no se note la repetición del mosaico.
- Selector en una sola fila en escritorio; nombres completos en móvil.
- Placa de apagadores y lámpara reubicadas en móvil para no encimarse con el texto.

## Desviaciones del plan
- El selector de acabados vive en la escena principal; la sección «Acabados» muestra las seis vistas de detalle con «Ver en la escena».
- Se agregó el aviso «Vistas de detalle conceptuales · color y textura simulados» bajo el título de «Acabados» (refuerza RF-009; no estaba en el anexo).
- T07 se ejecutó antes de T06 para que esta revisión incluya sus ajustes; sus cambios quedaron en `lambrin-t07`.
- En la copia de los documentos dentro del repositorio se ajustaron los enlaces relativos a `00-inicio.md` y `01-descubrimiento.md`.

## Referencias de Codex
SHA-256 sin cambios respecto a `00-inicio.md` §9:
- Demo 1: `95079e555d0a667961fb688c3c3ba4bf0d17e13dbe9e0ee84b82bc435f124650`
- Demo 2: `0c2b16c55b3e258a0f2f9238e6215b5bc7b97c1fd48ba5b04907cf2e8c775a1f`

## Pendiente
- Emular movimiento reducido en un navegador real (CA-015 verificado solo en código).
- Datos del proyecto: canal de contacto, fotografías aprobadas, logotipo, catálogo, dominio y hosting.
