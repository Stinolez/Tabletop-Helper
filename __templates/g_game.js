// ??? specific javascript file
'use strict';

// ??? global variables

// Register the action on the !!! button
document.getElementById('!!!').addEventListener('click', function() {

  // Run game setting (with the game setting card ID)
  app.gameSetting('???-options', 'set');

});

// On load init

// Run game setting (with the game setting card ID)
app.gameSetting('???-options', 'get');

// Run the init of rules and set
app.gameInit('???');