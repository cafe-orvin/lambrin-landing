# ADR-0007: Contacto por WhatsApp con mensaje prellenado
- Estado: Aceptado
- Fecha: 2026-10-28 · Aprobó: usuario (cafe@orvin.lat), en el chat («lo necesario», respuesta a PG0–PG3) · Compuerta: PG2
- Sustituye: ADR-0003

## Contexto
El usuario eligió WhatsApp como canal. El número se entregará después.

## Decisión
- `CONTACT.whatsapp` en `site/js/catalogo.js` (solo dígitos con código de país).
- Los botones abren `https://wa.me/<número>?text=…` con producto, color y cantidad; la lista de cotización arma un solo mensaje.
- Sin formulario y sin guardar datos del visitante. La lista vive solo en el `localStorage` de su navegador.
- Mientras el número esté vacío, los botones muestran «Contacto próximamente» y no abren nada.

## Alternativas rechazadas
- Formulario con correo: requiere backend o servicio externo.
- Usar un número de SC360 u Orvin: mezcla proyectos.

## Consecuencias (+ / −)
- (+) El asesor recibe pedidos claros y listos para cotizar.
- (−) Hasta llenar el número, la página no genera contactos.

## Se revertiría si
Se aprueba otro canal (formulario, correo, CRM). Requiere ADR nuevo.

## Referencias
`propuesta.md` (RF-07, RF-10).
