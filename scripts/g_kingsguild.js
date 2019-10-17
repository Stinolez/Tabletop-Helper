// The King's Guild specific javascript file
'use strict';

// The King's Guild global variables
var g_guilds = [  'starfall-syndicate'
                , 'merchant-guild'
                , 'explorers-league'
                , 'holy-order'
                , 'greycastle-guard'
                , 'craft-collective'];

// Register the action on the shuffleGuilds button
document.getElementById('shuffleGuilds').addEventListener('click', function() {
  var numberOfPlayers = Number(document.getElementById('numberOfPlayers').value),
      guildsArray     = g_guilds,
      playersCard     = document.getElementById('kg-guilds'),
      playersSlider   = document.getElementById('kg-guilds-slider');

  // Shuffle the guilds
  guildsArray = app.arrayShuffle(guildsArray);

  // Clear previous results
  while (playersSlider.hasChildNodes()) {
    playersSlider.removeChild(playersSlider.firstChild);
  }

  // Display the guilds for players
  for (var i = 0; i < numberOfPlayers; i++) {

    // New elements
    var slide = document.createElement('div'),
        title = document.createElement('div'),
        image = document.createElement('img');

    // Setting the elements
    slide.className = 'cardSlide';
    title.className = 'cardSlideTitle';
    title.innerText = 'Player ' + (i + 1);
    image.src       = '../images/games/kingsguild/' + guildsArray[i] + '.png';
    image.alt       = guildsArray[i];

    // Append the elements
    slide.appendChild(title);
    slide.appendChild(image);
    playersSlider.appendChild(slide);

  }

  // Display the players card & slide to first element
  playersCard.hidden = false;
  playersSlider.firstElementChild.scrollIntoView(true);

});

// On load init
document.getElementById('kg-guilds').hidden = true;
