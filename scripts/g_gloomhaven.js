// Gloomhaven specific javascript file
'use strict';

// Gloomhaven global variables
let g_scenario_level = {"0": {"monster": "0", "gold": "2", "trap": "2", "hazard": "1", "exp": "4"},
                        "1": {"monster": "1", "gold": "2", "trap": "3", "hazard": "1", "exp": "6"},
                        "2": {"monster": "2", "gold": "3", "trap": "4", "hazard": "2", "exp": "8"},
                        "3": {"monster": "3", "gold": "3", "trap": "5", "hazard": "2", "exp": "10"},
                        "4": {"monster": "4", "gold": "4", "trap": "6", "hazard": "3", "exp": "12"},
                        "5": {"monster": "5", "gold": "4", "trap": "7", "hazard": "3", "exp": "14"},
                        "6": {"monster": "6", "gold": "5", "trap": "8", "hazard": "4", "exp": "16"},
                        "7": {"monster": "7", "gold": "6", "trap": "9", "hazard": "4", "exp": "18"}
                       },
    g_solo_level     = {"0": {"monster": "1", "gold": "2", "trap": "3", "hazard": "1", "exp": "4"},
                        "1": {"monster": "2", "gold": "2", "trap": "4", "hazard": "2", "exp": "6"},
                        "2": {"monster": "3", "gold": "3", "trap": "5", "hazard": "2", "exp": "8"},
                        "3": {"monster": "4", "gold": "3", "trap": "6", "hazard": "3", "exp": "10"},
                        "4": {"monster": "5", "gold": "4", "trap": "7", "hazard": "3", "exp": "12"},
                        "5": {"monster": "6", "gold": "4", "trap": "8", "hazard": "4", "exp": "14"},
                        "6": {"monster": "7", "gold": "5", "trap": "9", "hazard": "4", "exp": "16"},
                        "7": {"monster": "7", "gold": "6", "trap": "9", "hazard": "4", "exp": "18"}
                       },
    g_setting        = ["Scenario Level", "Monster Level", "Gold Conversion", "Trap Damage", "Hazardous Terrain Damage", "Bonus Experience"];

// Register the action on the change of number of characters
document.getElementById('numberOfCharacters').addEventListener('change', function() {
  let numberOfCharacters = Number(document.getElementById('numberOfCharacters').value);

  // Show / hide player levels
  for (let i = 1; i < 5; i++) {
    if (i <= numberOfCharacters) {
      document.getElementById('character' + i).parentNode.hidden = false;
    } else {
      document.getElementById('character' + i).parentNode.hidden = true;
    }
  }

  // Change of the settings - hide the results of previous setting
  document.getElementById('gloomhaven-game').hidden = true;

});


// Register the action on the scenarioSetting button
document.getElementById('scenarioSetting').addEventListener('click', function() {
  let difficulty         = Number(document.getElementById('difficulty').value),
      numberOfCharacters = Number(document.getElementById('numberOfCharacters').value),
      g_scenario         = (document.getElementById('solo').checked ? g_solo_level : g_scenario_level),
      playerLvl          = 0,
      scenarioLvl        = 0,
      playersSlider      = document.getElementById('gloomhaven-game-slider');

  // Get the sum of player levels
  for (let i = 1; i <= numberOfCharacters; i++) {
    playerLvl = playerLvl + Number(document.getElementById('character' + i).value);
  }

  // Get the scenario level
  scenarioLvl = Math.ceil((playerLvl / numberOfCharacters) / 2) + difficulty;

  // Clear previous results
  while (playersSlider.hasChildNodes()) {
    playersSlider.removeChild(playersSlider.firstChild);
  }

  // Display the setting for the game
  // New elements
  let slide = document.createElement('div'),
      title = document.createElement('div'),
      table = document.createElement('table');

  // Setting the elements
  slide.className = 'cardSlide';
  title.className = 'cardSlideTitle';
  title.innerText = 'Scenario Settings';

  // Creating table content
  for (let i = 0; i < 6; i++) {

    // New elements
    let tr = table.insertRow(),
        th = document.createElement('th');

    // Setting of the elements
    th.appendChild(document.createTextNode(g_setting[i]));
    tr.appendChild(th);

    // Value for the character attribute
    let td = tr.insertCell();
    switch (i) {
      case 0:
        td.appendChild(document.createTextNode(scenarioLvl));
        break;
      case 1:
        td.appendChild(document.createTextNode(g_scenario[scenarioLvl]["monster"]));
        break;
      case 2:
        td.appendChild(document.createTextNode(g_scenario[scenarioLvl]["gold"]));
        break;
      case 3:
        td.appendChild(document.createTextNode(g_scenario[scenarioLvl]["trap"]));
        break;
      case 4:
        td.appendChild(document.createTextNode(g_scenario[scenarioLvl]["hazard"]));
        break;
      case 5:
        td.appendChild(document.createTextNode(g_scenario[scenarioLvl]["exp"]));
        break;
    }

  }

  // Append the elements
  slide.appendChild(title);
  slide.appendChild(table);
  playersSlider.appendChild(slide);

  // Show settings
  document.getElementById('gloomhaven-game').hidden = false;

  // Run game setting (with the game setting card ID)
  app.gameSetting('gloomhaven-options', 'set');

});

// On load init
document.getElementById('gloomhaven-game').hidden = true;

// Run game setting (with the game setting card ID)
app.gameSetting('gloomhaven-options', 'get');

// Run the init of rules and set
app.gameInit('gloomhaven');
