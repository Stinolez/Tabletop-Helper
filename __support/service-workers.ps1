# Setting version
$version = Get-Date -Format "yy.MM.dd.HHmmss"

# Setting paths
$scriptPath = Split-Path -parent $MyInvocation.MyCommand.Definition
$root = (Get-Item $scriptPath).parent.FullName

# Service Worker
$sw_content = ""
$sw = $root + '\service-worker.js'

# Main app.js
$app = $root + '\scripts\app.js'
$content = (Get-Content -Path $app -ReadCount 0) -replace ("    , appVersion = '(.*)'"), ("    , appVersion = '" + $version + "'")
Set-Content -Path $app -Value $content

# Setting cached folders (structure: <path>, <sw comment>, <include>, <exclude>)
$folders = @()
$folders += , @('\images\icons\'     , 'APP ICONS'   , '*'       , '')
$folders += , @('\images\games-logo\', 'GAME LOGOS'  , '*'       , '')
$folders += , @('\data\'             , 'GAME DATA'   , '*'       , 'g_app.json')
$folders += , @('\games\'            , 'GAME PAGES'  , '*'       , '')
$folders += , @('\scripts\'          , 'GAME SCRIPTS', '*.min.js', 'app*.js')
$folders += , @('\images\games\'     , 'GAME IMAGES' , '*'       , '')

# Creation of service worker file (if not existing)
if (-Not (Test-Path -Path $sw)) {
  New-Item $sw
}

# Start of the file generation
$sw_content +=       "var cacheName     = '" + $version + "'"
$sw_content += "`n  , filesToCache  = ["
$sw_content += "`n"
$sw_content += "`n      /*** SYSTEM ***/"
$sw_content += "`n        '/'"
$sw_content += "`n      , '/favicon.ico'"
$sw_content += "`n      , '/index.html'"
$sw_content += "`n      , '/info.html'"
$sw_content += "`n      , '/manifest.json'"
$sw_content += "`n      , '/release-notes.html'"
$sw_content += "`n      , '/release-notes.json'"
$sw_content += "`n      , '/settings.html'"
$sw_content += "`n      , '/images/app-logo.png'"
$sw_content += "`n      , '/images/system/info.png'"
$sw_content += "`n      , '/images/system/search.png'"
$sw_content += "`n      , '/data/g_app.json'"
$sw_content += "`n      , '/scripts/app.min.js'"
$sw_content += "`n      , '/styles/style.min.css'"
$sw_content += "`n"

# Loop through cached folders
foreach ($folder in $folders) {

  # Folder check
  $objectPath = $root + $folder[0]

  if (Test-Path -Path $objectPath) {

    # Variables
    $include = $folder[2]
    $exclude = $folder[3]
    $files = Get-ChildItem -Path $objectPath -Exclude $exclude -Include $include -Recurse -Name -Attributes !Directory

    # Adding content to service worker
    $sw_content += "`n      /*** " + $folder[1] + " ***/"
    foreach ($file in $files) {
      $sw_content += "`n      , '" + $folder[0].replace('\', '/') + $file.replace('\', '/') + "'"
    }
    $sw_content += "`n"

  }

}

# End of the file generation
$sw_content += "`n    ];"
$sw_content += "`n"
$sw_content += "`n// Install"
$sw_content += "`nself.addEventListener('install', function(e) {"
$sw_content += "`n  console.log('[ServiceWorker] Install');"
$sw_content += "`n  e.waitUntil("
$sw_content += "`n    caches.open(cacheName).then(function(cache) {"
$sw_content += "`n      console.log('[ServiceWorker] Caching app shell');"
$sw_content += "`n      return cache.addAll(filesToCache);"
$sw_content += "`n    })"
$sw_content += "`n  );"
$sw_content += "`n});"
$sw_content += "`n"
$sw_content += "`n// Activate"
$sw_content += "`nself.addEventListener('activate', function(e) {"
$sw_content += "`n  console.log('[ServiceWorker] Activate');"
$sw_content += "`n  e.waitUntil("
$sw_content += "`n    caches.keys().then(function(keyList) {"
$sw_content += "`n      return Promise.all(keyList.map(function(key) {"
$sw_content += "`n        if (key !== cacheName) {"
$sw_content += "`n          console.log('[ServiceWorker] Removing old cache', key);"
$sw_content += "`n          return caches.delete(key);"
$sw_content += "`n        }"
$sw_content += "`n      }));"
$sw_content += "`n    })"
$sw_content += "`n  );"
$sw_content += "`n  return self.clients.claim();"
$sw_content += "`n});"
$sw_content += "`n"
$sw_content += "`n// Fetch"
$sw_content += "`nself.addEventListener('fetch', function(e) {"
$sw_content += "`n  console.log('[ServiceWorker] Fetch', e.request.url);"
$sw_content += "`n  e.respondWith("
$sw_content += "`n    caches.match(e.request).then(function(response) {"
$sw_content += "`n      return response || fetch(e.request);"
$sw_content += "`n    })"
$sw_content += "`n  );"
$sw_content += "`n});"

# Setting the ServiceWorker file
Set-Content -Path $sw -Value $sw_content -NoNewline

# Reminder
Write-Host "Please save scripts/app.js file to minify it."