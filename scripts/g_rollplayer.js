// Roll Player specific javascript file
'use strict';

// Roll Player global variables
var g_data = {"Čeština" : {"base"            : {"race"      : [],
												"class"     : [],
												"backstory" : [],
												"alignment" : []},
                           "frogkin"         : {"race"      : []},
                           "minotaur"        : {"race"      : []}
						  },
			  "English" : {"base"            : {"race"      : [],
												"class"     : [],
												"backstory" : [],
												"alignment" : []},
                           "frogkin"         : {"race"      : []},
                           "minotaur"        : {"race"      : []},
                           "monstersMinions" : {"race"      : [],
												"class"     : [],
												"backstory" : [],
												"alignment" : []}
						  }
             };

// Register the action on the shuffleHeroes button
document.getElementById('shuffleHeroes').addEventListener('click', function() {
  var language        = document.getElementById('language').value,
      numberOfPlayers = Number(document.getElementById('numberOfPlayers').value),
      frogkin         = document.getElementById('frogkinPromo').checked,
      minotaur        = document.getElementById('minotaurPromo').checked,
      monstersMinions = document.getElementById('monstersMinionsExpansion').checked,
      playersCard     = document.getElementById('rp-heroes'),
      playersSlider   = document.getElementById('rp-heroes-slider'),
      availRace       = [],
      availClass      = [],
      availBackstory  = [],
      availAlignment  = [];

  // Five players available only with Monsters & Minions Expansion
  if (!monstersMinions && numberOfPlayers === 5) {
    app.createConfirm('','Five players game is available only with Monsters & Minion Expansion..');
  } else {

    // Clear previous results
    while (playersSlider.hasChildNodes()) {
      playersSlider.removeChild(playersSlider.firstChild);
    }

    // Display the clans for players
    /*for (var i = 0; i < numberOfPlayers; i++) {

      // New elements
      var slide = document.createElement('div'),
          title = document.createElement('div'),
          image = document.createElement('img');

      // Setting the elements
      slide.className = 'cardSlide';
      title.className = 'cardSlideTitle';
      title.innerText = 'Player ' + (i + 1);
      image.src       = 'images/games/risingsun/' + clansArray[i] + '.png';
      image.alt       = clansArray[i];

      // Append the elements
      slide.appendChild(title);
      slide.appendChild(image);
      playersSlider.appendChild(slide);

    }*/

    // Display the players card & slide to first element
    playersCard.hidden = false;
    playersSlider.firstElementChild.scrollIntoView(true);

  }

});

// On load init
document.getElementById('rp-heroes').hidden = true;

// Add supported languages to select list
var select = document.getElementById('language');
for (var language in g_data) {

	var option = document.createElement('option');
	option.appendChild( document.createTextNode(language) );
	option.value = language; 
	select.appendChild(option); 

}