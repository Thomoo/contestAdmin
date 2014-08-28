'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module,
  favicon = require('serve-favicon'),
  express = require('express');

var System = new Module('system');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
System.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  System.routes(app, auth, database);

  System.aggregateAsset('css', 'common.css');
  
  // Add own global aggregates
  	// Ladda for button-animation
	System.aggregateAsset('js','dist/spin.min.js');
	System.aggregateAsset('js','dist/ladda.min.js');
	//Adding some css to the mean project
	System.aggregateAsset('css','dist/ladda-themeless.min.css');  
	System.aggregateAsset('css','dist/ladda.min.css');  

  // The middleware in config/express will run before this code

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');

  // Setting the favicon and static folder
  app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

  // Adding robots and humans txt
  app.use(express.static(__dirname + '/public/assets/static'));

  return System;
});
