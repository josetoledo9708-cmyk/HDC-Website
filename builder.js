// WEB DECK BUILDER ENGINE (Master Duel 3-Column Style - OshiLive)
document.addEventListener('DOMContentLoaded', async () => {

    let cardCatalog = [];
    let state = {
        deckName: 'Mi Mazo Personalizado',
        oshiCard: null,
        mainDeck: {},   // { "hSD19-002": count }
        cheerDeck: {},  // { "hY01-001": count }
        selectedCard: null,
        favorites: new Set(JSON.parse(localStorage.getItem('oshilive_favs') || '[]')),
        
        // Filter states (Master Duel Style)
        mdTab: 'oshi',        // 'oshi' | 'list' | 'cheers'
        filterType: 'all',    // 'all' | 'Oshi' | 'Holomem' | 'Support' | 'Cheer'
        filterColor: 'all',
        filterBloom: 'all',
        filterRarity: 'all',
        filterSet: 'all',
        filterExtra: false,
        sortBy: 'number',     // 'number' | 'name' | 'color' | 'rarity' | 'hp'
        searchQuery: ''
    };

    // Temp modal filter state
    let modalTempFilter = {
        type: 'all',
        color: 'all',
        bloom: 'all',
        rarity: 'all',
        set: 'all',
        extra: false
    };

    // DOM ELEMENTS
    const deckNameInput = document.getElementById('deckNameInput');
    const deckStatusTag = document.getElementById('deckStatusTag');
    const mainCount = document.getElementById('mainCount');
    const cheerCount = document.getElementById('cheerCount');
    const mainDeckCountDisplay = document.getElementById('mainDeckCountDisplay');
    const cheerDeckCountDisplay = document.getElementById('cheerDeckCountDisplay');

    // Column 1: Card Detail View
    const detailContent = document.getElementById('detailContent');
    const detailCardArt = document.getElementById('detailCardArt');
    const zoomCardBtn = document.getElementById('zoomCardBtn');
    const detailCardName = document.getElementById('detailCardName');
    const detailCardNumber = document.getElementById('detailCardNumber');
    const detailRarity = document.getElementById('detailRarity');
    const detailColor = document.getElementById('detailColor');
    const detailHp = document.getElementById('detailHp');
    const detailLife = document.getElementById('detailLife');
    const detailBaton = document.getElementById('detailBaton');
    const detailCopiesCount = document.getElementById('detailCopiesCount');
    const detailAddBtn = document.getElementById('detailAddBtn');
    const detailRemoveBtn = document.getElementById('detailRemoveBtn');
    const detailFavBtn = document.getElementById('detailFavBtn');
    const detailTextContent = document.getElementById('detailTextContent');

    // Column 2: Deck Thumbs
    const oshiCardSlot = document.getElementById('oshiCardSlot');
    const changeOshiBtn = document.getElementById('changeOshiBtn');
    const mainDeckGrid = document.getElementById('mainDeckGrid');
    const cheerDeckGrid = document.getElementById('cheerDeckGrid');

    // Column 3: Catalog & Master Duel Filters
    const catalogGrid = document.getElementById('catalogGrid');
    const catalogSearchInput = document.getElementById('catalogSearchInput');
    const sortSelect = document.getElementById('sortSelect');
    const openFilterModalBtn = document.getElementById('openFilterModalBtn');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');

    // Buttons Top Bar
    const openImportBtn = document.getElementById('openImportBtn');
    const exportCodeBtn = document.getElementById('exportCodeBtn');
    const saveLocalBtn = document.getElementById('saveLocalBtn');
    const clearDeckBtn = document.getElementById('clearDeckBtn');

    // Modals
    const importModal = document.getElementById('importModal');
    const importCodeInput = document.getElementById('importCodeInput');
    const confirmImportBtn = document.getElementById('confirmImportBtn');
    const importErrorMsg = document.getElementById('importErrorMsg');
    const zoomModal = document.getElementById('zoomModal');
    const filterModal = document.getElementById('filterModal');
    const toast = document.getElementById('toast');

    // 1. FETCH CARDS DATABASE
    async function loadCatalog() {
        try {
            if (window.CARD_CATALOG_DATA && Array.isArray(window.CARD_CATALOG_DATA)) {
                cardCatalog = window.CARD_CATALOG_DATA;
                console.log(`[DeckBuilder] ${cardCatalog.length} cartas cargadas desde data/cards.js.`);
            } else {
                const resp = await fetch('data/cards.json');
                if (!resp.ok) throw new Error('HTTP Error ' + resp.status);
                cardCatalog = await resp.json();
                console.log(`[DeckBuilder] ${cardCatalog.length} cartas cargadas mediante fetch.`);
            }

            // Check URL query parameters for auto-import (?code=... or ?deck=...)
            const urlParams = new URLSearchParams(window.location.search);
            const codeParam = urlParams.get('code') || urlParams.get('deck');
            if (codeParam && typeof HDCDeckCode !== 'undefined') {
                try {
                    const decoded = await HDCDeckCode.decodeMultiSource(codeParam, cardCatalog);
                    if (decoded) {
                        let oshiCard = null;
                        if (decoded.oshiNumber) {
                            const searchNum = decoded.oshiNumber.toUpperCase();
                            oshiCard = cardCatalog.find(c => (c.card_number || '').toUpperCase() === searchNum)
                                    || cardCatalog.find(c => c.card_type === 'Oshi' && (c.card_number || '').toUpperCase().includes(searchNum))
                                    || null;
                        }
                        state.oshiCard = oshiCard;
                        state.mainDeck = decoded.mainCardsDict || {};
                        state.cheerDeck = decoded.cheerCardsDict || {};
                        if (decoded.deckName) state.deckName = decoded.deckName;
                        if (deckNameInput) deckNameInput.value = state.deckName;
                        saveLocalDeck();
                        console.log(`[DeckBuilder] Auto-imported deck: ${state.deckName}, Oshi:`, state.oshiCard ? state.oshiCard.name : 'null');
                        setTimeout(() => {
                            showToast(`✨ Mazo cargado: ${state.deckName}`);
                        }, 300);
                    }
                } catch(e) {
                    console.warn('[DeckBuilder] Failed to import deck from URL parameter:', e);
                    loadLocalDeck();
                }
            } else {
                loadLocalDeck();
            }

            renderCatalog();
            renderDeckOverview();
            if (state.oshiCard) selectCard(state.oshiCard);
            else if (cardCatalog.length > 0) selectCard(cardCatalog[0]);
        } catch (err) {
            console.error('[DeckBuilder] Error cargando cartas:', err);
            catalogGrid.innerHTML = `<div class="error-state">Error al cargar el catálogo: ${err.message}</div>`;
        }
    }

    function loadLocalDeck() {
        try {
            const saved = localStorage.getItem('oshilive_current_deck');
            if (saved && cardCatalog.length > 0) {
                const data = JSON.parse(saved);
                const oshiNum = data.oshiCardNumber || data.oshiNumber || null;
                if (oshiNum) {
                    state.oshiCard = cardCatalog.find(c => (c.card_number || '').toUpperCase() === oshiNum.toUpperCase()) || null;
                }
                if (data.mainDeck) state.mainDeck = data.mainDeck;
                if (data.cheerDeck) state.cheerDeck = data.cheerDeck;
                if (data.deckName) {
                    state.deckName = data.deckName;
                    if (deckNameInput) deckNameInput.value = state.deckName;
                }
            }
        } catch (e) {
            console.warn('[DeckBuilder] No local deck found or error:', e);
        }
    }

    function saveLocalDeck() {
        try {
            const data = {
                oshiCardNumber: state.oshiCard ? state.oshiCard.card_number : null,
                oshiNumber: state.oshiCard ? state.oshiCard.card_number : null,
                mainDeck: state.mainDeck,
                cheerDeck: state.cheerDeck,
                deckName: state.deckName
            };
            localStorage.setItem('oshilive_current_deck', JSON.stringify(data));
        } catch (e) {
            console.warn('[DeckBuilder] Error saving local deck:', e);
        }
    }

    // 2. RENDER CARD DETAIL VIEW (LEFT COLUMN)
    function selectCard(card) {
        if (!card) return;
        state.selectedCard = card;

        const imgPath = card.image_path || `images/EN_${card.card_number}_OSR.png`;
        detailCardArt.src = imgPath;
        detailCardArt.onerror = () => { detailCardArt.src = 'https://via.placeholder.com/260x360/151c2e/38bdf8?text=' + card.card_number; };

        detailCardName.textContent = card.name;
        detailCardNumber.textContent = card.card_number;
        detailRarity.textContent = card.rarity || '-';

        // Type & Bloom Level Line
        const detailTypeAndBloom = document.getElementById('detailTypeAndBloom');
        if (detailTypeAndBloom) {
            let typeStr = card.card_type === 'Support' && card.support_subtype
                ? `Support · ${card.support_subtype}`
                : card.card_type === 'Oshi' ? 'Oshi' : card.card_type.toLowerCase();
            if (card.bloom_level) {
                typeStr += ` ${card.is_buzz ? 'Buzz ' : ''}${card.bloom_level}`;
            }
            detailTypeAndBloom.textContent = typeStr;
        }

        // Color badge
        detailColor.textContent = card.color || 'Colorless';
        detailColor.className = `color-text color-${(card.color || 'white').toLowerCase()}`;

        // Extra badge
        const detailExtraBadge = document.getElementById('detailExtraBadge');
        const hasExtra = (card.extra && JSON.stringify(card.extra) !== '{}');
        if (detailExtraBadge) {
            detailExtraBadge.classList.toggle('hidden', !hasExtra);
        }

        // Stats line (HP, Baton Pass, Life)
        if (card.hp) { detailHp.textContent = `HP ${card.hp}`; detailHp.style.display = 'inline'; } else { detailHp.style.display = 'none'; }
        if (card.batonpass_cost !== null && card.batonpass_cost !== undefined) {
            detailBaton.textContent = `Baton pass ${card.batonpass_cost}`;
            detailBaton.style.display = 'inline';
        } else {
            detailBaton.style.display = 'none';
        }
        if (card.life) { detailLife.textContent = `Life ${card.life}`; detailLife.style.display = 'inline'; } else { detailLife.style.display = 'none'; }

        // Copies in deck (Hide for Oshi cards!)
        const detailCopiesRow = document.getElementById('detailCopiesRow');
        const isOshi = (card.card_type === 'Oshi');
        if (detailCopiesRow) {
            detailCopiesRow.style.display = isOshi ? 'none' : 'inline';
        }
        const currentQty = getCurrentQty(card.card_number, card.card_type);
        const maxLimit = isOshi ? 1 : (card.card_type === 'Cheer') ? 20 : (hasExtra ? 50 : 4);
        detailCopiesCount.textContent = `${currentQty} / ${maxLimit}`;

        // Favorite button state
        const isFav = state.favorites.has(card.card_number);
        detailFavBtn.textContent = isFav ? 'En Favoritas ⭐' : 'Añadir a Favoritas ⭐';
        detailFavBtn.style.color = isFav ? '#f59e0b' : '#cbd5e1';

        // Art Variants Stepper
        const versions = cardCatalog.filter(c => c.card_number === card.card_number);
        const artLabelText = document.getElementById('artLabelText');
        if (artLabelText) {
            const currentIdx = versions.findIndex(c => c.id === card.id) + 1;
            artLabelText.textContent = `Arte ${Math.max(1, currentIdx)} / ${Math.max(1, versions.length)} · ${card.rarity || '-'}`;
        }

        // Skills, Arts, Tags & Extra text
        let textHtml = '';
        if (card.skills && card.skills.length > 0) {
            card.skills.forEach(sk => {
                const tagLabel = sk.kind === 'oshi_skill' ? 'Oshi Skill' :
                                 sk.kind === 'sp_oshi_skill' ? 'SP Oshi Skill' :
                                 sk.kind === 'collab_effect' ? 'Collab Effect' :
                                 sk.kind === 'bloom_effect' ? 'Bloom Effect' :
                                 sk.kind === 'gift' ? 'Gift' : (sk.kind || 'Skill');
                textHtml += `
                    <div class="skill-item">
                        <div class="skill-header-line">
                            <span class="skill-tag-gold">[${tagLabel}]</span>
                            <span class="skill-title-name">${sk.name || ''}</span>
                            ${sk.cost ? `<span class="skill-cost-gold">${sk.cost}</span>` : ''}
                        </div>
                        ${sk.limit ? `<div class="skill-limit-text">${sk.limit}</div>` : ''}
                        <div class="skill-body-desc">${sk.text || ''}</div>
                    </div>
                `;
            });
        }
        if (card.arts && card.arts.length > 0) {
            card.arts.forEach(art => {
                textHtml += `
                    <div class="skill-item">
                        <div class="skill-header-line">
                            <span class="skill-tag-red">[Arts]</span>
                            <span class="skill-title-name">◇ ${art.name}</span>
                            <span class="skill-damage-gold">${art.damage || 0}</span>
                        </div>
                        ${art.cost ? `<div class="skill-cost-info">Coste: ${art.cost}</div>` : ''}
                        ${art.text ? `<div class="skill-body-desc">${art.text}</div>` : ''}
                    </div>
                `;
            });
        }

        // Recuadro EXTRA placed below Arts
        if (hasExtra) {
            const extraText = card.extra.ability_text || card.extra.text || 'Recuadro EXTRA';
            textHtml += `
                <div class="skill-item extra-skill-item">
                    <div class="skill-header-line"><span class="skill-tag-gold">[Recuadro EXTRA]</span></div>
                    <div class="skill-body-desc">${extraText}</div>
                </div>
            `;
        }

        if (card.tags && card.tags.length > 0) {
            textHtml += `<div class="tags-line">${card.tags.map(t => '#' + t).join(' ')}</div>`;
        }
        if (!textHtml) {
            textHtml = `<p style="color: var(--text-muted); font-style: italic; margin: 0;">Sin habilidades especiales registradas.</p>`;
        }
        detailTextContent.innerHTML = textHtml;

        // Sets oficiales vínculos
        const detailSetsContent = document.getElementById('detailSetsContent');
        if (detailSetsContent) {
            const numParts = (card.card_number || '').split('-');
            const setCode = numParts[0] || 'Official';
            const expName = card.expansion || setCode;

            detailSetsContent.innerHTML = `
                <div class="sets-title">🌐 Edición / Set Oficial:</div>
                <div style="font-size: 10px; margin-bottom: 4px; font-weight: 600; color: var(--text-primary);">${expName}</div>
                <div>
                    <a href="https://hololive-official-cardgame.com/cardlist/?search=true&cardno=${card.card_number}" target="_blank" class="set-link-btn">
                        🔗 Carta ${card.card_number} ↗
                    </a>
                    <a href="https://hololive-official-cardgame.com/cardlist/?search=true&expansion=${setCode}" target="_blank" class="set-link-btn">
                        📦 Set ${setCode} ↗
                    </a>
                </div>
            `;
        }
    }

    // 3. RENDER DECK OVERVIEW (MIDDLE COLUMN)
    function renderDeckOverview() {
        if (state.oshiCard) {
            const imgPath = state.oshiCard.image_path || `images/EN_${state.oshiCard.card_number}_OSR.png`;
            oshiCardSlot.className = 'oshi-card-slot-large has-oshi';
            oshiCardSlot.innerHTML = `
                <div class="oshi-selected-large-wrapper" title="Haga clic para ampliar carta Oshi">
                    <img src="${imgPath}" alt="${state.oshiCard.name}" class="oshi-large-img" onerror="this.src='https://via.placeholder.com/260x360'">
                    <button class="btn-zoom-overlay oshi-zoom-btn">🔍 Ampliar</button>
                    <div class="oshi-large-info">
                        <h4 class="oshi-large-name">${state.oshiCard.name}</h4>
                        <span class="oshi-large-code">${state.oshiCard.card_number}</span>
                        <span style="font-size: 10.5px; color: var(--text-muted); display: block;">${state.oshiCard.color || ''} Oshi</span>
                    </div>
                </div>
            `;
            oshiCardSlot.onclick = () => {
                openZoomModal(state.oshiCard);
            };
        } else {
            oshiCardSlot.className = 'oshi-card-slot-large empty';
            oshiCardSlot.innerHTML = `
                <div class="oshi-placeholder-content-large">
                    <span class="oshi-slot-icon-large">🌟</span>
                    <div class="oshi-placeholder-text">
                        <h5>No has elegido carta Oshi</h5>
                        <p>Selecciona una carta Oshi en el catálogo</p>
                    </div>
                </div>
            `;
            oshiCardSlot.onclick = null;
        }

        // Render Main Deck Grid
        const mainEntries = Object.entries(state.mainDeck).filter(([_, qty]) => qty > 0);
        const totalMain = getTotalCount(state.mainDeck);
        mainCount.textContent = totalMain;
        mainDeckCountDisplay.textContent = totalMain;

        if (mainEntries.length === 0) {
            mainDeckGrid.innerHTML = `<div class="empty-deck-notice">El mazo principal está vacío. Haz clic en cartas del catálogo para agregarlas.</div>`;
        } else {
            mainDeckGrid.innerHTML = mainEntries.map(([num, qty]) => {
                const card = cardCatalog.find(c => c.card_number === num);
                const imgPath = card ? card.image_path : `images/EN_${num}_OSR.png`;
                return `
                    <div class="thumb-card-item" data-num="${num}" title="${card ? card.name : num} (x${qty})">
                        <img src="${imgPath}" alt="${num}" class="thumb-card-img" onerror="this.onerror=null; this.src='images/EN_hSD01-001_OSR.png';">
                        <span class="thumb-qty-badge">x${qty}</span>
                    </div>
                `;
            }).join('');

            mainDeckGrid.querySelectorAll('.thumb-card-item').forEach(item => {
                const num = item.getAttribute('data-num');
                item.addEventListener('click', () => {
                    const card = cardCatalog.find(c => c.card_number === num);
                    if (card) selectCard(card);
                });
                item.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    removeCard(num, 'Main');
                });
            });
        }

        // Render Cheer Deck Grid
        const cheerEntries = Object.entries(state.cheerDeck).filter(([_, qty]) => qty > 0);
        const totalCheer = getTotalCount(state.cheerDeck);
        cheerCount.textContent = totalCheer;
        cheerDeckCountDisplay.textContent = totalCheer;

        if (cheerEntries.length === 0) {
            cheerDeckGrid.innerHTML = `<div class="empty-deck-notice">El mazo de cheers está vacío. Añade 20 cartas de Cheer.</div>`;
        } else {
            cheerDeckGrid.innerHTML = cheerEntries.map(([num, qty]) => {
                const card = cardCatalog.find(c => c.card_number === num);
                const imgPath = card ? card.image_path : `images/EN_${num}_OSR.png`;
                return `
                    <div class="thumb-card-item" data-num="${num}" title="${card ? card.name : num} (x${qty})">
                        <img src="${imgPath}" alt="${num}" class="thumb-card-img" onerror="this.onerror=null; this.src='images/EN_hSD01-001_OSR.png';">
                        <span class="thumb-qty-badge">x${qty}</span>
                    </div>
                `;
            }).join('');

            cheerDeckGrid.querySelectorAll('.thumb-card-item').forEach(item => {
                const num = item.getAttribute('data-num');
                item.addEventListener('click', () => {
                    const card = cardCatalog.find(c => c.card_number === num);
                    if (card) selectCard(card);
                });
                item.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    removeCard(num, 'Cheer');
                });
            });
        }

        validateDeck();
    }

    // 4. DECK VALIDATION
    function validateDeck() {
        const totalMain = getTotalCount(state.mainDeck);
        const totalCheer = getTotalCount(state.cheerDeck);
        const hasOshi = !!state.oshiCard;

        if (hasOshi && totalMain === 50 && totalCheer === 20) {
            deckStatusTag.textContent = '✨ Mazo Válido (50+20)';
            deckStatusTag.className = 'deck-status-tag valid';
        } else {
            let msg = 'Incompleto (';
            const missing = [];
            if (!hasOshi) missing.push('Falta Oshi');
            if (totalMain !== 50) missing.push(`Main: ${totalMain}/50`);
            if (totalCheer !== 20) missing.push(`Cheers: ${totalCheer}/20`);
            msg += missing.join(' · ') + ')';
            deckStatusTag.textContent = msg;
            deckStatusTag.className = 'deck-status-tag invalid';
        }
    }

    // 5. RENDER CATALOG (RIGHT COLUMN - MASTER DUEL STYLE)
    function renderCatalog() {
        if (!cardCatalog || cardCatalog.length === 0) return;

        const query = state.searchQuery.toLowerCase().trim();

        let filtered = cardCatalog.filter(card => {
            const isOshi = (card.card_type === 'Oshi');
            const isCheer = (card.card_type === 'Cheer');

            // Top Tab Filtering (Oshi, Card List, Cheers)
            if (state.mdTab === 'oshi' && !isOshi) return false;
            if (state.mdTab === 'list' && (isOshi || isCheer)) return false; // Main Deck cards ONLY, Oshis no longer appear in Card List!
            if (state.mdTab === 'cheers' && !isCheer) return false;

            // Type Filter
            if (state.filterType !== 'all') {
                if ((card.card_type || '').toLowerCase() !== state.filterType.toLowerCase()) return false;
            }

            // Color Filter
            if (state.filterColor !== 'all') {
                if ((card.color || '').toLowerCase() !== state.filterColor.toLowerCase()) return false;
            }

            // Bloom Level Filter
            if (state.filterBloom !== 'all') {
                if ((card.bloom_level || '').toLowerCase() !== state.filterBloom.toLowerCase()) return false;
            }

            // Rarity Filter
            if (state.filterRarity !== 'all') {
                if ((card.rarity || '').toLowerCase() !== state.filterRarity.toLowerCase()) return false;
            }

            // Set Filter
            if (state.filterSet !== 'all') {
                const num = (card.card_number || '').toLowerCase();
                if (!num.includes(state.filterSet.toLowerCase())) return false;
            }

            // Extra Badge Filter
            if (state.filterExtra) {
                const hasExtra = (card.extra && JSON.stringify(card.extra) !== '{}');
                if (!hasExtra) return false;
            }

            // Search Query
            if (query) {
                const nameMatch = (card.name || '').toLowerCase().includes(query);
                const numMatch = (card.card_number || '').toLowerCase().includes(query);
                const tagMatch = (card.tags || []).some(t => t.toLowerCase().includes(query));
                if (!nameMatch && !numMatch && !tagMatch) return false;
            }

            return true;
        });

        // Sorting
        const rarityOrder = { 'OSR': 1, 'UR': 2, 'SR': 3, 'R': 4, 'U': 5, 'C': 6, 'P': 7 };
        filtered.sort((a, b) => {
            if (state.sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
            if (state.sortBy === 'color') return (a.color || '').localeCompare(b.color || '');
            if (state.sortBy === 'rarity') {
                const rA = rarityOrder[a.rarity] || 99;
                const rB = rarityOrder[b.rarity] || 99;
                return rA - rB;
            }
            if (state.sortBy === 'hp') return (b.hp || 0) - (a.hp || 0);
            return (a.card_number || '').localeCompare(b.card_number || '');
        });

        if (filtered.length === 0) {
            catalogGrid.innerHTML = `<div class="empty-deck-notice">No se encontraron cartas con los filtros seleccionados.</div>`;
            return;
        }

        catalogGrid.innerHTML = filtered.slice(0, 120).map(card => {
            const num = card.card_number;
            const currentQty = getCurrentQty(num, card.card_type);
            const imgPath = card.image_path || `images/EN_${num}_OSR.png`;
            const isSelected = state.selectedCard && state.selectedCard.card_number === num;

            return `
                <div class="catalog-tile ${isSelected ? 'selected' : ''}" data-num="${num}">
                    <img src="${imgPath}" alt="${card.name}" class="tile-thumb" onerror="this.src='https://via.placeholder.com/110x130'">
                    <span class="tile-number">${num}</span>
                    <span class="tile-title" title="${card.name}">${card.name}</span>
                    <div class="tile-controls">
                        <button class="btn-tile-qty btn-minus" data-num="${num}" data-type="${card.card_type}">-</button>
                        <span class="tile-current-qty">${currentQty}</span>
                        <button class="btn-tile-qty btn-plus" data-num="${num}" data-type="${card.card_type}">+</button>
                    </div>
                </div>
            `;
        }).join('');

        // Event listeners for tiles
        catalogGrid.querySelectorAll('.catalog-tile').forEach(tile => {
            const num = tile.getAttribute('data-num');
            tile.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-tile-qty')) return;
                const card = cardCatalog.find(c => c.card_number === num);
                if (card) selectCard(card);
            });
            tile.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const card = cardCatalog.find(c => c.card_number === num);
                if (card) addCard(card.card_number, card.card_type);
            });
        });

        catalogGrid.querySelectorAll('.btn-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                addCard(btn.getAttribute('data-num'), btn.getAttribute('data-type'));
            });
        });

        catalogGrid.querySelectorAll('.btn-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeCard(btn.getAttribute('data-num'), btn.getAttribute('data-type'));
            });
        });
    }

    // 6. CARD ADD & REMOVE ACTIONS
    function addCard(num, cardType) {
        const card = cardCatalog.find(c => c.card_number === num);
        if (!card) return;

        if (cardType === 'Oshi') {
            state.oshiCard = card;
            showToast(`Carta Oshi seleccionada: ${card.name}`);
        } else if (cardType === 'Cheer') {
            const currentTotal = getTotalCount(state.cheerDeck);
            if (currentTotal >= 20) {
                showToast('El mazo de Cheers ya tiene las 20 cartas máximas.');
                return;
            }
            state.cheerDeck[num] = (state.cheerDeck[num] || 0) + 1;
        } else {
            const currentTotal = getTotalCount(state.mainDeck);
            if (currentTotal >= 50) {
                showToast('El mazo principal ya tiene las 50 cartas máximas.');
                return;
            }

            const cardQty = state.mainDeck[num] || 0;
            const hasExtraPill = (card.extra && JSON.stringify(card.extra) !== '{}');
            if (cardQty >= 4 && !hasExtraPill) {
                showToast(`No puedes incluir más de 4 copias de ${card.name} (Regla Oficial).`);
                return;
            }

            state.mainDeck[num] = cardQty + 1;
        }

        renderDeckOverview();
        renderCatalog();
        if (state.selectedCard && state.selectedCard.card_number === num) selectCard(state.selectedCard);
        autoSaveLocalDeck();
    }

    function removeCard(num, cardType) {
        if (cardType === 'Oshi') {
            if (state.oshiCard && state.oshiCard.card_number === num) {
                state.oshiCard = null;
                showToast('Carta Oshi removida.');
            }
        } else if (cardType === 'Cheer') {
            if (state.cheerDeck[num] > 1) state.cheerDeck[num]--;
            else delete state.cheerDeck[num];
        } else {
            if (state.mainDeck[num] > 1) state.mainDeck[num]--;
            else delete state.mainDeck[num];
        }

        renderDeckOverview();
        renderCatalog();
        if (state.selectedCard && state.selectedCard.card_number === num) selectCard(state.selectedCard);
        autoSaveLocalDeck();
    }

    function getCurrentQty(num, cardType) {
        if (cardType === 'Oshi') {
            return (state.oshiCard && state.oshiCard.card_number === num) ? 1 : 0;
        } else if (cardType === 'Cheer') {
            return state.cheerDeck[num] || 0;
        } else {
            return state.mainDeck[num] || 0;
        }
    }

    function getTotalCount(dict) {
        return Object.values(dict).reduce((sum, val) => sum + val, 0);
    }

    // 7. EVENT LISTENERS & MASTER DUEL TABS / MODALS
    detailAddBtn.addEventListener('click', () => {
        if (state.selectedCard) addCard(state.selectedCard.card_number, state.selectedCard.card_type);
    });

    detailRemoveBtn.addEventListener('click', () => {
        if (state.selectedCard) removeCard(state.selectedCard.card_number, state.selectedCard.card_type);
    });

    detailFavBtn.addEventListener('click', () => {
        if (!state.selectedCard) return;
        const num = state.selectedCard.card_number;
        if (state.favorites.has(num)) {
            state.favorites.delete(num);
            showToast(`Removida de Favoritas: ${state.selectedCard.name}`);
        } else {
            state.favorites.add(num);
            showToast(`Añadida a Favoritas ⭐: ${state.selectedCard.name}`);
        }
        localStorage.setItem('oshilive_favs', JSON.stringify(Array.from(state.favorites)));
        selectCard(state.selectedCard);
        renderCatalog();
    });

    const artPrevBtn = document.getElementById('artPrevBtn');
    const artNextBtn = document.getElementById('artNextBtn');

    if (artPrevBtn && artNextBtn) {
        artPrevBtn.addEventListener('click', () => stepArt(-1));
        artNextBtn.addEventListener('click', () => stepArt(1));
    }

    function stepArt(dir) {
        if (!state.selectedCard) return;
        const versions = cardCatalog.filter(c => c.card_number === state.selectedCard.card_number);
        if (versions.length <= 1) return;
        let idx = versions.findIndex(c => c.id === state.selectedCard.id);
        idx = (idx + dir + versions.length) % versions.length;
        selectCard(versions[idx]);
    }

    function openZoomModal(card) {
        if (!card) return;
        selectCard(card);
        const imgPath = card.image_path || `images/EN_${card.card_number}_OSR.png`;
        
        const zoomModalImg = document.getElementById('zoomModalImg');
        const zoomCardName = document.getElementById('zoomCardName');
        const zoomCardCode = document.getElementById('zoomCardCode');
        const zoomCardRarity = document.getElementById('zoomCardRarity');
        const zoomCardMeta = document.getElementById('zoomCardMeta');
        const zoomTextContent = document.getElementById('zoomTextContent');
        const zoomAddBtn = document.getElementById('zoomAddBtn');
        const zoomRemoveBtn = document.getElementById('zoomRemoveBtn');
        const zoomViewDecksBtn = document.getElementById('zoomViewDecksBtn');
        const zoomSetsContent = document.getElementById('zoomSetsContent');

        if (zoomModalImg) zoomModalImg.src = imgPath;
        if (zoomCardName) zoomCardName.textContent = card.name;
        if (zoomCardCode) zoomCardCode.textContent = card.card_number;
        if (zoomCardRarity) zoomCardRarity.textContent = card.rarity || '-';

        if (zoomCardMeta) {
            let metaStr = card.card_type === 'Oshi' ? `Oshi holomem | ${card.color || 'White'}` : `${card.card_type} ${card.bloom_level || ''} | ${card.color || 'Colorless'}`;
            if (card.life) metaStr += ` · Life ${card.life}`;
            if (card.hp) metaStr += ` · HP ${card.hp}`;
            zoomCardMeta.textContent = metaStr;
        }

        if (zoomTextContent) {
            const detailTextContent = document.getElementById('detailTextContent');
            zoomTextContent.innerHTML = detailTextContent ? detailTextContent.innerHTML : '';
        }

        // Bind Add / Remove buttons in Zoom Modal
        if (zoomAddBtn) {
            zoomAddBtn.textContent = card.card_type === 'Oshi' ? '👑 Seleccionar como Oshi' : '+1 Añadir al Mazo';
            zoomAddBtn.onclick = () => {
                addCard(card.card_number, card.card_type);
            };
        }

        if (zoomRemoveBtn) {
            zoomRemoveBtn.textContent = card.card_type === 'Oshi' ? 'Remover Oshi' : '-1 Quitar del Mazo';
            zoomRemoveBtn.onclick = () => {
                removeCard(card.card_number, card.card_type);
            };
        }

        if (zoomViewDecksBtn) {
            zoomViewDecksBtn.textContent = `🎴 Ver Mazos con "${card.name}"`;
            zoomViewDecksBtn.onclick = () => {
                window.location.href = `index.html?search=${encodeURIComponent(card.name)}#filtros`;
            };
        }

        if (zoomSetsContent) {
            const numParts = (card.card_number || '').split('-');
            const setCode = numParts[0] || 'Official';
            const expName = card.expansion || setCode;

            zoomSetsContent.innerHTML = `
                <div class="sets-title">🌐 Edición / Set Oficial:</div>
                <div style="font-size: 10px; margin-bottom: 4px; font-weight: 600; color: var(--text-primary);">${expName}</div>
                <div>
                    <a href="https://hololive-official-cardgame.com/cardlist/?search=true&cardno=${card.card_number}" target="_blank" class="set-link-btn">
                        🔗 Carta ${card.card_number} ↗
                    </a>
                    <a href="https://hololive-official-cardgame.com/cardlist/?search=true&expansion=${setCode}" target="_blank" class="set-link-btn">
                        📦 Set ${setCode} ↗
                    </a>
                </div>
            `;
        }

        zoomModal.classList.remove('hidden');
    }

    zoomCardBtn.addEventListener('click', () => {
        if (state.selectedCard) openZoomModal(state.selectedCard);
    });

    const viewDecksWithCardBtn = document.getElementById('viewDecksWithCardBtn');
    if (viewDecksWithCardBtn) {
        viewDecksWithCardBtn.addEventListener('click', () => {
            if (!state.selectedCard) return;
            const cardName = state.selectedCard.name;
            window.location.href = `index.html?search=${encodeURIComponent(cardName)}#filtros`;
        });
    }

    if (changeOshiBtn) {
        changeOshiBtn.addEventListener('click', () => {
            state.mdTab = 'oshi';
            updateMdTabButtons();
            renderCatalog();
        });
    }

    // MASTER DUEL TOP TABS (Oshi, Card List, Cheers)
    const btnTabOshi = document.getElementById('btnTabOshi');
    const btnTabList = document.getElementById('btnTabList');
    const btnTabCheers = document.getElementById('btnTabCheers');

    function updateMdTabButtons() {
        [btnTabOshi, btnTabList, btnTabCheers].forEach(b => { if (b) b.classList.remove('active'); });
        if (state.mdTab === 'oshi' && btnTabOshi) btnTabOshi.classList.add('active');
        if (state.mdTab === 'list' && btnTabList) btnTabList.classList.add('active');
        if (state.mdTab === 'cheers' && btnTabCheers) btnTabCheers.classList.add('active');
    }

    if (btnTabOshi) {
        btnTabOshi.addEventListener('click', () => {
            state.mdTab = 'oshi';
            updateMdTabButtons();
            renderCatalog();
        });
    }
    if (btnTabList) {
        btnTabList.addEventListener('click', () => {
            state.mdTab = 'list';
            updateMdTabButtons();
            renderCatalog();
        });
    }
    if (btnTabCheers) {
        btnTabCheers.addEventListener('click', () => {
            state.mdTab = 'cheers';
            updateMdTabButtons();
            renderCatalog();
        });
    }

    // SEARCH INPUT
    if (catalogSearchInput) {
        catalogSearchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderCatalog();
        });
    }

    // SORT SELECT
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            renderCatalog();
        });
    }

    // RESET ALL FILTERS
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            state.mdTab = 'list';
            state.filterType = 'all';
            state.filterColor = 'all';
            state.filterBloom = 'all';
            state.filterRarity = 'all';
            state.filterSet = 'all';
            state.filterExtra = false;
            state.searchQuery = '';
            if (catalogSearchInput) catalogSearchInput.value = '';
            if (sortSelect) sortSelect.value = 'number';
            state.sortBy = 'number';
            updateMdTabButtons();
            renderCatalog();
            showToast('Filtros reseteados.');
        });
    }

    // MASTER DUEL FILTER MENU MODAL HANDLERS (#filterModal)
    if (openFilterModalBtn && filterModal) {
        openFilterModalBtn.addEventListener('click', () => {
            // Copy current state to temp modal state
            modalTempFilter = {
                type: state.filterType,
                color: state.filterColor,
                bloom: state.filterBloom,
                rarity: state.filterRarity,
                set: state.filterSet,
                extra: state.filterExtra
            };
            syncModalUI();
            filterModal.classList.remove('hidden');
        });
    }

    function syncModalUI() {
        // Sync Type buttons
        document.querySelectorAll('#modalTypeGroup .filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-type') === modalTempFilter.type);
        });
        // Sync Color buttons
        document.querySelectorAll('#modalColorGroup .filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-color') === modalTempFilter.color);
        });
        // Sync Bloom buttons
        document.querySelectorAll('#modalBloomGroup .filter-btn:not(.extra-btn)').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-bloom') === modalTempFilter.bloom);
        });
        // Sync Extra button
        const modalExtraBtn = document.getElementById('modalExtraBtn');
        if (modalExtraBtn) modalExtraBtn.classList.toggle('active', modalTempFilter.extra);

        // Sync Rarity buttons
        document.querySelectorAll('#modalRarityGroup .filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-rarity') === modalTempFilter.rarity);
        });
        // Sync Set select
        const modalSetSelect = document.getElementById('modalSetSelect');
        if (modalSetSelect) modalSetSelect.value = modalTempFilter.set;
    }

    // Modal filter button click listeners
    document.querySelectorAll('#modalTypeGroup .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            modalTempFilter.type = e.currentTarget.getAttribute('data-type');
            syncModalUI();
        });
    });
    document.querySelectorAll('#modalColorGroup .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            modalTempFilter.color = e.currentTarget.getAttribute('data-color');
            syncModalUI();
        });
    });
    document.querySelectorAll('#modalBloomGroup .filter-btn:not(.extra-btn)').forEach(btn => {
        btn.addEventListener('click', (e) => {
            modalTempFilter.bloom = e.currentTarget.getAttribute('data-bloom');
            syncModalUI();
        });
    });
    const modalExtraBtn = document.getElementById('modalExtraBtn');
    if (modalExtraBtn) {
        modalExtraBtn.addEventListener('click', () => {
            modalTempFilter.extra = !modalTempFilter.extra;
            syncModalUI();
        });
    }
    document.querySelectorAll('#modalRarityGroup .filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            modalTempFilter.rarity = e.currentTarget.getAttribute('data-rarity');
            syncModalUI();
        });
    });
    const modalSetSelect = document.getElementById('modalSetSelect');
    if (modalSetSelect) {
        modalSetSelect.addEventListener('change', (e) => {
            modalTempFilter.set = e.target.value;
        });
    }

    // Modal action buttons
    const modalClearBtn = document.getElementById('modalClearBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalApplyBtn = document.getElementById('modalApplyBtn');
    const closeFilterModalBtn = document.getElementById('closeFilterModalBtn');

    if (modalClearBtn) {
        modalClearBtn.addEventListener('click', () => {
            modalTempFilter = { type: 'all', color: 'all', bloom: 'all', rarity: 'all', set: 'all', extra: false };
            syncModalUI();
        });
    }

    if (modalCancelBtn) {
        modalCancelBtn.addEventListener('click', () => {
            filterModal.classList.add('hidden');
        });
    }
    if (closeFilterModalBtn) {
        closeFilterModalBtn.addEventListener('click', () => {
            filterModal.classList.add('hidden');
        });
    }

    if (modalApplyBtn) {
        modalApplyBtn.addEventListener('click', () => {
            state.filterType = modalTempFilter.type;
            state.filterColor = modalTempFilter.color;
            state.filterBloom = modalTempFilter.bloom;
            state.filterRarity = modalTempFilter.rarity;
            state.filterSet = modalTempFilter.set;
            state.filterExtra = modalTempFilter.extra;
            filterModal.classList.add('hidden');
            renderCatalog();
            showToast('Filtros aplicados.');
        });
    }

    // 8. EXPORT / IMPORT DECK CODES (MULTI-FORMAT: OshiLive, HoloDelta, Bushiroad)
    const exportModal = document.getElementById('exportModal');
    const exportOutputTextarea = document.getElementById('exportOutputTextarea');
    const exportFormatInfo = document.getElementById('exportFormatInfo');
    const copyExportBtn = document.getElementById('copyExportBtn');
    const downloadExportJsonBtn = document.getElementById('downloadExportJsonBtn');
    let currentExportFormat = 'oshilive';

    function updateExportModalContent() {
        if (!state.oshiCard) {
            exportOutputTextarea.value = '(Selecciona una carta Oshi en tu mazo antes de exportar)';
            return;
        }

        const oshiNum = state.oshiCard.card_number;
        const deckName = state.deckName || 'Mi Mazo';

        if (currentExportFormat === 'oshilive') {
            const code = HDCDeckCode.encode(oshiNum, state.mainDeck, state.cheerDeck, deckName);
            exportOutputTextarea.value = code;
            exportFormatInfo.textContent = '🎮 Código de Mazo OshiLive (formato Base64 HDC1- compatible con la app del juego).';
            downloadExportJsonBtn.classList.add('hidden');
        } else if (currentExportFormat === 'holodelta') {
            const jsonText = HDCDeckCode.exportHoloDeltaJSON(oshiNum, state.mainDeck, state.cheerDeck, deckName);
            exportOutputTextarea.value = jsonText;
            exportFormatInfo.textContent = '🌀 Archivo JSON oficial de HoloDelta. Guárdalo en la carpeta Decks/ de holoDelta.';
            downloadExportJsonBtn.classList.remove('hidden');
        } else if (currentExportFormat === 'bushiroad') {
            const bushiText = HDCDeckCode.exportBushiroadText(oshiNum, state.mainDeck, state.cheerDeck, deckName);
            exportOutputTextarea.value = bushiText;
            exportFormatInfo.textContent = '📋 Lista de cartas en formato Bushiroad DeckLog / HoloCard Meta.';
            downloadExportJsonBtn.classList.add('hidden');
        }
    }

    // Export format tab clicks
    document.querySelectorAll('.export-tabs-row .md-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.export-tabs-row .md-tab-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentExportFormat = e.currentTarget.getAttribute('data-export-format');
            updateExportModalContent();
        });
    });

    if (exportCodeBtn) {
        exportCodeBtn.addEventListener('click', () => {
            if (!state.oshiCard) {
                showToast('Debes seleccionar una carta Oshi antes de exportar el mazo.');
                return;
            }
            currentExportFormat = 'oshilive';
            document.querySelectorAll('.export-tabs-row .md-tab-btn').forEach(b => b.classList.remove('active'));
            const tabOshi = document.getElementById('exportTabOshilive');
            if (tabOshi) tabOshi.classList.add('active');

            updateExportModalContent();
            if (exportModal) exportModal.classList.remove('hidden');
        });
    }

    if (copyExportBtn) {
        copyExportBtn.addEventListener('click', () => {
            const text = exportOutputTextarea.value;
            if (!text) return;
            navigator.clipboard.writeText(text).then(() => {
                showToast('¡Copiado al portapapeles exitosamente!');
            }).catch(err => {
                console.error('Error copiando al portapapeles:', err);
                alert(text);
            });
        });
    }

    if (downloadExportJsonBtn) {
        downloadExportJsonBtn.addEventListener('click', () => {
            const text = exportOutputTextarea.value;
            if (!text) return;
            const blob = new Blob([text], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${(state.deckName || 'mazo_holodelta').toLowerCase().replace(/\s+/g, '_')}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('¡Archivo .json descargado para HoloDelta!');
        });
    }

    // IMPORT DECK LOGIC (MULTI-SOURCE)
    const importJsonFileInput = document.getElementById('importJsonFileInput');

    if (openImportBtn) {
        openImportBtn.addEventListener('click', () => {
            if (importCodeInput) importCodeInput.value = '';
            if (importJsonFileInput) importJsonFileInput.value = '';
            if (importErrorMsg) importErrorMsg.classList.add('hidden');
            if (importModal) importModal.classList.remove('hidden');
        });
    }

    if (importJsonFileInput) {
        importJsonFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (evt) => {
                if (importCodeInput) importCodeInput.value = evt.target.result;
            };
            reader.readAsText(file);
        });
    }

    if (confirmImportBtn) {
        confirmImportBtn.addEventListener('click', async () => {
            const rawCode = importCodeInput ? importCodeInput.value : '';
            if (!rawCode.trim()) {
                importErrorMsg.textContent = 'Por favor pega un código, enlace o JSON de mazo para importar.';
                importErrorMsg.classList.remove('hidden');
                return;
            }

            confirmImportBtn.disabled = true;
            confirmImportBtn.textContent = '⏳ Procesando...';
            importErrorMsg.classList.add('hidden');

            try {
                const decoded = await HDCDeckCode.decodeMultiSource(rawCode, cardCatalog);

                if (!decoded) {
                    throw new Error('No se pudo decodificar el mazo. Verifica que el código, enlace de Bushiroad o JSON sea válido.');
                }

                const oshiNumber = decoded.oshiNumber;
                let oshiCard = null;
                if (oshiNumber) {
                    oshiCard = cardCatalog.find(c => c.card_number === oshiNumber.toUpperCase()) || null;
                }

                state.oshiCard = oshiCard;
                state.mainDeck = decoded.mainCardsDict || {};
                state.cheerDeck = decoded.cheerCardsDict || {};
                state.deckName = decoded.deckName || 'Mazo Importado';
                if (deckNameInput) deckNameInput.value = state.deckName;

                renderDeckOverview();
                renderCatalog();
                autoSaveLocalDeck();
                if (importModal) importModal.classList.add('hidden');
                showToast(`¡Mazo "${state.deckName}" importado exitosamente desde ${decoded.sourceFormat || 'fuente externa'}!`);
            } catch (err) {
                importErrorMsg.textContent = err.message || 'Error al procesar el mazo.';
                importErrorMsg.classList.remove('hidden');
            } finally {
                confirmImportBtn.disabled = false;
                confirmImportBtn.textContent = '📥 Importar Mazo';
            }
        });
    }

    clearDeckBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas vaciar el mazo actual?')) {
            state.oshiCard = null;
            state.mainDeck = {};
            state.cheerDeck = {};
            renderDeckOverview();
            renderCatalog();
            autoSaveLocalDeck();
            showToast('Mazo vaciado.');
        }
    });

    saveLocalBtn.addEventListener('click', () => {
        autoSaveLocalDeck();
        showToast('¡Mazo guardado localmente en tu navegador!');
    });

    // Modals close triggers & backdrop click
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            importModal.classList.add('hidden');
            zoomModal.classList.add('hidden');
            if (exportModal) exportModal.classList.add('hidden');
            if (filterModal) filterModal.classList.add('hidden');
        });
    });

    [importModal, zoomModal, exportModal, filterModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            importModal.classList.add('hidden');
            zoomModal.classList.add('hidden');
            if (exportModal) exportModal.classList.add('hidden');
            if (filterModal) filterModal.classList.add('hidden');
        }
    });

    // 10. IMAGE SCANNING & OCR IMPORT (DeckLog Screenshot / Clipboard Paste)
    const openImageImportBtn = document.getElementById('openImageImportBtn');
    const importImageFileInput = document.getElementById('importImageFileInput');
    const triggerImageFileBtn = document.getElementById('triggerImageFileBtn');
    const imageScanStatus = document.getElementById('imageScanStatus');

    if (openImageImportBtn) {
        openImageImportBtn.addEventListener('click', () => {
            if (importModal) {
                importModal.classList.remove('hidden');
            }
        });
    }

    if (triggerImageFileBtn && importImageFileInput) {
        triggerImageFileBtn.addEventListener('click', () => {
            importImageFileInput.value = '';
            importImageFileInput.click();
        });

        importImageFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (importModal) importModal.classList.remove('hidden');
                processImageForDeck(file);
            }
        });
    }

    // Global Paste Event (Ctrl + V to paste image screenshot from clipboard)
    document.addEventListener('paste', (e) => {
        const clipboardData = e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData) || window.clipboardData;
        if (!clipboardData) return;

        let imageFile = null;

        if (clipboardData.files && clipboardData.files.length > 0) {
            for (let i = 0; i < clipboardData.files.length; i++) {
                const f = clipboardData.files[i];
                if (f.type && f.type.startsWith('image/')) {
                    imageFile = f;
                    break;
                }
            }
        }

        if (!imageFile && clipboardData.items && clipboardData.items.length > 0) {
            for (let i = 0; i < clipboardData.items.length; i++) {
                const item = clipboardData.items[i];
                if (item.type && item.type.startsWith('image/')) {
                    imageFile = item.getAsFile();
                    if (imageFile) break;
                }
            }
        }

        if (imageFile) {
            e.preventDefault();
            if (importModal) importModal.classList.remove('hidden');
            processImageForDeck(imageFile);
        }
    });

    // 11. AUTOMATIC ZERO-SETUP DECK IMAGE SCANNER (Client-side Visual OCR & Pattern Engine)
    async function preprocessImageForOCR(file) {
        return new Promise((resolve) => {
            if (!file) return resolve(file);
            const img = new Image();
            const url = URL.createObjectURL(file);
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    let scale = 1.5;
                    if (img.width < 1200) scale = 2.0;
                    if (img.width > 2400) scale = 1.0;

                    canvas.width = Math.round(img.width * scale);
                    canvas.height = Math.round(img.height * scale);

                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    canvas.toBlob((blob) => {
                        URL.revokeObjectURL(url);
                        resolve(blob || file);
                    }, 'image/png');
                } catch (e) {
                    URL.revokeObjectURL(url);
                    resolve(file);
                }
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                resolve(file);
            };
            img.src = url;
        });
    }

    async function scanDeckImageGrid(file) {
        return new Promise((resolve) => {
            const img = new Image();
            const url = URL.createObjectURL(file);
            img.onload = async () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    // Divide main deck grid area (typically top 15% to 75% height)
                    const gridTop = img.height * 0.12;
                    const gridHeight = img.height * 0.62;
                    const rows = 3;
                    const cols = 6;
                    const cellW = img.width / cols;
                    const cellH = gridHeight / rows;

                    let accumulatedText = '';

                    for (let r = 0; r < rows; r++) {
                        for (let c = 0; c < cols; c++) {
                            const cellX = c * cellW;
                            const cellY = gridTop + (r * cellH);

                            const cropCanvas = document.createElement('canvas');
                            const cropCtx = cropCanvas.getContext('2d');
                            cropCanvas.width = cellW * 1.5;
                            cropCanvas.height = cellH * 0.45 * 1.5;

                            cropCtx.imageSmoothingEnabled = true;
                            cropCtx.imageSmoothingQuality = 'high';
                            cropCtx.drawImage(
                                img,
                                cellX, cellY, cellW, cellH * 0.45,
                                0, 0, cropCanvas.width, cropCanvas.height
                            );

                            try {
                                const titleRes = await Tesseract.recognize(cropCanvas, 'eng');
                                const titleText = titleRes && titleRes.data ? titleRes.data.text.trim() : '';
                                if (titleText.length >= 3) {
                                    accumulatedText += `${titleText}\n`;
                                }
                            } catch (e) {}
                        }
                    }

                    // Check Oshi card at bottom-left
                    const oshiCanvas = document.createElement('canvas');
                    const oshiCtx = oshiCanvas.getContext('2d');
                    oshiCanvas.width = img.width * 0.3 * 1.5;
                    oshiCanvas.height = img.height * 0.25 * 1.5;
                    oshiCtx.drawImage(img, 0, img.height * 0.72, img.width * 0.3, img.height * 0.25, 0, 0, oshiCanvas.width, oshiCanvas.height);
                    try {
                        const oshiRes = await Tesseract.recognize(oshiCanvas, 'eng');
                        if (oshiRes && oshiRes.data && oshiRes.data.text) {
                            accumulatedText += `Oshi: ${oshiRes.data.text.trim()}\n`;
                        }
                    } catch (e) {}

                    URL.revokeObjectURL(url);
                    resolve(accumulatedText);
                } catch (e) {
                    URL.revokeObjectURL(url);
                    resolve('');
                }
            };
            img.onerror = () => { URL.revokeObjectURL(url); resolve(''); };
            img.src = url;
        });
    }

    function updateScanProgress(percent, labelText, isError = false) {
        const statusBox = document.getElementById('imageScanStatus');
        const statusText = document.getElementById('imageScanStatusText');
        const percentText = document.getElementById('imageScanPercent');
        const progressBar = document.getElementById('imageScanProgressBar');

        if (statusBox) statusBox.classList.remove('hidden');
        if (statusText && labelText) {
            statusText.textContent = labelText;
            statusText.style.color = isError ? '#ef4444' : '#38bdf8';
        }
        if (percentText) {
            percentText.textContent = `${percent}%`;
            percentText.style.color = isError ? '#ef4444' : 'var(--accent-gold)';
        }
        if (progressBar) {
            progressBar.style.width = `${percent}%`;
            if (isError) progressBar.style.background = '#ef4444';
            else progressBar.style.background = 'linear-gradient(90deg, #38bdf8, #818cf8, #fbbf24, #38bdf8)';
        }
    }

    async function processImageForDeck(file) {
        if (!file) return;

        updateScanProgress(15, '🔍 Pre-procesando imagen y optimizando contraste...');

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const dataUrl = reader.result;
                const base64Data = dataUrl.split(',')[1];
                const mimeType = file.type || 'image/png';

                // 1. Intentar Backend AI Server
                try {
                    updateScanProgress(30, '🤖 Analizando imagen con IA...');
                    const serverHost = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:8787' : '';
                    const backendResp = await fetch(`${serverHost}/v1/scan-deck`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ imageBase64: base64Data, mimeType })
                    });

                    if (backendResp.ok) {
                        const backendData = await backendResp.json();
                        if (backendData.ok && backendData.deck) {
                            updateScanProgress(90, '🎴 Generando lista de cartas detectadas...');
                            const parsedJson = backendData.deck;
                            let textList = '';
                            if (parsedJson.oshi) textList += `# Oshi:\n${parsedJson.oshi} x1\n\n`;
                            if (parsedJson.main && Array.isArray(parsedJson.main)) {
                                textList += `# Mazo Principal (50):\n`;
                                parsedJson.main.forEach(item => { textList += `${item.name} x${item.qty || 1}\n`; });
                            }
                            if (parsedJson.cheer && Array.isArray(parsedJson.cheer)) {
                                textList += `\n# Mazo de Cheers (20):\n`;
                                parsedJson.cheer.forEach(item => { textList += `${item.name} x${item.qty || 1}\n`; });
                            }

                            if (importCodeInput) importCodeInput.value = textList;

                            if (typeof HDCDeckCode !== 'undefined') {
                                const decoded = await HDCDeckCode.decodeMultiSource(textList, cardCatalog);
                                if (decoded && (decoded.oshiNumber || Object.keys(decoded.mainCardsDict || {}).length > 0)) {
                                    updateScanProgress(100, '✨ ¡Mazo cargado exitosamente!');
                                    applyImportedDeck(decoded);
                                    return;
                                }
                            }
                        }
                    }
                } catch (errBackend) {
                    console.warn('[DeckBuilder] Servidor backend no disponible, usando escáner visual de cliente:', errBackend);
                }

                // 2. Escáner Visual OCR de Cliente (Imagen Completa + Rejilla)
                let extractedText = '';

                // A) OCR Imagen Completa
                updateScanProgress(45, '⚡ Escaneando texto y códigos de cartas (Tesseract OCR)...');
                const preprocessedBlob = await preprocessImageForOCR(file);
                if (typeof Tesseract !== 'undefined') {
                    try {
                        const fullResult = await Tesseract.recognize(preprocessedBlob || file, 'eng');
                        if (fullResult && fullResult.data && fullResult.data.text) {
                            extractedText += fullResult.data.text + '\n';
                        }
                    } catch (e) {
                        console.warn('[DeckBuilder] OCR full image failed:', e);
                    }
                }

                // B) OCR por Rejilla de Celdas
                updateScanProgress(75, '🧩 Verificando celdas e insignias de cantidad...');
                try {
                    const gridText = await scanDeckImageGrid(file);
                    if (gridText) {
                        extractedText += '\n' + gridText;
                    }
                } catch (e) {
                    console.warn('[DeckBuilder] OCR grid crop failed:', e);
                }

                updateScanProgress(90, '🎴 Cruzando cartas encontradas con el catálogo oficial...');
                if (extractedText && typeof HDCDeckCode !== 'undefined') {
                    const decoded = await HDCDeckCode.decodeMultiSource(extractedText, cardCatalog);
                    if (decoded && (decoded.oshiNumber || Object.keys(decoded.mainCardsDict || {}).length > 0)) {
                        updateScanProgress(100, '✨ ¡Mazo escaneado exitosamente!');
                        applyImportedDeck(decoded);
                        return;
                    }
                }

                updateScanProgress(100, '❌ No se encontraron cartas legibles en la imagen.', true);
                showToast('❌ No se reconocieron cartas en la imagen escaneada.');
            };
        } catch (err) {
            console.error('[DeckBuilder] Error escaneando imagen:', err);
            updateScanProgress(100, '❌ Error al procesar la imagen: ' + err.message, true);
        }
    }

    function applyImportedDeck(decoded) {
        if (!decoded) return;
        let oshiCard = null;
        if (decoded.oshiNumber) {
            const searchNum = decoded.oshiNumber.toUpperCase();
            oshiCard = cardCatalog.find(c => (c.card_number || '').toUpperCase() === searchNum)
                    || cardCatalog.find(c => c.card_type === 'Oshi' && (c.name || '').toLowerCase().includes(searchNum.toLowerCase()))
                    || null;
        }

        state.oshiCard = oshiCard;
        state.mainDeck = decoded.mainCardsDict || {};
        state.cheerDeck = decoded.cheerCardsDict || {};
        state.deckName = decoded.deckName || 'Mazo Escaneado';
        if (deckNameInput) deckNameInput.value = state.deckName;

        autoSaveLocalDeck();
        renderDeckOverview();
        renderCatalog();
        if (state.oshiCard) selectCard(state.oshiCard);

        setTimeout(() => {
            if (importModal) importModal.classList.add('hidden');
            const imageScanStatus = document.getElementById('imageScanStatus');
            if (imageScanStatus) imageScanStatus.classList.add('hidden');
        }, 500);

        const mainCount = Object.values(state.mainDeck).reduce((a, b) => a + b, 0);
        showToast(`✨ ¡Mazo "${state.deckName}" importado con éxito! (${mainCount} cartas principales)`);
    }

    // INITIALIZE
    loadCatalog();
});
