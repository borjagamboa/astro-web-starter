# Flujo editorial

Esta capa separa las decisiones de contenido de su implementación. No es un CMS ni exige redactar toda la web antes de ver una primera versión.

La capa de copy comercial es un contrato operativo del CORE. No activa ni sustituye el MODULE `editorial` existente para blog y Content Collections; una web puede usar esta capa sin instalar ese módulo.

## Responsabilidades

La persona responsable del proyecto y ChatGPT deciden arquitectura editorial, jerarquía de información, mensajes, tono, copy, ubicación conceptual, revisión y aprobación.

Codex implementa y conecta ese contenido, compone la interfaz, adapta el diseño a la longitud real y protege responsive y accesibilidad. Puede señalar problemas, pero no reescribe contenido `REVIEWED` o `FINAL` sin autorización explícita.

## Estados editoriales

- `PROVISIONAL`: puede generarse o modificarse durante el prototipado.
- `REVIEWED`: ha pasado revisión editorial y se implementa literalmente.
- `FINAL`: está aprobado y se trata literalmente salvo cambio solicitado expresamente.

El estado mínimo en runtime es `EditorialMeta.status`, definido en `src/lib/editorial.ts`. Cada objeto de página decide su propia estructura y reutiliza únicamente los contratos compartidos que necesite.

## Dos representaciones, una decisión editorial

- `docs/content-map.md` es la fuente humana: explica orden, intención, copy aprobado y notas editoriales o de composición.
- `src/data/content/*.ts` es la representación runtime que consumen las páginas Astro.

Cuando se aprueba un cambio, el prompt a Codex debe actualizar ambos cuando corresponda. No hay sincronización automática. Si difieren, Codex no elige ni mezcla versiones: informa del conflicto y pide que se confirme el copy correcto.

Los archivos runtime son específicos por página, por ejemplo `home.ts`, `about.ts` o `contact.ts`. No existe un schema universal de página. Un archivo puede definir su interfaz local y usar `EditorialMeta` y `EditorialAction`:

```ts
import type { EditorialAction, EditorialMeta } from '../../lib/editorial';

interface HomeContent {
  hero: {
    editorial: EditorialMeta;
    heading: string;
    body: string;
    primaryAction: EditorialAction;
  };
}
```

## Flujo de revisión

1. Quick Start autoriza, cuando proceda, una V0 con copy `PROVISIONAL`.
2. La persona usuaria revisa la página visible.
3. ChatGPT concreta estructura y textos en `docs/content-map.md`.
4. ChatGPT entrega a Codex copy exacto, ubicación conceptual y estado.
5. Codex actualiza el content map y los objetos runtime aplicables, sin reinterpretar el texto.
6. Se revisan composición, responsive y accesibilidad con la longitud real.
7. ChatGPT y la persona responsable marcan el contenido como `FINAL` cuando está aprobado.

Ejemplo de encargo:

> Actualiza exclusivamente `HOME > HERO` con este copy exacto y estado `REVIEWED`. Copia literalmente eyebrow, H1, body y CTA en `docs/content-map.md` y `src/data/content/home.ts`. No cambies el texto, el resto de secciones ni la dirección visual. Adapta únicamente la composición si la longitud lo exige.

## Adopción por webs existentes

La futura `MIG-001-editorial-content-layer` deberá introducir el contrato `src/lib/editorial.ts`, crear `docs/content-map.md` desde la plantilla, crear `src/data/content/` con objetos específicos para las páginas adoptadas y sustituir gradualmente copy inline por imports runtime. Tendrá que preservar literalmente el contenido existente, clasificar su estado con revisión humana y no tocar páginas que queden fuera del alcance acordado.
