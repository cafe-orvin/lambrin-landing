# ADR-0003: Llamada a la acción sin canal de contacto
- Estado: Aceptado
- Fecha: 2026-10-28 · Aprobó: usuario (cafe@orvin.lat), en el chat · Compuerta: PG2

## Contexto
No existe un canal de contacto en los archivos ni en la configuración (S4). La solicitud prohíbe simular el envío de una solicitud y pide conservar una presentación útil para la demo.

## Decisión
- El bloque final muestra título, el resumen de la selección actual (acabado, día/noche, acento) y el aviso «Canal de contacto pendiente de confirmar».
- No hay formulario, botón de envío ni enlace de contacto.
- Un único punto de configuración en `main.js`: `CONTACT = { channel: null }`. Mientras sea `null`, el bloque queda en modo pendiente.
- Llenar `CONTACT` con un canal real requiere confirmación del usuario y, si implica un servicio, un ADR nuevo.

## Alternativas rechazadas
- **Botón desactivado:** confuso y poco accesible.
- **Formulario con mensaje de «enviado»:** simula un envío; prohibido.
- **Usar un canal de SC360 u Orvin:** mezcla proyectos (S1).

## Consecuencias (+ / −)
- (+) Honesto con el visitante y útil para el asesor, que ve la combinación elegida.
- (−) La página no genera contactos hasta que se confirme el canal.

## Se revertiría si
El usuario confirma un canal real.

## Referencias
`01-requisitos.md` (CA-008), `03-modelo-datos.md`, `04-integraciones.md`.
