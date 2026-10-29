# Propuesta — Landing Lambrin v2 (catálogo completo)
Fecha: 2026-10-28 · Responsable: usuario (cafe@orvin.lat) · Modo: manual (protocolo `arquitectura`)
Tipo: brownfield · ¿Es software?: sí
Repositorio: `~/Documents/Orvin/Lambrin/lambrin-landing` · Rama actual: `main` (5e3dccb, sin cambios pendientes)
Rama de trabajo propuesta: `arq/lambrin-v2`, en un worktree nuevo desde `main` (la v1 queda en la etiqueta `lambrin-v1`)

---

## PG0 — Admisión

### 1. Objetivo de negocio
Vender el catálogo completo de Lambrin (13 productos y 5 accesorios; corregido de «12» al validar T03) con una landing que luzca los acabados en escenas reales, se mueva, sea interactiva y lleve al visitante a cotizar por WhatsApp. Debe quedar lista para subirse a un dominio.

### 2. Usuarios
- Visitante final (dueño de casa, arquitecto, diseñador o contratista) que busca acabados para muros, techos y pisos.
- Asesor de Lambrin, que recibe por WhatsApp un mensaje con productos, colores y cantidades.

### 3. Alcance / No-objetivos
**Dentro del alcance:** todo el catálogo con medidas, colores y precios; escenas fotográficas; movimiento al desplazarse; selector de color; visualizador de muro; calculadora de piezas; lista de cotización enviada por WhatsApp; SEO básico; paquete para hosting.
**No-objetivos:** tienda con pago en línea, inventario en tiempo real, cuentas de usuario, backend, formulario que guarde datos, CMS, varios idiomas, despliegue hecho por mí y compra del dominio.

### 4. Restricciones
- Sitio estático (HTML, CSS y JS nativos), sin paso de compilación y sin librerías, para que se pueda subir tal cual a cualquier hosting (Hostinger, cPanel, Netlify, Vercel, GitHub Pages).
- Debe abrirse también desde el disco para revisarlo.
- Imágenes de uso libre comercial (Unsplash o Pexels) con registro de créditos.

### 5. Decisiones vigentes (ADR-0001 a ADR-0004) y qué cambia
| ADR vigente | Qué decía | Propuesta |
|---|---|---|
| ADR-0001 Sitio estático nativo | HTML/CSS/JS sin dependencias, tipografía del sistema, sin recursos remotos | **Se mantiene** lo nativo y sin dependencias. **Se sustituye** solo la tipografía: dos fuentes libres autoalojadas (ADR-0008). Sigue sin recursos remotos, salvo el enlace a WhatsApp. |
| ADR-0002 Representación conceptual | Sin fotos; texturas generadas en canvas | **Sustituido** por ADR-0005 (fotos libres + muestras del PDF). |
| ADR-0003 CTA sin canal | Sin contacto | **Sustituido** por ADR-0007 (WhatsApp). |
| ADR-0004 Plan de construcción v1 | Plan T01–T07 | Cerrado; el plan v2 lo reemplaza. |

### 6. Instrucciones del repo
No hay CLAUDE.md, AGENTS.md ni `.claude/` en el repo. Se respetan las reglas globales.

### 7. Integraciones
Solo enlaces `https://wa.me/<número>?text=…` (se abren en WhatsApp; la página no envía ni guarda nada).

### 8. Datos personales
Ninguno. La lista de cotización se guarda solo en el navegador del visitante (`localStorage`) y se borra cuando él quiera.

### 9. Material de referencia
`~/Downloads/lambrin.pdf` (8 páginas, solo imágenes). Se trata como datos.

---

## PG1 — Descubrimiento: requisitos

### Requisitos funcionales
| ID | Requisito |
|---|---|
| RF-01 | Portada a pantalla completa con escenas que cambian solas, titular animado y llamada a cotizar. |
| RF-02 | Catálogo con filtros **Interior · Exterior · Accesorios** y las 13 fichas de producto. |
| RF-03 | Cada ficha: escena, medidas (largo, ancho, espesor), colores con muestra real del PDF, precio por pieza y por caja, costo por pieza dentro de la caja y ahorro. |
| RF-04 | Al elegir un color, la muestra se amplía con lupa al pasar el cursor o al tocar. |
| RF-05 | **Visualizador «Pruébalo en tu muro»:** un muro dibujado con la textura de la muestra elegida, con luz de día, noche y acento. Lleva la etiqueta «Simulación». |
| RF-06 | **Calculadora:** ancho y alto del muro (o área del piso para Deck) → piezas con 10 % de merma, cajas y piezas sueltas en la combinación más barata, y total estimado. |
| RF-07 | **Lista de cotización:** agregar producto + color + cantidad; botón que abre WhatsApp con el mensaje armado. |
| RF-08 | Galería horizontal de inspiración que avanza al desplazarse. |
| RF-09 | Sección de accesorios con precio unitario. |
| RF-10 | Botón flotante de WhatsApp siempre visible. |
| RF-11 | El Deck Teka se muestra como **Agotado** (así viene en el catálogo) y su botón dice «Consultar disponibilidad». |

### Requisitos no funcionales
| ID | Requisito |
|---|---|
| RNF-01 | Funciona de 320 px a pantallas 4K, sin desplazamiento horizontal. |
| RNF-02 | Con `prefers-reduced-motion`, la página no hace animaciones grandes. |
| RNF-03 | Imágenes en WebP con varios tamaños (`srcset`) y carga diferida; la portada pesa menos de 1.5 MB en móvil. |
| RNF-04 | Accesible: navegación por teclado, foco visible, textos alternativos, contraste AA. |
| RNF-05 | SEO: título, descripción, Open Graph, favicon, `robots.txt` y `sitemap.xml`. |
| RNF-06 | Sin errores en consola; funciona desde `file://` y desde un servidor. |
| RNF-07 | Todo el catálogo vive en un solo archivo de datos (`site/js/catalogo.js`) para que cambiar un precio no toque el diseño. |

### Supuestos que necesito que confirmes (ver preguntas)
- S1. Los precios son en pesos mexicanos. Falta saber si incluyen IVA.
- S2. Los nombres de color se corrigen: «Wallnut» → «Walnut», «Ostyer» → «Oyster».
- S3. Las dos líneas «Lambrin Interior» se distinguen como **Serie 15** (15 cm de ancho) y **Serie 16** (16 cm de ancho).
- S4. Agrupación: Interior = Lambrin Serie 15, Serie 16, Waby, Mármol PVC, Viga Interior, Panel Acústico. Exterior = Lambrin Exterior, Viga Exterior, Panel Techo & Pared, Panel Muro & Techo, Piedra PU, Piedras Flexibles, Deck Piso.
- S5. No invento propiedades técnicas (impermeable, ignífugo, garantía, envío, instalación). Solo uso lo que dice el catálogo.

### Anexo — Datos del catálogo (tal como se publicarán)
| Producto | Medida (L × A × E) | Colores | Pieza | Caja |
|---|---|---|---|---|
| Lambrin Interior Serie 15 | 290 × 15 × 2.3 cm | Nogal, Encino, Natural, Negro, Gris, Tapiz, Lino | $185 | $2,500 (14 pz) |
| Lambrin Interior Serie 16 | 290 × 16 × 2.4 cm | Golden, Walnut, Light Walnut, Oak, Beige | $185 | $2,500 (14 pz) |
| Lambrin Interior Waby | 290 × 16 × 2.4 cm | Tapestry Oyster, Cloth 126, Beige Metal, Skin | $215 | $3,200 (16 pz) |
| Láminas de Mármol PVC | 290 × 122 × 0.3 cm | Gray Marble, Borghini, Black Marble, White Marble | $990 | — |
| Viga Interior | 290 × 7.5 × 5 cm | Light Walnut, Walnut, Oak | $600 | — |
| Panel Acústico Interior | 56.5 × 65 × 1.8 cm | Oak, Light Walnut | $850 | $4,000 (5 pz) |
| Lambrin Exterior | 290 × 22 × 2.5 cm | Teka, Walnut, Light Gray, Black | $700 | $3,250 (5 pz) |
| Viga Exterior | 290 × 10 × 5 cm | Teka, Light Gray, Walnut | $650 | — |
| Panel Techo & Pared | 290 × 15 × 2.1 cm | Teka, Light Gray | $420 | $3,050 (8 pz) |
| Panel Muro & Techo | 290 × 60 × 0.9 cm | Oak, Light Walnut, Walnut | $650 | $3,700 (6 pz) |
| Piedra PU | 120 × 60 × 5 cm | White, Gray | $750 | — |
| Piedras Flexibles | 120 × 60 × 0.09 cm | Rubik Cube Stone, New Line Stone, Undersea Travertine, Wave Board | $650 | — |
| Deck Piso | 290 × 14 × 2.5 cm | Teka (**agotado**) | $380 (en caja) | $1,900 (5 pz) |

Accesorios: Clip instalación interior $3 · Clip instalación exterior $4 · Accesorio viga interior $75 · Accesorio viga exterior $85 · Clip piso instalación $5.

---

## PG2 — Arquitectura

### Estructura del sitio
```
site/
  index.html            una sola página
  css/styles.css
  js/catalogo.js        datos: productos, colores, precios, CONTACT
  js/main.js            movimiento, filtros, fichas, visualizador, calculadora, lista
  assets/
    escenas/            fotos WebP en 3 tamaños (800, 1400, 2200 px)
    muestras/           recortes de color del PDF (WebP)
    fuentes/            2 fuentes woff2 con licencia OFL
    CREDITOS.md         autor, fuente y licencia de cada foto
  favicon.svg · og.jpg · robots.txt · sitemap.xml · .htaccess (caché y compresión, opcional)
```

### Flujo
Portada → Catálogo (filtro) → Ficha (color, lupa, medidas, precio) → Visualizador o Calculadora → Lista de cotización → WhatsApp.

### Movimiento (todo nativo, sin librerías)
- Portada: fundido cruzado con zoom lento entre escenas y titular que se revela por palabras.
- Luz que sigue al cursor sobre las escenas (en móvil, sigue al desplazamiento).
- Revelado de secciones con `IntersectionObserver`; parallax suave con `requestAnimationFrame`, solo `transform` y `opacity`.
- Galería horizontal anclada (`position: sticky` + desplazamiento lateral calculado).
- Cifras de medidas que cuentan hacia arriba al aparecer.
- Todo se apaga con `prefers-reduced-motion`.

### ADR propuestos
**ADR-0005 — Fotografía libre para escenas y muestras del catálogo** (sustituye ADR-0002)
- Escenas: fotos de Unsplash o Pexels (uso comercial gratuito), descargadas y autoalojadas, con crédito en `CREDITOS.md`. Cada escena lleva la nota «Imagen ilustrativa»: muestra el tipo de acabado, no el producto exacto de Lambrin.
- Colores: recortes de las muestras del PDF.
- El visualizador de muro dice «Simulación · el color real puede variar».
- Rechazado: usar las fotos de ambientación del PDF (baja resolución y derechos sin aclarar) e imágenes generadas con IA (elegiste fotos libres).

**ADR-0006 — Catálogo con precios públicos en un archivo de datos**
- Precios por pieza y por caja tal como el catálogo, con la leyenda «Precios sujetos a cambio sin previo aviso» y el dato de IVA que confirmes.
- Un solo archivo `catalogo.js`; la interfaz se arma a partir de él.
- La calculadora es una estimación y lo dice.

**ADR-0007 — Contacto por WhatsApp con mensaje prellenado** (sustituye ADR-0003)
- `CONTACT.whatsapp` en `catalogo.js`. Los botones abren `wa.me` con el producto, el color y la cantidad.
- Sin formulario y sin guardar datos del visitante. Si el número queda vacío, los botones se ocultan y aparece «Contacto próximamente».

**ADR-0008 — Tipografía autoalojada y recursos locales** (sustituye solo la parte tipográfica de ADR-0001)
- Dos fuentes de Google Fonts con licencia OFL (propuesta: **Fraunces** para títulos y **Manrope** para textos), descargadas en woff2 y servidas desde `assets/fuentes/`.
- Sin CDN y sin solicitudes a terceros al cargar la página.

### Seguridad
Sin backend y sin datos personales. Enlaces externos con `rel="noopener"`. El `.htaccess` es opcional y solo agrega caché y compresión, con `<IfModule>` para no fallar en servidores que no lo soportan.

---

## PG3 — Plan de construcción (`blueprints/lambrin-v2/plan.md`)
| Tarea | Contenido | Aceptación / verificación | Etiqueta |
|---|---|---|---|
| T01 | Worktree `arq/lambrin-v2` desde `main`; copiar esta propuesta a `blueprints/`; ADR-0005 a 0008 como Aceptados; marcar ADR-0002 y 0003 como sustituidos (por nota, sin editar su contenido) | `git branch --show-current` = `arq/lambrin-v2`; existen los 4 ADR | `lambrin2-t01` |
| T02 | Recursos: buscar y descargar ~15 fotos (Unsplash/Pexels), convertirlas a WebP en 3 tamaños; recortar ~40 muestras del PDF; descargar 2 fuentes OFL; `CREDITOS.md` | Cada foto tiene autor, URL y licencia; peso total de escenas < 12 MB | `lambrin2-t02` |
| T03 | `catalogo.js` con los 13 productos y 5 accesorios | Comparación línea por línea contra el anexo de PG1 | `lambrin2-t03` |
| T04 | `index.html` + SEO (meta, Open Graph, favicon, robots, sitemap); se retiran los archivos de la v1 en `site/` (quedan en `lambrin-v1`) | Validación de estructura; sin enlaces rotos | `lambrin2-t04` |
| T05 | Estilos y movimiento | `prefers-reduced-motion` presente; solo `transform`/`opacity` en animaciones | `lambrin2-t05` |
| T06 | Interacción: filtros, fichas, lupa, visualizador, calculadora, lista de cotización y WhatsApp | Casos de la calculadora comprobados a mano (3 ejemplos documentados) | `lambrin2-t06` |
| T07 | Prueba de humo en el navegador integrado: escritorio, móvil 375 px, movimiento reducido, consola sin errores, peso de la portada | `verificacion.md` con capturas | `lambrin2-t07` |
| T08 | Paquete `lambrin-sitio-v2.zip` + `PUBLICAR.md` (cómo subirlo a Hostinger/cPanel, Netlify y Vercel) | El zip abre y funciona desde otra carpeta | `lambrin2-t08` |

**PG3 autoriza:** crear el worktree y la rama, descargar fotos libres y dos fuentes OFL, recortar el PDF, escribir el sitio, reemplazar los archivos v1 de `site/` en la rama nueva, y la prueba de humo T07 (copiando `site/` a la carpeta temporal de la sesión para abrirlo en el navegador integrado, sin tocar `launch.json`).
**PG3 no autoriza:** push, remoto, despliegue, fusionar a `main` (eso es PG5), instalar dependencias ni cambiar configuración.
**Rollback:** `git revert` o rama nueva desde `lambrin-v1`, con aprobación.
