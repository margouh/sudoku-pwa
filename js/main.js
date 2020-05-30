// vérifier compatbilite du service worker
if ('serviceWorker' in navigator) {
    console.log("Service Worker : Supported");
}

// Verification navigateur supporte les services workers
if ('serviceWorker' in navigator) {
    // inscription du service workler
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw_cached_pages.js')
            .then(reg => console.log("Service worker : Register"))
            .catch(err => console.log(`Service worker: Error ${err}`))
    })
}