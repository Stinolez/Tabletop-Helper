:: Delayed expansion
setlocal enabledelayedexpansion

:: Console output (on/off)
@echo on

:: Setting the project root folder
set root=%~dp0
set root=%root:~,-10%

:: Setting paths
set sw=%root%service-worker.js
set build=%root%__support/build.txt
set logos=%root%images/games-logo/
set pages=%root%games/
set scripts=%root%scripts/
set images=%root%images/games/

:: Setting service worker version number (tth-cn-[number])
set /p version=<%build%
set /a version=%version%+1

:: Start of the file generation
  echo>%sw% var cacheName     = 'tth-cn-%version%',
 echo>>%sw%     filesToCache  = [
echo.>>%sw%
 echo>>%sw%       /*************** SYSTEM ***************/
 echo>>%sw%         '/'
 echo>>%sw%       , '/index.html'
 echo>>%sw%       , '/favicon.ico'
 echo>>%sw%       , '/images/app-logo.png'
 echo>>%sw%       , '/images/system/info.png'
 echo>>%sw%       , '/scripts/app.js'
 echo>>%sw%       , '/styles/style.css'
echo.>>%sw%
 echo>>%sw%       /************* GAME LOGOS *************/

:: Loop through the game logos folder
for %%f in (%logos%*.png) do (
 echo>>%sw%       , '/images/games-logo/%%~xnf'
)

echo.>>%sw%
 echo>>%sw%       /************* GAME PAGES *************/

:: Loop through the game pages folder
for %%f in (%pages%*.html) do (
 echo>>%sw%       , '/games/%%~xnf'
)

echo.>>%sw%
 echo>>%sw%       /************ GAME SCRIPTS ************/

:: Loop through the game pages folder
for %%f in (%scripts%g_*.js) do (
 echo>>%sw%       , '/scripts/%%~xnf'
)

echo.>>%sw%
 echo>>%sw%       /************ GAME IMAGES *************/

:: Loop through the game images folder
for /d %%d in (%images%*) do (

  :: Loop through the subfolders
  for %%f in (%images%%%~nd/*.png) do (
    echo>>%sw%       , '/images/games/%%~nd/%%~xnf'
  )

)

echo.>>%sw%
 echo>>%sw%     ];
echo.>>%sw%
 echo>>%sw% // Install
 echo>>%sw% self.addEventListener('install', function(e) {
 echo>>%sw%   console.log('[ServiceWorker] Install');
 echo>>%sw%   e.waitUntil(
 echo>>%sw%     caches.open(cacheName).then(function(cache) {
 echo>>%sw%       console.log('[ServiceWorker] Caching app shell');
 echo>>%sw%       return cache.addAll(filesToCache);
 echo>>%sw%     })
 echo>>%sw%   );
 echo>>%sw% });
echo.>>%sw%
 echo>>%sw% // Activate
 echo>>%sw% self.addEventListener('activate', function(e) {
 echo>>%sw%   console.log('[ServiceWorker] Activate');
 echo>>%sw%   e.waitUntil(
 echo>>%sw%     caches.keys().then(function(keyList) {
 echo>>%sw%       return Promise.all(keyList.map(function(key) {
 echo>>%sw%         if (key ^^!== cacheName) {
 echo>>%sw%           console.log('[ServiceWorker] Removing old cache', key);
 echo>>%sw%           return caches.delete(key);
 echo>>%sw%         }
 echo>>%sw%       }));
 echo>>%sw%     })
 echo>>%sw%   );
 echo>>%sw%   return self.clients.claim();
 echo>>%sw% });
echo.>>%sw%
 echo>>%sw% // Fetch
 echo>>%sw% self.addEventListener('fetch', function(e) {
 echo>>%sw%   console.log('[ServiceWorker] Fetch', e.request.url);
 echo>>%sw%   e.respondWith(
 echo>>%sw%     caches.match(e.request).then(function(response) {
 echo>>%sw%       return response ^|^| fetch(e.request);
 echo>>%sw%     })
 echo>>%sw%   );
 echo>>%sw% });

:: Save back to build file the number of the generated version
echo %version% >%build%