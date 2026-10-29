# 05 — Seguridad y privacidad
Estado: Vigente — aprobado en PG2, construido en F4 (PG4, 2026-10-28)

| Amenaza o riesgo | Mitigación |
|---|---|
| Afirmaciones falsas sobre el producto (riesgo comercial y legal) | Avisos de simulación (CA-009); prohibición de datos comerciales verificada por inspección (CA-010). |
| Envío simulado que haga creer al visitante que fue atendido | Sin formularios ni manejadores de envío (CA-008). |
| Carga de recursos de terceros o rastreo | Sin URL externas, fuentes web, `fetch` ni analítica (CA-017). |
| Inyección mediante el hash de la URL | El hash solo se compara contra los seis `id` permitidos; nunca se inserta como HTML. |
| Datos personales | No hay campos, cookies ni almacenamiento local (CA-018). |

- Secretos: ninguno.
- Autenticación y permisos: no aplican.
- Política de seguridad de contenido (CSP): se pospone al despliegue; en `file://` la fuente `'self'` se comporta distinto según el navegador y podría bloquear la propia página.
