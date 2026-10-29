# ADR-0002: Representación conceptual de acabados con capas de luz y texturas generadas
- Estado: Sustituido por ADR-0005 (2026-10-28)
- Fecha: 2026-10-28 · Aprobó: usuario (cafe@orvin.lat), en el chat · Compuerta: PG2

## Contexto
No hay fotografías aprobadas del proveedor (S3). Aun así, la escena debe transmitir escala, luz y carácter del acabado, y la iluminación debe cambiar claramente la lectura de la superficie. Ningún recurso visual puede presentarse como fotografía o textura verificada.

## Decisión
- **Escena por capas** (ver `02-diagramas.md`): muro, textura, luz ambiente, luz de ventana con sombra de cancel, cono de la lámpara, baño rasante de acento y viñeta. Las capas de luz usan gradientes y modos de mezcla; se animan solo con `opacity` y `transform`.
- **Texturas conceptuales generadas con Canvas 2D** al cargar o al elegir un acabado por primera vez, con semilla fija (el mismo resultado siempre) y en caché. Tres patrones: `veta`, `mineral` y `tejido`.
- **La luz revela la textura:** el contraste de la textura sube bajo luz rasante (lámpara y acento) y baja con luz difusa de día.
- **Encuadre fijo** para los seis acabados; cada acabado tiene sus propios parámetros de luz (`03-modelo-datos.md`).
- **Sin juntas ni modulación**, porque el formato de pieza no está verificado.
- **Avisos visibles:** «Escena conceptual · color y textura simulados» junto a la escena, y aviso completo en el pie.
- La documentación y el código nombran esto «representación conceptual», nunca «textura real» ni «fotografía».

## Alternativas rechazadas
- **Fotografías o texturas de stock:** se confundirían con el producto real.
- **Imágenes generadas con IA:** mismo riesgo y está prohibido por la solicitud.
- **WebGL o 3D:** más riesgo técnico y de rendimiento sin mejorar la veracidad; en la práctica requeriría librerías.
- **Solo color plano:** no permite apreciar cómo la luz cambia la lectura de la superficie.

## Consecuencias (+ / −)
- (+) Escena atractiva y ligera, sin archivos de imagen.
- (+) Intercambiar después por fotografía es acotado: se sustituye la capa de textura por acabado.
- (−) Ni el color ni la textura representan el producto; el aviso es obligatorio.
- (−) Generar texturas en canvas cuesta algo de CPU en móviles de gama baja (mitigado con caché y tamaño de mosaico acotado).

## Se revertiría si
Se entregan fotografías aprobadas por acabado. Requiere ADR nuevo que lo sustituya.

## Referencias
`01-requisitos.md` (CA-001, CA-003, CA-009, CA-019), `02-diagramas.md`, `03-modelo-datos.md`.
