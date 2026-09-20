# MIG-000-bootstrap-kit-governance — Bootstrap de gobierno de WEB_KIT

- **Migration ID:** `MIG-000-bootstrap-kit-governance`
- **From:** `legacy-unversioned`
- **To:** `1.0.0-rc.1`
- **Scope:** CORE
- **Requirement:** Required para cualquier proyecto legacy que quiera incorporarse al sistema gestionado de WEB_KIT.

`legacy-unversioned` no significa necesariamente código antiguo. Significa que el proyecto nació antes de que existieran la identidad versionada, el manifest, el ownership y las reglas formales de migración del kit.

## Motivation

Esta migración incorpora gobierno y trazabilidad sin reconstruir la web ni sincronizar su árbol con el starter. Al completarla, el proyecto puede declarar de forma verificable que es compatible con el CORE `1.0.0-rc.1`, registrar sus personalizaciones y recibir futuras migraciones controladas.

La migración no demuestra la versión de origen. `createdFromCoreVersion` permanece en `null` cuando no existe evidencia. Tampoco convierte automáticamente cualquier web legacy en compatible con rc.1: antes de declarar la versión instalada debe completarse la revisión descrita aquí. Si aparecen ausencias o incompatibilidades que impiden sostener rc.1, la migración queda incompleta y el manifest no debe afirmar esa versión.

## Preconditions

- El repositorio hijo procede de WEB_KIT o de su starter anterior al versionado formal.
- El trabajo se realiza en una rama dedicada creada desde un estado limpio y conocido.
- Se ha leído el `AGENTS.md` existente, la documentación del proyecto y `git status --short`.
- Existe una forma recuperable de volver al estado anterior mediante la rama y su commit base.
- Se han identificado los scripts de validación que realmente existen en `package.json`; no se presuponen comandos ausentes.
- No hay cambios de producto, contenido o diseño mezclados con la migración.

## Potentially affected paths

- `.factory/project.json` — nuevo manifest del proyecto.
- `.factory/ownership.json` — snapshot de ownership correspondiente a rc.1.
- `AGENTS.md` — integración controlada de reglas de gobierno.
- `CHATGPT-PROJECT-INSTRUCTIONS.md` — integración controlada de instrucciones de versionado.

No se añaden dependencias, no se cambian versiones de Astro o paquetes y no se modifican scripts de `package.json` como parte de MIG-000.

## Must preserve

- contenido y copy;
- páginas, rutas y slugs propios;
- imágenes, logos, fuentes y demás assets;
- CSS específico y dirección visual;
- configuración del cliente y feature flags;
- integraciones y proveedores;
- datos de contacto;
- SEO, canonicals, schemas y redirects propios;
- idiomas y estrategia de localización;
- variables de entorno y sus nombres;
- instrucciones particulares ya presentes en `AGENTS.md` y `CHATGPT-PROJECT-INSTRUCTIONS.md`;
- cualquier personalización del CORE, hasta que una migración específica indique cómo adaptarla.

Las rutas `project-owned` nunca se sobrescriben. Una ruta desconocida se trata como PROJECT hasta resolver su ownership.

## Resulting project manifest

Crear `.factory/project.json` con el schema 1 actual. Sustituir `YYYY-MM-DD` por la fecha real de ejecución en formato ISO. Este ejemplo representa un proyecto sin módulos activos confirmados y sin personalizaciones detectadas; esos dos arrays solo pueden permanecer vacíos después de revisarlos expresamente.

```json
{
  "schemaVersion": 1,
  "kitId": "WEB_KIT",
  "createdFromCoreVersion": null,
  "installedCoreVersion": "1.0.0-rc.1",
  "lastReviewedAgainstCoreVersion": "1.0.0-rc.1",
  "activeModules": [],
  "migrationsApplied": [
    {
      "id": "MIG-000-bootstrap-kit-governance",
      "appliedAt": "YYYY-MM-DD"
    }
  ],
  "coreCustomizations": [],
  "lastKitReviewDate": "YYYY-MM-DD"
}
```

Reglas de inicialización:

- `createdFromCoreVersion` debe ser `null` salvo que exista evidencia verificable de la versión exacta con la que nació la web.
- `installedCoreVersion` y `lastReviewedAgainstCoreVersion` solo se establecen en `1.0.0-rc.1` al final, después de completar auditoría y validación.
- `activeModules` registra únicamente módulos cuya presencia se haya confirmado. Cuando el módulo existe pero no puede demostrarse una versión independiente, usar el formato ya previsto por el manifest sin inventarla: `{ "id": "module-id", "version": null }`.
- `migrationsApplied` debe contener la entrada mostrada y la fecha real.
- `coreCustomizations` usa exclusivamente objetos `{ "path": "...", "reason": "..." }`.
- `lastKitReviewDate` contiene la fecha real en que terminó la revisión, no la fecha de creación histórica del proyecto.

Ejemplos válidos de personalización o incertidumbre registrada:

```json
[
  {
    "path": "src/components/navigation/Header.astro",
    "reason": "Estructura y navegación adaptadas al proyecto"
  },
  {
    "path": "src/styles/tokens.css",
    "reason": "Revisión pendiente: no puede demostrarse que los valores coincidan con el baseline"
  }
]
```

No añadir campos de estado nuevos para expresar dudas. La duda se registra de forma explícita en `reason` y se informa como revisión pendiente.

## Ownership snapshot for rc.1

La fuente de verdad es el mapa de ownership publicado con WEB_KIT `1.0.0-rc.1`, no el mapa de una versión posterior. Crear `.factory/ownership.json` con el siguiente snapshot exacto. Así la ejecución es autosuficiente dentro del repositorio hijo y no incorpora reglas de rc.2.

```json
{
  "schemaVersion": 1,
  "kitId": "WEB_KIT",
  "patternSyntax": "repo-relative-posix-glob",
  "resolution": "last-match-wins",
  "unmatched": "review-required",
  "rules": [
    { "pattern": "README.md", "category": "project-owned" },
    { "pattern": "PROJECT-BRIEF.md", "category": "project-owned" },
    { "pattern": "AGENTS.md", "category": "core-customizable" },
    { "pattern": "CHATGPT-PROJECT-INSTRUCTIONS.md", "category": "core-customizable" },
    { "pattern": ".gitignore", "category": "core-customizable" },
    { "pattern": ".env.example", "category": "core-customizable" },
    { "pattern": "astro.config.mjs", "category": "core-customizable" },
    { "pattern": "package.json", "category": "core-customizable" },
    { "pattern": "package-lock.json", "category": "core-customizable" },
    { "pattern": "tsconfig.json", "category": "core-customizable" },

    { "pattern": "KIT_VERSION", "category": "kit-managed" },
    { "pattern": "CHANGELOG.md", "category": "kit-managed" },
    { "pattern": ".factory/kit.json", "category": "kit-managed" },
    { "pattern": ".factory/ownership.json", "category": "kit-managed" },
    { "pattern": ".factory/project.template.json", "category": "preset" },
    { "pattern": ".factory/project.json", "category": "project-owned" },

    { "pattern": "src/components/primitives/**", "category": "kit-managed" },
    { "pattern": "src/components/patterns/**", "category": "kit-managed" },
    { "pattern": "src/components/utilities/**", "category": "kit-managed" },
    { "pattern": "src/components/navigation/**", "category": "core-customizable" },
    { "pattern": "src/components/navigation/Breadcrumbs.astro", "category": "kit-managed" },
    { "pattern": "src/components/forms/**", "category": "module", "moduleId": "contact-form" },

    { "pattern": "src/layouts/**", "category": "kit-managed" },
    { "pattern": "src/layouts/ArticleLayout.astro", "category": "module", "moduleId": "editorial" },

    { "pattern": "src/data/**", "category": "project-owned" },
    { "pattern": "src/data/site.ts", "category": "core-customizable" },
    { "pattern": "src/data/navigation.ts", "category": "core-customizable" },

    { "pattern": "src/lib/**", "category": "project-owned" },
    { "pattern": "src/lib/seo.ts", "category": "kit-managed" },
    { "pattern": "src/lib/structured-data.ts", "category": "kit-managed" },
    { "pattern": "src/lib/content.ts", "category": "module", "moduleId": "editorial" },
    { "pattern": "src/lib/forms.ts", "category": "module", "moduleId": "contact-form" },

    { "pattern": "src/styles/**", "category": "project-owned" },
    { "pattern": "src/styles/global.css", "category": "kit-managed" },
    { "pattern": "src/styles/tokens.css", "category": "core-customizable" },

    { "pattern": "src/content/**", "category": "project-owned" },
    { "pattern": "src/content.config.ts", "category": "module", "moduleId": "editorial" },

    { "pattern": "src/pages/**", "category": "project-owned" },
    { "pattern": "src/pages/robots.txt.ts", "category": "kit-managed" },
    { "pattern": "src/pages/blog/**", "category": "module", "moduleId": "editorial" },

    { "pattern": "scripts/validate-config.mjs", "category": "kit-managed" },
    { "pattern": "scripts/check-leakage.mjs", "category": "kit-managed" },
    { "pattern": "scripts/validate-kit-metadata.mjs", "category": "kit-managed" },

    { "pattern": "public/**", "category": "project-owned" },
    { "pattern": "public/images/starter-grid.svg", "category": "preset" },
    { "pattern": "public/images/starter-orbit.svg", "category": "preset" },

    { "pattern": "docs/**", "category": "project-owned" },
    { "pattern": "docs/architecture.md", "category": "kit-managed" },
    { "pattern": "docs/seo-workflow.md", "category": "kit-managed" },
    { "pattern": "docs/kit-versioning-plan.md", "category": "kit-managed" },
    { "pattern": "docs/composition-system.md", "category": "core-customizable" },
    { "pattern": "docs/content-workflow.md", "category": "module", "moduleId": "editorial" },
    { "pattern": "docs/forms-and-validation.md", "category": "module", "moduleId": "contact-form" },
    { "pattern": "docs/page-recipes.md", "category": "preset" },
    { "pattern": "docs/quick-start-workflow.md", "category": "preset" },
    { "pattern": "docs/starter-implementation-plan.md", "category": "preset" },
    { "pattern": "docs/migrations/**", "category": "kit-managed" }
  ]
}
```

Interpretación obligatoria:

- `project-owned`: nunca sobrescribir desde el kit.
- `core-customizable`: revisar y adaptar conscientemente si el proyecto lo modificó.
- `kit-managed`: candidato a una actualización declarada mediante migración; una divergencia no se reemplaza sin revisión.
- `module`: solo se evalúa y actualiza cuando el módulo está activo.
- `preset`: material opcional; no determina el estado del CORE.
- `review-required`: tratamiento conservador para cualquier ruta sin regla aplicable.

Las reglas se evalúan en orden y gana la última coincidencia. Las excepciones concretas posteriores prevalecen sobre las reglas generales.

## Controlled update of AGENTS.md

No reemplazar `AGENTS.md`. Leerlo completo y conservar todas las reglas específicas del proyecto. Integrar o adaptar una sección de gobierno que cubra obligatoriamente:

1. `.factory/project.json` como declaración de versión, módulos, migraciones y personalizaciones.
2. `.factory/ownership.json` como autoridad para el tratamiento de rutas.
3. preservación absoluta de `project-owned`.
4. revisión manual de `core-customizable` modificado.
5. actualización exclusiva de módulos activos.
6. irrelevancia de PRESETS para el estado del CORE.
7. prohibición de `git merge starter/main` y de copiar árboles completos del starter.
8. uso de migraciones explícitas, acotadas y validadas.
9. actualización del manifest solo después de terminar correctamente todos los pasos y validaciones.

Si `AGENTS.md` no existe, crear uno mínimo con esas reglas y las restricciones operativas ya confirmadas del proyecto. No importar otras instrucciones genéricas que puedan contradecir su funcionamiento.

## Controlled update of CHATGPT-PROJECT-INSTRUCTIONS.md

No reemplazar el archivo completo. Preservar el rol, contexto, decisiones y workflow particulares del proyecto. Incorporar únicamente estas reglas de gobierno y versionado:

- consultar `.factory/project.json` antes de proponer una actualización;
- distinguir trabajo normal del proyecto de una migración del kit;
- no proponer merges automáticos ni copias completas del starter;
- usar la migración documentada cuando exista;
- preservar `project-owned`;
- avisar y pedir revisión ante `core-customizable` modificado;
- actualizar únicamente módulos activos;
- actualizar el manifest solo tras validación completa.

Si el archivo no existe, crear una sección mínima con estas reglas. MIG-000 no incorpora otras capacidades o workflows de releases posteriores.

## Manual review of CORE customizations

La migración no dispone todavía de baseline de hashes. La revisión es manual y asistida por Codex:

1. Leer `.factory/ownership.json` con resolución `last-match-wins`.
2. Enumerar los archivos `core-customizable` que existen en el proyecto, incluyendo como mínimo Header, Footer, Logo, `site.ts`, `navigation.ts`, `tokens.css`, configuración Astro, manifests npm, TypeScript y documentos operativos.
3. Inspeccionar cada archivo y su contexto para detectar cambios evidentes de marca, estructura, navegación, tokens, configuración, dependencias o instrucciones.
4. Registrar cada personalización confirmada en `coreCustomizations` usando solo `path` y `reason`.
5. Si el origen de una diferencia no puede demostrarse, registrarla como revisión pendiente en `reason`; no afirmar que el archivo está intacto.
6. Revisar también divergencias o ausencias en rutas `kit-managed`. Una ausencia o incompatibilidad material que impida sostener rc.1 bloquea la finalización en lugar de convertirse silenciosamente en personalización.

Esta auditoría no modifica los archivos revisados. Solo documenta su estado y decide si la declaración de compatibilidad es defendible.

## Steps

1. Confirmar rama dedicada, estado limpio inicial y commit base recuperable.
2. Inventariar estructura, scripts, módulos opcionales y estado funcional de la web sin modificarla.
3. Crear `.factory/ownership.json` con el snapshot rc.1 incluido en este documento.
4. Auditar `core-customizable`, `kit-managed` y módulos activos; preparar `coreCustomizations` y `activeModules` sin inventar versiones.
5. Integrar de forma controlada las reglas obligatorias en `AGENTS.md`.
6. Integrar únicamente gobierno/versionado en `CHATGPT-PROJECT-INSTRUCTIONS.md`.
7. Preparar `.factory/project.json`, manteniendo todavía sin afirmar rc.1 si la auditoría no ha terminado.
8. Ejecutar las validaciones existentes y las comprobaciones manuales de esta migración.
9. Solo si todo termina correctamente, completar fechas, registrar MIG-000 y establecer `installedCoreVersion` y `lastReviewedAgainstCoreVersion` en `1.0.0-rc.1`.
10. Revisar el diff completo y entregar el resultado para decisión humana de commit e integración.

## Excluded from this migration

MIG-000 no debe crear, exigir ni extraer:

- `docs/content-map.md`;
- `src/data/content/**`;
- estados editoriales en contenido runtime;
- copy inline hacia objetos de datos;
- la nueva división editorial entre ChatGPT y Codex.

Esos elementos corresponden exclusivamente a `MIG-001-editorial-content-layer`, que se definirá por separado. MIG-000 tampoco copia `KIT_VERSION`, `.factory/kit.json` ni `.factory/project.template.json` al proyecto hijo: la versión instalada de una web se declara en su `.factory/project.json`, mientras esos archivos describen el kit fuente y sus plantillas.

## Validation

La migración solo está completa cuando se ha verificado:

- [ ] `.factory/project.json` existe y su JSON es válido.
- [ ] `schemaVersion` es `1` y `kitId` es `WEB_KIT`.
- [ ] `createdFromCoreVersion` no inventa una versión histórica.
- [ ] `installedCoreVersion` y `lastReviewedAgainstCoreVersion` son `1.0.0-rc.1`.
- [ ] `migrationsApplied` contiene `MIG-000-bootstrap-kit-governance` con la fecha real.
- [ ] `lastKitReviewDate` contiene la fecha real de finalización.
- [ ] `.factory/ownership.json` existe, es JSON válido y coincide con el snapshot rc.1 de esta migración.
- [ ] Los módulos activos están identificados sin inventar versiones.
- [ ] Se revisaron todos los archivos `core-customizable` presentes y se registraron personalizaciones o dudas relevantes.
- [ ] No quedan incompatibilidades `kit-managed` conocidas que impidan afirmar compatibilidad con rc.1.
- [ ] `AGENTS.md` contiene las reglas obligatorias sin perder instrucciones del proyecto.
- [ ] `CHATGPT-PROJECT-INSTRUCTIONS.md` incorpora gobierno/versionado sin perder instrucciones del proyecto.
- [ ] `package.json`, lockfile y dependencias no cambiaron por MIG-000.
- [ ] El proyecto sigue compilando mediante su comando de build existente.
- [ ] Los comandos preexistentes de validación, tests o lint aplicables siguen pasando.
- [ ] `git diff --check` pasa.
- [ ] La revisión visual no muestra cambios inesperados.
- [ ] `git status --short` es conocido y solo contiene cambios explicables por la migración.

No exigir `npm run validate:kit`, `npm run validate`, `npm run check:leakage` ni cualquier otro script que no exista en el proyecto hijo. Leer primero `package.json` y ejecutar solo comandos disponibles. Si no existe una validación automática equivalente, documentar la comprobación manual y el riesgo residual; nunca simular un resultado.

## Rollback

Flujo recomendado:

```text
estado limpio
→ crear rama dedicada
→ aplicar MIG-000 sin commit automático
→ validar y revisar
→ commit humano cuando sea correcta
→ integrar la rama solo tras aprobación
```

Antes del commit, retirar únicamente los cambios identificados de MIG-000 o abandonar la rama conservando el commit base. Después del commit, usar una reversión normal y revisable en esa rama. No destruir historial, no usar resets peligrosos y no mezclar el rollback con cambios de producto.

## Manifest update

El manifest se considera actualizado solo cuando contiene el resultado final descrito y todas las validaciones han pasado. Si cualquier comprobación falla:

- no registrar MIG-000 como aplicada;
- no declarar `installedCoreVersion: 1.0.0-rc.1`;
- conservar el informe de hallazgos y resolverlos antes de reintentar.

Tras una MIG-000 completa, la ruta de actualización queda preparada así:

```text
legacy-unversioned
→ MIG-000-bootstrap-kit-governance
→ WEB_KIT 1.0.0-rc.1
→ MIG-001-editorial-content-layer
→ WEB_KIT 1.0.0-rc.2
```

Este documento no define los pasos internos de MIG-001.

# Codex migration execution contract

Al ejecutar MIG-000 en una web hija, Codex debe:

- trabajar exclusivamente dentro de la raíz del repositorio hijo autorizado;
- leer primero `AGENTS.md`, la documentación disponible y `git status --short`;
- confirmar que trabaja sobre una rama dedicada y partir de un estado conocido;
- no hacer commit, push, merge, tag ni despliegue;
- preservar todas las rutas PROJECT y todas las personalizaciones existentes;
- no acceder a otro repositorio para copiar archivos durante la ejecución; esta migración contiene el ownership necesario;
- limitar los cambios a `.factory/project.json`, `.factory/ownership.json` y la integración controlada de gobierno en los dos documentos operativos;
- reportar todos los archivos creados y modificados;
- reportar personalizaciones y dudas detectadas en CORE_CUSTOMIZABLE;
- ejecutar los comandos de validación realmente disponibles, `git diff --check`, revisión visual y `git status --short`;
- no afirmar que la migración está completa, ni escribir la versión final en el manifest, si falla una comprobación o la compatibilidad con rc.1 no puede sostenerse.
