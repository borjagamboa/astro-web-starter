# Sistema de composición

El CORE separa tres niveles: los tokens definen decisiones visuales, los primitives resuelven fundamentos y los patterns establecen relaciones de composición. Las páginas seleccionan y ordenan esas piezas; no deben asumir que existe una plantilla universal.

## Patterns disponibles

- `SectionHeading` unifica eyebrow, título e introducción sin duplicar `HeadingGroup`.
- `Hero` ofrece estructuras `split`, `centered` e `immersive`. Medio, copy y decoración son capas independientes.
- `ContentSplit` relaciona texto y medio con posición, ratio y balance configurables.
- `Card` admite contenido, visual, medio, metadatos, enlace y pie optativos con tratamientos `plain`, `bordered` y `elevated`.
- `CardGrid` organiza contenido arbitrario en columnas fijas o mediante `auto-fit`.
- `ActionPanel` ofrece cierre `contained` o `band` y un slot visual opcional.
- `FAQ` representa preguntas y respuestas con `details`/`summary` nativos, título interno optativo e IDs estables por item.
- `Testimonial` cubre citas editoriales o testimonios con atribución, fuente, imagen, rating y estado publicable optativos.
- `Stats` presenta de dos a cuatro señales de confianza numéricas o descriptivas mediante una lista semántica.
- `ContactBlock` reúne vías de contacto, horario, datos breves y acciones explícitas sin asumir formulario ni proveedor.
- `ContactForm` aporta el formulario visual configurable y se inserta en el slot `form` de `ContactBlock`; su contrato de envío es neutral y los adaptadores son opt-in.

No existe un `ConversionBlock` adicional: `ActionPanel` ya resuelve una llamada a la acción pura y puede componerse con `ContactBlock` cuando la página también necesita datos de contacto. Los contratos se exportan desde `components/patterns/types.ts`; el CORE no incluye datasets de testimonios, FAQ o métricas porque esos datos pertenecen a cada proyecto.

## Variación entre proyectos

La identidad debe cambiar desde tokens, assets, tipografía, densidad y composición de página. Un nuevo pattern solo se justifica cuando cambia una relación semántica o estructural recurrente; una diferencia de color, radio, alineación o contenido pertenece a tokens, props o slots.

## Efectos avanzados

El CORE no implementa tilt, parallax, cursor tracking, SVG animado, GSAP ni WebGL. Los slots de medio y decoración crean puntos de extensión, y las microinteracciones existentes usan propiedades CSS individuales para no reservar `transform`. Un efecto que necesite recorte exterior o stacking complejo debe envolverse en la página o en un componente especializado, sin ampliar el pattern genérico.

## Validación de flexibilidad

Un stress test temporal confirmó que el CORE admite direcciones visuales radicalmente diferentes mediante tokens, composición, CSS aislado, SVG y JavaScript nativo. Esta flexibilidad no debe convertirse en un sistema rígido de themes: cada proyecto debe añadir los efectos avanzados solo cuando aporten valor. Cuando una landing, campaña o microsite necesite identidad propia, `BaseLayout` puede recibir `siteConfig`, `headerConfig` y `footerConfig` locales, manteniendo la configuración global como fallback.
