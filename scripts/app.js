'use strict';

let app = (function () {

  // Private variables
  let appName    = 'Tabletop Helper'
    , appVersion = '25.08.16.172449'
    , appOwner   = 'Tomáš \'Stínolez\' Vitásek';

  // DOM variables
  let loader     = document.querySelector('.loader');

  // Create element
  function createElement(elementType, data) {

    /*********************************************
     | Element | Data                            |
     ---------------------------------------------
     | div     | [className, HTML content]       |
     | span    |                                 |
     | tr      |                                 |
     | td      |                                 |
     | li      |                                 |
     ---------------------------------------------
     | ul      | [className, [                   |
     | ol      |               [className, 1],   |
     |         |               [className, 2],   |
     |         |               ...               |
     |         |             ]]                  |
     |         |                                 |
     ---------------------------------------------
     | table   | [className, [                   |
     |         |               [1, 1, ...],      |
     |         |               [2, 2, ...],      |
     |         |               ...               |
     |         |             ]]                  |
     ---------------------------------------------
     | img     | [className, {                   |
     |         |               "atr1" : "value"  |
     |         |               "atr2" : "value"  |
     |         |               ...               |
     |         |             }]                  |
     *********************************************/

    // Create element by the type
    let element = document.createElement(elementType);

    // Use different settings for different element types
    switch(elementType) {

      // Element: div, span, ul, li
      case 'div':
      case 'span':
      case 'tr':
      case 'td':
      case 'li':

        element.className = data[0];
        element.innerHTML = data[1];
        break;

      // List elements
      case 'ul':
      case 'ol':

        let listData = data[1];
        element.className = data[0];
        for (let i = 0; i < listData.length; i++) {
          let sub;
          if (listData[i][0] === 'cardTable') {
            sub = createElement('table', listData[i]);
          } else {
            sub = createElement('li', listData[i]);
          }
          element.appendChild(sub);
        }
        break;

      // Element: table
      case 'table':

        let tableData = data[1];
        element.className = data[0];
        for (let i = 0; i < tableData.length; i++) {
          let row = createElement('tr', ["", ""]);
          for (let j = 0; j < tableData[i].length; j++) {
            let col = createElement('td', ["", tableData[i][j]]);
            row.appendChild(col);
          }
          element.appendChild(row);
        }
        break;

      // Element: img
      case 'img':

        let imgAttributes = JSON.parse(data[1]);
        element.className = data[0];
        for (let attr in imgAttributes) {
          if (attr.indexOf('data-') === -1) {
            element[attr] = imgAttributes[attr];
          } else {
            element.dataset[attr.replace('data-', '')] = imgAttributes[attr];
          }
        }
        break;

    }

    return element;

  }

  // Show loader
  function showLoader() {
    loader.hidden = false;
  }

  // Hide loader
  function hideLoader() {
    loader.hidden = true;
  }

  // Load JSON file
  function loadJSON(callback, filepath) {

    let xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open('GET', filepath, true);

    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };

    xobj.send(null);
  }

  // Print release notes on the page
  function releaseNotes(json) {

    let data = JSON.parse(json),
        rn   = document.getElementById('release-notes');

    // Loop through versions
    for (let versions in data) {

      // New elements
      let card      = createElement('div', ["card", ""]),
          cardTitle = createElement('div', ["cardTitle", "Version " + versions + " (" + data[versions]['date'] + ")"]),
          rnList    = createElement('ul' , ["rn", data[versions]['rn']]);

      // Append the elements
      card.appendChild(cardTitle);
      card.appendChild(rnList);
      rn.appendChild(card);

    }

  }

  // Registering games on the main page
  function registerGames(json) {

    let data     = JSON.parse(json)
      , games    = document.getElementById('games')
      , settings = JSON.parse(localStorage.getItem('game-visibility') || '{}');

    for (let game in data) {

      // Check if the game is hidden or not
      if (!(settings[game] === false)) {

        // Defining game data
        let gameData = {  "src"           : "images/games-logo/" + game + ".png"
                        , "alt"           : data[game].name
                        , "data-game"     : game
                        , "data-gamename" : data[game].search
        };

        // New elements
        let card  = createElement('div', ["card", ""]),
            img   = createElement('img', ["cardLogo", JSON.stringify(gameData)]);

        // Append the elements
        card.appendChild(img);
        games.appendChild(card);

      }

    }

    if (document.getElementsByClassName('cardLogo').length > 0) {
      for (let i = 0; i < document.getElementsByClassName('cardLogo').length; i++) {
        document.getElementsByClassName('cardLogo')[i].addEventListener('click', function(e) {
          location.href = 'games/g_' + e.target.dataset.game + '.html';
          });
      }
    }

  }

  // Registering games on the settings page
  function gamesListSettings(json) {

    let data       = JSON.parse(json)
      , games      = document.getElementById('gamesList')
      , gamesTable = []
      , settings   = JSON.parse(localStorage.getItem('game-visibility') || '{}');

    for (let game in data) {

      // Defining game data
      let name  = data[game].name
        , state = (settings[game] === false ? 0 : 1)
        , cbox  = '';

      // Creating the checkbox
      cbox = '<input type="checkbox" class="gameState" id="' + game + '" ' + (state === 1 ? "checked" : "") + '>';

      // New table line
      gamesTable.push([cbox, name]);

    }

    let gT = createElement('table', ["cardTable", gamesTable]);
    games.appendChild(gT);

    if (document.getElementsByClassName('gameState').length > 0) {
      for (let i = 0; i < document.getElementsByClassName('gameState').length; i++) {
        document.getElementsByClassName('gameState')[i].addEventListener('click', function (e) {
            app.updateGamesVisibility();
          });
      }
    }

    let cb = document.getElementById('gamesList').querySelectorAll('table.cardTable td:nth-child(1)');
    for (let i = 0; i < cb.length; ++i) {
       cb[i].classList.add('text-center');
    }

  }

  // Add game tips on the page
  function gameTips(json) {

    let data  = JSON.parse(json),
        tips  = document.getElementById('gameTips'),
      cardT;

    // Game Tips
    for (let tip in data['tips']) {

      let options = data['tips'][tip];

      // Process card class
      if (options[0] === 'card') {

        // If we already have card, then add it to tips
        if (cardT) {
          tips.appendChild(cardT);
        }

        // Create new element for the card
        cardT = createElement('div', options);

        // Process ordered list
      } else if (options[0] === 'cardOl') {
        cardT.appendChild(createElement('ol', options));

        // Process un-ordered list
      } else if (options[0] === 'cardUl') {
        cardT.appendChild(createElement('ul', options));

        // Process tables
      } else if (options[0] === 'cardTable') {
        cardT.appendChild(createElement('table', options));

        // Process texts
      } else {
        cardT.appendChild(createElement('div', options));
      }

    }

    // Add cards to tips
    tips.appendChild(cardT);

  }

  // Return an object exposed to the public
  return {

    // Get application name
    getAppName: function() {
      return appName;
    },

    // Get application version
    getAppVersion: function() {
      return appVersion;
    },

    // Get application owner
    getAppOwner: function() {
      return appOwner;
    },

    // Toggles the visibility of the dialog.
    createConfirm: function(title, text, button, action) {
      let bodyElement = document.body;
        bodyElement.insertAdjacentHTML('beforeend', '<div id="dialog-container" class="dialog-container">' +
          '<div class="dialog">' +
                                                        '<div class="dialog-title">' + title + '</div>' +
                                                        '<div class="dialog-body">' + text + '</div>' +
          '<div class="dialog-buttons">' +
                                                          '<button id="dialogConfirm" class="button">' + (button ? button : 'OK' ) + '</button>' +
                                                        '</div>' +
                                                      '</div>' +
                                                    '</div>');
      if (action) {
          document.getElementById('dialogConfirm').addEventListener('click', action);
      } else {
          document.getElementById('dialogConfirm').addEventListener('click', function() {
            let dialogContainer = document.getElementById('dialog-container');
            dialogContainer.parentNode.removeChild(dialogContainer);
          });
      }
    },

    // Publicly facing createElement function
    createElement: function(elementType, data) {
      return createElement(elementType, data);
    },

    // Function to show or hide the loading spinner
    setLoading: function(bool) {
      if (bool) {
        showLoader();
      } else {
        hideLoader();
      }
    },

    // Function to load and save localStorage for game settings
    gameSetting: function(id, type) {

      // Getting the settings from localStorage
      let settings = JSON.parse(localStorage.getItem(id));

      // Load data and input in the form (if there are any data to input)
      if (type === 'get' && settings) {

        // Set the data for selects
        for (let key in settings['selects']) {
          document.getElementById(key).value = settings['selects'][key];
        }

        // Set the data for checkboxes
        for (let key in settings['checkboxes']) {
          document.getElementById(key).checked = settings['checkboxes'][key];
        }

        // Set the data for inputs
        for (let key in settings['inputs']) {
          document.getElementById(key).value = settings['inputs'][key];
        }

      }

      // Set the data into localStorage to use for getData
      if (type === 'set') {

        // Get the options box and all select and input elements
        let optionBox   = document.getElementById(id),
            selects     = optionBox.getElementsByTagName('select'),
            inputs      = optionBox.getElementsByTagName('input'),
            newSettings = {'selects'    : {},
                           'checkboxes' : {},
                           'inputs'     : {}};

        // Get data for all selects
        for (let i = 0; i < selects.length; i++) {
          newSettings['selects'][selects[i].id] = selects[i].value;
        }

        // Get data for all checkboxes
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].type === 'checkbox') {
            newSettings['checkboxes'][inputs[i].id] = inputs[i].checked;
          } else if (inputs[i].type === 'text') {
            newSettings['inputs'][inputs[i].id] = inputs[i].value;
          }
        }

        // Set the newSettings to localStorage
        localStorage.setItem(id, JSON.stringify(newSettings));

      }

    },

    // Function to load rules of game to model
    gameInit: function(gameName) {
      loadJSON(gameTips, '../data/g_' + gameName + '.json');
    },

    // Menu toggle Function
    menuToggle: function(button) {

      let menuBox     = document.getElementById('menuBox'),
          gameTips    = document.getElementById('gameTips'),
          gameOption  = document.getElementById('gameOption');

      // Hide menu
      menuBox.checked = false

      // Show / hide section based on the selection
      switch(button) {

        case 'gameTips':
          gameTips.className    = 'main';
          gameOption.className  = 'main hidden';
          break;

        case 'gameOption':
          gameTips.className    = 'main hidden';
          gameOption.className  = 'main';
          break;
      }

    },

    // Function to reshufle array in random order
    arrayShuffle: function(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    // Function to return random integer between min (inclusive) and max (inclusive)
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Init function
    init: function() {

      // Show loader
      showLoader();

      // Setup the copyright
      document.getElementById('copyright').innerHTML = app.getAppName() + ', v.' + app.getAppVersion() + ', &copy; ' + app.getAppOwner() + ', ' + new Date().getFullYear();

      // Register the search icon
      if (document.getElementById('headerSearch')) {

        document.getElementById('headerSearch').addEventListener('click', function(e) {

          let title  = document.getElementsByClassName('headerTitle')[0]
            , search = document.getElementsByClassName('headerSearchBox')[0]
            , input  = document.getElementById('gameSearch');

          if (title.className.indexOf('display-none') != -1) {
            title.classList.remove('display-none');
            search.classList.add('display-none');
            input.value = '';
            input.dispatchEvent(new KeyboardEvent('keyup', { keyCode: 70, ctrlKey: true }));
            } else {
            title.classList.add('display-none');
            search.classList.remove('display-none');
              input.focus();
            }

          });

      }

      // Register search function
      if (document.getElementById('gameSearch')) {

        document.getElementById('gameSearch').addEventListener('keyup', function(e) {

          let search = document.getElementById('gameSearch').value;

          if (search !== '') {

            for (let i = 0; i < document.getElementsByClassName('cardLogo').length; i++) {
              let gameName = document.getElementsByClassName('cardLogo')[i].dataset.gamename;
              if (gameName.toUpperCase().indexOf(search.toUpperCase()) === -1) {
                document.getElementsByClassName('cardLogo')[i].parentNode.classList.add('display-none');
                } else {
                document.getElementsByClassName('cardLogo')[i].parentNode.classList.remove('display-none');
              }
            }

            } else {

              // Show all games
            for (let i = 0; i < document.getElementsByClassName('cardLogo').length; i++) {
              document.getElementsByClassName('cardLogo')[i].parentNode.classList.remove('display-none');
              }

            }

          });
      }

      // Register games
      if (document.getElementById('games')) {
        loadJSON(registerGames, '../data/g_app.json');
      }

      // User settings - games list
      if (document.getElementById('gamesList')) {
        loadJSON(gamesListSettings, '../data/g_app.json');
      }

      // Put release notes on the page (only for info page)
      if (document.getElementById('release-notes')) {
        loadJSON(releaseNotes, '../release-notes.json');
      }

      // Back button action
      if (document.getElementById('headerBack')) {
        document.getElementById('headerBack').addEventListener('click', function(e) {
            location.href = e.target.dataset.url;
          });
      }

      // Register service worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../service-worker.js').then(function(registration) {

            // Automatically check SW update every hour (if online)
          setInterval(function(){

              // Get the SW and if exists update / if doesn't exist - already waiting for refresh
              navigator.serviceWorker.getRegistration().then(function(reg) {
                if (navigator.onLine && reg) {
                  reg.update();
                }
              });

          }, (60 * 60 * 1000));

            // New service worker has appeared in registration.installing!
          registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;

              // Wait for the new service worker to be installed
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {

                  // Get all registrated service workers
                navigator.serviceWorker.getRegistration().then(function(reg) {

                      // If there is some service worker waiting - unregister, show message and reload
                      if (reg.waiting) {
                    reg.unregister().then(function() {
                      app.createConfirm('', 'New version of the application is available. Please click below to update it.', 'Update', function() {window.location.reload(true);});
                        });
                      }

                    });

                }
              });

          });

        });

      }

      // Hide loader
      hideLoader();

    },

    // Update game visibility preference setting
    updateGamesVisibility: function() {

      // Getting the list of the games
      let list     = document.getElementsByClassName('gameState')
        , settings = {};

      // Loop through the list of games to get each game status
      for (let i = 0; i < list.length; i++) {
        settings[list[i].id] = list[i].checked;
      }

      // Saving the state to the localStorage
      localStorage.setItem('game-visibility', JSON.stringify(settings));

    }

  };
})();

// Run the init function
app.init();
