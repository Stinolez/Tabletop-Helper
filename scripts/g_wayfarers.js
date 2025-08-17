// Wayfarers specific javascript file
'use strict';

// Global functions
function getPrimaryTagScore(count) {
  let vp = 0;

  switch(count) {
    case 0:
      vp = 0;
      break;
    case 1:
      vp = 0;
      break;
    case 2:
      vp = 2;
      break;
    case 3:
      vp = 3;
      break;
    case 4:
      vp = 5;
      break;
    case 5:
      vp = 8;
      break;
    case 6:
      vp = 12;
      break;
    default:
      vp = 16;
      break;
  }

  return vp;
}

function setPlayerName(nr, name) {
  document.querySelectorAll('.pn-' + nr).forEach((e) => e.innerText = (name || ('#' + nr)));

  // Run game setting (with the game setting card ID)
  app.gameSetting('wayfarers-options', 'set');

}

// Wayfarers global variables

// Register the action on the change of number of players
document.getElementById('numberOfPlayers').addEventListener('change', function () {
  let numberOfPlayers = Number(document.getElementById('numberOfPlayers').value)
    , hiddenClass = 'display-none';

  // Show / hide player levels
  for (let i = 1; i < 5; i++) {
    if (i <= numberOfPlayers) {
      document.querySelectorAll('.p' + i).forEach((e) => e.classList.remove(hiddenClass));
    } else {
      document.querySelectorAll('.p' + i).forEach((e) => e.classList.add(hiddenClass));
    }
  }

  // Run game setting (with the game setting card ID)
  app.gameSetting('wayfarers-options', 'set');

});

document.getElementById('p1_name').addEventListener('change', function () {
  let nm = document.getElementById('p1_name').value;
  setPlayerName(1, nm);
});

document.getElementById('p2_name').addEventListener('change', function () {
  let nm = document.getElementById('p2_name').value;
  setPlayerName(2, nm);
});

document.getElementById('p3_name').addEventListener('change', function () {
  let nm = document.getElementById('p3_name').value;
  setPlayerName(3, nm);
});

document.getElementById('p4_name').addEventListener('change', function () {
  let nm = document.getElementById('p4_name').value;
  setPlayerName(4, nm);
});

// Register the action on the final-scoring button
document.getElementById('final-scoring').addEventListener('click', function () {

  // Get variables
  let numberOfPlayers = Number(document.getElementById('numberOfPlayers').value)
    , vps = {  "1" : 0
             , "2" : 0
             , "3" : 0
             , "4" : 0};

  // VPS counting
  for (let i = 1; i <= numberOfPlayers; i++) {

    // Get score data
    let pt1 = Number(document.getElementById('p' + i + '_pt_1').value) || 0
      , pt2 = Number(document.getElementById('p' + i + '_pt_2').value) || 0
      , pt3 = Number(document.getElementById('p' + i + '_pt_3').value) || 0
      , pt4 = Number(document.getElementById('p' + i + '_pt_4').value) || 0
      , set = Math.min(pt1, pt2, pt3, pt4)
      , space = Number(document.getElementById('p' + i + '_space').value) || 0
      , caravan = Number(document.getElementById('p' + i + '_caravan').value) || 0
      , g_black = (document.getElementById('p' + i + '_g_black').checked ? 3 : 0)
      , g_yellow = (document.getElementById('p' + i + '_g_yellow').checked ? 3 : 0)
      , g_blue = (document.getElementById('p' + i + '_g_blue').checked ? 3 : 0);

    vps[i] = vps[i] + getPrimaryTagScore(pt1) + getPrimaryTagScore(pt2) + getPrimaryTagScore(pt3) + getPrimaryTagScore(pt4) + (set * 5) + space + caravan + g_black + g_yellow + g_blue;

  }

  // VP setting
  for (let key in vps) {
    document.getElementById('p' + key + '_vp').innerText = vps[key];
  }
  document.getElementById('wayfarers-score').hidden = false;

  // Run game setting (with the game setting card ID)
  app.gameSetting('wayfarers-options', 'set');

});

// Run game setting (with the game setting card ID)
app.gameSetting('wayfarers-options', 'get');

// On load init
document.getElementById('wayfarers-score').hidden = true;
document.getElementById('numberOfPlayers').dispatchEvent(new CustomEvent('change', {}));
document.getElementById('p1_name').dispatchEvent(new CustomEvent('change', {}));
document.getElementById('p2_name').dispatchEvent(new CustomEvent('change', {}));
document.getElementById('p3_name').dispatchEvent(new CustomEvent('change', {}));
document.getElementById('p4_name').dispatchEvent(new CustomEvent('change', {}));

// Run the init of rules and set
app.gameInit('wayfarers');