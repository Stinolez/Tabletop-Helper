# Setting version
$version = Get-Date -Format "yy.MM.dd.HHmmss"

# Setting paths
$currentPath = Get-Location
$root = (Get-Item $currentPath).parent.FullName

# File names
$sw = $root + '\service-worker.js'
$app = $root + '\scripts\app.js'

### setting version to app.js
$content = (Get-Content -Path $app -ReadCount 0) -replace ("    , appVersion = '(.*)'"), ("    , appVersion = '" + $version + "'")
Set-Content -Path $app -Value $content

# Setting cached folders
$folders = @()
$folders += , @('\images\icons\', 'APP ICONS')
$folders += , @('\images\games-logo\', 'GAME LOGOS')
$folders += , @('\data\', 'GAME DATA')
$folders += , @('\games\', 'GAME PAGES')
$folders += , @('\scripts\', 'GAME SCRIPTS')
$folders += , @('\images\games\', 'GAME IMAGES')

# Creation of service worker file (if not existing)
if (-Not (Test-Path -Path $sw)) {
  New-Item $sw
}

# Start of the file generation
Set-Content -Path $sw -Value ("var cacheName     = '" + $version + "'")
Add-Content -Path $sw -Value ("  , filesToCache  = [")
Add-Content -Path $sw -Value ("")
Add-Content -Path $sw -Value ("      /*** SYSTEM ***/")
Add-Content -Path $sw -Value ("        '/'")
Add-Content -Path $sw -Value ("      , '/favicon.ico'")
Add-Content -Path $sw -Value ("      , '/index.html'")
Add-Content -Path $sw -Value ("      , '/info.html'")
Add-Content -Path $sw -Value ("      , '/manifest.json'")
Add-Content -Path $sw -Value ("      , '/release-notes.html'")
Add-Content -Path $sw -Value ("      , '/release-notes.json'")
Add-Content -Path $sw -Value ("      , '/settings.html'")
Add-Content -Path $sw -Value ("      , '/images/app-logo.png'")
Add-Content -Path $sw -Value ("      , '/images/system/info.png'")
Add-Content -Path $sw -Value ("      , '/images/system/search.png'")
Add-Content -Path $sw -Value ("      , '/scripts/app.js'")
Add-Content -Path $sw -Value ("      , '/styles/style.css'")

Add-Content -Path $sw -Value ("")

# Loop through cached folders
foreach ($folder in $folders) {

  # Folder check
  $objectPath = $root + $folder[0]

  if (Test-Path -Path $objectPath) {

    # Variables
    $files = Get-ChildItem -Path $objectPath -Exclude app.js -Recurse -Name -Attributes !Directory

    # Adding content to service worker
    Add-Content -Path $sw -Value ("      /*** " + $folder[1] + " ***/")
    foreach ($file in $files) {
      Add-Content -Path $sw -Value ("      , '" + $folder[0].replace('\', '/') + $file.replace('\', '/') + "'")
    }
    Add-Content -Path $sw -Value ("")

  }

}

# End of the file generation
Add-Content -Path $sw -Value ("    ];")
Add-Content -Path $sw -Value ("")
Add-Content -Path $sw -Value ("// Install")
Add-Content -Path $sw -Value ("self.addEventListener('install', function(e) {")
Add-Content -Path $sw -Value ("  console.log('[ServiceWorker] Install');")
Add-Content -Path $sw -Value ("  e.waitUntil(")
Add-Content -Path $sw -Value ("    caches.open(cacheName).then(function(cache) {")
Add-Content -Path $sw -Value ("      console.log('[ServiceWorker] Caching app shell');")
Add-Content -Path $sw -Value ("      return cache.addAll(filesToCache);")
Add-Content -Path $sw -Value ("    })")
Add-Content -Path $sw -Value ("  );")
Add-Content -Path $sw -Value ("});")
Add-Content -Path $sw -Value ("")
Add-Content -Path $sw -Value ("// Activate")
Add-Content -Path $sw -Value ("self.addEventListener('activate', function(e) {")
Add-Content -Path $sw -Value ("  console.log('[ServiceWorker] Activate');")
Add-Content -Path $sw -Value ("  e.waitUntil(")
Add-Content -Path $sw -Value ("    caches.keys().then(function(keyList) {")
Add-Content -Path $sw -Value ("      return Promise.all(keyList.map(function(key) {")
Add-Content -Path $sw -Value ("        if (key !== cacheName) {")
Add-Content -Path $sw -Value ("          console.log('[ServiceWorker] Removing old cache', key);")
Add-Content -Path $sw -Value ("          return caches.delete(key);")
Add-Content -Path $sw -Value ("        }")
Add-Content -Path $sw -Value ("      }));")
Add-Content -Path $sw -Value ("    })")
Add-Content -Path $sw -Value ("  );")
Add-Content -Path $sw -Value ("  return self.clients.claim();")
Add-Content -Path $sw -Value ("});")
Add-Content -Path $sw -Value ("")
Add-Content -Path $sw -Value ("// Fetch")
Add-Content -Path $sw -Value ("self.addEventListener('fetch', function(e) {")
Add-Content -Path $sw -Value ("  console.log('[ServiceWorker] Fetch', e.request.url);")
Add-Content -Path $sw -Value ("  e.respondWith(")
Add-Content -Path $sw -Value ("    caches.match(e.request).then(function(response) {")
Add-Content -Path $sw -Value ("      return response || fetch(e.request);")
Add-Content -Path $sw -Value ("    })")
Add-Content -Path $sw -Value ("  );")
Add-Content -Path $sw -Value ("});") -NoNewline