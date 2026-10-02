// METAOSHI DECK HUB INTERACTIVE SCRIPT
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('deckSearchInput');
    const filterChips = document.querySelectorAll('.filter-chip');
    const deckCards = document.querySelectorAll('.deck-card-expanded');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn');
    const modals = document.querySelectorAll('.modal-backdrop');

    let currentFilter = 'all';

    // 1. FILTER CHIPS HANDLING
    filterChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            filterChips.forEach(c => c.classList.remove('active'));
            e.currentTarget.classList.add('active');

            currentFilter = e.currentTarget.getAttribute('data-filter');
            applyFilters();
        });
    });

    // 2. SEARCH INPUT HANDLING
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyFilters();
        });
    }

    // 3. APPLY FILTERS FUNCTION
    function applyFilters() {
        const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');

        deckCards.forEach(card => {
            const tags = (card.getAttribute('data-tags') || '').toLowerCase();
            const textContent = card.textContent.toLowerCase();

            const matchesFilter = (currentFilter === 'all' || tags.includes(currentFilter));
            const matchesQuery = (!query || textContent.includes(query));

            if (matchesFilter && matchesQuery) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // 4. MODAL DRAWER OPEN & CLOSE
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetModalId = e.currentTarget.getAttribute('data-modal');
            const targetModal = document.getElementById(targetModalId);
            if (targetModal) {
                targetModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(m => m.classList.add('hidden'));
            document.body.style.overflow = 'auto';
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    });
});
