# Recuperación de HDC en Cloudflare Pages — 2026-10-26

Web publicada: **https://hdc-website-ew1.pages.dev**. Proyecto: hdc-website, rama de producción main, despliegue c1ecad32. Sitio estático: no se crearon Pages Functions ni se contrató un plan de pago. No se transfirió el subdominio vercel.app; el anterior permanece bajo las restricciones de Vercel.

## Cambios

- Fuente vigente: C:/Dev/HDC-Website (repositorio distinto de la copia histórica website en TCGHolo). Deploy directo mediante Wrangler.
- Publicados 5.175 archivos más _headers. Se excluyeron demo-debug, herramientas, scripts PowerShell, .git, .wrangler, node_modules y configuración exclusiva Vercel. Se comprobó ausencia de rutas de credenciales.
- bg3.mp4 reducido de 48.402.158 a 18.449.389 bytes, misma duración, con original conservado en Library/CloudflareMigration20261026/bg3-original.mp4. Ningún archivo publicado supera 25 MiB.
- Caché de imágenes/vídeos/recursos versionados; HTML sin caché persistente. Build WebGL con nombre hash y caché immutable. Se mantienen cabeceras de seguridad y CORS estático.
- Descargas de respaldo y rótulos actuales de versión apuntan a .8. Se conservaron las etiquetas de capturas .4 como evidencia histórica, no se las presentó como nuevas.
- R2 autoriza tanto Vercel como Pages para GET/HEAD. No se tocaron ni sobrescribieron paquetes del juego.
- Worker: manifiesto público permite lectura desde navegador; presencia acepta el nuevo origen además del anterior y localhost, rechazando dominios parecidos. 143 pruebas (4 nuevas) aprobadas. Se desplegó una copia aislada del baseline de Git con únicamente index.ts modificado para CORS; no se incluyó el trabajo ajeno de security.ts ni se cambiaron registros D1, cron o reglas del juego.

## Verificación

14 rutas públicas coinciden por SHA-256 con el contenido local, incluyendo HTML, JS, datos, recursos WebGL, logo y vídeo. Cuatro HEAD verifican instalador, ZIP del actualizador, APK y datos WebGL; CORS de R2 admite el origen nuevo. Manifiesto responde .8 y CORS público. Sin prueba visual/gameplay en navegador ni dispositivo Android físico; no se controló el escritorio. No se generó una nueva versión del juego ni se enviaron anuncios a terceros.

## Operación siguiente

La publicación actual usa **Direct Upload**, no integración Git automática. Un push a GitHub por sí solo todavía no publica en Pages. Para la siguiente web preparar una copia pública con las mismas exclusiones, validar menos de 20.000 archivos y 25 MiB por archivo y usar:

    node C:/Dev/TCGHolo/server/node_modules/wrangler/bin/wrangler.js pages deploy <carpeta-publica> --project-name hdc-website --branch main --commit-dirty=true

Conservar _headers. El botón actual de publicación de Access todavía contiene flujo Git/Vercel; adaptar su automatización a Pages antes de reutilizarlo. Los enlaces antiguos en mensajes, herramientas y clientes ya instalados no se reescriben automáticamente. No modificar silenciosamente los binarios publicados para cambiar sus URLs; incorporar la nueva dirección en el siguiente trabajo de actualización autorizado.

Limpieza R2 ejecutada: ver docs/storage/2026-10-26-r2-audit/README.md. Quedan 5,67 GB; no elimina cargos previos.
