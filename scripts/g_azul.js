// Azul specific javascript file
'use strict';

// Azul global variables
var g_default_position = [  [1, 2, 3, 4, 5]
                          , [2, 3, 4, 5, 1]
                          , [3, 4, 5, 1, 2]
                          , [4, 5, 1, 2, 3]
                          , [5, 1, 2, 3, 4]
                         ];

// Register the action on the generate button
document.getElementById('azul-generate').addEventListener('click', function() {

  // Local variables
  let new_position  = g_default_position
    , nr_switches   = 10
    , playersSlider = document.getElementById('azul-game-slider');

  // Clear previous results
  while (playersSlider.hasChildNodes()) {
    playersSlider.removeChild(playersSlider.firstChild);
  }

  // Mixing position
  for (let i = 0; i < nr_switches; i++) {

    let switch_type = app.getRandomInt(0, 2)
      , n1          = app.getRandomInt(0, 4)
      , n2          = app.getRandomInt(0, 4);

    // Ensure n1 != n2
    while (n1 === n2) {
      n2 = app.getRandomInt(0, 4);
    }

    switch (switch_type) {

      case 0: // cols switch
        for (let j = 0; j < new_position.length; j++) {
          let c1 = new_position[j][n1]
            , c2 = new_position[j][n2];
          new_position[j][n1] = c2;
          new_position[j][n2] = c1;
        }
        break;

      case 1: // rows switch
        let r1 = new_position[n1]
          , r2 = new_position[n2];
        new_position[n1] = r2;
        new_position[n2] = r1;
        break;

      case 2: // nums switch
        n1 = n1 + 1;
        n2 = n2 + 1;
        for (let x = 0; x < new_position.length; x++) {
          for (let y = 0; y < new_position[x].length; y++) {
            let val = new_position[x][y];
            if (val === n1) {
              val = n2;
            } else if (val === n2) {
              val = n1;
            }
            new_position[x][y] = val;
          }
        }
        break;

    }

  }

  // Display the setting for the game
  // New elements
  let slide    = document.createElement('div')
    , title    = document.createElement('div')
    , grid     = document.createElement('div')
    , dw       = document.getElementById('azul-options').offsetWidth - 32 // div.card element has 16px padding all around
    , gap      = 8
    , max_size = 70
    , size     = 0;

  // Count the size for the image
  size = Math.floor((dw - (4 * gap)) / 5);
  size = (size > max_size ? max_size : size);

  // Setting the elements
  slide.className = 'cardSlide';
  title.className = 'cardSlideTitle';
  title.innerText = 'Generated Board';

  // Styling grid
  grid.style.width               = 'auto';
  grid.style.display             = 'grid';
  grid.style.gap                 = gap + 'px';
  grid.style.gridTemplateColumns = 'repeat(5, ' + size + 'px)';
  grid.style.gridTemplateRows    = 'repeat(5, ' + size + 'px)';
  grid.style.gridAutoFlow        = 'row';
  grid.style.alignContent        = 'center';
  grid.style.justifyContent      = 'center';
  grid.style.alignItems          = 'center';

  // Creating table content
  for (let i = 0; i < new_position.length; i++) {
    for (let j = 0; j < new_position[i].length; j++) {

      let image = document.createElement('img');

      // Element settings and append
      image.src          = '../images/games/azul/' + new_position[i][j] + '.png';
      image.alt          = new_position[i][j];
      image.style.width  = size + 'px';
      image.style.height = size + 'px';
      grid.appendChild(image);
    }

  }

  // Append the elements
  slide.appendChild(title);
  slide.appendChild(grid);
  playersSlider.appendChild(slide);

  // Show settings
  document.getElementById('azul-game').hidden = false;

  // Run game setting (with the game setting card ID)
  app.gameSetting('azul-options', 'set');

});

// On load init
document.getElementById('azul-game').hidden = true;

// Run game setting (with the game setting card ID)
app.gameSetting('azul-options', 'get');

// Run the init of rules and set
app.gameInit('azul');