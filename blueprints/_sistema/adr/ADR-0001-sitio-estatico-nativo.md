# ADR-0001: Sitio estático con HTML, CSS y JavaScript nativos, sin dependencias
- Estado: Aceptado
- Fecha: 2026-10-28 · Aprobó: usuario (cafe@orvin.lat), en el chat · Compuerta: PG2

## Contexto
Lambrin necesita una landing conceptual, sin backend, sin integraciones y sin datos personales. El proyecto es greenfield y no tiene stack aprobado. Las reglas prohíben agregar frameworks, dependencias o servicios por iniciativa propia. La página debe poder abrirse desde el disco para revisarla sin servidor. En PG0 se aprobó el repositorio `~/Documents/Orvin/Lambrin/lambrin-landing/` con rama `arq/lambrin-landing`.

## Decisión
- Tres archivos en `site/`: `index.html`, `styles.css` y `main.js`.
- JavaScript clásico (`<script defer>`, sin `type="module"`), porque los módulos no cargan desde `file://`.
- Sin paso de compilación, sin `package.json`, sin gestores de paquetes.
- Tipografía del sistema: una pila con remate para títulos (`"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif`) y una pila sin remate para textos (`system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`).
- Sin recursos remotos de ningún tipo.

## Alternativas rechazadas
- **Un solo archivo HTML** (como las demos): más difícil de revisar y mantener; separar CSS y JS no agrega dependencias.
- **Framework (React, Astro, etc.) o generador:** requiere instalación y dependencias no aprobadas, sin beneficio para una página.
- **Fuentes web (Google Fonts u otras):** dependencia externa y solicitud a terceros; requeriría aprobación aparte.

## Consecuencias (+ / −)
- (+) Se abre con doble clic, sin instalar nada; cero superficie de dependencias.
- (+) Migrar después a cualquier hosting estático es directo.
- (−) La tipografía varía ligeramente según el sistema operativo.
- (−) Sin compilación no hay minificación; aceptable para una página de este tamaño.

## Se revertiría si
Se aprueba una identidad con fuente propia, un sitio de varias páginas o un CMS. Requiere ADR nuevo.

## Referencias
`00-contexto.md`, `01-requisitos.md` (CA-017), `02-diagramas.md`, `06-inventario-funcional.md`.
