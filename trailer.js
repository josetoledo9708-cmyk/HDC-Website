document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('hdcTrailer');
    const selector = document.getElementById('trailerLanguage');
    if (!video || !selector) return;
    function selectVersion(language) {
        const version = language === 'es' ? 'es' : 'en';
        selector.value = version;
        const source = video.querySelector('source');
        const file = `videos/hdc-tools-trailer-${version}-r4.mp4`;
        if (source.getAttribute('src') === file) return;
        video.pause();
        source.setAttribute('src', file);
        video.poster = `images/hdc-tools-trailer-${version === 'es' ? 'es-' : ''}r4.jpg`;
        video.querySelector('a').href = file;
        video.load();
    }
    selector.addEventListener('change', () => selectVersion(selector.value));
    document.getElementById('langSelect')?.addEventListener('change', e => selectVersion(e.target.value));
    selectVersion(document.documentElement.lang);
});
