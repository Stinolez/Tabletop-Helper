// Imperial Settlers: Empires of the North specific javascript file
'use strict';

// Imperial Settlers: Empires of the North global variables
let g_factions    = ['glenn', 'heidel', 'mackinnon', 'nanurjuk', 'panuk', 'ulaf'],
    g_japan       = ['saikoro', 'umineko'];

// Register the action on the shuffleFactions button
document.getElementById('shuffleFactions').addEventListener('click', function() {
  let numberOfPlayers = Number(document.getElementById('numberOfPlayers').value),
      japan           = document.getElementById('japan').checked,
      factionsArray   = g_factions,
      playersCard     = document.getElementById('imperialsettlersnorth-factions'),
      playersSlider   = document.getElementById('imperialsettlersnorth-factions-slider');

  // Add expansion if checked
  if (japan) {
    factionsArray = factionsArray.concat(g_japan);
  }

  // Shuffle the factions
  factionsArray = app.arrayShuffle(factionsArray);

  // Clear previous results
  while (playersSlider.hasChildNodes()) {
    playersSlider.removeChild(playersSlider.firstChild);
  }

  // Display the factions for players
  for (let i = 0; i < numberOfPlayers; i++) {

    // New elements
    let slide = document.createElement('div'),
        title = document.createElement('div'),
        image = document.createElement('img');

    // Setting the elements
    slide.className = 'cardSlide';
    title.className = 'cardSlideTitle';
    title.innerText = 'Player ' + (i + 1);
    image.src       = '../images/games/imperialsettlersnorth/' + factionsArray[i] + '.png';
    image.alt       = factionsArray[i];

    // Append the elements
    slide.appendChild(title);
    slide.appendChild(image);
    playersSlider.appendChild(slide);

  }

  // Display the players card & slide to first element
  playersCard.hidden = false;
  playersSlider.firstElementChild.scrollIntoView(true);

  // Run game setting (with the game setting card ID)
  app.gameSetting('imperialsettlersnorth-options', 'set');

});

// On load init
document.getElementById('imperialsettlersnorth-factions').hidden = true;

// Run game setting (with the game setting card ID)
app.gameSetting('imperialsettlersnorth-options', 'get');

// Run the init of rules and set
app.gameInit('imperialsettlersnorth');
