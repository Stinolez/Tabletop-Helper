var cacheName = 'tth-cn-2';
var filesToCache = [

  /*************** SYSTEM ***************/
    '/'
  , '/index.html'
  , '/favicon.ico'
  , '/images/app-logo.png'
  , '/scripts/app.js'
  , '/styles/style.css'

  /************* RISING SUN *************/
  , '/risingsun.html'
  , '/scripts/g_risingsun.js'
  , '/images/games/risingsun/logo.png'
  , '/images/games/risingsun/bonsai.png'
  , '/images/games/risingsun/dragonfly.png'
  , '/images/games/risingsun/fox.png'
  , '/images/games/risingsun/koi.png'
  , '/images/games/risingsun/lotus.png'
  , '/images/games/risingsun/moon.png'
  , '/images/games/risingsun/sun.png'
  , '/images/games/risingsun/turtle.png'
  
];

// Install
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

// Activate
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// Fetch
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
