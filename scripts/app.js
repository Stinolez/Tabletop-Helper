'use strict';

var app = (function () {

  // Private variables
  var appName    = 'Tabletop Helper',
      appVersion = '2.0.200214',
      appOwner   = 'Tomáš \'Stínolez\' Vitásek';

  // DOM variables
  var loader     = document.querySelector('.loader');

  // Show loader
  function showLoader() {
    loader.hidden = false;
  }

  // Hide loader
  function hideLoader() {
    loader.hidden = true;
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
        var bodyElement = document.body;
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
            var dialogContainer = document.getElementById('dialog-container');
            dialogContainer.parentNode.removeChild(dialogContainer);
          });
        }
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
      var settings = JSON.parse(localStorage.getItem(id));

      // Load data and input in the form (if there are any data to input)
      if (type === 'get' && settings) {
       
        console.log(settings);

        // Set the data for selects
        for (var key in settings['selects']) {
          document.getElementById(key).value = settings['selects'][key];
        }

        // Set the data for checkboxes
        for (var key in settings['checkboxes']) {
          document.getElementById(key).checked = settings['checkboxes'][key];
        }

      }

      // Set the data into localStorage to use for getData
      if (type === 'set') {

        // Get the options box and all select and input elements
        var optionBox   = document.getElementById(id),
            selects     = optionBox.getElementsByTagName('select'),
            inputs      = optionBox.getElementsByTagName('input'),
            newSettings = {'selects'    : {},
                           'checkboxes' : {}};

        // Get data for all selects
        for (var i = 0; i < selects.length; i++) {
          newSettings['selects'][selects[i].id] = selects[i].value;
        }

        // Get data for all checkboxes
        for (var i = 0; i < inputs.length; i++) {
          if (inputs[i].type === 'checkbox') {
            newSettings['checkboxes'][inputs[i].id] = inputs[i].checked;
          }
        }

        // Set the newSettings to localStorage
        localStorage.setItem(id, JSON.stringify(newSettings));

      }

    },

    // Function to reshufle array in random order
    arrayShuffle: function(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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

          var title  = document.getElementsByClassName('headerTitle')[0].style.display || 'block'
            , search = document.getElementsByClassName('headerSearchBox')[0].style.display || 'none';

          document.getElementsByClassName('headerTitle')[0].style.display = (title  === 'block' ? 'none' : 'block');
          document.getElementsByClassName('headerSearchBox')[0].style.display = (search === 'block' ? 'none' : 'block');

          if (document.getElementsByClassName('headerSearchBox')[0].style.display === 'block') {
            document.getElementById('gameSearch').focus();
          } else {
            document.getElementById('gameSearch').value = '';
            document.getElementById('gameSearch').dispatchEvent(new KeyboardEvent('keyup', { keyCode: 70, ctrlKey: true }));
          }

        });        
      }

      // Register search function
      if (document.getElementById('gameSearch')) {

        document.getElementById('gameSearch').addEventListener('keyup', function(e) {

          var search = document.getElementById('gameSearch').value;

          if (search !== '') {

            for (var i = 0; i < document.getElementsByClassName('cardLogo').length; i++) {
              var gameName = document.getElementsByClassName('cardLogo')[i].dataset.gamename;
              if (gameName.toUpperCase().indexOf(search.toUpperCase()) === -1) {
                document.getElementsByClassName('cardLogo')[i].parentNode.style.display = 'none';
              } else {
                document.getElementsByClassName('cardLogo')[i].parentNode.style.display = 'block';
              }
            }

          } else {

            // Show all games
            for (var i = 0; i < document.getElementsByClassName('cardLogo').length; i++) {
              document.getElementsByClassName('cardLogo')[i].parentNode.style.display = 'block';
            }

          }

        });        
      }

      // Register games
      if (document.getElementsByClassName('cardLogo').length > 0) {
        for (var i = 0; i < document.getElementsByClassName('cardLogo').length; i++) {
          document.getElementsByClassName('cardLogo')[i].addEventListener('click', function(e) {
            location.href = 'games/g_' + e.srcElement.dataset.game + '.html';
          });
        }
      }

      // Back button action
      if (document.getElementById('headerBack')) {
        document.getElementById('headerBack').addEventListener('click', function(e) {
          location.href = e.srcElement.dataset.url;
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

    }

  };
})();

// Run the init function
app.init();
