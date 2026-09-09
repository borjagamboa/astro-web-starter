# Plan de extracción de plantilla Astro

## Propósito y límites

Este documento audita el proyecto Astro actual de Ausart Neuro para preparar, en una fase posterior y en un repositorio separado, un starter reutilizable denominado conceptualmente `astro-web-starter`.

La extracción no debe consistir en clonar Ausart Neuro. El objetivo es conservar patrones técnicos maduros, separar configuración de contenido y evitar que datos, decisiones editoriales, producción o marca de Ausart lleguen al starter.

Esta auditoría es solo documental. No propone modificar el proyecto actual durante el análisis y no autoriza copiar contenido sin una revisión explícita.

Categorías empleadas:

- `REUSE`: puede pasar prácticamente sin cambios, salvo renombrado de paquete, documentación o ajustes menores de integración.
- `GENERALIZE`: el patrón es útil, pero contiene textos, rutas, tipos, estilos o supuestos de Ausart que deben parametrizarse.
- `PROJECT_SPECIFIC`: pertenece a Ausart y no debe formar parte del starter.
- `OPTIONAL_TOOLKIT`: herramienta útil para algunos proyectos, pero fuera del núcleo obligatorio.

## Resumen ejecutivo

La mejor base reutilizable no son las páginas ni los contenidos, sino cuatro capas técnicas:

1. El enfoque Astro estático con TypeScript estricto, layouts, componentes pequeños y content collections.
2. Los primitives visuales y de accesibilidad (`Button`, `Section`, `ContentImage`, transiciones y reveal progresivo).
3. La separación parcial entre configuración (`src/data`), contenido editorial (`src/content`) y rutas (`src/pages`).
4. Los controles de publicación: `draft`, metadatos SEO, sitemap, consentimiento de reseñas y validación server-side del formulario.

La principal deuda para la extracción es que la centralización todavía es incompleta. Hay textos, slugs, taxonomías sanitarias, imágenes de marca, destinos CTA, etiquetas en español, schema, proveedor de formularios y rutas de producción repartidos por componentes, páginas, configuración y scripts. Por tanto, copiar carpetas completas sería inseguro.

## Inventario auditado

Se revisaron:

- `src/components`: 29 componentes en `common`, `marketing`, `forms`, `ctas` y `servicios`.
- `src/layouts`: `BaseLayout`, `PageLayout` y `BlogLayout`.
- `src/pages`: páginas estáticas, rutas dinámicas de blog, patologías y servicios, 404 y sitemap manual.
- `src/content`: colecciones de blog, servicios y patologías, incluidos borradores.
- `src/data`: sitio, navegación, CTAs, reseñas, servicios, patologías y método.
- `src/styles`: fuentes, tokens y estilos globales.
- `public`: logos, favicon, fuentes, imágenes, PDF, `robots.txt` y `_redirects`.
- `scripts`: auditoría/optimización de imágenes, paridad de URLs, comprobación de redirects y migración WordPress.
- `functions/api/contact.ts`, `.env.example`, `astro.config.mjs`, `package.json`, documentación y árbol `migration`.

No se detectó una integración activa de analytics ni identificadores tipo GA4/Universal Analytics en el código. Las apariciones del término “analítica” están en textos y documentación. Esta ausencia debe tratarse como estado actual, no como garantía futura: la extracción deberá incluir un control automatizado de IDs y scripts antes de cada publicación del starter.

## Clasificación por área

### Infraestructura y configuración

| Elemento | Categoría | Decisión para el starter |
| --- | --- | --- |
| Astro + TypeScript estricto | `REUSE` | Conservar el enfoque estático, `astro/tsconfigs/strict` y una versión de Node documentada. |
| `@astrojs/sitemap` | `REUSE` | Mantener como integración base, alimentada por una URL de sitio configurable. |
| `trailingSlash: 'always'` | `GENERALIZE` | Convertirlo en una decisión explícita del starter; afecta canonicals, sitemap y redirects. |
| `astro.config.mjs` | `GENERALIZE` | El dominio, el filtro de `/datos-recibidos/` y todos los redirects son de Ausart. La configuración debe consumir datos neutros o variables validadas. |
| `package.json` | `GENERALIZE` | Renombrar `site`, mantener scripts estándar y mover comandos de migración a toolkit. Revisar si Node `>=22.12.0` debe ser requisito o rango soportado. |
| `.env.example` | `GENERALIZE` | No hacer obligatorios Brevo ni Cloudflare. Separar variables core de variables de adaptadores opcionales. |
| Cloudflare Pages Functions | `OPTIONAL_TOOLKIT` | Es una estrategia válida, pero acopla hosting y formulario; debe vivir como adaptador opcional. |
| `dist`, `.astro`, `node_modules` | `PROJECT_SPECIFIC` | Artefactos generados; nunca copiar al starter ni versionar. |

El proyecto utiliza simultáneamente `@astrojs/sitemap` y un endpoint manual `src/pages/sitemap.xml.ts`. El starter debe escoger una autoridad única o documentar claramente por qué existen ambos. Mantener dos generadores aumenta el riesgo de rutas divergentes, exclusiones duplicadas y nombres de sitemap inconsistentes.

### Componentes comunes

| Elemento | Categoría | Observaciones |
| --- | --- | --- |
| `Button.astro` | `REUSE` | API pequeña y semántica de enlace/botón correcta. Conviene sustituir colores directos de marca por tokens semánticos. |
| `Section.astro` | `REUSE` | Primitive útil; renombrar variantes `home-*` a tamaños neutrales. |
| `SectionTransition.astro` | `REUSE` | Patrón visual desacoplado del contenido; sus colores deben ser semánticos. |
| `RevealObserver.astro` | `REUSE` | Mejora progresiva y respeta `prefers-reduced-motion`. Añadir documentación de uso y pruebas. |
| `ContentImage.astro` | `REUSE` | Figura, alt y caption genéricos. Evaluar soporte de `astro:assets`, dimensiones y carga prioritaria. |
| `TitleHighlight.astro` | `REUSE` | Primitive de presentación; los tonos `green/pink` deben mapearse a roles semánticos. |
| `Breadcrumbs.astro` | `GENERALIZE` | La estructura es reutilizable, pero “Inicio”, `/` y `aria-label` en español deben venir de i18n/configuración. No genera schema `BreadcrumbList`. |
| `Logo.astro` | `GENERALIZE` | Buena selección de variantes y fallback, pero depende de campos de `site`, filesystem Node durante build y medidas diseñadas para los logos de Ausart. |
| `Header.astro` | `GENERALIZE` | Navegación responsive reutilizable, pero contiene “Rehabilitación neurológica”, teléfono, Instagram, aria-labels de Ausart, un único proveedor social y el supuesto de un solo CTA. |
| `Footer.astro` | `GENERALIZE` | La estructura es útil, pero “Zona”, textos legales, marca, navegación y estética son específicas/configurables. |

### Componentes de marketing

| Elemento | Categoría | Observaciones |
| --- | --- | --- |
| `ServiceCard`, `ServicesOverviewGrid`, `BlogCard`, `RelatedContent`, `PricingCard`, `PathologyCard` | `GENERALIZE` | Sus shells y cards son aprovechables, pero nombres de dominio, fallbacks, destinos y taxonomías están orientados a servicios sanitarios de Ausart. |
| `Hero.astro` | `GENERALIZE` | Parece genérico por sus props, pero fija imagen de domicilio Ausart, `/contacto/`, `/patologias/` y “Ver patologías”. La imagen debe ser prop/config y las acciones una lista. |
| `CTA.astro` | `GENERALIZE` | Buena composición, pero el eyebrow por defecto es “Ausart Neuro”, consume variantes de `ctas.ts` y usa el logo-mark como máscara decorativa. |
| `FAQBlock.astro` | `REUSE` | Patrón de contenido útil si se mantiene agnóstico; añadir opcionalmente generación de `FAQPage` fuera del componente visual. |
| `ReviewCard.astro` | `GENERALIZE` | El modelo visual puede conservarse, pero fuente, fecha, identidad pública y políticas de consentimiento necesitan una interfaz neutral. |
| `ReviewsWidget.astro` | `GENERALIZE` | Carrusel y filtros son útiles, pero importa directamente los datos, fija Google, “Ausart Neuro” y copy de fallback. Debe recibir reseñas y textos por props. |

### Componentes y composición clínica

| Elemento | Categoría | Observaciones |
| --- | --- | --- |
| `ClinicalConditionAccordion`, `ClinicalEditorialBlock`, `ClinicalFaqList`, `ClinicalServicePillars` | `GENERALIZE` | La composición visual puede evolucionar a bloques editoriales neutrales; nombres, labels y modelo actual presuponen contenido clínico. |
| `ClinicalHomeTreatment`, `ClinicalServiceHero` | `GENERALIZE` | Contienen domicilio, Pamplona, evaluación gratuita, enlaces y decoración de marca. No deben copiarse como primitives sin parametrización. |
| `ClinicalServiceDetail.astro` | `GENERALIZE` | El patrón de page builder por variante es valioso, pero está tipado contra `servicios`, termina siempre en `FirstEvaluationCta` y compone secciones clínicas fijas. |
| `FirstEvaluationCta.astro` | `PROJECT_SPECIFIC` | El concepto de primera evaluación gratuita, sus textos y rutas son una oferta de Ausart. Puede inspirar un `ActionPanel` genérico, no copiarse como tal. |

### Layouts

| Elemento | Categoría | Observaciones |
| --- | --- | --- |
| `BaseLayout.astro` | `GENERALIZE` | Son reutilizables canonicals, Open Graph, Twitter card y escape básico de JSON-LD. Deben parametrizarse idioma, tipo OG, locale, robots por defecto, imagen, title template, site URL y schemas múltiples. |
| `PageLayout.astro` | `REUSE` | Shell interior sencillo; mover copy/locale y nombres visuales a configuración si se internacionaliza. |
| `BlogLayout.astro` | `GENERALIZE` | Fija `es-ES`, labels “Blog/Actualizado”, breadcrumb `/blog/`, CTA final Ausart y estructura de relacionados. También falta schema `Article`. |

`BaseLayout` acepta un único `Record<string, unknown>` como structured data. El starter debería aceptar uno o varios nodos JSON-LD, validar que los datos vienen de funciones constructoras y evitar que cada página invente schemas incompatibles.

### Páginas y routing

| Elemento | Categoría | Decisión |
| --- | --- | --- |
| Patrón `getStaticPaths` + filtro `draft` | `REUSE` | Conservar para colecciones publicables. Centralizar el predicado `isPublished`. |
| Índices y detalle dinámico de blog | `GENERALIZE` | La arquitectura se conserva; copy, locale, CTA, autor y rutas deben ser configurables. |
| Índices y detalle de servicios/patologías | `GENERALIZE` | Reutilizables solo si las colecciones son módulos opcionales y las taxonomías se renombran a conceptos neutrales o de dominio. |
| Home y páginas estáticas | `PROJECT_SPECIFIC` | Su contenido, orden, SEO y composición narran la propuesta de Ausart. Crear páginas demo mínimas desde cero. |
| `/sobre-ausart/`, `/tarifas/`, `/neurorehabilitacion-pamplona-metodo/` | `PROJECT_SPECIFIC` | Marca, precios, método y estrategia SEO local de Ausart. |
| `/politica-de-privacidad/`, `/aviso-legal/` | `PROJECT_SPECIFIC` | No usar como plantilla legal. Contienen titular, ubicación, proveedores y supuestos que requieren revisión jurídica por proyecto. |
| `/contacto/`, `/reserva-una-primera-visita/`, `/datos-recibidos/` | `GENERALIZE` | El patrón de contacto/confirmación puede reutilizarse; copy, campos, consentimientos, noindex, evento de conversión y proveedor deben configurarse. |
| `404.astro` | `GENERALIZE` | Conservar estructura, sustituir marca, copy y enlaces por configuración neutral. |
| `sitemap.xml.ts` | `GENERALIZE` | Las rutas estáticas y prefijos están hardcodeados. Convertir a configuración/descubrimiento o retirar en favor de la integración oficial. |

La ruta dinámica de patologías es un ejemplo claro de falsa genericidad: combina un fallback aparentemente reusable con copy clínico, Pamplona, Método Ausart, aviso sanitario, rutas fijas, logos como máscara, CTA de evaluación y una estructura editorial guardada fuera del Markdown en `src/data/pathologies.ts`.

### Content collections

| Elemento | Categoría | Observaciones |
| --- | --- | --- |
| Campos SEO compartidos y `draft: true` por defecto | `REUSE` | Buen control de publicación. Añadir validación de rutas de imagen, fechas y unicidad de slug. |
| Colección `blog` | `GENERALIZE` | El autor por defecto “Ausart Neuro” y categoría “Provisional” deben salir de la configuración. |
| Colecciones `servicios` y `patologias` | `GENERALIZE` | Los esquemas son útiles para una vertical de servicios, pero no pertenecen al core universal. Ofrecer presets o módulos de ejemplo. |
| Campos clínicos y copy real de Markdown | `PROJECT_SPECIFIC` | No copiar textos, casos, patologías, servicios, SEO, relaciones ni URLs de origen. |
| `sourceUrl` | `OPTIONAL_TOOLKIT` | Útil durante migraciones; no debe formar parte obligatoria del modelo editorial de producción. |
| `layoutVariant: clinical` y campos de bloques clínicos | `OPTIONAL_TOOLKIT` | Puede evolucionar a un sistema de bloques o preset de “service site”, separado del core. |

El starter no debería incluir los 24 posts, las 6 patologías/archivos de patología ni las 4 fichas de servicio actuales. Como máximo debería crear contenido ficticio breve, inequívocamente demo y sin afirmaciones sanitarias.

### Datos, navegación y CTAs

| Elemento | Categoría | Observaciones |
| --- | --- | --- |
| `src/data/site.ts` como punto de entrada | `GENERALIZE` | La idea es correcta, pero hay aliases duplicados y faltan locale, dirección, SEO estructurado, formularios, analytics y feature flags. |
| Tipos y arrays de navegación | `GENERALIZE` | La estructura jerárquica es reusable; labels, slugs, categorías, orden y CTA son Ausart. El campo `order` no siempre es la autoridad real si ya depende del orden del array. |
| Catálogo de CTAs | `GENERALIZE` | Mantener el patrón de variantes tipadas, reemplazar variantes clínicas por slots configurables y evitar duplicados entre `site.mainCTA` y `ctas.ts`. |
| Modelo de reseñas con `visible`, `featured` y `consentStatus` | `REUSE` | Es un buen guardrail. Generalizar estados, fuente, fecha ISO y política de identidad. |
| Reseñas reales | `PROJECT_SPECIFIC` | Incluyen nombres y testimonios reales; no copiar aunque sean públicos. |
| `services.ts`, `pathologies.ts`, `method.ts` | `PROJECT_SPECIFIC` como contenido; `GENERALIZE` como patrón | No copiar los datos. Evaluar transformar el patrón de “presentación estructurada” en schemas de bloques neutrales. |

### Estilos y design tokens

La arquitectura de tokens es reusable, pero los valores actuales son la identidad visual de Ausart. Además, numerosos componentes todavía usan colores, radios, anchos y sombras literales (`#fff`, `rgb(...)`, `26px`, `28px`, `1120px`), por lo que la extracción no estará completa mientras el tema se pueda reconocer por estilos locales.

Clasificación:

- `REUSE`: separación `tokens.css` / `global.css` / CSS encapsulado, escala fluida con `clamp`, enfoque mobile-first, foco visible y reduced motion.
- `GENERALIZE`: nombres `--brand-blue`, `--brand-green`, `--brand-pink`, `--brand-brown-*`, `--container-home-*`; deben convertirse en tokens base y semánticos.
- `PROJECT_SPECIFIC`: hexadecimales, gradientes, sombras y composición cromática actuales de Ausart.
- `PROJECT_SPECIFIC`: Manrope como elección de marca y sus archivos TTF, salvo que licencia y decisión del starter se documenten expresamente.

Los design tokens objetivo deberían centralizar:

- Color base: escalas neutrales y de marca (`--palette-*`) sin significado de componente.
- Color semántico: fondo, superficie, texto, texto atenuado, heading, borde, enlace, foco, primary, secondary, accent, success, warning y error.
- Tipografía: familias, pesos disponibles, tamaños, line-height, tracking y medidas de lectura.
- Espaciado: escala consistente y espacios de página/sección/hero.
- Layout: contenedores, gutters, anchos de lectura y breakpoints documentados.
- Forma: radios y grosores de borde.
- Elevación: niveles de sombra semánticos.
- Motion: duraciones, easings y desplazamientos de reveal/hover.
- Z-index: header, dropdown, modal y overlay.
- Assets decorativos: activar/desactivar marca de agua; nunca fijar `/images/brand/logo-mark.svg` dentro de un componente.

La capa semántica debe permitir cambiar de marca sustituyendo tokens y assets, sin editar componentes.

### Fuentes e imágenes

| Elemento | Categoría | Decisión |
| --- | --- | --- |
| Convenciones de carpetas y alt text | `REUSE` | Mantener estructura y workflow de accesibilidad. |
| `fonts.css` y familias Manrope | `GENERALIZE` | Generar desde una configuración/preset o aportar system stack por defecto. No copiar binarios sin verificar licencia. |
| Logos, favicons y OG de Ausart | `PROJECT_SPECIFIC` | Excluir todos los SVG/ICO/JPG de marca. Crear placeholders propios del starter. |
| Fotos, ilustraciones y PDF | `PROJECT_SPECIFIC` | Excluir por derechos, contexto clínico, nombres, peso y riesgo de contenido personal/sanitario. |
| Auditoría de peso | `OPTIONAL_TOOLKIT` | El algoritmo es útil y puede parametrizar roots, límites, formatos y directorio de informes. |
| Optimización crítica | `OPTIONAL_TOOLKIT` | La implementación actual contiene una lista explícita de imágenes Ausart; extraer solo el motor, nunca la lista. |

El inventario público contiene archivos duplicados entre blog y patologías, nombres con espacios/acentos o generados (`image.png`, UUIDs, `Gemini_Generated_*`, `ChatGPT Image *`) y varios PNG entre aproximadamente 2 MB y 6.6 MB. Nada de ese corpus debe convertirse en contenido demo. El starter debe incluir presupuesto de imágenes, convenciones de nombre, detección de duplicados y preferencia por formatos optimizados.

### SEO y structured data

| Elemento | Categoría | Observaciones |
| --- | --- | --- |
| Title template, description, canonical, OG y Twitter | `GENERALIZE` | Buena base, dependiente de `site.url`, `brandName`, imagen social y un único idioma. |
| Sitemap y `robots.txt` | `GENERALIZE` | Dominio y rutas de Ausart hardcodeados. `robots.txt` debería generarse o templarse desde la URL canónica. |
| JSON-LD de Home | `GENERALIZE` | Los nodos `Organization` y `WebSite` son reutilizables como constructores; los valores son Ausart. |
| Schemas `Article`, `BreadcrumbList`, `FAQPage`, `LocalBusiness` | Pendiente / `GENERALIZE` | La documentación los menciona, pero no están implementados salvo `Organization` y `WebSite` en Home. No asumir cobertura existente. |
| SEO local y mapas de intención | `PROJECT_SPECIFIC` | Pamplona, Navarra, servicios y patologías son estrategia de Ausart. |
| Redirects históricos | `PROJECT_SPECIFIC` | Son patrimonio SEO del dominio antiguo; nunca deben copiarse al starter. |

El starter debería ofrecer helpers tipados para `WebSite`, `Organization`, `Article`, `BreadcrumbList` y opcionalmente `LocalBusiness`, con campos omitidos cuando no existen. No debe inferir que todo proyecto es una organización sanitaria, negocio local o servicio a domicilio.

### Formularios

| Elemento | Categoría | Observaciones |
| --- | --- | --- |
| Semántica de campos, honeypot, límites, validación y escape | `GENERALIZE` | El patrón es valioso; textos, campos, consentimiento, contextos y resultado son específicos. |
| `ContactForm.astro` | `GENERALIZE` | Fija rutas, motivos, “primera evaluación gratuita”, ejemplos de Pamplona, copy clínico y política de privacidad. Debe recibir schema/campos/copy/endpoints por configuración. |
| `functions/api/contact.ts` | `OPTIONAL_TOOLKIT` | Buen ejemplo server-side con redacción de logs; está acoplado a Cloudflare Pages, Brevo, Ausart, campos clínicos y `/datos-recibidos/`. |
| Brevo | `OPTIONAL_TOOLKIT` | Implementar como adaptador intercambiable; nunca como dependencia conceptual del starter. |
| Turnstile, rate limiting/WAF | Pendiente | La documentación los deja como decisión futura. El honeypot no sustituye controles antiabuso de producción. |

La política de privacidad y los textos que recomiendan no enviar datos clínicos son correctos para el contexto actual, pero no son una plantilla legal. Cada proyecto debe definir responsable, finalidad, base jurídica, proveedores, retención, derechos, cookies, analytics y transferencias con revisión humana.

### Navegación

El modelo `NavigationItem` con hijos es `GENERALIZE`; el comportamiento responsive y accesible de `Header` es una base valiosa. Sin embargo, la navegación actual presupone:

- taxonomías `Patologías` y `Servicios`;
- una jerarquía concreta de “Sobre Ausart”;
- rutas españolas con trailing slash;
- un solo CTA tomado como `navigationCtas[0]`;
- Instagram como única red visible;
- un idioma y labels fijos;
- teléfono visible como parte del lockup.

El starter debe aceptar grupos de navegación, acciones y redes como arrays, validar enlaces internos, marcar estado activo y poder funcionar sin teléfono, redes, submenús o CTA.

### Reseñas

El guardrail de publicación es uno de los mejores candidatos a `REUSE`: solo mostrar entradas `visible` y con consentimiento aprobado. Antes de incorporarlo al starter conviene:

- separar datos del widget mediante props;
- usar fechas ISO y formatearlas por locale;
- no fijar Google como fuente;
- permitir desactivar rating o fuente;
- aclarar quién es responsable de verificar consentimiento y derecho de publicación;
- incluir datos demo inventados y etiquetados como tales, o ningún testimonio por defecto.

Los nombres, textos, fechas relativas e identificadores actuales son `PROJECT_SPECIFIC` y potencialmente datos personales; deben excluirse.

### Redirects y producción

`public/_redirects` y `astro.config.mjs` contienen aliases de WordPress, slugs clínicos, rutas editoriales y decisiones 301 de Ausart. Son `PROJECT_SPECIFIC`.

El starter puede incluir como `OPTIONAL_TOOLKIT`:

- un archivo de redirects vacío con ejemplos ficticios;
- validación de sintaxis y detección de cadenas/bucles;
- paridad entre inventario legado, build y reglas;
- smoke test configurable contra una URL pasada por argumento.

No debe incluir `ausartneuro.es`, URLs de Cloudflare Preview, rutas reales, mapa de URL ni informes históricos.

### Analytics

No hay implementación activa detectada. La plantilla debería seguir opt-out por defecto y ofrecer un adaptador opcional, condicionado a:

- proveedor e ID configurados exclusivamente por entorno;
- consentimiento/cookies cuando aplique;
- exclusión automática si el ID está vacío;
- eventos tipados para navegación, CTA y envío confirmado;
- documentación para evitar contabilizar una visita directa a una página de gracias como conversión;
- test que busque IDs y dominios conocidos en el output.

### Scripts y herramientas de migración

| Script | Categoría | Acción futura |
| --- | --- | --- |
| `audit-image-weights.mjs` | `OPTIONAL_TOOLKIT` | Parametrizar directorios, umbrales, formatos y salida. |
| `optimize-critical-images.mjs` | `OPTIONAL_TOOLKIT` | Separar motor de manifest; eliminar todas las rutas Ausart. |
| `check-url-parity.mjs` | `OPTIONAL_TOOLKIT` | Mantener como comando de migración, con rutas/config por CLI. |
| `check-live-redirects.mjs` | `OPTIONAL_TOOLKIT` | Mantener aceptación de base URL; neutralizar ejemplo de Cloudflare/Ausart y formato de informe. |
| `wp-export.mjs` | `OPTIONAL_TOOLKIT` | Requerir base URL por argumento/env, permitir paginación robusta y nunca traer datos al core. |
| `wp-analyze.mjs` | `OPTIONAL_TOOLKIT` | Generalizar taxonomías, paths y formato de reports. |
| `wp-convert-dry-run.mjs` | `OPTIONAL_TOOLKIT` | Sustituir autor Ausart y schemas clínicos por mappings configurables; conservar revisión humana obligatoria. |
| `wp-download-media.mjs` | `OPTIONAL_TOOLKIT` | Parametrizar entrada/salida, límites, MIME, tamaño, retries y manifest de licencias. |
| Todo `migration/raw`, `processed`, `assets`, `drafts`, `reports` | `PROJECT_SPECIFIC` | Excluir del repositorio starter. Solo recrear estructura vacía al activar el toolkit. |

La separación más segura es un paquete o carpeta `toolkits/migration-wordpress` que no se instale ni ejecute en un proyecto nuevo salvo elección explícita.

### Documentación

Documentación reutilizable como base conceptual, pero que necesita reescritura para eliminar Ausart:

- `docs/architecture.md`: conservar separación por capas, collections y criterio de publicación; reescribir nombres, ejemplos y estrategia pública.
- `docs/assets.md`: conservar convenciones, alt text, formatos, pesos y licencias; eliminar inventario y rutas de marca.
- `docs/blog-workflow.md`: conservar workflow de draft, frontmatter, imágenes, revisión y build; neutralizar tono clínico, WordPress y slugs.
- `docs/content-workflows.md`: conservar patrones de mantenimiento; separar módulos opcionales y eliminar Método Ausart.
- `docs/design-system.md`: conservar reglas de tokens, contraste, responsive y jerarquía; reemplazar todos los valores y composiciones de marca.
- `docs/reviews-workflow.md`: conservar consentimiento, visibilidad y no invención; eliminar reseñas/fuentes concretas.
- `docs/seo-workflow.md`: conservar canonicals, headings, drafts, sitemap y redirects; reescribir SEO local y arquitectura de contenido.
- `docs/services-workflow.md` y `docs/pathologies-workflow.md`: convertir en documentación de presets opcionales, no core.
- `docs/templates/*`: reutilizar solo después de alinearlas con el schema real y usar contenido ficticio neutral.
- `docs/manual-de-uso.md`: reescritura completa. Actualmente incluye teléfono/correo, cuenta interna `admin@ausartneuro.es`, proveedor, marca, rutas, decisiones SEO y operación de Ausart.
- `docs/deployment-cloudflare-pages.md`: `OPTIONAL_TOOLKIT`; convertir en guía de un adaptador de despliegue.
- `docs/url-parity-checklist.md` y `docs/migration-plan.md`: `OPTIONAL_TOOLKIT`; generalizar para migraciones.
- `docs/seo-content-map.md`, `docs/seo-intent-map.md`, `docs/seo-roadmap-ausart.md`, `docs/production-launch-checklist.md` actual: `PROJECT_SPECIFIC`; no copiar. Crear equivalentes vacíos o guías neutrales desde cero.
- `migration/reports/*` y `docs/lab/*`: `PROJECT_SPECIFIC`; son historial y prototipos del proyecto, no documentación de producto reusable.
- `AGENTS.md`, `CLAUDE.md` y `README.md`: reescritura completa para que no preserven dominio, clínica, migración activa ni reglas de marca de Ausart.

## Inventario de hardcodings y fugas potenciales

### Marca y dominio

- `src/data/site.ts` centraliza `Ausart Neuro`, `Ausart`, `https://ausartneuro.es`, logos, OG, Instagram y textos de marca, pero también duplica valores mediante `legacySiteAliases` y campos equivalentes (`brandName/name`, `description/shortDescription`, `location/area`, `mainCTA/primaryCta`).
- `astro.config.mjs`, `public/robots.txt`, `src/pages/sitemap.xml.ts` y Home repiten dominio o datos que deberían derivarse de una única configuración.
- `Header`, `CTA`, `BlogCard`, `ReviewsWidget`, `FirstEvaluationCta`, páginas y function de contacto contienen “Ausart Neuro” fuera de `site.ts`.

### Localización y sector

- “Pamplona y Comarca” aparece en navegación, formularios, Hero clínico, Home, páginas de contacto, método, legales, tarifas, datos de servicios/patologías, contenidos, SEO y redirects.
- “Navarra” aparece principalmente en contenido y documentación SEO/migración.
- Ejemplos de municipio (`Pamplona, Barañáin, Iturrama, Mendillorri`) están dentro de `ContactForm`.
- Servicios sanitarios, patologías, “rehabilitación neurológica”, “terapia ocupacional”, domicilio y avisos clínicos están presentes en componentes que por nombre parecen genéricos.

### Contacto y formularios

- Email público: `hola@ausartneuro.es`.
- Teléfono público: `+34 621 086 459`.
- Instagram: `https://www.instagram.com/ausartneuropamplona/`.
- La documentación contiene además `admin@ausartneuro.es`, que no debe pasar al starter ni a documentación pública.
- Acción fija: `/api/contact`; resultado fijo: `/datos-recibidos/`; privacidad fija: `/politica-de-privacidad/`.
- Variables: `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `CONTACT_RECIPIENT_EMAIL`, `BREVO_LIST_ID`, `SITE_URL`.
- Endpoint fijo de proveedor: `https://api.brevo.com/v3/smtp/email`.
- Subject, cuerpo de email, contextos, campos y recordatorios nombran Ausart y la evaluación gratuita.

No se encontraron valores reales de secretos en los archivos auditados; `.env.example` contiene claves vacías. Aun así, antes de extraer debe ejecutarse un escaneo de secretos sobre archivos versionados, historial Git si se va a preservar, artefactos generados y reports de migración.

### URLs, SEO y schemas

- `astro.config.mjs` fija dominio, exclusión de sitemap y tres redirects de patologías.
- `public/_redirects` contiene el mapa histórico de WordPress y rutas reales.
- `src/pages/sitemap.xml.ts` fija todas las rutas estáticas y los prefijos de collections.
- Navegación, cards, Hero, CTAs, breadcrumbs y páginas fijan numerosos slugs.
- Solo se detecta JSON-LD efectivo en Home: `Organization` y `WebSite`. No hay implementación efectiva de `Article`, `BreadcrumbList` o `FAQPage`, aunque aparecen en el roadmap.
- Los campos de schema de Home se alimentan parcialmente desde `site`, pero el tipo y la elección de nodos siguen siendo una decisión de Ausart.

### Imágenes y fuentes

- Componentes visuales fijan `/images/home/home-hero-domicilio-ausart.webp` y `/images/brand/logo-mark.svg`.
- `site.ts` fija todas las rutas de logos/OG.
- Content, data y páginas contienen rutas a imágenes clínicas/editoriales.
- Hay duplicados y originales pesados en `public`, además de copias en `migration/assets/downloaded`.
- Manrope y Plus Jakarta Sans están en `public/fonts`, pero `fonts.css` declara Manrope. La presencia de Plus Jakarta Sans sin uso aparente no debe convertirse en dependencia del starter.

## Componentes con genericidad aparente pero dependencia real

1. `Hero`: props configurables, pero asset, destinos y taxonomía están fijados.
2. `CTA`: variantes centralizadas, pero copy por defecto y marca de agua son Ausart.
3. `ReviewsWidget`: importa datos globales directamente y presupone Google/Ausart.
4. `BlogLayout`: parece un layout editorial común, pero incorpora locale español, CTA de Ausart y ruta de blog fija.
5. `Header`: navegación data-driven, pero especializa teléfono, Instagram, claim sanitario y primer CTA.
6. `PricingCard`: UI genérica con destino fijo `/contacto/`.
7. `PathologyCard` y `ServiceCard`: fallbacks de URL y semántica de dominio dentro del componente.
8. `ClinicalServiceDetail`: componentiza bien, pero la secuencia y el cierre comercial/clínico son rígidos.
9. `BaseLayout`: SEO reusable, pero idioma, template de título, OG y schema no son multi-sitio.
10. `Logo`: obtiene rutas desde configuración, pero sus variantes, filesystem check y sizing reflejan el set de Ausart.

## Configuración objetivo de `src/data/site.ts`

`site.ts` debe ser la única fuente tipada para identidad y defaults del sitio, sin aliases heredados. No debe guardar secretos ni contenido editorial largo. Propuesta conceptual:

```ts
export const site = defineSiteConfig({
  identity: {
    name: 'Example Site',
    shortName: 'Example',
    tagline: 'A short, neutral tagline',
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
    titleTemplate: '%s | Example Site',
    defaultTitle: 'Example Site',
    defaultDescription: 'Replace before launch.',
    defaultImage: '/images/brand/og-default.jpg',
    twitterCard: 'summary_large_image',
  },
  organization: {
    legalName: undefined,
    organizationType: 'Organization',
    email: undefined,
    phone: undefined,
    address: undefined,
    serviceArea: undefined,
  },
  assets: {
    logo: { default: '', horizontal: '', vertical: '', mark: '' },
    favicon: '/favicon.svg',
  },
  social: [],
  navigation: {
    homeLabel: 'Inicio',
    primaryActionId: undefined,
  },
  routes: {
    home: '/',
    blog: '/blog/',
    contact: '/contacto/',
    privacy: '/politica-de-privacidad/',
    legal: '/aviso-legal/',
    success: '/mensaje-recibido/',
  },
  features: {
    blog: true,
    reviews: false,
    contactForm: false,
    analytics: false,
  },
});
```

Además:

- Navegación compleja y copy de CTAs deben seguir en archivos dedicados, referenciando IDs de rutas en lugar de repetir slugs.
- Analytics y formularios deben tener configuración pública tipada separada y secretos solo en entorno server-side.
- Los valores obligatorios de producción deben validarse en build, con placeholders que hagan fallar un build de producción.
- No usar strings como “Pendiente de confirmar” para ausencia de URL; usar `undefined`.
- El tipo de organización/schema debe ser opcional y no asumir `LocalBusiness` ni actividad sanitaria.

## Estructura objetivo de `astro-web-starter`

```text
astro-web-starter/
├─ public/
│  ├─ images/
│  │  ├─ brand/
│  │  └─ demo/
│  ├─ fonts/
│  ├─ favicon.svg
│  └─ robots.txt                 # generado o claramente templado
├─ src/
│  ├─ components/
│  │  ├─ primitives/             # Button, Section, ContentImage, highlights
│  │  ├─ navigation/             # Header, Footer, Breadcrumbs
│  │  ├─ content/                # cards, FAQ, related content
│  │  ├─ marketing/              # Hero, CTA, Reviews; todos por props
│  │  └─ forms/                  # UI neutral, sin proveedor
│  ├─ content/
│  │  └─ blog/                   # 1–2 demos inequívocamente ficticias
│  ├─ data/
│  │  ├─ site.ts
│  │  ├─ navigation.ts
│  │  └─ actions.ts
│  ├─ layouts/
│  │  ├─ BaseLayout.astro
│  │  ├─ PageLayout.astro
│  │  └─ ArticleLayout.astro
│  ├─ lib/
│  │  ├─ content.ts              # publicación, orden y relaciones
│  │  ├─ routes.ts               # helpers y rutas tipadas
│  │  ├─ seo.ts                  # metadatos y canonicals
│  │  └─ structured-data.ts      # constructores JSON-LD
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ 404.astro
│  │  └─ blog/
│  └─ styles/
│     ├─ reset.css
│     ├─ tokens.css
│     ├─ theme.css
│     ├─ typography.css
│     └─ global.css
├─ adapters/
│  ├─ forms/
│  │  ├─ brevo-cloudflare/
│  │  └─ README.md
│  ├─ analytics/
│  └─ deployment/
├─ toolkits/
│  ├─ migration-wordpress/
│  ├─ redirects/
│  └─ images/
├─ docs/
│  ├─ getting-started.md
│  ├─ architecture.md
│  ├─ configuration.md
│  ├─ content.md
│  ├─ design-system.md
│  ├─ seo.md
│  ├─ forms.md
│  ├─ deployment.md
│  └─ extraction-safety-checklist.md
├─ tests/
│  ├─ build/
│  ├─ content/
│  └─ leakage/
├─ .env.example
├─ astro.config.mjs
├─ package.json
├─ README.md
└─ tsconfig.json
```

Los módulos de servicios, patologías, negocio local, reseñas, formularios, analytics y WordPress deben ser opt-in. El starter core debe poder compilar sin ellos.

## Riesgos y controles

| Riesgo | Severidad | Evidencia | Control propuesto |
| --- | --- | --- | --- |
| Filtrar marca o datos de contacto de Ausart | Alta | Nombre, email, teléfono, Instagram y cuenta interna repartidos entre data/docs/componentes. | Allowlist de archivos a portar, placeholders obligatorios y test de leakage por patrones. |
| Copiar contenido clínico o testimonios | Alta | Markdown, `pathologies.ts`, `method.ts`, `reviews.ts` y páginas contienen material real. | No copiar `src/content`, `src/data` ni páginas en bloque; demos escritas desde cero. |
| Copiar imágenes/logos/fuentes sin derechos claros | Alta | Corpus de marca, fotos, PDF y fuentes locales. | Starter con assets propios mínimos; manifest de licencias y escaneo de hashes/nombres. |
| Mantener URLs antiguas o canonicals | Alta | Dominio en Astro, robots, sitemap, redirects, scripts y frontmatter. | Test que falle ante `ausart`, dominio, slugs y orígenes prohibidos; URL única validada. |
| Copiar analytics | Alta aunque no esté activo | Puede aparecer después o en configuración de despliegue. | Analytics desactivado por defecto, IDs solo por entorno y escaneo del build. |
| Copiar formularios y destinatarios | Alta | Endpoint Brevo, variables, subject y rutas de confirmación. | Adaptador opt-in, variables nuevas, prueba con sandbox y revisión de privacidad. |
| Copiar secretos | Crítica | No hay valores detectados, pero hay integración real y reports. | Escaneo de working tree e historial; nunca copiar `.env`; rotar si aparece cualquier valor. |
| Copiar configuración de producción | Alta | Cloudflare/Brevo, dominio, redirects, robots y launch docs. | Configuración demo separada, checklist de go-live y ningún project/account ID. |
| Duplicar sitemap o generar señales SEO divergentes | Media | Integración oficial y sitemap manual coexisten. | Elegir una autoridad y probar output. |
| Dependencias innecesarias entre proyectos | Media | Componentes importan data global; clinical detail depende de collection/CTA concretos. | Dependency rules: primitives sin imports de `data`, componentes por props, adaptadores aislados. |
| Heredar vertical sanitaria como core | Alta | Taxonomías y copy clínico atraviesan schemas, rutas y componentes. | Core neutral; preset de servicios opcional y sin contenido Ausart. |
| Demos publicadas accidentalmente | Media | Uso de “Provisional/TODO” y drafts. | `draft: true` por defecto, flag `demo`, build de producción que falle con placeholders/TODO. |
| Privacidad en reseñas y formularios | Alta | Nombres reales, mensajes potencialmente sensibles y consentimiento. | Sin datos reales en starter, minimización, adapter docs y tests de logs. |
| Assets pesados y duplicados | Media | PNG duplicados y varios archivos multimégabyte. | Presupuesto, manifest, auditoría y optimización opt-in. |

Patrones mínimos de leakage que deben bloquear el starter: `Ausart`, `Ausart Neuro`, `ausartneuro.es`, `Pamplona`, `Navarra`, teléfono actual, emails del dominio, Instagram actual, nombres de personas de reseñas, slugs clínicos actuales, endpoints/previews de despliegue e IDs de proveedores. La búsqueda debe cubrir código, Markdown, JSON, CSV, assets por nombre, output compilado y Git history si se reutiliza historia.

## Proceso de extracción por fases

### Fase 0: congelar alcance y criterios

- Crear un repositorio nuevo sin relación de despliegue con Ausart.
- Definir core, módulos opt-in y lista explícita de exclusión.
- Acordar licencia del starter y procedencia/licencia de cualquier asset o fuente.
- Crear patrones de leakage y criterios de aceptación antes de copiar nada.

### Fase 1: bootstrap limpio

- Inicializar Astro/TypeScript desde cero con dependencias mínimas.
- Añadir configuración tipada neutral y placeholders que fallen en producción.
- Añadir tests de build y leakage antes de incorporar componentes.

### Fase 2: extraer primitives

- Portar un componente cada vez desde la allowlist.
- Eliminar imports a datos globales y sustituir colores literales por tokens semánticos.
- Probar accesibilidad, responsive y reduced motion con contenido ficticio.

### Fase 3: layouts y SEO

- Extraer layouts sin Header/Footer obligatorios o mediante slots.
- Implementar helpers de canonical, metadatos y JSON-LD tipado.
- Elegir una sola estrategia de sitemap y generar robots desde configuración.

### Fase 4: contenido y navegación

- Añadir blog genérico mínimo y predicado común de publicación.
- Implementar navegación, actions y breadcrumbs configurables.
- Crear demos nuevas, no derivadas del copy de Ausart.

### Fase 5: módulos opcionales

- Extraer reseñas como módulo sin datos.
- Generalizar catálogo de servicios y page builder solo si existe demanda real.
- Mantener fuera del core cualquier modelo de patologías o contenido clínico.

### Fase 6: adaptadores

- Diseñar contrato neutral de formulario y después adaptar Brevo/Cloudflare.
- Añadir analytics únicamente como opt-in.
- Añadir presets de hosting sin identificadores de cuenta/proyecto.

### Fase 7: toolkits de migración

- Copiar lógica de scripts, no inputs, outputs ni manifests de Ausart.
- Parametrizar paths, origen, autor, mappings y reports.
- Ejecutarlos solo sobre fixtures ficticios y documentar revisión humana.

### Fase 8: documentación y validación

- Reescribir manual y guías desde la perspectiva de un proyecto nuevo.
- Probar instalación limpia, build, preview y reemplazo completo de marca.
- Ejecutar escaneo final de secretos, contenido, URLs, assets y output.
- Confirmar que no existe conexión con producción de Ausart.

La web actual debe permanecer intacta durante todas las fases. Cualquier aprendizaje o corrección detectada al extraer debe convertirse en una tarea separada para Ausart, con revisión propia; nunca sincronizar automáticamente los repositorios.

## Recommended extraction sequence

1. Crear un repositorio vacío `astro-web-starter` con Astro, TypeScript estricto y sin copiar archivos de Ausart.
2. Añadir un test de leakage con la lista de nombres, dominios, teléfonos, emails, slugs e IDs prohibidos.
3. Definir `SiteConfig` y crear un `src/data/site.ts` neutral, sin aliases ni secretos.
4. Crear tokens base y semánticos neutrales con un system font stack y sin paleta Ausart.
5. Portar y verificar `Button.astro` usando únicamente tokens semánticos.
6. Portar y verificar `Section.astro`, renombrando variantes `home-*` a tamaños neutrales.
7. Portar `ContentImage.astro`, `TitleHighlight.astro` y `SectionTransition.astro` con APIs neutrales.
8. Portar `RevealObserver.astro` y añadir una prueba de reduced motion/no-JS.
9. Generalizar `Breadcrumbs.astro` para labels, raíz, locale y schema opcional.
10. Generalizar `Logo.astro` con assets por props/config y fallback sin filesystem acoplado si es viable.
11. Crear `BaseLayout.astro` neutral con idioma, title template, canonical, OG y arrays JSON-LD configurables.
12. Crear helpers tipados de `WebSite`, `Organization`, `Article`, `BreadcrumbList` y `FAQPage`.
13. Elegir y probar una única estrategia de sitemap; generar `robots.txt` desde la URL configurada.
14. Portar `PageLayout.astro` y crear un `ArticleLayout.astro` neutral sin CTA ni ruta fija.
15. Generalizar `Header.astro` para grupos, acciones, redes y estado activo recibidos por props.
16. Generalizar `Footer.astro` para columnas configurables y ausencia válida de datos legales/contacto.
17. Crear un catálogo tipado de rutas y actions; eliminar slugs repetidos de los componentes.
18. Añadir una colección blog mínima con `draft: true` por defecto y contenido demo escrito desde cero.
19. Portar cards, FAQ y related content uno a uno, sin vocabulario sanitario ni assets Ausart.
20. Generalizar `Hero.astro` y `CTA.astro` para imágenes, decoración y listas de acciones por props.
21. Extraer el modelo de consentimiento y el carrusel de reseñas como módulo opt-in, sin testimonios reales.
22. Diseñar un contrato provider-agnostic para formularios, sin implementar aún ningún proveedor.
23. Extraer Brevo + Cloudflare como adaptador opcional y probarlo solo con variables/fixtures nuevos.
24. Generalizar auditoría y optimización de imágenes como toolkit con manifest configurable.
25. Generalizar paridad de URLs y validación de redirects como toolkit sin mapas históricos.
26. Generalizar scripts WordPress dentro de `toolkits/migration-wordpress` usando fixtures ficticios.
27. Reescribir desde cero README, getting started, arquitectura, configuración, contenido, diseño, SEO y despliegue.
28. Ejecutar build limpio, tests de accesibilidad básicos, escaneo de secretos y escaneo de leakage sobre fuente y output.
29. Crear un proyecto ficticio desde el starter y comprobar que cambiar marca, rutas, locale, tema y módulos no requiere editar primitives.
30. Revisar manualmente el repositorio completo antes de publicar o etiquetar la primera versión.
