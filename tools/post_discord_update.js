/**
 * HololiveDeckConstructor - Script de Publicación Automática en Discord (#updates)
 * 
 * Uso:
 *   node tools/post_discord_update.js "0.0.28" "Notas de la versión..."
 * 
 * O configurando la variable de entorno DISCORD_WEBHOOK_URL:
 *   $env:DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
 */

const fs = require('fs');
const path = require('path');

// Webhook por defecto o mediante variable de entorno
const DEFAULT_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';

async function postUpdate(version, notes, webhookUrl = DEFAULT_WEBHOOK_URL) {
    if (!webhookUrl) {
        console.error('❌ Error: No se ha configurado la URL del Webhook de Discord.');
        console.log('\nPor favor configura la URL del webhook de una de las siguientes maneras:');
        console.log('1. Pasa la URL como 3er argumento: node tools/post_discord_update.js "0.0.28" "Notas..." "HTTPS_WEBHOOK_URL"');
        console.log('2. O define la variable de entorno DISCORD_WEBHOOK_URL\n');
        process.exit(1);
    }

    const versionTitle = version ? (version.startsWith('v') ? version : `v${version}`) : 'v0.0.28';
    const patchNotes = notes || '• Corrección de errores y mejoras de estabilidad.\n• Optimización en partidas multijugador.\n• Nuevos marcos de perfil y traducción a 3 idiomas.';

    const payload = {
        username: 'HDC Update Bot',
        avatar_url: 'https://hdc-website.vercel.app/images/logo_hdc.png',
        embeds: [
            {
                title: `🚀 HololiveDeckConstructor - Actualización ${versionTitle}`,
                description: `¡Una nueva actualización del cliente ejecutable para PC ya está disponible para los Alpha Testers!\n\n**📋 Notas de la Versión:**\n${patchNotes}`,
                color: 3719224, // Color Cyan #38bdf8
                fields: [
                    {
                        name: '🌐 Web Oficial & Instalador',
                        value: '[Visitar Landing Page HDC](https://hdc-website.vercel.app/)',
                        inline: true
                    },
                    {
                        name: '🔒 Estado',
                        value: `Alpha Cerrada ${versionTitle}`,
                        inline: true
                    },
                    {
                        name: '🔑 Clave de Acceso',
                        value: 'Solicitar en <#100000000000000000> (Discord)',
                        inline: false
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

    try {
        console.log(`📡 Enviando anuncio de actualización ${versionTitle} a Discord...`);
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok || response.status === 204) {
            console.log(`✅ ¡Anuncio de ${versionTitle} publicado con éxito en #updates!`);
        } else {
            const errText = await response.text();
            console.error(`❌ Error HTTP (${response.status}) al publicar en Discord:`, errText);
        }
    } catch (err) {
        console.error('❌ Error de red al contactar el Webhook de Discord:', err);
    }
}

// Lectura de argumentos de consola
const args = process.argv.slice(2);
const inputVersion = args[0] || '0.0.28';
const inputNotes = args[1] || '';
const inputWebhook = args[2] || DEFAULT_WEBHOOK_URL;

postUpdate(inputVersion, inputNotes, inputWebhook);
