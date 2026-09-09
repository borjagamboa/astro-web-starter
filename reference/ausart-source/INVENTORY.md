# Inventario del paquete temporal

Este inventario cubre todos los archivos incluidos. Las rutas de export son relativas a `template-export/`.

| Ruta original | Ruta en el export | Categoría | Motivo | Dependencias importantes | Hardcodings saneados | Generalización posterior |
| --- | --- | --- | --- | --- | --- | --- |
| — | `README.md` | `REUSE` | Explica alcance y uso seguro. | `INVENTORY.md`, notas. | Ninguno; “Ausart Neuro” se conserva deliberadamente como procedencia. | Adaptar al repositorio final. |
| — | `INVENTORY.md` | `REUSE` | Trazabilidad completa de la selección. | Todos los archivos exportados. | Solo menciones deliberadas de procedencia. | Actualizar cuando cambie la allowlist. |
| — | `docs/generalization-notes.md` | `REUSE` | Resume patrones, límites y riesgos. | Plan de extracción y código seleccionado. | Solo mención deliberada de procedencia. | Convertir en decisiones/ADRs del starter. |
| `package.json` | `config-reference/package.json` | `GENERALIZE` | Versiones mínimas reales de Astro y sitemap. | Node, npm. | Nombre de paquete; se retiraron scripts cuyos archivos no se exportan. | Definir nombre, engines y scripts del starter. |
| `astro.config.mjs` | `config-reference/astro.config.mjs` | `GENERALIZE` | Muestra site, trailing slash e integración sitemap. | `@astrojs/sitemap`. | Dominio, exclusión y redirects reales; redirects vaciados. | Cargar origen por configuración y escoger estrategia de sitemap. |
| `tsconfig.json` | `config-reference/tsconfig.json` | `REUSE` | Configuración estricta y simple. | Astro types. | Ninguno. | Ajustar aliases si el starter los añade. |
| `src/content.config.ts` | `config-reference/src/content.config.ts` | `GENERALIZE` | Schemas, SEO común, drafts, relaciones y variantes. | `astro:content`, `astro/loaders`, Zod. | Autor de marca. | Separar core editorial de presets de servicios y patologías. |
| `src/components/common/Breadcrumbs.astro` | `src-reference/src/components/common/Breadcrumbs.astro` | `GENERALIZE` | Estructura semántica simple. | Ninguna. | No contenía datos personales. | Parametrizar home, idioma y schema. |
| `src/components/common/Button.astro` | `src-reference/src/components/common/Button.astro` | `REUSE` | Primitive enlace/botón con variantes. | Tokens CSS. | Ninguno. | Usar tokens semánticos y ampliar atributos de forma segura. |
| `src/components/common/ContentImage.astro` | `src-reference/src/components/common/ContentImage.astro` | `REUSE` | Figura reutilizable con alt y caption. | Tokens CSS. | Ninguno. | Añadir dimensiones, prioridad y `astro:assets` si procede. |
| `src/components/common/Footer.astro` | `src-reference/src/components/common/Footer.astro` | `GENERALIZE` | Composición por columnas y pie legal. | `Logo`, navegación y `site` no incluidos íntegramente. | Marca y ubicación. | Recibir columnas/copy por props y permitir secciones vacías. |
| `src/components/common/Header.astro` | `src-reference/src/components/common/Header.astro` | `GENERALIZE` | Menú móvil/desktop y submenús accesibles. | `Logo`, `Button`, navegación y `site`. | Marca, claim y aria-labels. | Arrays de acciones/redes, active state, Escape y foco. |
| `src/components/common/Logo.astro` | `src-reference/src/components/common/Logo.astro` | `GENERALIZE` | Variantes y fallback cuando falta asset. | Node filesystem en build, `site`. | Marca/alt mediante placeholders de `site`. | Desacoplar tamaños y evaluar evitar filesystem. |
| `src/components/common/RevealObserver.astro` | `src-reference/src/components/common/RevealObserver.astro` | `REUSE` | Animación progresiva con IntersectionObserver. | Selectores `[data-reveal]`, CSS global. | Ninguno. | Parametrizar thresholds si es necesario y probar no-JS. |
| `src/components/common/Section.astro` | `src-reference/src/components/common/Section.astro` | `REUSE` | Shell consistente de secciones. | Tokens y clases globales. | Ninguno. | Renombrar variantes `home-*` a tamaños neutrales. |
| `src/components/common/SectionTransition.astro` | `src-reference/src/components/common/SectionTransition.astro` | `REUSE` | Separadores SVG responsive y decorativos. | Tokens/colores suministrados. | Ninguno. | Nombrar variantes por geometría y roles semánticos. |
| `src/components/common/TitleHighlight.astro` | `src-reference/src/components/common/TitleHighlight.astro` | `REUSE` | Resaltado tipográfico pequeño. | Tokens de color. | Ninguno. | Cambiar tonos físicos por roles semánticos. |
| `src/components/marketing/BlogCard.astro` | `src-reference/src/components/marketing/BlogCard.astro` | `GENERALIZE` | Card editorial con imagen y metadata. | Tokens; rutas de imagen del caller. | Marca visible. | Pasar autor/fallback por props y locale. |
| `src/components/marketing/CTA.astro` | `src-reference/src/components/marketing/CTA.astro` | `GENERALIZE` | Panel CTA con acción secundaria opcional. | `Button`, catálogo `ctas` no incluido, logo decorativo ausente. | Eyebrow de marca. | Eliminar import global y pasar decoración/acciones por props. |
| `src/components/marketing/FAQBlock.astro` | `src-reference/src/components/marketing/FAQBlock.astro` | `REUSE` | FAQ semántica compacta. | Datos por props. | Ninguno. | Añadir schema fuera del componente visual. |
| `src/components/marketing/Hero.astro` | `src-reference/src/components/marketing/Hero.astro` | `GENERALIZE` | Hero responsive con highlight y dos acciones. | `Button`, `TitleHighlight`, `site`, asset demo no incluido. | Asset, rutas y label de acción. | Imagen y lista de acciones completamente configurables. |
| `src/components/marketing/PricingCard.astro` | `src-reference/src/components/marketing/PricingCard.astro` | `GENERALIZE` | Patrón de precio/plan y estado destacado. | `Button`, tokens. | No había datos personales. | Retirar destino fijo y soportar moneda/locale. |
| `src/components/marketing/RelatedContent.astro` | `src-reference/src/components/marketing/RelatedContent.astro` | `REUSE` | Lista de relaciones editoriales. | Items por props. | Ninguno. | Parametrizar labels y heading. |
| `src/components/marketing/ReviewCard.astro` | `src-reference/src/components/marketing/ReviewCard.astro` | `GENERALIZE` | Presentación tipada de reseña. | Tipo/datos de `reviews` no incluidos. | No se copiaron testimonios. | Definir contrato neutral, fecha ISO y política de fuente. |
| `src/components/marketing/ReviewsWidget.astro` | `src-reference/src/components/marketing/ReviewsWidget.astro` | `GENERALIZE` | Carrusel scroll-snap, controles, filtros y fallback. | `ReviewCard`, datos `reviews` no incluidos. | Marca en headings/copy. | Recibir reseñas, fuente y copy por props; conservar consentimiento. |
| `src/components/marketing/ServiceCard.astro` | `src-reference/src/components/marketing/ServiceCard.astro` | `GENERALIZE` | Card visual de catálogo. | Tokens y datos por props. | No contenía identidad real. | Retirar fallback de ruta y neutralizar nomenclatura. |
| `src/data/site.ts` | `src-reference/src/data/site.ts` | `GENERALIZE` | Ejemplo real de centralización global. | Assets no incluidos; componentes consumidores. | Marca, descripción, ubicación, teléfono, email, redes, dominio, OG, CTA y aviso. | Eliminar aliases, tipar config, añadir locale/features/rutas. |
| `src/layouts/BaseLayout.astro` | `src-reference/src/layouts/BaseLayout.astro` | `GENERALIZE` | SEO técnico, canonical, social y JSON-LD. | `Header`, `Footer`, `RevealObserver`, `site`, estilos. | Marca/dominio llegan desde `site` saneado. | Idioma, OG locale/type, arrays JSON-LD y slots. |
| `src/layouts/BlogLayout.astro` | `src-reference/src/layouts/BlogLayout.astro` | `GENERALIZE` | Composición completa de artículo. | `BaseLayout`, breadcrumbs, image, CTA, relacionados. | Marca heredada por CTA; sin contenido real. | Locale/labels/rutas/CTA configurables y schema Article. |
| `src/layouts/PageLayout.astro` | `src-reference/src/layouts/PageLayout.astro` | `REUSE` | Layout interior pequeño y composable. | `BaseLayout`, `Section`. | Ninguno. | Parametrizar solo si se añade i18n/slots extra. |
| `src/pages/blog/index.astro` | `src-reference/src/pages/blog/index.astro` | `GENERALIZE` | Índice con collection, draft, orden y cards. | Collection `blog`, `PageLayout`, `Section`, `BlogCard`. | Descripción editorial sustituida. | Labels, rutas, paginación y filtros. |
| `src/pages/blog/[slug].astro` | `src-reference/src/pages/blog/[slug].astro` | `REUSE` | Patrón de `getStaticPaths`, render y fallback SEO. | Collection `blog`, `BlogLayout`. | Autor real proviene del schema saneado. | Añadir relaciones y schema mediante helpers. |
| `src/pages/sitemap.xml.ts` | `src-reference/src/pages/sitemap.xml.ts` | `GENERALIZE` | Ejemplo de sitemap desde rutas y collections. | `site`, tres collections. | Lista de rutas reales reemplazada por ejemplos. | Escoger si se conserva frente a `@astrojs/sitemap`. |
| `src/styles/global.css` | `src-reference/src/styles/global.css` | `GENERALIZE` | Reset, lectura, shells, grids, foco, motion y responsive. | `tokens.css`, `fonts.css` no incluido. | No contiene identidad textual. | Separar reset/typography y eliminar referencias a font no incluida. |
| `src/styles/tokens.css` | `src-reference/src/styles/tokens.css` | `GENERALIZE` | Sistema real de color, tipografía, layout, spacing y elevation. | Consumido por todo el CSS. | No hay datos personales; paleta de origen se mantiene como referencia visual. | Crear paleta neutral y tokens semánticos, retirar nombres `brand-*` específicos. |

## Elementos estudiados pero descartados

| Elemento | Motivo de exclusión |
| --- | --- |
| `src/content/**` | Contenido editorial/SEO completo, servicios, patologías, relaciones y URLs del proyecto. |
| `src/data/reviews.ts` | Nombres y testimonios reales. El contrato se entiende desde los componentes y notas. |
| `src/data/navigation.ts`, `ctas.ts`, `services.ts`, `pathologies.ts`, `method.ts` | Taxonomía, copy, slugs, oferta y método específicos. Sus consumidores permiten estudiar el patrón sin copiar datos. |
| Home y páginas estáticas | Composición y narrativa estrechamente ligadas a marca, localización y estrategia SEO. |
| Páginas legales | No son plantillas legales; contienen responsable, proveedores y supuestos propios. |
| Detalles de servicios/patologías y componentes clínicos | Vertical sanitaria, copy clínico, rutas y CTA específicos. |
| `ContactForm.astro` y `functions/api/contact.ts` | Acoplamiento a oferta, campos, privacidad, Brevo, Cloudflare y rutas de resultado. Reconstruir como adaptador. |
| `.env.example` | Variables exclusivamente ligadas al adaptador Brevo/Cloudflare no incluido. |
| `public/**` | Marca, imágenes, PDF, fuentes y posibles derechos; ningún asset es imprescindible para entender el patrón. |
| `public/_redirects`, `robots.txt` | Dominio, historial SEO y decisiones de producción. |
| `scripts/**`, `migration/**` | Toolkits opcionales con paths, origen, reports, inputs y manifest específicos. |
| `package-lock.json` | Lockfile expresamente excluido y no útil como referencia conceptual. |
| `dist`, `.astro`, `node_modules` | Artefactos generados. |
| Docs operativas del proyecto | Contienen datos de contacto, producción, estrategia clínica/SEO e historial. |

## Saneamiento aplicado

- Nombre de proyecto y nombre corto → `[PROJECT_NAME]` / `[PROJECT_SHORT_NAME]`.
- Dominio real → `example.com`.
- Teléfono y emails → `[PHONE]`, `[EMAIL]`, `[ADMIN_EMAIL]`.
- Ubicación/área → `[LOCATION]`, `[REGION]`, `[SERVICE_AREA]`.
- Claim y descripciones → placeholders explícitos.
- Instagram real → cuenta de ejemplo.
- Imagen Hero y OG → rutas demo no incluidas.
- Rutas/labels de acción del Hero → ejemplos neutrales.
- Rutas estáticas del sitemap → `/example-page/`.
- Configuración Astro → dominio de ejemplo, success page genérica y redirects vacíos.
- `package.json` → nombre neutral y retirada de scripts no exportados.

Las únicas apariciones deliberadas de “Ausart Neuro” deben estar en `README.md`, este inventario y `docs/generalization-notes.md` para declarar procedencia. Los nombres de variables de Brevo/API no permanecen porque la integración se excluyó por completo.

## Elementos específicos retenidos deliberadamente

- La paleta y escala de `tokens.css` se mantienen como referencia del sistema visual real. No contienen datos personales, pero no deben convertirse automáticamente en el tema del starter.
- Los nombres estructurales españoles de las colecciones `servicios` y `patologias`, y sus campos de schema, se conservan para mostrar el modelado real. No incluyen contenido clínico y deben convertirse en presets opcionales o conceptos neutrales.
- Algunos labels de interfaz en español (`Inicio`, `Blog`, `Actualizado`, `Lectura relacionada`) permanecen para mostrar el contexto de i18n pendiente.
- Las rutas internas genéricas `/blog/`, `/servicios/` y `/patologias/` permanecen en patrones de colección. No son URLs completas ni redirects históricos, pero deberán parametrizarse si el starter cambia idioma o módulos.
- `https://schema.org`/namespace de sitemap, `https://example.com` y la cuenta social `example` son URLs estándar o ficticias necesarias para comprender el código.

No permanecen deliberadamente nombres de personas, testimonios, teléfonos, emails, dominios, destinatarios, IDs externos, secretos, rutas históricas completas, configuración de producción ni assets del proyecto.
