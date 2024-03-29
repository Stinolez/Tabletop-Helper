// Imperial Settlers specific javascript file
'use strict';

// Imperial Settlers global variables
let g_factions    = ['romans', 'barbarians', 'japanese', 'egyptians'],
    g_amazons     = ['amazons'],
    g_atlanteans  = ['atlanteans'],
    g_aztecs      = ['aztecs'];

// Register the action on the shuffleFactions button
document.getElementById('shuffleFactions').addEventListener('click', function() {
  let numberOfPlayers = Number(document.getElementById('numberOfPlayers').value),
      amazons         = document.getElementById('amazons').checked,
      atlanteans      = document.getElementById('atlanteans').checked,
      aztecs          = document.getElementById('aztecs').checked,
      factionsArray   = g_factions,
      playersCard     = document.getElementById('imperialsettlers-factions'),
      playersSlider   = document.getElementById('imperialsettlers-factions-slider');

  // Five players available only with Atlanteans
  if (!atlanteans && numberOfPlayers === 5) {
    app.createConfirm('','Five players game is available only with Atlanteans Expansion.');
  } else {

    // Add expansion if checked
    if (amazons) {
      factionsArray = factionsArray.concat(g_amazons);
    }

    // Add expansion if checked
    if (atlanteans) {
      factionsArray = factionsArray.concat(g_atlanteans);
    }

    // Add expansion if checked
    if (aztecs) {
      factionsArray = factionsArray.concat(g_aztecs);
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
      image.src       = '../images/games/imperialsettlers/' + factionsArray[i] + '.png';
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
    app.gameSetting('imperialsettlers-options', 'set');

  }

});

// On load init
document.getElementById('imperialsettlers-factions').hidden = true;

// Run game setting (with the game setting card ID)
app.gameSetting('imperialsettlers-options', 'get');

// Run the init of rules and set
app.gameInit('imperialsettlers');
