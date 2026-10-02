// HDC DECK CODE ENGINE (100% Compatible with HoloTCG DeckCode.cs)
const HDCDeckCode = {
    PREFIX: 'HDC1-',

    /**
     * Encodes a deck object into an HDC1- Base64 deck code.
     * @param {string} oshiNumber - e.g. "hSD19-001"
     * @param {Object} mainCardsDict - { "hSD19-002": 6, "hSD19-006": 4, ... }
     * @param {Object} cheerCardsDict - { "hY01-001": 13, "hY06-001": 7 }
     * @param {string} deckName - e.g. "Todoroki Riona hSD19"
     * @returns {string} HDC1- Base64 string
     */
    encode: function(oshiNumber, mainCardsDict, cheerCardsDict, deckName) {
        if (!oshiNumber) return '';

        const mainParts = Object.entries(mainCardsDict || {})
            .filter(([_, qty]) => qty > 0)
            .map(([num, qty]) => `${qty}*${num}`)
            .join(',');

        const cheerParts = Object.entries(cheerCardsDict || {})
            .filter(([_, qty]) => qty > 0)
            .map(([num, qty]) => `${qty}*${num}`)
            .join(',');

        const rawText = `${oshiNumber}|${mainParts}|${cheerParts}|${deckName || ''}`;

        // UTF-8 to Base64 (URL Safe)
        const base64 = btoa(unescape(encodeURIComponent(rawText)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

        return this.PREFIX + base64;
    },

    /**
     * Decodes an HDC1- Base64 string into a deck object.
     * @param {string} code - e.g. "HDC1-aFNEMTktMDAxf..."
     * @returns {Object|null} { oshiNumber, mainCardsDict, cheerCardsDict, deckName }
     */
    decode: function(code) {
        if (!code) return null;
        let text = code.trim().replace(/\s+/g, '');
        if (!text.startsWith(this.PREFIX)) return null;

        let b64 = text.substring(this.PREFIX.length).replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4 !== 0) b64 += '=';

        try {
            const rawText = decodeURIComponent(escape(atob(b64)));
            const parts = rawText.split('|');
            if (parts.length < 3 || !parts[0]) return null;

            return {
                oshiNumber: parts[0],
                mainCardsDict: this.parseCounts(parts[1]),
                cheerCardsDict: this.parseCounts(parts[2]),
                deckName: parts[3] || 'Mazo Importado'
            };
        } catch (e) {
            console.error('[HDCDeckCode] Error decodificando código:', e);
            return null;
        }
    },

    parseCounts: function(textStr) {
        const dict = {};
        if (!textStr) return dict;
        textStr.split(',').forEach(item => {
            const starIdx = item.indexOf('*');
            if (starIdx > 0 && starIdx < item.length - 1) {
                const count = parseInt(item.substring(0, starIdx), 10);
                const number = item.substring(starIdx + 1);
                if (count > 0 && number) {
                    dict[number] = count;
                }
            }
        });
        return dict;
    },

    /**
     * Exports a deck to HoloDelta JSON format.
     */
    exportHoloDeltaJSON: function(oshiNumber, mainCardsDict, cheerCardsDict, deckName) {
        const deckArray = [];
        Object.entries(mainCardsDict || {}).forEach(([num, qty]) => {
            for (let i = 0; i < qty; i++) deckArray.push(num);
        });

        const cheerArray = [];
        Object.entries(cheerCardsDict || {}).forEach(([num, qty]) => {
            for (let i = 0; i < qty; i++) cheerArray.push(num);
        });

        const obj = {
            name: deckName || 'Mi Mazo HoloDelta',
            oshi: oshiNumber || '',
            deck: deckArray,
            cheer: cheerArray
        };

        return JSON.stringify(obj, null, 2);
    },

    /**
     * Exports a deck to Bushiroad DeckLog / Plain Text list format.
     */
    exportBushiroadText: function(oshiNumber, mainCardsDict, cheerCardsDict, deckName) {
        let text = `# Deck: ${deckName || 'Mi Mazo'}\n\n`;
        text += `# Oshi:\n${oshiNumber ? `${oshiNumber} x1\n` : '(Ninguno)\n'}\n`;

        text += `# Mazo Principal (50):\n`;
        Object.entries(mainCardsDict || {}).forEach(([num, qty]) => {
            if (qty > 0) text += `${num} x${qty}\n`;
        });

        text += `\n# Mazo de Cheers (20):\n`;
        Object.entries(cheerCardsDict || {}).forEach(([num, qty]) => {
            if (qty > 0) text += `${num} x${qty}\n`;
        });

        return text;
    },

    /**
     * Extracts a 5-character Bushiroad DeckLog code from raw string or URL.
     */
    extractBushiroadCode: function(input) {
        if (!input) return null;
        let str = input.trim();

        // Match decklog-GB1VW or #tdeck/decklog-GB1VW
        const decklogMatch = str.match(/decklog-([A-Za-z0-9]{5})/i);
        if (decklogMatch) return decklogMatch[1].toUpperCase();

        // Match URL /view/GB1VW
        const viewMatch = str.match(/\/view\/([A-Za-z0-9]{5})/i);
        if (viewMatch) return viewMatch[1].toUpperCase();

        // Single 5-character alphanumeric code
        if (/^[A-Za-z0-9]{5}$/.test(str)) {
            return str.toUpperCase();
        }

        return null;
    },

    /**
     * Fetches a deck from Bushiroad DeckLog API (https://decklog.bushiroad.com/system/app/api/view/[CODE]).
     */
    fetchBushiroadDeck: async function(code) {
        const cleanCode = this.extractBushiroadCode(code);
        if (!cleanCode) return null;

        try {
            const resp = await fetch(`https://decklog.bushiroad.com/system/app/api/view/${cleanCode}`, {
                method: 'POST',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    'Referer': `https://decklog.bushiroad.com/view/${cleanCode}`,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!resp.ok) throw new Error(`HTTP Error ${resp.status}`);
            const data = await resp.json();

            if (!data || !data.list) return null;

            const oshiNumber = (data.p_list && data.p_list.length > 0) ? data.p_list[0].card_number : null;
            const mainCardsDict = {};
            (data.list || []).forEach(item => {
                if (item.card_number && item.num > 0) {
                    mainCardsDict[item.card_number] = (mainCardsDict[item.card_number] || 0) + item.num;
                }
            });

            const cheerCardsDict = {};
            (data.sub_list || []).forEach(item => {
                if (item.card_number && item.num > 0) {
                    cheerCardsDict[item.card_number] = (cheerCardsDict[item.card_number] || 0) + item.num;
                }
            });

            return {
                oshiNumber,
                mainCardsDict,
                cheerCardsDict,
                deckName: data.title || `Bushiroad ${cleanCode}`,
                sourceFormat: 'Bushiroad DeckLog'
            };
        } catch (err) {
            console.warn('[HDCDeckCode] Error al consultar API de Bushiroad DeckLog:', err);
            return null;
        }
    },

    /**
     * Universal Multi-Source Decoder (OshiLive, HoloDelta JSON, Bushiroad DeckLog, Plain Text).
     */
    decodeMultiSource: async function(rawInput, cardCatalog = []) {
        if (!rawInput) return null;
        const text = rawInput.trim();
        const upper = text.toUpperCase();

        // 0. Check Preset Deck Code Aliases / IDs
        if (typeof PRESET_DECK_CODES !== 'undefined') {
            let presetB64 = null;
            if (upper.includes('RIONA')) presetB64 = PRESET_DECK_CODES.riona;
            else if (upper.includes('KAELA') || upper === 'G9SME') presetB64 = PRESET_DECK_CODES.kaela;
            else if (upper.includes('MOONA') || upper === '1U7LVJ') presetB64 = PRESET_DECK_CODES.moona;
            else if (upper.includes('KANATA')) presetB64 = PRESET_DECK_CODES.kanata;
            else if (upper.includes('PEKORA')) presetB64 = PRESET_DECK_CODES.pekora;
            else if (upper.includes('SORA')) presetB64 = PRESET_DECK_CODES.sora;
            else if (upper.includes('FUBUKI')) presetB64 = PRESET_DECK_CODES.fubuki;
            else if (upper.includes('MIKO')) presetB64 = PRESET_DECK_CODES.miko;
            else if (upper.includes('RADEN')) presetB64 = PRESET_DECK_CODES.raden;
            else if (upper.includes('CALLIOPE')) presetB64 = PRESET_DECK_CODES.calliope;

            if (presetB64) {
                const decoded = this.decode(presetB64);
                if (decoded) {
                    decoded.sourceFormat = 'Preset Meta Deck';
                    return decoded;
                }
            }
        }

        // 1. Try OshiLive (HDC1-)
        if (text.startsWith(this.PREFIX)) {
            const decoded = this.decode(text);
            if (decoded) {
                decoded.sourceFormat = 'OshiLive HDC1';
                return decoded;
            }
        }

        // 2. Try HoloDelta JSON
        if (text.startsWith('{') && text.endsWith('}')) {
            try {
                const json = JSON.parse(text);
                const oshiNumber = json.oshi || json.oshiId || json.oshi_id || json.oshiCard || null;
                const deckName = json.name || json.deckName || json.title || 'Mazo HoloDelta';

                const mainCardsDict = {};
                const rawDeck = json.deck || json.mainDeck || json.main || [];
                if (Array.isArray(rawDeck)) {
                    rawDeck.forEach(num => {
                        if (num) mainCardsDict[num] = (mainCardsDict[num] || 0) + 1;
                    });
                } else if (typeof rawDeck === 'object') {
                    Object.assign(mainCardsDict, rawDeck);
                }

                const cheerCardsDict = {};
                const rawCheer = json.cheer || json.cheerDeck || [];
                if (Array.isArray(rawCheer)) {
                    rawCheer.forEach(num => {
                        if (num) cheerCardsDict[num] = (cheerCardsDict[num] || 0) + 1;
                    });
                } else if (typeof rawCheer === 'object') {
                    Object.assign(cheerCardsDict, rawCheer);
                }

                return {
                    oshiNumber,
                    mainCardsDict,
                    cheerCardsDict,
                    deckName,
                    sourceFormat: 'HoloDelta JSON'
                };
            } catch (e) {
                console.warn('[HDCDeckCode] Falló parseo de JSON HoloDelta:', e);
            }
        }

        // 3. Try Bushiroad DeckLog code or URL
        const bCode = this.extractBushiroadCode(text);
        if (bCode) {
            const bDeck = await this.fetchBushiroadDeck(bCode);
            if (bDeck) return bDeck;
        }

        // 4. Fallback: Parse card list text with OCR typo cleaning (e.g. "hsD19-002 6" or "4x hBPes-074")
        let cleanedTextForCodeMatch = text
            .replace(/([hH][sS][dD]|[hH][sS][pP]|[hH][pP][sS])/gi, 'hSD')
            .replace(/([hH][bB][pP][eE][sS])/gi, 'hBP05')
            .replace(/([hH][bB][pP])/gi, 'hBP')
            .replace(/([hH][bB][dD])/gi, 'hBD')
            .replace(/([hH][sS][dD])/gi, 'hSD')
            .replace(/([hH][yY])/gi, 'hY')
            .replace(/([hH][cC][pP])/gi, 'hCP')
            .replace(/([hH][pP][rR])/gi, 'hPR')
            .replace(/-e(\d{2})/gi, '-0$1');

        // Prepend missing 'h' if OCR read "SD19-002" or "BP01-001" or "Y01-001"
        cleanedTextForCodeMatch = cleanedTextForCodeMatch.replace(/\b(SD\d{2}|BP\d{2}|BD\d{2}|Y\d{2})[-_\s~=](\d{3})\b/gi, 'h$1-$2');

        const cardMatches = cleanedTextForCodeMatch.match(/(h[A-Za-z0-9]{2,5}[-_\s~=][\w\d]{3})[^\n]*/gi);
        if (cardMatches && cardMatches.length > 0) {
            let oshiNumber = null;
            const mainCardsDict = {};
            const cheerCardsDict = {};

            cardMatches.forEach(line => {
                const cardNumMatch = line.match(/(h[A-Za-z0-9]{2,5})[-_\s~=]([\w\d]{3})/i);
                if (!cardNumMatch) return;
                let num = (cardNumMatch[1] + '-' + cardNumMatch[2]).toUpperCase();

                // Clean number string (e.g., replace O/Q/D/@ with 0, I/L/l with 1)
                const parts = num.split('-');
                let prefix = parts[0];
                let suffix = parts[1].replace(/[OQD@]/g, '0').replace(/[ILl|]/g, '1');
                num = `${prefix}-${suffix}`;

                const lineWithoutNum = line.replace(line.match(/(h[A-Za-z0-9]{2,5}[-_\s~=][\w\d]{3})/i)?.[0] || '', '');
                const qtyMatch = lineWithoutNum.match(/(\d+)\s*x|x\s*(\d+)|\b(\d+)\b/i);
                let qty = 1;
                if (qtyMatch) {
                    qty = parseInt(qtyMatch[1] || qtyMatch[2] || qtyMatch[3] || '1', 10);
                }

                let catCard = cardCatalog.find(c => (c.card_number || '').toUpperCase() === num);
                // Fuzzy fallback if card number had typo (e.g. hSD19-082 -> hSD19-002)
                if (!catCard) {
                    const pref = num.substring(0, 6);
                    catCard = cardCatalog.find(c => (c.card_number || '').toUpperCase().startsWith(pref));
                    if (catCard) num = catCard.card_number;
                }

                if (catCard && catCard.card_type === 'Oshi') {
                    oshiNumber = num;
                } else if (catCard && catCard.card_type === 'Cheer') {
                    cheerCardsDict[num] = (cheerCardsDict[num] || 0) + qty;
                } else if (num.startsWith('HY')) {
                    cheerCardsDict[num] = (cheerCardsDict[num] || 0) + qty;
                } else if (catCard) {
                    mainCardsDict[num] = (mainCardsDict[num] || 0) + qty;
                }
            });

            if (oshiNumber || Object.keys(mainCardsDict).length > 0 || Object.keys(cheerCardsDict).length > 0) {
                return {
                    oshiNumber,
                    mainCardsDict,
                    cheerCardsDict,
                    deckName: 'Mazo Importado por Texto/OCR',
                    sourceFormat: 'Lista de Texto/OCR'
                };
            }
        }

        // 5. Visual Grid Screenshot / Card Names Recognition (when card codes are absent or proxy names are used)
        const visualDecoded = this.parseVisualDeckNames(text, cardCatalog);
        if (visualDecoded) {
            return visualDecoded;
        }

        return null;
    },

    /**
     * Parses OCR text from visual deck grid screenshots when card codes are absent or proxy names are used.
     */
    parseVisualDeckNames: function(rawText, cardCatalog = []) {
        if (!rawText || !cardCatalog || cardCatalog.length === 0) return null;

        const mainCardsDict = {};
        const cheerCardsDict = {};
        let oshiNumber = null;

        const cleanRawText = rawText.toLowerCase();

        // 1. Build a comprehensive map of all card names & Japanese names from cardCatalog
        const catalogNameMap = new Map();
        cardCatalog.forEach(card => {
            if (card.name) {
                const normName = card.name.toLowerCase().replace(/[\s\-_,.:;!"'()?]/g, '');
                if (normName.length >= 3) {
                    if (!catalogNameMap.has(normName)) catalogNameMap.set(normName, []);
                    catalogNameMap.get(normName).push(card);
                }
            }
            if (card.extra && card.extra.ja_name) {
                const normJaName = card.extra.ja_name.toLowerCase().replace(/[\s\-_,.:;!"'()?]/g, '');
                if (normJaName.length >= 2) {
                    if (!catalogNameMap.has(normJaName)) catalogNameMap.set(normJaName, []);
                    catalogNameMap.get(normJaName).push(card);
                }
            }
        });

        // Common fan proxy aliases mapping directly to card codes
        const proxyAliases = [
            { patterns: ['harusaki nodoka', 'nodoka'], code: 'hSD01-016' },
            { patterns: ['normal pc'], code: 'hBP01-104' },
            { patterns: ['friendly pc'], code: 'hBP05-074' },
            { patterns: ['sub pc'], code: 'hSD01-018' },
            { patterns: ['so that makes you my enemy', 'makes you my enemy', 'enemy'], code: 'hBP01-108' },
            { patterns: ['soraz celebration', 'soraz'], code: 'hBP05-080' },
            { patterns: ['callin', 'call-in', 'call in'], code: 'hBP02-079' },
            { patterns: ['miko im ashamed', 'miko, im ashamed', 'im ashamed'], code: 'hBP05-078' },
            { patterns: ['red cheer', 'redcheer'], code: 'hY03-001' },
            { patterns: ['blue cheer', 'bluecheer'], code: 'hY01-001' },
            { patterns: ['green cheer', 'greencheer'], code: 'hY02-001' },
            { patterns: ['white cheer', 'whitecheer'], code: 'hY04-001' },
            { patterns: ['purple cheer', 'purplecheer'], code: 'hY05-001' },
            { patterns: ['yellow cheer', 'yellowcheer'], code: 'hY06-001' }
        ];

        // Process line by line
        const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

        lines.forEach(line => {
            const lowerLine = line.toLowerCase();
            const cleanNormLine = lowerLine.replace(/[\s\-_,.:;!"'()?]/g, '');
            if (cleanNormLine.length < 2) return;

            // Extract quantity badge (e.g. x7, x4, 4x, x20)
            const qtyMatch = line.match(/\bx\s*(\d{1,2})\b|\b(\d{1,2})\s*x\b|\b(\d{1,2})\b/i);
            let qty = 1;
            if (qtyMatch) {
                const parsed = parseInt(qtyMatch[1] || qtyMatch[2] || qtyMatch[3], 10);
                if (parsed > 0 && parsed <= 20 && parsed !== 50) qty = parsed;
            }

            // Check proxy aliases first
            for (let alias of proxyAliases) {
                if (alias.patterns.some(p => cleanNormLine.includes(p.replace(/[^a-z0-9]/g, '')))) {
                    const card = cardCatalog.find(c => c.card_number === alias.code);
                    if (card) {
                        if (card.card_type === 'Oshi') {
                            if (!oshiNumber) oshiNumber = card.card_number;
                        } else if (card.card_type === 'Cheer' || card.card_number.startsWith('hY')) {
                            cheerCardsDict[card.card_number] = Math.min(20, qty === 1 ? 20 : qty);
                        } else {
                            mainCardsDict[card.card_number] = Math.min(4, (mainCardsDict[card.card_number] || 0) + qty);
                        }
                    }
                    return;
                }
            }

            // Check catalog cards by name / Japanese name
            for (let [normName, cards] of catalogNameMap.entries()) {
                if (normName.length >= 3 && cleanNormLine.includes(normName)) {
                    let targetCard = cards[0];
                    if (cards.length > 1) {
                        targetCard = cards.find(c => (mainCardsDict[c.card_number] || 0) < 4) || cards[0];
                    }

                    if (targetCard.card_type === 'Oshi') {
                        if (!oshiNumber) oshiNumber = targetCard.card_number;
                    } else if (targetCard.card_type === 'Cheer' || targetCard.card_number.startsWith('hY')) {
                        cheerCardsDict[targetCard.card_number] = Math.min(20, qty === 1 ? 20 : qty);
                    } else {
                        const current = mainCardsDict[targetCard.card_number] || 0;
                        mainCardsDict[targetCard.card_number] = Math.min(4, current + qty);
                    }
                    break;
                }
            }
        });

        // Global fallback scanner across whole text for any card name present in catalog
        for (let [normName, cards] of catalogNameMap.entries()) {
            if (normName.length >= 4 && cleanRawText.replace(/[^a-z0-9]/g, '').includes(normName)) {
                const card = cards[0];
                if (card.card_type === 'Oshi' && !oshiNumber) {
                    oshiNumber = card.card_number;
                } else if ((card.card_type === 'Cheer' || card.card_number.startsWith('hY')) && Object.keys(cheerCardsDict).length === 0) {
                    cheerCardsDict[card.card_number] = 20;
                } else if (card.card_type !== 'Oshi' && card.card_type !== 'Cheer') {
                    if (!mainCardsDict[card.card_number]) {
                        mainCardsDict[card.card_number] = 2;
                    }
                }
            }
        }

        // STRICT REQUIREMENT: Only return if we actually matched an Oshi or main deck cards!
        if (oshiNumber || Object.keys(mainCardsDict).length > 0) {
            return {
                oshiNumber: oshiNumber || null,
                mainCardsDict,
                cheerCardsDict,
                deckName: 'Mazo Escaneado por OCR',
                sourceFormat: 'Captura Visual OCR'
            };
        }

        return null;
    }
};

// Generar códigos HDC1 oficiales para las 10 recetas predefinidas
const PRESET_DECK_CODES = {
    riona: HDCDeckCode.encode(
        "hSD19-001",
        {
            "hSD19-002": 6,
            "hSD19-006": 4,
            "hSD19-007": 1,
            "hSD19-005": 4,
            "hSD19-004": 4,
            "hSD19-009": 4,
            "hSD19-003": 3,
            "hSD19-008": 3,
            "hSD19-010": 3,
            "hSD01-016": 3,
            "hSD01-018": 2,
            "hBP05-074": 4,
            "hBP01-108": 1,
            "hBP02-085": 3,
            "hSD01-015": 3,
            "hBP06-093": 1,
            "hSD01-014": 1
        },
        {
            "hY01-001": 13,
            "hY06-001": 7
        },
        "Todoroki Riona (hSD19)"
    ),

    kaela: HDCDeckCode.encode(
        "hBD24-066",
        {
            "hBP01-001": 4,
            "hBP01-005": 4,
            "hSD01-002": 6,
            "hSD01-004": 8,
            "hSD01-005": 4,
            "hSD01-009": 7,
            "hSD01-016": 4,
            "hSD01-017": 4,
            "hBP01-104": 3,
            "hSD01-018": 2,
            "hSD01-015": 4
        },
        { "hY03-001": 14, "hY02-001": 6 },
        "Kaela Kovalskia (G9SME)"
    ),

    moona: HDCDeckCode.encode(
        "hBP06-006",
        {
            "hBP01-001": 4,
            "hBP01-003": 4,
            "hBP01-006": 4,
            "hBP01-010": 4,
            "hSD01-002": 6,
            "hSD01-004": 4,
            "hSD01-005": 4,
            "hSD01-009": 4,
            "hSD01-016": 4,
            "hSD01-017": 4,
            "hBP01-104": 4,
            "hBP01-114": 4
        },
        { "hY05-001": 20 },
        "Moona Hoshinova (1U7LVJ)"
    ),

    kanata: HDCDeckCode.encode(
        "hBP01-001",
        {
            "hBP01-037": 10,
            "hBP01-038": 2,
            "hBP01-041": 1,
            "hBP01-042": 4,
            "hBP01-043": 4,
            "hBP01-044": 4,
            "hSD01-016": 4,
            "hSD01-017": 4,
            "hBP01-104": 3,
            "hBP05-074": 2,
            "hBP01-108": 1,
            "hBP02-079": 2,
            "hBP02-085": 1,
            "hBP02-084": 1,
            "hBP01-114": 4,
            "hBP01-116": 3
        },
        {
            "hY01-001": 20
        },
        "Amane Kanata (hBP01)"
    ),

    sora: HDCDeckCode.encode(
        "hSD01-001",
        {
            "hSD01-002": 6,
            "hSD01-004": 7,
            "hSD01-005": 4,
            "hSD01-009": 7,
            "hSD01-016": 4,
            "hSD01-017": 4,
            "hBP01-104": 4,
            "hSD01-018": 3,
            "hSD01-015": 4,
            "hBP01-118": 3,
            "hBP01-114": 4
        },
        {
            "hY01-001": 20
        },
        "Tokino Sora (hSD01)"
    ),

    pekora: HDCDeckCode.encode(
        "hBP01-002",
        {
            "hBP01-039": 10,
            "hBP01-040": 2,
            "hBP01-041": 4,
            "hBP01-042": 4,
            "hBP01-043": 4,
            "hSD01-016": 4,
            "hSD01-017": 4,
            "hBP01-104": 4,
            "hBP01-108": 2,
            "hBP02-079": 3,
            "hBP01-114": 5,
            "hBP01-116": 4
        },
        {
            "hY02-001": 20
        },
        "Usada Pekora (hBP01)"
    ),

    fubuki: HDCDeckCode.encode(
        "hBP02-001",
        {
            "hSD19-002": 6,
            "hSD19-006": 4,
            "hSD19-005": 4,
            "hSD19-004": 4,
            "hSD19-009": 4,
            "hSD19-003": 4,
            "hSD19-008": 4,
            "hSD19-010": 4,
            "hSD01-016": 4,
            "hSD01-018": 4,
            "hBP05-074": 4,
            "hSD01-015": 4
        },
        { "hY01-001": 15, "hY06-001": 5 },
        "Shirakami Fubuki (hSD14)"
    ),

    miko: HDCDeckCode.encode(
        "hBP03-003",
        {
            "hSD01-002": 6,
            "hSD01-004": 8,
            "hSD01-005": 4,
            "hSD01-009": 8,
            "hSD01-016": 4,
            "hSD01-017": 4,
            "hBP01-104": 4,
            "hSD01-018": 4,
            "hSD01-015": 4,
            "hBP01-114": 4
        },
        { "hY02-001": 20 },
        "Sakura Miko (hSD16)"
    ),

    raden: HDCDeckCode.encode(
        "hBP04-002",
        {
            "hSD19-002": 6,
            "hSD19-006": 4,
            "hSD19-005": 4,
            "hSD19-004": 4,
            "hSD19-009": 4,
            "hSD19-003": 4,
            "hSD19-008": 4,
            "hSD19-010": 4,
            "hSD01-016": 4,
            "hSD01-018": 4,
            "hBP05-074": 4,
            "hSD01-015": 4
        },
        { "hY04-001": 12, "hY06-001": 8 },
        "Juufuutei Raden (hSD15)"
    ),

    calliope: HDCDeckCode.encode(
        "hBP02-007",
        {
            "hBP01-001": 4,
            "hBP01-003": 4,
            "hBP01-006": 4,
            "hBP01-010": 4,
            "hSD01-002": 6,
            "hSD01-004": 4,
            "hSD01-005": 4,
            "hSD01-009": 4,
            "hSD01-016": 4,
            "hSD01-017": 4,
            "hBP01-104": 4,
            "hBP01-114": 4
        },
        { "hY05-001": 20 },
        "Mori Calliope (hSD18)"
    )
};
