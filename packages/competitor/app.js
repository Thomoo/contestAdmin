'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Competitor = new Module('competitor');


Competitor.aggregateAsset('css','competitor.css');


/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Competitor.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Competitor.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Competitor.menus.add({
    title: 'Anmeldung',
    link: 'subscription',
    menu: 'main'
  });

  //We are adding a link to the main menu for all authenticated users
  Competitor.menus.add({
    title: 'Teilnehmerverwaltung',
    link: 'administration',
    roles: ['competitorAdmin'],
    menu: 'main'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Competitor.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Competitor.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Competitor.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Competitor;
});
