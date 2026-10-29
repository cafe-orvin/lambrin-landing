# Lambrin — Landing conceptual

Landing estática de Lambrin, marca de acabados arquitectónicos para muros. Muestra seis acabados (Nogal, Encino, Natural, Negro, Gris y Lino) en una escena de muro con luz de día, de noche y de acento.

## Cómo abrirla
Abre `site/index.html` con doble clic. No requiere servidor, instalación ni conexión a internet.

## Aviso importante
Las escenas son **representaciones conceptuales**: el color y la textura se generan en el navegador y no son fotografías ni texturas verificadas del producto. La página no incluye precios ni especificaciones.

## Datos pendientes
| Dato | Situación actual |
|---|---|
| Canal de contacto | Pendiente. La llamada a la acción lo indica y no envía nada (`CONTACT.channel = null` en `site/main.js`). |
| Fotografías aprobadas por acabado | No disponibles. |
| Logotipo e identidad | No disponibles; el nombre se muestra en texto. |
| Catálogo (precios, especificaciones, formato) | No disponible; no se muestra ningún dato comercial. |
| Dominio y hosting | Fuera de alcance. |

Cualquier cambio en esos puntos requiere aprobación y, cuando aplique, un ADR nuevo.

## Estructura
- `site/`: `index.html`, `styles.css`, `main.js` (HTML, CSS y JavaScript nativos, sin dependencias; ADR-0001).
- `blueprints/`: admisión, descubrimiento, arquitectura, ADR y plan de construcción.
