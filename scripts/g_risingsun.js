// Rising sun specific javascript file
'use strict';

// Rising sun global variables
var g_clans     = ['a', 'b'], // [TODO] - RS - list of clans
    g_exp_clans = ['c', 'd']; // [TODO] - RS - list of expansion clans

// Register the action on the shuffleClans button
document.getElementById('shuffleClans').addEventListener('click', function() {
  var numberOfPlayers = document.getElementById('numberOfPlayers').value,
      expansion       = document.getElementById('dynastyExpansion').checked,
      clansArray      = g_clans;

  // Add Expansion if checked
  if (expansion) {
    clansArray = clansArray.concat(g_exp_clans);
  }

  // Shuffle the clans
  clansArray = app.arrayShuffle(clansArray);

  // Display the clans for players
  console.log('next :: ' + clansArray.join(',')); // [TODO] - RS - Displaying the list of clans for set amount of users

});


// On load init
document.getElementById('rs-clans').hidden = true;
