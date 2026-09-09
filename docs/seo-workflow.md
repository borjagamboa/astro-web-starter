# Flujo SEO

El starter usa una única cadena para los metadatos: la página o el layout aporta datos a `BaseLayout`, `BaseLayout` los entrega a `Seo.astro` y `src/lib/seo.ts` valida y resuelve la salida. No repitas etiquetas SEO directamente en las páginas.

## Title y description

- En una página normal, pasa `title` y `description` a `BaseLayout` o `PageLayout`.
- `PageLayout` permite separar el H1 de la pestaña del navegador con `metaTitle` y `metaDescription`.
- En un artículo, edita `title` y `description` en el frontmatter. La ruta dinámica los pasa a `ArticleLayout`.
- Los valores vacíos provocan un error de build. La descripción editorial admite como máximo 180 caracteres.

Incluye el nombre del proyecto en `metaTitle` cuando ayude a identificar la página. No rellenes titles o descripciones con keywords repetidas.

## SITE_URL y canonical

`SITE_URL` es opcional durante el desarrollo. Configúralo como URL absoluta únicamente cuando se conozca el dominio canónico del proyecto.

```text
SITE_URL=https://dominio-confirmado.invalid
```

El valor anterior usa un dominio reservado solo para ilustrar el formato; no debe copiarse a producción.

- Sin `SITE_URL`, no se genera canonical ni `og:url`, evitando publicar una URL local o inventada.
- Con `SITE_URL`, el canonical por defecto se construye desde la ruta actual y respeta `trailingSlash: 'always'`.
- `canonical` permite sobrescribir la ruta con un path relativo o una URL HTTP(S) absoluta validada.
- Una canonical externa puede ser legítima para contenido sindicado, pero debe revisarse expresamente.

## Open Graph

Cada página hereda title y description para Open Graph y puede sobrescribirlos con `ogTitle` y `ogDescription`. `ogType` admite `website` y `article`.

La imagen por defecto se configura en `site.brand.socialImage` con `src`, `alt`, `width` y `height`. Una página puede aportar `ogImage` y `ogImageAlt`. Una ruta de imagen relativa solo se convierte en URL absoluta cuando existe `SITE_URL`; si no puede resolverse de forma fiable, se omite.

No añadas una imagen provisional que pueda confundirse con un asset final. Confirma contenido, dimensiones, licencia y recorte antes de configurarla.

## Robots

`src/pages/robots.txt.ts` es la única autoridad de `robots.txt`:

- siempre permite el rastreo general;
- solo anuncia el sitemap cuando Astro recibe `SITE_URL`;
- no bloquea producción por defecto.

Por página se puede usar `robots`, `noindex` y `nofollow`. Los flags seguros prevalecen sobre las directivas equivalentes. Antes de producción, revisa que ninguna página necesaria conserve `noindex` y que entornos preview se protejan en la plataforma, no mediante una regla que pueda heredarse accidentalmente.

## Sitemap

`@astrojs/sitemap` es la única autoridad. `astro.config.mjs` activa la integración solo cuando `SITE_URL` existe. No crees un endpoint manual de sitemap.

Para validarlo, ejecuta el build con el dominio definitivo configurado y comprueba `dist/sitemap-index.xml` y los sitemaps referenciados. Sin `SITE_URL` no deben generarse esos archivos.

## Structured data

`src/lib/structured-data.ts` contiene builders genéricos:

- `WebSite`: se añade desde `BaseLayout` cuando existe `SITE_URL`;
- `Organization`: solo aparece si se configura explícitamente `site.organization`;
- `BreadcrumbList`: lo genera `Breadcrumbs` a partir de labels y URLs aportados por la página;
- `Article`: lo añade `ArticleLayout` cuando existe una URL absoluta fiable.

Los campos ausentes se omiten. No añadas `LocalBusiness`, schemas sanitarios, servicios sectoriales, autores, publisher o ratings sin información real y validada.

## Lista previa a producción

- [ ] Nombre, descripción, idioma y locale de `site.ts` son definitivos.
- [ ] `SITE_URL` coincide con el dominio canónico y usa HTTPS.
- [ ] Titles, descripciones, canonicals y robots son únicos y coherentes.
- [ ] La imagen OG existe, tiene texto alternativo adecuado y derechos confirmados.
- [ ] No quedan demos, borradores publicados ni páginas necesarias con `noindex`.
- [ ] `robots.txt` anuncia el sitemap y el sitemap contiene solo rutas publicables.
- [ ] Breadcrumbs visibles y JSON-LD representan la misma jerarquía.
- [ ] Los schemas validados no contienen datos vacíos, provisionales o sectoriales heredados.
- [ ] El HTML generado se revisa además de ejecutar `npm run build`.

Las comprobaciones automáticas actuales cubren campos vacíos, URLs inválidas, alt ausente con imagen, fechas incoherentes y borradores de producción. La unicidad global de metadata, la calidad editorial y la validación externa de JSON-LD quedan para QA o una fase de testing posterior.
