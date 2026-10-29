# 02 — Diagramas
Estado: Vigente — aprobado en PG2, construido en F4 (PG4, 2026-10-28)

## C4 · Contexto
```mermaid
flowchart LR
  V[Visitante o asesor] -->|abre desde disco o servidor estático futuro| L[Landing Lambrin]
  L -. sin conexión .-> X[(Ningún servicio externo)]
```

## C4 · Contenedores
Un solo contenedor: archivos estáticos en `site/`. No hay servidor, base de datos ni terceros.
```mermaid
flowchart TB
  subgraph site/
    H[index.html · estructura y textos]
    C[styles.css · diseño, capas de luz, responsive, movimiento reducido]
    J[main.js · datos, estado e interacción]
  end
  H --> C
  H --> J
```

## C4 · Componentes de `main.js`
```mermaid
flowchart TB
  D[FINISHES · seis vistas] --> T[Generador de texturas · canvas, una vez por acabado, en caché]
  D --> R[Render de escena · variables CSS y clases]
  I[INSPIRATIONS · ideas por espacio] --> S
  K[CONTACT · canal = null] --> CTA[Bloque CTA]
  S[Estado · acabado, día/noche, acento] --> R
  S --> A[Anunciador aria-live]
  S --> HS[Hash de URL]
  S --> CTA
  U1[Radiogroup · mouse, teclado, táctil] --> S
  U2[Apagadores role=switch] --> S
  U3[Deslizar sobre la escena] --> S
  U4[Botones «Ver en la escena»] --> S
  HS -->|al cargar| S
  T --> R
```

## Capas de la escena (de atrás hacia adelante)
```mermaid
flowchart LR
  a[Muro: color base] --> b[Textura conceptual] --> c[Luz ambiente día/noche] --> d[Luz de ventana con sombra de cancel] --> e[Cono de la lámpara] --> f[Baño rasante de acento] --> g[Viñeta y grano de película] --> h[Apagadores y aviso]
```
La geometría (posición del muro, la ventana, la lámpara y los apagadores) es fija para todos los acabados; solo cambian color, textura y respuesta a la luz.
