const cacheName = "v1-sudoku";
const cacheAssets = [
    "index.html",
    "/styles/main.css",
    "/js/main.js",
    "script.js",
    "sw.js",
    "icon.pnj",
    "manifest.json"
];

self.addEventListener('install', (e) => {
    console.log('service worker: installed');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('service worker: caching files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    )
})

addEventListener('install', event => {
    const preCache = async() => {
        const cache = await caches.open('v1-sudoku');
        return cache.addAll([
            '/',
            '/about/',
            '/static/styles.css'
        ]);
    };
    event.waitUntil(preCache());
});

// lors de l'activation du service worker nettoyage des caches
self.addEventListener('activate', (e) => {
    console.log('service worker: activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        // si on change le nom du chaque permet de supprimer les anciens
                        console.log('Service Worker : clearing old cache');
                        return caches.delete(cache)
                    }
                })
            );
        })
    );
});

/*// call Fetch event
self.addEventListener('fetch', e => {
    console.log('Service Worker: fetching');
    e.respondWith(
        // on va repondre avec les elements du cache
        fetch(e.request).catch(() => caches.match(e.request))
    )
})*/

/*// call Fetch event
self.addEventListener('fetch', e => {
    console.log('Service Worker: fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
           
            // faire une copie/clone de la reponse
            const resClone = res.clone();
            caches
                .open(cacheName)
                .then(cache => {
                    // add response to cache
                    cache.put(e.request, resClone);
                });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );
}); */

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});