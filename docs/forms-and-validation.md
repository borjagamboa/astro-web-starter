# Formularios y validación previa a publicación

`ContactForm.astro` es únicamente presentación: renderiza campos, estados y errores accesibles, pero no envía datos por sí mismo ni conoce proveedores. La configuración `submission` define un `action` nativo o identifica un handler personalizado; cualquier adaptador de email, función serverless o API es opt-in y vive fuera del componente.

Su API exige un `id` único y permite ocultar o configurar nombre, email, teléfono y mensaje mediante `fields`. `privacy` solo aparece cuando el proyecto entrega su texto explícito y una URL legal optativa; `honeypot`, `values`, `errors`, `disabled`, `submitting` y `statusMessage` cubren los estados comunes sin crear un form builder.

Una `submission` con `mode: 'native'` requiere `action` y acepta `method`. Una `submission` con `mode: 'custom'` exige un identificador `handler`; el adaptador externo conecta su comportamiento mediante `data-form-handler` y debe aportar validación de servidor, manejo de errores y protección contra abuso. Sin `submission`, el componente muestra un aviso de desarrollo y desactiva el submit.

Nunca se deben inventar endpoints, textos legales o URLs de privacidad. Los secretos pertenecen al entorno de servidor y no deben entrar en Git, props públicas ni HTML. El honeypot opcional es una señal básica y no sustituye validación de servidor, rate limiting u otras medidas proporcionales.

Antes de publicar:

1. cambia `site.publication.mode` a `production` y `demoContent` a `false`;
2. configura `SITE_URL` y, si `contactForm.enabled` es `true`, proporciona una `submission` real;
3. ejecuta `npm run validate`, `npm run check:leakage` y `npm run build`, en ese orden.

`npm run build` permanece independiente para que el starter pueda compilar con su showcase. En modo `production`, los otros dos comandos bloquean configuración demo, destinos críticos inválidos, formularios habilitados sin envío y placeholders peligrosos en la publicación activa.

Si el entorno ejecuta los controles con `NODE_ENV=production`, `validate` también falla cuando la configuración continúa en modo `starter` o `development`.
