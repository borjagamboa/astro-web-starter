# Plan de versionado del kit

Este documento define el modelo propuesto para versionar y migrar, de forma controlada, las webs creadas desde este repositorio. `WEB_KIT` es un identificador provisional, no un nombre comercial.

El objetivo no es sincronizar repositorios ni mantener copias idénticas. El objetivo es que cada web pueda conocer el CORE que tiene instalado, recibir correcciones y mejoras compatibles, y preservar a la vez todo lo que pertenece al proyecto.

> Estado de implementación: `WEB_KIT 1.0.0-rc.1` formaliza la identidad técnica, la versión canónica, los schemas iniciales de manifest y ownership, el changelog, la plantilla de migraciones y la validación mínima de metadata. Los baselines de checksums y la primera migración real siguen pendientes.

## 1. Principios de versionado

`WEB_KIT` debe aplicar SemVer al CORE como contrato de compatibilidad:

- **MAJOR:** cambio incompatible del contrato del CORE. Puede exigir adaptar configuración, layouts, APIs de componentes, estructura de archivos o comportamiento compartido. Debe incluir una migración explícita y revisión del proyecto.
- **MINOR:** nueva capacidad compatible o mejora relevante del CORE. Puede añadir contratos, componentes o defaults, pero no debe invalidar una personalización compatible existente.
- **PATCH:** corrección compatible de bugs, accesibilidad, seguridad o robustez. No debe cambiar intencionadamente la API pública ni la composición de una web.

La versión del CORE no debe confundirse con la versión de Astro, de una dependencia ni con el campo `version` actual de `package.json`. Una release de `WEB_KIT` debe declarar sus propias dependencias compatibles.

Reglas complementarias:

- Cada MODULE mantiene su propia versión SemVer. Su versión solo afecta a las webs que lo tienen activo.
- Una migración de módulo puede requerir una versión mínima del CORE, pero no incrementa por sí sola el estado de versión de una web que no usa ese módulo.
- Los PRESETS son material optativo de arranque o referencia. Pueden evolucionar como catálogo, pero no forman parte del estado de compatibilidad de una web.
- El contenido y el código PROJECT no reciben versiones del kit ni se sincronizan desde él.
- Una release no autoriza a reemplazar archivos por pertenecer al CORE: la propiedad efectiva y las personalizaciones registradas siguen determinando el tratamiento.

## 2. Inventario real y clasificación

La clasificación siguiente describe cómo debe tratar una futura migración los archivos que existen actualmente. En archivos con doble función se adopta la categoría más conservadora hasta separar sus responsabilidades.

| Ruta actual | Categoría | Tratamiento de migración |
| --- | --- | --- |
| `src/layouts/BaseLayout.astro` | CORE | Actualizable mediante migración; conserva su API de configuración local y requiere validación de todas las páginas. |
| `src/layouts/PageLayout.astro` | CORE | Actualizable como layout compartido, con comprobación de API y render. |
| `src/components/primitives/**` | CORE | Contratos de composición básicos. Un proyecto debe extenderlos o envolverlos antes que editarlos. |
| `src/components/utilities/Seo.astro` | CORE | Infraestructura SEO compartida; actualización controlada y validación del HTML generado. |
| `src/components/utilities/RevealObserver.astro` | CORE | Mejora progresiva común; debe conservar reduced motion y no apropiarse de `transform`. |
| `src/components/navigation/Breadcrumbs.astro` | CORE | Navegación semántica y schema compartidos. |
| `src/components/patterns/**` salvo módulos explícitos | CORE | Biblioteca común y tipada de composición. Los estilos específicos del cliente deben vivir fuera de estos archivos. |
| `src/components/patterns/types.ts` | CORE | Contratos compartidos; los cambios incompatibles afectan al MAJOR. |
| `src/lib/seo.ts` y `src/lib/structured-data.ts` | CORE | Infraestructura SEO y contratos comunes. |
| `src/pages/robots.txt.ts` | CORE | Endpoint SEO común; cualquier política particular exige registrar una personalización. |
| `src/styles/global.css` | CORE | Reset, accesibilidad y comportamiento global común. No debe acumular CSS de cliente. |
| `scripts/validate-config.mjs` y `scripts/check-leakage.mjs` | CORE | Guardrails obligatorios del kit. |
| `docs/architecture.md`, `docs/seo-workflow.md` y este plan | CORE | Documentación normativa asociada al CORE; puede actualizarse sin sustituir documentación propia adicional. |
| `src/components/navigation/Header.astro`, `Footer.astro` y `Logo.astro` | CORE_CUSTOMIZABLE | Piezas comunes con alta probabilidad de adaptación de marca o estructura. Nunca se reemplazan si difieren del baseline sin revisión. |
| `src/data/site.ts` | CORE_CUSTOMIZABLE | Hoy mezcla interfaces del CORE con configuración PROJECT. Debe preservarse y migrarse conscientemente. |
| `src/data/navigation.ts` | CORE_CUSTOMIZABLE | Hoy mezcla contratos compartidos con navegación PROJECT. Debe preservarse y migrarse conscientemente. |
| `src/styles/tokens.css` | CORE_CUSTOMIZABLE | Los nombres de tokens son contrato del CORE; sus valores expresan identidad PROJECT. Requiere merge semántico. |
| `astro.config.mjs` | CORE_CUSTOMIZABLE | Contiene defaults del kit, pero un proyecto puede añadir adapters o integraciones. |
| `package.json` y `package-lock.json` | CORE_CUSTOMIZABLE | Combinan scripts/dependencias del kit con dependencias del proyecto. Se actualizan por operaciones de dependencias, no copiando archivos. |
| `tsconfig.json`, `.env.example` y `.gitignore` | CORE_CUSTOMIZABLE | Admiten extensiones del proyecto. Las nuevas reglas del kit se integran y revisan. |
| `AGENTS.md` | CORE_CUSTOMIZABLE | Contiene guardrails del kit y puede contener instrucciones específicas del proyecto. Requiere merge consciente. |
| `CHATGPT-PROJECT-INSTRUCTIONS.md` | CORE_CUSTOMIZABLE | Plantilla operativa del kit que una web puede adaptar; no se reemplaza ciegamente. |
| `README.md` | PROJECT | En el repositorio fuente documenta el starter, pero al crear una web se convierte en documentación propia. Las mejoras del README del kit se ofrecen, no se fuerzan. |
| `PROJECT-BRIEF.md` | PRESET → PROJECT | Es una plantilla en el kit y pasa a ser información propia en cuanto se rellena. Nunca se sobrescribe desde el kit. |
| `docs/composition-system.md` | CORE_CUSTOMIZABLE | Documenta contratos comunes y decisiones visuales que una web puede ampliar. Los cambios normativos requieren revisión. |
| `src/layouts/ArticleLayout.astro` | MODULE `editorial` | Layout del módulo editorial; solo se migra si el módulo está activo. |
| `src/content.config.ts` | MODULE `editorial` | Schema editorial actual. Puede coexistir con colecciones propias y por ello exige revisión al migrar. |
| `src/lib/content.ts` | MODULE `editorial` | Helpers del blog actual. |
| `src/pages/blog/**` | MODULE `editorial` + CORE_CUSTOMIZABLE | Rutas iniciales del módulo; una web puede haber cambiado slugs, consultas o composición. Nunca se reemplazan sin comprobar diferencias. |
| `docs/content-workflow.md` | MODULE `editorial` | Documentación del módulo editorial. |
| `src/components/forms/ContactForm.astro` | MODULE `contact-form` | Interfaz opcional de formulario, desacoplada del proveedor. |
| `src/lib/forms.ts` | MODULE `contact-form` | Contratos y validación del formulario opcional. |
| `docs/forms-and-validation.md` | MODULE `contact-form` | Documentación del módulo. |
| `docs/page-recipes.md` y `docs/quick-start-workflow.md` | PRESET | Recetas y flujo de arranque. Ayudan a crear, pero no determinan compatibilidad. |
| `docs/starter-implementation-plan.md` | PRESET | Contexto histórico de construcción del starter; no debe sincronizarse con webs hijas. |
| `src/pages/index.astro` | PRESET → PROJECT | Showcase inicial en el kit y Home propia tras crear el proyecto. Una migración debe preservarla siempre. |
| `public/images/starter-grid.svg` y `public/images/starter-orbit.svg` | PRESET | Assets de demostración reemplazables; no forman parte del CORE instalado. |
| `src/content/**` | PROJECT sobre MODULE | El módulo define el mecanismo; los Markdown y demás entradas pertenecen íntegramente al proyecto. |
| Resto de `src/pages/**` creado por una web | PROJECT | Rutas, copy y composición del proyecto. La excepción actual es `robots.txt.ts`; las rutas de módulos se rigen por su módulo. |
| Resto de `public/**` | PROJECT | Logos, fotos, fuentes y assets propios. |
| CSS específico añadido por páginas o por el cliente | PROJECT | Se preserva. No debe migrarse al CORE solo por reutilizar tokens o componentes. |

### Fronteras mixtas que conviene resolver antes de la primera release

El inventario revela tres puntos de fricción:

1. `site.ts` y `navigation.ts` definen a la vez tipos reutilizables y valores propios de la web. A medio plazo, los contratos deberían quedar en archivos CORE y las instancias en archivos PROJECT.
2. `tokens.css` contiene tanto el vocabulario estable como la identidad visual por defecto. La primera release debe documentar qué nombres son contrato y qué valores son personalizables, aunque todavía permanezcan en un único archivo.
3. `src/pages/index.astro` y los assets `starter-*` son útiles para el repositorio fuente, pero dejan de ser material del kit gestionado cuando se genera una web.

Estas separaciones no se implementan en esta auditoría. Hasta resolverlas, una migración debe aplicar la categoría más conservadora: preservar y solicitar revisión.

## 3. Frontera CORE / PROJECT

Una migración debe decidir el tratamiento por propiedad, estado respecto al baseline y alcance de la migración:

| Situación | Acción permitida |
| --- | --- |
| CORE kit-managed, idéntico al baseline instalado | Reemplazar mediante una migración declarada y validada. |
| CORE kit-managed, distinto del baseline | Detener ese cambio, registrarlo como personalización no declarada y pedir revisión. |
| CORE_CUSTOMIZABLE, idéntico al baseline | Aplicar el cambio propuesto, mostrando el diff. |
| CORE_CUSTOMIZABLE, modificado | Hacer merge semántico o adaptación manual; nunca sobrescribir. |
| MODULE inactivo | No tocar y no considerar la web desactualizada por ese módulo. |
| MODULE activo | Aplicar únicamente migraciones compatibles con la versión registrada del módulo y respetar sus archivos personalizables. |
| PRESET | No sincronizar. Puede ofrecerse como referencia o incorporación voluntaria. |
| PROJECT | Preservar siempre. Una migración solo puede leerlo para validar compatibilidad o proponer una edición revisable. |
| Propiedad desconocida o clasificación ambigua | Tratar como PROJECT hasta que una persona resuelva la propiedad. |

Reglas operativas:

- La pertenencia a una carpeta no concede permiso para reemplazarla. `src/pages`, `public`, `src/content` y la configuración contienen propiedad PROJECT.
- Un archivo CORE modificado por necesidad real no deja de ser conceptualmente CORE; se registra como personalización y futuras migraciones deben detenerse sobre él.
- Las mejoras de seguridad o accesibilidad también deben pasar por migración. Su urgencia no justifica perder personalizaciones.
- Una migración puede añadir un archivo nuevo del CORE si no colisiona. Si ya existe una ruta con ese nombre, debe tratarla como conflicto.
- El resultado debe ser un patch legible, validado y reversible; no un merge ciego desde `starter/main`.

## 4. Manifest de cada web

Cada web declara su estado en `.factory/project.json`, creado a partir de `.factory/project.template.json`. El manifest debe ser pequeño, legible y propiedad del proceso de migración, no un duplicado del árbol.

Campos propuestos:

- `schemaVersion`: versión del formato del manifest.
- `kitId`: identificador provisional `WEB_KIT`.
- `createdFromCoreVersion`: versión del CORE con la que nació la web.
- `installedCoreVersion`: versión del CORE que se considera instalada tras la última migración completa.
- `lastReviewedAgainstCoreVersion`: última versión del CORE contra la que se revisó la web, aunque no llegara a instalarse.
- `activeModules`: solo módulos activos y su versión instalada.
- `migrationsApplied`: identificadores aplicados y fecha; permite distinguir una migración ejecutada de una versión meramente editada.
- `coreCustomizations`: rutas CORE o CORE_CUSTOMIZABLE modificadas deliberadamente y una razón breve.
- `lastKitReviewDate`: fecha de la última comparación completa contra una release del kit.

Ejemplo ficticio:

```json
{
  "schemaVersion": 1,
  "kitId": "WEB_KIT",
  "createdFromCoreVersion": "1.0.0",
  "installedCoreVersion": "1.1.2",
  "lastReviewedAgainstCoreVersion": "1.1.2",
  "activeModules": [
    { "id": "editorial", "version": "1.0.1" }
  ],
  "migrationsApplied": [
    {
      "id": "MIG-001-editorial-content-layer",
      "appliedAt": "2027-02-18"
    }
  ],
  "coreCustomizations": [
    {
      "path": "src/components/navigation/Header.astro",
      "reason": "Cabecera adaptada a la navegación del proyecto"
    }
  ],
  "lastKitReviewDate": "2027-02-18"
}
```

`installedCoreVersion` solo debe avanzar cuando todas las migraciones obligatorias hasta esa versión se hayan completado o exista una excepción de compatibilidad documentada. Editar el número manualmente no constituye una actualización.

## 5. Ownership

La release candidate incorpora `.factory/ownership.json` como un mapa de reglas pequeño, no un inventario exhaustivo de hashes por archivo. Un migrador necesita una respuesta reproducible incluso cuando no tenga el repositorio fuente abierto.

La solución propuesta es:

- El kit publica con cada release un mapa canónico de rutas o globs.
- La web conserva en `.factory/ownership.json` el snapshot de reglas correspondiente a su CORE instalado.
- Las reglas distinguen `kit-managed`, `core-customizable`, `project-owned`, `module:<id>` y `preset`.
- Las excepciones específicas de la web se añaden como reglas concretas al final; la regla más específica prevalece.
- `.factory/project.json` registra qué personalizaciones existen y por qué. `ownership.json` responde quién decide; `project.json` responde qué se personalizó realmente.

La implementación usa patrones glob relativos a la raíz con separadores `/`; `*` representa un segmento y `**` permite descendientes. Las reglas se evalúan en orden y gana la última coincidencia, de modo que una excepción específica debe aparecer después de su regla general. Una ruta sin coincidencia queda en `review-required`.

Un ejemplo conceptual de reglas sería:

```json
{
  "schemaVersion": 1,
  "rules": [
    { "pattern": "src/lib/seo.ts", "category": "kit-managed" },
    { "pattern": "src/components/navigation/**", "category": "core-customizable" },
    { "pattern": "src/pages/**", "category": "project-owned" },
    { "pattern": "src/pages/robots.txt.ts", "category": "kit-managed" },
    { "pattern": "src/pages/blog/**", "category": "module", "moduleId": "editorial" }
  ]
}
```

No conviene almacenar el mapa únicamente en documentación: las futuras migraciones no podrían comprobarlo de forma fiable. Tampoco conviene decidir propiedad solo con `git diff`, porque una web hija puede no conservar la historia del starter.

## 6. Migraciones

Una migración es una unidad inmutable y revisable, con un identificador estable como `MIG-001-editorial-content-layer`. No es un merge de ramas.

Cada definición debe declarar:

- `from`: versión o rango de versiones de origen.
- `to`: versión destino.
- `type`: `core`, `module`, `security` o `manual`.
- `scope`: todas las webs o un módulo concreto.
- archivos o patrones potencialmente afectados.
- prerrequisitos de CORE, módulo, dependencias o configuración.
- pasos ordenados, separando cambios automáticos seguros de revisiones manuales.
- elementos que no debe tocar, especialmente rutas PROJECT.
- validación técnica y comprobaciones visuales o editoriales necesarias.
- rollback mediante el patch inverso o el checkpoint de Git creado antes de empezar.

Flujo recomendado:

1. Leer manifests, reglas de ownership y estado de Git; exigir un checkpoint recuperable antes de escribir.
2. Resolver la ruta de migraciones desde la versión instalada hasta la destino, incluyendo solo módulos activos.
3. Comparar cada archivo afectado con el baseline de la release instalada.
4. Aplicar automáticamente solo cambios kit-managed sin divergencias.
5. Preparar merge o instrucciones concretas para CORE_CUSTOMIZABLE y detenerse ante cambios no registrados.
6. Preservar PROJECT y PRESET; informar de incompatibilidades sin corregirlas a ciegas.
7. Ejecutar las validaciones declaradas, revisar el diff y comprobar que no existe leakage.
8. Actualizar el manifest únicamente después de una migración completa y validada.

Los checksums de baseline deben distribuirse con cada release o paquete de migración. No es necesario copiarlos todos al manifest de cada web. Así se puede detectar divergencia sin convertir `.factory/project.json` en una base de datos.

## 7. Regla sobre actualizaciones

El principio propuesto es correcto si se formaliza así:

> Toda web debe mantenerse en una versión soportada y compatible del CORE de `WEB_KIT`, con las migraciones obligatorias y correcciones de seguridad aplicables completadas.

El estado de una web puede ser:

- **current:** cumple la versión objetivo y todas las migraciones obligatorias aplicables.
- **supported:** no está en la última release, pero satisface la versión mínima de CORE que el kit declara como soportada.
- **migration-required:** está fuera de soporte o tiene una migración obligatoria pendiente.
- **review-required:** la versión podría ser compatible, pero una personalización o conflicto impide confirmarlo automáticamente.

Cada release debe declarar `minimumSupportedCore`. Al inicio es preferible esta regla explícita a prometer una ventana fija de varios MAJOR o MINOR que todavía no se ha operado.

La evaluación ignora:

- módulos no instalados;
- novedades de PRESETS;
- diferencias de contenido, assets, páginas o CSS PROJECT.

Para un MODULE activo se evalúan por separado su versión soportada y su compatibilidad con el CORE. Un proyecto puede estar actualizado en CORE y tener pendiente una migración de un módulo sin relación.

## 8. Personalizaciones del CORE

La detección debe crecer por etapas:

### Etapa inicial

1. Registrar en `coreCustomizations` cualquier edición deliberada de CORE o CORE_CUSTOMIZABLE.
2. Antes de migrar, comparar los archivos afectados con el baseline de la versión instalada mediante hashes suministrados por la release.
3. Si el archivo coincide, la migración puede tratarlo según ownership.
4. Si difiere y está registrado, preparar revisión o merge.
5. Si difiere y no está registrado, detenerse y clasificarlo antes de continuar.

### Evolución posterior

Se puede añadir una herramienta que genere el informe de divergencias y sugiera entradas del manifest. No debe decidir automáticamente si una diferencia es correcta, ni sobrescribir por antigüedad.

Esta combinación —ownership por reglas, baseline de la release y lista explícita de personalizaciones— cubre las primeras webs sin mantener una base de datos central ni introducir un sistema de parches permanente en cada archivo.

## 9. Qué no haremos todavía

Quedan expresamente fuera de la primera implementación:

- convertir el CORE en un paquete npm;
- actualizaciones automáticas;
- merges automáticos desde `starter/main`;
- un dashboard central;
- `factory-control`;
- CI compleja;
- bots de actualización;
- publicación o migración sin revisión del diff;
- sincronización de contenido o identidad PROJECT.

## Baseline de versión recomendado

El repositorio contiene hoy `version: 0.1.0` en `package.json`, diez commits funcionales y ninguna etiqueta Git. Ese número no acredita una release versionada del CORE: faltan identidad de kit, changelog, manifest, ownership y un primer recorrido de migración verificable.

La infraestructura mínima queda identificada como **`WEB_KIT 1.0.0-rc.1`** y debe usarse para ensayar una web hija. Si el ensayo confirma las fronteras y el recorrido de migración, la primera baseline estable soportada debe ser **`WEB_KIT 1.0.0`**.

Empezar en `1.0.0` después del ensayo es preferible a perpetuar `0.x`: el CORE actual ya es utilizable por webs independientes y el sistema necesita un contrato de compatibilidad claro. La versión actual de `package.json` debe considerarse pre-baseline hasta que ese proceso termine.

# Recommended implementation sequence

1. Aprobar el inventario y resolver o documentar de forma normativa las fronteras mixtas de configuración, navegación y tokens.
2. Añadir la identidad técnica provisional `WEB_KIT`, la fuente única de versión del CORE y un changelog.
3. Definir y validar los schemas y templates de `.factory/project.json` y `.factory/ownership.json`.
4. Crear la estructura y el formato de migraciones, incluido baseline de checksums, preflight, validación y rollback.
5. Actualizar `AGENTS.md` y `CHATGPT-PROJECT-INSTRUCTIONS.md` con el flujo version-aware y la prohibición de merges ciegos.
6. Formalizar la arquitectura y las versiones independientes de los módulos actuales, especialmente editorial y formulario.
7. Emitir `WEB_KIT 1.0.0-rc.1` y ensayar creación, personalización, detección de divergencias y actualización.
8. Corregir el modelo a partir del ensayo, fijar la política de soporte y publicar la primera baseline `WEB_KIT 1.0.0` con su changelog.
9. Migrar una web hija real de forma supervisada, documentar el resultado y usarlo como prueba del proceso antes de automatizar nada.
