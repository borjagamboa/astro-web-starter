# Notas de generalización

## Principio de uso

El export conserva ejemplos de implementación real para que puedan estudiarse en contexto. No intenta ser autocontenido para compilar y no representa la arquitectura final recomendada. Los imports que apuntan a archivos ausentes señalan fronteras que el futuro starter debe rediseñar, no archivos adicionales que deban copiarse sin revisión.

## Sistema visual

Funciona bien la separación entre `tokens.css`, estilos globales y CSS encapsulado por componente. La escala tipográfica fluida, gutters con `clamp`, anchos de lectura, foco visible, reduced motion y sombras consistentes producen una interfaz estable en móvil y escritorio.

Debe generalizarse la paleta y su nomenclatura. Tokens como `--brand-blue`, `--brand-pink` o `--brand-brown-*` describen la marca de origen; el starter necesita una capa de paleta y otra semántica (`surface`, `text`, `primary`, `accent`, `focus`, `border`). Los colores, anchos, radios y sombras literales dentro de componentes también deben migrar a tokens. No debe copiarse Manrope ni ninguna fuente hasta comprobar licencia; un system stack es un punto de partida más seguro.

No se incluyen assets. Las referencias a `/images/brand/*` o `/images/demo/*` muestran el contrato esperado, no la existencia ni autorización de esos archivos.

## Layouts y SEO

`BaseLayout` resuelve title template, description, canonical, Open Graph, Twitter y JSON-LD con una API pequeña. `PageLayout` alinea encabezado y contenido, y `BlogLayout` ilustra cómo componer breadcrumbs, imagen, metadatos, cuerpo, CTA y relacionados.

El starter debe parametrizar `lang`, locale de fechas, tipo y locale de Open Graph, title template, robots y ruta del blog. Conviene permitir uno o varios nodos JSON-LD y construirlos mediante helpers tipados. El CTA de `BlogLayout` y los labels españoles no deben ser obligatorios.

El proyecto de origen combina `@astrojs/sitemap` con un endpoint manual. Ambas referencias se conservan para entender el estado real, pero el starter debe escoger una sola autoridad. `sitemap.xml.ts` fue saneado y sigue mostrando cómo combinar rutas estáticas con colecciones publicadas.

## Navegación

`Header` aporta un patrón probado de menú móvil, submenús, cierre de estados y navegación desktop con hover/focus. `Footer` muestra columnas derivadas de datos y un pie legal separado. `Breadcrumbs` mantiene una estructura sencilla y accesible.

Debe generalizarse el claim, teléfono, redes, CTA y navegación. El Header presupone una sola red social y usa `navigationCtas[0]`; el futuro componente debería recibir arrays de grupos, acciones y redes, admitir que estén vacíos, marcar la ruta activa y extraer todos los labels a configuración/i18n. `Breadcrumbs` debe parametrizar “Inicio” y podría generar `BreadcrumbList` fuera de la capa visual.

## Hero, CTAs y cards

`Hero` demuestra composición responsive, título parcialmente resaltado, imagen decorativa y acciones. `CTA` usa un panel autocontenido con dos acciones opcionales. Las cards separan estructura, datos y estilos, mientras `ReviewsWidget` incluye scroll-snap, controles y estado vacío.

Las APIs aún contienen supuestos de negocio: rutas por defecto, datos importados globalmente, una máscara de logo y taxonomías concretas. El starter debe pasar imágenes y acciones por props, retirar fallbacks de rutas de negocio y permitir desactivar decoración de marca. `ReviewsWidget` debe recibir reseñas y copy por props; el filtro de consentimiento es un patrón que merece conservarse, pero los datos reales nunca deben acompañarlo.

## Responsive, accesibilidad y motion

Son patrones valiosos:

- CSS mobile-first y grids que crecen en breakpoints claros.
- `aria-expanded`, `aria-controls`, labels de navegación y texto visualmente oculto.
- foco visible consistente.
- carrusel navegable por teclado y scroll-snap.
- `IntersectionObserver` como mejora progresiva.
- respeto a `prefers-reduced-motion`.

Antes de reutilizarlos deben probarse navegación completa por teclado, cierre con Escape, foco al abrir/cerrar submenús, estado activo, contraste con el nuevo tema y comportamiento sin JavaScript.

## Componentes y dependencias

Los primitives más independientes son `Button`, `Section`, `ContentImage`, `TitleHighlight`, `SectionTransition` y `RevealObserver`. `Header`, `Footer`, `Logo`, `Hero`, `CTA`, `ReviewsWidget` y layouts importan datos o componentes que no siempre se incluyen en el export.

La arquitectura objetivo debería imponer estas reglas:

- primitives no importan `src/data`;
- componentes de presentación reciben props;
- composiciones de proyecto pueden importar configuración;
- layouts admiten slots para Header/Footer/CTA;
- rutas se resuelven desde un catálogo tipado;
- assets decorativos se suministran por props o tema.

## Datos globales

`site.ts` demuestra la ventaja de centralizar marca, contacto, logos, redes, origen y SEO. La copia tiene placeholders y no contiene datos reales.

Debe eliminarse la duplicación entre `brandName/name`, `description/shortDescription`, `location/area` y `mainCTA/primaryCta`. La configuración futura debe incluir locale, title template, feature flags, rutas y schema opcional, pero no secretos ni copy editorial largo. Una URL ausente debe ser `undefined`, no un texto “pendiente”.

## Content Collections y blog

`content.config.ts` conserva los schemas reales para enseñar campos SEO compartidos, `draft: true`, fechas, relaciones y variantes de layout. Las colecciones de servicios y patologías son referencias de una vertical de servicios, no parte necesaria del core.

El starter debería empezar solo con una colección editorial neutral, contenido ficticio y un helper común `isPublished`. `sourceUrl` y los campos clínicos deberían vivir en módulos opcionales. La ruta dinámica de blog ilustra `getStaticPaths`, filtro de drafts, `render` y fallback de meta description.

No se incluyó ningún Markdown del proyecto de origen para evitar copiar contenido, SEO, URLs, casos o imágenes.

## Formularios

El proyecto real contiene un formulario accesible con honeypot, límites, consentimiento, validación HTML y un endpoint server-side con validación, escape, redacción de logs y envío mediante Brevo en Cloudflare Pages Functions.

No se copió ese código porque combina textos clínicos, campos de negocio, rutas legales, página de éxito, proveedor y plataforma de hosting. El patrón debe reconstruirse en el starter mediante:

- UI provider-agnostic basada en un schema de campos;
- endpoint/adaptador opt-in;
- secretos exclusivamente server-side;
- validación repetida en servidor;
- rate limiting/Turnstile como decisión de producción;
- copy legal revisado por proyecto;
- evento de conversión emitido solo tras éxito confirmado.

## Integraciones externas

Brevo y Cloudflare son decisiones del proyecto de origen, no infraestructura core. No se incluyeron `.env.example`, Function ni guías de despliegue. Analytics no estaba activo en el código auditado.

El starter debe compilar sin proveedores externos. Cada integración debe tener contrato, feature flag, configuración pública separada de secretos y documentación de privacidad. Nunca deben copiarse account IDs, project IDs, listas, destinatarios ni URLs de preview.

## Contenido, imágenes y páginas

Home, páginas de servicios, patologías, método, tarifas, contacto, legales y FAQs se excluyeron porque su composición está estrechamente ligada al contenido y la estrategia SEO del proyecto. Se conservaron solo el índice y detalle de blog como patrones de routing, con el texto visible específico sustituido.

No se incluyeron imágenes ni fuentes. El starter debe crear assets demo propios, registrar licencia/procedencia, exigir alt text, definir presupuesto de peso y evitar nombres genéricos o duplicados.

## Riesgos pendientes al portar

- Asumir que el export compila aunque faltan dependencias deliberadamente.
- Convertir la paleta de origen en tema por defecto sin decisión consciente.
- Copiar rutas fijas o labels españoles sin capa de configuración.
- Mantener dos sitemaps.
- Importar datos globales dentro de componentes de presentación.
- Añadir formularios o analytics antes de definir privacidad y consentimiento.
- Buscar archivos ausentes en el repositorio de origen y copiarlos sin allowlist.
- Confundir placeholders como `[PROJECT_NAME]` con valores válidos de producción.

La mención de Ausart Neuro en esta nota es deliberada y describe procedencia. Los archivos de código deben permanecer libres de identificadores reales.
