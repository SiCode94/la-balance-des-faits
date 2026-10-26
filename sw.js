// Service worker : tout le site est téléchargé dès la première visite, pour fonctionner hors connexion.
// En ligne, on va toujours chercher la dernière version (réseau d'abord) ; hors ligne, on sert la copie.
const CACHE = 'balance-v2';

// Fichiers du site. En ajouter un ici quand on crée une page, un script ou une image.
const FICHIERS = [
  './', 'index.html', 'methode.html', 'manifest.webmanifest',
  'css/tailwind.css', 'css/styles.css',
  'fonts/bricolage-grotesque-latin-500-normal.woff2', 'fonts/bricolage-grotesque-latin-700-normal.woff2',
  'icons/logo.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'js/main.js', 'js/config.js', 'js/utils/dom.js', 'js/data/faits.js', 'js/data/themes.js',
  'js/components/detail.js', 'js/components/installation.js', 'js/components/questions.js',
  'js/components/tabs.js', 'js/components/tile.js', 'js/components/visualisation.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS.map((f) => new Request(f, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((cles) => Promise.all(cles.filter((c) => c !== CACHE).map((c) => caches.delete(c))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    // no-cache : le navigateur revérifie auprès du serveur au lieu de resservir une copie de 10 minutes.
    fetch(e.request, { cache: 'no-cache' })
      .then((r) => {
        if (r.ok) { const copie = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copie)); }
        return r;
      })
      .catch(async () => (await caches.match(e.request, { ignoreSearch: true }))
        ?? (e.request.mode === 'navigate' ? caches.match('./') : Response.error()))
  );
});
