# Setting paths
$script = Split-Path -parent $MyInvocation.MyCommand.Definition
$root = ((Get-Item $script).parent.FullName + "\")
$build = $root + "__build\"

# Delete previous build
if ((Test-Path -Path $build)) {
  Write-Host "Deleting previous build."
  Remove-Item -Path $build -Recurse
}

# Creating build directory
Write-Host "Creating new build."
New-Item $build -Type Directory

# Variables
$rootFiles = Get-ChildItem -Path $root -Exclude ".gitignore" -Name -Attributes !Directory
$dataFolders = Get-ChildItem -Path $root -Recurse -Name -Attributes Directory

# Copy root files (excluding not minified js files)
foreach ($file in $rootFiles) {
  Copy-Item ($root + $file) -Destination $build
}

# Create structure and copy all files in the structure (excluding folders starting with "__" or github folder, excluding not minified js / css files)
foreach ($folder in $dataFolders) {
  if ($folder -NotLike ".git*" -And $folder -NotLike ".vscode*" -And $folder -NotLike "__*") {
    New-Item ($build + $folder) -Type Directory
    $dataFiles = Get-ChildItem -Path ($root + $folder) -Exclude *.js.map, *.css.map -Name -Attributes !Directory
    foreach ($file in $dataFiles) {
      if ($file -Like "*.min.js" -Or $file -Like "*.min.css" -Or ($file -NotLike "*.js" -And $file -NotLike "*.css")) {
        Copy-Item ($root + $folder + "\" + $file) -Destination ($build + $folder + "\")
      }
    }
  }
}