'use strict';

var app = (function () {

  // Private varibables
  var appVersion = '0.1.190413';

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

    // Get application version and build
    getAppVersion: function() {
      return appVersion;
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
      document.querySelector('.loader').hidden = !bool;
    },

    // Init function
    init: function() {

      // Show loader
      showLoader();

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
        document.getElementById('headerBack').addEventListener('click', function() {
          history.back(-1);
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
