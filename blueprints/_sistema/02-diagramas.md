# 02 — Diagramas (v2)
Estado: Vigente (v2) — PG0–PG3 2026-10-28, PG4 2026-10-29; PG5 2026-10-29

## C4 · Contexto
```mermaid
flowchart LR
  V[Visitante] -->|abre| L[Landing Lambrin · hosting estático]
  L -->|enlace al hacer clic| W[WhatsApp · wa.me]
  W --> A[Asesor de Lambrin]
```

## C4 · Contenedores
```mermaid
flowchart TB
  subgraph site/
    H[index.html · estructura, SEO, diálogos]
    C[css/styles.css · diseño, movimiento, responsive]
    D[js/catalogo.js · datos: productos, accesorios, CONTACT, galería, créditos]
    J[js/main.js · interacción y movimiento]
    AS[assets/ · escenas WebP, muestras JPG, fuentes woff2, og.jpg]
  end
  H --> C & D & J
  J --> D
  J --> AS
```

## Componentes de `main.js`
```mermaid
flowchart TB
  D[(LAMBRIN en catalogo.js)] --> G[Catálogo · tarjetas, filtros, rejilla de filas completas]
  D --> F[Ficha · lupa, medidas, precios, unidad y cantidad]
  D --> VZ[Visualizador · muro A/B, luces, orientación, comparación]
  D --> CA[Calculadora · superficie, piso, vigas; combinación más barata]
  D --> GA[Galería horizontal]
  D --> AC[Accesorios]
  G --> F
  GA --> F
  F --> Q[Lista de cotización · localStorage]
  VZ --> Q
  CA --> Q
  AC --> Q
  Q --> WA[Mensaje wa.me · ADR-0007]
  M[Movimiento · telón, portada, revelado, parallax, cursor, progreso] -.-> todo
```

## Flujo del visitante
Portada → Catálogo (filtro) → Ficha (color, lupa, precio) → Visualizador o Calculadora → Lista de cotización → WhatsApp.
