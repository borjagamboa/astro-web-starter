# Recetas de página

Estas recetas son marcos de decisión, no plantillas cerradas. Antes de componer una página, define la intención de la visita, el contenido disponible, la evidencia real y la acción comercial prioritaria. Omite cualquier bloque que no tenga contenido útil: una página más corta y específica es preferible a una secuencia rellena.

Las recetas orientan composición y estructura narrativa; no proporcionan copy final. El texto `REVIEWED` o `FINAL` procede del content map del proyecto y no debe inferirse, completarse ni reescribirse para encajar en una receta visual.

## Home

- **Objetivo:** explicar con rapidez qué ofrece el negocio, para quién y cuál es el siguiente paso.
- **Patterns adecuados:** `Hero`, prueba o contexto con `Stats` o `Testimonial`, `FeatureGrid`, uno o dos `SplitContent`, `FAQ` selectiva y `ActionPanel` o `ContactBlock`.
- **Variaciones:** Hero con o sin media; evidencia antes o después de la oferta; grid de 3, 4 o 6 elementos; cierre de contacto directo o CTA breve.
- **Evitar:** repetir la misma información en Hero, cards y CTA; convertir cada sección en una caja; mostrar métricas o testimonios sin fuente.
- **Omitir cuando:** no hay evidencia validada, preguntas frecuentes reales o suficiente contenido para un bloque independiente.

## About

- **Objetivo:** generar confianza mediante historia, criterio, equipo o forma de trabajar.
- **Patterns adecuados:** Hero editorial, `Prose`, `SplitContent`, valores en `FeatureGrid`, hitos verificables en `Stats`, testimonios y cierre contextual.
- **Variaciones:** relato cronológico, manifiesto, perfil del equipo o explicación del método; imagen al inicio, intercalada o ausente.
- **Evitar:** una sucesión de biografías idénticas, cifras decorativas o valores genéricos sin ejemplos.
- **Omitir cuando:** el equipo no debe ser público, no existen hitos comprobables o el relato cabe mejor en la Home.

## Índice de servicios

- **Objetivo:** ayudar a comparar y elegir entre varias líneas de servicio.
- **Patterns adecuados:** Hero compacto, `FeatureGrid` o `CardGrid`, criterios de elección, proceso con índices, `FAQ` y CTA.
- **Variaciones:** agrupar por audiencia, problema, resultado o categoría; usar cards con enlace, visual o solo texto.
- **Evitar:** cards con textos de longitud artificialmente idéntica, taxonomías solapadas o enlaces sin destino útil.
- **Omitir cuando:** solo existe un servicio; en ese caso, enlaza directamente a su detalle.

## Detalle de servicio

- **Objetivo:** explicar alcance, valor, proceso, límites y conversión de una oferta concreta.
- **Patterns adecuados:** Hero orientado al resultado, `SplitContent`, pasos en `FeatureGrid`, entregables, evidencia real, `FAQ` y `ContactBlock`.
- **Variaciones:** comenzar por problema, resultado, método o caso; alternar superficies según densidad; CTA de consulta, presupuesto o compra según el negocio.
- **Evitar:** duplicar la página índice, prometer resultados no demostrables o esconder exclusiones importantes.
- **Omitir cuando:** no hay contenido diferencial frente a otra oferta; consolida páginas antes de repetirlas.

## Contacto

- **Objetivo:** reducir fricción y aclarar qué ocurrirá tras contactar.
- **Patterns adecuados:** Hero mínimo o `HeadingGroup`, `ContactBlock`, métodos de contacto, ubicación solo si aporta valor, `FAQ` operativa y slot de formulario cuando exista integración.
- **Variaciones:** contacto directo, formulario, reserva o combinación; una o dos columnas según métodos disponibles.
- **Evitar:** datos ficticios, formularios sin destino, pedir más datos de los necesarios o incluir mapas por costumbre.
- **Omitir cuando:** teléfono, email, ubicación o formulario no estén configurados o autorizados.

## Landing genérica

- **Objetivo:** conducir una audiencia concreta hacia una única acción medible.
- **Patterns adecuados:** Hero enfocado, beneficios en `FeatureGrid`, prueba con `Stats` o testimonios, explicación breve, objeciones en `FAQ` y CTA final.
- **Variaciones:** larga o corta según consciencia del público; CTA repetida con moderación; evidencia temprana o tardía; comparativa editorial si ayuda a decidir.
- **Evitar:** navegación y bifurcaciones innecesarias, múltiples CTAs con igual peso o urgencia artificial.
- **Omitir cuando:** un bloque no responde a una objeción, no añade evidencia o no acerca a la acción principal.

## Artículo o contenido

- **Objetivo:** permitir una lectura clara, útil y encontrable.
- **Patterns adecuados:** cabecera editorial, `Prose`, media con pie, tabla básica, cita, contenidos relacionados en `CardGrid` y CTA contextual discreta.
- **Variaciones:** medida estrecha para lectura larga; medida amplia si predominan tablas; índice solo en piezas extensas; CTA en línea o al final.
- **Evitar:** grids dentro del cuerpo sin necesidad, ancho completo para párrafos largos o llamadas comerciales que interrumpan cada sección.
- **Omitir cuando:** tabla, cita, imagen o contenido relacionado no aporten información nueva.

## Reglas anti-clonación

No reutilices una secuencia fija entre proyectos. Decide la composición a partir del negocio, el inventario de contenido, la identidad, la prioridad comercial y las referencias visuales aprobadas.

- Varía el tipo, tamaño, alineación y presencia de media del Hero.
- Cambia el orden narrativo: problema, propuesta, evidencia, proceso y CTA no tienen una secuencia universal.
- Ajusta cantidad, densidad y tratamiento de cards al contenido real; no rellenes grids para completar filas.
- Alterna superficies solo cuando marque un cambio de tema o ritmo, no por patrón mecánico.
- Usa `SplitContent` de forma selectiva y cambia su orden; evita el zigzag automático.
- Elige un cierre coherente con la conversión: enlace, contacto directo, formulario, reserva o ningún CTA.
- Modula la densidad editorial, la medida de lectura y el espacio según el carácter de la marca.
- Conserva las referencias como dirección visual, no como estructura para copiar.

## Iconografía y visuales de cards

`Card` expone el slot `visual` para SVG inline, componentes o media específica. `FeatureGrid` acepta un asset SVG externo con dimensiones explícitas o un índice textual. En cada proyecto se debe diseñar, adaptar o seleccionar una familia de iconos coherente con su identidad; no se reutiliza indiscriminadamente una librería genérica.

Si el visual es decorativo y el título ya comunica su significado, usa texto alternativo vacío. Si transmite información que no aparece en el texto, usa directamente el slot de `Card` y aporta una alternativa accesible adecuada.

Los patterns no dependen de JavaScript para mostrar contenido. Reveal y futuras interacciones son mejoras independientes; la composición base debe seguir siendo legible sin ellas.
