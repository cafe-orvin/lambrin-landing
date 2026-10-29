#!/bin/sh
# Arma la copia de demo para el prospecto (ADR-0010).
# Uso: sh demo/armar.sh <carpeta-destino>   (desde la raíz del repo)
# Copia site/ al destino, agrega demo.css y demo.js, y marca la página como noindex.
set -eu
dest="$1"
mkdir -p "$dest"
cp -R site/. "$dest/"
cp demo/demo.css "$dest/css/demo.css"
cp demo/demo.js "$dest/js/demo.js"
f="$dest/index.html"
sed -i '' \
  -e 's#<meta name="viewport"#<meta name="robots" content="noindex">\
  <meta name="viewport"#' \
  -e 's#<link rel="stylesheet" href="css/styles.css">#<link rel="stylesheet" href="css/styles.css">\
  <link rel="stylesheet" href="css/demo.css">#' \
  -e 's#<script src="js/main.js" defer></script>#<script src="js/main.js" defer></script>\
  <script src="js/demo.js" defer></script>#' \
  -e 's#<meta property="og:title" content="[^"]*">#<meta property="og:title" content="Lambrin · Demo de tu landing page">#' \
  -e 's#<meta property="og:url" content="\([^"]*\)">#<meta property="og:url" content="\1demo/">#' \
  "$f"
for t in 'name="robots"' 'css/demo.css' 'js/demo.js' 'Demo de tu landing page'; do
  grep -q "$t" "$f" || { echo "Falta en index.html: $t" >&2; exit 1; }
done
echo "Demo armado en $dest"
