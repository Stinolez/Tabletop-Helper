// Roll Player specific javascript file
'use strict';

// Roll Player global variables
var g_data = {"Čeština" : {"base"            : {"race"      : ["Drakorození", "Elfové", "Lidé", "Orkové", "Pulčíci", "Trpaslíci"],
                                                "class"     : {"black"  : ["Ničema", "Zloděj"],
                                                               "blue"   : ["Čaroděj", "Kouzelník"],
                                                               "green"  : ["Druid", "Hraničář"],
                                                               "purple" : ["Bard", "Mnich"],
                                                               "red"    : ["Barbar", "Bojovník"],
                                                               "white"  : ["Kněz", "Paladin"]},
                                                "backstory" : ["Divoch", "Dítě ulice", "Lovec pokladů", "Mistr meče", "Odhodlaný", "Odolný",
                                                               "Osvobozený", "Pronásledovaný", "Rváč", "Řemeslník", "Sférochodec", "Šlechtic",
                                                               "Učitel šermu", "Vyvolený", "Vznešený", "Ztracený duše"],
                                                "alignment" : ["Blázen", "Hledač pravdy", "Maniak", "Mizera", "Narcis", "Nervák",
                                                               "Obránce", "Ochránce", "Odpadlík", "Podivín", "Poustevník", "Psychopat",
                                                               "Rebel", "Soudce", "Strážce", "Šampion" , "Volnomyšlenkář"]},
                           "frogkin"         : {"race"      : ["Žaborození"]}
                          },
              "English" : {"base"            : {"race"      : ["Dragonkin", "Dwarf", "Elf", "Halfling", "Human", "Orc"],
                                                "class"     : {"black"  : ["Rogue", "Thief"],
                                                               "blue"   : ["Sorcerer", "Wizard"],
                                                               "green"  : ["Druid", "Ranger"],
                                                               "purple" : ["Bard", "Monk"],
                                                               "red"    : ["Barbarian", "Warrior"],
                                                               "white"  : ["Cleric", "Paladin"]},
                                                "backstory" : ["Aristocrat", "Brawler", "Chosen One", "Craftsman", "Devoted", "Exonerated",
                                                               "Hunter", "Lost Soul", "Mentor", "Patrician", "Persecuted", "Resilient",
                                                               "Riftwalker", "Savage", "Savant", "Street Urchin"],
                                                "alignment" : ["Arbiter", "Champion", "Eccentric", "Free Spirit", "Guardian", "Hermit",
                                                               "Lunatic", "Manic", "Narcissist", "Neurotic", "Protector", "Rebel",
                                                               "Renegade", "Scoundrel", "Sentinel", "Sociopath", "Truth Seeker"]},
                           "frogkin"         : {"race"      : ["Frogkin"]},
                           "minotaur"        : {"race"      : ["Minotaur"]},
                           "monstersMinions" : {"race"      : ["Bastja", "Construct", "Dark Elf", "Gnome", "Wrathborn"],
                                                "class"     : {"black"  : ["Assassin", "Scout"],
                                                               "blue"   : ["Enchanter", "Illusionist"],
                                                               "green"  : ["Elementalist", "Shaman"],
                                                               "purple" : ["Alchemist", "Psionic"],
                                                               "red"    : ["Knight", "Warlord"],
                                                               "white"  : ["Crusader", "Priest"]},
                                                "backstory" : ["Apprentice", "Cast Off", "Damaged", "Doomed", "Gate Keeper", "Gladiator",
                                                               "Lost in Time", "Oracle", "Outcast", "Separated", "Transported", "Wanderer"],
                                                "alignment" : ["Advocate", "Defender", "Diplomat", "Dissenter", "Enigma", "Individualist",
                                                               "Mediator", "Miscreant", "Radical", "Skeptic", "Vigilante", "Villian"]}
                          }
             },
    g_setting = {"Čeština" : ["Rasa", "Povolání", "Příběh", "Přesvědčení"],
                 "English" : ["Race", "Class", "Backstory", "Alignment"]
                };

// Register the action on the shuffleHeroes button
document.getElementById('shuffleHeroes').addEventListener('click', function() {
  var language        = document.getElementById('language').value,
      numberOfPlayers = Number(document.getElementById('numberOfPlayers').value),
      frogkin         = document.getElementById('frogkinPromo').checked,
      minotaur        = document.getElementById('minotaurPromo').checked,
      monstersMinions = document.getElementById('monstersMinionsExpansion').checked,
      playersCard     = document.getElementById('rp-heroes'),
      playersSlider   = document.getElementById('rp-heroes-slider'),
      diceColours     = ["black", "blue", "green", "purple", "red", "white"],
      availRace       = g_data[language].base.race,
      availBackstory  = g_data[language].base.backstory,
      availAlignment  = g_data[language].base.alignment;

  // Five players available only with Monsters & Minions Expansion
  if (!monstersMinions && numberOfPlayers === 5) {
    app.createConfirm('','Five players game is available only with Monsters & Minion Expansion..');
  } else {

    // Clear previous results
    while (playersSlider.hasChildNodes()) {
      playersSlider.removeChild(playersSlider.firstChild);
    }

    // Get available Races / Classes / Backstory / Alignments for selected options
    if (frogkin) {
      availRace = availRace.concat(g_data[language].frogkin.race);
    }
    if (minotaur) {
      availRace = availRace.concat(g_data[language].minotaur.race);
    }
    if (monstersMinions) {
      availRace       = availRace.concat(g_data[language].monstersMinions.race);
      availBackstory  = availBackstory.concat(g_data[language].monstersMinions.backstory);
      availAlignment  = availAlignment.concat(g_data[language].monstersMinions.alignment);
    }

    // Shuffle all arrays
    availRace       = app.arrayShuffle(availRace);
    diceColours     = app.arrayShuffle(diceColours);
    availBackstory  = app.arrayShuffle(availBackstory);
    availAlignment  = app.arrayShuffle(availAlignment);

    // Display the selection for players
    for (var i = 0; i < numberOfPlayers; i++) {

      // Selecting the class for the player colour
      var availClass = g_data[language].base.class[diceColours[i]];
      if (monstersMinions) {
        availClass = availClass.concat(g_data[language].monstersMinions.class[diceColours[i]]);
      }
      availClass = app.arrayShuffle(availClass);

      // New elements
      var slide = document.createElement('div'),
          title = document.createElement('div'),
          table = document.createElement('table');

      // Setting the elements
      slide.className = 'cardSlide';
      title.className = 'cardSlideTitle';
      title.innerText = 'Player ' + (i + 1);

      // Creating table content
      for (var j = 0; j < 4; j++) {

        // New elements
        var tr = table.insertRow(),
            th = document.createElement('th');

        // Setting of the elements
        th.appendChild(document.createTextNode(g_setting[language][j]));
        tr.appendChild(th);

        // Value for the character attribute
        var td = tr.insertCell();
        switch (j) {
          case 0:
            td.appendChild(document.createTextNode(availRace[i]));
            break;
          case 1:
            td.appendChild(document.createTextNode(availClass[0]));
            td.className = 'block ' + diceColours[i];
            break;
          case 2:
            td.appendChild(document.createTextNode(availBackstory[i]));
            break;
          case 3:
            td.appendChild(document.createTextNode(availAlignment[i]));
            break;
        }

      }

      // Append the elements
      slide.appendChild(title);
      slide.appendChild(table);
      playersSlider.appendChild(slide);

    }

    // Display the players card & slide to first element
    playersCard.hidden = false;
    playersSlider.firstElementChild.scrollIntoView(true);

  }

});

// Register the action on language change
document.getElementById('language').addEventListener('change', function() {

  // Variables
  var language        = document.getElementById('language').value,
      frogkin         = document.getElementById('frogkinPromo'),
      minotaur        = document.getElementById('minotaurPromo'),
      monstersMinions = document.getElementById('monstersMinionsExpansion'),
      numberOfPlayers = document.getElementById('numberOfPlayers'),
      fifthPlayer     = false;

  // Show / hide (+ reset values) for frogkin option
  if (g_data[language].frogkin) {
    frogkin.parentElement.parentElement.hidden = false;
  } else {
    frogkin.checked = false;
    frogkin.parentElement.parentElement.hidden = true;
  }

  // Show / hide (+ reset values) for minotaur option
  if (g_data[language].minotaur) {
    minotaur.parentElement.parentElement.hidden = false;
  } else {
    minotaur.checked = false;
    minotaur.parentElement.parentElement.hidden = true;
  }

  // Show / hide (+ reset values) for monstersMinions option
  if (g_data[language].monstersMinions) {
    monstersMinions.parentElement.parentElement.hidden = false;
    for (var i = 0; i < numberOfPlayers.options.length; i++) {
      if (numberOfPlayers.options[i].value == '5') {
        fifthPlayer = true;
      }
    }
    if (!fifthPlayer) {
      var option = document.createElement('option');
      option.appendChild(document.createTextNode('5'));
      option.value = '5';
      numberOfPlayers.appendChild(option);
    }
  } else {
    monstersMinions.checked = false;
    monstersMinions.parentElement.parentElement.hidden = true;
    for (var i = 0; i < numberOfPlayers.options.length; i++) {
      if (numberOfPlayers.options[i].value == '5') {
        numberOfPlayers.remove(i);
      }
    }
  }

});

// On load init
document.getElementById('rp-heroes').hidden = true;

// Add supported languages to select list
var select = document.getElementById('language'),
    event  = new Event('change');
for (var language in g_data) {
  var option = document.createElement('option');
  option.appendChild( document.createTextNode(language) );
  option.value = language;
  select.appendChild(option);
}

// Trigger initial change of language
select.dispatchEvent(event);
