# MIG-001-editorial-content-layer — Capa editorial de páginas

- **Migration ID:** `MIG-001-editorial-content-layer`
- **From:** `1.0.0-rc.1`
- **To:** `1.0.0-rc.2`
- **Scope:** CORE
- **Requirement:** Required para cualquier web que quiera declarar instalado WEB_KIT `1.0.0-rc.2`.

## Motivation

Esta migración separa el copy editorial de páginas y su implementación visual. La persona responsable del proyecto y ChatGPT pasan a controlar estructura editorial, mensajes y aprobación; Codex implementa el contenido exacto, lo conecta con Astro y adapta la composición sin asumir la autoría del texto final.

El resultado incorpora:

- el contrato CORE `src/lib/editorial.ts`;
- `docs/content-map.md` como fuente humana/editorial;
- objetos específicos por página bajo `src/data/content/` cuando existan páginas comerciales o editoriales;
- los estados `PROVISIONAL`, `REVIEWED` y `FINAL`;
- reglas editoriales en `AGENTS.md` y `CHATGPT-PROJECT-INSTRUCTIONS.md`;
- el delta de ownership de rc.1 a rc.2.

MIG-001 no es una revisión de copy ni un rediseño.

## Preconditions

- El proyecto tiene `.factory/project.json` válido con `installedCoreVersion: "1.0.0-rc.1"`.
- Si el proyecto era legacy, `migrationsApplied` contiene `MIG-000-bootstrap-kit-governance` completada.
- `.factory/ownership.json` está disponible y sus reglas adicionales propias están identificadas.
- El trabajo se realiza en una rama dedicada desde un estado limpio y conocido.
- Se han leído `AGENTS.md`, las instrucciones de ChatGPT, páginas, componentes, layouts, fuentes de contenido e idiomas antes de modificar nada.
- Se conocen los comandos que realmente existen en `package.json`; no se presuponen scripts ausentes.
- No se mezclan en la rama cambios de copy, diseño, SEO, dependencias o producto ajenos a la migración.

Si el manifest no acredita rc.1, detenerse. Un proyecto `legacy-unversioned` debe completar antes MIG-000.

## Fundamental copy-preservation rule

El copy visible existente se preserva literalmente en la medida técnicamente posible. Al extraerlo:

- no mejorarlo ni resumirlo;
- no hacerlo más SEO, comercial, cercano, juvenil o informal;
- no corregir tono, puntuación ni erratas;
- no traducirlo;
- no añadir slogans, mensajes o información;
- no verificar ni actualizar datos factuales.

Escapar comillas o saltos para representarlos válidamente en TypeScript no es un cambio editorial, pero el texto renderizado debe permanecer equivalente. Si una extracción exacta exige un refactor amplio o altera markup, preferir una extracción más pequeña y conservadora.

### Estado inicial

- Si existe evidencia explícita de aprobación, conservar únicamente el estado que esa evidencia demuestre.
- Si no existe evidencia, asignar `PROVISIONAL`.
- No inferir `REVIEWED` o `FINAL` por calidad, antigüedad, publicación o apariencia terminada.
- Si una sección mezcla textos con evidencia distinta, separarlos conceptualmente o documentar el estado en el nivel mínimo necesario; no elevar todo el bloque al estado más alto.

## Potentially affected paths

- `src/lib/editorial.ts` — contrato CORE de rc.2.
- `docs/editorial-workflow.md` — documentación CORE.
- `docs/content-map.md` — fuente editorial PROJECT.
- `docs/content-map-template.md` — PRESET opcional.
- `src/data/content/**` — contenido runtime PROJECT.
- páginas o archivos de presentación que actualmente contienen el copy extraído — solo imports y conexión de datos mínimos.
- `AGENTS.md` — integración controlada de reglas editoriales.
- `CHATGPT-PROJECT-INSTRUCTIONS.md` — integración controlada de responsabilidad editorial.
- `.factory/ownership.json` — delta de cinco reglas.
- `.factory/project.json` — actualización final, nunca inicial.

## Must preserve

- copy visible, incluidas erratas y datos existentes;
- diseño, identidad visual y jerarquía visual;
- markup salvo el ajuste técnico mínimo imprescindible;
- componentes, layouts, orden de secciones y responsive;
- animaciones e interacciones;
- páginas, rutas, slugs y funcionalidad;
- idiomas y arquitectura de localización;
- imágenes, logos, fuentes y assets;
- configuración, navegación e integraciones;
- teléfonos, emails, direcciones, precios, fechas, horarios, nombres, eventos, enlaces, claims y testimonios existentes;
- titles, metadescripciones, canonicals, structured data, redirects, hreflang, robots y sitemap;
- reglas propias de `AGENTS.md`, instrucciones de ChatGPT y ownership adicional legítimo.

Los datos factuales se trasladan sin verificarlos ni corregirlos. Su revisión corresponde a otra tarea.

## Content boundary

### Migrar prioritariamente

- Hero y presentaciones de página;
- introducciones, headings y cuerpos de texto;
- labels de CTA y enlaces editoriales;
- textos de secciones y bloques promocionales;
- copy de contacto propio de la página;
- otros mensajes editoriales estáticos específicos del proyecto.

### No mover automáticamente

- artículos Markdown o Content Collections;
- contenido gestionado por un CMS;
- datos estructurados con fuente propia;
- configuración técnica;
- navegación cuando su sistema actual ya es correcto;
- labels internos de accesibilidad pertenecientes a componentes CORE;
- mensajes técnicos o de validación propios de componentes de formulario;
- datos que no sean copy editorial.

La capa editorial de páginas forma parte del CORE operativo. El MODULE `editorial` de blog y Content Collections es independiente: no se activa por MIG-001 y sus entradas continúan en su sistema actual.

## CORE editorial contract

Crear o integrar `src/lib/editorial.ts` con el contrato de rc.2:

```ts
export const editorialStatuses = ['PROVISIONAL', 'REVIEWED', 'FINAL'] as const;

export type EditorialStatus = (typeof editorialStatuses)[number];

export interface EditorialMeta {
  status: EditorialStatus;
}

export interface EditorialAction {
  label: string;
  href: string;
}
```

Si ya existe un archivo con el mismo propósito, compararlo e integrar el contrato sin sobrescribir lógica del proyecto. Para declarar rc.2, los exports anteriores deben quedar disponibles y ser compatibles. Cualquier divergencia deliberada en esta ruta `kit-managed` debe documentarse en `coreCustomizations`; una incompatibilidad sin resolver bloquea la migración.

## Human source: docs/content-map.md

Crear `docs/content-map.md` a partir de la estructura conceptual de `docs/content-map-template.md`. Debe inventariar cada página comercial o editorial incluida en la migración y sus secciones en orden narrativo.

Por página:

- ruta;
- propósito de página;
- lista ordenada de secciones.

Por sección:

- identificador conceptual estable, por ejemplo `hero`, `intro`, `services`, `live` o `contact`;
- propósito;
- estado `PROVISIONAL`, `REVIEWED` o `FINAL`;
- eyebrow o kicker existente;
- heading y nivel cuando sea relevante;
- body, listas u otro copy visible;
- CTA labels y destinos;
- notas editoriales existentes;
- notas de composición solo cuando ayuden a localizar o entender el contenido.

No describir píxeles, clases, coordenadas ni CSS. Los identificadores representan función editorial, no posición física.

Si la web no tiene páginas comerciales/editoriales aplicables, crear igualmente un content map mínimo que documente el inventario revisado y la ausencia de extracción runtime. No crear copy para rellenarlo.

`docs/content-map-template.md` es un PRESET: puede copiarse a la web como ayuda, pero su presencia no determina que el CORE esté actualizado. `docs/content-map.md` es PROJECT-owned y nunca se sincroniza desde el kit.

## Runtime source: src/data/content

Para cada página migrada, crear un objeto específico en una ruta coherente con el proyecto, por ejemplo:

```text
src/data/content/home.ts
src/data/content/about.ts
src/data/content/contact.ts
```

No crear un schema universal de páginas. Cada módulo define la forma mínima que necesita y reutiliza `EditorialMeta` o `EditorialAction` solo cuando aportan valor. El estado debe situarse junto al bloque editorial al que afecta.

Ejemplo conceptual:

```ts
import type { EditorialAction, EditorialMeta } from '../../lib/editorial';

interface HomeContent {
  hero: {
    editorial: EditorialMeta;
    eyebrow?: string;
    heading: string;
    body: string;
    primaryAction: EditorialAction;
  };
}

export const homeContent = {
  hero: {
    editorial: { status: 'PROVISIONAL' },
    heading: '[COPY EXISTENTE EXTRAÍDO LITERALMENTE]',
    body: '[COPY EXISTENTE EXTRAÍDO LITERALMENTE]',
    primaryAction: {
      label: '[LABEL EXISTENTE]',
      href: '[DESTINO EXISTENTE]'
    }
  }
} satisfies HomeContent;
```

Los placeholders del ejemplo no se copian a una web. La implementación utiliza exclusivamente su contenido existente.

Conectar la página mediante imports y props sin cambiar componentes o estructura salvo que sea técnicamente imprescindible. Eliminar el copy inline solo después de comprobar que el runtime nuevo se usa realmente y renderiza el mismo contenido.

## Multilingual projects

- Preservar todos los idiomas existentes.
- No traducir ni regenerar un idioma desde otro.
- Mantener la arquitectura de locales existente si es limpia y funcional.
- Separar runtime por locale solo cuando sea necesario, por ejemplo `src/data/content/es/home.ts` y `src/data/content/eu/home.ts`.
- No imponer esa estructura si el proyecto ya dispone de otra autoridad coherente.
- Inventariar, extraer y comparar cada variante lingüística de forma independiente.

La ausencia o pérdida de un idioma bloquea la finalización.

## Controlled update of AGENTS.md

No reemplazar el archivo. Preservar todas sus reglas específicas e integrar una sección editorial que establezca:

1. ChatGPT y la persona responsable controlan arquitectura editorial, copy, revisión y aprobación.
2. Codex controla implementación, composición, conexión de datos, responsive y accesibilidad.
3. El copy `PROVISIONAL` solo puede modificarse cuando esté autorizado.
4. `REVIEWED`, `FINAL` y cualquier texto declarado exacto se copian literalmente y no se reescriben sin instrucción explícita.
5. No se resume, traduce, puntúa de otra forma ni reinterpreta copy para SEO.
6. Los cambios editoriales se distinguen de los cambios de diseño.
7. `docs/content-map.md` es la fuente humana.
8. `src/data/content/**` es la representación runtime PROJECT-owned.
9. Ante divergencia entre ambas fuentes, Codex no decide: informa y solicita confirmación.

Si ya existe una regla equivalente, consolidarla sin duplicar ni rebajar su protección.

## Controlled update of CHATGPT-PROJECT-INSTRUCTIONS.md

No reemplazar el archivo. Preservar contexto, rol, decisiones y workflow propios e integrar:

- responsabilidad editorial de ChatGPT junto con la persona usuaria;
- redacción del copy concreto y su ubicación conceptual;
- uso de `docs/content-map.md` como fuente editorial;
- instrucción explícita para actualizar el runtime aplicable;
- estados y literalidad del contenido aprobado;
- separación entre CAMBIO DE COPY y CAMBIO DE DISEÑO;
- obligación de redactar una propuesta concreta cuando el problema sea textual.

Indicaciones vagas como “hazlo más juvenil”, “más cercano” o “más gamberro” no sustituyen al texto exacto en una revisión editorial. Si ya existen instrucciones equivalentes, integrarlas sin duplicar ni eliminar particularidades del proyecto.

## CORE documentation

- `docs/editorial-workflow.md` es documentación `kit-managed` de rc.2 y debe quedar disponible. Si existe, compararla e integrar de forma controlada; no reemplazar documentación propia ajena a este workflow.
- `docs/content-map-template.md` es un PRESET útil para iniciar content maps. Puede copiarse, pero no es requisito de compatibilidad ni se sincroniza automáticamente.
- `docs/content-map.md` se crea para el proyecto, es PROJECT-owned y contiene su contenido real.

Contenido normativo mínimo de `docs/editorial-workflow.md`: responsabilidades de ChatGPT/usuario y Codex; tres estados; dos fuentes; tratamiento literal; flujo de revisión; separación respecto al blog/Content Collections; y regla de divergencias. Puede conservar documentación adicional del proyecto mientras no contradiga estas reglas.

## Ownership delta: rc.1 → rc.2

No reemplazar ciegamente `.factory/ownership.json`. Conservar reglas adicionales legítimas y añadir, si no existen, estas cinco reglas en posiciones que respeten `last-match-wins`:

```json
[
  { "pattern": "src/data/content/**", "category": "project-owned" },
  { "pattern": "src/lib/editorial.ts", "category": "kit-managed" },
  { "pattern": "docs/content-map.md", "category": "project-owned" },
  { "pattern": "docs/editorial-workflow.md", "category": "kit-managed" },
  { "pattern": "docs/content-map-template.md", "category": "preset" }
]
```

Orden recomendado:

- `src/data/content/**` después de la regla general `src/data/**` y de excepciones de configuración existentes;
- `src/lib/editorial.ts` después de `src/lib/**`;
- las tres reglas `docs/**` después de la regla general de documentación.

Si ya existe una regla equivalente, no duplicarla. Si existe una regla contradictoria propia del proyecto, detenerse y resolver el ownership conscientemente antes de continuar.

## Content integrity procedure

Para cada lote:

1. Inventariar el copy visible antes de editar, por página, sección e idioma.
2. Registrar el mismo texto y su estado demostrable en `docs/content-map.md`.
3. Extraer el copy seleccionado a objetos runtime específicos.
4. Conectar esos objetos a las páginas con el cambio mínimo.
5. Volver a inspeccionar todas las páginas afectadas.
6. Comparar encabezados, párrafos, listas, CTA labels, enlaces y datos factuales.
7. Confirmar que no falta texto, no apareció copy nuevo y no quedan dos fuentes contradictorias.
8. Revisar cada idioma de forma independiente.
9. Comparar titles, metadescripciones y cualquier metadata SEO afectada indirectamente.
10. Revisar responsive, estados interactivos y apariencia visual en los viewports relevantes.

Cuando una representación técnica impida una comparación literal —por ejemplo rich text, HTML interpolado o whitespace normalizado— comparar el contenido renderizado y documentar la excepción.

## Large sites and batches

Una web grande puede migrarse por lotes. Antes de empezar, definir el alcance total de páginas comerciales/editoriales que debe cubrir MIG-001 y mantener un registro explícito de:

- páginas verificadas y migradas;
- páginas pendientes;
- páginas excluidas y motivo;
- idiomas revisados;
- divergencias pendientes entre content map y runtime.

Ese registro forma parte del informe de migración y no crea estados editoriales adicionales. `installedCoreVersion` permanece en rc.1 durante todos los lotes. Solo cuando el alcance acordado está completo y validado puede declararse rc.2. Content Collections y CMS que conservan su autoridad propia no cuentan como páginas pendientes de extracción.

## Steps

1. Confirmar rama dedicada, estado limpio, manifest rc.1 y ownership actual.
2. Inventariar páginas comerciales/editoriales, idiomas, fuentes de contenido, copy visible y metadata relacionada.
3. Definir el alcance total y, si hace falta, los lotes de migración.
4. Incorporar o integrar `src/lib/editorial.ts` y la documentación CORE necesaria.
5. Integrar el delta de ownership sin perder reglas propias.
6. Crear `docs/content-map.md` con el inventario y estado inicial conservador.
7. Extraer copy página por página a `src/data/content/**` y conectarlo con cambios mínimos.
8. Integrar de forma controlada las reglas editoriales en `AGENTS.md`.
9. Integrar la responsabilidad editorial en `CHATGPT-PROJECT-INSTRUCTIONS.md`.
10. Ejecutar el procedimiento de integridad, validaciones técnicas y revisión visual.
11. Resolver duplicados, omisiones, divergencias y lotes pendientes.
12. Solo después de completar todo, actualizar `.factory/project.json` a rc.2 y registrar MIG-001.
13. Revisar el diff y entregar el resultado para commit e integración humanos.

## Manifest update

No actualizar el manifest al principio ni entre lotes. Después de una migración completa y validada:

- establecer `installedCoreVersion` en `1.0.0-rc.2`;
- establecer `lastReviewedAgainstCoreVersion` en `1.0.0-rc.2`;
- conservar todas las entradas anteriores de `migrationsApplied` y añadir:

```json
{
  "id": "MIG-001-editorial-content-layer",
  "appliedAt": "YYYY-MM-DD"
}
```

- establecer `lastKitReviewDate` en la fecha real de finalización;
- conservar `createdFromCoreVersion`, `activeModules` y `coreCustomizations`, añadiendo únicamente personalizaciones CORE nuevas que la migración haya confirmado.

Si la migración queda parcial, no registrar MIG-001 ni declarar rc.2 instalada.

## Completion criteria

MIG-001 solo está completa cuando:

- [ ] `.factory/project.json` es válido y acreditaba rc.1 antes de empezar.
- [ ] MIG-000 figura como aplicada cuando el proyecto era legacy.
- [ ] `src/lib/editorial.ts` ofrece el contrato compatible con rc.2.
- [ ] `docs/editorial-workflow.md` contiene las reglas CORE necesarias.
- [ ] `docs/content-map.md` cubre todas las páginas del alcance acordado.
- [ ] Las páginas comerciales/editoriales aplicables consumen realmente `src/data/content/**`.
- [ ] No queda copy inline duplicado que contradiga el runtime.
- [ ] El texto visible, datos factuales, CTA labels y enlaces se preservaron.
- [ ] No se introdujo copy nuevo ni se corrigió contenido sin autorización.
- [ ] Todos los idiomas aplicables fueron revisados.
- [ ] Diseño, estructura, responsive, interacción, rutas y funcionalidad permanecen equivalentes.
- [ ] SEO y metadata visible permanecen equivalentes.
- [ ] Ownership contiene el delta rc.2 sin perder reglas propias.
- [ ] `AGENTS.md` y las instrucciones de ChatGPT incorporan rc.2 sin contradicciones.
- [ ] El build existente termina correctamente.
- [ ] Las validaciones, tests o lint preexistentes aplicables pasan.
- [ ] `git diff --check` pasa.
- [ ] La revisión visual y de copy está documentada.
- [ ] `git status --short` es conocido y solo contiene cambios explicables.
- [ ] El manifest se actualizó al final con rc.2, fecha real y MIG-001.

No exigir comandos que no existan. Leer primero `package.json` y ejecutar solamente scripts disponibles. Si una comprobación debe ser manual, documentar resultado y riesgo residual; nunca simular una validación.

## Rollback

Flujo recomendado:

```text
estado limpio
→ crear rama dedicada
→ inventariar copy
→ extraer por lotes
→ validar contenido, diseño y código
→ revisión visual/editorial
→ commit humano cuando sea correcta
→ integrar la rama solo tras aprobación
```

Antes del commit, retirar únicamente los cambios identificados de MIG-001 o abandonar la rama conservando el commit base. Después del commit, usar una reversión normal y revisable en la rama. No destruir historial ni usar resets peligrosos.

Si se revierte una migración ya integrada, restaurar las fuentes inline y conexiones anteriores antes de retirar los objetos runtime. El manifest debe volver a rc.1 y eliminar el registro MIG-001 solo como parte del mismo rollback completo y validado.

# Codex migration execution contract

Al ejecutar MIG-001 en una web hija, Codex debe:

- trabajar exclusivamente dentro de la raíz del repositorio hijo autorizado;
- comprobar `git status --short` y confirmar una rama dedicada antes de editar;
- leer primero `AGENTS.md`, `.factory/project.json`, `.factory/ownership.json` y la documentación del proyecto;
- inspeccionar páginas, layouts, componentes y fuentes actuales antes de mover contenido;
- inventariar el copy visible, CTA, idiomas y metadata relevante antes de extraer;
- preservar literalmente copy y datos, incluidas erratas, sin traducir ni optimizar;
- separar cambios editoriales de cambios de diseño y realizar solo ajustes técnicos mínimos;
- no hacer commit, push, merge, tag ni despliegue;
- no acceder a otro repositorio durante la ejecución; usar el contrato y el delta incluidos en esta migración;
- reportar archivos creados y modificados;
- reportar páginas e idiomas migrados;
- reportar contenido no migrado y el motivo;
- reportar cualquier divergencia entre content map, runtime y salida visible;
- ejecutar únicamente las validaciones disponibles, además de `git diff --check`, revisión visual, revisión de copy y `git status --short`;
- no registrar MIG-001 ni actualizar el manifest a rc.2 si queda un lote, divergencia, fallo o validación pendiente.
