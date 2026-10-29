# 03 — Modelo de datos
Estado: Vigente — aprobado en PG2, construido en F4 (PG4, 2026-10-28)

No hay base de datos, persistencia ni datos personales. Todo es configuración estática en `main.js` y estado en memoria. Dueño de los datos: el proyecto Lambrin; los valores visuales son **conceptuales** y no provienen de un catálogo.

```mermaid
erDiagram
  FINISH ||--o{ INSPIRATION : "se sugiere en"
  STATE }o--|| FINISH : "muestra"
  FINISH {
    string id "nogal | encino | natural | negro | gris | lino"
    string nombre
    string tono "frase breve sobre la simulación, no sobre el producto"
    object paleta "base, luz, sombra"
    object textura "tipo, escala, contraste, semilla"
    object escena "ambienteDia, ambienteNoche, intensidadLampara, intensidadAcento, calidezLuz"
  }
  INSPIRATION {
    string espacio
    string texto
    string acabadoId
    string modo "dia | noche"
    bool acento
  }
  STATE {
    string acabadoId
    string modo
    bool acento
  }
  CONTACT {
    string channel "null mientras no exista un canal real"
  }
```

## Reglas
- `textura.tipo` toma uno de tres patrones conceptuales: `veta` (Nogal, Encino, Natural), `mineral` (Negro, Gris) y `tejido` (Lino). Es una interpretación visual del nombre, no una afirmación de material.
- Sin juntas ni modulación visibles: el formato de pieza no está verificado.
- `escena` ajusta cuánto se ilumina cada acabado para que los oscuros (Nogal, Negro) se lean igual de bien que los claros. No cambia la geometría.
- `CONTACT.channel` solo puede recibir un canal confirmado por el usuario; cambiarlo requiere aprobación (es una integración).
- El estado inicial es Nogal, día, sin acento, salvo que el hash indique otro acabado.
