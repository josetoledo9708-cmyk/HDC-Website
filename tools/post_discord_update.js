/**
 * HololiveDeckConstructor - Publicador Automático de Actualizaciones en Discord (#updates)
 * 
 * Lee la versión más reciente del archivo "NOTAS_DE_VERSION.md",
 * la convierte en un anuncio Rich Embed y la envía por Webhook a Discord.
 * 
 * Uso:
 *   node tools/post_discord_update.js [URL_DEL_WEBHOOK]
 */

const fs = require('fs');
const path = require('path');

const NOTAS_FILE = path.join(__dirname, '..', 'NOTAS_DE_VERSION.md');
const CONFIG_FILE = path.join(__dirname, 'discord_webhook.txt');

// 1. Obtener URL del Webhook (por argumento, variable de entorno o archivo discord_webhook.txt)
function getWebhookUrl() {
    const argUrl = process.argv[2];
    if (argUrl && argUrl.startsWith('http')) return argUrl.trim();

    if (process.env.DISCORD_WEBHOOK_URL) return process.env.DISCORD_WEBHOOK_URL.trim();

    if (fs.existsSync(CONFIG_FILE)) {
        const fileUrl = fs.readFileSync(CONFIG_FILE, 'utf8').trim();
        if (fileUrl.startsWith('http')) return fileUrl;
    }

    return null;
}

// 2. Analizar NOTAS_DE_VERSION.md para obtener la versión más reciente y sus notas en castellano
function parseLatestReleaseNotes() {
    if (!fs.existsSync(NOTAS_FILE)) {
        throw new Error(`No se encontró el archivo de notas de versión: ${NOTAS_FILE}`);
    }

    const content = fs.readFileSync(NOTAS_FILE, 'utf8');

    // Buscar encabezado de versión: ## 0.0.29 — 2026-10-02
    const versionRegex = /^##\s+([0-9]+\.[0-9]+\.[0-9]+)\s+—\s+([0-9]{4}-[0-9]{2}-[0-9]{2})/m;
    const match = content.match(versionRegex);

    if (!match) {
        throw new Error('No se pudo detectar ninguna versión con formato "## X.X.X — YYYY-MM-DD" en NOTAS_DE_VERSION.md');
    }

    const version = match[1];
    const date = match[2];

    // Extraer bloque de la última versión
    const startIndex = match.index;
    const remainingText = content.slice(startIndex + match[0].length);
    const nextVersionIndex = remainingText.search(/^##\s+/m);

    let block = '';
    if (nextVersionIndex !== -1) {
        block = content.slice(startIndex, startIndex + match[0].length + nextVersionIndex);
    } else {
        block = content.slice(startIndex);
    }

    // Extraer sección en Español
    let esNotes = '';
    const esMatch = block.match(/###\s+Español([\s\S]*?)(###\s+English|$)/i);
    if (esMatch && esMatch[1]) {
        esNotes = esMatch[1].trim();
    } else {
        esNotes = block.trim();
    }

    return { version, date, notes: esNotes };
}

async function main() {
    try {
        console.log('📖 Leyendo la versión más reciente desde NOTAS_DE_VERSION.md...');
        const { version, date, notes } = parseLatestReleaseNotes();

        console.log(`📌 Versión detectada: v${version} (${date})`);

        const webhookUrl = getWebhookUrl();
        if (!webhookUrl) {
            console.error('\n❌ No se ha configurado la URL del Webhook.');
            console.log('👉 Pega la URL del Webhook de Discord en el archivo: tools/discord_webhook.txt');
            console.log('   O ejecuta: node tools/post_discord_update.js "https://discord.com/api/webhooks/..."\n');
            process.exit(1);
        }

        // Formatear notas para Discord (Límite de 4000 caracteres por Embed)
        let formattedNotes = notes;
        if (formattedNotes.length > 3800) {
            formattedNotes = formattedNotes.substring(0, 3800) + '...\n*(Notas recortadas por límite de tamaño de Discord)*';
        }

        const payload = {
            username: 'HDCUpdates',
            avatar_url: 'https://hdc-website.vercel.app/images/logo_hdc.png',
            embeds: [
                {
                    title: `🚀 HololiveDeckConstructor - Actualización v${version}`,
                    description: `¡Una nueva versión del cliente para PC está disponible para los Alpha Testers!\n\n${formattedNotes}`,
                    color: 3719224, // Color Cyan #38bdf8
                    fields: [
                        {
                            name: '🌐 Web Oficial',
                            value: '[hdc-website.vercel.app](https://hdc-website.vercel.app/)',
                            inline: true
                        },
                        {
                            name: '🔒 Versión',
                            value: `Alpha Cerrada v${version}`,
                            inline: true
                        },
                        {
                            name: '📅 Fecha',
                            value: date,
                            inline: true
                        }
                    ],
                    footer: {
                        text: 'HololiveDeckConstructor · Proyecto Fan Sin Ánimo de Lucro',
                        icon_url: 'https://hdc-website.vercel.app/images/logo_hdc.png'
                    },
                    timestamp: new Date().toISOString()
                }
            ]
        };

        console.log(`📡 Publicando actualización v${version} en Discord (#updates)...`);
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok || response.status === 204) {
            console.log(`🎉 ¡Petición enviada con éxito! La versión v${version} fue publicada en #updates.`);
        } else {
            const errText = await response.text();
            console.error(`❌ Error al enviar mensaje a Discord (HTTP ${response.status}):`, errText);
        }
    } catch (err) {
        console.error('❌ Error durante la ejecución:', err.message || err);
    }
}

main();
