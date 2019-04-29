var cacheName     = 'tth-cn-190430-02',
    filesToCache  = [

      /*************** SYSTEM ***************/
        '/'
      , '/index.html'
      , '/favicon.ico'
      , '/images/app-logo.png'
      , '/scripts/app.js'
      , '/styles/style.css'

      /************* RISING SUN *************/
      , '/g_risingsun.html'
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

      /********** THE KING'S GUILD **********/
      , '/g_kingsguild.html'
      , '/scripts/g_kingsguild.js'
      , '/images/games/kingsguild/logo.png'
      , '/images/games/kingsguild/craft-collective.png'
      , '/images/games/kingsguild/explorers-league.png'
      , '/images/games/kingsguild/greycastle-guard.png'
      , '/images/games/kingsguild/holy-order.png'
      , '/images/games/kingsguild/merchant-guild.png'
      , '/images/games/kingsguild/starfall-syndicate.png'

      /************ ROLL PLAYER *************/
      , '/g_rollplayer.html'
      , '/scripts/g_rollplayer.js'
      , '/images/games/rollplayer/logo.png'

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
