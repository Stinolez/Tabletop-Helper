(function() {
 'use strict';

 var app = {
   isLoading: true,
   spinner: document.querySelector('.loader'),
   confirmDialog: document.querySelector('.dialog-container')
 };

 /*****************************************************************************
  * Event listeners for UI elements
  ****************************************************************************/

 // Links to games on index
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

 // Dialog confirm action
 document.getElementById('dialogShow').addEventListener('click', function() {
   app.toggleConfirmDialog(true);
 });

 /*****************************************************************************
  * Methods to update/refresh the UI
  ****************************************************************************/

 // Toggles the visibility of the dialog.
 app.toggleConfirmDialog = function(visible) {
   if (visible) {

     // Get the text and title for the confirm and the body element
     var dialogTitle = document.getElementById('dialogTitle').innerText,
         dialogText = document.getElementById('dialogText').innerText,
         bodyElement = document.getElementsByTagName('body')[0];

     // Create dialog
     bodyElement.insertAdjacentHTML('beforeend', '<div id="dialog-container" class="dialog-container">' +
                                                   '<div class="dialog">' +
                                                     '<div class="dialog-title">' + dialogTitle + '</div>' +
                                                     '<div class="dialog-body">' + dialogText + '</div>' +
                                                     '<div class="dialog-buttons">' +
                                                       '<button id="dialogConfirm" class="button">OK</button>' +
                                                     '</div>' +
                                                   '</div>' +
                                                 '</div>');

     // Dialog confirm action
     document.getElementById('dialogConfirm').addEventListener('click', function() {
       app.toggleConfirmDialog(false);
     });

   } else {

     // Get the element
     var dialogContainer = document.getElementById('dialog-container');

     // Remove the dialog
     dialogContainer.parentNode.removeChild(dialogContainer);

   }
 };

 /*****************************************************************************
  * Methods for dealing with the model
  ****************************************************************************/

 // Startup code

 // Fully loaded
 if (app.isLoading) {
   app.spinner.setAttribute('hidden', true);
   app.isLoading = false;
 }

 // Service worker
 if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('../../service-worker.js');
 }

})();
