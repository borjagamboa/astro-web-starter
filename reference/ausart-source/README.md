# Paquete temporal de referencia Astro

Este paquete existe para ayudar a construir fuera de este repositorio un proyecto independiente llamado `astro-web-starter`. Reúne una selección pequeña de implementaciones reales de Ausart Neuro que muestran patrones útiles de Astro, composición visual, responsive, accesibilidad, SEO y Content Collections.

Es un artefacto temporal de estudio, no una plantilla terminada ni una copia ejecutable de la web. Sus archivos pueden conservar imports hacia datos o assets que no se han incluido deliberadamente. No debe copiarse ciegamente, desplegarse ni conectarse a producción.

Las copias de código han sido saneadas con placeholders evidentes para retirar nombre de proyecto, dominio, teléfono, email, ubicación, claim, URLs históricas y algunos textos de negocio. No se han incluido imágenes, fuentes, contenidos editoriales, testimonios, páginas legales, redirects, secretos, IDs de servicios externos ni configuración de producción.

El siguiente proyecto debe estudiar los patrones y generalizarlos. En particular, debe desacoplar componentes de datos globales, convertir la paleta en tokens semánticos neutrales, sustituir rutas fijas por configuración, definir una única estrategia de sitemap y mantener formularios e integraciones como módulos opcionales.

## Cómo usarlo

1. Leer `INVENTORY.md` antes de abrir los archivos de referencia.
2. Leer `docs/generalization-notes.md` para entender dependencias y límites.
3. Portar un archivo cada vez a un repositorio limpio.
4. Reescribir su API cuando la nota indique `GENERALIZE`.
5. Crear datos, textos y assets demo desde cero.
6. Ejecutar un escaneo de fugas antes de compilar o publicar el starter.

## Qué no contiene

- Ningún archivo de `src/content` ni copy editorial completo.
- Datos reales de reseñas o personas.
- Código del formulario o de la Function de Brevo/Cloudflare.
- Redirects históricos, mapas SEO o informes de migración.
- Scripts WordPress o descargas de medios.
- Imágenes, logos, fuentes, PDF, favicons o lockfiles.
- Valores de entorno, tokens, API keys o identificadores de cuentas.

La mención de “Ausart Neuro” en esta documentación es deliberada y sirve únicamente para declarar la procedencia. No debería aparecer en el código de `src-reference` ni `config-reference`.
