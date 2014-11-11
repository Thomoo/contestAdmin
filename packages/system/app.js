'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module,
  favicon = require('serve-favicon'),
  express = require('express');

var Syst = new Module('system');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Syst.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Syst.routes(app, auth, database);

  Syst.aggregateAsset('css', 'common.css');
  
  // Add own global aggregates
  	// Ladda for button-animation
    Syst.aggregateAsset('js','dist/spin.min.js');
	Syst.aggregateAsset('js','dist/ladda.min.js');
	Syst.aggregateAsset('css','dist/ladda-themeless.min.css');
    Syst.aggregateAsset('css','dist/ladda.min.css');


    // custom styles that should be available globally
    Syst.aggregateAsset('css','global.css');

    // The middleware in config/express will run before this code

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');

  // Setting the favicon and static folder
  app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

  // Adding robots and humans txt
  app.use(express.static(__dirname + '/public/assets/static'));

  return Syst;
});
