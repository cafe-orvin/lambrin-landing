# 01 — Requisitos y criterios de aceptación
Estado: Vigente — aprobado en PG2, construido en F4 (PG4, 2026-10-28) · Fuente: `../01-descubrimiento.md` (PG1)

Cada criterio indica cómo se verifica: **E** = inspección estática del código (permitida sin autorización); **N** = navegador o prueba de humo (requiere autorización explícita; sin ella queda «not smoke-tested»).

## Funcionales
| ID | Requisito | Criterio de aceptación | Verif. |
|---|---|---|---|
| RF-001 | Escena principal con muro protagonista, ventana y lámpara discreta. | CA-001: el muro ocupa al menos 60 % del área de la escena en escritorio y móvil; la escena no contiene muebles ni objetos decorativos. | E + N |
| RF-002 | Seis acabados seleccionables. | CA-002: existe un `radiogroup` con seis opciones en este orden: Nogal, Encino, Natural, Negro, Gris, Lino; siempre hay exactamente una con `aria-checked="true"`. | E |
| RF-003 | Vista propia por acabado con encuadre coherente. | CA-003: cada acabado tiene en `FINISHES` su paleta, textura y parámetros de escena; la geometría de la escena (posición de muro, ventana, lámpara y apagadores) es la misma para los seis. | E |
| RF-004 | Apagador día/noche. | CA-004: es un `button role="switch"` con nombre fijo «Luz de día»; `aria-checked` refleja el estado; de noche la ventana se oscurece, baja la luz ambiente y se enciende la lámpara. | E + N |
| RF-005 | Apagador de luz de acento. | CA-005: `button role="switch"` con nombre fijo «Luz de acento»; al activarlo aparece un baño de luz rasante sobre el muro, de día y de noche. | E + N |
| RF-006 | Sección de valor. | CA-006: máximo tres bloques, cada uno con título y como máximo dos frases; ningún texto contiene cifras, medidas, materiales, certificaciones ni beneficios técnicos. | E |
| RF-007 | Sección de inspiración. | CA-007: de tres a cuatro ideas por tipo de espacio; cada una tiene un botón «Ver en la escena» que aplica su combinación (acabado, día/noche, acento) y lleva el foco a la escena; no hay nombres de clientes ni proyectos. | E + N |
| RF-008 | Llamada a la acción final. | CA-008: con `CONTACT.channel = null` se muestra el texto «Canal de contacto pendiente de confirmar» y no existe `<form>`, `href` de contacto ni manejador de envío; se muestra el resumen de la selección actual. | E |
| RF-009 | Avisos de simulación. | CA-009: junto a la escena, «Escena conceptual · color y textura simulados»; en el pie, aviso de representación simulada y de que no se incluyen precios ni especificaciones. | E |
| RF-010 | Sin datos comerciales. | CA-010: el código no contiene precios, medidas, materiales, formato de pieza, disponibilidad, certificaciones ni datos del proveedor. | E |
| RF-011 | Enlace a una vista. | CA-011: el acabado activo se refleja en el hash (`#acabado-nogal`, etc.) y al abrir la página con ese hash se carga ese acabado. | E + N |

## No funcionales
| ID | Requisito | Criterio de aceptación | Verif. |
|---|---|---|---|
| RNF-001 | Mouse, teclado y táctil. | CA-012: flechas, Inicio y Fin mueven la selección en el `radiogroup` (tabindex móvil); Espacio y Enter accionan los apagadores; objetivos táctiles ≥ 44 × 44 px; deslizar horizontalmente sobre la escena cambia de acabado sin bloquear el desplazamiento vertical (`touch-action: pan-y`). | E + N |
| RNF-002 | Adaptable. | CA-013: diseño desde 320 px de ancho sin desplazamiento horizontal; puntos de corte declarados en CSS. | E + N |
| RNF-003 | Estados accesibles. | CA-014: foco visible en todo control; región `aria-live="polite"` anuncia acabado y luz; contraste de texto ≥ 4.5:1 sobre su fondo en cada modo. | E + N |
| RNF-004 | Movimiento reducido. | CA-015: bajo `prefers-reduced-motion: reduce` no hay transiciones de más de 0 ms ni desplazamiento suave. | E |
| RNF-005 | Español de México. | CA-016: `lang="es-MX"`; textos breves, sin anglicismos innecesarios. | E |
| RNF-006 | Sin dependencias ni red. | CA-017: el código no contiene URL `http(s)://`, `@import`, `fetch`, `XMLHttpRequest` ni fuentes web; funciona desde `file://` con `<script>` clásico (sin módulos). | E |
| RNF-007 | Sin datos personales. | CA-018: no hay campos de entrada, cookies ni `localStorage`. | E |
| RNF-008 | Rendimiento razonable. | CA-019: texturas generadas una sola vez por acabado y reutilizadas; animaciones solo con `opacity` y `transform`. | E |

## Resultado (F4)
19 de 19 criterios cumplen; CA-015 verificado solo en código. Evidencia en `../lambrin-landing/verificacion.md`.
