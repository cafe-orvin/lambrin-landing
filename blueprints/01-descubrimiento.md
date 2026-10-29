# F1 — Descubrimiento: Landing Lambrin
Fecha: 2026-10-28 · Estado: listo para PG1 · Modo: manual · PG0: aprobado (ver `00-inicio.md`)

## 1. Contexto y objetivo
Lambrin es una marca de acabados arquitectónicos para muros. Se necesita una landing completa, cinematográfica y sobria, en la que el muro y su acabado sean protagonistas. La página debe permitir comparar seis acabados bajo luz de día, de noche y de acento sin afirmar nada del producto que no esté verificado.

Único dato de marca disponible: el nombre «Lambrin» y su giro (acabados arquitectónicos para muros), tomados de la solicitud del usuario.

## 2. Actores
- **Visitante:** cliente final, arquitecto o diseñador que evalúa acabados para un proyecto.
- **Asesor comercial:** usa la página como apoyo visual en una presentación.

## 3. Requisitos funcionales
| ID | Requisito | Criterio de aceptación (se detalla en F2/F3) |
|---|---|---|
| RF-01 | Presentación principal: escena de muro a gran escala con luz natural de ventana y una lámpara discreta. | El muro ocupa la mayor parte del encuadre; no hay muebles ni decoración que compitan con él. |
| RF-02 | Selector de seis acabados: Nogal, Encino, Natural, Negro, Gris y Lino. | Los seis nombres, en ese orden, son seleccionables y uno siempre está activo. |
| RF-03 | Cada acabado tiene su propia vista de escena con encuadre coherente entre todos. | Al cambiar de acabado cambian la representación del muro y sus parámetros de escena; el encuadre se mantiene para poder comparar. |
| RF-04 | Control día/noche como apagador discreto integrado en el muro. | Cambia de forma clara la atmósfera y la lectura de la superficie; el estado es visible y se anuncia. |
| RF-05 | Control de luz de acento como segundo apagador discreto. | Cambia de forma perceptible la iluminación del muro, de día y de noche; el estado es visible y se anuncia. |
| RF-06 | Sección breve de valor del producto. | Texto corto, sin cifras, materiales, medidas, certificaciones ni beneficios técnicos no verificados. |
| RF-07 | Sección concisa de inspiración para proyectos. | Presenta ideas de uso por tipo de espacio como sugerencias; no menciona clientes, proyectos realizados ni testimonios. |
| RF-08 | Llamada a la acción final. | Usa solo un canal real configurado. Sin canal: muestra de forma útil el bloque y señala el dato faltante, sin formulario ni envío simulado. |
| RF-09 | Nota discreta de representación simulada. | Visible cerca de la escena y al pie: representación, color y textura son simulados. |
| RF-10 | Datos comerciales referenciales. | Si aparece precio o especificación, se identifica como referencial y pendiente de validar con el catálogo. En esta versión no aparece ninguno. |

## 4. Requisitos no funcionales
| ID | Requisito |
|---|---|
| RNF-01 | Operable con mouse, teclado y pantalla táctil (objetivos táctiles amplios, foco visible, orden de tabulación lógico). |
| RNF-02 | Adaptable a móvil y escritorio, sin desplazamiento horizontal. |
| RNF-03 | Estados accesibles: nombres accesibles, estado de apagadores y acabado activo expuestos a lectores de pantalla, contraste suficiente. |
| RNF-04 | Respeta `prefers-reduced-motion`: sin transiciones largas ni movimiento de cámara cuando está activo. |
| RNF-05 | Español natural para México; textos breves y concretos. |
| RNF-06 | Calidad visual premium sin efectos ostentosos: paleta contenida, tipografía limpia, mucho espacio. |
| RNF-07 | Sin frameworks, dependencias, integraciones ni servicios nuevos no aprobados. |

## 5. No-objetivos
Tienda, carrito, pagos, cotizador, formularios, captura de datos, analítica, despliegue, dominio, intercambio de texturas fotográficas, testimonios, clientes, proyectos realizados, precios, medidas, materiales, especificaciones, disponibilidad, certificaciones y datos del proveedor.

## 6. Inventario funcional (referencias, sin Git)
| Funcionalidad en la referencia | Archivo | Tratamiento propuesto |
|---|---|---|
| Escena CSS: muro, retornos laterales, piso, ventana, haz de día, haz de acento, lámpara de muro, zoclo | Demo 2 | Base conceptual; se rehace con mayor escala del muro y vista propia por acabado. |
| Seis acabados con color de muro, luz y sombra | Demo 2 | Se reutilizan los nombres. Los tonos son conceptuales y se revisan en F2. |
| Apagadores `role="switch"` para día/noche y acento | Demo 2 | Se conserva el patrón; se corrige que la etiqueta accesible del día cambie junto con su estado. |
| Anuncio `aria-live` de la selección | Demo 2 | Se conserva. |
| Nota de representación conceptual y de catálogo | Demo 2 | Se conserva y se refuerza. |
| Modal de cotización simulado | Demo 1 | No se reutiliza (simula un envío). |
| Textos «Lambrin Estudio», «Colección esencial», «Línea natural / 2026» | Demo 2 | **No se reutilizan:** son nombres de colección y de marca no verificados. |
| Descripciones por acabado («Tono profundo y cálido», etc.) | Demo 2 | Solo como descripción del tono de la simulación, nunca como característica del producto. Se revisan en F2. |

No se reutiliza código de las demos sin pasar por el plan de F3; las referencias permanecen intactas.

## 7. Supuestos derivados de las decisiones sin respuesta en PG0
Se confirman o corrigen al aprobar PG1.
- **S1 (D1):** Lambrin se trata como proyecto independiente de SC360; no se usa identidad, datos ni textos de Construcciones 360.
- **S2 (D3):** no hay adjuntos adicionales. La «captura» corresponde a una de las demos de referencia; de ella solo se toma la dirección visual, sin su botón «Borrar» ni sus limitaciones gráficas.
- **S3 (D4):** no hay fotografías aprobadas del proveedor. La landing es conceptual, sin imágenes fotográficas, y lleva nota de simulación.
- **S4 (D5):** no hay canal de contacto. El CTA final señala «Canal de contacto pendiente de confirmar» y no tiene acción de envío.
- **S5 (D6):** las aprobaciones registradas por Codex no se heredan; sus demos son solo referencia.

## 8. Temas que se resuelven en F2 (no bloquean PG1)
- Tecnología de entrega (p. ej. HTML, CSS y JS nativos en un archivo o en pocos archivos estáticos) y su ADR.
- Tipografía: fuentes del sistema o fuentes externas (una fuente externa sería una dependencia que requiere aprobación).
- Técnica de representación de cada acabado y de la iluminación.
- Copia final de las secciones de valor e inspiración.

## 9. Pendientes de aclaración
Ninguno. Los supuestos S1–S5 quedaron aprobados con PG1.

## PG1
Estado: **aprobado por el usuario en el chat el 2026-10-28** («Aprobar PG1», opción que incluye los supuestos S1–S5). Autoriza iniciar F2 (arquitectura); no autoriza construir.
