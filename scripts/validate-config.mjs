import { site } from '../src/data/site.ts';
import { navigationAction } from '../src/data/navigation.ts';

const errors = [];
const warnings = [];
const publicationMode = site.publication?.mode;
const knownModes = ['starter', 'development', 'production'];
const productionEnvironment = process.env.NODE_ENV === 'production';
const isProduction = publicationMode === 'production' || productionEnvironment;

const isValidHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

const isUsableDestination = (value) => {
  if (typeof value !== 'string' || !value.trim()) return false;
  try {
    const url = new URL(value, 'https://local.invalid');
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol);
  } catch {
    return false;
  }
};

const isUsableFormAction = (value) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().startsWith('#')) return false;
  try {
    const url = new URL(value, 'https://local.invalid');
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

if (!knownModes.includes(publicationMode)) {
  errors.push('site.publication.mode debe ser starter, development o production.');
}

if (productionEnvironment && publicationMode !== 'production') {
  errors.push('NODE_ENV=production requiere site.publication.mode: production.');
}

if (!site.name.trim()) errors.push('site.name no puede estar vacío.');

if (site.primaryAction && (
  !site.primaryAction.label.trim()
  || !isUsableDestination(site.primaryAction.href)
)) {
  errors.push('site.primaryAction requiere label y destino válidos cuando está configurada.');
}

if (navigationAction && (
  !navigationAction.label.trim()
  || !isUsableDestination(navigationAction.href)
)) {
  errors.push('navigationAction requiere label y destino válidos cuando está configurada.');
}

if (site.contactForm?.enabled) {
  const submission = site.contactForm.submission;
  if (!submission) {
    errors.push('El formulario de contacto está habilitado sin configuración de envío.');
  } else if (submission.mode === 'native' && !isUsableFormAction(submission.action)) {
    errors.push('El formulario nativo habilitado requiere un action válido.');
  } else if (submission.mode === 'custom' && !submission.handler.trim()) {
    errors.push('El formulario personalizado habilitado requiere un identificador de handler.');
  }
}

if (isProduction) {
  if (site.publication.demoContent) {
    errors.push('La configuración de producción sigue marcada con demoContent: true.');
  }

  if (/astro web starter/i.test(site.name)) {
    errors.push('La configuración de producción conserva el nombre del starter.');
  }

  const siteUrl = process.env.SITE_URL?.trim();
  if (!siteUrl || !isValidHttpUrl(siteUrl)) {
    errors.push('Producción requiere SITE_URL con una URL HTTP(S) válida.');
  } else {
    const hostname = new URL(siteUrl).hostname;
    if (
      hostname === 'localhost'
      || hostname.endsWith('.localhost')
      || hostname.endsWith('.invalid')
      || /^(?:www\.)?example\.(?:com|org|net)$/.test(hostname)
    ) {
      errors.push('SITE_URL debe usar el dominio real de producción.');
    }
  }
} else {
  warnings.push(`Validación en modo ${publicationMode}; los requisitos estrictos de producción no se aplican.`);
}

for (const warning of warnings) console.warn(`AVISO: ${warning}`);

if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Configuración válida para modo ${publicationMode}.`);
}
