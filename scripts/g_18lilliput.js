// 18Lilliput specific javascript file
'use strict';

// 18Lilliput global variables
var g_characters = [  'flimnap'
                    , 'general-limnoc'
                    , 'skyresh-bolgolam'
                    , 'balmuff'
                    , 'emperor'],
    g_companies  = [  'glimigrim'
                    , 'lilliput'
                    , 'mildendo'
                    , 'slamecksan'];
440/685

418/650

// Register the action on the shuffleCharacters button
document.getElementById('shuffleCharacters').addEventListener('click', function() {
  var numberOfPlayers = Number(document.getElementById('numberOfPlayers').value),
      charactersArray = g_characters,
      companiesArray  = g_companies,
      playersCard     = document.getElementById('18lilliput-characters'),
      playersSlider   = document.getElementById('18lilliput-characters-slider');

  // Shuffle the characters and companies
  charactersArray = app.arrayShuffle(charactersArray);
  companiesArray  = app.arrayShuffle(companiesArray);

  // Clear previous results
  while (playersSlider.hasChildNodes()) {
    playersSlider.removeChild(playersSlider.firstChild);
  }

  // Display the characters for players
  for (var i = 0; i < numberOfPlayers; i++) {

    // New elements
    var slide  = document.createElement('div'),
        title  = document.createElement('div'),
        image1 = document.createElement('img'),
        image2 = document.createElement('img');

    // Setting the elements
    slide.className    = 'cardSlide';
    title.className    = 'cardSlideTitle';
    title.innerText    = 'Player ' + (i + 1);
    image1.src         = '../images/games/18lilliput/' + charactersArray[i] + '.png';
    image1.alt         = charactersArray[i];
    image2.src         = '../images/games/18lilliput/' + companiesArray[i] + '.png';
    image2.alt         = companiesArray[i];

    // Append the elements
    slide.appendChild(title);
    slide.appendChild(image1);
    slide.appendChild(image2);
    playersSlider.appendChild(slide);

  }

  // Display the players card & slide to first element
  playersCard.hidden = false;
  playersSlider.firstElementChild.scrollIntoView(true);

  // Run game setting (with the game setting card ID)
  app.gameSetting('18lilliput-options', 'set');

});

// On load init
document.getElementById('18lilliput-characters').hidden = true;

// Run game setting (with the game setting card ID)
app.gameSetting('18lilliput-options', 'get');