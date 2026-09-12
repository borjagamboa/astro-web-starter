import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
const validCategories = new Set([
  'kit-managed',
  'core-customizable',
  'project-owned',
  'module',
  'preset',
]);

const errors = [];

const readText = async (path) => {
  try {
    return await readFile(resolve(root, path), 'utf8');
  } catch (error) {
    errors.push(`${path}: no se pudo leer (${error.code ?? error.message}).`);
    return null;
  }
};

const readJson = async (path) => {
  const source = await readText(path);
  if (source === null) return null;

  try {
    return JSON.parse(source);
  } catch (error) {
    errors.push(`${path}: JSON inválido (${error.message}).`);
    return null;
  }
};

const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;
const hasExactKeys = (value, expectedKeys) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const actualKeys = Object.keys(value).sort();
  return actualKeys.length === expectedKeys.length
    && expectedKeys.slice().sort().every((key, index) => key === actualKeys[index]);
};

const versionSource = await readText('KIT_VERSION');
const version = versionSource?.trim();

if (versionSource !== null && !semverPattern.test(version)) {
  errors.push('KIT_VERSION: la versión no sigue SemVer.');
}

const kit = await readJson('.factory/kit.json');
const kitKeys = ['kitId', 'coreVersion', 'manifestSchemaVersion', 'ownershipSchemaVersion'];

if (kit && !hasExactKeys(kit, kitKeys)) {
  errors.push(`.factory/kit.json: debe contener únicamente ${kitKeys.join(', ')}.`);
}
if (kit && kit.kitId !== 'WEB_KIT') {
  errors.push('.factory/kit.json: kitId debe ser WEB_KIT.');
}
if (kit && kit.coreVersion !== version) {
  errors.push('.factory/kit.json: coreVersion no coincide con KIT_VERSION.');
}
if (kit && !isPositiveInteger(kit.manifestSchemaVersion)) {
  errors.push('.factory/kit.json: manifestSchemaVersion debe ser un entero positivo.');
}
if (kit && !isPositiveInteger(kit.ownershipSchemaVersion)) {
  errors.push('.factory/kit.json: ownershipSchemaVersion debe ser un entero positivo.');
}

const projectTemplate = await readJson('.factory/project.template.json');
const projectKeys = [
  'schemaVersion',
  'kitId',
  'createdFromCoreVersion',
  'installedCoreVersion',
  'lastReviewedAgainstCoreVersion',
  'activeModules',
  'migrationsApplied',
  'coreCustomizations',
  'lastKitReviewDate',
];

if (projectTemplate && !hasExactKeys(projectTemplate, projectKeys)) {
  errors.push('.factory/project.template.json: el schema no contiene exactamente los campos esperados.');
}
if (projectTemplate && projectTemplate.schemaVersion !== kit?.manifestSchemaVersion) {
  errors.push('.factory/project.template.json: schemaVersion no coincide con kit.json.');
}
if (projectTemplate && projectTemplate.kitId !== 'WEB_KIT') {
  errors.push('.factory/project.template.json: kitId debe ser WEB_KIT.');
}
for (const field of ['createdFromCoreVersion', 'installedCoreVersion', 'lastReviewedAgainstCoreVersion', 'lastKitReviewDate']) {
  if (projectTemplate && projectTemplate[field] !== null) {
    errors.push(`.factory/project.template.json: ${field} debe ser null en la plantilla.`);
  }
}
for (const field of ['activeModules', 'migrationsApplied', 'coreCustomizations']) {
  if (projectTemplate && (!Array.isArray(projectTemplate[field]) || projectTemplate[field].length !== 0)) {
    errors.push(`.factory/project.template.json: ${field} debe ser un array vacío en la plantilla.`);
  }
}

const ownership = await readJson('.factory/ownership.json');
const ownershipKeys = ['schemaVersion', 'kitId', 'patternSyntax', 'resolution', 'unmatched', 'rules'];

if (ownership && !hasExactKeys(ownership, ownershipKeys)) {
  errors.push('.factory/ownership.json: la estructura raíz no contiene exactamente los campos esperados.');
}
if (ownership && ownership.schemaVersion !== kit?.ownershipSchemaVersion) {
  errors.push('.factory/ownership.json: schemaVersion no coincide con kit.json.');
}
if (ownership && ownership.kitId !== 'WEB_KIT') {
  errors.push('.factory/ownership.json: kitId debe ser WEB_KIT.');
}
if (ownership && ownership.patternSyntax !== 'repo-relative-posix-glob') {
  errors.push('.factory/ownership.json: patternSyntax debe ser repo-relative-posix-glob.');
}
if (ownership && ownership.resolution !== 'last-match-wins') {
  errors.push('.factory/ownership.json: resolution debe ser last-match-wins.');
}
if (ownership && ownership.unmatched !== 'review-required') {
  errors.push('.factory/ownership.json: unmatched debe ser review-required.');
}
if (ownership && (!Array.isArray(ownership.rules) || ownership.rules.length === 0)) {
  errors.push('.factory/ownership.json: rules debe ser un array no vacío.');
} else if (ownership) {
  const seenCategories = new Set();
  const seenPatterns = new Set();

  ownership.rules.forEach((rule, index) => {
    const label = `.factory/ownership.json: regla ${index + 1}`;
    const expectedKeys = rule?.category === 'module'
      ? ['pattern', 'category', 'moduleId']
      : ['pattern', 'category'];

    if (!hasExactKeys(rule, expectedKeys)) {
      errors.push(`${label} tiene campos inesperados o incompletos.`);
      return;
    }
    if (
      typeof rule.pattern !== 'string'
      || rule.pattern.length === 0
      || rule.pattern.startsWith('/')
      || rule.pattern.includes('\\')
      || rule.pattern.split('/').includes('..')
    ) {
      errors.push(`${label} debe usar un patrón no vacío con separadores '/'.`);
    }
    if (seenPatterns.has(rule.pattern)) {
      errors.push(`${label} repite el patrón ${rule.pattern}.`);
    }
    seenPatterns.add(rule.pattern);
    if (!validCategories.has(rule.category)) {
      errors.push(`${label} usa una categoría no válida.`);
    } else {
      seenCategories.add(rule.category);
    }
    if (rule.category === 'module' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rule.moduleId)) {
      errors.push(`${label} necesita un moduleId válido.`);
    }
  });

  for (const category of validCategories) {
    if (!seenCategories.has(category)) {
      errors.push(`.factory/ownership.json: falta al menos una regla ${category}.`);
    }
  }
}

if (errors.length > 0) {
  console.error('Metadata de WEB_KIT inválida:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`Metadata de WEB_KIT válida (${version}).`);
}
