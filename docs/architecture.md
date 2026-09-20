# Arquitectura objetivo

## Propósito

Esta arquitectura describe el destino conceptual de `astro-web-starter`. Todavía no implica que las carpetas, archivos o dependencias existan. Su función es guiar una implementación gradual, neutral y verificable.

El starter debe permitir cambiar marca, contenido, rutas, locale, tema y módulos sin editar primitives ni arrastrar decisiones de otro proyecto. El núcleo debe funcionar sin analytics, formularios, WordPress, un proveedor de email o un hosting concreto.

## Estructura conceptual

```text
astro-web-starter/
├─ src/
│  ├─ components/
│  ├─ content/
│  ├─ data/
│  ├─ lib/
│  ├─ layouts/
│  ├─ pages/
│  └─ styles/
├─ public/
│  ├─ images/
│  └─ fonts/
├─ docs/
└─ scripts/                 # opcional
```

La base mínima de esta estructura ya está implementada. Las áreas restantes se crearán únicamente cuando una fase de implementación las necesite.

## Responsabilidades y límites

### `src/components`

Contiene unidades de interfaz reutilizables. Deben tener una API pequeña, recibir contenido mediante props o slots y depender solo de capas inferiores y estables.

- No contiene páginas completas ni decisiones de routing.
- No importa datos de negocio directamente cuando el componente pueda recibirlos.
- No fija marca, textos comerciales, dominio, teléfono, proveedor, rutas o taxonomías.
- Se favorecen primitives, navegación, bloques de contenido, marketing y formularios visuales como grupos conceptuales, creados solo si hacen falta.

### `src/content`

Contiene contenido editorial gestionado como colecciones cuando la validación y consulta lo justifican: por ejemplo, artículos o recursos.

- El contenido debe ser editable sin modificar componentes.
- Los schemas validan metadatos, publicación, fechas, slugs y assets.
- Los borradores y demos no se publican por defecto.
- Las colecciones de servicios, catálogo u otras verticales son específicas u opcionales; no se presuponen en el core.

### `src/data`

Contiene datos estructurados y configuración pública: identidad, locale, origen canónico, rutas compartidas, navegación, acciones y feature flags.

- Debe existir una sola fuente tipada para cada dato global.
- Navegación y acciones pueden vivir en archivos propios, referenciando rutas centralizadas.
- No contiene secretos, mensajes de formularios, contenido editorial largo ni duplicados heredados.
- Los valores obligatorios de producción deben validarse; la ausencia se representa con valores opcionales, no con falsos textos finales.
- El copy de páginas comerciales vive en objetos específicos por página bajo `src/data/content/`; esa carpeta pertenece al proyecto y no define un schema universal.

### `src/lib`

Contiene contratos y helpers compartidos sin datos de negocio. `src/lib/editorial.ts` define únicamente el vocabulario común de estado editorial y acciones; las formas concretas de Home, About, Contact u otras páginas pertenecen a sus propios objetos de contenido.

### `src/layouts`

Define shells de documento y patrones de composición compartidos.

- Gestiona estructura HTML, slots, metadatos y composición común sin imponer contenido comercial.
- El layout base consume configuración centralizada para idioma, title template, canonical, Open Graph y valores por defecto.
- Los layouts editoriales no deben fijar rutas, CTAs, autores o labels de un proyecto.
- Header y Footer deben poder componerse o sustituirse.

### `src/pages`

Define el routing y compone layouts, componentes, contenido y datos.

- Las páginas deben ser principalmente compositivas.
- La lógica reutilizable, SEO complejo y acceso a datos se extraen a helpers o módulos dedicados cuando aparezcan.
- Cada ruta declara su intención, indexación y metadatos sin duplicar configuración global.
- Las rutas dinámicas filtran borradores y validan slugs de forma coherente.

### `src/styles`

Contiene reset, tokens, tema, tipografía y estilos globales.

- Los design tokens separan valores base de roles semánticos: superficie, texto, borde, foco, primary, estados, espaciado, tipografía, forma, elevación, motion y capas.
- Los componentes consumen roles semánticos, no colores o medidas de una marca concreta.
- El tema debe poder cambiar sin editar la lógica de los componentes.
- Se mantiene un enfoque mobile-first, foco visible y soporte para movimiento reducido.

### `public/images`

Contiene imágenes que deben servirse sin procesamiento de imports, organizadas por finalidad cuando exista una convención acordada.

- Ningún asset de marca o contenido debe heredarse de otro proyecto.
- Cada imagen necesita procedencia, derechos, nombre estable, dimensiones y uso documentado.
- Se controlan duplicados, formatos y presupuestos de peso.

Cuando el pipeline de `astro:assets` sea más adecuado, las imágenes procesables pueden vivir bajo `src` en una ubicación definida durante la implementación; `public/images` no es una obligación para todos los assets.

### `public/fonts`

Contiene fuentes locales aprobadas cuando el proyecto decide alojarlas.

- No se copia una fuente por familiaridad: deben confirmarse licencia, subconjuntos, pesos y formatos.
- El core puede partir de un system font stack y funcionar sin fuentes personalizadas.

### `docs`

Registra arquitectura, configuración, contenido, diseño, SEO, integraciones, migraciones, despliegue y workflows.

- La documentación cambia junto con el comportamiento que describe.
- Distingue reglas del starter, decisiones del proyecto y procedimientos opcionales.
- No almacena secretos ni información operativa sensible.

### `scripts` (opcional)

Contiene herramientas explícitas de validación, auditoría, optimización o migración.

- No forma parte del runtime del sitio.
- Cada script recibe entradas configurables, valida su alcance y evita defaults de producción.
- Outputs, exports, manifests y datos migrados de un cliente no pertenecen al starter.
- Las herramientas especializadas pueden evolucionar a `toolkits` separados en vez de ocupar el núcleo.

## Principios de dependencia

- El contenido editable está separado del diseño.
- Los datos reutilizables y la configuración global tienen una autoridad única y tipada.
- Los componentes tienen pocas responsabilidades y no conocen detalles de negocio innecesarios.
- Las páginas componen; no se convierten en almacenes de lógica duplicada.
- No hay dependencias circulares.
- Los primitives no importan datos globales ni adaptadores.
- Las integraciones externas dependen de contratos internos; el núcleo no depende de proveedores concretos.
- Las herramientas de migración quedan fuera del núcleo de producción.

Un flujo conceptual deseable es:

```text
configuración/contenido/datos → páginas/layouts → componentes → estilos/tokens
                                 ↓
                      adaptadores opcionales
```

Las flechas representan consumo, no autorización para saltarse límites. La implementación concreta deberá definir aliases y reglas solo cuando existan archivos reales.

## Contenido y colecciones

Las content collections se usarán cuando aporten schema, publicación, consultas y un workflow editorial estable. Los campos comunes de SEO y estado de publicación deben reutilizarse. Un predicado central debe decidir qué contenido puede publicarse.

No todas las webs necesitan blog, catálogo, servicios o reseñas. Esas capacidades deben poder desactivarse o no instalarse. El starter no debe incluir contenido real de terceros; los ejemplos, si llegan a existir, serán breves, ficticios, identificados como demo y no publicables por accidente.

## SEO centralizado

La arquitectura debe centralizar:

- URL de sitio, locale y política de trailing slash;
- title template, descripción e imagen social por defecto;
- construcción de canonicals;
- Open Graph y Twitter cards;
- política de indexación;
- una única estrategia de sitemap y robots;
- helpers tipados para los datos estructurados que realmente apliquen.

Los schemas no se añaden por costumbre. `Organization`, `WebSite`, `Article`, `BreadcrumbList`, `FAQPage` o `LocalBusiness` requieren datos reales y una justificación según la página. Los helpers deben omitir campos ausentes y permitir uno o varios nodos JSON-LD coherentes.

## Integraciones externas

Formularios, email, captcha, analytics, mapas, vídeo, CRM y hosting se diseñan como adaptadores opt-in.

- La interfaz y el modelo de datos no dependen del proveedor.
- Los secretos viven en entorno de servidor.
- Un servicio ausente no debe romper el core.
- Se documentan privacidad, consentimiento, errores, límites, observabilidad y procedimiento de prueba.
- Ningún adaptador se conecta a una cuenta o entorno real por defecto.

## Core vs Optional Toolkit

### CORE

Lo que debería existir en prácticamente cualquier web:

- Astro y TypeScript estricto;
- configuración global tipada y validada;
- routing y layouts básicos;
- primitives de interfaz accesibles;
- design tokens y estilos globales neutrales;
- metadatos SEO, canonical, robots y sitemap con una autoridad coherente;
- convenciones de contenido y assets;
- estados de borrador o placeholder seguros;
- validaciones de build, tipos y fugas de datos;
- documentación para desarrollo, revisión y lanzamiento.

El core debe ser pequeño y no asumir blog, negocio local, catálogo, testimonios, formularios, analytics o proveedor de despliegue.

### OPTIONAL TOOLKIT

Capacidades que se activan solo cuando el brief lo exige:

- migración desde WordPress u otros CMS;
- inventario de URLs, comprobación de paridad y auditoría de redirects;
- optimización, deduplicación y presupuestos de imágenes;
- blog, catálogos, servicios, reseñas o bloques de dominio;
- formularios y adaptadores de email;
- captcha, rate limiting y controles antiabuso;
- analytics, tag managers y consentimiento de cookies;
- integraciones con CRM, reservas, mapas, vídeo u otros terceros;
- adaptadores de despliegue para Cloudflare u otros proveedores;
- auditorías contra entornos remotos.

Cada toolkit debe tener contrato, configuración, validaciones y documentación propios. No debe añadir datos reales, credenciales ni dependencias al proyecto hasta que se active explícitamente.

## Project-specific boundaries

El starter nunca debe venir preconfigurado con:

- marca o razón social;
- teléfono o email;
- dominio, URLs de preview o cuentas de hosting;
- textos editoriales o comerciales;
- servicios, productos o taxonomías de negocio;
- reseñas o testimonios;
- personas, autores reales o datos personales;
- ubicaciones o áreas de servicio;
- canonicals o reglas de indexación de otro dominio;
- IDs de analytics, píxeles o tags;
- formularios reales, destinatarios o endpoints conectados;
- secrets, API keys, tokens o contraseñas;
- redirects históricos;
- contenido legal específico;
- logos, fotografías, fuentes o assets sin procedencia y licencia aprobadas.

Tampoco debe inferir que una nueva web comparte sector, oferta, estructura comercial, idioma, SEO local, navegación o estrategia de contenidos con un proyecto usado como referencia.

## Decisiones que deben resolverse antes del bootstrap

- versión o rango soportado de Node y política de actualizaciones;
- gestor de paquetes;
- política de trailing slash;
- estrategia única de sitemap y generación de `robots.txt`;
- contenido mínimo del core y tratamiento de demos/placeholders;
- esquema y validación de configuración global;
- alcance de los tests iniciales, incluido escaneo de secretos y fugas;
- licencia del starter y procedencia de cualquier asset o fuente;
- límites exactos entre core, adaptadores y toolkits.

Estas decisiones deben documentarse antes de convertir la estructura conceptual en carpetas y código.
