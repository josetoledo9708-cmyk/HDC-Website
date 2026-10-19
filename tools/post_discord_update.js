/**
 * HololiveDeckConstructor - Publicador Automático de Actualizaciones en Discord (#updates)
 * 
 * Lee la versión más reciente del archivo "NOTAS_DE_VERSION.md",
 * convierte las notas en castellano e inglés en tarjetas Rich Embed y las envía por Webhook a Discord.
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
        const lines = fs.readFileSync(CONFIG_FILE, 'utf8').split(/\r?\n/);
        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('http')) return line;
        }
    }

    return null;
}

// 2. Analizar NOTAS_DE_VERSION.md para obtener la versión más reciente y sus notas en castellano e inglés
function parseLatestReleaseNotes() {
    if (!fs.existsSync(NOTAS_FILE)) {
        throw new Error(`No se encontró el archivo de notas de versión: ${NOTAS_FILE}`);
    }

    const content = fs.readFileSync(NOTAS_FILE, 'utf8');

    // Buscar encabezado de versión: ## 0.0.29 — 2026-10-02
    const versionRegex = /^##\s+([0-9]+\.[0-9]+\.[0-9]+(?:\.[0-9]+)?)\s+—\s+([0-9]{4}-[0-9]{2}-[0-9]{2})/m;
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

    // Extraer sección en Español y en Inglés
    let esNotes = '';
    let enNotes = '';

    const esMatch = block.match(/^###\s+Espa[ñn]ol\s*\n([\s\S]*?)(?=^###\s+|^---\s*$|(?![\s\S]))/im);
    if (esMatch && esMatch[1]) {
        esNotes = esMatch[1].trim();
    }

    const enMatch = block.match(/^###\s+English\s*\n([\s\S]*?)(?=^###\s+|^---\s*$|(?![\s\S]))/im);
    if (enMatch && enMatch[1]) {
        enNotes = enMatch[1].trim();
    }

    if (!esNotes && !enNotes) {
        throw new Error("La versión no contiene secciones Español/English publicables.");
    }

    return { version, date, notes_es: esNotes, notes_en: enNotes };
}

async function main() {
    try {
        console.log('📖 Leyendo la versión más reciente desde NOTAS_DE_VERSION.md...');
        const { version, date, notes_es, notes_en } = parseLatestReleaseNotes();

        console.log(`📌 Versión detectada: v${version} (${date})`);

        const webhookUrl = getWebhookUrl();
        if (!webhookUrl) {
            console.error('\n❌ No se ha configurado la URL del Webhook.');
            console.log('👉 Pega la URL del Webhook de Discord en el archivo: tools/discord_webhook.txt');
            console.log('   O ejecuta: node tools/post_discord_update.js "https://discord.com/api/webhooks/..."\n');
            process.exit(1);
        }

        let formattedES = notes_es || 'Sin notas en español.';
        if (formattedES.length > 3800) formattedES = formattedES.substring(0, 3800) + '...\n*(Notas recortadas)*';

        let formattedEN = notes_en || 'No English patch notes available.';
        if (formattedEN.length > 3800) formattedEN = formattedEN.substring(0, 3800) + '...\n*(Patch notes truncated)*';

        const embeds = [
            {
                title: `🚀 HololiveDeckConstructor - Actualización v${version}`,
                description: `¡Una nueva versión de HDC está disponible para todos en Open Alpha!\n\n${formattedES}`,
                color: 3719224, // Color Cyan #38bdf8
                fields: [
                    { name: '🌐 Web Oficial', value: '[hdc-website-one.vercel.app/hdc#inicio](https://hdc-website-one.vercel.app/hdc#inicio)', inline: true },
                    { name: '🔓 Versión', value: `Open Alpha v${version}`, inline: true },
                    { name: '📅 Fecha', value: date, inline: true }
                ],
                footer: {
                    text: 'HololiveDeckConstructor · Proyecto Fan Sin Ánimo de Lucro',
                    icon_url: 'https://hdc-website-one.vercel.app/images/logo_hdc.png'
                },
                timestamp: new Date().toISOString()
            }
        ];

        if (notes_en) {
            embeds.push({
                title: `🚀 HololiveDeckConstructor - Patch Notes v${version}`,
                description: `A new version of HDC is available to everyone in Open Alpha!\n\n${formattedEN}`,
                color: 10181046, // Purple #9b59b6
                fields: [
                    { name: '🌐 Official Website', value: '[hdc-website-one.vercel.app/hdc#inicio](https://hdc-website-one.vercel.app/hdc#inicio)', inline: true },
                    { name: '🔓 Version', value: `Open Alpha v${version}`, inline: true },
                    { name: '📅 Date', value: date, inline: true }
                ],
                footer: {
                    text: 'HololiveDeckConstructor · Non-Profit Fan Project',
                    icon_url: 'https://hdc-website-one.vercel.app/images/logo_hdc.png'
                },
                timestamp: new Date().toISOString()
            });
        }

        const payload = {
            username: 'HDCUpdates',
            avatar_url: 'https://hdc-website-one.vercel.app/images/logo_hdc.png',
            embeds: embeds
        };

        console.log(`📡 Publicando actualización v${version} en Discord (#updates) en Español e Inglés...`);
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok || response.status === 204) {
            console.log(`🎉 ¡Petición enviada con éxito! La versión v${version} fue publicada en #updates en ambos idiomas.`);
        } else {
            const errText = await response.text();
            console.error(`❌ Error al enviar mensaje a Discord (HTTP ${response.status}):`, errText);
        }
    } catch (err) {
        console.error('❌ Error durante la ejecución:', err.message || err);
    }
}

main();
