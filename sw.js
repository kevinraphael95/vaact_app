// ── VAACT Service Worker ──
// Met en cache tous les fichiers pour un accès hors ligne

const CACHE_NAME = 'vaact-v1';
const FILES_TO_CACHE = [
  './vaact_app.html',
  './manifest.json'
];

// Installation : on met tout en cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Mise en cache des fichiers');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation : on supprime les vieux caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch : on sert depuis le cache si hors ligne
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // On met à jour le cache si on est en ligne
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => {
        // Hors ligne et pas en cache : page d'erreur basique
        return new Response('<h1 style="font-family:sans-serif;padding:20px;color:#c9a84c;background:#0a0806;">VAACT — Contenu non disponible hors ligne</h1>', {
          headers: { 'Content-Type': 'text/html' }
        });
      });
    })
  );
});
