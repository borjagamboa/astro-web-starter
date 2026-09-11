import { readdir, readFile } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';
import { site } from '../src/data/site.ts';

const root = resolve(import.meta.dirname, '..');
const scanRoots = ['src', 'public'];
const rootFiles = ['astro.config.mjs'];
const allowedExtensions = new Set(['.astro', '.css', '.html', '.js', '.json', '.md', '.mjs', '.svg', '.ts', '.txt']);
const publicationMode = site.publication?.mode ?? 'unknown';
const isProduction = publicationMode === 'production' || process.env.NODE_ENV === 'production';

const alwaysForbidden = [
  { label: 'placeholder TODO_PUBLICAR', pattern: /TODO_PUBLICAR/i },
  { label: 'placeholder REPLACE_ME', pattern: /REPLACE_ME/i },
  { label: 'dominio example.com activo', pattern: /(?:https?:\/\/|@)(?:www\.)?example\.com\b/i },
  { label: 'ruta temporal /experiments/', pattern: /\/experiments\//i },
  { label: 'clave privada', pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { label: 'credenciales dentro de URL', pattern: /https?:\/\/[^\s/:]+:[^\s/@]+@/i },
];

const productionForbidden = [
  { label: 'email reservado o de ejemplo', pattern: /\b[\w.+-]+@(?:[\w.-]+\.invalid|example\.(?:com|org|net))\b/i },
  { label: 'teléfono placeholder', pattern: /(?:\+34[\s.-]*)?(?:600|999)[\s.-]*000[\s.-]*000\b/ },
  { label: 'marca del starter', pattern: /\bAstro Web Starter\b/i },
  { label: 'contenido de demostración', pattern: /\b(?:Nombre de demostración|contenido ficticio|formulario sin proveedor configurado)\b/i },
  { label: 'marca demo histórica', pattern: /\b(?:Ausart(?: Neuro)?|Iron Veil|Ash Crown|Caudal Norte)\b/i },
];

const files = [];

const collect = async (path) => {
  let entries;
  try {
    entries = await readdir(path, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return;
    throw error;
  }

  for (const entry of entries) {
    const entryPath = resolve(path, entry.name);
    if (entry.isDirectory()) await collect(entryPath);
    else if (entry.isFile() && allowedExtensions.has(extname(entry.name))) files.push(entryPath);
  }
};

for (const directory of scanRoots) await collect(resolve(root, directory));
for (const file of rootFiles) files.push(resolve(root, file));

const findings = [];
const rules = isProduction ? [...alwaysForbidden, ...productionForbidden] : alwaysForbidden;

for (const file of files) {
  const content = await readFile(file, 'utf8');
  const projectPath = relative(root, file).replaceAll('\\', '/');
  for (const rule of rules) {
    if (rule.pattern.test(content) || rule.pattern.test(`/${projectPath}`)) {
      findings.push(`${projectPath}: ${rule.label}`);
    }
  }
}

if (findings.length) {
  for (const finding of findings) console.error(`FUGA: ${finding}`);
  process.exitCode = 1;
} else {
  console.log(`Sin fugas críticas en modo ${publicationMode} (${files.length} archivos revisados).`);
  if (!isProduction) console.warn('AVISO: los marcadores deliberados del showcase solo se bloquean en modo production.');
}
