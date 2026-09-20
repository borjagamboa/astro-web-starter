# Changelog

Los cambios relevantes de WEB_KIT se documentarán en este archivo. El formato sigue de forma sencilla los principios de Keep a Changelog y las versiones del CORE usan Semantic Versioning.

## [Unreleased]

## [1.0.0-rc.2] - 2026-09-20

### Added

- Arquitectura editorial CORE y contrato compartido en `src/lib/editorial.ts`.
- Content map humano y representación runtime del copy en `src/data/content/**`.
- Estados editoriales `PROVISIONAL`, `REVIEWED` y `FINAL`.
- División de responsabilidades entre ChatGPT y Codex, con protección del copy revisado o final.
- Ownership asociado para contratos, plantillas y contenido editorial de proyecto.

## [1.0.0-rc.1] - 2026-09-12

### Added

- Primera definición formal de la arquitectura y los contratos del CORE.
- Primitives, patterns y sistema de composición visual reutilizable.
- Infraestructura SEO, Content Collections y formularios desacoplados de proveedor.
- Guardrails de configuración y prevención de leakage.
- Flujo Quick Start para generar una primera web desde un brief mínimo.
- Identidad técnica, versión canónica, manifests, ownership y estructura documental de migraciones de WEB_KIT.
