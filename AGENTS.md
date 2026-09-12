# Manual operativo para agentes

## Alcance y prioridad

Este repositorio es un starter genérico para crear sitios web con Astro. No representa una empresa, sector, marca, arquitectura comercial o estrategia SEO concretos.

- Trabaja exclusivamente dentro de la raíz del repositorio abierto. No leas, modifiques ni reutilices archivos de otros proyectos salvo autorización explícita y acotada.
- Las instrucciones específicas del proyecto tienen prioridad cuando están documentadas explícitamente y no contradicen requisitos de seguridad, privacidad o el alcance autorizado.
- Inspecciona el estado, la estructura, la documentación y los cambios existentes antes de modificar nada. No asumas que una carpeta o implementación ya existe.
- Trata los cambios preexistentes como trabajo del usuario. No los descartes, sobrescribas ni reformatees sin necesidad.
- Divide los cambios grandes en tareas pequeñas, verificables y reversibles. Explica cualquier ampliación de alcance antes de ejecutarla.
- No hagas `commit`, `push`, despliegues ni modificaciones de producción automáticamente.
- No borres, reemplaces ni rehagas áreas grandes sin una justificación explícita y aprobación cuando el alcance sea ambiguo.

## Base tecnológica

- Astro es el framework principal.
- Prioriza HTML semántico, CSS, TypeScript y capacidades nativas de Astro.
- No uses Tailwind.
- Evita React y otros frameworks de interfaz salvo que una necesidad real, medible y documentada no pueda resolverse razonablemente con Astro y JavaScript ligero.
- No añadas dependencias innecesarias. Antes de incorporar una, documenta el problema, alternativas nativas, coste de mantenimiento, impacto en cliente y riesgos.
- Mantén el núcleo compilable sin módulos opcionales, proveedores externos ni credenciales.
- No introduzcas código legado de WordPress, Astra o Gutenberg. Puede estudiarse como referencia durante una migración, pero no formar parte del núcleo.
- No introduzcas selectores heredados como `.wp-*`, `.ast-*`, `.wpforms-*` u otros equivalentes salvo una excepción temporal, aislada y documentada.

## Arquitectura y diseño del código

- Mantén una arquitectura modular, con responsabilidades claras y dependencias en una sola dirección.
- Separa contenido editorial, datos estructurados, configuración global y presentación.
- Centraliza identidad, URL canónica, locale, rutas compartidas, SEO por defecto, flags y assets globales en configuración tipada.
- No guardes secretos ni contenido editorial largo en la configuración pública.
- Los componentes reutilizables deben recibir datos por propiedades o slots; no deben contener marca, teléfonos, dominios, rutas comerciales, textos, proveedores ni supuestos de sector.
- Evita hardcodings de negocio, slugs repetidos y acceso directo de componentes genéricos a datos específicos.
- Mantén componentes pequeños y con pocas responsabilidades; usa las páginas principalmente para composición.
- Evita dependencias circulares y acoplamiento entre primitives, datos globales, adaptadores y herramientas de migración.
- Usa content collections cuando aporten validación, consistencia y un flujo editorial claro, no por defecto para cualquier dato.
- Centraliza design tokens semánticos. No fijes una identidad visual dentro de componentes reutilizables.
- Mantén integraciones externas tras contratos o adaptadores sustituibles.
- Mantén scripts de migración, auditoría o importación fuera del núcleo de producción y ejecútalos solo de forma explícita.

## Calidad de producto

### Accesibilidad y responsive

- Usa HTML semántico, navegación por teclado, foco visible, labels y nombres accesibles.
- Exige texto alternativo útil para imágenes informativas; las decorativas deben declararse como tales.
- Respeta contraste, zoom, preferencias de movimiento reducido y tecnologías de asistencia.
- Diseña mobile-first y valida los estados relevantes en anchos pequeños, medios y grandes, sin depender de dispositivos concretos.

### SEO y migraciones

- Define títulos, descripciones, canonicals, idioma, Open Graph, robots y datos estructurados desde una fuente coherente.
- Usa una única autoridad para sitemap y canonicals.
- No asumas que un proyecto nuevo comparte estructura comercial, audiencia, rutas, palabras clave, SEO local o schemas con ningún proyecto de referencia.
- En migraciones, inventaría primero las URLs existentes y preserva rutas valiosas, canonicals y señales SEO mediante un mapa de redirects revisado.
- No copies redirects históricos, canonicals, dominios o mapas de intención entre proyectos.
- Evita publicar contenido demo, placeholders, borradores o URLs temporales.

### Rendimiento y privacidad

- Minimiza JavaScript enviado al navegador, hidrata solo cuando sea necesario y controla peso, dimensiones y formato de imágenes y fuentes.
- Evita dependencias, trackers y recursos de terceros sin valor demostrado.
- Recoge solo los datos personales necesarios. No registres mensajes, credenciales ni información sensible.
- No inventes ni reutilices testimonios. Documenta consentimiento, procedencia y derecho de publicación cuando existan reseñas.
- Analytics, cookies y servicios externos son opt-in y deben cumplir los requisitos legales y de consentimiento del proyecto.

### Formularios y servicios externos

- Define campos, validación, mensajes, consentimiento, endpoint y resultado desde requisitos del proyecto.
- Valida siempre en servidor cuando exista envío; la validación del navegador es solo una ayuda.
- Incluye controles proporcionales contra abuso, límites de tamaño y tratamiento seguro de errores y logs.
- Desacopla la interfaz del proveedor de email, hosting, captcha, analytics o almacenamiento.
- No conectes servicios reales ni producción sin instrucción explícita.

## Secretos y entornos

- Nunca incluyas API keys, tokens, contraseñas, IDs sensibles ni archivos `.env` reales en Git.
- Usa variables de entorno para secretos y accede a ellas únicamente en contexto de servidor.
- Proporciona solo nombres y placeholders seguros en archivos de ejemplo.
- No expongas secretos mediante variables públicas, logs, HTML generado, capturas o mensajes de error.
- Antes de desplegar, comprueba que no quedan marcas, dominios, IDs, endpoints, previews o credenciales de otros proyectos.

## Gobierno y migraciones de WEB_KIT

- En una web hija, consulta `.factory/project.json` antes de proponer una actualización del kit: ese manifest declara la versión del CORE, los MODULES activos, las migraciones y las personalizaciones conocidas.
- Preserva siempre las rutas `project-owned`. Una actualización del kit no puede sobrescribir contenido, configuración, páginas, assets ni CSS propios del proyecto.
- Actualiza rutas `kit-managed` únicamente mediante una migración explícita. Si difieren del baseline instalado, detén el cambio y solicita revisión.
- Revisa cualquier ruta `core-customizable` que el proyecto haya modificado; intégrala de forma consciente y nunca mediante reemplazo ciego.
- Actualiza un MODULE solo cuando figure como activo en el manifest. Los PRESETS son optativos y no determinan si una web está actualizada.
- No uses `git merge starter/main` ni copies árboles completos del starter sobre una web existente como estrategia de actualización.
- Ejecuta los pasos y validaciones declarados por la migración y revisa el diff antes de darla por terminada.
- Actualiza `.factory/project.json` únicamente después de completar correctamente la migración y todas sus validaciones. No marques una versión como instalada de forma anticipada.

## Documentación y validación

- Actualiza la documentación cuando cambien arquitectura, configuración, scripts, comandos, despliegue, migraciones o cualquier workflow.
- Antes de declarar una tarea terminada, ejecuta las validaciones disponibles y proporcionales: formato, tipos, tests, build y comprobaciones específicas del cambio.
- Para cambios web, revisa también accesibilidad básica, responsive, enlaces, metadatos SEO, salida generada y ausencia de datos ajenos.
- Si no existe todavía un comando de validación o no puede ejecutarse, indícalo claramente; no simules un resultado.
- Revisa `git status --short` cuando el repositorio esté inicializado y distingue tus cambios de los preexistentes.
- Al finalizar, informa de los archivos modificados, validaciones ejecutadas, resultados, decisiones relevantes y riesgos o tareas pendientes.
