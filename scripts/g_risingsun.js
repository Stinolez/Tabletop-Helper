// Rising sun specific javascript file
'use strict';

// Rising sun global variables
var g_clans     = ['bonsai', 'dragonfly', 'koi', 'lotus', 'turtle'],
    g_dai_clans = ['fox'],
    g_exp_clans = ['moon', 'sun'];

// Register the action on the shuffleClans button
document.getElementById('shuffleClans').addEventListener('click', function() {
  var numberOfPlayers = Number(document.getElementById('numberOfPlayers').value),
      daimyo          = document.getElementById('daimyoBox').checked,
      expansion       = document.getElementById('dynastyExpansion').checked,
      clansArray      = g_clans,
      playersCard     = document.getElementById('risingsun-clans'),
      playersSlider   = document.getElementById('risingsun-clans-slider');

  // Six players available only with Daimyo Box or Dynasty Expansion (or both)
  if (!daimyo && !expansion && numberOfPlayers === 6) {
    app.createConfirm('','Six players game is available only with Daimyo Box or Dynasty Expansion (or both).');
  } else {

    // Add Daimyo Box clan if checked
    if (daimyo) {
      clansArray = clansArray.concat(g_dai_clans);
    }

    // Add Expansion clans if checked
    if (expansion) {
      clansArray = clansArray.concat(g_exp_clans);
    }

    // Shuffle the clans
    clansArray = app.arrayShuffle(clansArray);

    // Clear previous results
    while (playersSlider.hasChildNodes()) {
      playersSlider.removeChild(playersSlider.firstChild);
    }

    // Display the clans for players
    for (var i = 0; i < numberOfPlayers; i++) {

      // New elements
      var slide = document.createElement('div'),
          title = document.createElement('div'),
          image = document.createElement('img');

      // Setting the elements
      slide.className = 'cardSlide';
      title.className = 'cardSlideTitle';
      title.innerText = 'Player ' + (i + 1);
      image.src       = '../images/games/risingsun/' + clansArray[i] + '.png';
      image.alt       = clansArray[i];

      // Append the elements
      slide.appendChild(title);
      slide.appendChild(image);
      playersSlider.appendChild(slide);

    }

    // Display the players card & slide to first element
    playersCard.hidden = false;
    playersSlider.firstElementChild.scrollIntoView(true);

    // Run game setting (with the game setting card ID)
    app.gameSetting('risingsun-options', 'set');

  }

});

// On load init
document.getElementById('risingsun-clans').hidden = true;

// Run game setting (with the game setting card ID)
app.gameSetting('risingsun-options', 'get');

// Run the init of rules and set
app.gameInit('risingsun');
