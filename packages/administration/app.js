'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Administration = new Module('administration');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Administration.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Administration.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Administration.menus.add({
    title: 'Administration',
    link: 'admin start',
    roles: ['admin'],
    menu: 'main'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Administration.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Administration.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Administration.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Administration;
});
