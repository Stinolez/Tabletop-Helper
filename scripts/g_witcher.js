// Witcher specific javascript file
'use strict';

// Witcher global variables
let g_characters = ['geralt', 'triss', 'yarpen', 'dandelion'];

// Register the action on the shuffleCharacters button
document.getElementById('shuffleCharacters').addEventListener('click', function() {
  let numberOfPlayers = Number(document.getElementById('numberOfPlayers').value),
      charactersArray = g_characters,
      playersCard     = document.getElementById('witcher-characters'),
      playersSlider   = document.getElementById('witcher-characters-slider');

  // Shuffle the characters
  charactersArray = app.arrayShuffle(charactersArray);

  // Clear previous results
  while (playersSlider.hasChildNodes()) {
    playersSlider.removeChild(playersSlider.firstChild);
  }

  // Display the characters for players
  for (let i = 0; i < numberOfPlayers; i++) {

    // New elements
    let slide = document.createElement('div'),
        title = document.createElement('div'),
        image = document.createElement('img');

    // Setting the elements
    slide.className = 'cardSlide';
    title.className = 'cardSlideTitle';
    title.innerText = 'Player ' + (i + 1);
    image.src       = '../images/games/witcher/' + charactersArray[i] + '.png';
    image.alt       = charactersArray[i];

    // Append the elements
    slide.appendChild(title);
    slide.appendChild(image);
    playersSlider.appendChild(slide);

  }

  // Display the players card & slide to first element
  playersCard.hidden = false;
  playersSlider.firstElementChild.scrollIntoView(true);

  // Run game setting (with the game setting card ID)
  app.gameSetting('witcher-options', 'set');

});

// On load init
document.getElementById('witcher-characters').hidden = true;

// Run game setting (with the game setting card ID)
app.gameSetting('witcher-options', 'get');

// Run the init of rules and set
app.gameInit('witcher');
