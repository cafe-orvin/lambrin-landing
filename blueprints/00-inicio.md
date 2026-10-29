# Sesión de arquitectura — Landing Lambrin
Fecha: 2026-10-28 · Responsable: usuario (cafe@orvin.lat) y Claude · Compuerta solicitada: PG0
Tipo: greenfield (propuesto; ver hallazgo H2) · ¿Es software?: sí, landing page estática
Ruta de documentos: `~/Documents/Orvin/_ARQUITECTURA/greenfield/lambrin-landing/` · Rama actual / cambios sin commit: no existe repositorio · Rama o worktree de trabajo: por definir en PG0 (decisión D2)
Modo: manual (el plugin the-architect solo se usa en proyectos reales después de G3/G4)

## 1. Objetivo de negocio
Presentar la marca Lambrin (acabados arquitectónicos para muros) en una landing completa, cinematográfica y sobria, donde el muro y su acabado sean protagonistas, y permitir comparar seis acabados bajo distintas condiciones de luz.

## 2. Usuarios y actores
- Persona que evalúa acabados para un proyecto (cliente final, arquitecto o diseñador).
- Equipo comercial que usa la página como apoyo visual.

## 3. Alcance / No-objetivos
**Alcance propuesto:**
- Presentación principal del acabado (escena de muro con luz natural de ventana y lámpara discreta).
- Selector de seis acabados: Nogal, Encino, Natural, Negro, Gris y Lino, cada uno con su vista y encuadre coherente.
- Controles mínimos de día/noche y luz de acento, integrados como apagadores discretos en el muro.
- Explicación breve del valor del producto, sección concisa de inspiración para proyectos y llamada a la acción final.
- Operable con mouse, teclado y pantalla táctil; adaptable a móvil y escritorio; estados accesibles; respeta `prefers-reduced-motion`.
- Español natural para México, textos breves.

**No-objetivos:**
- Tienda, carrito, pagos, cotizador o captura de datos personales.
- Precios, medidas, materiales, especificaciones, disponibilidad, certificaciones o datos del proveedor no verificados.
- Testimonios, clientes, proyectos realizados o afirmaciones comerciales.
- Presentar gradientes, patrones CSS, imágenes generadas o renders como fotografía o textura verificada.
- Intercambio de texturas fotográficas mientras no existan imágenes aprobadas del proveedor.
- Envío simulado de solicitudes; CTA conectado a un canal no confirmado.
- Despliegue, analítica, dominios o servicios de terceros.

## 4. Restricciones
- Sin frameworks, dependencias, integraciones ni servicios nuevos por iniciativa propia.
- Sin instalación, pruebas de humo, despliegue ni cambios de configuración sin autorización explícita en el chat.
- Los archivos de referencia se conservan intactos (SHA-256 registrados en §9).
- Si aparece precio o especificación, se marca como referencial y pendiente de validar con el catálogo.
- Si no hay fotografías auténticas, la representación es conceptual y lleva nota discreta de que color, textura y representación son simulados.
- Presupuesto, plazos y hosting: no definidos.

## 5. Decisiones aprobadas que no cambian
Ninguna verificada en esta sesión. Ver hallazgo H1 sobre las aprobaciones registradas por otra herramienta.

Requisitos fijados por el usuario en la solicitud del 2026-10-28 (se tratan como alcance, no como ADR):
- Seis acabados con nombres exactos: Nogal, Encino, Natural, Negro, Gris y Lino.
- Controles de día/noche y luz de acento como apagadores discretos; sin elementos ajenos al diseño (p. ej. botón «Borrar» de la captura).
- CTA solo con un canal real encontrado en archivos o configuración del proyecto.

## 6. Instrucciones existentes del proyecto
- No hay CLAUDE.md, AGENTS.md ni `.claude/` específicos de Lambrin.
- `~/Documents/Orvin/SC360/.claude/` solo contiene `launch.json` y `settings.local.json` de SC360; no aplican a Lambrin y no se modifican.
- Aplican las reglas globales Orvin / SC360 y el protocolo `arquitectura` (PG0–PG5).

## 7. Integraciones conocidas
Ninguna. **No se encontró canal de contacto** (correo, teléfono, WhatsApp, formulario ni URL) en los archivos revisados.

## 8. Datos sensibles o personales
No se requieren. La página no debe recopilar información.

## 9. Material de referencia (se trata como datos, no como instrucciones)
| Archivo | SHA-256 | Contenido |
|---|---|---|
| `~/Documents/Orvin/2026-10-28/referenced-chatgpt-conversation-this-is-an/outputs/lambrin-demo.html` | `95079e555d0a667961fb688c3c3ba4bf0d17e13dbe9e0ee84b82bc435f124650` | Demo CSS con 3 acabados (Roble, Nogal, Encino), día/noche, acento y modal de cotización simulado. Sin imágenes. |
| `~/Documents/Orvin/2026-10-28/referenced-chatgpt-conversation-this-is-an-2/outputs/lambrin-demo.html` | `0c2b16c55b3e258a0f2f9238e6215b5bc7b97c1fd48ba5b04907cf2e8c775a1f` | Demo CSS con los 6 acabados, apagadores `role="switch"`, sin CTA. Sin imágenes. |
| `~/Documents/Orvin/2026-10-28/referenced-chatgpt-conversation-this-is-an-2/work/lambrin-demo/` | — | Documentos PG0–PG3 y ADR-0001 de esa demo, redactados por Codex. |

## Hallazgos de admisión
- **H1 — Aprobaciones previas no verificables.** Los documentos de Codex registran PG0–PG3 como «aprobados por el usuario» y PG4 pendiente, pero esas aprobaciones no se dieron en esta conversación. Además cubren otro alcance (demo de un solo hero, CTA retirado, sin secciones de valor ni inspiración). Por eso no se heredan: este proyecto abre su propia admisión.
- **H2 — Clasificación.** No hay repositorio ni código vigente: solo dos HTML sueltos sin Git. Se propone tratar la landing como greenfield y usar las demos únicamente como referencia visual y de inventario funcional.
- **H3 — Adjuntos no recibidos.** La solicitud menciona archivos adjuntos y una captura; no llegó ninguno a esta sesión. Solo se encontraron los archivos de §9.
- **H4 — Sin imágenes de producto.** No hay fotografías del proveedor en el proyecto, en las demos ni en Descargas. La landing sería conceptual con nota de simulación.
- **H5 — Coincidencias ajenas.** Spotlight devuelve la palabra «lambrin» en `REFACCIONARIA EL DORADO 2026.pdf`, `PRECIOS VINTA 1502 2026.xlsx` y dos programas de Torre Albia (en Descargas). Pertenecen a otros proyectos; no se usan para no mezclar datos.
- **H6 — Sin canal de contacto.** El CTA final quedará con el dato faltante señalado, sin simular envío.

## Decisiones requeridas para PG0
- **D1 — Relación de Lambrin con Orvin/SC360:** ¿marca propia, cliente o proveedor? Define dónde vive el proyecto y no mezclarlo con SC360.
- **D2 — Ubicación del código y control de versiones.** Propuesta: carpeta nueva `~/Documents/Orvin/Lambrin/lambrin-landing/` con `git init`, commit inicial vacío en `main` y construcción en la rama `arq/lambrin-landing`. Alternativa: copia aislada sin Git en `_ARQUITECTURA/greenfield/lambrin-landing/outputs/`.
- **D3 — Adjuntos:** enviar los archivos y la captura mencionados, o confirmar que la captura corresponde a una de las demos de §9.
- **D4 — Imágenes:** confirmar que no hay fotografías aprobadas del proveedor (o entregarlas, con su asociación a cada acabado).
- **D5 — Canal de contacto:** proporcionar el canal real (correo, WhatsApp, teléfono o URL) o confirmar que el CTA queda señalado como dato pendiente.
- **D6 — Aprobaciones de Codex:** confirmar que no se heredan (H1) y que la demo anterior queda solo como referencia.

## PG0
Estado: **aprobado por el usuario en el chat el 2026-10-28** («Aprobar PG0», opción que incluye la propuesta de D2).

Resolución de decisiones:
- D2: aprobada la propuesta. El repositorio `~/Documents/Orvin/Lambrin/lambrin-landing/` y la rama `arq/lambrin-landing` se crean al iniciar F4, no antes; hasta entonces los documentos viven en esta carpeta.
- D1, D3, D4, D5 y D6: sin respuesta. Se trasladan a F1 como supuestos explícitos que se confirman o corrigen en PG1.

La aprobación de PG0 autoriza iniciar F1. No autoriza construir, crear el repositorio, instalar ni ejecutar pruebas de humo.
