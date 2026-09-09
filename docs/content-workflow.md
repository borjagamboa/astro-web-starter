# Flujo de contenido

El blog es un módulo editorial opcional. Si un proyecto no necesita blog, puede eliminar sus rutas, la colección `blog` y los posts sin afectar al resto del CORE. No es necesario crear colecciones para páginas sencillas que se mantienen mejor como archivos Astro.

## Crear un post

1. Duplica un archivo de `src/content/blog/` o crea uno con extensión `.md`.
2. Usa un nombre de archivo corto y estable; ese nombre se convierte en la URL bajo `/blog/`.
3. Completa el frontmatter y deja `draft: true` mientras se prepara.
4. Escribe el contenido debajo del frontmatter usando Markdown.
5. Ejecuta `npm run build` antes de marcarlo como publicable.

Ejemplo mínimo:

```yaml
---
title: "Título del artículo"
description: "Resumen claro que también sirve como meta description."
publishDate: 2026-01-15
draft: true
---
```

## Campos de frontmatter

| Campo | Obligatorio | Uso |
| --- | --- | --- |
| `title` | Sí | H1, cards y metadata. No puede estar vacío. |
| `description` | Sí | Introducción y meta description; máximo 180 caracteres. |
| `publishDate` | Sí | Fecha de publicación y orden del índice. |
| `updatedDate` | No | Fecha de actualización; no puede ser anterior a `publishDate`. |
| `draft` | No | Es `true` por defecto y controla la publicación. |
| `image` | No | Ruta o URL de la imagen principal. |
| `imageAlt` | Si hay imagen | Alternativa accesible obligatoria cuando existe `image`. |
| `author` | No | Nombre público validado; no se inventa ni se convierte automáticamente en schema de persona. |
| `tags` | No | Lista editorial; no crea categorías ni rutas por sí sola. |
| `canonical` | No | Path relativo o URL HTTP(S) absoluta revisada. |
| `noindex` | No | Evita indexar contenido de prueba o casos especiales. |

## Borradores

- En desarrollo, el índice y las rutas muestran borradores con un badge para poder revisarlos.
- En `astro build`, `isPublished` excluye cualquier entrada con `draft: true` tanto del índice como de `getStaticPaths`.
- Un borrador no genera HTML de producción. `noindex` no sustituye a `draft`; úsalo solo para páginas que sí deben existir pero no indexarse.

El starter incluye dos posts de validación en borrador y con `noindex: true`. Ambos están identificados como material de desarrollo y deben eliminarse o sustituirse antes de publicar un proyecto real.

## Imágenes

Usa una imagen solo cuando tenga procedencia y derechos confirmados. Completa siempre `imageAlt` describiendo la información relevante, no el aspecto decorativo. La imagen es opcional y el layout desaparece limpiamente cuando no existe.

Para proyectos reales con muchas imágenes, define dimensiones y pipeline de `astro:assets` antes de migrarlas en masa; el starter no automatiza esa decisión.

## Editar y revisar

- Cambia el frontmatter para metadata, fechas, estado, imagen o tags.
- Cambia el cuerpo Markdown para títulos secundarios, párrafos, listas, citas, enlaces y tablas.
- No añadas otro H1 dentro del Markdown: `ArticleLayout` ya genera uno.
- Revisa la entrada en `/blog/nombre-del-archivo/` y el índice en `/blog/`.
- Comprueba tablas e imágenes a 320 px, 390 px, tablet y escritorio.

## Añadir otra colección

Solo crea otra colección cuando aporte validación y un flujo editorial repetible, por ejemplo proyectos o servicios con muchas entradas.

1. Define un loader y schema independiente en `src/content.config.ts`.
2. Inclúyelo en `collections`.
3. Crea un helper de consulta/publicación si comparte estados como `draft`.
4. Crea rutas y layouts sin acoplarlos al blog.
5. Documenta campos, slugs, publicación y eliminación del módulo.

Evita copiar el schema del blog completo si la nueva colección no necesita fechas, autor, tags o canonical.

## Validación

Ejecuta:

```text
npm run build
git diff --check
```

Un build correcto valida el schema, las fechas, el alt de imágenes, las rutas dinámicas y la exclusión de borradores en producción. Después revisa el HTML generado, enlaces, metadata y contenido visible.
