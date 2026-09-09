# astro-web-starter

`astro-web-starter` es una base reutilizable para preparar y construir sitios web con Astro mediante un flujo coordinado entre ChatGPT, una persona responsable del proyecto y Codex.

Su propósito no es ofrecer una web terminada ni imponer una marca. Define un contrato técnico y operativo para que cada proyecto nuevo empiece con decisiones explícitas, límites claros y una arquitectura mantenible.

> Estado actual: el repositorio contiene un bootstrap Astro mínimo y compilable. El sistema visual, las recetas de página, el SEO avanzado y los módulos opcionales se implementarán en fases posteriores.

## Base implementada

La fase inicial usa Astro 7.3.2, TypeScript strict y npm. Requiere Node 22.19.0 o posterior porque una dependencia transitiva de Astro establece ese mínimo.

```bash
npm install
npm run dev
npm run build
```

La URL canónica permanece sin configurar. Al proporcionar `SITE_URL` mediante el entorno, Astro habilita `@astrojs/sitemap` como única autoridad del sitemap. No configures un dominio ficticio ni de otro proyecto.

## Filosofía

- Empezar por los requisitos y no por el código.
- Mantener un núcleo pequeño, neutral y fácil de comprender.
- Separar lo reutilizable de lo específico de cada cliente o negocio.
- Usar primero Astro, HTML, CSS y TypeScript nativos.
- Añadir integraciones y dependencias solo cuando exista una necesidad real.
- Proteger accesibilidad, SEO, rendimiento, privacidad y mantenibilidad desde el inicio.
- Avanzar mediante cambios pequeños que una persona pueda revisar y validar.

## Qué problemas resuelve

El starter pretende evitar que cada web comience desde cero o herede accidentalmente decisiones de otra: marcas, textos, rutas, servicios, datos personales, analytics, formularios, redirects, proveedores o estilos. También proporciona un lenguaje común para decidir tareas, delegarlas a Codex, revisar resultados y documentar lo aprendido.

## Estructura conceptual

La arquitectura objetivo tendrá capas independientes:

- configuración global tipada para identidad, origen, locale, rutas y valores SEO por defecto;
- datos reutilizables para navegación, acciones y estructuras compartidas;
- contenido editorial separado de la presentación;
- componentes Astro pequeños y configurables;
- layouts y páginas centrados en composición;
- estilos basados en tokens semánticos;
- adaptadores e integraciones externas opcionales;
- toolkits de migración y auditoría fuera del núcleo de producción;
- documentación y validaciones sincronizadas con la implementación.

La propuesta completa está en [`docs/architecture.md`](docs/architecture.md).

## Flujo ChatGPT → usuario → Codex

1. ChatGPT revisa el brief y el estado devuelto por la tarea anterior.
2. ChatGPT selecciona una tarea pequeña, completa y verificable.
3. ChatGPT redacta un prompt preciso para Codex con alcance, exclusiones y criterios de aceptación.
4. La persona usuaria ejecuta ese prompt en el repositorio correcto.
5. Codex inspecciona, modifica, valida y devuelve un resumen con evidencias.
6. La persona usuaria entrega a ChatGPT el resumen o las capturas necesarias.
7. ChatGPT revisa resultado y riesgos; solo entonces valida la fase y propone la siguiente.

ChatGPT dirige el proceso, Codex trabaja en el repositorio y la persona usuaria conserva el control de las decisiones, accesos, commits y publicación.

## Cómo iniciar una nueva web

1. Crea un repositorio nuevo a partir del starter, sin copiar la historia ni datos de otro cliente salvo que exista una decisión consciente y revisada.
2. Completa [`PROJECT-BRIEF.md`](PROJECT-BRIEF.md) con la información disponible y marca las dudas.
3. Copia y adapta [`CHATGPT-PROJECT-INSTRUCTIONS.md`](CHATGPT-PROJECT-INSTRUCTIONS.md) en el proyecto de ChatGPT que coordinará el trabajo.
4. Revisa [`AGENTS.md`](AGENTS.md) y añade reglas específicas del proyecto de forma explícita si fueran necesarias.
5. Sustituye todos los placeholders y decide dominio, idiomas, rutas, contenido, identidad visual, SEO, formularios, legal, hosting e integraciones.
6. Implementa por fases pequeñas, validando cada una antes de continuar.
7. Solo conecta servicios, dominios o producción tras una revisión específica de lanzamiento.

## Qué debe personalizarse

Cada proyecto debe definir, como mínimo:

- identidad, público, propuesta de valor y tono;
- páginas, navegación, contenidos, productos o servicios;
- dominio, locale, idiomas, rutas y política de trailing slash;
- colores, tipografías, logos, imágenes y licencias;
- estrategia SEO, canonicals, schemas y redirects de migración;
- formularios, consentimientos, textos legales y tratamiento de datos;
- analytics, proveedores externos, hosting y entornos;
- criterios de éxito, validación y lanzamiento.

## Qué no debe copiarse entre proyectos

No se deben arrastrar marcas, dominios, teléfonos, emails, textos, servicios, personas, ubicaciones, reseñas, imágenes, fuentes sin licencia, datos legales, canonicals, IDs de analytics, formularios reales, secretos, configuración de producción, redirects históricos ni decisiones SEO de otro sitio.

Los patrones técnicos pueden generalizarse. Los datos y las decisiones de negocio deben partir siempre del brief del proyecto actual.

## Flujo básico de desarrollo

1. Inspeccionar el repositorio y confirmar el alcance.
2. Elegir una tarea pequeña y sus criterios de aceptación.
3. Implementar solo lo necesario.
4. Actualizar la documentación afectada.
5. Ejecutar las validaciones disponibles, incluido `npm run build` cuando exista la base Astro.
6. Revisar visualmente y comprobar accesibilidad, responsive, SEO, privacidad y rendimiento según el cambio.
7. Resumir archivos, validaciones, riesgos y trabajo pendiente.

## Flujo básico de validación con Git

Git permite revisar lo que ha cambiado, pero no debe sustituir las validaciones del producto.

1. Ejecuta `git status --short` para identificar archivos nuevos y modificados.
2. Revisa el diff y confirma que no incluye cambios ajenos, secretos ni datos de otro proyecto.
3. Ejecuta build, tests y comprobaciones específicas.
4. Revisa el resultado antes de preparar un commit.
5. El commit y el push son decisiones humanas explícitas; Codex no los realiza automáticamente.

Mientras este directorio no esté inicializado como repositorio Git, esos comandos no estarán disponibles.

## Documentos clave

- [`PROJECT-BRIEF.md`](PROJECT-BRIEF.md): ficha editable que convierte necesidades de negocio en requisitos concretos y registra dudas y riesgos.
- [`AGENTS.md`](AGENTS.md): reglas permanentes para que Codex trabaje de forma segura y consistente dentro del repositorio.
- [`CHATGPT-PROJECT-INSTRUCTIONS.md`](CHATGPT-PROJECT-INSTRUCTIONS.md): plantilla para configurar a ChatGPT como responsable del proceso técnico y supervisor de las tareas delegadas.
