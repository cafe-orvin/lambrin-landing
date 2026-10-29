# ADR-0004: Plan de construcción en seis tareas con verificación estática
- Estado: Aceptado
- Fecha: 2026-10-28 · Aprobó: usuario (cafe@orvin.lat), en el chat · Compuerta: PG3

## Contexto
PG2 aprobó la arquitectura (ADR-0001 a ADR-0003). El protocolo exige un plan por pasos, con criterio de aceptación y verificación, y la lista de revisión firmada antes de construir. La prueba de humo no está autorizada.

## Decisión
- Construir según `blueprints/lambrin-landing/plan.md`: T01 a T06, una etiqueta `lambrin-tNN` por tarea, en la rama `arq/lambrin-landing` del repositorio local aprobado en PG0.
- Verificar solo de forma estática (lectura y `grep`). T07 (navegador) queda condicionada a una autorización explícita aparte.
- Lista de revisión manual completada en el plan (sección «Revisión del bundle»); se firma con este ADR al aprobar PG3.

## Alternativas rechazadas
- **Construir en `main`:** lo prohíben las reglas globales.
- **Usar el plugin the-architect:** solo después de G3/G4; se trabaja en modo manual.
- **Incluir la prueba de humo en PG3:** requiere autorización explícita y separada.

## Consecuencias (+ / −)
- (+) Cada tarea es reversible con `git revert` o con una rama desde la etiqueta anterior.
- (−) Sin T07, el comportamiento visual e interactivo queda sin comprobar.

## Se revertiría si
Cambia el alcance, el stack o aparece una dependencia; requiere ADR nuevo y volver a PG3.

## Referencias
`../../lambrin-landing/plan.md`, `ADR-0001`, `ADR-0002`, `ADR-0003`, `01-requisitos.md`.
