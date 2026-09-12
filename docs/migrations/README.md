# Migraciones de WEB_KIT

Una migración es un conjunto explícito, revisable y reversible de pasos para llevar una web desde una versión conocida del CORE o de un MODULE hasta otra. Se necesita cuando copiar un cambio aislado no basta para conservar los contratos, la configuración o la compatibilidad.

- Una migración **CORE** afecta a la infraestructura común y declara si es obligatoria para todas las webs compatibles.
- Una migración **MODULE** solo se aplica cuando ese módulo figura como activo en `.factory/project.json`.
- Nunca se usa `git merge starter/main` ni se copia el árbol completo del starter como método de actualización.
- Las rutas `project-owned` se preservan.
- Una ruta `core-customizable` modificada requiere revisar y adaptar el cambio; no se sobrescribe.

## Flujo mínimo

1. Leer `KIT_VERSION`, `.factory/project.json`, `.factory/ownership.json` y la migración aplicable.
2. Confirmar versión de origen, módulos activos, prerrequisitos y un estado recuperable de Git.
3. Revisar las rutas potencialmente afectadas y detectar personalizaciones.
4. Ejecutar únicamente los pasos declarados y conservar todo lo indicado en **Must preserve**.
5. Ejecutar la validación técnica, revisar el diff y completar la revisión manual indicada.
6. Actualizar `.factory/project.json` solo cuando todos los pasos y validaciones hayan terminado correctamente.

Las migraciones se crean a partir de [`MIGRATION-TEMPLATE.md`](MIGRATION-TEMPLATE.md). Su identificador es estable y no se reutiliza.
