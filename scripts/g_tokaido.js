// Tokaido specific javascript file
'use strict';

// Tokaido global variables
var g_base        = ['hiroshige', 'chuubei', 'kinko', 'yoshiyasu', 'satsuki', 'mitsukuni', 'sasayakko', 'hirotada', 'umegae', 'zen-emon'],
    g_crossroads  = ['jirocho', 'daigoro', 'nampo', 'gotozaemon', 'miyataka', 'kita'],
    g_matsuri     = ['kushinada', 'mutsumi', 'takeru', 'titia', 'rakuken', 'kamui', 'mari', 'yashima',
                     'kidzuna', 'chihaya', 'mahirito', 'iyasaka', 'suseri', 'musubi', 'ayumu', 'misaki'],
    g_eriku       = ['eriku'],
    g_felicia     = ['felicia'],
    g_names       = {'hiroshige'  : ['Hiroshige the artist'             , 'Base game'],
                     'chuubei'    : ['Chuubei the messenger'            , 'Base game'],
                     'kinko'      : ['Kinko the ronin'                  , 'Base game'],
                     'yoshiyasu'  : ['Yoshiyasu the functionary'        , 'Base game'],
                     'satsuki'    : ['Satsuki the orphan'               , 'Base game'],
                     'mitsukuni'  : ['Mitsukuni the old man'            , 'Base game'],
                     'sasayakko'  : ['Sasayakko the geisha'             , 'Base game'],
                     'hirotada'   : ['Hirotada the priest'              , 'Base game'],
                     'umegae'     : ['Umegae the street entertainer'    , 'Base game'],
                     'zen-emon'   : ['Zen-emon the merchant'            , 'Base game'],
                     'jirocho'    : ['Jirocho the yakuza'               , 'Crossroads expansion'],
                     'daigoro'    : ['Daigoro the kid'                  , 'Crossroads expansion'],
                     'nampo'      : ['Nampo the gourmet'                , 'Crossroads expansion'],
                     'gotozaemon' : ['Gotozaemon the souvenir seller'   , 'Crossroads expansion'],
                     'miyataka'   : ['Miyataka the superstitious woman' , 'Crossroads expansion'],
                     'kita'       : ['Kita the old woman'               , 'Crossroads expansion'],
                     'kushinada'  : ['Kushinada the World traveler'     , 'Matsuri expansion'],
                     'mutsumi'    : ['Mutsumi the Brute'                , 'Matsuri expansion'],
                     'takeru'     : ['Takeru the Counselor'             , 'Matsuri expansion'],
                     'titia'      : ['Titia the Dutch tourist'          , 'Matsuri expansion'],
                     'rakuken'    : ['Rakuken the Collector'            , 'Matsuri expansion'],
                     'kamui'      : ['Kamui the Vagabond'               , 'Matsuri expansion'],
                     'mari'       : ['Mari the Poetess'                 , 'Matsuri expansion'],
                     'yashima'    : ['Yashima the Noble'                , 'Matsuri expansion'],
                     'kidzuna'    : ['Kidzuna the Cook'                 , 'Matsuri expansion'],
                     'chihaya'    : ['Chihaya the Bather'               , 'Matsuri expansion'],
                     'mahirito'   : ['Mahirito the Writer'              , 'Matsuri expansion'],
                     'iyasaka'    : ['Iyasaka the Manual worker'        , 'Matsuri expansion'],
                     'suseri'     : ['Suseri the Erudite'               , 'Matsuri expansion'],
                     'musubi'     : ['Musubi the Rogue'                 , 'Matsuri expansion'],
                     'ayumu'      : ['Ayumu the Walker'                 , 'Matsuri expansion'],
                     'misaki'     : ['Misaki the Disciple'              , 'Matsuri expansion'],
                     'eriku'      : ['Eriku'                            , 'Promo'],
                     'felicia'    : ['Felicia'                          , 'Promo']};

// Register the action on the shuffleCharacters button
document.getElementById('shuffleCharacters').addEventListener('click', function() {
  var numberOfPlayers = Number(document.getElementById('numberOfPlayers').value),
      crossroads      = document.getElementById('crossroads').checked,
      matsuri         = document.getElementById('matsuri').checked,
      eriku           = document.getElementById('eriku').checked,
      felicia         = document.getElementById('felicia').checked,
      charactersArray = g_base,
      playersCard     = document.getElementById('tokaido-characters'),
      playersSlider   = document.getElementById('tokaido-characters-slider');

  // Add expansion if checked
  if (crossroads) {
    charactersArray = charactersArray.concat(g_crossroads);
  }

  // Add expansion if checked
  if (matsuri) {
    charactersArray = charactersArray.concat(g_matsuri);
  }

  // Add expansion if checked
  if (eriku) {
    charactersArray = charactersArray.concat(g_eriku);
  }

  // Add expansion if checked
  if (felicia) {
    charactersArray = charactersArray.concat(g_felicia);
  }

  // Shuffle the factions
  charactersArray = app.arrayShuffle(charactersArray);

  // Clear previous results
  while (playersSlider.hasChildNodes()) {
    playersSlider.removeChild(playersSlider.firstChild);
  }

  // Display the factions for players
  for (var i = 0; i < numberOfPlayers; i++) {

    // New elements
    var slide = document.createElement('div'),
        title = document.createElement('div'),
        char  = document.createElement('div'),
        type  = document.createElement('div');

    // Setting the elements
    slide.className = 'cardSlide';
    title.className = 'cardSlideTitle';
    title.innerText = 'Player ' + (i + 1);
    char.className  = 'characterName';
    char.innerText  = g_names[charactersArray[i]][0];
    type.className  = 'characterType';
    type.innerText  = '(' + g_names[charactersArray[i]][1] + ')';

    // Append the elements
    slide.appendChild(title);
    slide.appendChild(char);
    slide.appendChild(type);
    playersSlider.appendChild(slide);

  }

  // Display the players card & slide to first element
  playersCard.hidden = false;
  playersSlider.firstElementChild.scrollIntoView(true);

  // Run game setting (with the game setting card ID)
  app.gameSetting('tokaido-options', 'set');

});

// On load init
document.getElementById('tokaido-characters').hidden = true;

// Run game setting (with the game setting card ID)
app.gameSetting('tokaido-options', 'get');

// Run the init of rules and set
app.gameInit('tokaido');
