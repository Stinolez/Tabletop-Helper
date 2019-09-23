var cacheName     = 'tth-cn-1-2-190923-01',
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
      , '/images/games-logo/risingsun.png'
      , '/images/games-logo/kingsguild.png'
      , '/images/games-logo/rollplayer.png'
      , '/images/games-logo/imperialsettlers.png'
      , '/images/games-logo/gloomhaven.png'

      /************* GAME PAGES *************/
      , '/g_risingsun.html'
      , '/g_kingsguild.html'
      , '/g_rollplayer.html'
      , '/g_imperialsettlers.html'
      , '/g_gloomhaven.html'

      /************ GAME SCRIPTS ************/
      , '/scripts/g_risingsun.js'
      , '/scripts/g_kingsguild.js'
      , '/scripts/g_rollplayer.js'
      , '/scripts/g_imperialsettlers.js'
      , '/scripts/g_gloomhaven.js'

      /************* RISING SUN *************/
      , '/images/games/risingsun/bonsai.png'
      , '/images/games/risingsun/dragonfly.png'
      , '/images/games/risingsun/fox.png'
      , '/images/games/risingsun/koi.png'
      , '/images/games/risingsun/lotus.png'
      , '/images/games/risingsun/moon.png'
      , '/images/games/risingsun/sun.png'
      , '/images/games/risingsun/turtle.png'

      /********** THE KING'S GUILD **********/
      , '/images/games/kingsguild/craft-collective.png'
      , '/images/games/kingsguild/explorers-league.png'
      , '/images/games/kingsguild/greycastle-guard.png'
      , '/images/games/kingsguild/holy-order.png'
      , '/images/games/kingsguild/merchant-guild.png'
      , '/images/games/kingsguild/starfall-syndicate.png'

      /********** IMPERIAL SETTLERS *********/
      , '/images/games/imperialsettlers/romans.png'
      , '/images/games/imperialsettlers/barbarians.png'
      , '/images/games/imperialsettlers/japanese.png'
      , '/images/games/imperialsettlers/egyptians.png'
      , '/images/games/imperialsettlers/atlanteans.png'
      , '/images/games/imperialsettlers/aztecs.png'
      , '/images/games/imperialsettlers/amazons.png'

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
