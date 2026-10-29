# ADR-0008: Tipografía autoalojada y recursos locales
- Estado: Aceptado
- Fecha: 2026-10-28 · Aprobó: usuario (cafe@orvin.lat), en el chat («lo necesario», respuesta a PG0–PG3) · Compuerta: PG2
- Sustituye: la parte tipográfica de ADR-0001 (lo demás de ADR-0001 sigue vigente)

## Contexto
La v2 necesita una identidad visual más cuidada. ADR-0001 usaba fuentes del sistema y prohibía recursos remotos.

## Decisión
- Dos fuentes con licencia SIL OFL, descargadas en woff2 y servidas desde `site/assets/fuentes/`: Fraunces (títulos) y Manrope (textos).
- Sin CDN ni solicitudes a terceros al cargar. El único enlace externo es `wa.me`, que solo se abre si el visitante hace clic.
- Sigue sin librerías y sin compilación; JS clásico para que funcione desde `file://`.

## Alternativas rechazadas
- Cargar Google Fonts en línea: solicitud a terceros en cada visita.
- GSAP u otras librerías de animación: dependencia nueva sin necesidad; el movimiento se logra con APIs nativas.

## Consecuencias (+ / −)
- (+) Identidad consistente en todos los sistemas.
- (−) ~150 KB extra de fuentes, con `font-display: swap`.

## Se revertiría si
Se aprueba una identidad con otras fuentes.

## Referencias
ADR-0001, `propuesta.md` (PG2).
