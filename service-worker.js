var cacheName     = 'tth-cn-5',
    filesToCache  = [

      /*************** SYSTEM ***************/
        '/'
      , '/index.html'
      , '/favicon.ico'
      , '/images/app-logo.png'
      , '/images/system/info.png'
      , '/scripts/app.js'
      , '/styles/style.css'

      /************* GAME LOGOS *************/
      , '/images/games-logo/gloomhaven.png'
      , '/images/games-logo/imperialsettlers.png'
      , '/images/games-logo/kingsguild.png'
      , '/images/games-logo/risingsun.png'
      , '/images/games-logo/rollplayer.png'
      , '/images/games-logo/tokaido.png'
      , '/images/games-logo/witcher.png'

      /************* GAME PAGES *************/
      , '/games/g_gloomhaven.html'
      , '/games/g_imperialsettlers.html'
      , '/games/g_kingsguild.html'
      , '/games/g_risingsun.html'
      , '/games/g_rollplayer.html'
      , '/games/g_tokaido.html'
      , '/games/g_witcher.html'

      /************ GAME SCRIPTS ************/
      , '/scripts/g_gloomhaven.js'
      , '/scripts/g_imperialsettlers.js'
      , '/scripts/g_kingsguild.js'
      , '/scripts/g_risingsun.js'
      , '/scripts/g_rollplayer.js'
      , '/scripts/g_tokaido.js'
      , '/scripts/g_witcher.js'

      /************ GAME IMAGES *************/
      , '/images/games/imperialsettlers/amazons.png'
      , '/images/games/imperialsettlers/atlanteans.png'
      , '/images/games/imperialsettlers/aztecs.png'
      , '/images/games/imperialsettlers/barbarians.png'
      , '/images/games/imperialsettlers/egyptians.png'
      , '/images/games/imperialsettlers/japanese.png'
      , '/images/games/imperialsettlers/romans.png'
      , '/images/games/kingsguild/craft-collective.png'
      , '/images/games/kingsguild/explorers-league.png'
      , '/images/games/kingsguild/greycastle-guard.png'
      , '/images/games/kingsguild/holy-order.png'
      , '/images/games/kingsguild/merchant-guild.png'
      , '/images/games/kingsguild/starfall-syndicate.png'
      , '/images/games/risingsun/bonsai.png'
      , '/images/games/risingsun/dragonfly.png'
      , '/images/games/risingsun/fox.png'
      , '/images/games/risingsun/koi.png'
      , '/images/games/risingsun/lotus.png'
      , '/images/games/risingsun/moon.png'
      , '/images/games/risingsun/sun.png'
      , '/images/games/risingsun/turtle.png'
      , '/images/games/witcher/dandelion.png'
      , '/images/games/witcher/geralt.png'
      , '/images/games/witcher/triss.png'
      , '/images/games/witcher/yarpen.png'

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
