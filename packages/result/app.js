'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Result = new Module('result');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Result.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Result.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Result.menus.add({
    title: 'Resultat erfassen',
    link: 'result enter-result',
    roles: ['resultAdmin'],
    menu: 'main'
  });

  Result.menus.add({
    title: 'Start- und Ranglisten',
    link: 'result lists',
    roles: ['resultAdmin'],
    menu: 'main'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Result.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Result.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Result.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Result;
});
