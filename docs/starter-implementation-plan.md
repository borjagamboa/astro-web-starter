# Starter implementation plan

## 1. Decisión de producto

`astro-web-starter` será un sistema de construcción asistida, no una web demo para clonar. Su valor principal será convertir un brief muy corto en una primera web profesional mediante tres activos coordinados:

1. una arquitectura Astro pequeña, tipada y predecible;
2. un sistema visual con buenos defaults y ejes explícitos de variación;
3. recetas de página que enseñen a Codex a componer, no solo a ensamblar componentes.

El starter debe ser suficientemente opinionado para evitar páginas vacías o visualmente pobres, pero no debe imponer la composición, la paleta ni la voz del proyecto de referencia. El criterio para incluir una pieza en el core es que reduzca decisiones repetitivas en casi cualquier web corporativa sin incorporar supuestos de sector.

### Resultado que debe optimizarse

Con nombre, actividad, propuesta breve, logo, colores o referencias visuales, navegación, oferta y ubicación, Codex debe poder:

- configurar identidad y tema sin buscar hardcodings;
- escoger una receta apropiada para cada página;
- combinar un conjunto pequeño de primitives y patterns;
- producir jerarquía, ritmo y variedad visual sin CSS improvisado por página;
- entregar una primera versión completa, responsive, accesible, rápida y con SEO técnico coherente;
- detectar qué datos faltan y usar estados seguros sin inventar información de negocio.

## 2. Principios de implementación

- Bootstrap limpio: la referencia enseña patrones, pero no será copiada como árbol de origen.
- Core neutral: ninguna taxonomía, ruta, marca, locale, servicio o schema sectorial será obligatoria.
- Dependencias en una dirección: `pages/layouts → patterns → primitives`; los primitives no importan `data`.
- Contenido, datos, configuración, presentación e integraciones permanecen separados.
- Variación por contratos: tokens, variantes tipadas, slots y composición; no forks de CSS por cliente.
- HTML visible sin JavaScript; la interacción y el motion son mejoras progresivas.
- Un solo origen canónico y una única autoridad para sitemap.
- El build de desarrollo puede admitir placeholders claramente visibles; el build de producción debe bloquear los críticos.
- El starter se valida creando una web ficticia desde un brief mínimo, no solo ejecutando el compilador.

## 3. Evaluación de la referencia real

Las categorías de esta sección expresan la acción recomendada para el starter:

- `COPY_AND_GENERALIZE`: partir del archivo real y cambiar su contrato, nombres o tokens de manera controlada.
- `REBUILD_USING_PATTERN`: conservar la solución conceptual y escribir una implementación neutral nueva.
- `REUSE_NEARLY_AS_IS`: trasladar con ajustes menores y pruebas.
- `OPTIONAL`: mantener fuera del core o activarlo por feature.
- `DISCARD`: no trasladar; otro mecanismo cubre la necesidad.

### Configuración y Content Collections

| Referencia | Decisión | Motivo y acción |
| --- | --- | --- |
| `config-reference/package.json` | `COPY_AND_GENERALIZE` | Mantener scripts Astro mínimos y `type: module`. Renombrar, fijar engines y declarar `packageManager`; no incorporar scripts ausentes ni toolkits. |
| `config-reference/astro.config.mjs` | `COPY_AND_GENERALIZE` | Conservar configuración estática, `trailingSlash` y la integración oficial de sitemap. El origen se obtendrá de entorno/configuración validada; no habrá redirects ni filtros de negocio por defecto. |
| `config-reference/tsconfig.json` | `REUSE_NEARLY_AS_IS` | `astro/tsconfigs/strict` es la base correcta. Añadir aliases solo si reducen imports frágiles, sin relajar tipos. |
| `config-reference/src/content.config.ts` | `REBUILD_USING_PATTERN` | Reutilizar SEO compartido, `draft: true`, fechas y loaders. Eliminar `servicios`, `patologias`, autor/categoría por defecto y campos clínicos. Empezar con una colección editorial neutral opt-in y schemas componibles. |

### Primitives y navegación

| Referencia | Decisión | Motivo y acción |
| --- | --- | --- |
| `Breadcrumbs.astro` | `COPY_AND_GENERALIZE` | La semántica es adecuada. Recibirá también la raíz, labels y separador; `aria-label` e idioma vendrán de locale. El schema se construirá fuera del componente. |
| `Button.astro` | `COPY_AND_GENERALIZE` | Buena bifurcación enlace/botón. Ampliar passthrough seguro de atributos, estados y variantes `primary`, `secondary`, `text`; sustituir colores físicos por tokens semánticos. |
| `ContentImage.astro` | `REBUILD_USING_PATTERN` | Conservar `figure`, alt y caption, pero diseñarlo sobre `astro:assets`, dimensiones, aspect ratio, prioridad y tamaños responsive. No debe ocultar silenciosamente una imagen cuando falta `alt`. |
| `Footer.astro` | `REBUILD_USING_PATTERN` | Mantener composición por columnas y banda legal. Recibir identidad, grupos, contacto y social mediante props; admitir ausencia válida y evitar labels, ubicación y estilo de origen. |
| `Header.astro` | `REBUILD_USING_PATTERN` | Es la referencia funcional más valiosa: sticky header, móvil, submenús y desktop. Reescribir con arrays neutrales, active state, acciones/social opcionales, cierre con Escape/click exterior, gestión de foco y bloqueo de scroll móvil. |
| `Logo.astro` | `REBUILD_USING_PATTERN` | Mantener variantes y fallback, pero evitar `node:fs` y tamaños ligados a un set de logos. Recibir un contrato de assets, width/height y nombre accesible. |
| `RevealObserver.astro` | `REUSE_NEARLY_AS_IS` | Es pequeño, progresivo y respeta reduced motion. Convertir threshold/root margin en constantes documentadas, soportar navegación Astro si se activa y probar no-JS. |
| `Section.astro` | `COPY_AND_GENERALIZE` | El shell y las variantes son útiles. Renombrar `home*` a `standard`, `wide`, `full` y separar fondo, spacing y container en props tipadas. |
| `SectionTransition.astro` | `COPY_AND_GENERALIZE` | Los separadores SVG aportan acabado con poco peso. Renombrar geometrías sin `brand-*`, usar roles de superficie y reducir el conjunto a tres formas realmente distintas. |
| `TitleHighlight.astro` | `COPY_AND_GENERALIZE` | Primitive expresivo y barato. Cambiar `green/pink` por `accent/secondary` o por un token de énfasis; permitir desactivarlo desde la receta visual. |

### Patterns de marketing y contenido

| Referencia | Decisión | Motivo y acción |
| --- | --- | --- |
| `BlogCard.astro` | `REBUILD_USING_PATTERN` | Conservar media, metadata y jerarquía, pero unificarla con un contrato de `ContentCard`; locale, fallback y nivel de heading serán externos. |
| `CTA.astro` | `REBUILD_USING_PATTERN` | Mantener panel, copy corto y grupo de acciones. Eliminar import de catálogo, máscara de logo y defaults de marca; incorporar variantes de composición y decoración controladas por tema. |
| `FAQBlock.astro` | `COPY_AND_GENERALIZE` | `<details>/<summary>` ofrece una buena base sin JS. No mostrar copy inventado si no hay items; añadir heading opcional, IDs estables y estilos semánticos. |
| `Hero.astro` | `REBUILD_USING_PATTERN` | Conservar overlay legible, escala fluida, highlight y comportamiento móvil. Diseñar una API de media/acciones y tres composiciones (`split`, `background`, `editorial`) sin rutas ni imagen por defecto. |
| `PricingCard.astro` | `OPTIONAL` | El patrón es sólido, pero no todas las webs muestran precios. Generalizar como preset de planes con moneda, locale, href y badge configurables. |
| `RelatedContent.astro` | `COPY_AND_GENERALIZE` | Shell sencillo y útil para artículos o servicios. Recibir heading id, label y límite; usar el contrato común de enlaces/cards. |
| `ReviewCard.astro` | `REBUILD_USING_PATTERN` | La presentación es reutilizable, pero necesita un tipo neutral con fecha ISO, fuente opcional, rating validado e identidad pública consentida. |
| `ReviewsWidget.astro` | `OPTIONAL` | Scroll-snap, controles y filtro de consentimiento merecen conservarse. Debe recibir todos los datos/copy por props, manejar RTL y limpiar listeners; se activa solo si hay testimonios autorizados. |
| `ServiceCard.astro` | `REBUILD_USING_PATTERN` | El aspecto visual sirve, pero se reemplazará por `FeatureCard`/`ContentCard` sin ruta o label de servicios. La semántica del dominio se compone desde la página. |

### Datos, layouts, páginas y estilos

| Referencia | Decisión | Motivo y acción |
| --- | --- | --- |
| `src/data/site.ts` | `REBUILD_USING_PATTERN` | Mantener la idea de autoridad global. Crear `defineSiteConfig`, tipos y validación; retirar aliases, duplicados, placeholders utilizables como datos y forma fija de redes/logos. |
| `BaseLayout.astro` | `REBUILD_USING_PATTERN` | Conservar la cobertura SEO y el escape de JSON-LD. Separar `buildSeo`, aceptar arrays de schema, parametrizar idioma/OG/robots y permitir slots para chrome del sitio. |
| `PageLayout.astro` | `COPY_AND_GENERALIZE` | Es un shell composable con una buena cabecera interior. Cambiarlo a `StandardPageLayout` o mantener nombre neutral, añadiendo slots sin introducir copy. |
| `BlogLayout.astro` | `REBUILD_USING_PATTERN` | Convertirlo en `ArticleLayout`: locale, breadcrumbs, metadatos, CTA y relacionados opcionales; producir schema `Article` mediante helper, no desde markup ad hoc. |
| `pages/blog/index.astro` | `OPTIONAL` | Conservar como receta de índice editorial, no como ruta obligatoria. Extraer consulta, publicación, orden, grid y empty state sin texto final inventado. |
| `pages/blog/[slug].astro` | `COPY_AND_GENERALIZE` | Buen patrón de `getStaticPaths` + `render`. Usar `isPublished`, slug derivado de entry id o schema único, SEO helper y relaciones opt-in. |
| `pages/sitemap.xml.ts` | `DISCARD` | Duplica la integración oficial y conoce colecciones sectoriales. `@astrojs/sitemap` será la única autoridad; sus filtros se alimentarán de configuración neutral. |
| `styles/tokens.css` | `REBUILD_USING_PATTERN` | Conservar escalas fluidas, lectura, contenedores, spacing, radios y elevación. Crear capas `foundation` y `semantic`, paleta neutral nueva y presets visuales; eliminar nombres y valores reconocibles del origen. |
| `styles/global.css` | `COPY_AND_GENERALIZE` | Aprovechar reset, tipografía, shells, prose, foco y reduced motion. Dividir reset/typography/global/motion, eliminar fuente ausente y sustituir literales de marca por tokens. |

### Elementos no incluidos en la referencia

| Elemento del proyecto de origen | Decisión | Razón |
| --- | --- | --- |
| Contenido, páginas comerciales, servicios y taxonomías clínicas | `DISCARD` | Son narrativa, SEO y dominio de negocio, no infraestructura. Las recetas se escribirán desde cero. |
| Navegación, CTA y datasets originales | `DISCARD` | Contienen rutas, copy y decisiones comerciales. Solo se conservarán contratos neutrales. |
| Formularios y Function de email | `OPTIONAL` | El patrón server-side es válido, pero proveedor, hosting, campos, legal y privacidad exigen un adaptador nuevo. |
| Redirects y migración WordPress | `OPTIONAL` | Herramientas útiles solo para migraciones; nunca forman parte del runtime o del mapa de rutas core. |
| Imágenes, logos y fuentes del origen | `DISCARD` | No son necesarios para aprender arquitectura y pueden tener restricciones de identidad o derechos. |
| Analytics, Brevo y Cloudflare | `OPTIONAL` | Integraciones opt-in tras definir consentimiento, entornos y secretos. |

## 4. Arquitectura objetivo

```text
astro-web-starter/
├─ public/
│  ├─ images/
│  │  ├─ brand/                  # vacío o placeholders propios
│  │  └─ demo/                   # assets propios, licenciados y no publicables por error
│  ├─ fonts/                     # vacío por defecto
│  └─ favicon.svg
├─ src/
│  ├─ assets/                    # imágenes procesadas por astro:assets
│  ├─ components/
│  │  ├─ primitives/
│  │  │  ├─ Button.astro
│  │  │  ├─ Container.astro
│  │  │  ├─ Section.astro
│  │  │  ├─ HeadingGroup.astro
│  │  │  ├─ ContentMedia.astro
│  │  │  ├─ Highlight.astro
│  │  │  └─ SectionDivider.astro
│  │  ├─ navigation/
│  │  │  ├─ Logo.astro
│  │  │  ├─ Header.astro
│  │  │  ├─ MobileNavigation.astro
│  │  │  ├─ Footer.astro
│  │  │  └─ Breadcrumbs.astro
│  │  ├─ patterns/
│  │  │  ├─ Hero.astro
│  │  │  ├─ ActionPanel.astro
│  │  │  ├─ ContentCard.astro
│  │  │  ├─ CardGrid.astro
│  │  │  ├─ SplitContent.astro
│  │  │  ├─ FeatureGrid.astro
│  │  │  ├─ StatsBlock.astro
│  │  │  ├─ TestimonialBlock.astro
│  │  │  ├─ FAQBlock.astro
│  │  │  ├─ ContactBlock.astro
│  │  │  └─ RelatedContent.astro
│  │  └─ utilities/
│  │     └─ RevealObserver.astro
│  ├─ content/
│  │  └─ articles/               # solo si se activa el módulo editorial
│  ├─ data/
│  │  ├─ site.ts
│  │  ├─ navigation.ts
│  │  ├─ actions.ts
│  │  └─ page-recipes.ts         # opciones tipadas de composición, no copy final
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  ├─ PageLayout.astro
│  │  └─ ArticleLayout.astro
│  ├─ lib/
│  │  ├─ config.ts
│  │  ├─ content.ts
│  │  ├─ routes.ts
│  │  ├─ seo.ts
│  │  └─ structured-data.ts
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ 404.astro
│  │  └─ robots.txt.ts
│  ├─ styles/
│  │  ├─ reset.css
│  │  ├─ tokens.css
│  │  ├─ theme.css
│  │  ├─ typography.css
│  │  ├─ motion.css
│  │  └─ global.css
│  └─ content.config.ts
├─ docs/
│  ├─ architecture.md
│  ├─ configuration.md
│  ├─ design-system.md
│  ├─ page-recipes.md
│  ├─ content.md
│  ├─ seo.md
│  └─ validation.md
├─ scripts/
│  ├─ validate-config.mjs
│  └─ check-leakage.mjs
├─ tests/
│  ├─ config/
│  ├─ content/
│  └─ seo/
├─ .env.example
├─ astro.config.mjs
├─ package.json
└─ tsconfig.json
```

Las carpetas vacías no deben crearse solo para coincidir con el diagrama. `adapters/` y `toolkits/` aparecerán únicamente al implementar un módulo opt-in. La referencia saneada seguirá siendo material de estudio y no una dependencia del build.

## 5. CORE visual

El core visual debe tener alrededor de 25 piezas, contando primitives, navegación y patterns. La variedad debe proceder de su combinación y tema, no de docenas de componentes casi idénticos.

### PRIMITIVES

| Pieza | Responsabilidad | Variaciones controladas |
| --- | --- | --- |
| `Button` | Enlace o botón de acción accesible | intención, tamaño, icon slot, ancho, disabled |
| `Container` | Anchura y gutters consistentes | narrow, standard, wide, full |
| `Section` | Ritmo vertical y superficie | spacing, container, surface, divider |
| `HeadingGroup` | Eyebrow, heading, lead y alineación | nivel, measure, align, emphasis |
| `ContentMedia` | Imagen/figura optimizada | ratio, fit, position, priority, caption |
| `Highlight` | Énfasis breve dentro de títulos | accent, secondary, none |
| `SectionDivider` | Transición decorativa sin contenido | wave, curve, angle, flip |

Los primitives no importan `site.ts`, navegación, actions ni contenido. Solo consumen props, slots y tokens semánticos.

### PATTERNS

| Pieza | Función | Límites |
| --- | --- | --- |
| `Logo` | Representar identidad y fallback | Assets y dimensiones por contrato; sin filesystem |
| `Header` + `MobileNavigation` | Navegación global responsive | Grupos, acciones y redes opcionales; foco y Escape probados |
| `Footer` | Cierre de marca, navegación y legal | Columnas configurables; no inventa texto legal |
| `Breadcrumbs` | Orientación y jerarquía | Labels configurables; schema externo |
| `Hero` | Apertura fuerte de página | `split`, `background`, `editorial`; media y acciones por props |
| `ActionPanel` | CTA intermedio o final | composición compact/featured; decoración opcional |
| `ContentCard` | Entrada reusable de contenido/oferta | media opcional, metadata, heading level y acción |
| `CardGrid` | Ritmo y columnas de cards | 1–4 columnas según ancho, densidad y cantidad |
| `SplitContent` | Texto + imagen/video | media first/end, ratio, surface, overlap discreto |
| `FeatureGrid` | Beneficios, servicios o pasos | items semánticos, icono opcional, 2–4 columnas |
| `StatsBlock` | Métricas verificables | no mostrar si no hay datos; labels y contexto obligatorios |
| `TestimonialBlock` | Prueba social | datos consentidos; single/grid/carousel según cantidad |
| `FAQBlock` | Preguntas frecuentes nativas | sin JS obligatorio; schema separado y solo si aplica |
| `ContactBlock` | Contacto público y vías de acción | sin endpoint ni proveedor; formulario es adaptador opcional |
| `RelatedContent` | Próximos contenidos relevantes | límite y label configurables |

`PricingCard`, carrusel avanzado de reseñas, formulario real, mapa, tabla comparativa y logos de clientes serán patterns opcionales. No son necesarios para demostrar el core.

### PAGE COMPOSITIONS

Las composiciones son recetas y ejemplos estructurales, no supercomponentes. Una página Astro debe poder leer la receta, elegir variantes y componer patterns explícitamente. Esto mantiene el markup comprensible y permite que Codex adapte la narrativa.

Cada receta define:

- objetivo de la página y acción principal;
- secuencia recomendada y alternativas;
- densidad y ritmo visual;
- contenido mínimo por sección;
- requisitos SEO y schema aplicable;
- señales para omitir o reordenar bloques;
- comprobaciones responsive y accesibles.

## 6. Page recipes

| Receta | Secuencia base | Variaciones y condiciones |
| --- | --- | --- |
| Home | Hero → confianza/beneficios → oferta → split de diferenciación → prueba social → FAQ breve → ActionPanel | Cambiar orden según intención; no usar stats/testimonios sin datos; alternar superficies y anchuras. |
| About | Hero editorial → historia/propósito → valores → split de equipo/proceso → confianza → CTA | Personas solo con datos y fotos autorizados; puede ser una página centrada en método, no siempre equipo. |
| Services index | Intro/Hero compacto → FeatureGrid o CardGrid → proceso → FAQ → CTA | La etiqueta “servicios” es copy del proyecto; admite productos, capacidades o soluciones. |
| Service detail | Breadcrumbs → Hero split → problema/resultado → beneficios → proceso → evidencia → FAQ → CTA | Schema solo si corresponde; relacionados opcionales; evitar estructura clínica fija. |
| Generic content | Breadcrumbs → HeadingGroup → prose/media → relacionados/CTA opcionales | Lectura estrecha, jerarquía editorial y tablas/listas responsive. |
| Contact | Intro → ContactBlock → vías/horarios/ubicación opcionales → FAQ breve | Formulario solo si está configurado; no inventar horarios, dirección o mapa. |
| Blog index | Intro → filtros opcionales → CardGrid → paginación/empty state | Módulo editorial opt-in; no publicar demos; locale y taxonomía configurables. |
| Blog article | Breadcrumbs → cabecera/meta → media → prose → CTA/relacionados | `Article` solo con autor/fecha válidos; reading measure y assets optimizados. |
| Landing page | Hero orientado a campaña → beneficios → mecanismo/oferta → evidencia → objeciones/FAQ → CTA repetida | Navegación reducida opcional; canonical/indexación y tracking son decisiones explícitas. |
| 404 | Mensaje claro → acción a inicio → enlaces útiles/buscador opcional | `noindex`; conservar Header/Footer salvo razón de producto. |

No todas estas recetas tienen que materializarse como rutas del starter. Home mínima y 404 sirven como smoke test; las demás vivirán inicialmente en `docs/page-recipes.md` y se implementarán al crear el proyecto de prueba.

## 7. Variabilidad visual sin clones

La identidad se construirá en cuatro niveles. Codex debe decidirlos desde el brief y registrar la elección.

### 7.1 Tema

`tokens.css` define escalas y contratos; `theme.css` asigna la identidad del proyecto:

- paleta: primary, secondary, accent, neutrals y estados;
- tipografía: display/body, peso, escala, line-height y tracking;
- forma: radios desde cuadrados hasta orgánicos y grosor de borde;
- elevación: flat, soft o pronounced;
- spacing: compact, balanced o generous;
- contenedores y measure: narrow, standard o expansive;
- motion: subtle por defecto y `reduced` respetado siempre.

Los tokens no deben nombrar colores físicos (`blue`, `pink`) ni páginas (`home`). Se usarán roles como `--color-action`, `--color-accent`, `--surface-muted`, `--radius-card`, `--space-section` y `--measure-copy`.

### 7.2 Dirección visual

Cada proyecto elige un pequeño perfil documentado, por ejemplo:

- editorial: tipografía protagonista, más whitespace y bordes discretos;
- warm-organic: superficies cálidas, formas suaves y media inmersiva;
- precise-modern: grid marcado, radios contenidos y densidad media;
- bold-commercial: contraste alto, CTAs fuertes y bloques compactos.

Estos perfiles no serán temas cerrados ni nombres visibles en la UI. Son combinaciones iniciales de tokens que Codex adapta a marca y sector.

### 7.3 Composición

Para evitar clones, Codex variará deliberadamente:

- tipo, altura, alineación y media del Hero;
- orden y cantidad de bloques según la narrativa;
- uso de grid frente a splits o listas editoriales;
- alternancia de superficies, secciones full-bleed y contenedores estrechos;
- ratio, recorte, posición y protagonismo de imágenes;
- card treatment: bordered, elevated o quiet;
- densidad de contenido y espacios de respiración;
- localización de highlights, cifras, prueba social y CTAs.

Una receta prohíbe usar automáticamente todas las piezas. La omisión deliberada aporta tanta identidad como la variante visual.

### 7.4 Voz y contenido

El tono, la longitud de títulos, el vocabulario de acciones, el tipo de evidencia y la estructura de beneficios se derivan del brief. Los componentes no incluyen copy comercial de fallback. Si falta contenido esencial, el estado debe ser visible como pendiente en desarrollo y bloquear producción.

## 8. Configuración mínima del proyecto

### `src/data/site.ts`

Será la única autoridad pública para información transversal y estará validada mediante `defineSiteConfig`:

```ts
export const site = defineSiteConfig({
  identity: {
    name: '[PROJECT_NAME]',
    shortName: '[SHORT_NAME]',
    tagline: '[TAGLINE]',
  },
  origin: {
    url: 'https://example.com',
    basePath: '/',
    trailingSlash: 'always',
  },
  locale: {
    language: 'es',
    region: 'ES',
    htmlLang: 'es',
    dateLocale: 'es-ES',
  },
  seo: {
    titleTemplate: '%s | [PROJECT_NAME]',
    defaultTitle: '[PROJECT_NAME]',
    defaultDescription: '[DESCRIPTION]',
    defaultImage: undefined,
    twitterCard: 'summary_large_image',
  },
  organization: {
    type: 'Organization',
    legalName: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    serviceArea: undefined,
  },
  assets: {
    logo: { default: undefined, mark: undefined, inverse: undefined },
    favicon: '/favicon.svg',
  },
  social: [],
  routes: {
    home: '/',
    contact: undefined,
    privacy: undefined,
    legal: undefined,
    articles: undefined,
  },
  features: {
    articles: false,
    testimonials: false,
    contactForm: false,
    analytics: false,
  },
});
```

La navegación completa vive en `navigation.ts`; textos y destinos de acciones en `actions.ts`. Ambos referencian claves de rutas cuando procede. `site.ts` no almacena secretos, contenido largo, campos del formulario, redirects ni IDs de proveedor.

### Design tokens

Los tokens contienen únicamente decisiones visuales compartidas:

- colores base y roles semánticos;
- fuentes, escala tipográfica fluida y measures;
- spacing, gutters y ritmo de sección;
- anchos de container y breakpoints documentados;
- bordes, radios, sombras y z-index;
- duración/easing de motion;
- ratios de media y tratamientos de superficie.

La configuración de negocio no entra en CSS. Las variantes de composición se expresan mediante props tipadas y recetas, no mediante cambios de datos globales.

## 9. Brief mínimo: QUICK START y ADVANCED

`PROJECT-BRIEF.md` debe reorganizarse en una fase posterior, sin perder su cobertura actual.

### QUICK START

Debe poder completarse en menos de diez minutos:

1. nombre y actividad del negocio;
2. objetivo principal de la web y CTA principal;
3. público y ámbito/ubicación;
4. propuesta de valor en una o dos frases;
5. servicios, productos o contenidos principales;
6. páginas y orden del menú;
7. contacto público disponible;
8. logo y assets disponibles con su ubicación;
9. colores, referencias visuales o tres adjetivos de estilo;
10. idioma, dominio si existe y contenido que no debe inventarse.

Cada campo tendrá una pregunta corta y un ejemplo neutral. Si faltan logo o colores, Codex podrá proponer una dirección visual provisional; si faltan datos comerciales o legales, no podrá inventarlos.

### ADVANCED

Se desplegará solo cuando aplique:

- migración, inventario de URLs, redirects y continuidad SEO;
- investigación de keywords, SEO local, competidores y schemas;
- idiomas múltiples y estrategia de rutas;
- contenido, taxonomías y workflow editorial;
- formularios, privacidad, legal y consentimientos;
- analytics, campañas, CRM e integraciones;
- hosting, entornos, DNS y despliegue;
- requisitos sectoriales, accesibilidad reforzada y rendimiento;
- derechos/licencias, riesgos, métricas y responsables.

El Quick Start genera la primera propuesta; Advanced controla casos de riesgo o lanzamiento. Ningún dato Advanced ausente debe bloquear un prototipo local si puede mantenerse desactivado y claramente marcado.

## 10. Arquitectura SEO única

### Flujo

1. `site.ts` define origen, locale y defaults.
2. Cada página entrega un objeto `SeoInput` con title, description, image, canonical override, robots y tipo.
3. `lib/seo.ts` normaliza title template, URL, trailing slash, imagen absoluta y fallback.
4. `BaseLayout` renderiza una única salida de metadata, canonical, Open Graph y Twitter.
5. `lib/structured-data.ts` construye nodos JSON-LD tipados; `BaseLayout` solo serializa el array de nodos de forma segura.
6. `Breadcrumbs.astro` renderiza UI; un helper genera `BreadcrumbList` desde los mismos items cuando procede.

### Reglas

- Title y description son obligatorios para páginas indexables.
- Canonical deriva de `Astro.url.pathname` y `site.origin`; el override requiere justificación.
- `WebSite` es schema base. `Organization` se añade solo con datos suficientes.
- `Article`, `BreadcrumbList`, `FAQPage` y otros schemas se añaden por receta y datos reales, no globalmente.
- Robots se genera desde `src/pages/robots.txt.ts` usando el mismo origen y el path real del sitemap.
- `@astrojs/sitemap` es la única autoridad para sitemap. Se elimina el endpoint manual de la referencia.
- Filtros de noindex/demos se centralizan y se verifican contra el build.
- El build comprueba que no haya dos sitemaps, canonicals con origen de ejemplo ni páginas indexables sin metadata.

## 11. Core vs Optional Toolkit

### CORE por defecto

- Astro estático y TypeScript estricto.
- Configuración global, rutas, navegación y actions tipadas.
- Tokens, tema neutral, reset, tipografía, global y motion.
- Primitives, Header/Nav, Footer, Breadcrumbs y patterns visuales definidos en la sección 5.
- BaseLayout, PageLayout y ArticleLayout disponible sin obligar a activar blog.
- Home mínima de demostración técnica y 404, ambas con copy inequívocamente reemplazable.
- SEO centralizado, robots y sitemap oficial.
- Contrato de Content Collections y helper de publicación, aunque el módulo editorial pueda estar desactivado.
- Validación de configuración, secretos, hardcodings, placeholders y build.
- Documentación de configuración, diseño, recetas, SEO y validación.

### OPTIONAL TOOLKIT

- blog/editorial con contenido y rutas reales;
- catálogo, precios, testimonios/carrusel y formularios;
- adaptadores de email, CRM, captcha y reservas;
- analytics, tag manager, cookies y eventos;
- Cloudflare u otros adaptadores de hosting;
- migración WordPress u otros CMS;
- inventario/paridad de URLs y redirects complejos;
- auditoría, deduplicación y optimización batch de imágenes;
- SEO local, mapas y schemas de tipos de negocio;
- búsqueda, internacionalización avanzada y feeds.

Los patterns visuales puros pueden vivir en core aunque su fuente de datos sea opcional. Por ejemplo, `TestimonialBlock` no trae reseñas, proveedor ni feature activa.

## 12. Dependencias mínimas

La primera implementación debe comenzar únicamente con:

```json
{
  "dependencies": {
    "astro": "7.3.2",
    "@astrojs/sitemap": "3.7.4"
  }
}
```

Las versiones exactas se resolverán y bloquearán al ejecutar el bootstrap autorizado. Se adopta Astro 7.3.2: Astro 6.4.6 compila en el entorno local, pero el audit de npm detecta vulnerabilidades corregidas en la rama 7. El árbol de Astro 7.3.2 incluye `unifont@0.7.5 → undici@8.10.2`, que exige Node `>=22.19.0`; por ello el starter adopta ese requisito real aunque Astro declare `>=22.12.0`. El entorno usado para el bootstrap tiene Node 22.15.0 y debe actualizarse antes de considerarse un entorno soportado. No se añadirá React, Tailwind, librería de iconos, carrusel, CSS framework, schema library adicional, formatter o test runner en la primera fase salvo que una validación concreta demuestre su necesidad.

Astro ya aporta TypeScript, content collections, loaders, Zod en su API de contenido, routing, assets y generación estática. HTML ofrece `<details>`, formularios y semántica; CSS ofrece grid, flex, clamp, custom properties, scroll-snap y media queries; JavaScript nativo cubre menú, reveal y controles pequeños.

## 13. Decisiones técnicas cerradas

| Decisión | Elección |
| --- | --- |
| Runtime | Node `>=22.19.0`; usar una versión LTS compatible y documentada. |
| Gestor | npm; declarar `packageManager` y versionar `package-lock.json` tras el bootstrap. |
| Framework | Astro 7.3.2 con TypeScript strict, generación estática por defecto. |
| UI | Astro/HTML/CSS/TS nativos; sin React ni Tailwind. |
| Trailing slash | `always`, aplicado a rutas internas, canonicals y pruebas; assets y endpoints conservan su semántica. |
| Sitemap | Solo `@astrojs/sitemap`; no endpoint `sitemap.xml.ts` manual. |
| Robots | Endpoint generado desde la misma configuración de origen y sitemap. |
| Content Collections | Schema SEO compartido + colección `articles` opt-in; `draft: true`; helper único `isPublished`. |
| Imágenes | `astro:assets` para media procesable; `public` para archivos que requieran URL estable o no procesamiento. |
| Fuentes | System stack por defecto; fuentes locales solo con licencia y necesidad de marca confirmadas. |
| Motion | Progresivo, discreto y desactivable mediante `prefers-reduced-motion`. |

La compatibilidad exacta de Node, Astro y sitemap se comprobará durante el bootstrap. Si el manifiesto publicado de Astro exige un rango más estrecho, se actualizará engines y esta documentación en la misma tarea.

## 14. Validaciones y guardrails

### Mínimos por cambio

- `npm run check` para diagnóstico Astro/TypeScript cuando el script exista;
- `npm run build`;
- revisión de `git status --short` y diff;
- smoke test de rutas y enlaces internos;
- comprobación responsive en móvil, tablet y escritorio;
- navegación completa con teclado, foco visible y reduced motion;
- metadatos, canonical, robots, sitemap y JSON-LD válidos;
- presupuesto básico de HTML, JS, fuentes e imágenes.

### Detección de secretos y hardcodings

`scripts/check-leakage.mjs` recorrerá fuente, Markdown, configuración y `dist`, ignorando dependencias y la propia lista de patrones. Debe fallar ante:

- nombres, dominios, teléfonos, emails, slugs, previews e IDs prohibidos de proyectos de referencia;
- tokens con formatos conocidos, claves privadas, credenciales en URLs y archivos `.env` no permitidos;
- `example.com`, placeholders entre corchetes, `TODO`, contenido demo o flags `demo` en un build de producción;
- dominios múltiples usados como canonical;
- selectores heredados `.wp-*`, `.ast-*` o `.wpforms-*` fuera de toolkits autorizados;
- IDs de analytics o proveedores cuando el feature correspondiente está desactivado.

El script complementa, no sustituye, un escáner de secretos reconocido si más adelante se añade en CI. Los falsos positivos solo podrán exceptuarse mediante allowlist pequeña, comentada y revisada.

## 15. Criterio de éxito final

El starter estará listo cuando supere un ejercicio reproducible:

1. partir de una copia limpia del starter;
2. entregar a Codex solo un Quick Start, un logo propio, una pequeña selección de imágenes y la estructura de páginas;
3. limitar el trabajo a pocas iteraciones pequeñas;
4. obtener Home, About, índice y detalle de oferta, Contact y 404; añadir blog solo si el brief lo pide;
5. cambiar tema, composición del Hero y tratamiento de cards sin editar primitives;
6. superar build, leakage, accesibilidad básica, responsive, SEO y revisión visual;
7. comprobar manualmente que no parece una copia de la referencia ni del proyecto ficticio anterior;
8. medir cuántas decisiones o preguntas adicionales fueron necesarias.

Objetivo operativo: la primera versión coherente debe requerir como máximo una iteración de configuración/tema, una de composición/contenido y una de QA/corrección, sin contar decisiones humanas bloqueantes sobre legal, credenciales o producción.

# Implementation phases

## Phase 1 — Bootstrap y guardrails

**Objetivo:** inicializar Astro limpio con el runtime, npm, TypeScript strict, configuración básica y controles de fuga antes de portar UI.

**Principales archivos:** `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.env.example`, `scripts/validate-config.mjs`, `scripts/check-leakage.mjs`.

**Validación:** instalación limpia, `astro check`, build mínimo, escaneo source/dist y confirmación de una única integración sitemap.

**Resultado esperado:** repositorio compilable, sin dependencia de la referencia y con fallos claros ante secretos o placeholders de producción.

## Phase 2 — Configuración, tema y fundamentos

**Objetivo:** crear contratos tipados de sitio/rutas/actions y el sistema visual foundation + semantic.

**Principales archivos:** `src/data/site.ts`, `navigation.ts`, `actions.ts`, `src/lib/config.ts`, `routes.ts`, `src/styles/*`, documentación de configuración y diseño.

**Validación:** cambiar nombre, origen, locale, paleta, radios, spacing y tipografía sin tocar componentes; contraste, escala fluida y build.

**Resultado esperado:** una identidad provisional coherente generada desde pocos datos y sin hardcodings dispersos.

## Phase 3 — Primitives y media

**Objetivo:** implementar las siete primitives, assets responsive y motion progresivo.

**Principales archivos:** `src/components/primitives/*`, `src/components/utilities/RevealObserver.astro`, fixtures visuales propios.

**Validación:** matriz de variantes, teclado/foco, alt y dimensiones, no-JS, reduced motion y revisión en tres anchos.

**Resultado esperado:** bloques pequeños estables con los que construir cualquier pattern sin importar datos globales.

## Phase 4 — Navegación, layouts y SEO

**Objetivo:** construir chrome responsive, layouts y pipeline SEO único.

**Principales archivos:** `components/navigation/*`, `layouts/*`, `lib/seo.ts`, `lib/structured-data.ts`, `pages/robots.txt.ts`.

**Validación:** menú móvil/desktop por teclado, foco/Escape/click exterior, active state, title/canonical/OG, arrays JSON-LD, robots y un solo sitemap.

**Resultado esperado:** shell completo, accesible y SEO-friendly que funciona con o sin contacto, redes, CTA o submenús.

## Phase 5 — Patterns visuales y recetas

**Objetivo:** implementar el conjunto pequeño de patterns y documentar las diez recetas de página.

**Principales archivos:** `components/patterns/*`, `data/page-recipes.ts`, `docs/page-recipes.md`, Home técnica y 404.

**Validación:** combinar variants en varias secuencias, comprobar ritmo/alternancia/densidad, evitar copy o rutas internas, y comparar dos temas visualmente distintos.

**Resultado esperado:** capacidad real de componer páginas profesionales sin diseñar bloques desde cero.

## Phase 6 — Contenido editorial y módulos opt-in mínimos

**Objetivo:** finalizar Content Collections, publicación segura y contracts de módulos sin incorporar proveedores.

**Principales archivos:** `src/content.config.ts`, `lib/content.ts`, `ArticleLayout.astro`, ejemplos ficticios en draft y documentación de contenido; contratos opcionales de testimonios/contacto.

**Validación:** schemas, fechas, slugs, drafts excluidos, producción bloqueada por demos y build válido con el módulo editorial desactivado.

**Resultado esperado:** contenido editable y seguro sin obligar a cada proyecto a tener blog, testimonios o formulario.

## Phase 7 — Quick Start y generación del proyecto ficticio

**Objetivo:** reorganizar el brief en Quick Start/Advanced y usar solo el Quick Start para crear una web ficticia completa.

**Principales archivos:** `PROJECT-BRIEF.md`, instrucciones de ChatGPT, configuración/tema/contenido/páginas del fixture o proyecto de prueba.

**Validación:** registrar datos entregados, preguntas adicionales, iteraciones y archivos tocados; Home, About, oferta, detalle, Contact y 404 completas; build y revisión visual.

**Resultado esperado:** demostración de que pocos datos bastan para una primera web coherente y no genérica.

## Phase 8 — QA comparativa y preparación de versión

**Objetivo:** endurecer el starter a partir del ejercicio y demostrar variabilidad creando una segunda dirección visual sin reescribir el core.

**Principales archivos:** tests, scripts, docs, tokens/recetas y correcciones acotadas del core.

**Validación:** builds limpios, leakage/secret scan, enlaces, SEO, accesibilidad, responsive, rendimiento, comparación anti-clon y prueba de instalación desde cero.

**Resultado esperado:** starter documentado, reproducible y validado por producto; lista separada de toolkits futuros sin bloquear la primera versión.
