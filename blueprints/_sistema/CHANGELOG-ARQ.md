# CHANGELOG de arquitectura — Landing Lambrin

- 2026-10-28: PG0 aprobado (admisión, greenfield, repositorio propuesto en `~/Documents/Orvin/Lambrin/lambrin-landing/`).
- 2026-10-28: PG1 aprobado (descubrimiento y supuestos S1–S5).
- 2026-10-28: paquete F2 propuesto para PG2: documentos 00–06, anexo de contenido y ADR-0001 a ADR-0003 en estado «Propuesto».
- 2026-10-28: PG2 aprobado; ADR-0001 a ADR-0003 aceptados.
- 2026-10-28: plan F3 (`lambrin-landing/plan.md`) y ADR-0004 propuestos para PG3.
- 2026-10-28: PG3 aprobado («Aprobar PG3 + humo»): ADR-0004 aceptado; autorizadas T01–T06 con commits y etiquetas locales y la prueba de humo T07 en el navegador integrado.
- 2026-10-28: F4 construida en `arq/lambrin-landing` (T01–T07, etiquetas `lambrin-t01`…`lambrin-t07`). Prueba de humo ejecutada con autorización; 19 de 19 criterios cumplen (CA-015 solo en código). Entrada `lambrin-landing` agregada a `SC360/.claude/launch.json` con respaldo. Pendiente PG4.
- 2026-10-28: PG4 aprobado. Cierre F5: documentos de `_sistema/` marcados como vigentes y alineados con lo construido (selector en la escena, vistas de detalle, aviso agregado, entorno de prueba). ADR-0001 a ADR-0004 siguen aceptados sin cambios. Pendiente PG5.
- 2026-10-28: PG5 aprobado («PG5 y fusionar»). Rama `arq/lambrin-landing` fusionada a `main`; entrada `lambrin-landing` retirada de `SC360/.claude/launch.json` restaurando su respaldo (SHA-256 original verificado). Proyecto cerrado; cualquier cambio posterior abre un nuevo ciclo PG0–PG5.

## Ciclo v2 — catálogo completo
- 2026-10-28: nuevo ciclo brownfield. Propuesta `lambrin-v2/propuesta.md`. Decisiones del usuario: fotos libres + muestras del PDF, precios públicos, WhatsApp (número pendiente), v2 en `arq/lambrin-v2`. IVA no se menciona; dominio pendiente.
- 2026-10-28: PG0–PG3 aprobados con la respuesta «lo necesario». ADR-0005 a ADR-0008 aceptados; ADR-0002 y ADR-0003 sustituidos; parte tipográfica de ADR-0001 sustituida. Autorizadas T01–T08, descargas de fotos libres y fuentes OFL, y prueba de humo T07.
- 2026-10-29: F4 construida en `arq/lambrin-v2` (T01–T08, etiquetas `lambrin2-t01`…`lambrin2-t08`). Prueba de humo T07 con entrada temporal `lambrin-v2-prueba` en `SC360/.claude/launch.json`, retirada restaurando el respaldo (SHA-256 `769baf5e…6921fb` verificado). 17 requisitos cumplen; RNF-02 solo en código y RNF-04 parcial. Evidencia en `lambrin-v2/verificacion.md`.
- 2026-10-29: PG4 aprobado («Aprobar PG4»). Cierre F5 propuesto: documentos de `_sistema/` 00–06 reescritos para la v2; `anexo-contenido.md` marcado como histórico de la v1. Pendiente PG5 y fusión a `main`.
- 2026-10-29: PG5 aprobado («PG5 y fusionar»). Rama `arq/lambrin-v2` fusionada a `main` con etiqueta `lambrin-v2`; ADR-0005 a ADR-0008 aceptados y documentos de `_sistema/` vigentes para la v2. Worktree y rama conservados; sin push ni despliegue. Pendientes del usuario: número de WhatsApp y dominio.

## Publicación y datos de contacto (sin cambio de arquitectura)
- 2026-10-29: a petición del usuario («levantala al repositorio»), repositorio público `github.com/cafe-orvin/lambrin-landing` con `main`, ramas y etiquetas. GitHub Pages sirve la rama `gh-pages`, generada con `git subtree split --prefix=site`: https://cafe-orvin.github.io/lambrin-landing/
- 2026-10-29: llenado de datos previsto en ADR-0007 y RNF-05, en la rama `arq/lambrin-datos`: número de WhatsApp **provisional para pruebas** dado por el usuario (`528681259055`), `og:url` y `og:image` absolutas, y `robots.txt` y `sitemap.xml` con la dirección de Pages. Sin ADR nuevo: no cambia la arquitectura. Pendientes: número definitivo y dominio propio.
- 2026-10-29: ciclo corto en `arq/lambrin-ficha` (aprobado en el chat: «Cambiar a simulación»). La ficha de producto agrega la vista «Foto / Tu muro»: al elegir un color, la foto se funde con la escena simulada del visualizador pintada con ese color (`paintWall` recibe la escena como parámetro; luz de día). El Deck no tiene `visual` y conserva solo la foto. Corrección: los colores `soloTono` (Waby Beige Metal y Skin) ya no muestran el recorte defectuoso del PDF en muestras, lupa, tarjetas ni lista; se pinta su tono. Prueba en el navegador integrado con entrada temporal `lambrin-ficha-prueba` en `SC360/.claude/launch.json`, retirada restaurando el respaldo (SHA-256 `769baf5e…6921fb` verificado). Sin ADR nuevo: reutiliza ADR-0001 y ADR-0005.
