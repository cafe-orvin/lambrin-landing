# F3 — Plan de construcción: Landing Lambrin
Fecha: 2026-10-28 · Estado: PG3 aprobado 2026-10-28 (incluye autorización de la prueba de humo T07) · Método: manual · Base: PG2 aprobado (ADR-0001, ADR-0002, ADR-0003)

## Alcance de lo que autoriza PG3
- Crear el repositorio local `~/Documents/Orvin/Lambrin/lambrin-landing/` con un commit inicial vacío en `main`.
- Construir en la rama `arq/lambrin-landing`, con commits y etiquetas locales por tarea.
- Copiar al repositorio los documentos de arquitectura.
- Escribir `site/index.html`, `site/styles.css` y `site/main.js`, más un `README.md`.

**PG3 no autoriza:** push, remoto, despliegue, instalación de dependencias, generadores, cambios de configuración ni prueba de humo. La prueba de humo (T07) requiere una autorización aparte en el chat.

## Convenciones
- Ruta raíz: `R=~/Documents/Orvin/Lambrin/lambrin-landing`.
- Etiquetas: `lambrin-t01` … `lambrin-t06`, una por tarea, sobre el commit que la cierra.
- Commits en español, terminados con la línea de coautoría acordada.
- Rollback: `git revert` del commit de la tarea o rama nueva desde la etiqueta anterior, con aprobación. Nunca `reset --hard`.
- Las verificaciones son estáticas (lectura y `grep`); los criterios marcados **N** en `01-requisitos.md` quedan «not smoke-tested» hasta T07.

---

## T01 — Repositorio y documentos
1. `mkdir -p "$R"` · `git -C "$R" init -b main` · `git -C "$R" commit --allow-empty -m "Inicio del repositorio"`.
2. `git -C "$R" switch -c arq/lambrin-landing`.
3. Copiar `00-inicio.md`, `01-descubrimiento.md` y `blueprints/` desde `~/Documents/Orvin/_ARQUITECTURA/greenfield/lambrin-landing/` a `$R/blueprints/` (los originales se conservan).
4. `README.md`: propósito, cómo abrir la página (`site/index.html` con doble clic), aviso de representación conceptual, datos pendientes y enlace a `blueprints/`.

**Aceptación:** existe la rama `arq/lambrin-landing`; `main` tiene solo el commit inicial; los documentos están en `$R/blueprints/`.
**Verificación:** `git -C "$R" branch --show-current` = `arq/lambrin-landing`; `git -C "$R" rev-list --count main` = `1`; `ls "$R/blueprints/_sistema/adr"` lista los tres ADR.
**Cierre:** commit + etiqueta `lambrin-t01`.

## T02 — Estructura y textos (`site/index.html`)
- `lang="es-MX"`, `<meta viewport>`, `<title>Lambrin — Acabados para muros</title>`, enlace a `styles.css`, `<script src="main.js" defer>`.
- Encabezado con «LAMBRIN» en texto y navegación por anclas (`#acabados`, `#ideas`, `#contacto`).
- Escena `#escena`: capas decorativas con `aria-hidden="true"`; dos `button role="switch"` («Luz de día», «Luz de acento») sobre el muro; aviso de escena conceptual.
- `#acabados`: `div role="radiogroup"` con seis `role="radio"` en el orden aprobado; nombre y tono del acabado activo; vista de detalle.
- `#valor`, `#ideas` (cuatro ideas con «Ver en la escena»), `#contacto` (resumen de la selección + aviso pendiente), pie con avisos.
- Región `aria-live="polite"` visualmente oculta.
- Textos exactos de `_sistema/anexo-contenido.md`.

**Aceptación:** CA-002 (estructura), CA-006, CA-008, CA-009, CA-010, CA-016.
**Verificación:**
- `grep -c 'role="radio"' site/index.html` = `6`; `grep -c 'role="switch"' site/index.html` = `2`.
- `grep -E '<form|<input|<textarea|mailto:|tel:|https?://' site/index.html` sin resultados.
- `grep -E '\$|MXN|[0-9]+ ?(cm|mm|m²|m2)' site/index.html` sin resultados.
- Lectura del archivo contra el anexo de contenido.
**Cierre:** commit + etiqueta `lambrin-t02`.

## T03 — Estilos y escena (`site/styles.css`)
- Variables en `:root` para paleta de interfaz, tipografías del sistema (ADR-0001) y variables de escena (`--wall-base`, `--wall-light`, `--wall-shadow`, `--texture`, intensidades de luz).
- Escena con geometría fija; muro ≥ 60 % del área en escritorio y móvil; ventana a la izquierda con sombra de cancel; lámpara de muro a la derecha; apagadores como placas sobre el muro.
- Estados `.is-night` y `.has-accent` que cambian solo `opacity` y `transform` de las capas.
- Diseño desde 320 px, puntos de corte declarados, sin desplazamiento horizontal (`overflow-x: clip` en el contenedor de la escena).
- `:focus-visible` en todos los controles; objetivos ≥ 44 × 44 px; `touch-action: pan-y` en la escena.
- `@media (prefers-reduced-motion: reduce)`: transiciones y desplazamiento suave anulados.

**Aceptación:** CA-001 (geometría declarada), CA-012 (tamaños táctiles), CA-013, CA-014 (foco), CA-015, CA-019 (propiedades animadas).
**Verificación:**
- `grep -c 'prefers-reduced-motion' site/styles.css` ≥ `1`; `grep -c ':focus-visible' site/styles.css` ≥ `1`; `grep 'touch-action: pan-y' site/styles.css` con resultado.
- `grep -E '@import|url\(https?:|@font-face' site/styles.css` sin resultados.
- `grep -E 'transition:[^;]*(width|height|top|left|background)' site/styles.css` sin resultados.
**Cierre:** commit + etiqueta `lambrin-t03`.

## T04 — Datos, estado e interacción (`site/main.js`)
- `FINISHES` (seis entradas según `03-modelo-datos.md`), `INSPIRATIONS` (cuatro), `CONTACT = { channel: null }`.
- Estado único `{ acabadoId, modo, acento }` y una función `render()` que actualiza variables CSS, clases, `aria-checked`, textos, resumen del CTA, hash y anuncio.
- Radiogroup con tabindex móvil: flechas, Inicio y Fin; clic y toque.
- Apagadores: clic, toque, Espacio y Enter; el nombre accesible no cambia, solo `aria-checked`.
- Deslizamiento horizontal sobre la escena (eventos `pointer`, umbral de distancia) para el acabado anterior o siguiente.
- Hash `#acabado-<id>`: lectura al cargar validando contra los seis `id`; escritura con `history.replaceState`.
- «Ver en la escena»: aplica la combinación, desplaza a la escena (suave solo sin movimiento reducido) y lleva el foco al acabado activo.

**Aceptación:** CA-002, CA-003, CA-004, CA-005, CA-007, CA-008, CA-011, CA-012, CA-017, CA-018.
**Verificación:**
- `grep -E 'fetch\(|XMLHttpRequest|localStorage|sessionStorage|document\.cookie|innerHTML|type="module"|https?://' site/main.js` sin resultados.
- `grep -c "id: '" site/main.js` coincide con 6 acabados en `FINISHES` (lectura del bloque).
- `grep "channel: null" site/main.js` con resultado.
- `node --check site/main.js` solo si `node` ya está instalado (no se instala nada); si no está, se registra «sin verificación de sintaxis».
**Cierre:** commit + etiqueta `lambrin-t04`.

## T05 — Texturas conceptuales y respuesta a la luz
- Generador Canvas 2D con PRNG de semilla fija; patrones `veta`, `mineral` y `tejido`; mosaico de tamaño acotado (≤ 512 px) que se repite; caché por acabado.
- La textura se aplica como `--texture` (`url(data:…)` local); su contraste se modula con capas de luz rasante (lámpara y acento) mayores que con luz difusa de día.
- Sin juntas ni modulación (ADR-0002).
- Parámetros de luz por acabado para que Nogal y Negro se lean igual que los claros.

**Aceptación:** CA-003 (vista propia por acabado), CA-019 (caché), ADR-0002 completo.
**Verificación:** lectura del generador (semilla fija, caché, tamaño de mosaico); `grep -E 'https?://|\.jpg|\.png|\.webp' site/main.js site/styles.css` sin resultados.
**Cierre:** commit + etiqueta `lambrin-t05`.

## T06 — Revisión estática final y cierre de épica
- Recorrer CA-001 … CA-019 y anotar para cada uno: cumple (E), pendiente de navegador (N) o no cumple.
- Barrido de veracidad: ningún texto de producto fuera del anexo aprobado; ningún precio, medida, material, formato, certificación, cliente ni testimonio.
- Confirmar que las referencias de Codex siguen intactas comparando sus SHA-256 con `00-inicio.md` §9.
- Actualizar `README.md` y `blueprints/_sistema/CHANGELOG-ARQ.md` con el resultado.

**Aceptación:** tabla de criterios completa en `blueprints/lambrin-landing/verificacion.md`; cero «no cumple»; SHA-256 de referencias sin cambios.
**Verificación:** `shasum -a 256` de las dos demos = valores registrados; `git -C "$R" status --porcelain` vacío tras el commit.
**Cierre:** commit + etiqueta `lambrin-t06`. Se solicita **PG4** para esta épica.

## T07 — Prueba de humo (solo con autorización explícita aparte)
Abrir `site/index.html` en el navegador integrado (sin servidor y sin modificar `.claude/launch.json`):
- Escritorio y móvil (375 × 812): capturas de los seis acabados, día/noche y acento.
- Teclado: tabulación completa, flechas en el selector, Espacio en los apagadores.
- Consola sin errores; ninguna solicitud de red fuera de `file://`.
- Movimiento reducido emulado.

Sin autorización, el plan y la entrega quedan **«not smoke-tested»** y los criterios **N** sin comprobar.

---

## Entrega
Archivo principal: `~/Documents/Orvin/Lambrin/lambrin-landing/site/index.html` (rama `arq/lambrin-landing`, sin fusionar a `main` hasta PG4/PG5).

## Revisión del bundle (lista-revision-bundle.md, modo manual)
- [x] Tecnología y dependencias: HTML, CSS y JS nativos; cero paquetes (ADR-0001).
- [x] Pasos de construcción: sin `curl | sh`, `sudo`, rutas fuera del proyecto (salvo la copia de documentos desde `_ARQUITECTURA`, solo lectura) ni despliegues.
- [x] Brownfield §9.1: no aplica (greenfield). Las demos de referencia no se modifican; se verifica su SHA-256 en T06.
- [x] Secretos: ninguno.
- [x] Despliegue: nada se despliega.
- [x] Workspace: no se crean CLAUDE.md, AGENTS.md ni `.claude/`.
- [x] Sin plugin: lista revisada y firmada en ADR-0004.
- [x] 0 pendientes de aclarar · prueba de humo marcada «not smoke-tested» salvo autorización de T07.

## Resultado de F4 — 2026-10-28
- T01–T06 construidas y verificadas; T07 (prueba de humo) autorizada y ejecutada antes de T06. Detalle en `verificacion.md`.
- Entrega: `~/Documents/Orvin/Lambrin/lambrin-landing/site/index.html` en la rama `arq/lambrin-landing`.
- PG4 aprobado por el usuario en el chat el 2026-10-28 («Aprobar PG4»). Siguiente: cierre F5 y PG5.
