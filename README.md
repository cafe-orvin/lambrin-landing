# Lambrin — Landing del catálogo (v2)

Landing estática con el catálogo completo de Lambrin: 13 productos, 44 colores y 5 accesorios, con precios, medidas, escenas fotográficas, visualizador de muro, calculadora de piezas y lista de cotización por WhatsApp.

La v1 (landing conceptual sin fotos ni precios) se conserva en la etiqueta `lambrin-v1`.

## Cómo verla
- **Desde el disco:** abre `site/index.html` con doble clic.
- **Publicarla:** sigue [`PUBLICAR.md`](PUBLICAR.md). El paquete listo para subir es `lambrin-sitio-v2.zip` (contenido de `site/`; no se guarda en git).

## Qué editar
Todo el contenido comercial vive en `site/js/catalogo.js` (ADR-0006):
- `CONTACT.whatsapp`: número con código de país. Vacío = «Contacto próximamente» (ADR-0007).
- `productos[]`: nombre, medidas en cm, precio por pieza y por caja, colores (con su muestra en `assets/muestras/`), escena y modo del visualizador.
- `accesorios[]`, `portada[]`, `galeria[]` y `creditos[]`.

## Estructura
- `site/index.html`, `site/css/styles.css`, `site/js/main.js`: HTML, CSS y JavaScript nativos, sin dependencias ni compilación (ADR-0001).
- `site/assets/escenas/`: fotos de Unsplash en WebP (ADR-0005; créditos en `assets/CREDITOS.md`).
- `site/assets/muestras/`: muestras de color recortadas del catálogo.
- `site/assets/fuentes/`: Fraunces y Manrope, licencia OFL (ADR-0008).
- `blueprints/`: propuesta, ADR, plan y verificación.

## Datos pendientes
| Dato | Situación |
|---|---|
| Número de WhatsApp | Pendiente; se llena en `catalogo.js`. |
| Dominio | Pendiente; se llena en `robots.txt`, `sitemap.xml` y `og:image`. |
| Fotos propias de Lambrin | No disponibles; se usan imágenes ilustrativas. |
| IVA | No se menciona (decisión del usuario). |
