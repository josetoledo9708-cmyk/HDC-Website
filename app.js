// OSHILIVE WEBSITE APP SCRIPT & MULTI-LANGUAGE / CAROUSEL ENGINE
if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('/index')) {
    if (!window.location.hash || window.location.hash === '#') {
        window.location.replace('/hdc#inicio');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const WORKER_MANIFEST_URL = 'https://tcgholo-gate.josetoledo9708.workers.dev/v1/manifest';
    const FALLBACK_DOWNLOAD_URL = 'https://pub-b1cb36673f704b26af8611855b66768c.r2.dev/HDC-Setup-0.1.21.exe';

    const mainDownloadBtn = document.getElementById('mainDownloadBtn');
    const navDownloadBtn = document.getElementById('navDownloadBtn');
    const versionTag = document.getElementById('versionTag');
    const toast = document.getElementById('toast');
    const langSelect = document.getElementById('langSelect');

    // 1. MULTI-LANGUAGE SYSTEM (EN = Default/Primary, ES = Secondary, JA = Japanese)
    let currentLang = localStorage.getItem('metaoshi_lang') || 'en';

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('metaoshi_lang', lang);
        document.documentElement.lang = lang;

        if (langSelect) langSelect.value = lang;

        if (typeof I18N_DATA !== 'undefined' && I18N_DATA[lang]) {
            const dict = I18N_DATA[lang];
            document.querySelectorAll('[data-i18n]').forEach(elem => {
                const key = elem.getAttribute('data-i18n');
                if (dict[key]) {
                    elem.textContent = dict[key];
                }
            });
        }
    }

    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
        });
    }

    // Initialize default language
    applyLanguage(currentLang);

    // 2. HERO BANNER CHANGING CAROUSEL ENGINE
    const track = document.getElementById('heroCarouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval = null;

    function goToSlide(n) {
        if (totalSlides === 0 || !track) return;
        currentSlide = (n + totalSlides) % totalSlides;

        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        slides.forEach((s, idx) => {
            s.classList.toggle('active', idx === currentSlide);
        });

        dots.forEach((d, idx) => {
            d.classList.toggle('active', idx === currentSlide);
        });
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            startAutoSlide();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIdx = parseInt(e.currentTarget.getAttribute('data-slide'), 10);
            goToSlide(slideIdx);
            startAutoSlide();
        });
    });

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto slide
    if (totalSlides > 0) startAutoSlide();

    // 3. DYNAMIC MANIFEST FETCHING
    async function fetchLatestManifest() {
        try {
            const response = await fetch(WORKER_MANIFEST_URL);
            if (!response.ok) throw new Error('Worker HTTP error ' + response.status);

            const data = await response.json();
            if (data && data.downloadUrl) {
                const downloadUrl = data.downloadUrl;
                const version = data.latest || '0.1.21';

                if (mainDownloadBtn) mainDownloadBtn.href = downloadUrl;
                if (navDownloadBtn) navDownloadBtn.href = downloadUrl;
                if (versionTag) versionTag.textContent = `Versión ${version} · Instalador Oficial Windows`;
                console.log('[OshiLive Web] Manifest cargado:', version, downloadUrl);
                return;
            }
        } catch (err) {
            console.warn('[OshiLive Web] No se pudo obtener el manifiesto dinámico, usando fallback:', err);
        }

        if (mainDownloadBtn) mainDownloadBtn.href = FALLBACK_DOWNLOAD_URL;
        if (navDownloadBtn) navDownloadBtn.href = FALLBACK_DOWNLOAD_URL;
        if (versionTag) versionTag.textContent = 'Versión 0.1.21 · Instalador Oficial Windows';
    }

    fetchLatestManifest();

    // 4. COPY DECK CODE TO CLIPBOARD (Compatible con HDC1-)
    document.querySelectorAll('.copy-code-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let code = e.currentTarget.getAttribute('data-code');
            if (code) {
                const lower = code.toLowerCase().trim();
                if (typeof PRESET_DECK_CODES !== 'undefined' && PRESET_DECK_CODES[lower]) {
                    code = PRESET_DECK_CODES[lower];
                }

                navigator.clipboard.writeText(code).then(() => {
                    showToast('¡Código HDC1- copiado al portapapeles! 📋');
                }).catch(err => {
                    console.error('Error al copiar:', err);
                    showToast('Código: ' + code);
                });
            }
        });
    });

    // 5. TOAST NOTIFICATION UTILITY
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    // 6. CARD IMAGE TRANSLATION SWITCHER & ZOOM MODAL LOGIC
    function setCardLanguage(cardArticle, lang) {
        if (!cardArticle) return;

        // Update card lang buttons
        cardArticle.querySelectorAll('.card-lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Update skill text visibility
        cardArticle.querySelectorAll('.skill-tag').forEach(tag => {
            tag.classList.toggle('hidden', !tag.classList.contains(`skill-lang-${lang}`));
        });
        cardArticle.querySelectorAll('.skill-desc').forEach(desc => {
            desc.classList.toggle('hidden', !desc.classList.contains(`skill-text-${lang}`));
        });

        // Update Visual Overlay Frame
        const overlay = cardArticle.querySelector('.card-visual-overlay');
        const imgTarget = cardArticle.querySelector('.card-img-target');

        if (overlay) {
            overlay.className = `card-visual-overlay active-overlay-${lang}`;
            const badge = overlay.querySelector('.overlay-badge');
            if (badge) {
                if (lang === 'es') badge.textContent = 'ES TRADUCIDA';
                else if (lang === 'en') badge.textContent = 'EN TRANSLATED';
                else badge.textContent = 'JP ORIGINAL';
            }
        }

        // Image swap if applicable
        if (imgTarget) {
            const zoomBtn = cardArticle.querySelector('.btn-card-zoom');
            if (zoomBtn) {
                const imgJp = zoomBtn.getAttribute('data-img-jp');
                const imgEn = zoomBtn.getAttribute('data-img-en');

                if (lang === 'jp' && imgJp) imgTarget.src = imgJp;
                else if (lang === 'en' && imgEn) imgTarget.src = imgEn;
                else if (lang === 'es') imgTarget.src = imgJp || imgEn;
            }
        }
    }

    // Per-card Language Button Listeners
    document.querySelectorAll('.spoiler-card').forEach(card => {
        card.querySelectorAll('.card-lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.currentTarget.getAttribute('data-lang');
                setCardLanguage(card, lang);
            });
        });
    });

    // Global Language Toggle Bar
    document.querySelectorAll('.global-card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const globalLang = e.currentTarget.getAttribute('data-card-lang');

            document.querySelectorAll('.global-card-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            document.querySelectorAll('.spoiler-card').forEach(card => {
                setCardLanguage(card, globalLang);
            });
        });
    });

    // HIGH-RES CARD ZOOM MODAL
    const cardZoomModal = document.getElementById('modal-card-viewer');
    const cardZoomTitle = document.getElementById('cardZoomTitle');
    const cardZoomCode = document.getElementById('cardZoomCode');
    const cardZoomImg = document.getElementById('cardZoomImg');
    const zoomDescEs = document.getElementById('zoomDescEs');
    const zoomDescEn = document.getElementById('zoomDescEn');
    const zoomDescJp = document.getElementById('zoomDescJp');
    const zoomTextEs = document.getElementById('zoomTextEs');
    const zoomTextEn = document.getElementById('zoomTextEn');
    const zoomTextJp = document.getElementById('zoomTextJp');

    let currentZoomData = null;

    document.querySelectorAll('.btn-card-zoom').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const el = e.currentTarget;
            currentZoomData = {
                title: el.getAttribute('data-title'),
                code: el.getAttribute('data-code'),
                imgJp: el.getAttribute('data-img-jp'),
                imgEn: el.getAttribute('data-img-en'),
                textEs: el.getAttribute('data-text-es'),
                textEn: el.getAttribute('data-text-en'),
                textJp: el.getAttribute('data-text-jp')
            };

            if (cardZoomTitle) cardZoomTitle.textContent = currentZoomData.title;
            if (cardZoomCode) cardZoomCode.textContent = currentZoomData.code;
            if (zoomDescEs) zoomDescEs.innerHTML = currentZoomData.textEs;
            if (zoomDescEn) zoomDescEn.innerHTML = currentZoomData.textEn;
            if (zoomDescJp) zoomDescJp.innerHTML = currentZoomData.textJp;

            // Default to ES in zoom modal
            setZoomModalLang('es');

            if (cardZoomModal) cardZoomModal.classList.remove('hidden');
        });
    });

    function setZoomModalLang(lang) {
        if (!currentZoomData) return;

        document.querySelectorAll('.zoom-lang-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-zoom-lang') === lang);
        });

        if (cardZoomImg) {
            if (lang === 'en' && currentZoomData.imgEn) cardZoomImg.src = currentZoomData.imgEn;
            else cardZoomImg.src = currentZoomData.imgJp || currentZoomData.imgEn;
        }

        if (zoomTextEs) zoomTextEs.classList.toggle('hidden', lang !== 'es');
        if (zoomTextEn) zoomTextEn.classList.toggle('hidden', lang !== 'en');
        if (zoomTextJp) zoomTextJp.classList.toggle('hidden', lang !== 'jp');
    }

    document.querySelectorAll('.zoom-lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.getAttribute('data-zoom-lang');
            setZoomModalLang(lang);
        });
    });

    // 7. PRODUCT CATEGORY FILTER TABS
    document.querySelectorAll('.prod-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = e.currentTarget.getAttribute('data-prod-cat');
            
            document.querySelectorAll('.prod-tab-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            document.querySelectorAll('#seccion-packs .pack-card').forEach(card => {
                const cardCat = card.getAttribute('data-cat');
                if (cat === 'all' || cardCat === cat) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 8. DYNAMIC STARRY BACKGROUND CANVAS ENGINE
    function initStarfieldEngine() {
        let canvas = document.getElementById('starfieldCanvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'starfieldCanvas';
            document.body.prepend(canvas);
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const stars = [];
        const starColors = ['#ffffff', '#ffffff', '#38bdf8', '#c084fc', '#fbbf24', '#ffffff'];
        const numStars = Math.min(Math.floor((width * height) / 12000), 160);

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.8 + 0.5,
                color: starColors[Math.floor(Math.random() * starColors.length)],
                baseAlpha: Math.random() * 0.7 + 0.2,
                alpha: Math.random() * 0.7 + 0.2,
                twinkleSpeed: Math.random() * 0.03 + 0.005,
                twinkleDirection: Math.random() > 0.5 ? 1 : -1,
                vy: Math.random() * 0.15 + 0.05
            });
        }

        // Shooting Star (Comet) system
        let shootingStar = null;

        function createShootingStar() {
            if (Math.random() < 0.3) {
                shootingStar = {
                    x: Math.random() * width * 0.8,
                    y: Math.random() * height * 0.4,
                    length: Math.random() * 80 + 40,
                    speed: Math.random() * 8 + 6,
                    angle: Math.PI / 4, // 45 degree angle
                    opacity: 1
                };
            }
        }

        setInterval(createShootingStar, 7000);

        function drawStarfield() {
            ctx.clearRect(0, 0, width, height);

            // Draw Twinkling Stars
            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];

                star.alpha += star.twinkleSpeed * star.twinkleDirection;
                if (star.alpha >= 0.95) {
                    star.alpha = 0.95;
                    star.twinkleDirection = -1;
                } else if (star.alpha <= star.baseAlpha * 0.3) {
                    star.alpha = star.baseAlpha * 0.3;
                    star.twinkleDirection = 1;
                }

                // Slow upward drift
                star.y -= star.vy;
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }

                ctx.save();
                ctx.globalAlpha = star.alpha;
                ctx.fillStyle = star.color;
                ctx.shadowBlur = star.size > 1.2 ? 6 : 0;
                ctx.shadowColor = star.color;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            // Draw Shooting Star
            if (shootingStar) {
                ctx.save();
                ctx.globalAlpha = shootingStar.opacity;
                const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
                const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;

                const grad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, endX, endY);
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.3, '#38bdf8');
                grad.addColorStop(1, 'transparent');

                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(shootingStar.x, shootingStar.y);
                ctx.lineTo(endX, endY);
                ctx.stroke();
                ctx.restore();

                shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
                shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
                shootingStar.opacity -= 0.02;

                if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
                    shootingStar = null;
                }
            }

            requestAnimationFrame(drawStarfield);
        }

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        requestAnimationFrame(drawStarfield);
    }

    initStarfieldEngine();

    // 9. IDOL CONCERT STAGE BACKGROUND EFFECTS (Spotlights, Penlights, Floating Cards)
    function initIdolConcertEffects() {
        // A. Stage Spotlights Container
        if (!document.querySelector('.stage-spotlights-container')) {
            const spotlightsContainer = document.createElement('div');
            spotlightsContainer.className = 'stage-spotlights-container';
            spotlightsContainer.innerHTML = `
                <div class="spotlight-beam beam-cyan"></div>
                <div class="spotlight-beam beam-pink"></div>
                <div class="spotlight-beam beam-purple"></div>
                <div class="spotlight-beam beam-gold"></div>
            `;
            document.body.prepend(spotlightsContainer);
        }

        // B. Penlights (Glowsticks) Audience Container
        if (!document.querySelector('.penlights-container')) {
            const penlightsContainer = document.createElement('div');
            penlightsContainer.className = 'penlights-container';
            
            const penlightColors = ['#38bdf8', '#f43f5e', '#fbbf24', '#a855f7', '#34d399', '#f472b6', '#06b6d4', '#e11d48'];
            const count = Math.min(Math.floor(window.innerWidth / 40), 24);

            for (let i = 0; i < count; i++) {
                const stick = document.createElement('div');
                stick.className = 'penlight-stick';
                const color = penlightColors[i % penlightColors.length];
                const height = Math.floor(Math.random() * 30 + 40);
                const delay = (Math.random() * 3).toFixed(2);
                const duration = (Math.random() * 1.5 + 2).toFixed(2);
                
                stick.style.background = `linear-gradient(to top, ${color}, rgba(255,255,255,0.9))`;
                stick.style.boxShadow = `0 0 12px ${color}, 0 0 24px ${color}`;
                stick.style.height = `${height}px`;
                stick.style.animationDelay = `${delay}s`;
                stick.style.animationDuration = `${duration}s`;
                
                penlightsContainer.appendChild(stick);
            }
            document.body.prepend(penlightsContainer);
        }

        // C. Scattered Floating Official Cards Container
        if (!document.querySelector('.bg-floating-cards-container')) {
            const cardsContainer = document.createElement('div');
            cardsContainer.className = 'bg-floating-cards-container';

            const officialCardImages = [
                'images/EN_hBP01-001_OSR.png',
                'images/EN_hBP01-006_SEC.png',
                'images/EN_hBP01-007_OUR.png',
                'images/EN_hBP01-014_UR.png',
                'images/EN_hBP01-043_UR_02.png',
                'images/EN_hBP01-051_UR_02.png'
            ];

            const cardPositions = [
                { top: '12%', left: '3%', rot: '-15deg', delay: '0s' },
                { top: '35%', right: '2%', rot: '18deg', delay: '-3s' },
                { top: '65%', left: '4%', rot: '-10deg', delay: '-6s' },
                { top: '82%', right: '3%', rot: '12deg', delay: '-2s' },
                { top: '22%', right: '14%', rot: '-22deg', delay: '-8s' },
                { top: '52%', left: '12%', rot: '8deg', delay: '-4s' }
            ];

            cardPositions.forEach((pos, idx) => {
                const img = document.createElement('img');
                img.className = 'bg-floating-card';
                img.src = officialCardImages[idx % officialCardImages.length];
                img.alt = 'Official Hololive Card';
                img.style.top = pos.top;
                if (pos.left) img.style.left = pos.left;
                if (pos.right) img.style.right = pos.right;
                img.style.transform = `rotate(${pos.rot})`;
                img.style.animationDelay = pos.delay;

                cardsContainer.appendChild(img);
            });

            document.body.prepend(cardsContainer);
        }
    }

    // 6. SEQUENTIAL BACKGROUND VIDEO LOOP ENGINE (3 Videos in Loop)
    const bgPlaylist = [
        'videos/bg1.mp4',
        'videos/bg2.mp4',
        'videos/bg3.mp4'
    ];
    let currentVideoIndex = 0;

    function initBgVideoLoopEngine() {
        let videoElem = document.getElementById('bgVideo');
        if (!videoElem) {
            const wrapper = document.createElement('div');
            wrapper.className = 'video-bg-wrapper';
            wrapper.innerHTML = `
                <video id="bgVideo" autoplay muted playsinline class="video-bg-element"></video>
                <div class="video-bg-overlay"></div>
            `;
            document.body.prepend(wrapper);
            videoElem = document.getElementById('bgVideo');
        }

        if (!videoElem) return;

        function playNextVideo() {
            const nextSrc = bgPlaylist[currentVideoIndex];
            currentVideoIndex = (currentVideoIndex + 1) % bgPlaylist.length;

            videoElem.style.opacity = '0.3';
            setTimeout(() => {
                videoElem.src = nextSrc;
                videoElem.load();
                const playPromise = videoElem.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        videoElem.style.opacity = '1';
                    }).catch(err => {
                        console.log('Background video autoplay handled:', err);
                        videoElem.style.opacity = '1';
                    });
                } else {
                    videoElem.style.opacity = '1';
                }
            }, 300);
        }

        videoElem.addEventListener('ended', playNextVideo);
        videoElem.addEventListener('error', (e) => {
            console.warn('Background video load error, skipping:', e);
            setTimeout(playNextVideo, 1000);
        });

        // Start initial video
        playNextVideo();
    }

    initIdolConcertEffects();
    initBgVideoLoopEngine();
});




