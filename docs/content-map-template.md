# Content map

Este documento se copia como `docs/content-map.md` en cada web. Es la fuente humana para acordar la arquitectura editorial, la intención de cada sección y el copy aprobado. No describe coordenadas, CSS ni detalles de implementación.

Usa identificadores conceptuales y estables como `hero`, `intro`, `services`, `process` o `contact`. Si cambia la composición visual, conserva el identificador mientras la función editorial siga siendo la misma.

## Estados

- **PROVISIONAL:** texto de prototipado que ChatGPT o Codex pueden redactar y modificar. No puede presentar datos inventados como hechos.
- **REVIEWED:** texto revisado editorialmente. Codex debe copiarlo literalmente y no reescribirlo sin petición explícita.
- **FINAL:** texto aprobado. Codex debe tratarlo literalmente salvo que una instrucción autorice cambios concretos.

El estado se declara por sección. Si dentro de una sección conviven estados distintos, divide el bloque o indica el estado junto al campo afectado.

# [PAGE NAME]

- **Route:** `[route]`
- **Page purpose:** [Qué debe entender o hacer la persona visitante.]

## [section-id]

- **Order:** [Posición narrativa aproximada.]
- **Purpose:** [Función editorial de la sección.]
- **Status:** [PROVISIONAL | REVIEWED | FINAL]
- **Eyebrow / kicker:** [Texto exacto o “No aplica”.]
- **Heading:** [Texto exacto e indicación H1/H2/H3 cuando sea relevante.]
- **Body:** [Copy exacto, conservando párrafos y listas necesarios.]
- **Primary CTA:** [Label exacto + destino, o “No aplica”.]
- **Secondary CTA:** [Label exacto + destino, o “No aplica”.]
- **Editorial notes:** [Contexto, restricciones, datos pendientes o intención de tono.]
- **Composition notes:** [Relación conceptual: texto protagonista, media complementaria, lista, cierre, etc.]

Repite el bloque de sección en el orden editorial aprobado. Las notas de composición orientan la jerarquía y la relación entre contenidos; no prescriben columnas, píxeles ni selectores CSS.

## Ejemplo ficticio mínimo

### hero

- **Order:** 1
- **Purpose:** Presentar con claridad un proyecto cultural ficticio.
- **Status:** PROVISIONAL
- **Eyebrow / kicker:** Programación abierta
- **Heading:** H1 — Un lugar para descubrir ideas nuevas.
- **Body:** Consulta la programación y elige la actividad que encaje contigo.
- **Primary CTA:** Ver programación → `/programacion/`
- **Secondary CTA:** No aplica
- **Editorial notes:** Texto de muestra; no contiene fechas ni datos reales.
- **Composition notes:** El mensaje es protagonista y la imagen funciona como contexto.
