# 05 — Seguridad y privacidad (v2)
Estado: Vigente (v2) — PG0–PG3 2026-10-28, PG4 2026-10-29; pendiente PG5

| Riesgo | Mitigación |
|---|---|
| Confundir escenas de stock con el producto | Nota «Imagen ilustrativa» en portada y fichas; aviso en el pie; «Simulación» en el visualizador. |
| Precio desactualizado o mal entendido | Leyenda «Precios en MXN, sujetos a cambio sin previo aviso»; calculadora marcada como estimación. |
| Vender un color agotado | Deck Teka marcado «Agotado» y nota en el mensaje de WhatsApp. |
| Datos personales | Sin formularios ni cookies; la lista vive solo en el navegador del visitante y puede vaciarse. |
| Inyección de HTML | Todo texto de datos pasa por `esc()` antes de insertarse; el mensaje de WhatsApp va codificado con `encodeURIComponent`. |
| Enlaces externos | `rel="noopener"` y `target="_blank"`. |
| Licencias | Unsplash (uso comercial) y SIL OFL 1.1; créditos visibles. |

- Secretos: ninguno. Autenticación: no aplica.
- CSP: se recomienda agregarla en el hosting al publicar (`default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'`), porque el código usa estilos en línea para variables y fondos.
- `.htaccess`: `Options -Indexes`, compresión y caché, todo dentro de `<IfModule>`.
