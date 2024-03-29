let cacheName     = '24.03.25.215656'
  , filesToCache  = [

      /*** SYSTEM ***/
        '/'
      , '/favicon.ico'
      , '/index.html'
      , '/info.html'
      , '/manifest.json'
      , '/release-notes.html'
      , '/release-notes.json'
      , '/settings.html'
      , '/images/app-logo.png'
      , '/images/system/info.png'
      , '/images/system/search.png'
      , '/data/g_app.json'
      , '/scripts/app.min.js'
      , '/styles/style.min.css'

      /*** APP ICONS ***/
      , '/images/icons/icon-128x128.png'
      , '/images/icons/icon-144x144.png'
      , '/images/icons/icon-152x152.png'
      , '/images/icons/icon-192x192.png'
      , '/images/icons/icon-256x256.png'
      , '/images/icons/icon-32x32.png'
      , '/images/icons/icon-96x96.png'

      /*** GAME LOGOS ***/
      , '/images/games-logo/18lilliput.png'
      , '/images/games-logo/azul.png'
      , '/images/games-logo/gloomhaven.png'
      , '/images/games-logo/imperialsettlers.png'
      , '/images/games-logo/imperialsettlersnorth.png'
      , '/images/games-logo/kingsguild.png'
      , '/images/games-logo/risingsun.png'
      , '/images/games-logo/rollplayer.png'
      , '/images/games-logo/tokaido.png'
      , '/images/games-logo/witcher.png'

      /*** GAME DATA ***/
      , '/data/g_18lilliput.json'
      , '/data/g_azul.json'
      , '/data/g_gloomhaven.json'
      , '/data/g_imperialsettlers.json'
      , '/data/g_imperialsettlersnorth.json'
      , '/data/g_kingsguild.json'
      , '/data/g_risingsun.json'
      , '/data/g_rollplayer.json'
      , '/data/g_tokaido.json'
      , '/data/g_witcher.json'

      /*** GAME PAGES ***/
      , '/games/g_18lilliput.html'
      , '/games/g_azul.html'
      , '/games/g_gloomhaven.html'
      , '/games/g_imperialsettlers.html'
      , '/games/g_imperialsettlersnorth.html'
      , '/games/g_kingsguild.html'
      , '/games/g_risingsun.html'
      , '/games/g_rollplayer.html'
      , '/games/g_tokaido.html'
      , '/games/g_witcher.html'

      /*** GAME SCRIPTS ***/
      , '/scripts/g_18lilliput.min.js'
      , '/scripts/g_azul.min.js'
      , '/scripts/g_gloomhaven.min.js'
      , '/scripts/g_imperialsettlers.min.js'
      , '/scripts/g_imperialsettlersnorth.min.js'
      , '/scripts/g_kingsguild.min.js'
      , '/scripts/g_risingsun.min.js'
      , '/scripts/g_rollplayer.min.js'
      , '/scripts/g_tokaido.min.js'
      , '/scripts/g_witcher.min.js'

      /*** GAME IMAGES ***/
      , '/images/games/18lilliput/balmuff.png'
      , '/images/games/18lilliput/emperor.png'
      , '/images/games/18lilliput/flimnap.png'
      , '/images/games/18lilliput/general-limnoc.png'
      , '/images/games/18lilliput/glimigrim.png'
      , '/images/games/18lilliput/lilliput.png'
      , '/images/games/18lilliput/mildendo.png'
      , '/images/games/18lilliput/skyresh-bolgolam.png'
      , '/images/games/18lilliput/slamecksan.png'
      , '/images/games/azul/1.png'
      , '/images/games/azul/2.png'
      , '/images/games/azul/3.png'
      , '/images/games/azul/4.png'
      , '/images/games/azul/5.png'
      , '/images/games/imperialsettlers/amazons.png'
      , '/images/games/imperialsettlers/atlanteans.png'
      , '/images/games/imperialsettlers/aztecs.png'
      , '/images/games/imperialsettlers/barbarians.png'
      , '/images/games/imperialsettlers/egyptians.png'
      , '/images/games/imperialsettlers/japanese.png'
      , '/images/games/imperialsettlers/romans.png'
      , '/images/games/imperialsettlersnorth/glenn.png'
      , '/images/games/imperialsettlersnorth/heidel.png'
      , '/images/games/imperialsettlersnorth/mackinnon.png'
      , '/images/games/imperialsettlersnorth/nanurjuk.png'
      , '/images/games/imperialsettlersnorth/panuk.png'
      , '/images/games/imperialsettlersnorth/saikoro.png'
      , '/images/games/imperialsettlersnorth/ulaf.png'
      , '/images/games/imperialsettlersnorth/umineko.png'
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