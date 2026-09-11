# Flujo Quick Start

El objetivo del starter es simple: **un brief de pocos minutos debe bastar para generar una primera web completa y coherente sin obligar al usuario a tomar decisiones técnicas**.

## Input mínimo

Completa el Quick Start de `PROJECT-BRIEF.md` y añade las rutas del logo y los assets disponibles. Para empezar bastan nombre y actividad, objetivo, público, oferta, CTA y permiso para usar contenido existente o redactar borradores.

Páginas, ámbito, contacto, assets y dirección visual ayudan, pero pueden omitirse cuando no existan o Codex pueda proponerlos con seguridad.

## Qué puede decidir Codex

Codex puede registrar como provisional y proponer:

- composición, jerarquía y orden de secciones;
- Hero, cards, superficies y ritmo visual;
- tokens, dirección artística, SVG original y decoración;
- copy preliminar, iconografía e interacción ligera;
- combinación de patterns y estructura inicial de navegación.

## Qué no puede inventar

No puede presentar como reales datos de contacto, direcciones, horarios, precios, certificaciones, años de experiencia, clientes, testimonios, resultados, métricas, claims, credenciales, endpoints ni textos legales. Los datos ausentes se omiten o quedan pendientes.

## Orden operativo

1. Crear un proyecto separado desde el starter.
2. Copiar logo y assets autorizados.
3. Completar el Quick Start.
4. Configurar identidad, navegación, tokens y contenido provisional.
5. Componer una primera versión completa de las páginas prioritarias.
6. Abrir la URL local y pedir revisión; obtener capturas de móvil y desktop cuando aclaren la decisión visual.
7. Corregir primero jerarquía, identidad, contenido y responsive.
8. Completar el Advanced necesario antes de integrar servicios o publicar.
9. Ejecutar `npm run validate`, `npm run check:leakage`, `npm run build` y `git diff --check`.

La primera revisión debe ocurrir cuando ya exista una experiencia navegable, no después de resolver toda la infraestructura. Advanced entra cuando una decisión de SEO, migración, legal, proveedor, medición o producción sea necesaria o antes del lanzamiento.

## Ejemplo ficticio mínimo

```text
Nombre: Taller Norte
Actividad: Taller de bicicletas
Objetivo: Conseguir solicitudes de reparación
Público: Personas que usan bicicleta a diario
Ubicación: Pamplona
Oferta: Reparaciones, mantenimiento y bicicletas
Menú: Inicio / Reparaciones / Bicicletas / Contacto
Estilo: Industrial, cercano, con algo de movimiento
CTA: Pedir cita
Assets: logo.svg + 5 fotos propias
Contenido: Codex puede redactar un primer borrador
```

Esta información basta para empezar; no autoriza a inventar teléfono, horario, precios, experiencia, reseñas ni disponibilidad.

## Próxima prueba

El siguiente paso es crear un proyecto separado desde el starter y generar una web completa usando solo Quick Start. No debe realizarse dentro del repositorio base.
