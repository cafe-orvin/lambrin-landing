# 01 — Requisitos y criterios de aceptación (v2)
Estado: Vigente (v2) — PG0–PG3 2026-10-28, PG4 2026-10-29; PG5 2026-10-29 · Fuente: `../lambrin-v2/propuesta.md`

| ID | Requisito | Resultado F4 |
|---|---|---|
| RF-01 | Portada a pantalla completa con escenas, titular animado y llamada a cotizar. | Cumple |
| RF-02 | Catálogo con filtros Interior · Exterior y las 13 fichas. | Cumple |
| RF-03 | Ficha: escena, medidas, colores con muestra real, precio por pieza y caja, costo por pieza en caja y ahorro. | Cumple |
| RF-04 | Lupa sobre la muestra (cursor o toque). | Cumple |
| RF-05 | Visualizador con textura de la muestra, luz de día/noche/acento, comparación y etiqueta «Simulación». | Cumple |
| RF-06 | Calculadora con merma, combinación más barata de cajas y sueltas, y total estimado. | Cumple (3 casos a mano) |
| RF-07 | Lista de cotización enviada por WhatsApp con mensaje armado. | Cumple (número ficticio solo en la copia de prueba) |
| RF-08 | Galería horizontal que avanza con el desplazamiento. | Cumple |
| RF-09 | Accesorios con precio unitario. | Cumple |
| RF-10 | Botón flotante de WhatsApp. | Cumple (oculto sin número) |
| RF-11 | Deck Teka «Agotado» con «Consultar disponibilidad». | Cumple |
| RNF-01 | 320 px – 4K sin desplazamiento horizontal. | Cumple |
| RNF-02 | `prefers-reduced-motion` sin animaciones grandes. | Solo en código |
| RNF-03 | WebP con `srcset`, carga diferida; portada < 1.5 MB en móvil. | Cumple (279 KB) |
| RNF-04 | Accesible: teclado, foco visible, alternativos, AA. | Cumple parcial (enlaces de texto en créditos < 44 px) |
| RNF-05 | SEO: título, descripción, Open Graph, favicon, robots y sitemap. | Cumple (dominio por llenar) |
| RNF-06 | Sin errores en consola; `file://` y servidor. | Cumple |
| RNF-07 | Catálogo en un solo archivo de datos. | Cumple |

Evidencia: `../lambrin-v2/verificacion.md`.
