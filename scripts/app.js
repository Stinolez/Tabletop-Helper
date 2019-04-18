'use strict';

var app = (function () {

  // Private variables
  var appName    = 'Tabletop Helper',
      appVersion = '0.1.190418',
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
    createConfirm: function(title, text) {
        var bodyElement = document.getElementsByTagName('body')[0];
        bodyElement.insertAdjacentHTML('beforeend', '<div id="dialog-container" class="dialog-container">' +
                                                      '<div class="dialog">' +
                                                        '<div class="dialog-title">' + title + '</div>' +
                                                        '<div class="dialog-body">' + text + '</div>' +
                                                        '<div class="dialog-buttons">' +
                                                          '<button id="dialogConfirm" class="button">OK</button>' +
                                                        '</div>' +
                                                      '</div>' +
                                                    '</div>');

        document.getElementById('dialogConfirm').addEventListener('click', function() {
          var dialogContainer = document.getElementById('dialog-container');
          dialogContainer.parentNode.removeChild(dialogContainer);
        });
    },

    // Function to show or hide the loading spinner
    setLoading: function(bool) {
      if (bool) {
        showLoader();
      } else {
        hideLoader();
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

      // Register games
      if (document.getElementsByClassName('cardLogo').length > 0) {
        for (var i = 0; i < document.getElementsByClassName('cardLogo').length; i++) {
          document.getElementsByClassName('cardLogo')[i].addEventListener('click', function(e) {
            location.href = e.srcElement.dataset.game + '.html';
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
        navigator.serviceWorker.register('../service-worker.js');
      }

      // Hide loader
      hideLoader();

    }

  };
})();

// Run the init function
app.init();
