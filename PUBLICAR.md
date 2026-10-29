# Cómo publicar la landing Lambrin v2

El sitio es estático: una carpeta con `index.html`, `css/`, `js/` y `assets/`. No necesita base de datos, PHP ni instalación. Funciona en cualquier hosting.

El paquete `lambrin-sitio-v2.zip` trae el contenido de `site/` listo para subir, con `index.html` en la raíz.

## 1. Antes de subir (5 minutos)

| Qué | Dónde | Cómo |
|---|---|---|
| **Número de WhatsApp** (obligatorio para recibir cotizaciones) | `js/catalogo.js`, línea `whatsapp: ""` | Escribe solo dígitos con código de país. México: `52` + 10 dígitos, por ejemplo `whatsapp: "528112345678"`. Mientras esté vacío, los botones dicen «Contacto próximamente». |
| **Dominio** | `robots.txt` y `sitemap.xml` | Reemplaza `TU-DOMINIO` por tu dominio, por ejemplo `lambrin.mx`. |
| Imagen para redes (recomendado) | `index.html`, línea `og:image` | Cambia `assets/og.jpg` por la dirección completa: `https://lambrin.mx/assets/og.jpg`. Así WhatsApp y Facebook muestran la vista previa. |
| Precios o colores | `js/catalogo.js` | Cada producto tiene `precio.pieza`, `precio.caja` y su lista de `colores`. No hace falta tocar nada más. |

Puedes editar estos archivos con cualquier editor de texto (TextEdit en modo texto plano, Bloc de notas o VS Code).

## 2. Subir el sitio

### Hostinger, cPanel o cualquier hosting con administrador de archivos
1. Entra al administrador de archivos y abre `public_html` (o la carpeta raíz de tu dominio).
2. Sube `lambrin-sitio-v2.zip` y usa **Extraer**.
3. Verifica que `index.html` quede directamente dentro de `public_html`, no en una subcarpeta.
4. Activa el certificado SSL gratuito (HTTPS) desde el panel.
5. El archivo `.htaccess` ya incluido activa compresión y caché en servidores Apache. Si tu panel oculta los archivos que empiezan con punto, no pasa nada: el sitio funciona igual sin él.

### Netlify (gratis, sin servidor propio)
1. Descomprime el zip en tu computadora.
2. Entra a `app.netlify.com/drop` y arrastra la carpeta descomprimida.
3. En **Domain management**, agrega tu dominio y sigue las instrucciones de DNS. Netlify activa HTTPS solo.

### Vercel o GitHub Pages
- **Vercel:** crea un proyecto nuevo desde un repositorio de GitHub que contenga estos archivos en la raíz, sin configuración de compilación.
- **GitHub Pages:** sube los archivos a un repositorio, activa Pages en *Settings → Pages* con la rama principal y carpeta raíz, y agrega tu dominio en *Custom domain*.

## 3. Conectar el dominio
En el lugar donde compraste el dominio, apunta los DNS al hosting:
- **Hosting tradicional:** usa los *nameservers* que te da el hosting.
- **Netlify o Vercel:** un registro `A` o `CNAME` según te indiquen.

La propagación tarda de minutos a 48 horas.

## 4. Revisión después de publicar
- [ ] La página abre con `https://` y candado.
- [ ] Las fotos y las fuentes cargan (si ves letras genéricas, revisa que la carpeta `assets/fuentes/` se haya subido).
- [ ] El botón verde de WhatsApp abre el chat con el mensaje de la cotización.
- [ ] En el celular no hay desplazamiento lateral.
- [ ] Al compartir el enlace por WhatsApp aparece la vista previa con imagen.

## Avisos legales que ya incluye la página
- Precios en MXN, sujetos a cambio sin previo aviso.
- Las escenas son imágenes ilustrativas (fotos de Unsplash con licencia de uso comercial; créditos en el pie y en `assets/CREDITOS.md`).
- El visualizador es una simulación y la calculadora es una estimación.

## Demo para el prospecto (`/demo/`)
La copia con el botón «Cotiza tu landing page» se arma con `sh demo/armar.sh <carpeta>` y se publica en la carpeta `demo/` de la rama `gh-pages` (ADR-0010). Los precios se cambian en `COTIZACION`, dentro de `demo/demo.js`. Cuando Lambrin decida, se borra esa carpeta de `gh-pages`.
